import { Montserrat, Space_Grotesk } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";

// FA styles inlined in globals.css — no external CSS import needed
config.autoAddCss = false;

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: lang attribute is set client-side by LangSetter
    // since static export can't know lang at root layout level
    <html suppressHydrationWarning className={`${montserrat.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
