// Tigrinya Voice Translator — starter phrasebook + browser speech tools.
//
// STARTER ENTRIES ONLY: basic greetings and everyday words. They are meant
// to be checked and grown with native speakers — see README.md.

// Each entry: en (English), ti {script, translit} or null, am {script, translit} or null
const PHRASES = [
  { en: "Hello / Peace", ti: { s: "ሰላም", t: "Selam" }, am: { s: "ሰላም", t: "Selam" } },
  { en: "How are you? (to a man)", ti: { s: "ከመይ አለኻ?", t: "Kemey alekha?" }, am: { s: "እንዴት ነህ?", t: "Endet neh?" } },
  { en: "How are you? (to a woman)", ti: { s: "ከመይ አለኺ?", t: "Kemey aleki?" }, am: { s: "እንዴት ነሽ?", t: "Endet nesh?" } },
  { en: "I'm fine", ti: null, am: { s: "ደህና ነኝ", t: "Dehna negn" } },
  { en: "Thank you", ti: { s: "የቕንየለይ", t: "Yeqeniyeley" }, am: { s: "አመሰግናለሁ", t: "Ameseginalehu" } },
  { en: "Yes", ti: { s: "እወ", t: "Ewe" }, am: { s: "አዎ", t: "Awo" } },
  { en: "No", ti: { s: "ኣይኮነን", t: "Aykonen" }, am: { s: "አይደለም", t: "Aydelem" } },
  { en: "Please (to a man)", ti: null, am: { s: "እባክህ", t: "Ebakeh" } },
  { en: "Excuse me / Sorry", ti: { s: "ይቕሬታ", t: "Yiqreyta" }, am: { s: "ይቅርታ", t: "Yiqerta" } },
  { en: "My name is ___", ti: { s: "ስምየ ___ እዩ", t: "Smiye ___ iyu" }, am: { s: "ስሜ ___ ነው", t: "Sime ___ new" } },
  { en: "Goodbye (stay in peace)", ti: { s: "ብሰላም ኩን", t: "B'selam kun" }, am: { s: "ደህና ሁን", t: "Dehna hun" } },
  { en: "Water", ti: { s: "ማይ", t: "May" }, am: { s: "ውሃ", t: "Wuha" } },
  { en: "Coffee", ti: { s: "ቡን", t: "Bun" }, am: { s: "ቡና", t: "Buna" } },
  { en: "Injera (the bread)", ti: { s: "እንጀራ", t: "Injera" }, am: { s: "እንጀራ", t: "Injera" } },
  { en: "God", ti: { s: "እግዚአብሄር", t: "Egziabher" }, am: { s: "እግዚአብሄር", t: "Egziabher" } },
  { en: "Love", ti: { s: "ፍቕሪ", t: "Fiqri" }, am: { s: "ፍቅር", t: "Fiqr" } },
  { en: "Hope", ti: { s: "ተስፋ", t: "Tesfa" }, am: { s: "ተስፋ", t: "Tesfa" } },
  { en: "Peace (the word)", ti: { s: "ሰላም", t: "Selam" }, am: { s: "ሰላም", t: "Selam" } },
];

const synth = window.speechSynthesis;
function voiceFor(langPrefix) {
  if (!synth) return null;
  return synth.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix)) || null;
}

function speak(text, langPrefix, fullLang) {
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = voiceFor(langPrefix);
  if (v) u.voice = v;
  u.lang = fullLang;
  u.rate = 0.85;
  synth.speak(u);
}

function langBlock(label, entry, langPrefix, fullLang) {
  if (!entry) return `<div class="lang-block"><div class="lang-text"><span class="lang-name">${label}</span><span class="translit">— not in starter list yet</span></div></div>`;
  return `
    <div class="lang-block">
      <button class="speak-btn" data-speak="${entry.s}" data-prefix="${langPrefix}" data-lang="${fullLang}" title="Hear it in ${label}" ${synth ? "" : "disabled"}>🔊</button>
      <div class="lang-text">
        <span class="lang-name">${label}</span>
        <span class="script">${entry.s}</span>
        <span class="translit">${entry.t}</span>
      </div>
    </div>`;
}

