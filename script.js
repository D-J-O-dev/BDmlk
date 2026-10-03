
const CONFIG = {
  pcPhoto: "abdla3ziz.jpg", // photo shown on the computer
  pcCaption: ".....",
  persist: "session",            // "session" = progress resets when the tab is closed (survives refresh); "forever" = saved until Reset
  recipient: "MOLKA",            // shown on the boot screen
  name: "Molka",                 // shown in "Happy Birthday, ..."
  music: "song.mp3",     // optional local file (never autoplays)
  giftMessage: "I wanted to say THANK YOU for all the years we've been friends, u dont k how much this realtionship means to me. I dont think I can imagine a life without the tea molka be cooking. I WISH YOU A HAPPY BIRTHDAY FROM MY HEART ",
  bowSecret: "wtf chemask ",
  plushTaps: ["...", "...", "...", "...NIGGA RITH.", "...", "YA BRO....", "HETHA ISMOU TA7ARACH UR 18 "],
  trashImage: "image.png", // shown after "...except one thing."
  trashText: "ZEBLA",
  adminLines: ["SUBJECT: " + "MOLKA", "THREAT LEVEL: HIGH TO EXTREEEEM ", "KNOWN WEAKNESSES: FOOD ", "CLASSIFIED HABIT: WATCHING PPL DIE", "STATUS: CERTIFIED HOMIEEEEEEEE"],
  finalMessage: "I WANNA TELL YOU THAT UR SPECIAL AND I HOPE U NEVER STOP BEING YOU. WE'LL MEET ONE DAY.. HAVE A HAAPPY BIRTHDAY"
};
// type is a free label. image is optional (e.g. "assets/photo1.jpg"); a placeholder shows if missing.
const files = [
  { number: 1, title: "U said u wished I was in Tunisia",      type: "memory",       content: "to make photos w me well I wished ur here w me so I made it true", image: "1.png"  },
  { number: 2, title: "Well after that",        type: "inside joke",  content: "we went to a mountain thingy for some reason ",image: "mount.png"  },
  { number: 3, title: "WTF",     type: "photo",        content: "hmmm u gained sm weight ", image: "boat.png" },
  { number: 4, title: "then we went to ?",    type: "favorite thing", content: "Jnina... OK ? ", image: "JnIna.png"  },
  { number: 5, title: "BASKETBALL",  type: "quote",        content: "\"OFC METSWRIN M3A THE GOAT\"" , image: "basket.png" },
  { number: 6, title: "ohhhh yeh nostolgia", type: "achievement", content: "when I was in my prime ",image: "arnold.png"  },
  { number: 7, title: "hmmmmmm since when u drink ? ",  type: "thank you",    content: "IG..", image: "last.png"  }   // finale; text is CONFIG.finalMessage
];
// ===============================
// END PERSONALIZE SECTION
// ===============================

const $ = s => document.querySelector(s), KEY = "hk-delivery-v1", TOTAL = files.length;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const store = CONFIG.persist === "forever" ? localStorage : sessionStorage;
let st = { opened: [], sound: true, delivered: false };
try { st = { ...st, ...JSON.parse(store.getItem(KEY)) }; } catch (e) {}
const save = () => { try { store.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
const ready = () => st.opened.length >= TOTAL;

// ---------- sound ----------
let ac;
function beep(f = 600, d = .1, t = "sine") {
  if (!st.sound) return;
  try { ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(); o.type = t; o.frequency.value = f;
    g.gain.setValueAtTime(.08, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + d); } catch (e) {}
}
const jingle = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, .25), i * 120));

// ---------- helpers ----------
function toast(t, ms = 2400) { const e = $("#toast"); e.textContent = t; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => e.hidden = true, ms); }
function show(html, dark) { $("#body").innerHTML = html; $("#modal").className = dark ? "dark" : ""; $("#modal").hidden = false; $("#card").scrollTop = 0; }
function hide() { $("#modal").hidden = true; checkUnlock(); }
function burst(n = 30, chars = ["💖", "✨", "🎀", "🎉"], x = innerWidth / 2, y = innerHeight / 2) {
  for (let i = 0; i < n; i++) { const s = document.createElement("span"), a = Math.random() * 6.28, d = 80 + Math.random() * 260;
    s.textContent = chars[i % chars.length]; s.style.cssText = `left:${x}px;top:${y}px;font-size:${14 + Math.random() * 18}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 80}px;--r:${Math.random() * 720}deg`;
    $("#fx").appendChild(s); setTimeout(() => s.remove(), 1900); }
}
function updateHud() {
  $("#count").textContent = `${st.opened.length} / ${TOTAL} FILES`;
  $("#gift").classList.toggle("ready", ready() && !st.delivered);
  $("#gift em").textContent = ready() ? "OPEN ME 🔓" : "DO NOT OPEN";
}
function checkUnlock() { if (ready() && !st.announced) { st.announced = true; save(); toast("🔓 DELIVERY AUTHORIZED", 4000); jingle(); burst(20); updateHud(); } }

