import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Echopoint AI",
  description: "¿Estás listo para liderar tu sector? Conversemos sobre cómo nuestra inteligencia estratégica puede acelerar tus objetivos.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
