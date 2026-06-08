# EchoPoint

Sitio web corporativo B2B de EchoPoint. Next.js 16 con exportación estática desplegado en Cloudflare Pages.

## Requisitos


## Comandos

```bash
# Servidor de desarrollo
npm run dev

# Traducir contenido con DeepL (ES → EN, FR, PT)
npm run translate

# Compilar para producción
npm run build

# Analizar bundle
npm run analyze

# Linter
npm run lint
```

## Traducciones

Los textos del sitio están en `src/i18n/`. El script de traducción usa la API de DeepL para generar automáticamente las versiones en inglés, francés y portugués a partir del español.

Después de modificar textos en español, ejecuta:

```bash
npm run translate
```

## Despliegue

El sitio genera una exportación estática (`out/`) lista para Cloudflare Pages. El build se ejecuta automáticamente en cada push al repositorio.
