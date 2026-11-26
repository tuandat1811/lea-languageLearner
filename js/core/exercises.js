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

  L.exercises = {
    build: function (skillId, course, lesson) { return builders[skillId](course, lesson); },
    normalize: normalize,
    similarity: similarity,
    checkText: checkText,
    checkSpeech: checkSpeech,
    shuffle: shuffle,
    sample: sample,
  };
})(window.LEA);
