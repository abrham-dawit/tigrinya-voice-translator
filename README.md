# Tigrinya Voice Translator — type it, hear it, say it

My idea: a translator for Tigrinya (and Amharic) that works the way people actually learn a language — not just text in, text out, but a **voice typer** so you can speak and see it written, and a **voice speaker** on every phrase so you can hear how it sounds before you say it to your grandmother and get lovingly corrected anyway.

## What this version does

- **Starter phrasebook** — everyday English phrases with their Tigrinya and Amharic versions, each shown in Ge'ez script *and* transliteration, so you can read it even if you're still learning the script.
- **Speaker buttons** — every phrase has a 🔊 button that reads it out loud using your browser's built-in speech synthesis.
- **Voice typer** — type anything and press *Hear it*, or use the mic: in browsers that support speech recognition, it types what you say so you can practice and compare against the phrasebook.
- **Search** across English, script, and transliteration.

Open `index.html` in a browser. No build step, no accounts, no servers, nothing sent anywhere.

## What's honest about this version

- **The phrasebook is starter entries only.** Greetings, thank you, yes/no, please, a handful of everyday words — 18 entries. They're the basics I'm confident in as a starting point, and they should still be checked with a native speaker before formal use. Growing this list *with* family verification is part of the project, not an afterthought.
- **Playback quality depends on your device's voices.** If your phone/computer has a Tigrinya or Amharic voice installed, it sounds right. If not, the browser falls back to its default voice and the pronunciation of Ge'ez script will be off — the page tells you which case you're in. The script and transliteration on each card are always the reliable part.
- **Speech recognition for Tigrinya/Amharic is spotty.** It depends entirely on the browser/OS. English recognition works well in Chrome; the Tigrinya/Amharic mic is there for devices that support it, and the page says so instead of pretending.
- This is not a full translator — there's no sentence translation engine here. A real version needs a proper translation model or a much bigger verified phrasebook, plus recorded native-speaker audio instead of synthesized voices.

## Where it goes next

1. Grow the phrasebook with family-verified entries — food, family words, church words, numbers, days.
2. Recorded audio from real speakers next to the synthesized playback.
3. A "practice mode" that plays a phrase and checks your attempt.