const phraseList = document.getElementById("phraseList");
function renderPhrases(q) {
  const query = (q || "").trim().toLowerCase();
  const view = PHRASES.filter(p =>
    !query || p.en.toLowerCase().includes(query) ||
    (p.ti && (p.ti.s.includes(query) || p.ti.t.toLowerCase().includes(query))) ||
    (p.am && (p.am.s.includes(query) || p.am.t.toLowerCase().includes(query))));
  phraseList.innerHTML = view.length ? view.map(p => `
    <div class="phrase">
      <div class="en">${p.en}</div>
      ${langBlock("Tigrinya", p.ti, "ti", "ti-ET")}
      ${langBlock("Amharic", p.am, "am", "am-ET")}
    </div>`).join("")
    : `<p class="empty-note">No starter phrase matches that yet. The list is small on purpose — it grows as entries get verified.</p>`;
  phraseList.querySelectorAll("[data-speak]").forEach(btn => {
    btn.addEventListener("click", () => speak(btn.dataset.speak, btn.dataset.prefix, btn.dataset.lang));
  });
}
renderPhrases("");
document.getElementById("searchBox").addEventListener("input", (e) => renderPhrases(e.target.value));

// Honest note about available voices on this device.
function voiceNote() {
  const note = document.getElementById("voiceNote");
  if (!synth) { note.textContent = "This browser doesn't support speech playback, so the speaker buttons are disabled."; return; }
  const ti = voiceFor("ti"), am = voiceFor("am");
  if (ti || am) {
    note.textContent = "Good news: this device has a " + [ti && "Tigrinya", am && "Amharic"].filter(Boolean).join(" and ") + " voice installed, so playback should sound right.";
  } else {
    note.textContent = "Heads up: this device doesn't seem to have a Tigrinya or Amharic voice installed, so the speaker buttons will use the closest voice your browser has — the spelling and transliteration on each card are the reliable part, and pronunciation may be off. On phones, you can usually add voices in Settings → Accessibility → Spoken Content.";
  }
}
if (synth) { synth.onvoiceschanged = voiceNote; voiceNote(); }

// --- Voice typer ---
const typerBox = document.getElementById("typerBox");
const langSelect = document.getElementById("langSelect");
const status = document.getElementById("typerStatus");

document.getElementById("speakBtn").addEventListener("click", () => {
  const text = typerBox.value.trim();
  if (!text) { status.textContent = "Type something first, then press Hear it."; return; }
  const lang = langSelect.value;
  speak(text, lang.slice(0, 2), lang);
});

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const micBtn = document.getElementById("micBtn");
if (!Recognition) {
  micBtn.disabled = true;
  status.textContent = "Voice typing isn't supported in this browser (Chrome supports it). Typing + Hear it still works.";
} else {
  const rec = new Recognition();
  rec.interimResults = false;
  let listening = false;
  micBtn.addEventListener("click", () => {
    if (listening) { rec.stop(); return; }
    rec.lang = langSelect.value;
    try { rec.start(); } catch (e) { /* already started */ }
  });
  rec.addEventListener("start", () => {
    listening = true;
    micBtn.classList.add("listening");
    micBtn.textContent = "🔴 Listening… tap to stop";
    status.textContent = "Listening… speak now. (For Tigrinya/Amharic this only works if your device supports that recognition language.)";
  });
  rec.addEventListener("result", (e) => {
    const text = e.results[0][0].transcript;
    typerBox.value = (typerBox.value ? typerBox.value + " " : "") + text;
    status.textContent = "Heard: \"" + text + "\" — check it against the phrasebook; recognition makes mistakes, especially across languages.";
  });
  rec.addEventListener("end", () => {
    listening = false;
    micBtn.classList.remove("listening");
    micBtn.textContent = "🎤 Voice type";
  });
  rec.addEventListener("error", (e) => {
    status.textContent = "Mic error: " + e.error + ". You may need to allow microphone access, or this language may not be supported on this device.";
  });
}
