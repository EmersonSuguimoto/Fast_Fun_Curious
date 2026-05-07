/* ============================================================
   Bello! English Meeting — slide controller + mini-games
   Each game shuffles its content on every load, so no two
   sessions are the same. A "Peek" button (bottom-left) reveals
   the current answer while held down.
   ============================================================ */

/* ---------- Game data (edit freely — every list shuffles per load) ---------- */
const GAMES = {
  /* Vocabulary match — pick N pairs at random from this pool */
  vocabMatchPool: [
    { word: "keyboard",   icon: "⌨️" },
    { word: "coffee",     icon: "☕" },
    { word: "meeting",    icon: "👥" },
    { word: "calendar",   icon: "📅" },
    { word: "deadline",   icon: "⏰" },
    { word: "headphones", icon: "🎧" },
    { word: "notebook",   icon: "📓" },
    { word: "umbrella",   icon: "☂️" },
    { word: "airplane",   icon: "✈️" },
    { word: "pizza",      icon: "🍕" },
    { word: "rocket",     icon: "🚀" },
    { word: "bicycle",    icon: "🚲" },
    { word: "rainbow",    icon: "🌈" },
    { word: "telephone",  icon: "📞" },
    { word: "hospital",   icon: "🏥" },
    { word: "elephant",   icon: "🐘" },
  ],
  vocabMatchPerRound: 6,

  fillBlank: [
    { parts: ["She ", " to work every day."], options: ["go", "goes", "going"], answer: 1, tip: "Third person singular → add -s." },
    { parts: ["I ", " coffee right now."], options: ["drink", "am drinking", "drinks"], answer: 1, tip: "Right now → present continuous." },
    { parts: ["They ", " here yesterday."], options: ["are", "were", "was"], answer: 1, tip: "Past tense of 'are' is 'were'." },
    { parts: ["He has ", " his report."], options: ["finish", "finished", "finishing"], answer: 1, tip: "Present perfect: have/has + past participle." },
    { parts: ["We will ", " you tomorrow."], options: ["called", "calling", "call"], answer: 2, tip: "After 'will' → base form." },
    { parts: ["If it rains, we ", " the picnic."], options: ["cancel", "will cancel", "cancelled"], answer: 1, tip: "First conditional: if + present, will + base." },
    { parts: ["This is ", " book I have ever read."], options: ["the better", "the best", "more good"], answer: 1, tip: "Superlative: the best." },
    { parts: ["She has been working here ", " 2019."], options: ["for", "since", "from"], answer: 1, tip: "'Since' + a point in time." },
    { parts: ["He is afraid ", " spiders."], options: ["of", "from", "by"], answer: 0, tip: "afraid OF something." },
    { parts: ["I'd like ", " information, please."], options: ["a", "some", "an"], answer: 1, tip: "Information is uncountable → 'some'." },
    { parts: ["My sister is ", " than me."], options: ["taller", "more tall", "the tallest"], answer: 0, tip: "Comparative for short adjectives → -er." },
    { parts: ["There ", " many people at the party."], options: ["was", "were", "is"], answer: 1, tip: "'people' is plural → 'were'." },
    { parts: ["He doesn't ", " sushi."], options: ["likes", "liked", "like"], answer: 2, tip: "After 'doesn't' → base form." },
    { parts: ["I have lived in Rio ", " ten years."], options: ["since", "for", "during"], answer: 1, tip: "'For' + a duration." },
    { parts: ["You ", " smoke here, it's not allowed."], options: ["mustn't", "don't have to", "shouldn't have"], answer: 0, tip: "Strong prohibition → mustn't." },
    { parts: ["By next year, she ", " her degree."], options: ["finishes", "will have finished", "is finishing"], answer: 1, tip: "Future perfect: by + future time." },
  ],

  listening: [
    { sentence: "I would like a cup of tea, please.",
      options: ["I would like a cup of tea, please.", "I would like a cap of tea, please.", "I would like a cup of three, please.", "I would lick a cup of tea, please."], answer: 0 },
    { sentence: "She lives in a small house near the park.",
      options: ["She leaves in a small house near the park.", "She lives in a small house near the park.", "She lives in a small horse near the park.", "She lives in a small house near the dark."], answer: 1 },
    { sentence: "Could you send me the file by Friday?",
      options: ["Could you send me the file by Friday?", "Could you spend my file by Friday?", "Could you send me the file by Monday?", "Could you send me the phone by Friday?"], answer: 0 },
    { sentence: "The meeting starts at half past nine.",
      options: ["The meeting starts at half past five.", "The meeting starts at half past nine.", "The meeting starts at a half pasture.", "The meaning starts at half past nine."], answer: 1 },
    { sentence: "He bought a new pair of blue jeans.",
      options: ["He brought a new pair of blue jeans.", "He bought a new pear of blue jeans.", "He bought a new pair of blue jeans.", "He bought a new pair of blue beans."], answer: 2 },
    { sentence: "Please turn off the lights before you leave.",
      options: ["Please turn on the lights before you leave.", "Please turn off the lights before you live.", "Please turn off the nights before you leave.", "Please turn off the lights before you leave."], answer: 3 },
    { sentence: "Can I have the bill, please?",
      options: ["Can I have the bell, please?", "Can I have the bill, please?", "Can I have the ball, please?", "Can I half the bill, please?"], answer: 1 },
    { sentence: "I think it's going to rain tonight.",
      options: ["I sink it's going to rain tonight.", "I think it's going to reign tonight.", "I think it's going to rain tonight.", "I thank it's going to rain tonight."], answer: 2 },
    { sentence: "She is wearing a beautiful red dress.",
      options: ["She is wearing a beautiful red dress.", "She is wearing a beautiful red desk.", "She is wearing a beautiful read dress.", "She is wearying a beautiful red dress."], answer: 0 },
    { sentence: "We need to leave in fifteen minutes.",
      options: ["We need to live in fifteen minutes.", "We need to leave in fifty minutes.", "We need to leave in fifteen minutes.", "We need to leaf in fifteen minutes."], answer: 2 },
  ],

  phrasal: [
    { parts: ["She finally gave ", " smoking."], options: ["up", "in", "out"], answer: 0, reveal: "give up = stop doing something" },
    { parts: ["Can you look ", " my dog this weekend?"], options: ["after", "up", "for"], answer: 0, reveal: "look after = take care of" },
    { parts: ["I need to figure ", " this problem."], options: ["into", "out", "over"], answer: 1, reveal: "figure out = understand / solve" },
    { parts: ["Please turn ", " the lights when you leave."], options: ["off", "in", "up"], answer: 0, reveal: "turn off = stop a device" },
    { parts: ["He always shows ", " late."], options: ["off", "up", "down"], answer: 1, reveal: "show up = arrive / appear" },
    { parts: ["Don't put ", " what you can do today."], options: ["off", "in", "up"], answer: 0, reveal: "put off = postpone" },
    { parts: ["I came ", " an old photo yesterday."], options: ["across", "off", "up"], answer: 0, reveal: "come across = find by chance" },
    { parts: ["We ran ", " milk this morning."], options: ["into", "out of", "over"], answer: 1, reveal: "run out of = have no more" },
    { parts: ["He takes ", " his father — same eyes."], options: ["after", "off", "out"], answer: 0, reveal: "take after = resemble (a relative)" },
    { parts: ["Please fill ", " this form."], options: ["in", "off", "down"], answer: 0, reveal: "fill in = complete a form" },
    { parts: ["She broke ", " with her boyfriend."], options: ["up", "down", "out"], answer: 0, reveal: "break up = end a relationship" },
    { parts: ["Hold ", " a moment, please."], options: ["on", "off", "up"], answer: 0, reveal: "hold on = wait" },
    { parts: ["The car broke ", " on the highway."], options: ["up", "down", "off"], answer: 1, reveal: "break down = stop working (a machine)" },
    { parts: ["Don't give ", " — try again!"], options: ["up", "in", "off"], answer: 0, reveal: "give up = quit / stop trying" },
  ],

  idiom: [
    { art: "🐱☔🐶", phrase: '"It\'s raining cats and dogs"',
      options: ["It's raining very heavily.", "Pets are getting wet outside.", "Animals are falling from the sky."], answer: 0,
      reveal: "Heavy rain — nothing to do with pets!" },
    { art: "🍰🎂🍰", phrase: '"It\'s a piece of cake"',
      options: ["Time for dessert!", "It's very easy to do.", "Someone bought a cake."], answer: 1,
      reveal: "= very easy" },
    { art: "💡✨", phrase: '"To be on the same page"',
      options: ["To be reading the same book.", "To agree / share the same understanding.", "To work in the same office."], answer: 1,
      reveal: "= agree, share an understanding" },
    { art: "🦵🤞", phrase: '"Break a leg!"',
      options: ["Be careful, it's dangerous!", "Good luck!", "You will get hurt."], answer: 1,
      reveal: "= good luck (used before performances)" },
    { art: "🧊🤐", phrase: '"To break the ice"',
      options: ["To start a conversation in an awkward situation.", "To open a frozen lake.", "To stop being friends."], answer: 0,
      reveal: "= start a conversation, ease tension" },
    { art: "🐂🍶", phrase: '"A bull in a china shop"',
      options: ["A clumsy person in a delicate situation.", "A farmer who sells dishes.", "An animal at the supermarket."], answer: 0,
      reveal: "= someone clumsy in a delicate setting" },
    { art: "⏰💰", phrase: '"Time is money"',
      options: ["You can buy time.", "Time is as valuable as money — don't waste it.", "Working pays well."], answer: 1,
      reveal: "= time is as valuable as money" },
    { art: "🌽🥒", phrase: '"To spill the beans"',
      options: ["To drop your food.", "To reveal a secret.", "To cook dinner."], answer: 1,
      reveal: "= reveal a secret (often by accident)" },
    { art: "🐦1️⃣🪨2️⃣", phrase: '"Kill two birds with one stone"',
      options: ["Achieve two things with one action.", "Hunt for food.", "Solve only one problem."], answer: 0,
      reveal: "= solve two problems at once" },
    { art: "💸🦅", phrase: '"Cost an arm and a leg"',
      options: ["To injure yourself.", "To be very expensive.", "To donate to charity."], answer: 1,
      reveal: "= very expensive" },
    { art: "🌙🟦", phrase: '"Once in a blue moon"',
      options: ["Every month.", "Very rarely.", "At night only."], answer: 1,
      reveal: "= very rarely" },
    { art: "🤐🤫", phrase: '"Bite your tongue"',
      options: ["Hurt your mouth.", "Stop yourself from saying something.", "Speak louder."], answer: 1,
      reveal: "= stop yourself from saying something you regret" },
  ],

  twister: [
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Red lorry, yellow lorry, red lorry, yellow lorry.",
    "Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair.",
    "Six slick slim sycamore saplings.",
    "I scream, you scream, we all scream for ice cream.",
    "Toy boat, toy boat, toy boat.",
    "Unique New York, unique New York.",
    "A proper copper coffee pot.",
  ],

  mistake: [
    { words: ["She", "don't", "like", "coffee."], wrongIndex: 1, fix: "doesn't",
      reveal: "Use 'doesn't' for he/she/it." },
    { words: ["I", "have", "saw", "that", "movie."], wrongIndex: 2, fix: "seen",
      reveal: "Past participle of 'see' is 'seen' (have seen)." },
    { words: ["He", "is", "more", "taller", "than", "me."], wrongIndex: 3, fix: "(remove 'more')",
      reveal: "Either 'taller' OR 'more tall' — never both." },
    { words: ["They", "is", "happy", "today."], wrongIndex: 1, fix: "are",
      reveal: "'They' takes 'are', not 'is'." },
    { words: ["I", "go", "to", "the", "park", "yesterday."], wrongIndex: 1, fix: "went",
      reveal: "Past tense → 'went', not 'go'." },
    { words: ["My", "brother", "have", "two", "cars."], wrongIndex: 2, fix: "has",
      reveal: "Third person singular → 'has'." },
    { words: ["She", "can", "speaks", "three", "languages."], wrongIndex: 2, fix: "speak",
      reveal: "After 'can' → base form." },
    { words: ["I", "am", "agree", "with", "you."], wrongIndex: 1, fix: "(remove 'am')",
      reveal: "'Agree' is a verb — say 'I agree', not 'I am agree'." },
    { words: ["He", "didn't", "went", "to", "school."], wrongIndex: 2, fix: "go",
      reveal: "After 'didn't' → base form." },
    { words: ["This", "informations", "is", "useful."], wrongIndex: 1, fix: "information",
      reveal: "'Information' is uncountable — no plural." },
    { words: ["Where", "you", "are", "going?"], wrongIndex: 2, fix: "are you",
      reveal: "Question word order: Where ARE YOU going?" },
    { words: ["I", "have", "23", "years."], wrongIndex: 1, fix: "am",
      reveal: "Age uses BE: 'I am 23 (years old)'." },
    { words: ["She", "likes", "to", "swimming."], wrongIndex: 3, fix: "swim",
      reveal: "After 'to' → base form: to swim." },
  ],

  scramble: [
    { word: "BANANA",     hint: "Minion's favorite snack 🍌" },
    { word: "OFFICE",     hint: "Where you work 💼" },
    { word: "FRIDAY",     hint: "Best day of the week 🎉" },
    { word: "ENGLISH",    hint: "What we are learning today 🇬🇧" },
    { word: "COFFEE",     hint: "Hot drink with caffeine ☕" },
    { word: "COMPUTER",   hint: "You use it every day 💻" },
    { word: "SUMMER",     hint: "The hottest season ☀️" },
    { word: "PROJECT",    hint: "A piece of work with a goal 🎯" },
    { word: "AIRPORT",    hint: "Where planes take off ✈️" },
    { word: "RAINBOW",    hint: "Seven colors after the rain 🌈" },
    { word: "BREAKFAST",  hint: "First meal of the day 🥞" },
    { word: "PINEAPPLE",  hint: "Yellow tropical fruit 🍍" },
    { word: "DINOSAUR",   hint: "Extinct reptile 🦖" },
    { word: "BIRTHDAY",   hint: "Day to celebrate you 🎂" },
  ],

  /* Synonyms — pick one entry per load */
  synonyms: [
    { word: "happy",  same: ["joyful", "glad", "cheerful"],   opposite: ["sad", "miserable", "upset"] },
    { word: "big",    same: ["large", "huge", "enormous"],    opposite: ["small", "tiny", "little"] },
    { word: "fast",   same: ["quick", "rapid", "swift"],      opposite: ["slow", "sluggish", "delayed"] },
    { word: "smart",  same: ["clever", "bright", "wise"],     opposite: ["foolish", "silly", "dumb"] },
    { word: "begin",  same: ["start", "commence", "launch"],  opposite: ["end", "finish", "stop"] },
    { word: "easy",   same: ["simple", "effortless", "basic"], opposite: ["hard", "tough", "complex"] },
    { word: "rich",   same: ["wealthy", "affluent"],          opposite: ["poor", "broke"] },
  ],

  trueFalse: [
    { statement: "The plural of 'child' is 'childs'.", answer: false, reveal: "It's 'children' — irregular plural." },
    { statement: "'Their', 'there' and 'they're' all sound the same.", answer: true, reveal: "They're called homophones." },
    { statement: "We say 'I have 25 years old'.", answer: false, reveal: "Correct: 'I AM 25 years old'." },
    { statement: "'Beautiful' and 'pretty' are synonyms.", answer: true, reveal: "Both describe something attractive." },
    { statement: "The past tense of 'go' is 'goed'.", answer: false, reveal: "It's 'went' — irregular verb." },
    { statement: "An adjective describes a noun.", answer: true, reveal: "Yes — e.g. 'a BIG house'." },
    { statement: "The opposite of 'always' is 'sometimes'.", answer: false, reveal: "Opposite of 'always' is 'never'." },
    { statement: "We use 'a' before words starting with a vowel sound.", answer: false, reveal: "Use 'an' before vowel sounds: an apple, an hour." },
    { statement: "'Bigger' is the comparative form of 'big'.", answer: true, reveal: "Short adjective + -er." },
    { statement: "'I' is always written in lowercase.", answer: false, reveal: "The pronoun 'I' is ALWAYS capitalised." },
    { statement: "'Information' has no plural form.", answer: true, reveal: "It's uncountable — no 'informations'." },
    { statement: "'Used to' talks about past habits.", answer: true, reveal: "e.g. 'I used to play football'." },
    { statement: "The article 'the' is used for unspecific things.", answer: false, reveal: "'The' is for SPECIFIC things; 'a/an' is unspecific." },
    { statement: "'Ate' is the past simple of 'eat'.", answer: true, reveal: "eat → ate → eaten." },
  ],

  /* Multiple crossword puzzles — one is picked at random per load */
  crosswords: [
    {
      title: "Minion Day",
      rows: 5, cols: 7,
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
    },
    {
      title: "At the Office",
      rows: 5, cols: 7,
      grid: [
        ["#","C","O","F","F","E","E"],
        ["#","H","#","#","#","#","#"],
        ["#","A","G","E","N","D","A"],
        ["#","I","#","#","#","#","#"],
        ["#","R","#","#","#","#","#"],
      ],
      starts: [
        { num: 1, dir: "across", row: 0, col: 1, len: 6, clue: "Hot drink with caffeine ☕" },
        { num: 1, dir: "down",   row: 0, col: 1, len: 5, clue: "You sit on it 🪑" },
        { num: 2, dir: "across", row: 2, col: 1, len: 6, clue: "List of meeting topics 📋" },
      ],
    },
    {
      title: "Weekend Vibes",
      rows: 5, cols: 7,
      grid: [
        ["#","P","I","Z","Z","A","#"],
        ["#","A","#","#","#","#","#"],
        ["B","R","E","A","D","#","#"],
        ["#","T","#","#","#","#","#"],
        ["#","Y","#","#","#","#","#"],
      ],
      starts: [
        { num: 1, dir: "across", row: 0, col: 1, len: 5, clue: "Italian round food with cheese 🍕" },
        { num: 1, dir: "down",   row: 0, col: 1, len: 5, clue: "A celebration with friends 🎉" },
        { num: 2, dir: "across", row: 2, col: 0, len: 5, clue: "Made from flour, used for sandwiches 🍞" },
      ],
    },
  ],
  crosswordPool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
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
  u.rate = opts.slow ? 0.6 : 0.95;
  u.pitch = 1;
  const v = speechSynthesis.getVoices().find(v => v.lang.startsWith("en"));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
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
  hidePeek();
  const game = slides[current].dataset.game;
  if (initializers[game]) initializers[game]();
  if (game === "goodbye") {
    finalScoreEl.textContent = score;
    const msg = document.getElementById("final-msg");
    if (score >= 18)      msg.textContent = "🏆 Banana legend! Outstanding job!";
    else if (score >= 12) msg.textContent = "💛 Great work — top minion energy!";
    else if (score >= 6)  msg.textContent = "👍 Nice effort — keep practicing!";
    else                  msg.textContent = "🌱 Good start — let's go again!";
  }
}
function next() { if (current < slides.length - 1) showSlide(current + 1); }
function prev() { if (current > 0) showSlide(current - 1); }

