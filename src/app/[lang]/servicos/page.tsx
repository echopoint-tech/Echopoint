import ServiciosView from "@/components/Views/ServiciosView";

export async function generateStaticParams() {
  return [{ lang: "pt" }];
}

export default function Page() {
  return <ServiciosView />;
}
