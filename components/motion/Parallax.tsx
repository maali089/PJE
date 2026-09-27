import { Scene } from "./Scene";

/** Inhalt bewegt sich beim Scrollen leicht langsamer/schneller als die Seite. */
export function Parallax({ children, amount = 8, className = "" }: { children: React.ReactNode; amount?: number; className?: string }) {
  return (
    <Scene name="parallax" data-amount={amount} className={`overflow-hidden ${className}`}>
      {children}
    </Scene>
  );
}
