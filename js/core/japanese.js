/*
 * Japanese text helpers: romaji → hiragana, katakana → hiragana, and answer checking.
 *
 * Learners may answer in kanji (IME), kana, or romaji. Checking stays exact (no typo is
 * forgiven); only differences that come from the writing system itself are accepted:
 *   - romaji spelling systems: shi/si, chi/ti, tsu/tu, fu/hu, ji/zi, n/nn …
 *   - the particles は / へ / を typed as they sound in romaji: wa / e / o
 *   - long vowels in romaji: ō, ou, oo, o- (and ē/ei/ee …) mean the same sound
 *   - spaces, punctuation and katakana vs hiragana
 */
window.LEA = window.LEA || {};

(function (L) {
  var ROMAJI = {
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
    sa: 'さ', si: 'し', shi: 'し', su: 'す', se: 'せ', so: 'そ',
    ta: 'た', ti: 'ち', chi: 'ち', tu: 'つ', tsu: 'つ', te: 'て', to: 'と',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
    ha: 'は', hi: 'ひ', hu: 'ふ', fu: 'ふ', he: 'へ', ho: 'ほ',
    ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
    ya: 'や', yu: 'ゆ', yo: 'よ',
    ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
    wa: 'わ', wo: 'を', "n'": 'ん',
    ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
    za: 'ざ', zi: 'じ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
    da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
    ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
    pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
    kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ', gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
    sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ', she: 'しぇ',
    ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ', zya: 'じゃ', zyu: 'じゅ', zyo: 'じょ', je: 'じぇ',
    cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ', cya: 'ちゃ', cyu: 'ちゅ', cyo: 'ちょ', che: 'ちぇ',
    nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ', hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
    bya: 'びゃ', byu: 'びゅ', byo: 'びょ', pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
    mya: 'みゃ', myu: 'みゅ', myo: 'みょ', rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
    fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', thi: 'てぃ', dhi: 'でぃ', we: 'うぇ', wi: 'うぃ', va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
    xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ', la: 'ぁ', li: 'ぃ', lu: 'ぅ', le: 'ぇ', lo: 'ぉ',
    xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ', lya: 'ゃ', lyu: 'ゅ', lyo: 'ょ', xtu: 'っ', ltu: 'っ', xtsu: 'っ',
    '-': 'ー',
  };
  var MACRON = { 'ā': 'aa', 'ī': 'ii', 'ū': 'uu', 'ē': 'ei', 'ō': 'ou', 'â': 'aa', 'î': 'ii', 'û': 'uu', 'ê': 'ei', 'ô': 'ou' };

  function kataToHira(s) {
    return s.replace(/[ァ-ヶ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); });
  }
  function hiraToKata(s) {
    return s.replace(/[ぁ-ゖ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) + 0x60); });
  }

  /** Convert romaji (Hepburn or kunrei, as typed with an IME) to hiragana. Kana in the input is kept. */
  function romajiToHira(input) {
    var s = String(input || '').toLowerCase().replace(/[āīūēōâîûêô]/g, function (c) { return MACRON[c]; });
    var out = '';
    var i = 0;
    while (i < s.length) {
      var c = s[i];
      // Double consonant → small tsu (kk, tt, ss, pp, tch …), but not "nn".
      if (/[bcdfghjkmpqrstvwxyz]/.test(c) && s[i + 1] === c && c !== 'n') { out += 'っ'; i++; continue; }
      if (c === 't' && s.slice(i, i + 3) === 'tch') { out += 'っ'; i++; continue; }
      // Hepburn writes ん as m before b / p / m: shimbun, sempai.
      if (c === 'm' && /[bpm]/.test(s[i + 1] || '')) { out += 'ん'; i++; continue; }
      // "nn": before a vowel or y only the first n is ん (konnichiwa = ko-n-ni-chi-wa);
      // otherwise both n's make one ん, as typed with an IME (konnnichiha, sennsei).
      if (c === 'n' && s[i + 1] === 'n') {
        out += 'ん';
        i += /[aiueoy]/.test(s[i + 2] || '') ? 1 : 2;
        continue;
      }
      var hit = '';
      for (var len = 4; len >= 1; len--) {
        var part = s.slice(i, i + len);
        if (ROMAJI[part] !== undefined) { hit = part; break; }
      }
      if (hit) {
        // A lone "n" before a consonant (or at the end) is ん.
        out += ROMAJI[hit];
        i += hit.length;
        continue;
      }
      if (c === 'n') { out += 'ん'; i++; continue; }
      out += c;
      i++;
    }
    return out;
  }

  var PUNCT = /[\s　。、．，,.!！?？・「」『』（）()〜~"'“”‘’…:：;；]/g;
  function strip(s) { return String(s || '').replace(PUNCT, ''); }

  var VOWEL = {};
  'あかさたなはまやらわがざだばぱぁゃ'.split('').forEach(function (k) { VOWEL[k] = 'あ'; });
  'いきしちにひみりぎじぢびぴぃ'.split('').forEach(function (k) { VOWEL[k] = 'い'; });
  'うくすつぬふむゆるぐずづぶぷぅゅゔ'.split('').forEach(function (k) { VOWEL[k] = 'う'; });
  'えけせてねへめれげぜでべぺぇ'.split('').forEach(function (k) { VOWEL[k] = 'え'; });
  'おこそとのほもよろをごぞどぼぽぉょ'.split('').forEach(function (k) { VOWEL[k] = 'お'; });

  /** Long vowels in one canonical form: ー expands, おう→おお, えい→ええ (romaji answers only). */
  function longVowels(h) {
    var out = '';
    for (var i = 0; i < h.length; i++) {
      var ch = h[i], prev = out[out.length - 1];
      if (ch === 'ー' && prev && VOWEL[prev]) ch = VOWEL[prev];
      if (prev && ((ch === 'う' && VOWEL[prev] === 'お') || (ch === 'い' && VOWEL[prev] === 'え'))) ch = VOWEL[prev];
      out += ch;
    }
    return out;
  }

  /** The way a kana sentence sounds: phrase-final は / へ / を read wa / e / o. */
  function spoken(kana) {
    return String(kana || '').split(/([\s　。、！？!?]+)/).map(function (chunk) {
      return chunk.replace(/は$/, 'わ').replace(/へ$/, 'え').replace(/を$/, 'お');
    }).join('');
  }

  var KANJI = /[㐀-鿿]/;
  var LATIN = /[a-zA-Zāīūēō]/;

  /**
   * Exact check of a Japanese answer.
   * answers: strings as written in the course (kanji + kana); readings: map text → kana reading.
   */
  function check(input, answers, readings) {
    // "Tanaka-san": a hyphen before a name suffix is not the long-vowel mark ー.
    var raw = String(input || '').trim().replace(/-(?=(san|sama|kun|chan|sensei)\b)/gi, '');
    if (!raw) return { ok: false, exact: false };
    var latin = LATIN.test(raw) && !KANJI.test(raw);
    // Romaji is converted before spaces are removed: "hon o" is ほん お, not ほの.
    var got = latin ? longVowels(kataToHira(strip(romajiToHira(raw)))) : kataToHira(strip(raw));
    for (var i = 0; i < answers.length; i++) {
      var ans = answers[i];
      var reading = (readings && readings[ans]) || ans;
      if (latin) {
        var forms = [reading, spoken(reading)].map(function (r) { return longVowels(kataToHira(strip(r))); });
        if (forms.indexOf(got) >= 0) return { ok: true, exact: true };
      } else if (got === kataToHira(strip(ans)) || got === kataToHira(strip(reading))) {
        return { ok: true, exact: true };
      }
    }
    return { ok: false, exact: false };
  }

  /** Normalized form for comparing/deduplicating texts (hiragana, no spaces or punctuation). */
  function normalize(text) { return kataToHira(strip(text)); }

  L.ja = {
    romajiToHira: romajiToHira,
    kataToHira: kataToHira,
    hiraToKata: hiraToKata,
    spoken: spoken,
    normalize: normalize,
    check: check,
    hasKanji: function (s) { return KANJI.test(s); },
  };
})(window.LEA);
