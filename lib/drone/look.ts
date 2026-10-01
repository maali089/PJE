/* Lichtstimmungen und Shader des Drohnenflugs. */

type RGB = [number, number, number];
type Mood = { zen: RGB; hor: RGB; fog: RGB; sun: RGB; sunCol: RGB; amb: RGB; cloud: RGB; den: number; valley: number };

const norm = (v: RGB): RGB => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
};

// 0 Gewitter · 1 diffuses Licht · 2 Morgendämmerung
const MOODS: Mood[] = [
  { zen: [0.03, 0.045, 0.1], hor: [0.19, 0.24, 0.36], fog: [0.2, 0.24, 0.34], sun: norm([-0.4, 0.4, -0.8]), sunCol: [0.5, 0.56, 0.78], amb: [0.3, 0.36, 0.52], cloud: [0.8, 0.83, 0.9], den: 0.06, valley: 0.9 },
  { zen: [0.46, 0.56, 0.74], hor: [0.85, 0.88, 0.92], fog: [0.86, 0.88, 0.92], sun: norm([0.35, 0.55, -0.6]), sunCol: [1.0, 0.98, 0.95], amb: [0.6, 0.66, 0.78], cloud: [0.95, 0.96, 0.98], den: 0.045, valley: 0.7 },
  { zen: [0.36, 0.46, 0.7], hor: [0.98, 0.84, 0.72], fog: [0.93, 0.88, 0.84], sun: norm([0.05, 0.14, -1]), sunCol: [1.25, 0.96, 0.76], amb: [0.62, 0.62, 0.7], cloud: [1.0, 0.95, 0.9], den: 0.035, valley: 0.6 },
];

const mix3 = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export function moodAt(m: number) {
  const i = Math.min(1, Math.floor(Math.max(0, m)));
  const t = Math.min(1, Math.max(0, m - i));
  const a = MOODS[i], b = MOODS[i + 1];
  const k = t * t * (3 - 2 * t);
  return {
    zen: mix3(a.zen, b.zen, k),
    hor: mix3(a.hor, b.hor, k),
    fog: mix3(a.fog, b.fog, k),
    sun: norm(mix3(a.sun, b.sun, k)),
    sunCol: mix3(a.sunCol, b.sunCol, k),
    amb: mix3(a.amb, b.amb, k),
    cloud: mix3(a.cloud, b.cloud, k),
    den: a.den + (b.den - a.den) * k,
    valley: a.valley + (b.valley - a.valley) * k,
  };
}

/** Dunst hinter Text: Richtung Seitengrau, damit dunkle Schrift lesbar bleibt. */
export const HAZE: RGB = [0.89, 0.9, 0.915];

// ---------------------------------------------------------------- GLSL
export const NOISE = `
float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(.8,.6,-.6,.8)*p*2.03+7.;a*=.5;}return v;}
`;

const HEAD = `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

export const FULL_VS = `attribute vec2 aP; varying vec2 vNdc; void main(){ vNdc=aP; gl_Position=vec4(aP,0.,1.); }`;

export const SKY_FS = HEAD + NOISE + `
varying vec2 vNdc;
uniform mat4 uInvVP; uniform vec3 uCam, uZen, uHor, uSun, uSunCol, uCloudCol, uHazeCol;
uniform float uHaze, uTime;
void main(){
  vec4 p=uInvVP*vec4(vNdc,1.,1.);
  vec3 dir=normalize(p.xyz/p.w-uCam);
  float t=clamp(dir.y*1.7+0.12,0.,1.);
  vec3 col=mix(uHor,uZen,pow(t,0.75));
  float s=max(dot(dir,uSun),0.);
  col+=uSunCol*(pow(s,6.)*0.14+pow(s,220.)*0.7);
  if(dir.y>0.){
    vec2 uv=dir.xz/(dir.y+0.12)*0.55+vec2(uTime*0.006,uTime*0.002);
    float c=fbm(uv)*0.75+fbm(uv*3.1)*0.25;
    float a=smoothstep(0.42,0.78,c)*0.6*smoothstep(0.,0.18,dir.y);
    col=mix(col,uCloudCol*(0.72+0.28*s)+uSunCol*pow(s,4.)*0.15,a);
  }
  col=mix(col,uHazeCol,uHaze);
  gl_FragColor=vec4(col,1.);
}`;

export const TERRAIN_VS = `
attribute vec3 aPos; attribute vec3 aNor; attribute float aAO;
uniform mat4 uVP; varying vec3 vPos; varying vec3 vN; varying float vAO;
void main(){ vPos=aPos; vN=aNor; vAO=aAO; gl_Position=uVP*vec4(aPos,1.); }`;

const TERRAIN_BODY = `
varying vec3 vPos; varying vec3 vN; varying float vAO;
uniform vec3 uCam, uSun, uSunCol, uAmb, uFog, uHazeCol;
uniform float uDen, uValley, uHaze, uNear;
float fbm3(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p=mat2(.8,.6,-.6,.8)*p*2.1+3.;a*=.5;}return v;}
// Projektion aus drei Richtungen: keine verschmierten Texturen an Steilwänden
#ifdef LITE
float tri(vec3 p,vec3 n,float s){return fbm3(p.xz*s);}
#else
float tri(vec3 p,vec3 n,float s){vec3 w=pow(abs(n),vec3(4.));w/=(w.x+w.y+w.z);
  return fbm3(p.zy*s)*w.x+fbm3(p.xz*s)*w.y+fbm3(p.xy*s)*w.z;}
