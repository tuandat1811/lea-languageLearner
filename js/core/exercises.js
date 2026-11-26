/*
 * Builds practice sessions for each of the four skills from lesson data,
 * and checks answers. Language-specific rules (contractions, number words)
 * come from the course definition, so new languages need no code here.
 */
(function (L) {
  // ---------- helpers ----------
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }
  function uniq(arr) { return arr.filter(function (x, i) { return arr.indexOf(x) === i; }); }

  /** Build 4 options with the correct one at a random index. */
  function options(correct, pool, n) {
    n = n || 4;
    var others = uniq(pool.filter(function (x) { return x !== correct; }));
    var opts = shuffle([correct].concat(sample(others, n - 1)));
    return { options: opts, answer: opts.indexOf(correct) };
  }

  function allVocab(course) {
    var out = [];
    course.lessonList.forEach(function (l) { out = out.concat(l.vocab); });
    return out;
  }

  // Lesson vocab first, then the rest of the course as fallback distractors.
  function viPool(course, lesson, exclude) {
    var local = lesson.vocab.map(function (v) { return v.vi; });
    var global = allVocab(course).map(function (v) { return v.vi; });
    var pool = uniq(local.concat(sample(global, 12))).filter(function (x) { return x !== exclude; });
    return pool;
  }

  function enSentencePool(course, lesson) {
    var local = lesson.sentences.map(function (s) { return s.en; });
    if (local.length >= 4) return local;
    var global = [];
    course.lessonList.forEach(function (l) { global = global.concat(l.sentences.map(function (s) { return s.en; })); });
    return uniq(local.concat(sample(global, 6)));
  }

  // ---------- normalisation & comparison ----------
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function normalize(text, course) {
    var s = String(text || '').toLowerCase().replace(/[’‘`]/g, "'").trim();
    var c = course.contractions || {};
    var skipLoose = course.noLooseContractions || [];
    Object.keys(c).forEach(function (k) {
      s = s.replace(new RegExp('(^|[^\\p{L}])' + escapeRe(k) + '(?=$|[^\\p{L}])', 'gu'), '$1' + c[k]);
      // Learners often type contractions without the apostrophe (isnt, dont).
      var loose = k.replace(/'/g, '');
      if (loose !== k && skipLoose.indexOf(loose) === -1) {
        s = s.replace(new RegExp('(^|[^\\p{L}])' + escapeRe(loose) + '(?=$|[^\\p{L}])', 'gu'), '$1' + c[k]);
      }
    });
    s = s.replace(/[^\p{L}\p{N}\s']/gu, ' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
    var eq = course.equivalents || {};
    s = s.split(' ').map(function (w) { return eq[w] || w; }).join(' ');
    return s;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    var prev = [], cur = [];
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  function similarity(a, b) {
    if (!a && !b) return 1;
    return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
  }

  /** Compare typed text against accepted answers. */
  function checkText(input, answers, course) {
    var got = normalize(input, course);
    var bestDist = Infinity, bestAns = answers[0], bestLen = 0;
    for (var i = 0; i < answers.length; i++) {
      var want = normalize(answers[i], course);
      if (got === want) return { ok: true, exact: true };
      var d = levenshtein(got, want);
      if (d < bestDist) { bestDist = d; bestAns = answers[i]; bestLen = want.length; }
    }
    // Forgive a small typo: 1 letter for words of 5+ letters, 2 for long sentences.
    var allowed = bestLen >= 15 ? 2 : bestLen >= 5 ? 1 : 0;
    var close = got.length > 0 && bestDist <= allowed;
    return { ok: close, exact: false, close: close, closest: bestAns };
  }

  /** Compare recognised speech alternatives against the target. */
  function checkSpeech(alternatives, answers, course) {
    var best = 0, heard = alternatives[0] || '';
    alternatives.forEach(function (alt) {
      answers.forEach(function (ans) {
        var sim = similarity(normalize(alt, course), normalize(ans, course));
        if (sim > best) { best = sim; heard = alt; }
      });
    });
    return { ok: best >= 0.75, score: best, heard: heard };
  }

  // ---------- exercise builders ----------
  function wordsOf(sentence) {
    return sentence.replace(/[.!?]+$/, '').split(/\s+/).filter(Boolean);
  }

  function makeFill(sentence, lesson) {
    // Blank out a lesson word that appears in the sentence.
    var vocab = lesson.vocab.slice().sort(function (a, b) { return b.en.length - a.en.length; });
    for (var i = 0; i < vocab.length; i++) {
      var w = vocab[i].en;
      var re = new RegExp('(^|[^\\p{L}])(' + escapeRe(w) + ')(?=$|[^\\p{L}])', 'iu');
      var m = sentence.en.match(re);
      if (m) {
        var start = m.index + m[1].length;
        return {
          type: 'fill', vi: sentence.vi,
          before: sentence.en.slice(0, start), after: sentence.en.slice(start + m[2].length),
          answer: m[2], hint: vocab[i].vi,
        };
      }
    }
    // Fallback: blank the longest word.
    var words = wordsOf(sentence.en);
    var longest = words.slice().sort(function (a, b) { return b.length - a.length; })[0].replace(/[,]/g, '');
    var idx = sentence.en.indexOf(longest);
    return {
      type: 'fill', vi: sentence.vi,
      before: sentence.en.slice(0, idx), after: sentence.en.slice(idx + longest.length),
      answer: longest, hint: '',
    };
  }

  function makeOrder(sentence, lesson) {
    var words = wordsOf(sentence.en);
    var lower = words.map(function (w) { return w.toLowerCase().replace(/[^\p{L}']/gu, ''); });
    var extra = lesson.vocab
      .map(function (v) { return v.en; })
      .filter(function (w) { return w.indexOf(' ') === -1 && lower.indexOf(w.toLowerCase()) === -1; });
    var tiles = words.slice();
    if (words.length >= 3 && extra.length) tiles.push(sample(extra, 1)[0]);
    return { type: 'order', vi: sentence.vi, tiles: shuffle(tiles), answer: sentence.en, alts: sentence.alts || [] };
  }

  var builders = {
    listening: function (course, lesson) {
      var ex = [];
      sample(lesson.vocab, 3).forEach(function (v) {
        var o = options(v.vi, viPool(course, lesson, v.vi));
        ex.push({ type: 'listen_choose', audio: v.en, options: o.options, answer: o.answer, reveal: v.en + ' = ' + v.vi });
      });
      var sents = sample(lesson.sentences, 4);
      sents.slice(0, 2).forEach(function (s) {
        var o = options(s.en, enSentencePool(course, lesson));
        ex.push({ type: 'listen_pick', audio: s.en, options: o.options, answer: o.answer, reveal: s.en + ' — ' + s.vi });
      });
      var w = sample(lesson.vocab, 1)[0];
      ex.push({ type: 'dictation', audio: w.en, answers: [w.en], vi: w.vi });
      var shortest = sents.slice(2).sort(function (a, b) { return a.en.length - b.en.length; })[0];
      ex.push({ type: 'dictation', audio: shortest.en, answers: [shortest.en].concat(shortest.alts || []), vi: shortest.vi });
      return ex;
    },

    speaking: function (course, lesson) {
      var ex = [];
      sample(lesson.vocab, 3).forEach(function (v) {
        ex.push({ type: 'speak', text: v.en, ipa: v.ipa, vi: v.vi, answers: [v.en] });
      });
      var sents = sample(lesson.sentences, 3);
      sents.slice(0, 2).forEach(function (s) {
        ex.push({ type: 'speak', text: s.en, vi: s.vi, answers: [s.en].concat(s.alts || []) });
      });
      ex.push({ type: 'speak_translate', vi: sents[2].vi, text: sents[2].en, answers: [sents[2].en].concat(sents[2].alts || []) });
      return ex;
    },

    reading: function (course, lesson) {
      var ex = [];
      ex.push({ type: 'match', pairs: sample(lesson.vocab, 5).map(function (v) { return { en: v.en, vi: v.vi }; }) });
      sample(lesson.sentences, 2).forEach(function (s) {
        var pool = lesson.sentences.map(function (x) { return x.vi; });
        var o = options(s.vi, pool);
        ex.push({ type: 'read_choose', text: s.en, options: o.options, answer: o.answer });
      });
      lesson.reading.questions.forEach(function (q) {
        var opts = q.options.map(function (text, i) { return { text: text, correct: i === q.answer }; });
        opts = shuffle(opts);
        ex.push({
          type: 'passage', reading: lesson.reading, question: q.q,
          options: opts.map(function (o) { return o.text; }),
          answer: opts.findIndex(function (o) { return o.correct; }),
        });
      });
      return ex;
    },

    writing: function (course, lesson) {
      var ex = [];
      sample(lesson.vocab, 2).forEach(function (v) {
        ex.push({ type: 'translate', vi: v.vi, answers: [v.en].concat(v.alts || []), hint: v.emoji || '' });
      });
      var sents = shuffle(lesson.sentences);
      sents.slice(0, 2).forEach(function (s) { ex.push(makeOrder(s, lesson)); });
      sents.slice(2, 4).forEach(function (s) { ex.push(makeFill(s, lesson)); });
      var last = sents[4] || sents[0];
      ex.push({ type: 'translate', vi: last.vi, answers: [last.en].concat(last.alts || []), sentence: true });
      return ex;
    },
  };

  /** Pronunciation practice: minimal pairs, sound / stress groups, and speaking. */
  builders.pron = function (course, p) {
    var ex = [];
    if (p.pairs) {
      sample(p.pairs, Math.min(4, p.pairs.length)).forEach(function (pair) {
        var target = pair[Math.random() < 0.5 ? 0 : 1];
        var opts = shuffle(pair);
        ex.push({ type: 'pron_pair', audio: target, options: opts, answer: opts.indexOf(target), reveal: target + '  (' + pair.join(' / ') + ')' });
      });
    }
    if (p.groups) {
      sample(p.groups.items, p.pairs ? 3 : 5).forEach(function (it) {
        ex.push({
          type: 'pron_group', text: it.word, ipa: it.ipa || '', prompt: p.groups.question,
          options: p.groups.labels.slice(), answer: it.group, reveal: it.word + ' → ' + p.groups.labels[it.group],
        });
      });
    }
    sample(p.examples, 2).forEach(function (w) {
      ex.push({ type: 'speak', text: w.word, ipa: w.ipa, vi: w.vi, answers: [w.word] });
    });
    var s = sample(p.sentences, 1)[0];
    ex.push({ type: 'speak', text: s.en, vi: s.vi, answers: [s.en] });
    return ex;
  };

  // =====================================================================
  // Grammar check-point test (bài kiểm tra ngữ pháp), built from several lessons.
  // Part I (trắc nghiệm): choose the word for the blank, choose the correct sentence.
  // Part II (tự luận): write the correct form of the word in brackets, translate.
  // Blanks only use closed "families" of grammar words, so exactly one option fits.
  // =====================================================================
  var DAYS = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays|christmas|new|my|his|her|their|our|your)$/;
  var MONTHS = /^(january|february|march|april|may|june|july|august|september|october|november|december|spring|summer|autumn|fall|winter|\d{4})$/;
  var FAMILIES = [
    { words: ['am', 'is', 'are'], hint: 'be' },
    { words: ['was', 'were'], hint: 'be' },
    { words: ["isn't", "aren't"], hint: 'be + not' },
    { words: ["wasn't", "weren't"], hint: 'be + not' },
    { words: ['do', 'does'], hint: 'do' },
    { words: ["don't", "doesn't"], hint: 'do + not' },
    { words: ['have', 'has'], hint: 'have' },
    { words: ['a', 'an'], hint: 'a / an' },
    { words: ['this', 'these'], hint: 'this' },
    {
      words: ['that', 'those'], hint: 'that',
      // Only as a determiner (that day / those shoes), not the conjunction "that".
      when: function (t, i, s, next) { return t === 'those' || /^(day|time|one|man|woman|book|film|movie|house|car|year|week|morning|night|place|way|girl|boy|shirt|dress|bag|room|city|song|picture|restaurant|street)$/i.test(next || ''); },
    },
    { words: ['much', 'many'], hint: 'much / many' },
    { words: ['some', 'any'], hint: 'some / any', when: function (t, i, s) { return !/\?\s*$/.test(s); } },
    { words: ['for', 'since'], hint: 'for / since', when: function (t, i, s) { return /\b(have|has|had|been|how long)\b/i.test(s); } },
    { words: ['more', 'most'], hint: 'more / most' },
    { words: ['better', 'best'], hint: 'good' },
    { words: ['worse', 'worst'], hint: 'bad' },
    { words: ['who', 'which'], hint: 'who / which', when: function (t, i) { return i > 0; } },
    {
      words: ['at', 'on', 'in'], hint: 'at / on / in',
      // Only time expressions, where the next word decides the preposition.
      when: function (t, i, s, next) {
        var n = (next || '').toLowerCase();
        if (t === 'on') return DAYS.test(n);
        if (t === 'at') return /^\d/.test(n) || /^(noon|night|midnight)$/.test(n);
        if (t === 'in') return MONTHS.test(n);
        return false;
      },
    },
  ];
  var FAMILY_OF = {};
  FAMILIES.forEach(function (f) { f.words.forEach(function (w) { FAMILY_OF[w] = f; }); });
  var NOT_VERB_S = /^(is|was|has|does|this|its|his|hers|yes|us|always|sometimes|perhaps|less|unless|news|plus|bus|class|glass|grass|kiss|miss|boss|dress|address|across|nervous|famous|delicious|dangerous|serious|various|previous|obvious|jealous|curious|anxious|enormous|generous|gorgeous|tennis|series|species|mathematics|maths|physics|politics|economics|christmas|afterwards|towards|backwards|upstairs|downstairs|indoors|outdoors|thanks|as|was|plus|chess|less|guess|press|pass|cross|loss)$/;
  function baseOf(verb) {
    if (/ies$/.test(verb) && verb.length > 4) return verb.slice(0, -3) + 'y';
    if (/(ch|sh|ss|x|z|o)es$/.test(verb)) return verb.slice(0, -2);
    if (/[^s]s$/.test(verb)) return verb.slice(0, -1);
    return null;
  }
  function capLike(src, w) { return /^[A-Z]/.test(src) ? w.charAt(0).toUpperCase() + w.slice(1) : w; }

  function tokenize(text) {
    // Words keep their apostrophes (don't, Tom's); everything else is a separator token.
    return text.match(/[\p{L}\p{N}']+|[^\p{L}\p{N}']+/gu) || [];
  }
  function isWord(t) { return /[\p{L}\p{N}]/u.test(t); }

  /** Grammar blanks in a sentence: [{ index, answer, options, hint }]. */
  function grammarSlots(text) {
    var toks = tokenize(text);
    var wordIdx = [];
    toks.forEach(function (t, i) { if (isWord(t)) wordIdx.push(i); });
    var slots = [];
    wordIdx.forEach(function (ti, wi) {
      var tok = toks[ti], low = tok.toLowerCase().replace(/’/g, "'");
      var next = wordIdx[wi + 1] !== undefined ? toks[wordIdx[wi + 1]] : '';
      var prev = wi > 0 ? toks[wordIdx[wi - 1]].toLowerCase() : '';
      var fam = FAMILY_OF[low];
      if (fam && (!fam.when || fam.when(low, wi, text, next))) {
        slots.push({ index: ti, answer: tok, options: fam.words.map(function (w) { return capLike(tok, w); }), hint: fam.hint });
        return;
      }
      // Third person -s right after he / she / it in the same clause: likes ↔ like.
      var sameClause = wi > 0 && wordIdx[wi - 1] === ti - 2 && toks[ti - 1] === ' ';
      if (sameClause && /^(he|she|it)$/.test(prev) && low.indexOf("'") === -1 && !NOT_VERB_S.test(low)) {
        var base = baseOf(low);
        if (base && base.length >= 2) slots.push({ index: ti, answer: tok, options: [tok, base], hint: base });
      }
    });
    return { toks: toks, wordIdx: wordIdx, slots: slots };
  }

  /** Wrong versions of a sentence: grammar-word swaps first, then swapped word order. */
  function wrongVersions(item, course, n) {
    var g = grammarSlots(item.en);
    var keep = [item.en].concat(item.alts || []).map(function (s) { return normalize(s, course); });
    var out = [];
    function add(toks) {
      var s = toks.join('');
      var k = normalize(s, course);
      if (keep.indexOf(k) === -1 && out.every(function (o) { return normalize(o, course) !== k; })) out.push(s);
    }
    shuffle(g.slots).forEach(function (slot) {
      slot.options.forEach(function (o) {
        if (o === slot.answer) return;
        var t = g.toks.slice(); t[slot.index] = o; add(t);
      });
    });
    // Adjacent word swaps (never the first word, so capitals stay right).
    var pairs = [];
    for (var w = 1; w + 1 < g.wordIdx.length; w++) pairs.push(w);
    shuffle(pairs).forEach(function (w) {
      var a = g.wordIdx[w], b = g.wordIdx[w + 1];
      // Only words separated by a plain space, never across punctuation.
      if (b !== a + 2 || g.toks[a + 1] !== ' ') return;
      if (g.toks[a].toLowerCase() === g.toks[b].toLowerCase()) return;
      if (/^(and|or)$/i.test(g.toks[a]) || /^(and|or)$/i.test(g.toks[b])) return;
      var t = g.toks.slice(); t[a] = g.toks[b]; t[b] = g.toks[a]; add(t);
    });
    return shuffle(out.slice(0, 6)).slice(0, n);
  }

  function testPool(course, lessons) {
    var pool = [], seen = {};
    lessons.forEach(function (l) {
      l.grammar.examples.map(function (s) { return { en: s.en, vi: s.vi, alts: s.alts || [], ex: true }; })
        .concat(l.sentences.map(function (s) { return { en: s.en, vi: s.vi, alts: s.alts || [], ex: false }; }))
        .forEach(function (s) {
          var k = normalize(s.en, course);
          if (seen[k]) return;
          seen[k] = true;
          s.slots = grammarSlots(s.en).slots;
          pool.push(s);
        });
    });
    return pool;
  }

  builders.test = function (course, lessons) {
    var pool = testPool(course, lessons);
    var used = {};
    // Prefer grammar examples, then sentences with the most grammar words.
    function pick(filter) {
      var c = shuffle(pool.filter(function (s) { return !used[s.en] && filter(s); }))
        .sort(function (a, b) { return (b.ex - a.ex) || (b.slots.length - a.slots.length); });
      // Keep some variety: choose randomly among the best few.
      var s = c.length ? c[Math.floor(Math.random() * Math.min(3, c.length))] : null;
      if (s) used[s.en] = true;
      return s;
    }
    var famCount = {};
    function slotOf(s) {
      // Least-used grammar family first so one test covers several points.
      var slots = shuffle(s.slots).sort(function (a, b) { return (famCount[a.hint] || 0) - (famCount[b.hint] || 0); });
      var slot = slots[0];
      famCount[slot.hint] = (famCount[slot.hint] || 0) + 1;
      return slot;
    }
    function split(s, slot) {
      var toks = tokenize(s.en);
      return { before: toks.slice(0, slot.index).join(''), after: toks.slice(slot.index + 1).join('') };
    }

    var mcq = [], essay = [];
    // Part I-a: choose the word for the blank (4).
    for (var i = 0; i < 4; i++) {
      var s = pick(function (x) { return x.slots.length > 0; });
      if (!s) break;
      var slot = slotOf(s), parts = split(s, slot), opts = shuffle(slot.options);
      mcq.push({
        type: 'fill_choice', prompt: 'Trắc nghiệm · Chọn từ đúng điền vào chỗ trống',
        before: parts.before, after: parts.after, vi: s.vi,
        options: opts, answer: opts.indexOf(slot.answer), reveal: s.en,
      });
    }
    // Part I-b: choose the grammatically correct sentence (fills up to 6).
    while (mcq.length < 6) {
      var t = pick(function (x) { return grammarSlots(x.en).wordIdx.length >= 3 && wrongVersions(x, course, 3).length >= 2; });
      if (!t) break;
      var wrong = wrongVersions(t, course, 3);
      var o = shuffle([t.en].concat(wrong));
      mcq.push({
        type: 'pick_sentence', prompt: 'Trắc nghiệm · Chọn câu đúng ngữ pháp',
        vi: t.vi, options: o, answer: o.indexOf(t.en), reveal: t.en,
      });
    }
    // Part II-a: write the correct form of the word in brackets (2).
    for (var j = 0; j < 2; j++) {
      var f = pick(function (x) { return x.slots.length > 0; });
      if (!f) break;
      var fs = slotOf(f), fp = split(f, fs);
      essay.push({
        type: 'fill', prompt: 'Tự luận · Viết dạng đúng của từ trong ngoặc', strict: true,
        before: fp.before, after: fp.after, answer: fs.answer, vi: f.vi, hint: '(' + fs.hint + ')',
      });
    }
    // Part II-b: find the one grammar mistake and rewrite the sentence (fills up to 4).
    // The answer is unique (the original sentence), so exact checking stays fair.
    while (essay.length < 4) {
      var e = pick(function (x) { return x.slots.length > 0; });
      if (!e) break;
      var es = slotOf(e), wrongWord = shuffle(es.options.filter(function (o) { return o !== es.answer; }))[0];
      var et = tokenize(e.en); et[es.index] = wrongWord;
      essay.push({
        type: 'correct', prompt: 'Tự luận · Tìm lỗi sai và viết lại câu đúng', strict: true,
        wrong: et.join(''), vi: e.vi, answers: [e.en],
      });
    }
    return mcq.concat(essay);
  };

  /**
   * Exact check for the grammar test: no typo is forgiven (He like ≠ He likes).
   * Only these differences are accepted: a lowercase first letter of the sentence,
   * extra spaces, curly vs straight apostrophes, and a contraction written in full
   * (doesn't = does not), since both forms are correct English.
   */
  function canonExact(text, course) {
    var c = course.contractions || {};
    var s = String(text || '').replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim();
    var keys = Object.keys(c).sort(function (x, y) { return y.length - x.length; });
    if (keys.length) {
      var re = new RegExp('(^|[^\\p{L}])(' + keys.map(escapeRe).join('|') + ')(?=$|[^\\p{L}])', 'giu');
      s = s.replace(re, function (m, pre, word) {
        var full = c[word.toLowerCase()];
        return pre + (/^[A-Z]/.test(word) ? full.charAt(0).toUpperCase() + full.slice(1) : full);
      });
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function checkStrict(input, answers, course) {
    var got = canonExact(input, course);
    for (var i = 0; i < answers.length; i++) {
      if (got === canonExact(answers[i], course)) return { ok: true, exact: true };
    }
    return { ok: false, exact: false };
  }

  L.exercises = {
    build: function (skillId, course, lesson) { return builders[skillId](course, lesson); },
    buildTest: function (course, test) { return builders.test(course, test.lessons); },
    grammarSlots: grammarSlots,
    checkStrict: checkStrict,
    normalize: normalize,
    similarity: similarity,
    checkText: checkText,
    checkSpeech: checkSpeech,
    shuffle: shuffle,
    sample: sample,
  };
})(window.LEA);
