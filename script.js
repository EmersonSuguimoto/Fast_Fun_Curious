/* ============================================================
   Bello! English Meeting — slide controller + mini-games
   ============================================================ */

/* ---------- Game data (edit freely) ---------- */
const GAMES = {
  vocabMatch: [
    { word: "keyboard",  icon: "⌨️" },
    { word: "coffee",    icon: "☕" },
    { word: "meeting",   icon: "👥" },
    { word: "calendar",  icon: "📅" },
    { word: "deadline",  icon: "⏰" },
  ],

  fillBlank: [
    { parts: ["She ", " to work every day."], options: ["go", "goes", "going"], answer: 1,
      tip: "Third person singular → add -s." },
    { parts: ["I ", " coffee right now."], options: ["drink", "am drinking", "drinks"], answer: 1,
      tip: "Right now → present continuous." },
    { parts: ["They ", " here yesterday."], options: ["are", "were", "was"], answer: 1,
      tip: "Past tense of 'are' is 'were'." },
    { parts: ["He has ", " his report."], options: ["finish", "finished", "finishing"], answer: 1,
      tip: "Present perfect: have/has + past participle." },
    { parts: ["We will ", " you tomorrow."], options: ["called", "calling", "call"], answer: 2,
      tip: "After 'will' → base form of the verb." },
  ],

  listening: [
    { sentence: "I would like a cup of tea, please.",
      options: [
        "I would like a cup of tea, please.",
        "I would like a cap of tea, please.",
        "I would like a cup of three, please.",
        "I would lick a cup of tea, please.",
      ], answer: 0 },
    { sentence: "She lives in a small house near the park.",
      options: [
        "She leaves in a small house near the park.",
        "She lives in a small house near the park.",
        "She lives in a small horse near the park.",
        "She lives in a small house near the dark.",
      ], answer: 1 },
    { sentence: "Could you send me the file by Friday?",
      options: [
        "Could you send me the file by Friday?",
        "Could you spend my file by Friday?",
        "Could you send me the file by Monday?",
        "Could you send me the phone by Friday?",
      ], answer: 0 },
  ],

  phrasal: [
    { parts: ["She finally gave ", " smoking."], options: ["up", "in", "out"], answer: 0,
      reveal: "give up = stop doing something" },
    { parts: ["Can you look ", " my dog this weekend?"], options: ["after", "up", "for"], answer: 0,
      reveal: "look after = take care of" },
    { parts: ["I need to figure ", " this problem."], options: ["into", "out", "over"], answer: 1,
      reveal: "figure out = understand / solve" },
    { parts: ["Please turn ", " the lights when you leave."], options: ["off", "in", "up"], answer: 0,
      reveal: "turn off = stop a device" },
    { parts: ["He always shows ", " late."], options: ["off", "up", "down"], answer: 1,
      reveal: "show up = arrive / appear" },
  ],

  idiom: [
    { art: "🐱☔🐶", phrase: '"It\'s raining cats and dogs"',
      options: [
        "It's raining very heavily.",
        "Pets are getting wet outside.",
        "Animals are falling from the sky.",
      ], answer: 0,
      reveal: "Heavy rain — nothing to do with pets!" },
    { art: "🍰🎂🍰", phrase: '"It\'s a piece of cake"',
      options: [
        "Time for dessert!",
        "It's very easy to do.",
        "Someone bought a cake.",
      ], answer: 1,
      reveal: "= very easy" },
    { art: "💡✨", phrase: '"To be on the same page"',
      options: [
        "To be reading the same book.",
        "To agree / share the same understanding.",
        "To work in the same office.",
      ], answer: 1,
      reveal: "= agree, share an understanding" },
    { art: "🦵🤞", phrase: '"Break a leg!"',
      options: [
        "Be careful, it's dangerous!",
        "Good luck!",
        "You will get hurt.",
      ], answer: 1,
      reveal: "= good luck (used before performances)" },
    { art: "🧊🤐", phrase: '"To break the ice"',
      options: [
        "To start a conversation in an awkward situation.",
        "To open a frozen lake.",
        "To stop being friends.",
      ], answer: 0,
      reveal: "= start a conversation, ease tension" },
  ],

  twister: [
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Red lorry, yellow lorry, red lorry, yellow lorry.",
  ],

  mistake: [
    { words: ["She", "don't", "like", "coffee."], wrongIndex: 1,
      reveal: "Use 'doesn't' for he/she/it." },
    { words: ["I", "have", "saw", "that", "movie."], wrongIndex: 2,
      reveal: "Past participle of 'see' is 'seen' (have seen)." },
    { words: ["He", "is", "more", "taller", "than", "me."], wrongIndex: 3,
      reveal: "Either 'taller' OR 'more tall' — never both." },
    { words: ["They", "is", "happy", "today."], wrongIndex: 1,
      reveal: "'They' takes 'are', not 'is'." },
    { words: ["I", "go", "to", "the", "park", "yesterday."], wrongIndex: 1,
      reveal: "Past tense → 'went', not 'go'." },
  ],

  scramble: [
    { word: "BANANA",   hint: "Minion's favorite snack 🍌" },
    { word: "OFFICE",   hint: "Where you work 💼" },
    { word: "FRIDAY",   hint: "The best day of the week 🎉" },
    { word: "ENGLISH",  hint: "What we are learning today 🇬🇧" },
    { word: "COFFEE",   hint: "Hot drink with caffeine ☕" },
  ],

  synonyms: [
    { word: "happy",
      same: ["joyful", "glad", "cheerful"],
      opposite: ["sad", "miserable", "upset"] },
  ],

  trueFalse: [
    { statement: "The plural of 'child' is 'childs'.", answer: false,
      reveal: "It's 'children' — irregular plural." },
    { statement: "'Their', 'there' and 'they're' all sound the same.", answer: true,
      reveal: "They're called homophones." },
    { statement: "We say 'I have 25 years old'.", answer: false,
      reveal: "Correct: 'I AM 25 years old'." },
    { statement: "'Beautiful' and 'pretty' are synonyms.", answer: true,
      reveal: "Both describe something attractive." },
    { statement: "The past tense of 'go' is 'goed'.", answer: false,
      reveal: "It's 'went' — irregular verb." },
  ],

  // Mini crossword: grid of 7x5; '#' = blocked. Words placed manually.
  crossword: {
    rows: 5,
    cols: 7,
    /* Layout:
       . B A N A N A
       . O . . . . .
       O F F I C E .
       . . . . . . .
       . . F R I D A Y  -> too long, use 6 cols starting col 1
       Re-design: 5 rows x 7 cols
       Row 0: . B A N A N A    (across "BANANA" start col 1)
       Row 1: . O . . . . .
       Row 2: . O . . . . .  (BOOK going down? let's use BOOK)
       Row 3: . K . . . . .
       Row 4: . . . . . . .

       Simpler: two crossing words.
       Across1 row 0 col 1..6: BANANA
       Down1 col 1 row 0..3: BOOK
       Across2 row 4 col 0..5: FRIDAY (no overlap, separate)
       Down2 col 4 row 0..3: ANTS  (overlapping with BANANA's 'A' at col 4? row 0 col 4 = 'A' (BANANA[3]='A')) -> ANTS down: A(row0)N(row1)T(row2)S(row3) — works!
    */
    grid: [
      ["#","B","A","N","A","N","A"],
      ["#","O","#","#","N","#","#"],
      ["#","O","#","#","T","#","#"],
      ["#","K","#","#","S","#","#"],
      ["F","R","I","D","A","Y","#"],
    ],
    starts: [
      { num: 1, dir: "across", row: 0, col: 1, len: 6, clue: "Yellow fruit Minions love 🍌" },
      { num: 1, dir: "down",   row: 0, col: 1, len: 4, clue: "You read it 📖" },
      { num: 2, dir: "down",   row: 0, col: 4, len: 4, clue: "Tiny insects 🐜" },
      { num: 3, dir: "across", row: 4, col: 0, len: 6, clue: "Best day of the work week 🎉" },
    ],
    pool: "ABCDEFGHIJKLMNOPRSTUVWY".split(""),
  },
};

