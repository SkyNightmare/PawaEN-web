/* PawaEN Wiki: hash router + interactive widgets */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  const byId = Object.fromEntries(PAGES.map(p => [p.id, p]));
  const fmt = n => n.toLocaleString("en-US");
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get: k => { try { return JSON.parse(localStorage.getItem("pawaen:" + k)) || []; } catch { return []; } },
    set: (k, v) => { try { localStorage.setItem("pawaen:" + k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- sidebar: page = section, h2 = subsection, h3 = sub-subsection ---------- */
  const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const OUTLINE = {};
  PAGES.forEach(p => {
    if (!p.html) { OUTLINE[p.id] = []; return; }
    const div = document.createElement("div"); div.innerHTML = p.html;
    const taken = new Set([...div.querySelectorAll("[id]")].map(e => e.id)), out = [];
    div.querySelectorAll("h2, h3").forEach(h => {
      if (!h.id) { const b = slug(h.textContent) || "s"; let id = b, n = 2; while (taken.has(id)) id = b + "-" + n++; h.id = id; taken.add(id); }
      if (h.tagName === "H2") out.push({ id: h.id, t: h.textContent, kids: [] });
      else if (out.length) out[out.length - 1].kids.push({ id: h.id, t: h.textContent });
    });
    p.html = div.innerHTML; OUTLINE[p.id] = out;
  });
  const chev = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const sideNav = $("#sideNav"), sidenav = $("#sidenav"), scrim = $("#snScrim");
  sideNav.innerHTML = PAGES.map(p => {
    const secs = OUTLINE[p.id];
    const sub = secs.length ? `<div class="sn-body" id="snb-${p.id}"><ul class="sn-sub">${secs.map(s2 => `
      <li><a href="#/${p.id}#${s2.id}" data-p="${p.id}" data-t="${s2.id}">${esc(s2.t)}</a>${s2.kids.length ? `<ul class="sn-sub2">${s2.kids.map(k =>
        `<li><a href="#/${p.id}#${k.id}" data-p="${p.id}" data-t="${k.id}">${esc(k.t)}</a></li>`).join("")}</ul>` : ""}</li>`).join("")}</ul></div>` : "";
    return `<div class="sn-group" data-id="${p.id}">
      <div class="sn-head"><a class="sn-link" href="#/${p.id}" data-id="${p.id}"><span class="sn-ico">${p.icon}</span><span>${p.nav}</span></a>${secs.length
        ? `<button class="sn-tog" aria-expanded="false" aria-controls="snb-${p.id}" aria-label="Show ${p.nav} sections">${chev}</button>` : ""}</div>${sub}</div>`;
  }).join("");
  const setOpen = (g, open) => { g.classList.toggle("open", open); const b = $(".sn-tog", g); b && b.setAttribute("aria-expanded", open); };
  const drawer = open => {
    sidenav.classList.toggle("open", open); scrim.hidden = !open;
    $("#navToggle").setAttribute("aria-expanded", open);
  };
  $("#navToggle").addEventListener("click", () => drawer(!sidenav.classList.contains("open")));
  scrim.addEventListener("click", () => drawer(false));
  sideNav.addEventListener("click", e => {
    const tog = e.target.closest(".sn-tog");
    if (tog) { const g = tog.closest(".sn-group"); setOpen(g, !g.classList.contains("open")); return; }
    const a = e.target.closest("a[data-t]");
    if (a && a.dataset.p === currentId) {          // same page: just scroll, don't re-render
      e.preventDefault();
      const t = document.getElementById(a.dataset.t);
      if (t) { t.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", a.getAttribute("href")); markSub(a.dataset.t); }
    }
    if (e.target.closest("a")) drawer(false);
  });
  function markSub(id) {
    $$("a[data-t]", sideNav).forEach(x => x.classList.toggle("on", x.dataset.p === currentId && x.dataset.t === id));
    const on = $("a[data-t].on", sideNav);
    const li = on && on.closest(".sn-sub > li");
    $$(".sn-sub > li", sideNav).forEach(l => l.classList.toggle("in", l === li));
    if (on) { const box = sidenav, r = on.getBoundingClientRect(), br = box.getBoundingClientRect();
      if (r.top < br.top + 40 || r.bottom > br.bottom - 20) box.scrollTop += r.top - br.top - br.height / 3; }
  }
  let currentId = "home";

  /* ---------- home ---------- */
  function homeHTML() {
    const s = STATUS;
    const cards = PAGES.filter(p => !["home", "log"].includes(p.id)).map(p =>
      `<a class="card" href="#/${p.id}"><div class="ico">${p.icon}</div><h4>${p.title}</h4><p>${p.blurb}</p><span class="go">›</span></a>`).join("");
    return `
<section class="hero fade-in">
  <div class="hero-kofi">${window.kofiwidget2 ? kofiwidget2.getHTML() : ""}
    <a class="dl-btn" href="${DOWNLOAD.url}"${/^https?:/.test(DOWNLOAD.url) ? ' target="_blank" rel="noopener"' : ""}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>${DOWNLOAD.label}</span>
    </a>
  </div>
  <div>
    <h1 class="logo-type"><img class="hero-logo" src="assets/logo.webp" alt="Pawapuro Pro Baseball 2026-2027"><span class="l2">ENGLISH PATCH WIKI</span></h1>
    <p class="tagline">The story, now in English.</p>
    <p>Everything about the fan English translation for Pawapuro on Switch, played in Eden: what's translated, how the game stores its text, and how to build and install the mod yourself.</p>
    <div class="actions">
      <a class="btn red" href="#/build">Build &amp; install ›</a>
      <a class="btn" href="#/guide">Read the full guide</a>
      <a class="btn ghost" href="#/guide#g-todo">What's left</a>
    </div>
  </div>
  <div class="ring-wrap">
    <svg class="ring" viewBox="0 0 220 220" aria-hidden="true">
      <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#46d0f5"/><stop offset="1" stop-color="#216ec0"/></linearGradient></defs>
      <circle class="track" cx="110" cy="110" r="92" fill="none" stroke-width="18"/>
      <circle class="bar" cx="110" cy="110" r="92" fill="none" stroke-width="18" transform="rotate(-90 110 110)" stroke-dasharray="578" stroke-dashoffset="578"/>
      <circle class="track" cx="110" cy="110" r="66" fill="none" stroke-width="10"/>
      <circle class="bar2" cx="110" cy="110" r="66" fill="none" stroke-width="10" transform="rotate(-90 110 110)" stroke-dasharray="415" stroke-dashoffset="415"/>
    </svg>
    <div class="ring-label"><b id="ringNum">0%</b><span id="ringCap">of lines</span></div>
    <div class="ring-toggle" role="group" aria-label="Progress measure">
      <button class="on" data-ring="lines">Lines</button><button data-ring="chars">Characters</button>
    </div>
  </div>
</section>

<section class="scoreboard fade-in" aria-label="Key numbers">
  <div class="stat"><b data-count="${s.names}">0</b><span>player names</span></div>
  <div class="stat"><b data-count="${s.textures}">0</b><span>images redrawn</span></div>
  <div class="stat"><b data-count="${s.labels}">0</b><span>screen labels</span></div>
  <div class="stat"><b data-count="${s.bios}">0</b><span>player bios</span></div>
</section>

<section class="panel fade-in">
  <h2 class="title-chip" style="background:none;border:0;padding:0">Explore the wiki</h2>
  <div class="cards">${cards}</div>
</section>`;
  }

  /* ---------- news widget ---------- */
  function renderNews(host) {
    const limit = host.dataset.news === "all" ? Infinity : +host.dataset.news;
    const kinds = ["all", ...Object.keys(TAGS)];
    host.innerHTML = `<div class="filters">${kinds.map((k, i) =>
      `<button class="chip${i ? "" : " on"}" data-k="${k}">${k === "all" ? "All" : TAGS[k]}</button>`).join("")}</div><ul class="news"></ul>`;
    const ul = $(".news", host);
    const draw = k => {
      const items = NEWS.filter(n => k === "all" || n.k === k).slice(0, limit);
      ul.innerHTML = items.map((n, i) => `
        <li><button aria-expanded="false" aria-controls="nb${i}">
          <time datetime="${n.d}">${n.d.replace(/-/g, ".")}</time><span class="tag ${n.k}">${TAGS[n.k]}</span>
          <span class="t">${n.t}</span><span class="chev">›</span></button>
          <div class="body" id="nb${i}"><p>${n.b}</p><a href="#/${n.p}">Read more on ${byId[n.p].title} ›</a></div></li>`).join("")
        || `<li class="muted" style="padding:12px">Nothing here yet.</li>`;
    };
    draw("all");
    host.addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (chip) { $$(".chip", host).forEach(c => c.classList.toggle("on", c === chip)); draw(chip.dataset.k); return; }
      const btn = e.target.closest(".news button");
      if (btn) { const li = btn.parentElement; const o = li.classList.toggle("open"); btn.setAttribute("aria-expanded", o); }
    });
  }

  /* ---------- page render ---------- */
  function render() {
    const [idRaw, anchor] = location.hash.replace(/^#\/?/, "").split("#");
    const id = byId[idRaw] ? idRaw : "home";
    const page = byId[id];
    currentId = id;
    $$(".sn-group", sideNav).forEach(g => { const me = g.dataset.id === id; g.classList.toggle("current", me); if (me) setOpen(g, true); });
    $$(".sn-link", sideNav).forEach(a => a.classList.toggle("on", a.dataset.id === id));
    markSub(null);
    document.title = (id === "home" ? "" : page.title + " · ") + "PawaEN Wiki";

    if (id === "home") {
      app.innerHTML = homeHTML();
      spy && spy.disconnect();
    } else {
      const i = PAGES.indexOf(page), prev = PAGES[i - 1], next = PAGES[i + 1];
      app.innerHTML = `
<p class="crumbs"><a href="#/home">Home</a> › ${page.nav}</p>
<article class="panel fade-in"><h1 class="title-chip">${page.icon} ${page.title}</h1><p class="lead muted">${page.blurb}</p>${page.html}
  <div class="pg-nav">${prev ? `<a class="prev" href="#/${prev.id}"><small>Previous</small>‹ ${prev.title}</a>` : "<span></span>"}${next ? `<a class="next" href="#/${next.id}"><small>Next</small>${next.title} ›</a>` : ""}</div>
</article>`;
      buildSpy();
    }
    enhance(app);
    // jump instantly on page change (CSS smooth scrolling is only for in-page links)
    if (anchor) { const t = document.getElementById(anchor); if (t) { t.scrollIntoView({ behavior: "instant" }); markSub(anchor); } }
    else window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ---------- scrollspy: highlight the subsection in the sidebar ---------- */
  let spy;
  function buildSpy() {
    const hs = $$("article h2[id], article h3[id]", app);
    spy && spy.disconnect();
    spy = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) markSub(en.target.id); }),
      { rootMargin: "0px 0px -75% 0px" });
    hs.forEach(h => spy.observe(h));
  }

  /* ---------- widgets ---------- */
  function enhance(root) {
    // code copy buttons
    $$("pre", root).forEach(pre => {
      const b = document.createElement("button");
      b.className = "copy"; b.textContent = "Copy";
      b.addEventListener("click", () => {
        const txt = pre.querySelector("code").innerText.split("\n").map(l => l.replace(/\s+#\s.*$/, "")).join("\n");
        copy(txt, b);
      });
      pre.appendChild(b);
    });
    // address chips
    $$(".addr", root).forEach(a => { a.title = "Click to copy"; a.addEventListener("click", () => copy(a.textContent)); });
    // news
    $$("[data-news]", root).forEach(renderNews);
    // tabs
    $$("[data-tabs]", root).forEach(t => {
      const tabs = $$("[role=tab]", t), panels = $$("[role=tabpanel]", t);
      const sel = i => tabs.forEach((b, j) => { b.setAttribute("aria-selected", i === j); b.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
      tabs.forEach((b, i) => {
        b.addEventListener("click", () => sel(i));
        b.addEventListener("keydown", e => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) { const n = (i + d + tabs.length) % tabs.length; sel(n); tabs[n].focus(); }
        });
      });
      sel(0);
    });
    // flip cards
    $$(".flip", root).forEach(f => {
      const go = () => { const on = f.classList.toggle("on"); f.setAttribute("aria-pressed", on); };
      f.addEventListener("click", go);
      f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    // checklists (saved)
    $$("[data-store]", root).forEach(list => {
      const key = list.dataset.store, boxes = $$("input[type=checkbox]", list), saved = store.get(key);
      boxes.forEach((b, i) => { b.checked = saved.includes(i); });
      const meter = () => {
        if (!list.hasAttribute("data-meter")) return;
        const n = boxes.filter(b => b.checked).length;
        const panel = list.closest("article");
        $(".check-meter i", panel).style.width = (n / boxes.length * 100) + "%";
        $("[data-meter-label]", panel).textContent = `${n} of ${boxes.length} done` + (n === boxes.length ? " · ready to install!" : "");
      };
      list.addEventListener("change", () => { store.set(key, boxes.map((b, i) => b.checked ? i : -1).filter(i => i >= 0)); meter(); });
      meter();
      const reset = $(`[data-reset="${key}"]`, root);
      reset && reset.addEventListener("click", () => { boxes.forEach(b => b.checked = false); store.set(key, []); meter(); });
    });
    // to-do filter
    $$("[data-filter]", root).forEach(f => f.addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (!c) return;
      $$(".chip", f).forEach(x => x.classList.toggle("on", x === c));
      $$("#todo li").forEach(li => li.hidden = c.dataset.f !== "all" && li.dataset.k !== c.dataset.f);
    }));
    // progress bars
    $$("[data-bars] i", root).forEach(i => requestAnimationFrame(() => setTimeout(() => i.style.width = i.dataset.w + "%", 80)));
    // counters
    $$("[data-count]", root).forEach(el => countUp(el, +el.dataset.count));
    // ring
    if ($(".ring", root)) ring(root);
    // demos
    demos(root);
  }

  function countUp(el, to) {
    const t0 = performance.now(), dur = 1300;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function ring(root) {
    const bar = $(".ring .bar", root), bar2 = $(".ring .bar2", root), num = $("#ringNum"), cap = $("#ringCap");
    const show = mode => {
      const v = mode === "lines" ? STATUS.linesPct : STATUS.charsPct;
      const other = mode === "lines" ? STATUS.charsPct : STATUS.linesPct;
      bar.style.strokeDashoffset = 578 * (1 - v / 100);
      bar2.style.strokeDashoffset = 415 * (1 - other / 100);
      cap.textContent = mode === "lines" ? "of lines" : "of characters";
      const t0 = performance.now(), from = parseFloat(num.textContent) || 0;
      const step = t => { const p = Math.min(1, (t - t0) / 900); num.textContent = (from + (v - from) * (1 - Math.pow(1 - p, 3))).toFixed(1) + "%"; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    $$(".ring-toggle button", root).forEach(b => b.addEventListener("click", () => {
      $$(".ring-toggle button", root).forEach(x => x.classList.toggle("on", x === b)); show(b.dataset.ring);
    }));
    setTimeout(() => show("lines"), 120);
  }

  function demos(root) {
    // RDB offset calculator
    const pos = $("#dPos", root);
    if (pos) {
      const w7 = $("#dW7", root), out = $("#dOut", root);
      const calc = () => {
        const p = parseInt(pos.value, 16), w = parseInt(w7.value, 16);
        if (isNaN(p) || isNaN(w)) { out.textContent = "Enter hex numbers, e.g. 0x1A2B3"; return; }
        const sh = w & 31, off = BigInt(p) << BigInt(sh);
        out.innerHTML = `shift = word7 &amp; 31 = <b>${sh}</b> → file offset = 0x${p.toString(16).toUpperCase()} &lt;&lt; ${sh} = <b>0x${off.toString(16).toUpperCase()}</b> (${fmt(Number(off))} bytes)`;
      };
      [pos, w7].forEach(i => i.addEventListener("input", calc)); calc();
    }
    // PNG -> CHK name split
    const nm = $("#dName", root);
    if (nm) {
      const out = $("#dSplit", root);
      const calc = () => {
        const base = nm.value.replace(/\.png$/i, ""), i = base.lastIndexOf("__");
        out.innerHTML = i < 0 ? "No <code>__</code> found: this name can't be imported." :
          `CHK: <b>${esc(base.slice(0, i))}.CHK</b> · texture tag: <b>${esc(base.slice(i + 2))}</b>`;
      };
      nm.addEventListener("input", calc); calc();
    }
    // full-width preview
    const fw = $("#fwIn", root);
    if (fw) {
      const out = $("#fwOut", root);
      const map = { "'": "’", '"': "”", "`": "‘", "~": "￣", "\\": "￥", " ": "　" };
      const calc = () => { out.textContent = [...fw.value].map(c => map[c] || (c > " " && c <= "~" ? String.fromCharCode(c.charCodeAt(0) + 0xFEE0) : c)).join(""); };
      fw.addEventListener("input", calc); calc();
    }
    // placeholder check
    const ja = $("#phJa", root);
    if (ja) {
      const en = $("#phEn", root), out = $("#phOut", root);
      const ph = s => (s.match(/%[sd]/g) || []);
      const calc = () => {
        const a = ph(ja.value), b = ph(en.value), ok = a.join() === b.join();
        const bare = /%(?![sd])\s?[A-Za-z ]/.test(en.value.replace(/%[sd]/g, ""));
        out.innerHTML = (ok ? `✅ Placeholders match: ${a.join(" ") || "none"}` : `❌ Mismatch: Japanese has <b>${a.join(" ") || "none"}</b>, English has <b>${b.join(" ") || "none"}</b>. This can crash the game.`)
          + (bare ? `<br>⚠️ A bare <code>%</code> before a space or letter reads as a placeholder. Use full-width <code>％</code>.` : "");
      };
      [ja, en].forEach(i => i.addEventListener("input", calc)); calc();
    }
    // dictionary wrap
    const di = $("#dictIn", root);
    if (di) {
      const out = $("#dictOut", root);
      const calc = () => {
        const words = di.value.trim().split(/\s+/).filter(Boolean), rows = [];
        let cur = "";
        words.forEach(w => { if ((cur ? cur + " " + w : w).length > 44 && cur) { rows.push(cur); cur = w; } else cur = cur ? cur + " " + w : w; });
        if (cur) rows.push(cur);
        out.innerHTML = rows.map((r, i) => `<div style="padding:4px 8px;margin:4px 0;border-radius:8px;background:${i < 3 ? "#fff" : "#fff1f2"};border:2px solid ${i < 3 ? "var(--line)" : "#ffc9cd"}">Row ${i + 1} <span class="muted">(${r.length}/44)</span>: ${esc(r)}</div>`).join("")
          + (rows.length > 3 ? `<p style="color:var(--red);font-weight:800;margin:6px 0 0">Too long: only 3 rows fit on a page. Shorten it or split it over pages.</p>` : `<p style="color:#1ba37a;font-weight:800;margin:6px 0 0">Fits on one page.</p>`);
      };
      di.addEventListener("input", calc); calc();
    }
  }

  /* ---------- copy + toast ---------- */
  function copy(text, btn) {
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => {
      if (btn) { btn.textContent = "Copied!"; btn.classList.add("done"); setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1400); }
      else toast("Copied " + text);
    }).catch(() => toast("Copy not allowed here"));
  }
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 1500);
  }

  /* ---------- search ---------- */
  const index = PAGES.flatMap(p => {
    if (p.id === "home") return [];
    const div = document.createElement("div"); div.innerHTML = p.html;
    const secs = [{ page: p, id: "", title: p.title, text: p.blurb }];
    let cur = null;
    [...div.childNodes].forEach(n => {
      if (n.nodeName === "H2") { cur = { page: p, id: n.id, title: n.textContent, text: "" }; secs.push(cur); }
      else if (cur) cur.text += " " + (n.textContent || "");
      else secs[0].text += " " + (n.textContent || "");
    });
    return secs;
  }).concat(NEWS.map(n => ({ page: byId[n.p], id: "", title: n.t, text: n.b.replace(/<[^>]+>/g, ""), news: n.d })));

  const modal = $("#searchModal"), input = $("#searchInput"), results = $("#searchResults");
  let sel = 0;
  const openSearch = () => { modal.hidden = false; input.value = ""; draw(); input.focus(); };
  const closeSearch = () => { modal.hidden = true; };
  function draw() {
    const q = input.value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    let hits = !terms.length ? index.filter(s => !s.id && !s.news) :
      index.map(s => {
        const hay = (s.title + " " + s.text).toLowerCase();
        if (!terms.every(t => hay.includes(t))) return null;
        const score = terms.reduce((a, t) => a + (s.title.toLowerCase().includes(t) ? 5 : 0) + hay.split(t).length, 0);
        return { s, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).map(x => x.s);
    hits = hits.slice(0, 12); sel = 0;
    const mark = str => { let o = esc(str); terms.forEach(t => { o = o.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), m => `<mark>${m}</mark>`); }); return o; };
    const snip = s => {
      const txt = s.text.replace(/\s+/g, " ").trim(); const i = terms.length ? txt.toLowerCase().indexOf(terms[0]) : 0;
      return mark((i > 40 ? "…" : "") + txt.slice(Math.max(0, i - 40), Math.max(0, i - 40) + 120) + "…");
    };
    results.innerHTML = hits.length ? hits.map((s, i) =>
      `<li><a href="#/${s.page.id}${s.id ? "#" + s.id : ""}" class="${i ? "" : "sel"}"><b>${s.news ? "🗓️ " + s.news + " · " : s.page.icon + " "}${mark(s.title)}${s.id ? ` <small>in ${s.page.title}</small>` : ""}</b><small>${snip(s)}</small></a></li>`).join("")
      : `<li style="padding:14px" class="muted">No results for “${esc(q)}”. Try a tool name like <code>chk_tool</code> or a topic like <code>font</code>.</li>`;
  }
  input.addEventListener("input", draw);
  input.addEventListener("keydown", e => {
    const as = $$("#searchResults a");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!as.length) return;
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + as.length) % as.length;
      as.forEach((a, i) => a.classList.toggle("sel", i === sel)); as[sel].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && as[sel]) { location.hash = as[sel].getAttribute("href"); closeSearch(); }
  });
  results.addEventListener("click", e => { if (e.target.closest("a")) closeSearch(); });
  modal.addEventListener("click", e => { if (e.target === modal) closeSearch(); });
  $("#openSearch").addEventListener("click", openSearch);
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); modal.hidden ? openSearch() : closeSearch(); }
    else if (e.key === "Escape" && !modal.hidden) closeSearch();
    else if (e.key === "/" && modal.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ---------- go ---------- */
  window.addEventListener("hashchange", render);
  render();
})();
