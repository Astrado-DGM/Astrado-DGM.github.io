(function () {
  "use strict";

  var S = window.SITE;
  var $ = function (sel) { return document.querySelector(sel); };

  // ------------------------------------------------------------------
  // Textos fijos de la interfaz
  // ------------------------------------------------------------------
  var UI = {
    es: {
      skip: "Saltar al contenido", hello: "Hola, viajero. Soy", ctaProjects: "Ver proyectos", ctaContact: "Contactar",
      navHome: "Inicio", navAbout: "Sobre mí", navProjects: "Proyectos", navCv: "Currículum", navLog: "Bitácora",
      navResources: "Fuentes", navContact: "Contacto",
      projectsSub: "Constelación de cosas que he construido.", filterCategory: "Categoría", filterTech: "Tecnología", noProjects: "Ningún proyecto coincide con esos filtros.", projectCount: "{n} de {t} proyectos", upcomingTitle: "Próximamente", upcomingSub: "Proyectos por venir. Aún ocultos entre las estrellas.", locked: "Sin revelar", liveTitle: "Más repositorios", liveSub: "Cargados en vivo desde GitHub.",
      liveLoading: "Buscando señales en GitHub…", liveError: "No se pudo contactar a GitHub. Visita mis perfiles directamente.",
      cvEducation: "Formación", cvExperience: "Experiencia", cvSkills: "Habilidades", cvDownload: "Descargar CV (PDF)",
      logSub: "Registro de vuelo: lo que voy haciendo y aprendiendo.",
      resourcesTitle: "Fuentes útiles", resourcesSub: "Mapa estelar de recursos que uso y recomiendo.", searchLabel: "Buscar fuentes", searchPh: "Buscar fuentes…",
      noResults: "Nada en esta región del cielo.", all: "Todo",
      contactSub: "Envía una señal. Respondo en cuanto la reciba.", formName: "Nombre", formEmail: "Correo", formMessage: "Mensaje",
      formSend: "Enviar señal", formSending: "Transmitiendo…", formOk: "¡Señal recibida! Te responderé pronto.",
      formErr: "Algo falló al enviar. Escríbeme directo al correo.", formInvalid: "Completa todos los campos con un correo válido.",
      formMailto: "Se abrirá tu cliente de correo para enviar el mensaje.", formTooFast: "Espera unos segundos antes de enviar.", formCooldown: "Ya enviaste un mensaje hace poco. Intenta de nuevo en {s} s.", formDaily: "Alcanzaste el límite de mensajes por hoy. Escríbeme directo al correo.", formShort: "El mensaje es demasiado corto.",
      credits: "Créditos de recursos", soundOn: "Sonido activado", soundOff: "Sonido desactivado", menu: "Menú",
      updated: "Actualizado",
    },
    en: {
      skip: "Skip to content", hello: "Hello, traveler. I'm", ctaProjects: "See projects", ctaContact: "Get in touch",
      navHome: "Home", navAbout: "About", navProjects: "Projects", navCv: "Résumé", navLog: "Log",
      navResources: "Resources", navContact: "Contact",
      projectsSub: "A constellation of things I've built.", filterCategory: "Category", filterTech: "Technology", noProjects: "No project matches those filters.", projectCount: "{n} of {t} projects", upcomingTitle: "Coming soon", upcomingSub: "Projects on the way. Still hidden among the stars.", locked: "Unrevealed", liveTitle: "More repositories", liveSub: "Loaded live from GitHub.",
      liveLoading: "Scanning GitHub for signals…", liveError: "Couldn't reach GitHub. Visit my profiles directly.",
      cvEducation: "Education", cvExperience: "Experience", cvSkills: "Skills", cvDownload: "Download résumé (PDF)",
      logSub: "Flight log: what I'm doing and learning.",
      resourcesTitle: "Useful resources", resourcesSub: "A star map of resources I use and recommend.", searchLabel: "Search resources", searchPh: "Search resources…",
      noResults: "Nothing in this region of the sky.", all: "All",
      contactSub: "Send a signal. I'll reply as soon as it arrives.", formName: "Name", formEmail: "Email", formMessage: "Message",
      formSend: "Send signal", formSending: "Transmitting…", formOk: "Signal received! I'll get back to you soon.",
      formErr: "Something went wrong. Please email me directly.", formInvalid: "Fill in every field with a valid email.",
      formMailto: "Your email client will open to send the message.", formTooFast: "Please wait a few seconds before sending.", formCooldown: "You sent a message recently. Try again in {s} s.", formDaily: "You reached today's message limit. Please email me directly.", formShort: "The message is too short.",
      credits: "Asset credits", soundOn: "Sound on", soundOff: "Sound off", menu: "Menu",
      updated: "Updated",
    },
  };

  var NAV = [
    { id: "inicio", key: "navHome", icon: "home" },
    { id: "sobre-mi", key: "navAbout", icon: "user" },
    { id: "proyectos", key: "navProjects", icon: "rocket" },
    { id: "curriculum", key: "navCv", icon: "document" },
    { id: "bitacora", key: "navLog", icon: "book" },
    { id: "fuentes", key: "navResources", icon: "bookmark" },
    { id: "contacto", key: "navContact", icon: "envelope" },
  ];

  // ------------------------------------------------------------------
  // Preferencias (localStorage puede fallar: siempre con try/catch)
  // ------------------------------------------------------------------
  function load(key, def) { try { var v = localStorage.getItem("astrado." + key); return v === null ? def : v; } catch (e) { return def; } }
  function save(key, val) { try { localStorage.setItem("astrado." + key, val); } catch (e) {} }

  var lang = load("lang", (navigator.language || "es").slice(0, 2) === "en" ? "en" : "es");
  var t = function (k) { return UI[lang][k] || k; };
  var tr = function (obj) { return obj == null ? "" : typeof obj === "string" ? obj : obj[lang] || obj.es || ""; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var ext = function (url) { return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : ""; };

  // ------------------------------------------------------------------
  // Sonido (apagado por defecto; se activa con el botón)
  // ------------------------------------------------------------------
  var Sound = (function () {
    var on = load("sound", "off") === "on";
    var ctx = null, buffers = {}, ambient = null, ambientGain = null;
    var files = {
      select: "assets/audio/ui-select.wav",
      decision: "assets/audio/ui-decision.wav",
      section: "assets/audio/chime-section.wav",
      open: "assets/audio/chime-open.wav",
      sent: "assets/audio/chime-sent.wav",
      ambient: "assets/audio/ambient-cosmos.wav",
    };
    var vol = { select: 0.25, decision: 0.3, section: 0.35, open: 0.4, sent: 0.5 };

    function ensure() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function get(name) {
      if (buffers[name]) return buffers[name];
      buffers[name] = fetch(files[name])
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (b) { return new Promise(function (ok, ko) { ctx.decodeAudioData(b, ok, ko); }); })
        .catch(function () { delete buffers[name]; return null; });
      return buffers[name];
    }
    function play(name) {
      if (!on || !ensure()) return;
      get(name).then(function (buf) {
        if (!buf) return;
        var src = ctx.createBufferSource(), g = ctx.createGain();
        g.gain.value = vol[name] || 0.3;
        src.buffer = buf; src.connect(g).connect(ctx.destination); src.start();
      });
    }
    function startAmbient() {
      if (!ensure() || ambient) return;
      get("ambient").then(function (buf) {
        if (!buf || !on || ambient) return;
        ambient = ctx.createBufferSource(); ambientGain = ctx.createGain();
        ambient.buffer = buf; ambient.loop = true;
        ambientGain.gain.setValueAtTime(0, ctx.currentTime);
        ambientGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 3);
        ambient.connect(ambientGain).connect(ctx.destination); ambient.start();
      });
    }
    function stopAmbient() {
      if (!ambient) return;
      var a = ambient, g = ambientGain; ambient = null;
      g.gain.cancelScheduledValues(ctx.currentTime);
      g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setTimeout(function () { try { a.stop(); } catch (e) {} }, 900);
    }
    function set(v) {
      on = v; save("sound", on ? "on" : "off");
      if (on) { startAmbient(); play("open"); } else stopAmbient();
      renderSoundBtn();
    }
    return { play: play, set: set, isOn: function () { return on; }, resumeIfOn: function () { if (on) startAmbient(); } };
  })();

  function renderSoundBtn() {
    var b = $("#soundBtn"), on = Sound.isOn();
    b.innerHTML = icon(on ? "soundOn" : "soundOff");
    b.setAttribute("aria-pressed", String(on));
    b.setAttribute("aria-label", t(on ? "soundOn" : "soundOff"));
    b.title = t(on ? "soundOn" : "soundOff");
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  var state = { projectCat: null, projectTech: null, logTag: null, query: "" };

  function renderStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $("#langBtn").textContent = lang === "es" ? "EN" : "ES";
    $("#langBtn").title = lang === "es" ? "English" : "Español";
    $("#menuBtn").innerHTML = icon("menu");
    $("#menuBtn").setAttribute("aria-label", t("menu"));
    $("#resourceSearch").placeholder = t("searchPh");
    $("#searchIcon").innerHTML = icon("search");
    $("#formSubmit").innerHTML = icon("send") + "<span>" + esc(t("formSend")) + "</span>";
    $("#year").textContent = new Date().getFullYear();
    renderSoundBtn();
  }

  function renderNav() {
    $("#nav").innerHTML = NAV.map(function (n) {
      return '<a href="#' + n.id + '" data-target="' + n.id + '" title="' + esc(t(n.key)) + '">' + icon(n.icon) + '<span class="label">' + esc(t(n.key)) + "</span></a>";
    }).join("");
  }

  function linkItem(l, cls) {
    return '<li><a class="' + (cls || "") + '" href="' + esc(l.url) + '"' + ext(l.url) + ">" + icon(l.icon) +
      (cls === "big" ? "<span><strong>" + esc(l.label) + "</strong><small>" + esc(tr(l.note)) + "</small></span>" : "<span>" + esc(l.label) + "</span>") +
      "</a></li>";
  }

  function renderHero() {
    var p = S.profile;
    $("#heroAlias").textContent = p.alias;
    $("#heroName").textContent = p.name;
    $("#heroRole").textContent = tr(p.role);
    $("#heroTagline").textContent = tr(p.tagline);
    var av = $("#heroAvatar");
    if (!av) return renderHeroLinks();
    if (p.photo || p.avatar) av.src = p.photo || p.avatar; else av.remove();
    av.onerror = function () { av.remove(); };
    renderHeroLinks();
  }
  function renderHeroLinks() {
    $("#heroLinks").innerHTML = S.links.map(function (l) { return linkItem(l); }).join("");
  }

  function renderAbout() {
    // Sin foto (o si no carga) se oculta el marco y el texto ocupa todo el ancho
    var ph = $("#aboutPhoto"), src = S.profile.photo, about = $(".about");
    function noPhoto() { ph.hidden = true; ph.innerHTML = ""; about.classList.add("no-photo"); }
    if (src) {
      ph.hidden = false; about.classList.remove("no-photo");
      ph.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(S.profile.name) + '" loading="lazy">';
      ph.querySelector("img").onerror = noPhoto;
    } else noPhoto();
    $("#aboutText").innerHTML = S.about.paragraphs.map(function (p) { return "<p>" + esc(tr(p)) + "</p>"; }).join("");
    $("#aboutFacts").classList.add("glass");
    $("#aboutFacts").innerHTML = S.about.facts.map(function (f) {
      return "<div><dt>" + esc(tr(f.label)) + "</dt><dd>" + esc(tr(f.value)) + "</dd></div>";
    }).join("");
  }

  function chips(container, tags, current, onPick) {
    var el = $(container);
    el.innerHTML = [null].concat(tags).map(function (tag) {
      return '<button type="button" class="chip" aria-pressed="' + (tag === current) + '" data-tag="' + esc(tag || "") + '">' + esc(tag || t("all")) + "</button>";
    }).join("");
    el.onclick = function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      Sound.play("select");
      onPick(b.dataset.tag || null);
    };
  }

  function uniqueTags(list) {
    var seen = {};
    list.forEach(function (x) { (x.tags || []).forEach(function (tag) { seen[tag] = (seen[tag] || 0) + 1; }); });
    return Object.keys(seen).sort(function (a, b) { return seen[b] - seen[a] || a.localeCompare(b); });
  }

  // Fila de filtros: items = [{ value, label }], la primera opción es "Todo"
  function filterRow(sel, items, current, onPick) {
    var el = $(sel);
    el.innerHTML = [{ value: null, label: t("all") }].concat(items).map(function (it) {
      return '<button type="button" class="chip" aria-pressed="' + (it.value === current) + '" data-value="' + esc(it.value || "") + '">' + esc(it.label) + "</button>";
    }).join("");
    el.onclick = function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      Sound.play("select");
      onPick(b.dataset.value || null);
    };
  }

  function renderProjects() {
    var cats = S.categories || {}, scopes = S.scopes || {};
    var usedCats = Object.keys(cats).filter(function (k) { return S.projects.some(function (p) { return p.category === k; }); });
    filterRow("#catFilters", usedCats.map(function (k) { return { value: k, label: tr(cats[k]) }; }), state.projectCat,
      function (v) { state.projectCat = v; renderProjects(); });
    // Tecnologías: solo las de la categoría elegida, ordenadas por frecuencia
    var pool = S.projects.filter(function (p) { return !state.projectCat || p.category === state.projectCat; });
    var techs = uniqueTags(pool.map(function (p) { return { tags: p.tech }; }));
    if (state.projectTech && techs.indexOf(state.projectTech) < 0) state.projectTech = null;
    filterRow("#techFilters", techs.map(function (x) { return { value: x, label: x }; }), state.projectTech,
      function (v) { state.projectTech = v; renderProjects(); });

    var shown = 0;
    function card(p) {
      var hide = (state.projectCat && p.category !== state.projectCat) || (state.projectTech && (p.tech || []).indexOf(state.projectTech) < 0);
      if (!hide) shown++;
      return '<article class="project glass reveal in' + (p.featured ? " featured" : "") + (hide ? " hidden" : "") + '">' +
        '<div class="project-top"><span class="project-cat cat-' + esc(p.category || "") + '">' + esc(tr(cats[p.category])) + '</span>' +
        '<span class="project-year">' + esc(tr(p.year)) + "</span>" + (p.featured ? icon("star", "star-mark") : "") + "</div>" +
        "<h3>" + esc(tr(p.title)) + "</h3>" +
        (p.scope ? '<p class="project-scope">' + icon(p.scope === "team" ? "user" : p.scope === "university" ? "academic" : "sparkles") + esc(tr(scopes[p.scope])) + "</p>" : "") +
        '<p class="project-desc">' + esc(tr(p.description)) + "</p>" +
        '<ul class="tags" aria-label="' + esc(t("filterTech")) + '">' + (p.tech || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        '<div class="project-links">' + (p.links || []).map(function (l) {
          return '<a href="' + esc(l.url) + '"' + ext(l.url) + ">" + icon(l.icon || (/github/i.test(l.url) ? "code" : "external")) + esc(tr(l.label)) + "</a>";
        }).join("") + "</div></article>";
    }
    // Destacados en filas de 2 y el resto en filas de 3 (sin huecos al filtrar)
    var feat = S.projects.filter(function (p) { return p.featured; }).map(card).join("");
    var rest = S.projects.filter(function (p) { return !p.featured; }).map(card).join("");
    $("#projectGrid").innerHTML = '<div class="projects-featured">' + feat + '</div><div class="projects-rest">' + rest + "</div>";
    $("#projectEmpty").hidden = shown > 0;
    $("#projectCount").textContent = t("projectCount").replace("{n}", shown).replace("{t}", S.projects.length);
  }

  function renderUpcoming() {
    var list = S.upcoming || [];
    $("#upcomingGrid").innerHTML = list.map(function (u, i) {
      var n = String(i + 1).padStart(2, "0");
      if (!u || !u.revealed) {
        return '<li class="slot" title="' + esc(t("locked")) + '">' + icon("sparkles") + '<span class="slot-q">?</span><span class="slot-num">' + n + "</span></li>";
      }
      var inner = (u.image ? '<img src="' + esc(u.image) + '" alt="" loading="lazy">' : "") + icon("star") +
        '<span class="slot-q">' + esc(tr(u.title)) + '</span><span class="slot-num">' + esc(tr(u.note) || n) + "</span>";
      return u.url ? '<li class="slot revealed"><a href="' + esc(u.url) + '"' + ext(u.url) + ' style="position:absolute;inset:0;z-index:2" aria-label="' + esc(tr(u.title)) + '"></a>' + inner + "</li>"
        : '<li class="slot revealed">' + inner + "</li>";
    }).join("");
  }

  // Repos en vivo (cache en sessionStorage para no gastar el límite de la API)
  var liveCache = null;
  function renderLiveRepos() {
    var list = $("#repoList");
    var cfg = S.liveRepos;
    if (!cfg || !cfg.users || !cfg.users.length) { $(".live").remove(); return; }
    var featured = S.projects.map(function (p) { return (p.links || []).map(function (l) { return l.url.toLowerCase(); }); }).flat();
    function draw(repos) {
      var items = repos
        .filter(function (r) { return !r.fork && featured.indexOf(r.html_url.toLowerCase()) < 0 && r.name.toLowerCase() !== r.owner.login.toLowerCase(); })
        .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
        .slice(0, cfg.max || 8);
      list.innerHTML = items.map(function (r) {
        var d = new Date(r.pushed_at).toLocaleDateString(lang === "es" ? "es-CL" : "en-US", { year: "numeric", month: "short" });
        return '<li><a href="' + esc(r.html_url) + '" target="_blank" rel="noopener"><span class="repo-name">' + esc(r.name) + "</span>" +
          '<span class="repo-meta">' + esc(r.owner.login) + (r.language ? " · " + esc(r.language) : "") + " · " + esc(t("updated")) + " " + esc(d) + "</span></a></li>";
      }).join("");
    }
    if (liveCache) return draw(liveCache);
    try { var c = sessionStorage.getItem("astrado.repos"); if (c) { liveCache = JSON.parse(c); return draw(liveCache); } } catch (e) {}
    list.innerHTML = '<li class="loading">' + esc(t("liveLoading")) + "</li>";
    Promise.all(cfg.users.map(function (u) {
      return fetch("https://api.github.com/users/" + encodeURIComponent(u) + "/repos?per_page=100&sort=pushed")
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    })).then(function (all) {
      liveCache = all.flat();
      try { sessionStorage.setItem("astrado.repos", JSON.stringify(liveCache)); } catch (e) {}
      draw(liveCache);
    }).catch(function () {
      list.innerHTML = '<li class="loading">' + esc(t("liveError")) + "</li>";
    });
  }

  function timeline(sel, items) {
    $(sel).innerHTML = items.map(function (i) {
      return '<li><div class="tl-title">' + esc(tr(i.title)) + '</div><div class="tl-meta">' + esc(tr(i.place)) + " · " + esc(tr(i.period)) + "</div>" +
        '<p class="tl-detail">' + esc(tr(i.detail)) + "</p></li>";
    }).join("");
  }

  function renderCv() {
    timeline("#cvEducation", S.cv.education);
    timeline("#cvExperience", S.cv.experience);
    $(".cv-skills").classList.add("glass");
    $("#cvSkills").innerHTML = S.cv.skills.map(function (g) {
      return '<div class="skill-group"><h4>' + esc(tr(g.group)) + "</h4><ul>" + g.items.map(function (s) { return "<li>" + esc(tr(s)) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
    var pdf = $("#cvPdf");
    if (S.cv.pdf) { pdf.hidden = false; pdf.href = S.cv.pdf; pdf.innerHTML = icon("download") + "<span>" + esc(t("cvDownload")) + "</span>"; }
  }

  function renderLog() {
    var entries = S.log.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    chips("#logFilters", uniqueTags(entries), state.logTag, function (tag) { state.logTag = tag; renderLog(); });
    $("#logList").innerHTML = entries.map(function (e) {
      var d = new Date(e.date + "T12:00:00");
      var month = d.toLocaleDateString(lang === "es" ? "es-CL" : "en-US", { month: "short", year: "numeric" });
      var hide = state.logTag && (e.tags || []).indexOf(state.logTag) < 0;
      return '<li class="log-entry glass' + (hide ? " hidden" : "") + '"><time class="log-date" datetime="' + esc(e.date) + '"><span class="d">' + d.getDate() +
        '</span><span class="m">' + esc(month) + "</span></time><div><h3>" + esc(tr(e.title)) + "</h3><p>" + esc(tr(e.body)) + "</p>" +
        '<ul class="tags">' + (e.tags || []).map(function (tag) { return "<li>#" + esc(tag) + "</li>"; }).join("") + "</ul></div></li>";
    }).join("");
  }

  function renderResources() {
    var q = state.query.trim().toLowerCase();
    var any = false;
    $("#resourceList").innerHTML = S.resources.map(function (g) {
      var cat = tr(g.category);
      var catMatch = cat.toLowerCase().indexOf(q) >= 0;
      var items = g.items.map(function (i) {
        var hay = (i.title + " " + tr(i.note) + " " + i.url).toLowerCase();
        var show = !q || catMatch || hay.indexOf(q) >= 0;
        if (show) any = true;
        return '<li class="res-item' + (show ? "" : " hidden") + '"><a href="' + esc(i.url) + '"' + ext(i.url) + ">" + esc(i.title) + icon("external") + "</a>" +
          '<span class="res-note">' + esc(tr(i.note)) + "</span></li>";
      });
      var visible = !q || catMatch || g.items.some(function (i) { return (i.title + " " + tr(i.note) + " " + i.url).toLowerCase().indexOf(q) >= 0; });
      return '<div class="res-group glass' + (visible ? "" : " hidden") + '"><h3>' + esc(cat) + "</h3><ul>" + items.join("") + "</ul></div>";
    }).join("");
    $("#resourceEmpty").hidden = any;
  }

  function renderContact() {
    $("#contactLinks").innerHTML = S.links.map(function (l) { return linkItem(l, "big"); }).join("");
  }

  function renderAll() {
    renderStatic(); renderNav(); renderHero(); renderAbout(); renderProjects(); renderUpcoming(); renderLiveRepos();
    renderCv(); renderLog(); renderResources(); renderContact();
    markActive(currentSection);
  }

  // ------------------------------------------------------------------
  // Navegación: sección activa, menú móvil
  // ------------------------------------------------------------------
  var currentSection = "inicio";
  function markActive(id) {
    document.querySelectorAll("#nav a").forEach(function (a) {
      var on = a.dataset.target === id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  function setupObservers() {
    var sections = NAV.map(function (n) { return document.getElementById(n.id); });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && en.target.id !== currentSection) {
          currentSection = en.target.id; markActive(currentSection);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { rev.observe(el); });
  }

  function setupMenu() {
    var btn = $("#menuBtn"), nav = $("#nav");
    function close() { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.innerHTML = icon("menu"); }
    btn.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.innerHTML = icon(open ? "close" : "menu");
      Sound.play("select");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) { close(); Sound.play("section"); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // ------------------------------------------------------------------
  // Formulario de contacto
  // ------------------------------------------------------------------
  // Protección del formulario. Lo del navegador (tiempo mínimo, espera entre envíos,
  // límite diario) frena bots simples y envíos repetidos por error; el filtro de spam
  // y el límite real los aplica Formspree en su servidor, junto con el campo _gotcha.
  var FORM_LIMITS = { minSeconds: 4, cooldownSeconds: 120, perDay: 3 };

  function sendLog() {
    try {
      var raw = JSON.parse(localStorage.getItem("astrado.sent") || "[]");
      var dayAgo = Date.now() - 864e5;
      return Array.isArray(raw) ? raw.filter(function (x) { return typeof x === "number" && x > dayAgo; }) : [];
    } catch (e) { return []; }
  }
  function logSend() {
    var list = sendLog(); list.push(Date.now());
    try { localStorage.setItem("astrado.sent", JSON.stringify(list)); } catch (e) {}
  }

  function setupForm() {
    var form = $("#contactForm"), status = $("#formStatus"), btn = $("#formSubmit");
    var startedAt = 0;
    form.addEventListener("focusin", function () { if (!startedAt) startedAt = Date.now(); });
    function fail(msg) { status.className = "form-status err"; status.textContent = msg; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      var data = new FormData(form);
      var name = (data.get("name") || "").trim(), email = (data.get("email") || "").trim(), msg = (data.get("message") || "").trim();
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      form.name.classList.toggle("invalid", !name);
      form.email.classList.toggle("invalid", !okEmail);
      form.message.classList.toggle("invalid", msg.length < 10);
      if (!name || !okEmail || !msg) return fail(t("formInvalid"));
      if (msg.length < 10) return fail(t("formShort"));
      if (data.get("_gotcha")) return; // bot: campo trampa relleno

      // Un humano tarda al menos unos segundos en escribir; los bots envían al instante
      if (!startedAt || Date.now() - startedAt < FORM_LIMITS.minSeconds * 1000) return fail(t("formTooFast"));
      var log = sendLog();
      if (log.length >= FORM_LIMITS.perDay) return fail(t("formDaily"));
      var wait = Math.ceil((log.length ? log[log.length - 1] + FORM_LIMITS.cooldownSeconds * 1000 - Date.now() : 0) / 1000);
      if (wait > 0) return fail(t("formCooldown").replace("{s}", wait));

      var id = S.contact.formspreeId;
      if (!id) {
        // Sin Formspree configurado: abre el cliente de correo
        status.className = "form-status ok"; status.textContent = t("formMailto");
        var subject = encodeURIComponent("Contacto web — " + name);
        var body = encodeURIComponent(msg + "\n\n— " + name + " <" + email + ">");
        window.location.href = "mailto:" + S.contact.fallbackEmail + "?subject=" + subject + "&body=" + body;
        return;
      }
      btn.disabled = true; btn.querySelector("span").textContent = t("formSending");
      fetch("https://formspree.io/f/" + encodeURIComponent(id), {
        method: "POST", body: data, headers: { Accept: "application/json" },
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        logSend(); startedAt = 0;
        form.reset(); status.className = "form-status ok"; status.textContent = t("formOk"); Sound.play("sent");
      }).catch(function () {
        fail(t("formErr"));
      }).finally(function () {
        btn.disabled = false; btn.querySelector("span").textContent = t("formSend");
      });
    });
  }

  // ------------------------------------------------------------------
  // Cielo estrellado (canvas)
  // ------------------------------------------------------------------
  function setupSky() {
    var canvas = $("#sky"), c = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stars = [], shooting = [], W, H, dpr, scrollY = 0;
    var colors = ["255,255,255", "255,240,214", "200,225,255", "245,208,138"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round((W * H) / 2600);
      stars = [];
      for (var i = 0; i < n; i++) {
        var depth = Math.random();
        stars.push({
          x: Math.random() * W, y: Math.random() * H * 1.6,
          r: depth * 1.3 + 0.2, depth: depth,
          a: Math.random() * 0.6 + 0.3, tw: Math.random() * 0.02 + 0.004, ph: Math.random() * 6.28,
          col: colors[Math.random() < 0.82 ? 0 : 1 + Math.floor(Math.random() * 3)],
        });
      }
      if (reduce) draw(0);
    }

    function spawnShooting() {
      shooting.push({ x: Math.random() * W * 0.8 + W * 0.2, y: Math.random() * H * 0.4, vx: -(6 + Math.random() * 4), vy: 2.5 + Math.random() * 2, life: 1 });
    }

    function draw(time) {
      c.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var y = (s.y - scrollY * s.depth * 0.25) % (H * 1.6);
        if (y < 0) y += H * 1.6;
        if (y > H) continue;
        var a = reduce ? s.a : s.a * (0.65 + 0.35 * Math.sin(time * s.tw + s.ph));
        c.beginPath(); c.arc(s.x, y, s.r, 0, 6.283);
        c.fillStyle = "rgba(" + s.col + "," + a.toFixed(3) + ")"; c.fill();
        if (s.r > 1.25) {
          c.fillStyle = "rgba(" + s.col + "," + (a * 0.15).toFixed(3) + ")";
          c.beginPath(); c.arc(s.x, y, s.r * 3.2, 0, 6.283); c.fill();
        }
      }
      for (var j = shooting.length - 1; j >= 0; j--) {
        var m = shooting[j];
        var grad = c.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        grad.addColorStop(0, "rgba(255,248,225," + m.life + ")");
        grad.addColorStop(1, "rgba(127,216,255,0)");
        c.strokeStyle = grad; c.lineWidth = 1.6;
        c.beginPath(); c.moveTo(m.x, m.y); c.lineTo(m.x - m.vx * 14, m.y - m.vy * 14); c.stroke();
        m.x += m.vx; m.y += m.vy; m.life -= 0.012;
        if (m.life <= 0) shooting.splice(j, 1);
      }
    }

    function loop(time) {
      if (!document.hidden) {
        if (Math.random() < 0.0025) spawnShooting();
        draw(time / 16);
      }
      requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", function () { scrollY = window.scrollY; if (reduce) draw(0); }, { passive: true });
    resize();
    if (!reduce) requestAnimationFrame(loop);
  }

  // Brillo que sigue al cursor en las tarjetas de proyecto
  function setupCardGlow() {
    $("#projectGrid").addEventListener("pointermove", function (e) {
      var card = e.target.closest(".project"); if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  // ------------------------------------------------------------------
  // Inicio
  // ------------------------------------------------------------------
  renderAll();
  setupObservers();
  setupMenu();
  setupForm();
  setupSky();
  setupCardGlow();

  $("#langBtn").addEventListener("click", function () {
    lang = lang === "es" ? "en" : "es"; save("lang", lang);
    Sound.play("decision");
    renderAll();
  });
  $("#soundBtn").addEventListener("click", function () { Sound.set(!Sound.isOn()); });
  $("#resourceSearch").addEventListener("input", function (e) { state.query = e.target.value; renderResources(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a && !a.closest("#nav")) Sound.play("section");
  });
  // Los navegadores bloquean audio sin interacción: reanuda el ambiente al primer gesto
  document.addEventListener("pointerdown", function once() { Sound.resumeIfOn(); document.removeEventListener("pointerdown", once); });
})();