/* ---------- Score & state ---------- */
let score = 0;
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");

function addScore(n = 1) {
  score += n;
  scoreEl.textContent = score;
  scoreEl.parentElement.classList.remove("score-pop");
  void scoreEl.parentElement.offsetWidth;
  scoreEl.parentElement.classList.add("score-pop");
  showBello();
  burstConfetti();
}
function setScore(n) { score = n; scoreEl.textContent = n; }

/* ---------- Feedback ---------- */
const bubble = document.getElementById("bello-bubble");
const bellos = ["Bello!", "Banana!", "Tulaliloo!", "Yay!", "Poopaye!", "Po-ka!"];
function showBello() {
  bubble.textContent = bellos[Math.floor(Math.random() * bellos.length)];
  bubble.classList.remove("show");
  void bubble.offsetWidth;
  bubble.classList.add("show");
}
const confettiEl = document.getElementById("confetti");
const confettiColors = ["#FFD93D", "#1E3A8A", "#2EB872", "#E94560", "#fff"];
function burstConfetti(n = 36) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    c.style.background = confettiColors[i % confettiColors.length];
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 0.9 + Math.random() * 1.2 + "s";
    c.style.animationDelay = Math.random() * 0.3 + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiEl.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}
function flashBad(target) {
  target.classList.add("flash-bad");
  setTimeout(() => target.classList.remove("flash-bad"), 500);
}

