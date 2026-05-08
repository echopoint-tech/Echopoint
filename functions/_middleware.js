export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = context.request.headers.get("host") || "";
  const mainDomain = "echopoint-intsolutions.com";

  // Si el host es el subdominio de la tarjeta
  if (host.startsWith("card.")) {
    // Si es la raíz (/), mostramos la VCard internamente
    if (url.pathname === "/" || url.pathname === "") {
      const newUrl = new URL("/es/card/", url.origin);
      return context.env.ASSETS.fetch(newUrl);
    } 
    
    // Si intenta acceder a cualquier otra ruta (ej: /es/, /blog) desde card.
    // lo mandamos al dominio principal para que no se "quede" en el subdominio.
    return Response.redirect(`https://${mainDomain}${url.pathname}${url.search}`, 301);
  }

  // Para el dominio principal y otras rutas, continuar normalmente
  return context.next();
}
