# Astrado DGM · Patricio Vejar

Página personal con temática astral: introducción, proyectos, currículum, bitácora, fuentes útiles y contacto.
Sitio estático (HTML + CSS + JS, sin build), pensado para **GitHub Pages** en `https://astrado-dgm.github.io`.

## Estructura

```
index.html          Estructura de la página
css/style.css       Estilos (colores en :root)
js/content.js       ← TODO EL CONTENIDO: edita aquí
js/main.js          Lógica (render, idioma, sonido, cielo, formulario)
js/icons.js         Iconos Heroicons (MIT)
assets/img/         Planeta, destellos, patrón de estrellas, favicon
assets/audio/       Sonidos (Tranquility + SOUNDICONS UI)
assets/icons/       Licencia de Heroicons
```

## Editar contenido

Todo está en [`js/content.js`](js/content.js). Cada texto traducible es `{ es: "...", en: "..." }`.

- **Proyecto nuevo**: agrega un objeto a `projects` (`featured: true` lo hace grande).
- **Entrada de bitácora**: agrega a `log` con `date: "AAAA-MM-DD"`; se ordenan solas.
- **Fuente útil**: agrega a `resources` dentro de su categoría (o crea una categoría nueva).
- **CV**: la fuente está en `cv/index.html` (formato de la plantilla). Para regenerar el PDF ábrelo en el navegador, Imprimir → Guardar como PDF (tamaño Carta, sin encabezados) y reemplaza `assets/cv/Patricio_Vejar_Olivares_CV.pdf`.
- **Más enlaces** (LinkedIn, itch.io…): descomenta o agrega en `links`.
- Busca `TODO` para ver los datos que faltan completar.

Cada proyecto tiene `category` (una clave de `categories`: games, apps, engines, web, academic), `scope` (personal, team, university) y `tech` (solo tecnologías). Los filtros de Categoría y Tecnología se arman solos a partir de esos campos.

La sección "Más repositorios" (carga en vivo desde la API de GitHub) está desactivada; se activa poniendo cuentas en `liveRepos.users`.

## Formulario de contacto (Formspree)

1. Crea una cuenta en <https://formspree.io> y un formulario nuevo con tu correo.
2. Copia el ID del formulario (lo que va después de `/f/`).
3. Pégalo en `contact.formspreeId` en `js/content.js`.

Mientras esté vacío, el botón abre el cliente de correo del visitante (mailto).

## Probar en local

```bash
python -m http.server 8000
```

Luego abre <http://localhost:8000>.

## Publicar en GitHub Pages

1. En GitHub, con la cuenta **Astrado-DGM**, crea un repositorio público llamado exactamente `Astrado-DGM.github.io`.
2. Desde esta carpeta:

```bash
git init -b main
git add .
git commit -m "Primera versión de la página"
git remote add origin https://github.com/Astrado-DGM/Astrado-DGM.github.io.git
git push -u origin main
```

3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.
4. En uno o dos minutos queda en <https://astrado-dgm.github.io>.

Para que aparezca al visitar tu perfil, agrega el enlace en **Edit profile → Website** de ambas cuentas
y en el README de perfil (repo `PatriciAstrado/PatriciAstrado`, y uno `Astrado-DGM/Astrado-DGM` si lo creas).

## Créditos y licencias

- Iconos: [Heroicons](https://heroicons.com) by Tailwind Labs — MIT (ver `assets/icons/HEROICONS-LICENSE`).
- Patrón de fondo: [Hero Patterns](https://heropatterns.com) by Steve Schoger — CC BY 4.0.
- Sonidos: [Helton Yan's Tranquility](https://heltonyan.itch.io/tranquility) by Helton Yan & Roberto Araujo — CC BY 4.0 (recortados, mono, remuestreados).
- Sonidos UI: [SOUNDICONS](https://soundicons.net/en/) by BRAINSTORM co.,ltd.
- Gráficos (destellos de la estrella): Asadal (asadal.com), vía [Frutiger Aero Archive](https://frutigeraeroarchive.org/).