/* ---------- Speech synthesis helper ---------- */
function speak(text, opts = {}) {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, your browser does not support speech.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = opts.slow ? 0.65 : 0.95;
  u.pitch = 1;
  // Try to pick an English voice
  const v = speechSynthesis.getVoices().find(v => v.lang.startsWith("en"));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
// Voices load async in some browsers
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => {};
}

/* ---------- Slide controller ---------- */
const slides = Array.from(document.querySelectorAll(".slide"));
const totalEl = document.getElementById("total");
const curEl = document.getElementById("cur");
totalEl.textContent = slides.length;
let current = 0;

function showSlide(i) {
  if (i < 0 || i >= slides.length) return;
  slides[current].classList.remove("active");
  current = i;
  slides[current].classList.add("active");
  curEl.textContent = current + 1;
  const game = slides[current].dataset.game;
  if (initializers[game]) initializers[game]();
  if (game === "goodbye") {
    finalScoreEl.textContent = score;
    const msg = document.getElementById("final-msg");
    if (score >= 12)      msg.textContent = "🏆 Banana legend! Outstanding job!";
    else if (score >= 8)  msg.textContent = "💛 Great work — top minion energy!";
    else if (score >= 4)  msg.textContent = "👍 Nice effort — keep practicing!";
    else                  msg.textContent = "🌱 Good start — let's go again!";
  }
}
function next() { if (current < slides.length - 1) showSlide(current + 1); }
function prev() { if (current > 0) showSlide(current - 1); }

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "PageDown") next();
  else if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
});

/* ---------- Action delegation ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const action = t.dataset.action;
  if (action === "next") next();
  else if (action === "prev") prev();
  else if (action === "restart") {
    setScore(0);
    showSlide(0);
  } else if (actions[action]) {
    actions[action](t, e);
  }
});

/* ============================================================
   Game initializers — run when slide becomes active
   ============================================================ */
const initializers = {};
const actions = {};

