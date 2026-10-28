# WalterABenitez.github.io

Portafolio personal de **Walter Benítez**, Analista de Sistemas y desarrollador de software.

🌐 Sitio: https://walterabenitez.github.io

---

## Proyecto destacado: WallFood

**WallFood** es un punto de venta (POS) y sistema de gestión SaaS para food trucks.

- Ventas desde una interfaz táctil optimizada para tablets y celulares.
- Gestión de productos, combos y stock.
- Reportes de ventas.
- Usuarios administradores y cajeros.
- Modo offline: las ventas se guardan en el dispositivo y se sincronizan al volver la conexión.

**Stack:** React 19 · TypeScript · TanStack Start · Supabase · PostgreSQL · Row Level Security · Service Worker · IndexedDB · Docker

👉 https://app.wallfood.com.ar/

---

## Sobre el sitio

Sitio estático sin paso de compilación, publicado con **GitHub Pages** desde la rama `main`.

- `index.html` — estructura y contenido.
- `styles.css` — sistema de diseño (variables CSS), layout responsive y animaciones.
- `script.js` — menú móvil, navegación activa, animaciones al hacer scroll (respeta `prefers-reduced-motion`).
- `img/wallfood/` — capturas del sitio público de WallFood.
- `docs/C-V-WalterBenitez.pdf` — currículum.

Para verlo localmente alcanza con servir la carpeta, por ejemplo:

```bash
python -m http.server 8080
```
