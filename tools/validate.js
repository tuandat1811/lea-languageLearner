// Validates course data and exercise generation: `node tools/validate.js`
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const storage = {};
const sandbox = {
  window: {}, console,
  localStorage: { getItem: (k) => storage[k] || null, setItem: (k, v) => { storage[k] = v; } },
};
sandbox.window = sandbox;
sandbox.LEA = undefined;
vm.createContext(sandbox);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
['js/core/registry.js', 'js/core/storage.js', 'js/core/exercises.js'].forEach(load);
// Base course files (en.js) must load before their extensions (en-a2.js).
fs.readdirSync(path.join(root, 'data')).filter((f) => f.endsWith('.js'))
  .sort((a, b) => (a.includes('-') - b.includes('-')) || a.localeCompare(b))
  .forEach((f) => load('data/' + f));

const L = sandbox.LEA;
let errors = 0;
const fail = (msg) => { errors++; console.error('✗ ' + msg); };

for (const code of L.languageOrder) {
  const c = L.languages[code];
  const ids = new Set();
  console.log(`\n${c.flag} ${c.name}: ${c.units.length} units, ${c.lessonList.length} lessons`);
  const unitIds = new Set(c.units.map((u) => u.id));
  const covered = new Set();
  (c.syllabus || []).forEach((lv) => lv.units.forEach((it) => {
    if (it.unit) {
      if (!unitIds.has(it.unit)) fail(`${code}/syllabus ${lv.id}: unknown unit ${it.unit}`);
      covered.add(it.unit);
    } else if (!it.title || !it.grammar) fail(`${code}/syllabus ${lv.id}: planned unit needs title and grammar`);
  }));
  if (c.syllabus) unitIds.forEach((id) => { if (!covered.has(id)) fail(`${code}: unit ${id} missing from syllabus`); });
  for (const l of c.lessonList) {
    const where = `${code}/${l.id}`;
    if (ids.has(l.id)) fail(`${where}: duplicate id`);
    ids.add(l.id);
    if (l.vocab.length < 5) fail(`${where}: needs ≥5 vocab`);
    if (l.sentences.length < 5) fail(`${where}: needs ≥5 sentences`);
    const vis = l.vocab.map((v) => v.vi);
    if (new Set(vis).size !== vis.length) fail(`${where}: duplicate vi meanings`);
    const svis = l.sentences.map((s) => s.vi);
    if (new Set(svis).size !== svis.length) fail(`${where}: duplicate sentence vi`);
    l.reading.questions.forEach((q, i) => {
      if (!(q.answer >= 0 && q.answer < q.options.length)) fail(`${where}: reading q${i} answer out of range`);
      if (new Set(q.options).size !== q.options.length) fail(`${where}: reading q${i} duplicate options`);
    });
    // Generate each skill many times; check every exercise is answerable.
    for (const s of L.SKILLS) {
      for (let n = 0; n < 40; n++) {
        const exs = L.exercises.build(s.id, c, l);
        if (exs.length < 5) fail(`${where}/${s.id}: only ${exs.length} exercises`);
        for (const ex of exs) {
          if (ex.options) {
            if (new Set(ex.options).size !== ex.options.length) fail(`${where}/${s.id}/${ex.type}: duplicate options ${JSON.stringify(ex.options)}`);
            if (ex.options.length < 2 || ex.answer < 0) fail(`${where}/${s.id}/${ex.type}: bad options`);
          }
          if (ex.type === 'order') {
            const r = L.exercises.checkText(ex.answer.replace(/[.!?]+$/, ''), [ex.answer], c);
            if (!r.ok) fail(`${where}: order answer not self-consistent: ${ex.answer}`);
          }
          if (ex.type === 'fill' && !ex.answer.trim()) fail(`${where}: empty fill answer`);
        }
      }
    }
  }
}

// Pronunciation lessons.
for (const code of L.languageOrder) {
  const c = L.languages[code];
  const list = c.pronunciation || [];
  if (list.length) console.log(`${c.flag} ${c.name}: ${list.length} pronunciation lessons`);
  for (const p of list) {
    const where = `${code}/${p.id}`;
    if (!p.explain || p.explain.length < 2) fail(`${where}: needs explanation`);
    if (!p.examples || p.examples.length < 3) fail(`${where}: needs ≥3 examples`);
    if (!p.sentences || p.sentences.length < 2) fail(`${where}: needs ≥2 sentences`);
    if (!(p.pairs && p.pairs.length >= 4) && !(p.groups && p.groups.items.length >= 5)) fail(`${where}: needs ≥4 pairs or ≥5 group items`);
    (p.pairs || []).forEach((pair) => { if (pair.length !== 2 || pair[0] === pair[1]) fail(`${where}: bad pair ${pair}`); });
    if (p.groups) {
      p.groups.items.forEach((it) => { if (!(it.group >= 0 && it.group < p.groups.labels.length)) fail(`${where}: bad group for ${it.word}`); });
      p.groups.labels.forEach((_, gi) => { if (!p.groups.items.some((it) => it.group === gi)) fail(`${where}: empty group ${gi}`); });
    }
    for (let n = 0; n < 40; n++) {
      const exs = L.exercises.build('pron', c, p);
      if (exs.length < 6) fail(`${where}: only ${exs.length} exercises`);
      exs.forEach((ex) => {
        if (ex.options && (new Set(ex.options).size !== ex.options.length || ex.answer < 0)) fail(`${where}/${ex.type}: bad options`);
      });
    }
  }
}

// Answer checking sanity checks (English).
const en = L.languages.en;
const cases = [
  ["I'm fine, thanks", ['I am fine, thanks.'], true],
  ['i am anna', ['I am Anna.'], true],
  ["It's seven o'clock", ["It is seven o'clock."], true],
  ['he isnt short', ['He is not short.'], true],
  ['I have 2 cats', ['I have two cats.'], true],
  ['goodbye', ['hello'], false],
  ['delicous', ['delicious'], true], // one typo forgiven
  ["I'll help you", ['I will help you.'], true],
  ['she wasnt at school', ["She wasn't at school."], true],
  ['I promise I will not be late', ["I promise I won't be late."], true],
  ['I feel ill', ['I feel I will'], false], // "ill" must stay a word
  ['We were busy', ["We're busy"], false],
  ['I have just seen your message', ["I've just seen your message."], true],
  ['she hasnt answered my email yet', ["She hasn't answered my email yet."], true],
  ["I haven't seen my neighbor for a month", ["I haven't seen my neighbour for a month."], true],
  ['I realized that I had forgotten my passport', ['I realised that I had forgotten my passport.'], true],
  ["I'd rather stay in tonight", ['I would rather stay in tonight.'], true],
  ['The flight has been canceled', ['The flight has been cancelled.'], true],
];
for (const [input, answers, want] of cases) {
  const got = L.exercises.checkText(input, answers, en).ok;
  if (got !== want) fail(`checkText(${JSON.stringify(input)}) = ${got}, want ${want}`);
}
const sp = L.exercises.checkSpeech(['good morning'], ['Good morning'], en);
if (!sp.ok) fail('checkSpeech exact match failed');

console.log(errors ? `\n${errors} problem(s) found.` : '\n✓ All checks passed.');
process.exit(errors ? 1 : 0);