/* ---------- 2. Vocabulary Match ---------- */
let vmSelectedWord = null;
let vmRemaining = 0;
initializers.vocabMatch = function () {
  const wordsEl = document.getElementById("vm-words");
  const iconsEl = document.getElementById("vm-icons");
  wordsEl.innerHTML = "";
  iconsEl.innerHTML = "";
  vmSelectedWord = null;
  vmRemaining = GAMES.vocabMatch.length;
  document.querySelector("#vm-status span").textContent = vmRemaining;

  const words = [...GAMES.vocabMatch];
  const icons = [...GAMES.vocabMatch];
  shuffle(words);
  shuffle(icons);

  words.forEach((w) => {
    const c = makeChip(w.word, "word");
    c.dataset.match = w.word;
    c.addEventListener("click", () => {
      if (c.classList.contains("matched")) return;
      document.querySelectorAll("#vm-words .chip").forEach(x => x.classList.remove("selected"));
      c.classList.add("selected");
      vmSelectedWord = c;
    });
    wordsEl.appendChild(c);
  });
  icons.forEach((w) => {
    const c = makeChip(w.icon, "icon");
    c.dataset.match = w.word;
    c.addEventListener("click", () => {
      if (c.classList.contains("matched")) return;
      if (!vmSelectedWord) { c.classList.add("miss"); setTimeout(() => c.classList.remove("miss"), 400); return; }
      if (c.dataset.match === vmSelectedWord.dataset.match) {
        c.classList.add("matched");
        vmSelectedWord.classList.add("matched");
        vmSelectedWord.classList.remove("selected");
        vmSelectedWord = null;
        vmRemaining--;
        document.querySelector("#vm-status span").textContent = vmRemaining;
        addScore(1);
      } else {
        c.classList.add("miss");
        vmSelectedWord.classList.add("miss");
        const w = vmSelectedWord;
        setTimeout(() => { c.classList.remove("miss"); w.classList.remove("miss", "selected"); }, 400);
        vmSelectedWord = null;
      }
    });
    iconsEl.appendChild(c);
  });
};
function makeChip(text, extraClass = "") {
  const c = document.createElement("button");
  c.className = "chip " + extraClass;
  c.type = "button";
  c.textContent = text;
  return c;
}

/* ---------- 3. Fill the Blank ---------- */
let fbIndex = 0;
let fbAnswered = false;
initializers.fillBlank = function () {
  fbIndex = 0;
  renderFb();
};
actions["fb-next"] = function () {
  fbIndex = (fbIndex + 1) % GAMES.fillBlank.length;
  renderFb();
};
function renderFb() {
  const q = GAMES.fillBlank[fbIndex];
  const sent = document.getElementById("fb-sentence");
  sent.innerHTML = `${escapeHtml(q.parts[0])}<span class="blank" id="fb-blank">___</span>${escapeHtml(q.parts[1])}`;
  const opts = document.getElementById("fb-options");
  opts.innerHTML = "";
  fbAnswered = false;
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => {
      if (fbAnswered) return;
      const blank = document.getElementById("fb-blank");
      if (i === q.answer) {
        fbAnswered = true;
        b.classList.add("correct");
        blank.textContent = opt;
        blank.classList.add("filled");
        addScore(1);
      } else {
        b.classList.add("wrong");
        blank.classList.add("wrong");
        setTimeout(() => blank.classList.remove("wrong"), 500);
        flashBad(sent);
      }
    });
    opts.appendChild(b);
  });
}

/* ---------- 4. Listening ---------- */
let lsIndex = 0;
let lsAnswered = false;
initializers.listening = function () {
  lsIndex = 0;
  renderLs();
  document.getElementById("ls-play").onclick = () => speak(GAMES.listening[lsIndex].sentence);
};
actions["ls-next"] = function () {
  lsIndex = (lsIndex + 1) % GAMES.listening.length;
  renderLs();
};
function renderLs() {
  lsAnswered = false;
  const q = GAMES.listening[lsIndex];
  const opts = document.getElementById("ls-options");
  opts.innerHTML = "";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => {
      if (lsAnswered) return;
      if (i === q.answer) { lsAnswered = true; b.classList.add("correct"); addScore(1); }
      else { b.classList.add("wrong"); }
    });
    opts.appendChild(b);
  });
}

