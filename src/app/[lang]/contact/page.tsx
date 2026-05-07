import ContactoView from "@/components/Views/ContactoView";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default function Page() {
  return <ContactoView />;
}
