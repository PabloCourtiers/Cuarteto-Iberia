# Cuarteto Iberia · Web

Web portfolio del Cuarteto Iberia. Sitio estático construido en HTML + CSS + JavaScript vanilla, sin build pipeline ni frameworks. Pensado para hospedarse en GitHub Pages.

## Estructura

```
site/
├── index.html             ← Home (collage + review + bio + agenda)
├── cuarteto.html          ← Biografía y músicos
├── agenda.html            ← Listado completo de conciertos
├── media.html             ← Vídeos + galería con lightbox
├── contacto.html
├── css/
│   ├── tokens.css         ← Variables del sistema (paleta, tipos, ritmo)
│   ├── base.css           ← Reset + estilos globales
│   ├── components.css     ← Nav, footer, eyebrow, buttons
│   ├── home.css
│   ├── cuarteto.css
│   ├── agenda.css
│   ├── media.css
│   └── contacto.css
├── js/
│   └── main.js            ← Burger, animación del collage, lightbox
└── assets/
    ├── fonts/             ← Inter Variable + The Future (5 pesos)
    ├── img/logo/
    ├── img/home/
    ├── img/cuarteto/
    ├── img/galeria/
    └── img/musicos/
```

## Desarrollo local

```bash
cd site
py -m http.server 8765
# o:
npx serve -p 8765
```

Abrir `http://localhost:8765`.

## Despliegue (GitHub Pages)

1. Repositorio en GitHub.
2. `Settings → Pages → Source: Deploy from a branch → main / root`.
3. La URL aparece en unos minutos: `https://<usuario>.github.io/<repo>/`.

Para dominio propio (`cuartetoiberia.com`):
- Añadir un fichero `CNAME` con el dominio.
- Configurar registros DNS A/AAAA o CNAME apuntando a GitHub Pages.

## Sistema de diseño

Toda la "personalidad visual" vive en `css/tokens.css`. Para reutilizar el sistema en otro portfolio artístico, cambiar los valores de ese archivo y los contenidos. La estructura de componentes (nav pill, footer, eyebrow con ✱, botones pill, grid de agenda, masonry de galería, lightbox) es genérica.

## Créditos

- Diseño y fotografía: Cuarteto Iberia.
- Tipografía: Inter (Google) + The Future.