/* ---------- 5. Phrasal verbs ---------- */
let pvIndex = 0;
let pvAnswered = false;
initializers.phrasal = function () { pvIndex = 0; renderPv(); };
actions["pv-next"] = function () { pvIndex = (pvIndex + 1) % GAMES.phrasal.length; renderPv(); };
function renderPv() {
  const q = GAMES.phrasal[pvIndex];
  const sent = document.getElementById("pv-sentence");
  sent.innerHTML = `${escapeHtml(q.parts[0])}<span class="blank" id="pv-blank">___</span>${escapeHtml(q.parts[1])}`;
  const opts = document.getElementById("pv-options");
  opts.innerHTML = "";
  document.getElementById("pv-reveal").textContent = "";
  document.getElementById("pv-reveal").classList.remove("show");
  pvAnswered = false;
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => {
      if (pvAnswered) return;
      const blank = document.getElementById("pv-blank");
      if (i === q.answer) {
        pvAnswered = true;
        b.classList.add("correct");
        blank.textContent = opt;
        blank.classList.add("filled");
        const r = document.getElementById("pv-reveal");
        r.textContent = "💡 " + q.reveal;
        r.classList.add("show");
        addScore(1);
      } else {
        b.classList.add("wrong");
      }
    });
    opts.appendChild(b);
  });
}

/* ---------- 6. Idiom ---------- */
let idIndex = 0;
let idAnswered = false;
initializers.idiom = function () { idIndex = 0; renderId(); };
actions["id-next"] = function () { idIndex = (idIndex + 1) % GAMES.idiom.length; renderId(); };
function renderId() {
  const q = GAMES.idiom[idIndex];
  document.getElementById("id-art").textContent = q.art;
  document.getElementById("id-phrase").textContent = q.phrase;
  const opts = document.getElementById("id-options");
  opts.innerHTML = "";
  idAnswered = false;
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => {
      if (idAnswered) return;
      if (i === q.answer) { idAnswered = true; b.classList.add("correct"); addScore(1); }
      else { b.classList.add("wrong"); }
    });
    opts.appendChild(b);
  });
}

/* ---------- 7. Twister ---------- */
let twIndex = 0;
let twScored = false;
initializers.twister = function () {
  twIndex = 0;
  twScored = false;
  document.getElementById("tw-text").textContent = GAMES.twister[0];
  document.getElementById("tw-play").onclick = () => speak(GAMES.twister[twIndex]);
  document.getElementById("tw-slow").onclick = () => speak(GAMES.twister[twIndex], { slow: true });
};
actions["tw-yes"] = function () {
  if (twScored) return;
  twScored = true;
  addScore(1);
};
actions["tw-no"] = function () { /* no points */ };
actions["tw-next"] = function () {
  twIndex = (twIndex + 1) % GAMES.twister.length;
  twScored = false;
  document.getElementById("tw-text").textContent = GAMES.twister[twIndex];
};

/* ---------- 8. Spot the mistake ---------- */
let smIndex = 0;
let smAnswered = false;
initializers.mistake = function () { smIndex = 0; renderSm(); };
actions["sm-next"] = function () { smIndex = (smIndex + 1) % GAMES.mistake.length; renderSm(); };
function renderSm() {
  const q = GAMES.mistake[smIndex];
  const sent = document.getElementById("sm-sentence");
  sent.innerHTML = "";
  const reveal = document.getElementById("sm-reveal");
  reveal.textContent = "";
  reveal.classList.remove("show");
  smAnswered = false;
  q.words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = w + " ";
    span.addEventListener("click", () => {
      if (smAnswered) return;
      if (i === q.wrongIndex) {
        smAnswered = true;
        span.classList.add("correct");
        reveal.textContent = "💡 " + q.reveal;
        reveal.classList.add("show");
        addScore(1);
      } else {
        span.classList.add("wrong");
        setTimeout(() => span.classList.remove("wrong"), 500);
      }
    });
    sent.appendChild(span);
  });
}