#endif
void main(){
  float d=length(vPos-uCam);
  if(uNear>0. && d>uNear) discard;
  vec3 N=normalize(vN);
  // Fels-Detail per Bump-Mapping (feine Grate, Rinnen), nahe stärker als fern; auf dem Handy ausgelassen
#ifndef LITE
  // feinste Ebene nur in der Nähe, sonst flimmert sie
  float hd=tri(vPos,N,6.)*0.05+tri(vPos,N,19.)*0.012*smoothstep(7.,2.,d);
  vec3 dpx=dFdx(vPos),dpy=dFdy(vPos);
  float dhx=dFdx(hd),dhy=dFdy(hd);
  vec3 r1=cross(dpy,N),r2=cross(N,dpx);
  float det=dot(dpx,r1);
  vec3 g=sign(det)*(dhx*r1+dhy*r2);
  N=normalize(abs(det)*N-g*smoothstep(26.,4.,d));
#endif
  float n=tri(vPos,N,2.4);
  float n2=mix(0.5,tri(vPos,N,9.),smoothstep(22.,3.,d));
  // Schnee auf flachen Stellen, Fels an steilen Flanken, Rinnen dunkler
  float snow=smoothstep(0.62,0.9,N.y+(n-0.5)*0.36+vPos.y*0.02-vAO*0.5);
  vec3 rock=mix(vec3(0.075,0.085,0.11),vec3(0.2,0.22,0.27),n2*0.7+n*0.3);
  vec3 snowC=vec3(0.9,0.93,0.98)*(0.93+0.07*n2);
  vec3 alb=mix(rock,snowC,snow);
  // dunkle Nadelwälder in tiefen, flachen Tallagen
  alb=mix(alb,vec3(0.05,0.07,0.08),smoothstep(0.55,0.15,vPos.y)*smoothstep(0.75,0.92,N.y)*smoothstep(0.35,0.6,n)*0.85);
  float diff=max(dot(N,uSun),0.);
  float ao=clamp(1.+vAO*1.8,0.4,1.15);
  vec3 col=alb*(uAmb*(0.42+0.48*N.y)*ao+uSunCol*diff*ao*1.15);
  // Atmosphäre: Entfernung macht Berge heller und kontrastärmer, Talnebel liegt tief
  float fog=1.-exp(-d*uDen);
  float vf=exp(-max(vPos.y-0.1,0.)*1.9)*uValley*smoothstep(1.5,9.,d);
  fog=clamp(fog+vf*(1.-fog),0.,1.);
  col=mix(col,uFog,fog);
  col=mix(col,uHazeCol,uHaze);
  gl_FragColor=vec4(col,1.);
}`;
/** Gelände-Shader; `lite` für Handys (ohne Bump-Mapping, weniger Rauschen). */
export const terrainFS = (lite = false) => HEAD + (lite ? "#define LITE\n" : "") + NOISE + TERRAIN_BODY;
export const TERRAIN_FS = terrainFS(false);

export const SEA_VS = `
attribute vec2 aP; uniform mat4 uVP; uniform vec3 uCam; uniform float uSea; varying vec3 vPos;
void main(){ vec3 p=vec3(uCam.x+aP.x*70.,uSea,uCam.z+aP.y*70.); vPos=p; gl_Position=uVP*vec4(p,1.); }`;

export const SEA_FS = HEAD + NOISE + `
varying vec3 vPos;
uniform vec3 uCam, uSun, uSunCol, uCloudCol, uFog, uHazeCol;
uniform float uDen, uHaze, uSeaA, uTime;
void main(){
  vec2 q=vPos.xz*0.16+vec2(uTime*0.012,uTime*0.004);
  float c=fbm(q+fbm(q*0.7)*1.2);
  float a=smoothstep(0.38,0.72,c)*uSeaA;
  float d=length(vPos-uCam);
  vec3 col=uCloudCol*(0.82+0.18*c)+uSunCol*pow(max(dot(normalize(uCam-vPos),uSun),0.),3.)*0.05;
  col=mix(col,uFog,1.-exp(-d*uDen*0.8));
  col=mix(col,uHazeCol,uHaze);
  a*=smoothstep(64.,30.,d);
  gl_FragColor=vec4(col*a,a);
}`;

export const OVERLAY_FS = HEAD + NOISE + `
varying vec2 vNdc;
uniform vec2 uRes; uniform float uCloud, uTime, uAsp;
uniform vec3 uCloudCol;
void main(){
  vec2 uv=vNdc*vec2(uAsp,1.);
  float n=fbm(uv*1.4+vec2(uTime*0.05,-uTime*0.02)+fbm(uv*0.8-uTime*0.03)*1.5);
  float edge=smoothstep(0.2,1.3,length(vNdc));
  float a=clamp(uCloud*(0.72+0.38*n)+uCloud*edge*0.2,0.,1.);
  a=max(a,uCloud*uCloud);
  vec3 col=uCloudCol*(0.9+0.1*n);
  gl_FragColor=vec4(col*a,a);
}`;
