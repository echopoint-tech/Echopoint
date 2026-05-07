import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - Echopoint AI",
  description: "Plan integral de crecimiento empresarial con objetivos mensurables y KPIs definidos.",
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