/* ---------- 9. Word scramble ---------- */
let wsIndex = 0;
let wsAnswer = [];
initializers.scramble = function () { wsIndex = 0; renderWs(); };
actions["ws-next"] = function () { wsIndex = (wsIndex + 1) % GAMES.scramble.length; renderWs(); };
actions["ws-clear"] = function () {
  const slots = document.querySelectorAll("#ws-answer .slot");
  slots.forEach(s => { s.textContent = ""; s.classList.remove("filled", "correct"); });
  document.querySelectorAll("#ws-pool .letter-tile").forEach(t => t.classList.remove("used"));
  wsAnswer = [];
};
function renderWs() {
  const q = GAMES.scramble[wsIndex];
  document.getElementById("ws-hint").textContent = q.hint;
  const ans = document.getElementById("ws-answer");
  const pool = document.getElementById("ws-pool");
  ans.innerHTML = "";
  pool.innerHTML = "";
  wsAnswer = [];

  for (let i = 0; i < q.word.length; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    ans.appendChild(slot);
  }
  const letters = q.word.split("");
  shuffle(letters);
  // ensure not already in order
  if (letters.join("") === q.word) letters.reverse();
  letters.forEach((ch, i) => {
    const t = document.createElement("button");
    t.className = "letter-tile";
    t.textContent = ch;
    t.addEventListener("click", () => {
      if (t.classList.contains("used")) return;
      const slots = ans.children;
      const next = Array.from(slots).find(s => !s.classList.contains("filled"));
      if (!next) return;
      next.textContent = ch;
      next.classList.add("filled");
      t.classList.add("used");
      wsAnswer.push({ ch, tile: t, slot: next });
      // check on completion
      if (wsAnswer.length === q.word.length) {
        const formed = wsAnswer.map(x => x.ch).join("");
        if (formed === q.word) {
          Array.from(slots).forEach(s => s.classList.add("correct"));
          addScore(1);
        } else {
          ans.classList.add("flash-bad");
          setTimeout(() => ans.classList.remove("flash-bad"), 500);
        }
      }
    });
    pool.appendChild(t);
  });
}

/* ---------- 10. Synonyms / Antonyms ---------- */
let syState = null;
initializers.synonyms = function () {
  const data = GAMES.synonyms[0];
  syState = { selected: null };
  document.getElementById("sy-word").textContent = data.word;
  const cloud = document.getElementById("sy-cloud");
  cloud.innerHTML = "";
  document.querySelector("#sy-same .bucket-list").innerHTML = "";
  document.querySelector("#sy-opp  .bucket-list").innerHTML = "";

  const all = [...data.same.map(w => ({ w, kind: "same" })),
               ...data.opposite.map(w => ({ w, kind: "opp" }))];
  shuffle(all);
  all.forEach(({ w, kind }) => {
    const el = document.createElement("button");
    el.className = "cloud-word";
    el.textContent = w;
    el.dataset.kind = kind;
    el.addEventListener("click", () => {
      cloud.querySelectorAll(".cloud-word").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
      syState.selected = el;
    });
    cloud.appendChild(el);
  });

  ["sy-same", "sy-opp"].forEach((id) => {
    const bucket = document.getElementById(id);
    bucket.onclick = () => {
      if (!syState.selected) return;
      const targetKind = id === "sy-same" ? "same" : "opp";
      const el = syState.selected;
      if (el.dataset.kind === targetKind) {
        const placed = document.createElement("span");
        placed.className = "placed";
        placed.textContent = el.textContent;
        bucket.querySelector(".bucket-list").appendChild(placed);
        el.classList.add("placed");
        bucket.classList.add("flash");
        setTimeout(() => bucket.classList.remove("flash"), 400);
        syState.selected = null;
        addScore(1);
      } else {
        bucket.classList.add("flash-bad");
        el.classList.add("miss");
        setTimeout(() => { bucket.classList.remove("flash-bad"); el.classList.remove("miss", "selected"); }, 500);
        syState.selected = null;
      }
    };
  });
};

/* ---------- 11. True / False ---------- */
let tfIndex = 0;
let tfAnswered = false;
initializers.trueFalse = function () { tfIndex = 0; renderTf(); };
actions["tf-next"] = function () { tfIndex = (tfIndex + 1) % GAMES.trueFalse.length; renderTf(); };
actions["tf-true"]  = function () { answerTf(true); };
actions["tf-false"] = function () { answerTf(false); };
function renderTf() {
  tfAnswered = false;
  document.getElementById("tf-statement").textContent = GAMES.trueFalse[tfIndex].statement;
  const r = document.getElementById("tf-reveal");
  r.textContent = "";
  r.classList.remove("show");
}
function answerTf(val) {
  if (tfAnswered) return;
  const q = GAMES.trueFalse[tfIndex];
  const r = document.getElementById("tf-reveal");
  if (val === q.answer) {
    tfAnswered = true;
    r.textContent = "✅ Correct! " + q.reveal;
    r.classList.add("show");
    addScore(1);
  } else {
    r.textContent = "❌ Not quite — " + q.reveal;
    r.classList.add("show");
    flashBad(document.getElementById("tf-statement"));
    tfAnswered = true; // reveal anyway
  }
}

