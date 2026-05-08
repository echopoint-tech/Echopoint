export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = context.request.headers.get("host") || "";

  // Si el host comienza con "card."
  if (host.startsWith("card.")) {
    // Si están en la raíz del subdominio (/), servimos la VCard
    if (url.pathname === "/" || url.pathname === "") {
      // Reescribimos la ruta internamente a /es/card/
      // Usamos el idioma español por defecto, pero podrías ajustarlo
      const newUrl = new URL("/es/card/", url.origin);
      return context.env.ASSETS.fetch(newUrl);
    }
  }

  // Para todo lo demás, continuar normalmente
  return context.next();
}
