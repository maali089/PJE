"use client";

import { useRef, type ElementType } from "react";
import { useGsap } from "@/lib/gsap";
import { scenes } from "@/lib/scenes";

type Props = { name: string; as?: ElementType; children?: React.ReactNode } & Record<string, unknown>;

/** Dünne Client-Hülle: rendert das Server-Markup unverändert und hängt die Szene aus lib/scenes an. */
export function Scene({ name, as: Tag = "div", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, (c, el) => scenes[name]?.(c, el));
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
