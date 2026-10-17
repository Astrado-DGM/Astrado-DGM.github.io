/* =====================================================================
   CONTENIDO DEL SITIO — edita este archivo para actualizar la página.
   Cada texto traducible es { es: "...", en: "..." }.
   Lo marcado con "TODO" es un texto de ejemplo que debes reemplazar.
   ===================================================================== */

window.SITE = {
  // ------------------------------------------------------------------
  // Identidad
  // ------------------------------------------------------------------
  profile: {
    alias: "Astrado",
    name: "Patricio Vejar",
    // Foto personal: copia tu imagen a assets/img/ y pon la ruta aquí (ej. "assets/img/yo.jpg").
    // Se muestra en "Sobre mí" y en el círculo del inicio. Vacío = no se muestra el marco de foto.
    photo: "",
    avatar: "https://avatars.githubusercontent.com/Astrado-DGM", // se usa en el inicio si no hay foto
    role: {
      es: "Desarrollador de videojuegos · Dungeon Master · Estudiante de Ingeniería en Computación",
      en: "Game developer · Dungeon Master · Computer Engineering student",
    },
    tagline: {
      es: "Me gusta contar historias y hacer juegos. Espero crear cosas buenas… y dejar a todos emocionalmente marcados.",
      en: "I like to tell stories and make games. I hope to make some good stuff… and emotionally scar everyone.",
    },
    location: { es: "La Serena, Chile", en: "La Serena, Chile" },
  },

  // Cuentas y enlaces (aparecen en el inicio y en Contacto)
  links: [
    { id: "email", label: "astradocharacther@gmail.com", note: { es: "Correo", en: "Email" }, url: "mailto:astradocharacther@gmail.com", icon: "envelope" },
    { id: "linkedin", label: "LinkedIn", note: { es: "Perfil profesional", en: "Professional profile" }, url: "https://www.linkedin.com/in/patricio-vejar-olivares-07b4753bb", icon: "user" },
    { id: "itch", label: "itch.io · astrado-realm", note: { es: "Mis juegos", en: "My games" }, url: "https://astrado-realm.itch.io", icon: "puzzle" },
    { id: "github-dev", label: "GitHub · Astrado-DGM", note: { es: "Desarrollo profesional", en: "Professional development" }, url: "https://github.com/Astrado-DGM", icon: "code" },
    { id: "github-uni", label: "GitHub · PatriciAstrado", note: { es: "Proyectos universitarios", en: "University projects" }, url: "https://github.com/PatriciAstrado", icon: "academic" },
  ],

  // ------------------------------------------------------------------
  // Contacto — formulario vía Formspree (https://formspree.io)
  // 1. Crea una cuenta gratis y un formulario.
  // 2. Copia el ID (lo que va después de /f/ en la URL, ej. "xyzabcd").
  // 3. Pégalo aquí. Si queda vacío, el formulario abre tu correo (mailto).
  // ------------------------------------------------------------------
  contact: {
    formspreeId: "mljgzyqn",
    fallbackEmail: "astradocharacther@gmail.com",
  },

  // ------------------------------------------------------------------
  // Sobre mí
  // ------------------------------------------------------------------
  about: {
    paragraphs: [
      {
        es: "Soy Patricio Vejar, conocido en línea como Astrado. Estudio Ingeniería en Computación en la Universidad de La Serena y trabajo principalmente en proyectos relacionados con videojuegos.",
        en: "I'm Patricio Vejar, known online as Astrado. I study Computer Engineering at the University of La Serena and mostly work on video-game related projects.",
      },
      {
        es: "Soy Dungeon Master de varios juegos de rol con múltiples grupos de personas. A partir de esa experiencia he creado múltiples mecánicas de juego enfocadas en la adaptabilidad narrativa y en la diversión de los jugadores.",
        en: "I'm a Dungeon Master for several tabletop role-playing games with multiple groups of people. From that experience I've designed many game mechanics focused on narrative adaptability and player fun.",
      },
      {
        es: "Me interesan la narrativa, el diseño de juegos y la generación procedural. Este sitio reúne mis proyectos, mi currículum, una bitácora de lo que voy aprendiendo y las fuentes que me resultan útiles.",
        en: "I'm into storytelling, game design and procedural generation. This site gathers my projects, my résumé, a log of what I'm learning and the resources I find useful.",
      },
    ],
    facts: [
      { label: { es: "Enfoque", en: "Focus" }, value: { es: "Videojuegos y narrativa", en: "Games & narrative" } },
      { label: { es: "Rol", en: "Tabletop" }, value: { es: "Dungeon Master", en: "Dungeon Master" } },
      { label: { es: "Interés", en: "Interest" }, value: { es: "Generación procedural", en: "Procedural generation" } },
      { label: { es: "Motores", en: "Engines" }, value: { es: "Unity · GameMaker", en: "Unity · GameMaker" } },
      { label: { es: "Inglés", en: "English" }, value: { es: "B2", en: "B2" } },
      { label: { es: "Base", en: "Based in" }, value: { es: "La Serena, Chile", en: "La Serena, Chile" } },
    ],
  },

  // ------------------------------------------------------------------
  // Proyectos (showcase). featured: true = tarjeta grande.
  // ------------------------------------------------------------------
  projects: [
    {
      title: "Astrados Audio Handler",
      featured: true,
      year: "2026",
      tags: ["Python", "Audio", "Windows"],
      description: {
        es: "Aplicación de escritorio que mezcla micrófono, música en loop y efectos de sonido en una sola salida de audio. Filtro de micrófono nativo, ducking, detección de cable de audio virtual, atajos de teclado e interfaz estilo Windows 7. Distribuida con instalador.",
        en: "Desktop app that mixes microphone, looping music and sound effects into a single audio output. Native mic filter, ducking, virtual audio cable detection, hotkeys and a Windows 7-style UI. Ships with an installer.",
      },
      links: [
        { label: { es: "Descargar v1.0.0", en: "Download v1.0.0" }, url: "https://github.com/Astrado-DGM/audio_handler_astrados/releases/tag/Release", icon: "download" },
        { label: "GitHub", url: "https://github.com/Astrado-DGM/audio_handler_astrados" },
      ],
    },
    {
      title: "Astrados Transfer",
      featured: true,
      year: "2026 · v1.0",
      tags: ["Python", "Audio", "Windows"],
      description: {
        es: "Descargador de música de YouTube con interfaz estilo reproductor MP3 (Frutiger Aero). Pegas el link de una canción o de una playlist y la app detecta cuál es; permite cancelar descargas, tiene sonidos de interfaz y se instala con un instalador .exe o .msi.",
        en: "YouTube music downloader with an MP3-player-style interface (Frutiger Aero). Paste a song or playlist link and the app figures out which it is; downloads can be cancelled, it has interface sounds and installs with an .exe or .msi installer.",
      },
      links: [{ label: { es: "Descargar v1.0", en: "Download v1.0" }, url: "https://github.com/Astrado-DGM/ytDownloader-Public-release/releases/tag/Release", icon: "download" }],
    },
    {
      title: "AVNM",
      featured: true,
      year: { es: "En desarrollo", en: "In development" },
      tags: ["C#", ".NET", "Novela visual"],
      description: {
        es: "Game engine propio enfocado en la creación y ejecución de novelas visuales, con diálogo ramificado semiautomático basado en autómatas. Proyecto privado.",
        en: "Custom game engine focused on creating and running visual novels, with semi-automatic branching dialogue built on automata. Private project.",
      },
      links: [],
    },
    {
      title: "Almanac Alquimist",
      featured: true,
      year: "Unity",
      tags: ["Unity", "C#", "Roguelike"],
      description: {
        es: "Prueba de concepto para un juego roguelike.",
        en: "Proof of concept for a roguelike game.",
      },
      links: [{ label: "GitHub", url: "https://github.com/Astrado-DGM/Almanac_Alquimist" }],
    },
    {
      title: "Invasión Al Faro",
      featured: true,
      year: "Game jam",
      tags: ["GameMaker", "GML", "Game Jam"],
      description: {
        es: "Juego hecho en 11 días para una game jam en mi universidad. En progreso para mejorarlo.",
        en: "A game made in 11 days for a game jam at my university. Work in progress to make it better.",
      },
      links: [{ label: "GitHub", url: "https://github.com/Astrado-DGM/Invasion-Al-Faro" }],
    },
    {
      title: "Crivo — FFT y encriptación",
      year: "2024",
      tags: ["Matemáticas", "FFT", "Universidad"],
      description: {
        es: "Demostración de cómo la transformada de Fourier (FFT) se usa para encriptar. Trabajo de Matemáticas.",
        en: "Demo of how the Fast Fourier Transform (FFT) can be used for encryption. Math coursework.",
      },
      links: [{ label: "GitHub", url: "https://github.com/PatriciAstrado/Crivo" }],
    },
    {
      title: "JavaSafe",
      year: "2024",
      tags: ["Java", "POO", "Universidad"],
      description: {
        es: "Colección de proyectos pequeños en Java: sistema de peajes con interfaz gráfica, cuestionario que carga preguntas desde archivo, sistema de inmuebles con herencia, registro de personas y fechas, y un ejemplo de uso de la librería PDFBox.",
        en: "Collection of small Java projects: a toll system with a GUI, a quiz that loads questions from a file, a real-estate system using inheritance, a people-and-dates record, and a PDFBox library example.",
      },
      links: [{ label: "GitHub", url: "https://github.com/PatriciAstrado/JavaSafe" }],
    },
    {
      title: "Python-safe",
      year: "2025",
      tags: ["Python", "Jupyter", "Universidad"],
      description: {
        es: "Colección de trabajos en Python: cálculo multivariable y graficado 3D, curvas de Bézier, simulaciones de potencial eléctrico, un sistema cliente-servidor multihilo, números binarios con recursión, un notebook de machine learning con datos de Pokémon y pruebas con Spark.",
        en: "Collection of Python work: multivariable calculus and 3D plotting, Bézier curves, electric potential simulations, a multithreaded client-server system, binary numbers with recursion, a machine learning notebook with Pokémon data and Spark tests.",
      },
      links: [{ label: "GitHub", url: "https://github.com/PatriciAstrado/Python-safe" }],
    },
    {
      title: "Voult",
      year: "2024",
      tags: ["C", "Estructuras de datos"],
      description: {
        es: "Biblioteca reutilizable en C: lista enlazada, manejo de enteros largos y estructuras base, con un programa de ejemplo.",
        en: "Reusable C library: linked list, long-integer handling and base structs, with an example program.",
      },
      links: [{ label: "GitHub", url: "https://github.com/PatriciAstrado/Voult" }],
    },

    // Colaboraciones (repos privados de equipos; sin enlace público)
    {
      title: "CampusOne",
      collab: true,
      year: "2026",
      tags: ["Web", "ULS", "Equipo"],
      description: {
        es: "Ecosistema universitario integrado: plataforma digital modular para la comunidad de la Universidad de La Serena. Uno de los principales contribuidores del repositorio.",
        en: "Integrated university ecosystem: a modular digital platform for the University of La Serena community. One of the main contributors to the repository.",
      },
      links: [],
    },
    {
      title: { es: "Web Escuela de Ingeniería en Computación ULS", en: "ULS Computer Engineering School website" },
      collab: true,
      year: "2026",
      tags: ["Web", "ULS", "Equipo"],
      description: {
        es: "Página web corporativa de la Escuela de Ingeniería en Computación e Informática de la ULS. Principal contribuidor del repositorio.",
        en: "Corporate website for the ULS School of Computer and Information Engineering. Main contributor to the repository.",
      },
      links: [],
    },
    {
      title: "PATOVER",
      collab: true,
      year: "2026",
      tags: ["Web", "ULS", "Equipo"],
      description: {
        es: "Plataforma multievento para administrar eventos y actividades universitarias.",
        en: "Multi-event platform for managing university events and activities.",
      },
      links: [],
    },
  ],

  // ------------------------------------------------------------------
  // Próximamente — 12 casillas de juegos por venir.
  // Para revelar uno, reemplaza { revealed: false } por, por ejemplo:
  //   { revealed: true, title: "Nombre", note: { es: "2027", en: "2027" },
  //     image: "assets/img/projects/juego.jpg", url: "https://astrado-realm.itch.io/juego" }
  // ------------------------------------------------------------------
  upcoming: [
    { revealed: false }, { revealed: false }, { revealed: false }, { revealed: false },
    { revealed: false }, { revealed: false }, { revealed: false }, { revealed: false },
    { revealed: false }, { revealed: false }, { revealed: false }, { revealed: false },
  ],

  // Repos en vivo desde la API de GitHub (sección "Más repositorios"). Desactivado porque la lista
  // de proyectos es curada a mano. Para activarlo: users: ["Astrado-DGM"]
  liveRepos: { users: [], max: 8 },

  // ------------------------------------------------------------------
  // Currículum
  // ------------------------------------------------------------------
  cv: {
    pdf: "assets/cv/Patricio_Vejar_Olivares_CV.pdf", // versión HTML editable en cv/index.html
    education: [
      {
        title: { es: "Ingeniería en Computación", en: "Computer Engineering" },
        place: "Universidad de La Serena",
        period: { es: "2023 – 2027 (en curso)", en: "2023 – 2027 (in progress)" },
        detail: {
          es: "Programación, estructuras de datos, POO, bases de datos, ingeniería de software y matemáticas aplicadas.",
          en: "Programming, data structures, OOP, databases, software engineering and applied mathematics.",
        },
      },
    ],
    experience: [
      {
        title: { es: "Project Manager (voluntariado)", en: "Project Manager (volunteer)" },
        place: "Software Factory Lab (SFL) — Universidad de La Serena",
        period: { es: "Ene 2026 – Dic 2026", en: "Jan 2026 – Dec 2026" },
        detail: {
          es: "Gestión de proyectos, desarrollo web y desarrollo en Unity.",
          en: "Project management, web development and Unity development.",
        },
      },
      {
        title: { es: "Dungeon Master y diseñador de mecánicas", en: "Dungeon Master & mechanics designer" },
        place: { es: "Juegos de rol de mesa", en: "Tabletop role-playing games" },
        period: { es: "Varios grupos", en: "Multiple groups" },
        detail: {
          es: "Dirección de partidas para múltiples grupos y diseño de mecánicas propias enfocadas en la adaptabilidad narrativa y la diversión de los jugadores.",
          en: "Running campaigns for multiple groups and designing original mechanics focused on narrative adaptability and player fun.",
        },
      },
      {
        title: { es: "Desarrollador — AVNM (proyecto privado)", en: "Developer — AVNM (private project)" },
        place: { es: "Proyecto personal", en: "Personal project" },
        period: { es: "En desarrollo", en: "In development" },
        detail: {
          es: "Game engine propio enfocado en la creación y ejecución de novelas visuales.",
          en: "Custom game engine focused on creating and running visual novels.",
        },
      },
      {
        title: { es: "Desarrollador — Astrados Audio Handler", en: "Developer — Astrados Audio Handler" },
        place: { es: "Proyecto personal", en: "Personal project" },
        period: { es: "2026", en: "2026" },
        detail: {
          es: "Aplicación de escritorio en Python para mezcla de audio en tiempo real, con instalador y versión 1.0.0 publicada.",
          en: "Python desktop app for real-time audio mixing, with installer and a published 1.0.0 release.",
        },
      },
      {
        title: { es: "Desarrollador — Game jam universitaria", en: "Developer — University game jam" },
        place: "Invasión Al Faro",
        period: { es: "11 días", en: "11 days" },
        detail: {
          es: "Diseño y desarrollo de un juego completo en GameMaker en tiempo limitado.",
          en: "Designed and built a complete game in GameMaker under a tight deadline.",
        },
      },
    ],
    skills: [
      { group: { es: "Lenguajes", en: "Languages" }, items: ["C#", "Python", "Java", "C", "JavaScript", "SQL", "HTML / CSS", "GML"] },
      { group: { es: "Motores", en: "Engines" }, items: ["Unity", "GameMaker"] },
      { group: { es: "Ingeniería", en: "Engineering" }, items: [{ es: "POO", en: "OOP" }, { es: "Estructuras de datos", en: "Data structures" }, { es: "Bases de datos", en: "Databases" }, "UML", "Scrum / Agile", "Project Management"] },
      { group: { es: "Arte, audio y video", en: "Art, audio & video" }, items: ["Blender", "Krita", "GIMP", "LibreSprite", "FL Studio", "Audacity", "Kdenlive"] },
      { group: { es: "Herramientas", en: "Tools" }, items: ["Git / GitHub", "VS Code", "Jupyter", "Ghostwriter"] },
      { group: { es: "Idiomas", en: "Languages (spoken)" }, items: [{ es: "Español (nativo)", en: "Spanish (native)" }, { es: "Inglés (B2)", en: "English (B2)" }] },
    ],
  },

  // ------------------------------------------------------------------
  // Bitácora — entradas más nuevas primero (se ordenan solas por fecha).
  // ------------------------------------------------------------------
  log: [
    {
      date: "2026-10-17",
      title: { es: "Despega esta página", en: "This site lifts off" },
      tags: ["web"],
      body: {
        es: "Publiqué mi página personal en GitHub Pages: portafolio, currículum, bitácora y fuentes útiles.",
        en: "Published my personal site on GitHub Pages: portfolio, résumé, log and useful resources.",
      },
    },
    {
      date: "2026-10-17",
      title: { es: "Astrados Audio Handler v1.0.0", en: "Astrados Audio Handler v1.0.0" },
      tags: ["release", "python", "audio"],
      body: {
        es: "Primera versión con instalador: filtro de micrófono, ducking, detección de cable de audio virtual, sonidos Tranquility y ayuda integrada.",
        en: "First release with installer: mic filter, ducking, virtual audio cable detection, Tranquility sounds and built-in help.",
      },
    },
    {
      date: "2026-05-28",
      title: { es: "Inicio del mezclador de audio", en: "Starting the audio mixer" },
      tags: ["python", "audio"],
      body: {
        es: "Arranqué un proyecto personal: mezclar micrófono, música y efectos de sonido en una sola salida de audio.",
        en: "Started a personal project: mixing microphone, music and sound effects into a single audio output.",
      },
    },
  ],

  // ------------------------------------------------------------------
  // Fuentes útiles — categorías con enlaces (hay buscador en la página).
  // ------------------------------------------------------------------
  resources: [
    {
      category: { es: "Iconos y patrones", en: "Icons & patterns" },
      items: [
        { title: "Heroicons", url: "https://heroicons.com", note: { es: "Iconos SVG (MIT) de Tailwind Labs.", en: "SVG icons (MIT) by Tailwind Labs." } },
        { title: "Hero Patterns", url: "https://heropatterns.com", note: { es: "Patrones SVG repetibles (CC BY 4.0).", en: "Repeatable SVG patterns (CC BY 4.0)." } },
      ],
    },
    {
      category: { es: "Audio", en: "Audio" },
      items: [
        { title: "Helton Yan's Tranquility", url: "https://heltonyan.itch.io/tranquility", note: { es: "One-shots y drones estilo Frutiger Aero / Sky (CC BY 4.0).", en: "Frutiger Aero / Sky-style one-shots and drones (CC BY 4.0)." } },
        { title: "SOUNDICONS", url: "https://soundicons.net/en/", note: { es: "Sonidos UI/UX gratuitos de BRAINSTORM.", en: "Free UI/UX sounds by BRAINSTORM." } },
      ],
    },
    {
      category: { es: "Gráficos y estética", en: "Graphics & aesthetics" },
      items: [
        { title: "Frutiger Aero Archive", url: "https://frutigeraeroarchive.org/", note: { es: "Archivo de recursos de la estética Frutiger Aero.", en: "Archive of Frutiger Aero aesthetic resources." } },
        { title: "TinEye", url: "https://tineye.com/", note: { es: "Búsqueda inversa para encontrar el origen de una imagen.", en: "Reverse image search to find where an image comes from." } },
      ],
    },
    {
      category: { es: "Software creativo libre", en: "Free creative software" },
      items: [
        { title: "Blender", url: "https://www.blender.org/", note: { es: "Modelado, animación y render 3D.", en: "3D modeling, animation and rendering." } },
        { title: "Krita", url: "https://krita.org/", note: { es: "Pintura e ilustración digital.", en: "Digital painting and illustration." } },
        { title: "GIMP", url: "https://www.gimp.org/", note: { es: "Edición de imágenes.", en: "Image editing." } },
        { title: "LibreSprite", url: "https://libresprite.github.io/", note: { es: "Pixel art y animación de sprites.", en: "Pixel art and sprite animation." } },
        { title: "Audacity", url: "https://www.audacityteam.org/", note: { es: "Grabación y edición de audio.", en: "Audio recording and editing." } },
        { title: "Kdenlive", url: "https://kdenlive.org/", note: { es: "Edición de video.", en: "Video editing." } },
        { title: "ghostwriter", url: "https://ghostwriter.kde.org/", note: { es: "Editor de Markdown sin distracciones.", en: "Distraction-free Markdown editor." } },
      ],
    },
    {
      category: { es: "Desarrollo", en: "Development" },
      items: [
        { title: "GitHub Pages", url: "https://pages.github.com/", note: { es: "Hosting gratis de sitios estáticos.", en: "Free static site hosting." } },
        { title: "MDN Web Docs", url: "https://developer.mozilla.org/", note: { es: "Referencia de HTML, CSS y JavaScript.", en: "HTML, CSS and JavaScript reference." } },
        { title: "Formspree", url: "https://formspree.io/", note: { es: "Formularios para sitios estáticos.", en: "Forms for static sites." } },
      ],
    },
    {
      category: { es: "Game dev", en: "Game dev" },
      items: [
        { title: "Unity Learn", url: "https://learn.unity.com/", note: { es: "Cursos oficiales de Unity.", en: "Official Unity courses." } },
        { title: "GameMaker Manual", url: "https://manual.gamemaker.io/", note: { es: "Documentación de GameMaker y GML.", en: "GameMaker and GML documentation." } },
        { title: "itch.io Game Jams", url: "https://itch.io/jams", note: { es: "Calendario de game jams.", en: "Game jam calendar." } },
      ],
    },
  ],
};
