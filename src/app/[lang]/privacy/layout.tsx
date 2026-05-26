import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad - Echopoint AI",
  description: "Política de privacidad de Echopoint AI.",
  robots: { index: false, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
