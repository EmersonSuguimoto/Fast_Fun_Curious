/* ============================================================
   Bello! English Meeting — slide controller + mini-games
   Each game shuffles its content on every load, so no two
   sessions are the same. A "Peek" button (bottom-left) reveals
   the current answer while held down.
   ============================================================ */

/* ---------- Game data (edit freely — every list shuffles per load) ---------- */
const GAMES = {
  /* ============================================================
     CONTENT IS CORPORATE-THEMED, ORDERED EASY → HARD.
     Difficulty curve across slides:
       Slide 2  Vocabulary Match  : A2  (basic office nouns)
       Slide 3  Fill the Blank    : A2 → B1 (tenses, conditionals)
       Slide 4  Listening         : A2 → B1
       Slide 5  Phrasal Verbs     : B1 (workplace phrasal verbs)
       Slide 6  Idioms            : B1 → B2 (business idioms)
       Slide 7  Tongue Twisters   : pronunciation, mixed
       Slide 8  Spot the Mistake  : B1 → B2
       Slide 9  Word Scramble     : easy → upper-intermediate words
       Slide 10 Synonyms/Antonyms : B2 (corporate adjectives)
       Slide 11 True / False      : B2 (tricky usage + business)
       Slide 12 Crossword         : easy / medium / hard puzzle picked at random
     ============================================================ */

  /* ---------- Slide 2 — A2: basic office vocabulary ---------- */
  vocabMatchPool: [
    { word: "meeting",      icon: "👥" },
    { word: "email",        icon: "📧" },
    { word: "laptop",       icon: "💻" },
    { word: "coffee",       icon: "☕" },
    { word: "calendar",     icon: "📅" },
    { word: "deadline",     icon: "⏰" },
    { word: "printer",      icon: "🖨️" },
    { word: "briefcase",    icon: "💼" },
    { word: "presentation", icon: "📊" },
    { word: "contract",     icon: "📄" },
    { word: "handshake",    icon: "🤝" },
    { word: "chart",        icon: "📈" },
    { word: "headphones",   icon: "🎧" },
    { word: "envelope",     icon: "✉️" },
    { word: "telephone",    icon: "📞" },
    { word: "notebook",     icon: "📓" },
  ],
  vocabMatchPerRound: 6,

  /* ---------- Slide 3 — A2 → B1: grammar in a corporate context ---------- */
  fillBlank: [
    { parts: ["I ", " to the office every weekday."], options: ["go", "goes", "going"], answer: 0, tip: "Use the base verb with I/you/we/they." },
    { parts: ["The meeting ", " at 10 a.m. tomorrow."], options: ["start", "starts", "starting"], answer: 1, tip: "Scheduled events take simple present." },
    { parts: ["She ", " on a presentation right now."], options: ["works", "is working", "worked"], answer: 1, tip: "'right now' → present continuous." },
    { parts: ["He ", " the report yesterday."], options: ["submit", "submits", "submitted"], answer: 2, tip: "'yesterday' → past simple." },
    { parts: ["We ", " a new client last week."], options: ["meeting", "meet", "met"], answer: 2, tip: "Past simple of 'meet' is 'met'." },
    { parts: ["Could you please ", " the agenda?"], options: ["sent", "send", "sending"], answer: 1, tip: "After modal verbs (could/can/will) use the base form." },
    { parts: ["She has ", " in this company since 2018."], options: ["worked", "work", "working"], answer: 0, tip: "Present perfect: have/has + past participle." },
    { parts: ["The team has been ", " on this project for three months."], options: ["work", "worked", "working"], answer: 2, tip: "Present perfect continuous: has been + -ing." },
    { parts: ["If we ", " now, we will meet the deadline."], options: ["started", "start", "will start"], answer: 1, tip: "1st conditional: if + present, will + base." },
    { parts: ["The proposal ", " by the manager last Friday."], options: ["was approved", "approved", "is approving"], answer: 0, tip: "Past simple passive: was/were + past participle." },
    { parts: ["She suggested ", " the budget before sending it."], options: ["to review", "reviewing", "review"], answer: 1, tip: "After 'suggest' use the -ing form." },
    { parts: ["The CFO is responsible ", " the quarterly report."], options: ["for", "of", "to"], answer: 0, tip: "responsible FOR something." },
    { parts: ["By next quarter, we ", " the new system."], options: ["implement", "are implementing", "will have implemented"], answer: 2, tip: "Future perfect: by + future time → will have + past participle." },
    { parts: ["He said he ", " late to the call."], options: ["will be", "would be", "is"], answer: 1, tip: "Reported speech: 'will' becomes 'would'." },
    { parts: ["If I ", " known about the meeting, I would have attended."], options: ["have", "had", "would have"], answer: 1, tip: "3rd conditional: if + had + past participle." },
    { parts: ["The contract ", " by both parties before noon."], options: ["must sign", "must be signed", "must signed"], answer: 1, tip: "Modal passive: must BE + past participle." },
  ],

  /* ---------- Slide 4 — A2 → B1: workplace listening ---------- */
  listening: [
    { sentence: "Could you please send me the agenda before the meeting?",
      options: [
        "Could you please send me the agenda before the meeting?",
        "Could you please spend my agenda before the meeting?",
        "Could you please send me the agent before the meeting?",
        "Could you please send me the agenda before the meal?",
      ], answer: 0 },
    { sentence: "The quarterly results will be presented on Tuesday.",
      options: [
        "The quarterly results will be presented on Thursday.",
        "The quarterly results will be presented on Tuesday.",
        "The quarterly resorts will be presented on Tuesday.",
        "The quarterly results will be present on Tuesday.",
      ], answer: 1 },
    { sentence: "Please review the contract and let me know your thoughts.",
      options: [
        "Please review the contact and let me know your thoughts.",
        "Please renew the contract and let me know your thoughts.",
        "Please review the contract and let me know your thoughts.",
        "Please review the contract and let me know your thorns.",
      ], answer: 2 },
    { sentence: "We need to schedule a follow-up call with the client.",
      options: [
        "We need to schedule a follow-up call with the client.",
        "We need to skip a follow-up call with the client.",
        "We need to schedule a follow-up call with the patient.",
        "We need to schedule a fall-up call with the client.",
      ], answer: 0 },
    { sentence: "The deadline has been extended to next Friday.",
      options: [
        "The deadline has been expended to next Friday.",
        "The deadlock has been extended to next Friday.",
        "The deadline has been extended to next Monday.",
        "The deadline has been extended to next Friday.",
      ], answer: 3 },
    { sentence: "Our budget for this project has been approved.",
      options: [
        "Our budget for this project has been approved.",
        "Our budget for this project has been improved.",
        "Our budget for this product has been approved.",
        "Our budge for this project has been approved.",
      ], answer: 0 },
    { sentence: "The conference call will start at three o'clock sharp.",
      options: [
        "The conference call will start at three o'clock sharp.",
        "The conference hall will start at three o'clock sharp.",
        "The conference call will start at three o'clock short.",
        "The conference call will start at free o'clock sharp.",
      ], answer: 0 },
    { sentence: "Please make sure to cc her on the email.",
      options: [
        "Please make sure to see her on the email.",
        "Please make sure to cc her on the email.",
        "Please make sure to cc her on the meal.",
        "Please mark sure to cc her on the email.",
      ], answer: 1 },
    { sentence: "She has been promoted to senior project manager.",
      options: [
        "She has been promoted to senior product manager.",
        "She has been promised the senior project manager.",
        "She has been promoted to senior project manager.",
        "She has been promoted to senior progress manager.",
      ], answer: 2 },
    { sentence: "Let's circle back to this issue next week.",
      options: [
        "Let's circle back to this issue next week.",
        "Let's cycle back to this issue next week.",
        "Let's circle back to this tissue next week.",
        "Let's circle back to this issue next weekend.",
      ], answer: 0 },
  ],

  /* ---------- Slide 5 — B1: workplace phrasal verbs ---------- */
  phrasal: [
    { parts: ["Let's ", " the meeting now — please join the call."], options: ["set up", "set off", "set out"], answer: 0, reveal: "set up = arrange / organise" },
    { parts: ["Please ", " your expense report by Friday."], options: ["turn up", "turn in", "turn down"], answer: 1, reveal: "turn in = submit" },
    { parts: ["Can you ", " these figures one more time?"], options: ["look up", "look over", "look out"], answer: 1, reveal: "look over = review briefly" },
    { parts: ["She ", " a great point during the meeting."], options: ["brought up", "brought down", "brought back"], answer: 0, reveal: "bring up = mention / raise a topic" },
    { parts: ["We had to ", " the launch due to a major bug."], options: ["call off", "call on", "call up"], answer: 0, reveal: "call off = cancel" },
    { parts: ["Please ", " to me as soon as you have an answer."], options: ["get back", "get on", "get over"], answer: 0, reveal: "get back to = reply" },
    { parts: ["Let's ", " a new approach for next quarter."], options: ["come about", "come over", "come up with"], answer: 2, reveal: "come up with = devise / invent" },
    { parts: ["The CEO ", " the new strategy yesterday."], options: ["rolled over", "rolled out", "rolled in"], answer: 1, reveal: "roll out = launch / release" },
    { parts: ["Sales have ", " significantly this quarter."], options: ["picked on", "picked out", "picked up"], answer: 2, reveal: "pick up = improve / increase" },
    { parts: ["Let's ", " this meeting — we're done."], options: ["wrap up", "wrap around", "wrap on"], answer: 0, reveal: "wrap up = finish / conclude" },
    { parts: ["The team is ", " of milk in the kitchen."], options: ["running into", "running off", "running out"], answer: 2, reveal: "run out (of) = have nothing left" },
    { parts: ["He ", " in meetings — always shares ideas."], options: ["speaks up", "speaks out", "speaks down"], answer: 0, reveal: "speak up = share your opinion" },
    { parts: ["We need to ", " our differences and move forward."], options: ["iron out", "iron up", "iron over"], answer: 0, reveal: "iron out = resolve (problems / disagreements)" },
    { parts: ["The discussion ", " longer than expected."], options: ["dragged off", "dragged on", "dragged in"], answer: 1, reveal: "drag on = continue for too long" },
  ],

  /* ---------- Slide 6 — B1 → B2: business idioms ---------- */
  idiom: [
    { art: "📞🤝", phrase: '"Touch base"',
      options: ["To make brief contact with someone.", "To play a sport together.", "To start a brand-new project."], answer: 0,
      reveal: "= make brief contact, often a quick check-in" },
    { art: "⚾💰", phrase: '"A ballpark figure"',
      options: ["A famous baseball player.", "A rough estimate, not exact.", "A type of financial bonus."], answer: 1,
      reveal: "= a rough estimate" },
    { art: "🎯📈", phrase: '"Move the needle"',
      options: ["Make a noticeable, measurable difference.", "Sew clothing.", "Change the music."], answer: 0,
      reveal: "= make a measurable, noticeable difference" },
    { art: "⚽🚀", phrase: '"Get the ball rolling"',
      options: ["Stop a project.", "Take a break.", "Start something / begin a process."], answer: 2,
      reveal: "= start something, begin a process" },
    { art: "📦💡", phrase: '"Think outside the box"',
      options: ["Take a long lunch break.", "Be creative — find unconventional solutions.", "Hide your work from others."], answer: 1,
      reveal: "= be creative; find new, unconventional ideas" },
    { art: "📐🔄", phrase: '"Back to the drawing board"',
      options: ["Start over after a failure.", "Visit the design team.", "Go back to school."], answer: 0,
      reveal: "= start over because the previous plan failed" },
    { art: "📄✅", phrase: '"On the same page"',
      options: ["Reading the same book.", "Working in the same office.", "In agreement / sharing the same understanding."], answer: 2,
      reveal: "= in agreement, sharing the same understanding" },
    { art: "✂️🚧", phrase: '"Cut corners"',
      options: ["Save space in a small office.", "Do something poorly to save time or money.", "Take a shortcut while driving."], answer: 1,
      reveal: "= do something cheaply or poorly to save effort/cost" },
    { art: "🌙🛢️", phrase: '"Burn the midnight oil"',
      options: ["Waste resources at home.", "Cause a fire in the office.", "Work very late into the night."], answer: 2,
      reveal: "= work very late, often to meet a deadline" },
    { art: "🍔🥵", phrase: '"Bite off more than you can chew"',
      options: ["Order too much food.", "Take on more than you can handle.", "Argue with your manager."], answer: 1,
      reveal: "= take on more responsibility than you can manage" },
    { art: "🎾🙋", phrase: '"The ball is in your court"',
      options: ["You're playing a sport now.", "It's your turn / your decision now.", "Someone else is responsible."], answer: 1,
      reveal: "= it's your turn or decision now" },
    { art: "✉️🚀", phrase: '"Push the envelope"',
      options: ["Mail a heavy letter.", "Put pressure on the postman.", "Go beyond the usual limits."], answer: 2,
      reveal: "= go beyond usual limits; innovate aggressively" },
    { art: "🏃📈", phrase: '"Hit the ground running"',
      options: ["Be productive immediately from the start.", "Trip and fall.", "Run away from work."], answer: 0,
      reveal: "= start strong, be effective right from the beginning" },
    { art: "📕📏", phrase: '"By the book"',
      options: ["According to a famous novel.", "Strictly following the rules.", "While reading a manual."], answer: 1,
      reveal: "= strictly according to the rules / procedures" },
  ],

  /* ---------- Slide 7 — pronunciation (mix of classic + workplace) ---------- */
  twister: [
    "She sells seashells by the seashore.",
    "Red lorry, yellow lorry, red lorry, yellow lorry.",
    "Six slick slim sycamore saplings.",
    "Quality clients quickly question quirky quarterly quotes.",
    "Stakeholders strategically share strict standards.",
    "Better business briefings boost broader benefits.",
    "Productive professionals prefer prompt project planning.",
    "The chief synced six selected stakeholder spreadsheets.",
    "Sixty thoughtful shareholders thoroughly thanked the chairman.",
    "Peter Piper picked a peck of pickled peppers.",
  ],

  /* ---------- Slide 8 — B1 → B2: spot the mistake ---------- */
  mistake: [
    { words: ["She", "don't", "attend", "meetings."], wrongIndex: 1, fix: "doesn't",
      reveal: "Use 'doesn't' for he/she/it." },
    { words: ["I", "have", "went", "to", "the", "conference."], wrongIndex: 2, fix: "gone",
      reveal: "Past participle of 'go' is 'gone' (have gone)." },
    { words: ["The", "team", "are", "agree", "with", "the", "proposal."], wrongIndex: 3, fix: "agrees",
      reveal: "'Agree' is a verb — say 'agrees', not 'are agree'." },
    { words: ["He", "do", "the", "report", "yesterday."], wrongIndex: 1, fix: "did",
      reveal: "Past simple of 'do' is 'did'." },
    { words: ["This", "informations", "is", "very", "useful."], wrongIndex: 1, fix: "information",
      reveal: "'Information' is uncountable — no plural form." },
    { words: ["I", "have", "worked", "here", "since", "five", "years."], wrongIndex: 4, fix: "for",
      reveal: "Use 'for' with a duration: for five years." },
    { words: ["He", "is", "more", "taller", "than", "me."], wrongIndex: 2, fix: "(remove 'more')",
      reveal: "Short adjectives use -er ('taller'). Never combine 'more' AND -er." },
    { words: ["I", "am", "working", "here", "since", "2020."], wrongIndex: 1, fix: "have been",
      reveal: "With 'since', use present perfect (continuous): 'I have been working'." },
    { words: ["Where", "you", "are", "from?"], wrongIndex: 1, fix: "are you",
      reveal: "Question word order: Where ARE YOU from?" },
    { words: ["He", "told", "to", "me", "the", "news."], wrongIndex: 2, fix: "(remove 'to')",
      reveal: "'Tell someone something' — no 'to'. (Compare: 'said TO me'.)" },
    { words: ["I", "look", "forward", "to", "meet", "you."], wrongIndex: 4, fix: "meeting",
      reveal: "'Look forward TO' is followed by -ing → 'meeting'." },
    { words: ["Despite", "of", "the", "rain,", "we", "went", "out."], wrongIndex: 1, fix: "(remove 'of')",
      reveal: "Use 'Despite' OR 'In spite of' — never 'Despite of'." },
    { words: ["She", "made", "me", "to", "do", "it."], wrongIndex: 3, fix: "(remove 'to')",
      reveal: "'Make someone DO' something — bare infinitive, no 'to'." },
    { words: ["If", "I", "would", "have", "known,", "I", "would", "have", "called."], wrongIndex: 2, fix: "had",
      reveal: "3rd conditional: 'If I HAD known…'" },
    { words: ["I'm", "used", "to", "work", "late."], wrongIndex: 3, fix: "working",
      reveal: "'Be used to' + -ing form (= accustomed to)." },
  ],

  /* ---------- Slide 9 — corporate vocabulary, easy → upper-intermediate ---------- */
  scramble: [
    { word: "TEAM",          hint: "A group working together 👥" },
    { word: "GOAL",          hint: "Something you aim to achieve 🎯" },
    { word: "MEMO",          hint: "Short internal note 📝" },
    { word: "BUDGET",         hint: "Money allocated for a purpose 💰" },
    { word: "AGENDA",         hint: "List of topics for a meeting 📋" },
    { word: "CLIENT",         hint: "A customer of a business 🤝" },
    { word: "MEETING",        hint: "Where decisions get made 👥" },
    { word: "PROJECT",        hint: "Planned piece of work with a goal 🛠️" },
    { word: "DEADLINE",       hint: "When work must be done by ⏰" },
    { word: "FEEDBACK",       hint: "Comments to help you improve 💬" },
    { word: "STRATEGY",       hint: "A plan for long-term success ♟️" },
    { word: "COLLEAGUE",      hint: "A person you work with 🤝" },
    { word: "MILESTONE",      hint: "Significant point in a project 🏁" },
    { word: "STAKEHOLDER",    hint: "Person with interest in a project 🧑‍💼" },
    { word: "PRODUCTIVITY",   hint: "Output per hour worked 📈" },
    { word: "COLLABORATION",  hint: "Working together effectively 🤝" },
  ],

  /* ---------- Slide 10 — B2: corporate adjectives ---------- */
  synonyms: [
    { word: "efficient",   same: ["productive", "effective", "streamlined"], opposite: ["wasteful", "slow", "inefficient"] },
    { word: "ambitious",   same: ["driven", "motivated", "determined"],     opposite: ["lazy", "unmotivated", "complacent"] },
    { word: "diligent",    same: ["hardworking", "thorough", "meticulous"], opposite: ["careless", "negligent", "sloppy"] },
    { word: "innovative",  same: ["creative", "original", "inventive"],     opposite: ["conventional", "dull", "outdated"] },
    { word: "competent",   same: ["capable", "skilled", "qualified"],       opposite: ["incompetent", "unqualified", "inept"] },
    { word: "reliable",    same: ["dependable", "trustworthy", "consistent"], opposite: ["unreliable", "flaky", "inconsistent"] },
    { word: "assertive",   same: ["confident", "decisive", "self-assured"], opposite: ["passive", "timid", "hesitant"] },
    { word: "concise",     same: ["brief", "succinct", "to-the-point"],     opposite: ["wordy", "rambling", "long-winded"] },
  ],

  /* ---------- Slide 11 — B2: tricky usage + business terms ---------- */
  trueFalse: [
    { statement: "'CC' in email stands for 'carbon copy'.", answer: true,
      reveal: "Originally from carbon paper used to make duplicates." },
    { statement: "EOD typically means 'End of Day'.", answer: true,
      reveal: "Common in office emails — by EOD = before the workday ends." },
    { statement: "'KPI' stands for 'Key Performance Index'.", answer: false,
      reveal: "It's 'Key Performance Indicator'." },
    { statement: "'Affect' is usually a verb; 'effect' is usually a noun.", answer: true,
      reveal: "The change affected sales (verb). The effect was huge (noun)." },
    { statement: "'Stationary' and 'stationery' have the same meaning.", answer: false,
      reveal: "'Stationary' = not moving. 'Stationery' = pens, paper, etc." },
    { statement: "'Few' and 'a few' mean exactly the same thing.", answer: false,
      reveal: "'A few' = some (positive). 'Few' = almost none (negative tone)." },
    { statement: "We use 'fewer' for countable nouns and 'less' for uncountable.", answer: true,
      reveal: "Fewer emails, less coffee. (Many native speakers mix them up!)" },
    { statement: "'I look forward to meet you' is grammatically correct.", answer: false,
      reveal: "It must be 'looking forward to MEETING you' (-ing after 'to')." },
    { statement: "The plural of 'analysis' is 'analyses'.", answer: true,
      reveal: "Greek-origin nouns often pluralise -is → -es." },
    { statement: "'Their', 'there' and 'they're' are spelled the same.", answer: false,
      reveal: "Different spellings, same sound — they are homophones." },
    { statement: "'Per se' means 'as such' or 'by itself'.", answer: true,
      reveal: "Latin phrase — common in legal and business writing." },
    { statement: "An NDA is a 'Non-Disclosure Agreement'.", answer: true,
      reveal: "A contract obliging parties to keep information confidential." },
    { statement: "'Despite of the rain' is grammatically correct.", answer: false,
      reveal: "'Despite' takes no preposition. Use 'Despite the rain' OR 'In spite of the rain'." },
    { statement: "'Used to + base verb' refers to a past habit.", answer: true,
      reveal: "I used to commute by bus. (Compare: 'be used to' + -ing = accustomed.)" },
    { statement: "'B2B' means 'Business to Business'.", answer: true,
      reveal: "Companies that sell to other companies, not directly to consumers." },
    { statement: "'Whom' is grammatically the object form of 'who'.", answer: true,
      reveal: "Used for the object of a verb or preposition: 'To whom did you send it?'" },
  ],

  /* ---------- Slide 12 — three corporate crosswords (easy / medium / hard) ---------- */
  crosswords: [
    {
      title: "Office Basics · Easy",
      rows: 5, cols: 7,
      grid: [
        ["M","E","E","T","I","N","G"],
        ["#","M","#","#","#","#","#"],
        ["#","A","G","E","N","D","A"],
        ["#","I","#","#","#","#","#"],
        ["#","L","#","#","#","#","#"],
      ],
      starts: [
        { num: 1, dir: "across", row: 0, col: 0, len: 7, clue: "Where colleagues gather to discuss" },
        { num: 2, dir: "down",   row: 0, col: 1, len: 5, clue: "Most common written communication at work" },
        { num: 3, dir: "across", row: 2, col: 1, len: 6, clue: "List of topics for a meeting" },
      ],
    },
    {
      title: "Money Matters · Medium",
      rows: 6, cols: 6,
      grid: [
        ["I","N","V","E","S","T"],
        ["#","#","#","#","#","A"],
        ["#","#","#","#","#","R"],
        ["#","#","#","#","#","G"],
        ["#","#","#","#","#","E"],
        ["P","R","O","F","I","T"],
      ],
      starts: [
        { num: 1, dir: "across", row: 0, col: 0, len: 6, clue: "Put money in to gain a return" },
        { num: 2, dir: "down",   row: 0, col: 5, len: 6, clue: "A specific goal or objective to hit 🎯" },
        { num: 3, dir: "across", row: 5, col: 0, len: 6, clue: "Money earned after expenses" },
      ],
    },
    {
      title: "Strategy & Growth · Hard",
      rows: 8, cols: 8,
      grid: [
        ["#","#","#","#","#","I","#","#"],
        ["#","#","#","#","#","N","#","#"],
        ["#","#","#","#","#","N","#","#"],
        ["#","#","#","#","#","O","#","#"],
        ["#","#","#","#","#","V","#","#"],
        ["F","E","E","D","B","A","C","K"],
        ["#","#","#","#","#","T","#","#"],
        ["S","T","R","A","T","E","G","Y"],
      ],
      starts: [
        { num: 1, dir: "down",   row: 0, col: 5, len: 8, clue: "Introduce new ideas, products or methods" },
        { num: 2, dir: "across", row: 5, col: 0, len: 8, clue: "Constructive comments on someone's performance" },
        { num: 3, dir: "across", row: 7, col: 0, len: 8, clue: "A long-term plan to achieve business goals" },
      ],
    },
  ],
  crosswordPool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
};

