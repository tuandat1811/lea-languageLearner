/* Progress + settings persisted in localStorage. */
(function (L) {
  var KEY = 'lea.v1';
  var PASS = 0.6;

  function defaults() {
    return {
      settings: { lang: 'en', rate: 0.85, voice: '', theme: 'light', rain: false, unlockAll: false, pace: 'standard' },
      xp: 0,
      streak: { count: 0, last: '' },
      progress: {},
    };
  }

  var state;
  try {
    state = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}'));
    state.settings = Object.assign(defaults().settings, state.settings || {});
    // Migrate settings from the old Christmas theme.
    delete state.settings.snow;
    if (state.settings.pace === 'christmas') state.settings.pace = 'intensive';
  } catch (e) {
    state = defaults();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full / blocked */ }
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function langProgress(code) {
    code = code || state.settings.lang;
    if (!state.progress[code]) state.progress[code] = { lessons: {}, srs: {} };
    return state.progress[code];
  }

  function lessonProgress(lessonId, code) {
    var p = langProgress(code);
    if (!p.lessons[lessonId]) p.lessons[lessonId] = { learned: false, skills: {} };
    return p.lessons[lessonId];
  }

  L.store = {
    PASS: PASS,
    get state() { return state; },
    settings: function () { return state.settings; },
    setSetting: function (k, v) { state.settings[k] = v; save(); },
    lesson: lessonProgress,
    markLearned: function (lessonId) { lessonProgress(lessonId).learned = true; save(); },

    /** Lecture pages (bài giảng) viewed per skill. */
    markLecture: function (lessonId, skillId) {
      var lp = lessonProgress(lessonId);
      lp.lectures = lp.lectures || {};
      lp.lectures[skillId] = true;
      save();
    },
    lectureSeen: function (lessonId, skillId) {
      var lp = this.peekLesson(lessonId);
      return !!(lp.lectures && lp.lectures[skillId]);
    },

    addXp: function (n) { state.xp += n; this.touchStreak(); save(); },

    /** Free writing / speaking drafts. */
    saveDraft: function (lessonId, kind, text) {
      var lp = lessonProgress(lessonId);
      lp.drafts = lp.drafts || {};
      lp.drafts[kind] = text;
      save();
    },
    getDraft: function (lessonId, kind) {
      var lp = this.peekLesson(lessonId);
      return (lp.drafts && lp.drafts[kind]) || '';
    },

    /** Read-only view of a lesson's progress (does not create an entry). */
    peekLesson: function (lessonId) {
      return langProgress().lessons[lessonId] || { learned: false, skills: {} };
    },

    skillResult: function (lessonId, skillId) {
      return this.peekLesson(lessonId).skills[skillId] || null;
    },

    /** Record a practice result; returns {stars, xp, firstPass}. */
    recordSkill: function (lessonId, skillId, correct, total) {
      var score = total ? correct / total : 0;
      var stars = score >= 0.9 ? 3 : score >= 0.75 ? 2 : score >= PASS ? 1 : 0;
      var lp = lessonProgress(lessonId);
      var prev = lp.skills[skillId];
      var firstPass = stars > 0 && (!prev || !prev.stars);
      if (!prev || score > prev.best) lp.skills[skillId] = { best: score, stars: stars };
      var xp = correct * 10;
      state.xp += xp;
      this.touchStreak();
      save();
      return { stars: stars, xp: xp, score: score, firstPass: firstPass };
    },

    isSkillPassed: function (lessonId, skillId) {
      var r = this.skillResult(lessonId, skillId);
      return !!(r && r.stars > 0);
    },

    isLessonComplete: function (lesson) {
      var self = this;
      return L.SKILLS.every(function (s) { return self.isSkillPassed(lesson.id, s.id); });
    },

    lessonStars: function (lesson) {
      var self = this;
      return L.SKILLS.reduce(function (sum, s) {
        var r = self.skillResult(lesson.id, s.id);
        return sum + (r ? r.stars : 0);
      }, 0);
    },

    isLessonUnlocked: function (course, lesson) {
      if (state.settings.unlockAll || lesson.order === 0) return true;
      return this.isLessonComplete(course.lessonList[lesson.order - 1]);
    },

    nextLesson: function (course) {
      for (var i = 0; i < course.lessonList.length; i++) {
        if (!this.isLessonComplete(course.lessonList[i])) return course.lessonList[i];
      }
      return null;
    },

    touchStreak: function () {
      var t = today();
      if (state.streak.last === t) return;
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yStr = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
      state.streak.count = state.streak.last === yStr ? state.streak.count + 1 : 1;
      state.streak.last = t;
    },

    currentStreak: function () {
      var t = today();
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yStr = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
      return (state.streak.last === t || state.streak.last === yStr) ? state.streak.count : 0;
    },

    // --- Spaced repetition (Leitner boxes) for the review page ---
    srsIntervals: [0, 1, 2, 4, 7, 15],
    srsItem: function (word) {
      var p = langProgress();
      return p.srs[word] || { box: 0, due: '' };
    },
    srsAnswer: function (word, remembered) {
      var p = langProgress();
      var item = p.srs[word] || { box: 0, due: '' };
      item.box = remembered ? Math.min(item.box + 1, 5) : 1;
      var d = new Date();
      d.setDate(d.getDate() + this.srsIntervals[item.box]);
      item.due = d.toISOString().slice(0, 10);
      p.srs[word] = item;
      if (remembered) state.xp += 2;
      this.touchStreak();
      save();
    },

    reset: function () {
      var keep = state.settings;
      state = defaults();
      state.settings = keep;
      save();
    },
    save: save,
  };
})(window.LEA);
