import NosotrosView from "@/components/Views/NosotrosView";

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export default function Page() {
  return <NosotrosView />;
}