// ---------- boot ----------
async function type(el, txt, sp = 35) { for (const c of txt) { el.textContent += c; await sleep(sp); } }
async function boot() {
  const t = $("#bootText");
  await type(t, "HELLO KITTY™\nSPECIAL DELIVERY SYSTEM\n\nInitializing...\n");
  for (let i = 0; i <= 100; i += 2) { $("#bar i").style.width = i + "%"; await sleep(30); }
  await type(t, "\nRECIPIENT DETECTED\n> " + CONFIG.recipient + "\n\n"); await sleep(400);
  await type(t, "ACCESS GRANTED 🎀"); $("#enter").hidden = false;
}
$("#enter").onclick = () => { beep(880); $("#boot").style.opacity = 0; $("#app").hidden = false; setTimeout(() => { $("#bubble").hidden = false; setTimeout(() => $("#bubble").hidden = true, 5500); }, 900); setTimeout(() => $("#boot").remove(), 800); updateHud(); };

// ---------- diary & files ----------
function diary() {
  show(`<div class="tag">Personal files</div><div class="big">📖 ${st.opened.length} / ${TOTAL} accessed</div><div class="grid">${files.map(f =>
    `<button class="tile ${st.opened.includes(f.number) ? "done" : ""} ${f.number === TOTAL ? "f18" : ""}" data-n="${f.number}">${f.number}</button>`).join("")}</div>`);
  document.querySelectorAll(".tile").forEach(b => b.onclick = () => openFile(+b.dataset.n));
}
function openFile(n) {
  const f = files.find(x => x.number === n); beep(660 + n * 20);
  if (!st.opened.includes(n)) { st.opened.push(n); save(); updateHud(); }
  if (n === TOTAL) return finale();
  const img = f.image ? `<div class="polaroid"><img src="${f.image}" alt="" onerror="this.parentNode.innerHTML='<div class=\\'ph\\'>📷 Put a photo at ${f.image}</div>'"></div>` : "";
  show(`<div class="tag">${f.type} · file ${f.number}</div><div class="big">${f.title}</div>${img}<p class="hand">${f.content}</p><button class="btn" id="back">← back to files</button>`);
  $("#back").onclick = diary;
}
async function finale() {
  show(`<div class="mono">FILE ${TOTAL}</div><p class="big fade" style="animation-delay:.8s">This one isn't a memory.</p><p class="big fade" style="animation-delay:2.4s">It's a thank you.</p><p class="hand fade" style="animation-delay:4.5s">${CONFIG.finalMessage}</p><button class="btn fade" style="animation-delay:5.5s" id="back">close</button>`, true);
  $("#back").onclick = hide; jingle();
  for (let i = 0; i < 4; i++) { await sleep(1500); if ($("#modal").hidden) break; burst(6, ["💖", "🎀", "✨"], innerWidth * Math.random(), innerHeight * .8); }
}

// ---------- gift ----------
let busy = false;
$("#gift").onclick = async () => {
  if (busy) return;
  beep(300);
  if (!ready()) return show(`<div class="big">🔒 DELIVERY LOCKED</div><p>Recipient verification incomplete.</p><p class="mono"><b>${st.opened.length} / ${TOTAL} files accessed</b></p>`);
  busy = true;
  try {
    const b = $("#gift"); b.classList.remove("ready"); b.classList.add("open"); jingle();
    for (let i = 0; i < 4; i++) { burst(24, ["💖", "✨", "🎀", "🎉", "🟥", "🟨"]); await sleep(300); }
  } catch (e) {}
  st.delivered = true; save(); updateHud(); busy = false;
  show(`<div class="big">🎀 DELIVERY COMPLETE 🎀</div><p>This package was prepared especially for you.</p><div class="big fade" style="animation-delay:1.2s">Happy Birthday, ${CONFIG.name} </div><p class="hand fade" style="animation-delay:2.5s">${CONFIG.giftMessage}</p>`);
};

