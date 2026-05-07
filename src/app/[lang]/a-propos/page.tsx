import NosotrosView from "@/components/Views/NosotrosView";

export async function generateStaticParams() {
  return [{ lang: "fr" }];
}

export default function Page() {
  return <NosotrosView />;
}
