import ServiciosView from "@/components/Views/ServiciosView";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default function Page() {
  return <ServiciosView />;
}