/* ============================================================
   Sound effects — synthesized in-browser (no audio files).
   Web Audio API for tones / whooshes; speechSynthesis for short
   Minion-style babble. Toggle on/off with the 🔊 button or M key.
   ============================================================ */
const SFX = {
  ctx: null,
  enabled: localStorage.getItem("sfxEnabled") !== "false",
  babbleProb: 0.65,        // chance of a babble word firing on a tone
  lastBabbleAt: 0,          // throttle so babbles don't pile up

  // Short, generic Minion-flavoured exclamations
  happy:   ["Bello!", "Banana!", "Yay!", "Whee!", "Para tu!", "Hoo-ray!", "Boop boop!", "Yummy!"],
  sad:     ["Bee-doo bee-doo!", "Aww…", "Whaa…", "Ohh no!", "Boohoo!"],
  hello:   ["Bello!", "Hello-eh!", "Hi-ya!"],
  cheer:   ["Wheeee!", "Banana!", "Yippee!", "Woo-hoo!"],

  init() {
    if (this.ctx) return this.ctx;
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C) this.ctx = new C();
    } catch (_) { this.ctx = null; }
    return this.ctx;
  },
  resume() { if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },

  setEnabled(on) {
    this.enabled = on;
    localStorage.setItem("sfxEnabled", on ? "true" : "false");
    if (!on && "speechSynthesis" in window) speechSynthesis.cancel();
    const icon = document.getElementById("sfx-icon");
    const btn  = document.getElementById("sfx-toggle");
    if (icon) icon.textContent = on ? "🔊" : "🔇";
    if (btn)  btn.classList.toggle("muted", !on);
  },
  toggle() { this.setEnabled(!this.enabled); },

  // ---- low-level oscillator with envelope ----
  tone(freq, dur = 0.15, type = "sine", vol = 0.18, slideTo = null) {
    if (!this.enabled) return;
    const ctx = this.init();
    if (!ctx) return;
    this.resume();
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },

  // ---- short noise burst, useful for whooshes/whistles ----
  noise(dur = 0.25, freqStart = 2200, freqEnd = 400, vol = 0.12) {
    if (!this.enabled) return;
    const ctx = this.init();
    if (!ctx) return;
    this.resume();
    const t0 = ctx.currentTime;
    const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(freqStart, t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(80, freqEnd), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(filter).connect(g).connect(ctx.destination);
    src.start(t0); src.stop(t0 + dur + 0.05);
  },

  // ---- speak a quick high-pitched gibberish word ----
  babble(set, force = false) {
    if (!this.enabled || !("speechSynthesis" in window)) return;
    if (!force && Math.random() > this.babbleProb) return;
    const now = Date.now();
    if (!force && now - this.lastBabbleAt < 600) return;     // throttle
    this.lastBabbleAt = now;
    const list = this[set] || this.happy;
    const phrase = list[Math.floor(Math.random() * list.length)];
    const u = new SpeechSynthesisUtterance(phrase);
    u.lang = "en-US";
    u.rate = 1.45;     // fast — minion-like
    u.pitch = 1.95;    // high — minion-like
    u.volume = 0.7;
    const v = speechSynthesis.getVoices().find(v => v.lang.startsWith("en"));
    if (v) u.voice = v;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  },

  // ---- composed effects ----
  correct() {
    // Rising arpeggio: G5 → B5 → E6
    this.tone(784, 0.08, "triangle", 0.18);
    setTimeout(() => this.tone(988, 0.08, "triangle", 0.18), 80);
    setTimeout(() => this.tone(1318, 0.18, "triangle", 0.22), 160);
    setTimeout(() => this.babble("happy"), 280);
  },
  wrong() {
    // Sad descending bonk
    this.tone(330, 0.12, "sawtooth", 0.16, 220);
    setTimeout(() => this.tone(196, 0.18, "sawtooth", 0.16, 140), 120);
    setTimeout(() => this.babble("sad"), 50);
  },
  whoosh() {
    this.noise(0.22, 2400, 350, 0.10);
  },
  pop() {
    this.tone(620, 0.05, "square", 0.12, 480);
  },
  bell() {
    this.tone(1320, 0.05, "triangle", 0.10);
    setTimeout(() => this.tone(1760, 0.06, "triangle", 0.10), 40);
  },
  shh() {
    this.noise(0.15, 6000, 4000, 0.05);
  },
  hello() {
    this.tone(660, 0.08, "triangle", 0.16);
    setTimeout(() => this.tone(880, 0.12, "triangle", 0.18), 90);
    setTimeout(() => this.babble("hello", true), 140);
  },
  fanfare() {
    // Short flourish + cheer babble
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => this.tone(f, i === 3 ? 0.4 : 0.1, "triangle", 0.22), i * 100));
    setTimeout(() => this.babble("cheer", true), 500);
    setTimeout(() => this.babble("happy", true), 1100);
  },
  boo() {
    this.tone(220, 0.25, "sawtooth", 0.14, 130);
  },
  click() {
    this.tone(900, 0.03, "square", 0.08);
  },
};
SFX.setEnabled(SFX.enabled); // sync icon

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
  SFX.correct();
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
  SFX.wrong();
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
  const isTransition = i !== current;
  slides[current].classList.remove("active");
  current = i;
  slides[current].classList.add("active");
  curEl.textContent = current + 1;
  hidePeek();
  if (isTransition) SFX.whoosh();
  const game = slides[current].dataset.game;
  if (initializers[game]) initializers[game]();
  if (game === "welcome" && isTransition) {
    SFX.hello();
  }
  if (game === "goodbye") {
    finalScoreEl.textContent = score;
    const msg = document.getElementById("final-msg");
    if (score >= 18)      msg.textContent = "🏆 Banana legend! Outstanding job!";
    else if (score >= 12) msg.textContent = "💛 Great work — top minion energy!";
    else if (score >= 6)  msg.textContent = "👍 Nice effort — keep practicing!";
    else                  msg.textContent = "🌱 Good start — let's go again!";
    setTimeout(() => SFX.fanfare(), 400);
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
actions["tw-no"] = function () { SFX.boo(); };
actions["tw-next"] = function () {
  twIndex = (twIndex + 1) % twList.length;
  twScored = false;
  document.getElementById("tw-text").textContent = twList[twIndex];
  SFX.pop();
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
    SFX.bell();
  } else {
    cell.classList.remove("correct");
    cell.classList.add("flash-bad");
    setTimeout(() => cell.classList.remove("flash-bad"), 500);
    SFX.pop();
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
  SFX.shh();
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

/* ---------- Mute toggle ---------- */
const sfxBtn = document.getElementById("sfx-toggle");
if (sfxBtn) {
  sfxBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    SFX.toggle();
    if (SFX.enabled) SFX.bell(); // confirm chime
  });
}
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "m" || e.key === "M") {
    SFX.toggle();
    if (SFX.enabled) SFX.bell();
  }
});

/* Web Audio needs a user gesture before it will play; the first
   click/keypress anywhere unlocks the context. */
function unlockAudio() {
  SFX.init();
  SFX.resume();
  if (SFX.enabled && slides[current].dataset.game === "welcome") {
    setTimeout(() => SFX.hello(), 60);
  }
  document.removeEventListener("click", unlockAudio, true);
  document.removeEventListener("keydown", unlockAudio, true);
}
document.addEventListener("click", unlockAudio, true);
document.addEventListener("keydown", unlockAudio, true);

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
