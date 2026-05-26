import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio - Echopoint AI",
  description: "Términos y condiciones de uso de Echopoint AI.",
  robots: { index: false, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
