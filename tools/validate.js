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
];
for (const [input, answers, want] of cases) {
  const got = L.exercises.checkText(input, answers, en).ok;
  if (got !== want) fail(`checkText(${JSON.stringify(input)}) = ${got}, want ${want}`);
}
const sp = L.exercises.checkSpeech(['good morning'], ['Good morning'], en);
if (!sp.ok) fail('checkSpeech exact match failed');

console.log(errors ? `\n${errors} problem(s) found.` : '\n✓ All checks passed.');
process.exit(errors ? 1 : 0);
