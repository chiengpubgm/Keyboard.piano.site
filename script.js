// Key map: keyboard letter -> note frequency (Hz)
const notes = {
  a: 262, // C  Do
  s: 294, // D  Re
  d: 330, // E  Mi
  f: 349, // F  Fa
  g: 392, // G  Sol
  h: 440, // A  La
  j: 494, // B  Ti
  k: 523  // C  Do (high)
};

// Sound helper
const ctx = new AudioContext();

function playNote(freq) {
  const osc = ctx.createOscillator();
  osc.frequency.value = freq;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

// Press: light up the key and play the note
document.addEventListener("keydown", function (e) {
  if (e.repeat) return;                 // ignore auto-repeat while holding
  const key = e.key.toLowerCase();      // works with Caps Lock
  if (!(key in notes)) return;          // ignore unmapped keys

  const el = document.querySelector('[data-key="' + key + '"]');
  if (ctx.state === "suspended") ctx.resume(); // browsers block audio until a user gesture
  el.classList.add("active");
  playNote(notes[key]);
});

// Release: turn the light off
document.addEventListener("keyup", function (e) {
  const key = e.key.toLowerCase();
  if (!(key in notes)) return;

  document.querySelector('[data-key="' + key + '"]').classList.remove("active");
});