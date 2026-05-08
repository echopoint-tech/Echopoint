export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = context.request.headers.get("host") || "";
  const mainDomain = "echopoint-intsolutions.com";

  // Si el host es el subdominio de la tarjeta
  if (host.startsWith("card.")) {
    
    // 1. SI ES UN ARCHIVO (tiene punto como .css, .js, .webp) O ES DE NEXT.JS, entregarlo directamente
    // Usamos ASSETS.fetch para asegurar que Cloudflare entregue el archivo real.
    if (url.pathname.includes(".") || url.pathname.startsWith("/_next/")) {
      return context.env.ASSETS.fetch(url);
    }

    // 2. Verificamos la "llave" del QR solo para la raíz
    const hasQrKey = url.searchParams.get("source") === "qr";

    if ((url.pathname === "/" || url.pathname === "") && hasQrKey) {
      const newUrl = new URL("/es/card/", url.origin);
      return context.env.ASSETS.fetch(newUrl);
    } 
    
    // 3. Todo lo demás (visitas directas sin llave), al dominio principal
    return Response.redirect(`https://${mainDomain}${url.pathname}${url.search}`, 302);
  }

  // Para el dominio principal, continuar normal
  return context.next();
}