// ---------- room objects ----------
$("#pcimg").setAttribute("href", CONFIG.pcPhoto);
$("#pc").onclick = () => { beep(500); show(`<div class="tag">photo</div><div class="polaroid"><img src="${CONFIG.pcPhoto}" alt="" onerror="this.parentNode.innerHTML='<div class=\\'ph\\'>🖼️ Add your photo at ${CONFIG.pcPhoto}</div>'"></div><p class="hand">${CONFIG.pcCaption}</p>`); };
$("#diary").onclick = () => { beep(500); diary(); };
$("#phone").onclick = () => { beep(700); show(`<div class="tag">Messages</div><div class="big">📱 3 new</div><p class="hand">"YAAAAA BROOO 3LH 9TLATHA EL TOFLA"</p><p class="hand">"OHH..."</p><p class="hand">"YEHHH I would 2 ngl"</p>`); };
let sk = 0; $("#win").onclick = () => { const w = $("#win"), T = ["day", "sunset", "night"], E = ["☀️", "🌇", "🌙"], i = (T.indexOf(w.dataset.time) + 1) % 3; w.dataset.time = T[i]; $("#sky").textContent = E[i]; beep(400 + i * 100); };
let bow = 0; $("#bow").onclick = () => { beep(500 + bow * 60); if (++bow >= 7) { bow = 0; jingle(); burst(20); show(`<div class="big">🎀 SECRET FOUND</div><p>You weren't supposed to find this.</p><p class="hand">${CONFIG.bowSecret}</p>`); } };
let pl = 0; $("#plush").onclick = () => { beep(300 + pl * 40, .15); const m = CONFIG.plushTaps; toast(m[Math.min(pl, m.length - 1)]); if (++pl === m.length) { burst(12); jingle(); } };
$("#trash").onclick = async () => { beep(200); show(`<div class="big">TRASH</div><p class="mono">0 items</p>`); await sleep(2200);
  if (!$("#modal").hidden) $("#body").innerHTML += `<p class="hand fade">...except one thing.</p><div class="polaroid fade" style="animation-delay:.6s"><img src="${CONFIG.trashImage}" alt="" onerror="this.parentNode.innerHTML='<div class=\\'ph\\'>🗑️ Add assets/trash.jpg</div>'"></div><p class="hand fade" style="animation-delay:1s">${CONFIG.trashText}</p>`; };
$("#clock").onclick = () => { $("#clock").classList.add("glitch"); beep(120, .4, "sawtooth"); setTimeout(() => $("#clock").classList.remove("glitch"), 1300);
  setTimeout(() => show(`<div class="big mono">ERROR</div><p class="mono">TIME IS CURRENTLY:</p><p class="big">EL WA9TT S3IIB</p>`), 700); };

// ---------- admin easter egg (Konami, or type "admin"; mobile: tap the file counter 5x) ----------
const K = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]; let ki = 0, buf = "";
function admin() { jingle(); show(`<div class="tag">ADMIN ACCESS</div><div class="big mono">CLASSIFIED</div><p class="mono" style="text-align:left">${CONFIG.adminLines.map(l => "▸ " + l).join("<br>")}</p>`, true); }
addEventListener("keydown", e => { ki = e.key === K[ki] ? ki + 1 : (e.key === K[0] ? 1 : 0); if (ki === K.length) { ki = 0; admin(); }
  buf = (buf + e.key).slice(-5).toLowerCase(); if (buf === "admin") admin(); });
let ct = 0; $("#count").onclick = () => { if (++ct >= 5) { ct = 0; admin(); } setTimeout(() => ct = 0, 3000); };

// ---------- music & settings ----------
const audio = new Audio(CONFIG.music); audio.loop = true; audio.volume = .4;
$("#musicBtn").onclick = () => {
  if (audio.paused) audio.play().then(() => $("#musicBtn").textContent = "🎵 Music: ON").catch(() => toast("Add a music file at " + CONFIG.music));
  else { audio.pause(); $("#musicBtn").textContent = "🎵 Music: OFF"; }
};
$("#setBtn").onclick = () => { show(`<div class="big">⚙ Settings</div><label><input type="checkbox" id="snd" ${st.sound ? "checked" : ""}> UI sounds</label><br><button class="btn" id="rst">Reset Experience</button>`);
  $("#snd").onchange = e => { st.sound = e.target.checked; save(); };
  $("#rst").onclick = () => { if (confirm("Reset all progress and start over?")) { try { store.removeItem(KEY); } catch (e) {} location.reload(); } }; };
$("#close").onclick = hide; $("#modal").onclick = e => { if (e.target.id === "modal") hide(); };
boot();
