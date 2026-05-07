import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - Echopoint AI",
  description: "Conoce a los arquitectos de transformación empresarial. Fusionamos la intuición humana con IA.",
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