document.addEventListener("keydown", (e) => {
  // ignore arrow keys while typing in inputs
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
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
const peekProviders = {}; // game name → () => string|null

/* ---------- 2. Vocabulary Match ---------- */
let vmSelectedWord = null;
let vmRemaining = 0;
let vmRoundPairs = [];
initializers.vocabMatch = function () {
  const wordsEl = document.getElementById("vm-words");
  const iconsEl = document.getElementById("vm-icons");
  wordsEl.innerHTML = "";
  iconsEl.innerHTML = "";
  vmSelectedWord = null;

  // Pick a fresh subset every load
  const pool = shuffle([...GAMES.vocabMatchPool]);
  vmRoundPairs = pool.slice(0, GAMES.vocabMatchPerRound);
  vmRemaining = vmRoundPairs.length;
  document.querySelector("#vm-status span").textContent = vmRemaining;

  const words = shuffle([...vmRoundPairs]);
  const icons = shuffle([...vmRoundPairs]);

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
      if (!vmSelectedWord) {
        c.classList.add("miss");
        setTimeout(() => c.classList.remove("miss"), 400);
        return;
      }
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
peekProviders.vocabMatch = () =>
  vmRoundPairs.length
    ? "Pairs:\n" + vmRoundPairs.map(p => `• ${p.word} → ${p.icon}`).join("\n")
    : null;

function makeChip(text, extraClass = "") {
  const c = document.createElement("button");
  c.className = "chip " + extraClass;
  c.type = "button";
  c.textContent = text;
  return c;
}

/* ---------- 3. Fill the Blank ---------- */
let fbList = [];
let fbIndex = 0;
let fbAnswered = false;
initializers.fillBlank = function () {
  fbList = shuffle([...GAMES.fillBlank]);
  fbIndex = 0;
  renderFb();
};
actions["fb-next"] = function () {
  fbIndex = (fbIndex + 1) % fbList.length;
  renderFb();
};
function renderFb() {
  const q = fbList[fbIndex];
  const sent = document.getElementById("fb-sentence");
  sent.innerHTML = `${escapeHtml(q.parts[0])}<span class="blank" id="fb-blank">___</span>${escapeHtml(q.parts[1])}`;
  const opts = document.getElementById("fb-options");
  opts.innerHTML = "";
  fbAnswered = false;
  const order = shuffle([0, 1, 2]);
  order.forEach((origIdx) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = q.options[origIdx];
    b.addEventListener("click", () => {
      if (fbAnswered) return;
      const blank = document.getElementById("fb-blank");
      if (origIdx === q.answer) {
        fbAnswered = true;
        b.classList.add("correct");
        blank.textContent = q.options[origIdx];
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
peekProviders.fillBlank = () => {
  if (!fbList.length) return null;
  const q = fbList[fbIndex];
  return `${q.parts[0]}[ ${q.options[q.answer]} ]${q.parts[1]}\n💡 ${q.tip}`;
};

/* ---------- 4. Listening ---------- */
let lsList = [];
let lsIndex = 0;
let lsAnswered = false;
initializers.listening = function () {
  lsList = shuffle([...GAMES.listening]);
  lsIndex = 0;
  renderLs();
  document.getElementById("ls-play").onclick = () => speak(lsList[lsIndex].sentence);
};
actions["ls-next"] = function () {
  lsIndex = (lsIndex + 1) % lsList.length;
  renderLs();
  document.getElementById("ls-play").onclick = () => speak(lsList[lsIndex].sentence);
};
function renderLs() {
  lsAnswered = false;
  const q = lsList[lsIndex];
  const opts = document.getElementById("ls-options");
  opts.innerHTML = "";
  const indices = shuffle([0, 1, 2, 3]);
  indices.forEach((origIdx) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = q.options[origIdx];
    b.addEventListener("click", () => {
      if (lsAnswered) return;
      if (origIdx === q.answer) { lsAnswered = true; b.classList.add("correct"); addScore(1); }
      else { b.classList.add("wrong"); }
    });
    opts.appendChild(b);
  });
}
peekProviders.listening = () =>
  lsList.length ? "🔊 " + lsList[lsIndex].sentence : null;

/* ---------- 5. Phrasal verbs ---------- */
let pvList = [];
let pvIndex = 0;
let pvAnswered = false;
initializers.phrasal = function () { pvList = shuffle([...GAMES.phrasal]); pvIndex = 0; renderPv(); };
actions["pv-next"] = function () { pvIndex = (pvIndex + 1) % pvList.length; renderPv(); };
function renderPv() {
  const q = pvList[pvIndex];
  const sent = document.getElementById("pv-sentence");
  sent.innerHTML = `${escapeHtml(q.parts[0])}<span class="blank" id="pv-blank">___</span>${escapeHtml(q.parts[1])}`;
  const opts = document.getElementById("pv-options");
  opts.innerHTML = "";
  document.getElementById("pv-reveal").textContent = "";
  document.getElementById("pv-reveal").classList.remove("show");
  pvAnswered = false;
  const order = shuffle([0, 1, 2]);
  order.forEach((origIdx) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = q.options[origIdx];
    b.addEventListener("click", () => {
      if (pvAnswered) return;
      const blank = document.getElementById("pv-blank");
      if (origIdx === q.answer) {
        pvAnswered = true;
        b.classList.add("correct");
        blank.textContent = q.options[origIdx];
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
peekProviders.phrasal = () => {
  if (!pvList.length) return null;
  const q = pvList[pvIndex];
  return `${q.parts[0]}[ ${q.options[q.answer]} ]${q.parts[1]}\n💡 ${q.reveal}`;
};

/* ---------- 6. Idiom ---------- */
let idList = [];
let idIndex = 0;
let idAnswered = false;
initializers.idiom = function () { idList = shuffle([...GAMES.idiom]); idIndex = 0; renderId(); };
actions["id-next"] = function () { idIndex = (idIndex + 1) % idList.length; renderId(); };
function renderId() {
  const q = idList[idIndex];
  document.getElementById("id-art").textContent = q.art;
  document.getElementById("id-phrase").textContent = q.phrase;
  const opts = document.getElementById("id-options");
  opts.innerHTML = "";
  idAnswered = false;
  const order = shuffle([0, 1, 2]);
  order.forEach((origIdx) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = q.options[origIdx];
    b.addEventListener("click", () => {
      if (idAnswered) return;
      if (origIdx === q.answer) { idAnswered = true; b.classList.add("correct"); addScore(1); }
      else { b.classList.add("wrong"); }
    });
    opts.appendChild(b);
  });
}
peekProviders.idiom = () => {
  if (!idList.length) return null;
  const q = idList[idIndex];
  return `${q.options[q.answer]}\n💡 ${q.reveal}`;
};

/* ---------- 7. Twister ---------- */
let twList = [];
let twIndex = 0;
let twScored = false;
initializers.twister = function () {
  twList = shuffle([...GAMES.twister]);
  twIndex = 0;
  twScored = false;
  document.getElementById("tw-text").textContent = twList[0];
  document.getElementById("tw-play").onclick = () => speak(twList[twIndex]);
  document.getElementById("tw-slow").onclick = () => speak(twList[twIndex], { slow: true });
};
actions["tw-yes"] = function () {
  if (twScored) return;
  twScored = true;
  addScore(1);
};
actions["tw-no"] = function () { /* no points */ };
actions["tw-next"] = function () {
  twIndex = (twIndex + 1) % twList.length;
  twScored = false;
  document.getElementById("tw-text").textContent = twList[twIndex];
};
peekProviders.twister = () => twList.length ? twList[twIndex] : null;

/* ---------- 8. Spot the mistake ---------- */
let smList = [];
let smIndex = 0;
let smAnswered = false;
initializers.mistake = function () { smList = shuffle([...GAMES.mistake]); smIndex = 0; renderSm(); };
actions["sm-next"] = function () { smIndex = (smIndex + 1) % smList.length; renderSm(); };
function renderSm() {
  const q = smList[smIndex];
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
peekProviders.mistake = () => {
  if (!smList.length) return null;
  const q = smList[smIndex];
  return `Wrong word: "${q.words[q.wrongIndex]}" → ${q.fix}\n💡 ${q.reveal}`;
};

/* ---------- 9. Word scramble ---------- */
let wsList = [];
let wsIndex = 0;
let wsAnswer = [];
initializers.scramble = function () { wsList = shuffle([...GAMES.scramble]); wsIndex = 0; renderWs(); };
actions["ws-next"] = function () { wsIndex = (wsIndex + 1) % wsList.length; renderWs(); };
actions["ws-clear"] = function () {
  const slots = document.querySelectorAll("#ws-answer .slot");
  slots.forEach(s => { s.textContent = ""; s.classList.remove("filled", "correct"); });
  document.querySelectorAll("#ws-pool .letter-tile").forEach(t => t.classList.remove("used"));
  wsAnswer = [];
};
function renderWs() {
  const q = wsList[wsIndex];
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
  if (letters.join("") === q.word) letters.reverse();
  letters.forEach((ch) => {
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
peekProviders.scramble = () => wsList.length ? wsList[wsIndex].word : null;

/* ---------- 10. Synonyms / Antonyms ---------- */
let syCurrent = null;
let syState = null;
initializers.synonyms = function () {
  syCurrent = GAMES.synonyms[Math.floor(Math.random() * GAMES.synonyms.length)];
  syState = { selected: null };
  document.getElementById("sy-word").textContent = syCurrent.word;
  const cloud = document.getElementById("sy-cloud");
  cloud.innerHTML = "";
  document.querySelector("#sy-same .bucket-list").innerHTML = "";
  document.querySelector("#sy-opp  .bucket-list").innerHTML = "";

  const all = [...syCurrent.same.map(w => ({ w, kind: "same" })),
               ...syCurrent.opposite.map(w => ({ w, kind: "opp" }))];
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
peekProviders.synonyms = () => {
  if (!syCurrent) return null;
  return `Word: ${syCurrent.word}\n= Same: ${syCurrent.same.join(", ")}\n≠ Opposite: ${syCurrent.opposite.join(", ")}`;
};

/* ---------- 11. True / False ---------- */
let tfList = [];
let tfIndex = 0;
let tfAnswered = false;
initializers.trueFalse = function () { tfList = shuffle([...GAMES.trueFalse]); tfIndex = 0; renderTf(); };
actions["tf-next"] = function () { tfIndex = (tfIndex + 1) % tfList.length; renderTf(); };
actions["tf-true"]  = function () { answerTf(true); };
actions["tf-false"] = function () { answerTf(false); };
function renderTf() {
  tfAnswered = false;
  document.getElementById("tf-statement").textContent = tfList[tfIndex].statement;
  const r = document.getElementById("tf-reveal");
  r.textContent = "";
  r.classList.remove("show");
}
function answerTf(val) {
  if (tfAnswered) return;
  const q = tfList[tfIndex];
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
    tfAnswered = true;
  }
}
peekProviders.trueFalse = () => {
  if (!tfList.length) return null;
  const q = tfList[tfIndex];
  return `Answer: ${q.answer ? "TRUE ✅" : "FALSE ❌"}\n💡 ${q.reveal}`;
};

/* ---------- 12. Crossword (multi-puzzle) ---------- */
let cwActive = null;
let cwCells = [];
let cwPuzzle = null;
initializers.crossword = function () {
  cwPuzzle = GAMES.crosswords[Math.floor(Math.random() * GAMES.crosswords.length)];
  const titleEl = document.getElementById("cw-title");
  if (titleEl) titleEl.textContent = cwPuzzle.title || "";
  const gridEl = document.getElementById("cw-grid");
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${cwPuzzle.cols}, 56px)`;
  cwCells = [];
  cwActive = null;

  const numMap = {};
  cwPuzzle.starts.forEach(s => { numMap[`${s.row},${s.col}`] = s.num; });

  for (let r = 0; r < cwPuzzle.rows; r++) {
    cwCells[r] = [];
    for (let c = 0; c < cwPuzzle.cols; c++) {
      const ch = cwPuzzle.grid[r][c];
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

  const cluesEl = document.getElementById("cw-clues");
  cluesEl.innerHTML = "";
  cwPuzzle.starts.forEach((s, i) => {
    const li = document.createElement("li");
    li.id = `cw-clue-${i}`;
    li.textContent = `${s.num} ${s.dir.toUpperCase()}: ${s.clue}`;
    cluesEl.appendChild(li);
  });

  const poolEl = document.getElementById("cw-pool");
  poolEl.innerHTML = "";
  GAMES.crosswordPool.forEach(letter => {
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
  const num = cwActive.querySelector(".num");
  cwActive.textContent = "";
  if (num) cwActive.appendChild(num);
  cwActive.classList.remove("correct");
};
function placeCwLetter(cell, letter) {
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
  if (!cwPuzzle) return;
  cwPuzzle.starts.forEach((s, i) => {
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
peekProviders.crossword = () => {
  if (!cwPuzzle) return null;
  const lines = cwPuzzle.starts.map(s => {
    let word = "";
    for (let k = 0; k < s.len; k++) {
      const r = s.dir === "across" ? s.row : s.row + k;
      const c = s.dir === "across" ? s.col + k : s.col;
      word += cwPuzzle.grid[r][c];
    }
    return `${s.num} ${s.dir}: ${word}`;
  });
  return `📋 ${cwPuzzle.title}\n` + lines.join("\n");
};

/* ============================================================
   Peek button — press-and-hold to reveal current answer
   ============================================================ */
const peekBtn = document.getElementById("peek-btn");
const peekBubble = document.getElementById("peek-bubble");

function showPeek() {
  const game = slides[current].dataset.game;
  const fn = peekProviders[game];
  const text = fn ? fn() : null;
  if (!text) {
    peekBubble.innerHTML = `<span class="peek-title">Sneak peek</span>No answer to peek on this slide 😅`;
  } else {
    peekBubble.innerHTML = `<span class="peek-title">Sneak peek</span>${escapeHtml(text)}`;
  }
  peekBubble.classList.add("show");
  peekBtn.classList.add("held");
}
function hidePeek() {
  peekBubble.classList.remove("show");
  peekBtn.classList.remove("held");
}

["mousedown", "touchstart"].forEach(ev =>
  peekBtn.addEventListener(ev, (e) => { e.preventDefault(); showPeek(); })
);
["mouseup", "mouseleave", "touchend", "touchcancel", "blur"].forEach(ev =>
  peekBtn.addEventListener(ev, hidePeek)
);
// Keyboard: hold P to peek
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "p" || e.key === "P") {
    if (!peekBubble.classList.contains("show")) showPeek();
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "p" || e.key === "P") hidePeek();
});

/* ---------- Utils ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ---------- Boot ---------- */
showSlide(0);