/* ---------- 12. Crossword ---------- */
let cwActive = null; // {row, col}
let cwCells = []; // 2d array
initializers.crossword = function () {
  const data = GAMES.crossword;
  const gridEl = document.getElementById("cw-grid");
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${data.cols}, 56px)`;
  cwCells = [];

  // determine numbering
  const numMap = {}; // row,col -> num
  data.starts.forEach(s => { numMap[`${s.row},${s.col}`] = s.num; });

  for (let r = 0; r < data.rows; r++) {
    cwCells[r] = [];
    for (let c = 0; c < data.cols; c++) {
      const ch = data.grid[r][c];
      const cell = document.createElement("div");
      cell.className = "cw-cell";
      if (ch !== "#") {
        cell.classList.add("open");
        cell.dataset.answer = ch;
        cell.dataset.row = r;
        cell.dataset.col = c;
        const n = numMap[`${r},${c}`];
        if (n) {
          const numEl = document.createElement("span");
          numEl.className = "num";
          numEl.textContent = n;
          cell.appendChild(numEl);
        }
        cell.addEventListener("click", () => {
          document.querySelectorAll("#cw-grid .cw-cell.active").forEach(x => x.classList.remove("active"));
          cell.classList.add("active");
          cwActive = cell;
        });
      }
      gridEl.appendChild(cell);
      cwCells[r][c] = cell;
    }
  }

  // clues
  const cluesEl = document.getElementById("cw-clues");
  cluesEl.innerHTML = "";
  data.starts.forEach((s, i) => {
    const li = document.createElement("li");
    li.id = `cw-clue-${i}`;
    li.textContent = `${s.num} ${s.dir.toUpperCase()}: ${s.clue}`;
    cluesEl.appendChild(li);
  });

  // letter pool
  const poolEl = document.getElementById("cw-pool");
  poolEl.innerHTML = "";
  data.pool.forEach(letter => {
    const b = document.createElement("button");
    b.className = "lp";
    b.textContent = letter;
    b.addEventListener("click", () => {
      if (!cwActive) return;
      placeCwLetter(cwActive, letter);
    });
    poolEl.appendChild(b);
  });
};
actions["cw-clear"] = function () {
  if (!cwActive) return;
  // keep number span
  const num = cwActive.querySelector(".num");
  cwActive.textContent = "";
  if (num) cwActive.appendChild(num);
  cwActive.classList.remove("correct");
};

function placeCwLetter(cell, letter) {
  // store letter as a text node, keep .num span
  const num = cell.querySelector(".num");
  cell.textContent = letter;
  if (num) cell.appendChild(num);
  if (letter === cell.dataset.answer) {
    cell.classList.add("correct");
  } else {
    cell.classList.remove("correct");
    cell.classList.add("flash-bad");
    setTimeout(() => cell.classList.remove("flash-bad"), 500);
  }
  checkCrosswordWords();
}
function checkCrosswordWords() {
  const data = GAMES.crossword;
  data.starts.forEach((s, i) => {
    let ok = true;
    for (let k = 0; k < s.len; k++) {
      const r = s.dir === "across" ? s.row : s.row + k;
      const c = s.dir === "across" ? s.col + k : s.col;
      const cell = cwCells[r][c];
      const ch = (cell.firstChild && cell.firstChild.nodeType === 3) ? cell.firstChild.textContent : "";
      if (ch !== cell.dataset.answer) { ok = false; break; }
    }
    const li = document.getElementById(`cw-clue-${i}`);
    if (ok && li && !li.classList.contains("solved")) {
      li.classList.add("solved");
      addScore(2);
    }
  });
}

/* ---------- Utils ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ---------- Boot ---------- */
showSlide(0);
