import {
  ChartBar,
  CloudArrowUp,
  Cpu,
  Database,
  GearSix,
  Globe,
  HardDrives,
  Headset,
  PlugsConnected,
  ShieldCheck,
  WifiHigh,
} from "@phosphor-icons/react/ssr";

/** Software-Netzwerk: fünf Knoten, die Daten austauschen. */
export const storyNodes = [
  { key: "Website", Icon: Globe, text: "Formulare und Anfragen" },
  { key: "API", Icon: PlugsConnected, text: "Shop, ERP, Buchhaltung" },
  { key: "Automation", Icon: GearSix, text: "Python, Excel, feste Abläufe" },
  { key: "Database", Icon: Database, text: "Daten an einem Ort" },
  { key: "Dashboard", Icon: ChartBar, text: "Auswertungen auf einen Blick" },
];

/**
 * IT: Komponenten des abstrahierten Computers (von unten nach oben gestapelt),
 * jeweils mit der passenden Leistung und dem Preis aus der Preisliste.
 */
export const itParts = [
  { key: "Support", Icon: Headset, service: "Fernwartung", price: "30 €/Std." },
  { key: "Security", Icon: ShieldCheck, service: "Viren/Malware entfernen", price: "ab 40 €" },
  { key: "Backup", Icon: CloudArrowUp, service: "Backup einrichten", price: "ab 30 €" },
  { key: "Storage", Icon: HardDrives, service: "Datenrettung", price: "ab 50 €" },
  { key: "Network", Icon: WifiHigh, service: "WLAN/Router einrichten", price: "30 €" },
  { key: "CPU", Icon: Cpu, service: "PC aufrüsten", price: "ab 40 €" },
];

/** UI-Bausteine, in die das Smartphone zerfällt, bevor sie zu Nodes werden. */
export const uiFragments = ["nav", "title", "image", "input", "button"] as const;
