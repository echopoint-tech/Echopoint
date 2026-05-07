import ContactoView from "@/components/Views/ContactoView";

export async function generateStaticParams() {
  return [{ lang: "pt" }];
}

export default function Page() {
  return <ContactoView />;
}
