/* Text-to-speech (listening) and speech recognition (speaking) via the Web Speech API. */
(function (L) {
  var synth = window.speechSynthesis;
  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var voices = [];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices() || [];
  }
  if (synth) {
    loadVoices();
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', loadVoices);
    else synth.onvoiceschanged = loadVoices;
  }

  function voicesFor(lang) {
    var prefix = lang.split('-')[0].toLowerCase();
    return voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(prefix) === 0; });
  }

  function pickVoice(lang) {
    var preferred = L.store.settings().voice;
    var list = voicesFor(lang);
    if (preferred) {
      var found = list.find(function (v) { return v.name === preferred; });
      if (found) return found;
    }
    var exact = list.filter(function (v) { return v.lang.toLowerCase() === lang.toLowerCase(); });
    var pool = exact.length ? exact : list;
    // Prefer natural/online voices when the browser offers them.
    return pool.find(function (v) { return /natural|google|online/i.test(v.name); }) || pool[0] || null;
  }

  L.speech = {
    ttsSupported: !!synth,
    sttSupported: !!Recognition,

    voicesFor: function (lang) { loadVoices(); return voicesFor(lang); },

    /** Speak text in the learned language. opts: {slow:boolean} */
    speak: function (text, opts) {
      opts = opts || {};
      if (!synth) return Promise.resolve();
      var course = L.getCourse(L.store.settings().lang);
      var lang = course.speechLang;
      synth.cancel();
      return new Promise(function (resolve) {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        var v = pickVoice(lang);
        if (v) u.voice = v;
        var rate = L.store.settings().rate || 0.85;
        u.rate = opts.slow ? Math.max(0.5, rate * 0.65) : rate;
        u.onend = resolve;
        u.onerror = resolve;
        synth.speak(u);
      });
    },

    /** Listen once; resolves to an array of transcript alternatives. */
    listen: function () {
      var course = L.getCourse(L.store.settings().lang);
      return new Promise(function (resolve, reject) {
        if (!Recognition) return reject(new Error('unsupported'));
        if (synth) synth.cancel();
        var rec = new Recognition();
        rec.lang = course.speechLang;
        rec.interimResults = false;
        rec.maxAlternatives = 5;
        var done = false;
        rec.onresult = function (e) {
          done = true;
          var alts = [];
          for (var i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
          resolve(alts);
        };
        rec.onerror = function (e) { if (!done) { done = true; reject(new Error(e.error || 'error')); } };
        rec.onend = function () { if (!done) { done = true; resolve([]); } };
        try { rec.start(); } catch (err) { reject(err); }
        L.speech._active = rec;
      });
    },

    /**
     * Listen continuously until stop() is called (free speaking).
     * onUpdate(text) receives the running transcript. Returns { promise, stop } or null.
     */
    listenLong: function (onUpdate) {
      if (!Recognition) return null;
      var course = L.getCourse(L.store.settings().lang);
      if (synth) synth.cancel();
      var rec = new Recognition();
      rec.lang = course.speechLang;
      rec.continuous = true;
      rec.interimResults = true;
      var finalText = '';
      var promise = new Promise(function (resolve, reject) {
        rec.onresult = function (e) {
          var interim = '';
          for (var i = e.resultIndex; i < e.results.length; i++) {
            var t = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalText += t + ' ';
            else interim += t;
          }
          if (onUpdate) onUpdate((finalText + interim).trim());
        };
        rec.onerror = function (e) { if (e.error !== 'no-speech' && e.error !== 'aborted') reject(new Error(e.error || 'error')); };
        rec.onend = function () { resolve(finalText.trim()); };
      });
      try { rec.start(); } catch (err) { return null; }
      L.speech._active = rec;
      return { promise: promise, stop: function () { try { rec.stop(); } catch (e) { /* ignore */ } } };
    },

    stopListening: function () {
      if (L.speech._active) { try { L.speech._active.stop(); } catch (e) { /* ignore */ } }
    },
  };
})(window.LEA);
