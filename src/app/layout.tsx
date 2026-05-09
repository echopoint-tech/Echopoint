import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";

// FA styles inlined in globals.css — no external CSS import needed
config.autoAddCss = false;

// Passthrough: <html lang> and <body> are owned by [lang]/layout.tsx
// so each locale's static HTML file gets the correct lang attribute.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
