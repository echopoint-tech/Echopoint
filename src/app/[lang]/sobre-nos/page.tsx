import NosotrosView from "@/components/Views/NosotrosView";

export async function generateStaticParams() {
  return [{ lang: "pt" }];
}

export default function Page() {
  return <NosotrosView />;
}
