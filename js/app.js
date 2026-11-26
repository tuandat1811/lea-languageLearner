/* Lea – main app: hash router + views. */
(function (L) {
  var app = document.getElementById('app');
  var store = L.store;
  var keyHandler = null;

  // ---------- small helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function course() { return L.getCourse(store.settings().lang); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function speakBtn(text, opts) {
    opts = opts || {};
    return '<button class="speak-btn' + (opts.big ? ' big' : '') + '" data-speak="' + esc(text) + '" title="Nghe" aria-label="Nghe: ' + esc(text) + '">🔊</button>' +
      (opts.slow ? '<button class="speak-btn slow' + (opts.big ? ' big' : '') + '" data-speak="' + esc(text) + '" data-slow="1" title="Nghe chậm" aria-label="Nghe chậm">🐢</button>' : '');
  }
  function starsHtml(n, max) {
    max = max || 3;
    var s = '';
    for (var i = 0; i < max; i++) s += '<span class="star' + (i < n ? ' on' : '') + '">★</span>';
    return '<span class="stars">' + s + '</span>';
  }
  function multiline(text) { return esc(text).replace(/\n/g, '<br>'); }
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function daysToChristmas() {
    var now = new Date();
    var y = now.getFullYear();
    var start = new Date(y, now.getMonth(), now.getDate());
    var xmas = new Date(y, 11, 25);
    if (start > xmas) xmas = new Date(y + 1, 11, 25);
    return Math.round((xmas - start) / 86400000);
  }
  function celebrate() {
    var box = document.createElement('div');
    box.className = 'confetti';
    var items = ['❄️', '⭐', '🎁', '🎄', '✨', '🔔'];
    for (var i = 0; i < 36; i++) {
      var s = document.createElement('span');
      s.textContent = items[i % items.length];
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 0.6 + 's';
      s.style.fontSize = 14 + Math.random() * 18 + 'px';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3200);
  }

  // Global click-to-speak.
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-speak]');
    if (!b) return;
    e.preventDefault();
    b.classList.add('playing');
    L.speech.speak(b.getAttribute('data-speak'), { slow: !!b.getAttribute('data-slow') })
      .then(function () { b.classList.remove('playing'); });
  });
  document.addEventListener('keydown', function (e) { if (keyHandler) keyHandler(e); });

  function renderStats() {
    $('#stats').innerHTML =
      '<span class="chip" title="Sao kinh nghiệm">⭐ ' + store.state.xp + '</span>' +
      '<span class="chip" title="Chuỗi ngày học liên tiếp">🔥 ' + store.currentStreak() + '</span>';
  }

  function fmtDate(d) { return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(); }

  /** Study-plan estimate for the lessons currently available. */
  /** Syllabus level index (0-based) for each unit id. */
  function levelOfUnit(c) {
    var map = {};
    (c.syllabus || []).forEach(function (lv, li) {
      lv.units.forEach(function (it) { if (it.unit) map[it.unit] = li; });
    });
    return map;
  }

  function planInfo(c) {
    var pace = L.PACES.find(function (p) { return p.id === store.settings().pace; }) || L.PACES[1];
    var levels = c.syllabus || [];
    var levelMap = levelOfUnit(c);
    // Current level = first level that still has unfinished lessons.
    var pending = c.lessonList.filter(function (l) { return !store.isLessonComplete(l); });
    var levelIdx = pending.length ? (levelMap[pending[0].unitId] || 0) : Math.max(0, levels.length - 1);
    var levelName = levels[levelIdx] ? 'Cấp ' + (levelIdx + 1) : 'khoá học';
    var remaining = pending.filter(function (l) { return (levelMap[l.unitId] || 0) === levelIdx; }).length;
    var days = Math.ceil(remaining / pace.perWeek * 7);
    var finish = new Date();
    finish.setDate(finish.getDate() + days);
    var xmas = new Date(finish.getFullYear(), 11, 25);
    var now = new Date();
    var beforeXmas = finish < new Date(now.getFullYear(), 11, 25) && now < new Date(now.getFullYear(), 11, 25);
    return { pace: pace, remaining: remaining, days: days, finish: finish, beforeXmas: beforeXmas, xmas: xmas, levelName: levelName };
  }

  function dueReviewCount(c) {
    var today = new Date().toISOString().slice(0, 10);
    var n = 0;
    c.lessonList.forEach(function (l) {
      var lp = store.peekLesson(l.id);
      if (!lp.learned && !Object.keys(lp.skills).length) return;
      l.vocab.forEach(function (w) { var it = store.srsItem(w.en); if (!it.due || it.due <= today) n++; });
    });
    return n;
  }

  function unitProgress(c, unit) {
    var done = unit.lessons.filter(function (l) { return store.isLessonComplete(l); }).length;
    return { done: done, total: unit.lessons.length, complete: done === unit.lessons.length };
  }

  // =====================================================================
  // HOME
  // =====================================================================
  function viewHome() {
    var c = course();
    var next = store.nextLesson(c);
    var started = Object.keys((store.state.progress[c.code] || { lessons: {} }).lessons).length > 0;
    var doneCount = c.lessonList.filter(function (l) { return store.isLessonComplete(l); }).length;
    var d = daysToChristmas();
    var countdown = d === 0 ? '🎄 Hôm nay là Giáng sinh – Merry Christmas!' :
      d === 1 ? '🎅 Ngày mai là Giáng sinh rồi!' : '🎁 Còn <b>' + d + '</b> ngày nữa là Giáng sinh';

    var langs = L.languageOrder.map(function (code) {
      var lc = L.languages[code];
      var active = code === c.code;
      return '<button class="lang-card' + (active ? ' active' : '') + '" data-lang="' + code + '">' +
        '<span class="flag">' + lc.flag + '</span><span class="lang-name">' + esc(lc.name) + '</span>' +
        '<span class="lang-meta">' + esc(lc.level) + ' · ' + lc.lessonList.length + ' bài</span>' +
        (active ? '<span class="badge">Đang học</span>' : '') + '</button>';
    }).join('') + L.upcoming.map(function (u) {
      return '<div class="lang-card soon" aria-disabled="true"><span class="flag">' + u.flag + '</span>' +
        '<span class="lang-name">' + esc(u.name) + '</span><span class="lang-meta">Sắp ra mắt</span></div>';
    }).join('');

    var skills = L.SKILLS.map(function (s) {
      return '<div class="skill-intro"><span class="skill-icon">' + s.icon + '</span><h3>' + s.name + '</h3><p>' + esc(s.desc) + '</p></div>';
    }).join('');

    var roadmap = c.units.map(function (u, i) {
      var p = unitProgress(c, u);
      return '<li class="road-item' + (p.complete ? ' done' : '') + '">' +
        '<span class="road-dot">' + (p.complete ? '🎁' : u.icon) + '</span>' +
        '<div><div class="road-title">Chặng ' + (i + 1) + ': ' + esc(u.title) + ' <span class="muted">· ' + esc(u.titleEn) + '</span></div>' +
        '<div class="road-goal">' + esc(u.goal) + '</div></div>' +
        '<span class="road-count">' + p.done + '/' + p.total + '</span></li>';
    }).join('');

    app.innerHTML =
      '<section class="hero">' +
        '<div class="hero-text">' +
          '<p class="countdown">' + countdown + '</p>' +
          '<h1>Học ' + esc(c.name) + ' <span class="accent">từ con số 0</span></h1>' +
          '<p class="lead">' + esc(c.description) + '</p>' +
          '<div class="hero-actions">' +
            (next ? '<a class="btn btn-red btn-lg" href="#/lesson/' + next.id + '">' + (started ? '▶ Học tiếp: ' + esc(next.title) : '🎄 Bắt đầu học ngay') + '</a>'
                  : '<a class="btn btn-gold btn-lg" href="#/review">🏆 Bạn đã học xong! Ôn tập</a>') +
            '<a class="btn btn-ghost btn-lg" href="#/course">Xem lộ trình</a>' +
          '</div>' +
          '<div class="hero-stats">' +
            '<div><b>' + doneCount + '/' + c.lessonList.length + '</b><span>bài hoàn thành</span></div>' +
            '<div><b>' + store.state.xp + '</b><span>sao kinh nghiệm</span></div>' +
            '<div><b>' + store.currentStreak() + '</b><span>ngày liên tiếp</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="hero-art" aria-hidden="true">' + treeSvg() + '</div>' +
      '</section>' +

      planStrip(c, next) +

      '<section class="panel"><h2>🌍 Chọn ngôn ngữ</h2><div class="lang-grid">' + langs + '</div></section>' +

      '<section class="panel"><h2>🎯 Học đủ 4 kỹ năng trong mỗi bài</h2>' +
        '<p class="muted">Mỗi bài học bắt đầu bằng <b>từ vựng</b> và <b>ngữ pháp</b>, sau đó bạn luyện lần lượt 4 kỹ năng. Đạt từ 60% mỗi kỹ năng để mở khoá bài tiếp theo.</p>' +
        '<div class="skill-grid">' + skills + '</div></section>' +

      '<section class="panel"><h2>🗺️ Lộ trình ' + esc(c.level) + '</h2><ol class="roadmap">' + roadmap + '</ol>' +
        '<p class="center"><a class="btn btn-green" href="#/course">Mở bản đồ bài học</a> <a class="btn btn-ghost-dark" href="#/syllabus">Giáo trình đầy đủ A0 → B2</a></p></section>';

    $$('.lang-card[data-lang]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        store.setSetting('lang', b.getAttribute('data-lang'));
        route();
      });
    });
  }

  function planStrip(c, next) {
    var p = planInfo(c);
    var review = dueReviewCount(c);
    var todo;
    if (next) {
      var skill = L.SKILLS.find(function (s) { return !store.isSkillPassed(next.id, s.id); });
      var learned = store.peekLesson(next.id).learned;
      todo = '<a href="#/lesson/' + next.id + '"><b>' + esc(next.title) + '</b></a> · ' +
        (!learned ? 'học từ vựng & ngữ pháp' : skill ? 'luyện ' + skill.icon + ' ' + skill.name : 'hoàn thành bài');
    } else {
      todo = 'Bạn đã học hết các bài hiện có – hãy ôn tập!';
    }
    var finishTxt = p.remaining
      ? 'Còn ' + p.remaining + ' bài · dự kiến xong ' + p.levelName + ' ngày <b>' + fmtDate(p.finish) + '</b>' + (p.beforeXmas ? ' – kịp trước Giáng sinh 🎄' : '')
      : 'Đã học xong các bài hiện có 🎉';
    return '<section class="plan-strip">' +
      '<div class="plan-item"><span class="plan-label">📌 Hôm nay</span><span>' + todo + '</span></div>' +
      '<div class="plan-item"><span class="plan-label">🔁 Ôn tập</span><span>' + (review ? '<a href="#/review">' + review + ' từ cần ôn</a>' : 'Không có từ cần ôn') + '</span></div>' +
      '<div class="plan-item"><span class="plan-label">' + p.pace.icon + ' ' + esc(p.pace.name) + '</span><span>' + finishTxt + ' · <a href="#/syllabus">đổi kế hoạch</a></span></div>' +
      '</section>';
  }

  // =====================================================================
  // SYLLABUS + STUDY PLAN
  // =====================================================================
  function viewSyllabus() {
    var c = course();
    var levels = c.syllabus || [];
    var totalUnits = levels.reduce(function (n, lv) { return n + lv.units.length; }, 0);
    var unitById = {};
    c.units.forEach(function (u) { unitById[u.id] = u; });

    var unitNo = 0;
    var levelHtml = levels.map(function (lv, li) {
      var available = lv.status === 'available';
      var done = 0, total = 0;
      var rows = lv.units.map(function (it) {
        unitNo++;
        var u = it.unit && unitById[it.unit];
        var status, title;
        if (u) {
          var p = unitProgress(c, u);
          done += p.done; total += p.total;
          title = '<a href="#/lesson/' + u.lessons[0].id + '">' + u.icon + ' ' + esc(u.title) + '</a>';
          status = p.complete ? '<span class="tag ok">🎁 Xong</span>' : '<span class="tag">' + p.done + '/' + p.total + ' bài</span>';
        } else {
          title = esc(it.title);
          status = '<span class="tag soon">Sắp có</span>';
        }
        return '<tr><td class="num">' + unitNo + '</td><td>' + title + '</td><td>' + esc(it.grammar) + '</td><td>' + status + '</td></tr>';
      }).join('');
      var badge = available ? '<span class="tag ok">Đang mở</span>' : '<span class="tag soon">Đang biên soạn</span>';
      var progress = available && total ? '<div class="level-progress"><span style="width:' + Math.round(done / total * 100) + '%"></span></div><p class="muted small">' + done + '/' + total + ' bài hoàn thành</p>' : '';
      return '<section class="level-card' + (available ? '' : ' planned') + '">' +
        '<div class="level-head"><div class="level-icon">' + lv.icon + '</div><div>' +
          '<div class="unit-label">Cấp ' + (li + 1) + ' · ' + esc(lv.cefr) + '</div>' +
          '<h2>' + esc(lv.name) + ' ' + badge + '</h2>' +
          '<p>🎯 ' + esc(lv.outcome) + '</p></div></div>' + progress +
        '<details' + (available ? ' open' : '') + '><summary>' + lv.units.length + ' chặng · ' + lv.units.length * 2 + ' bài – xem chi tiết</summary>' +
          '<div class="table-wrap"><table class="syllabus-table"><thead><tr><th>#</th><th>Chủ đề</th><th>Ngữ pháp trọng tâm</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '</details></section>';
    }).join('');

    var p = planInfo(c);
    var paces = L.PACES.map(function (pc) {
      var perLevel = levels.length ? levels[0].units.length * 2 : c.lessonList.length;
      var weeks = Math.ceil(perLevel / pc.perWeek);
      return '<button class="pace-card' + (pc.id === p.pace.id ? ' active' : '') + '" data-pace="' + pc.id + '">' +
        '<span class="pace-icon">' + pc.icon + '</span><b>' + esc(pc.name) + '</b>' +
        '<span class="muted">' + pc.perWeek + ' bài/tuần · ~' + weeks + ' tuần/cấp</span>' +
        '<span class="small">' + esc(pc.desc) + '</span></button>';
    }).join('');
    var week = p.pace.week.map(function (d) {
      return '<div class="day"><b>' + d[0] + '</b><span>' + esc(d[1]) + '</span></div>';
    }).join('');

    app.innerHTML =
      '<div class="page-head"><h1>📚 Giáo trình ' + esc(c.name) + ' A0 → B2</h1>' +
      '<p class="muted">' + levels.length + ' cấp độ · ' + totalUnits + ' chặng · ' + totalUnits * 2 + ' bài. Ngữ pháp được sắp xếp từ cơ bản đến nâng cao; mỗi bài luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết.</p></div>' +

      '<section class="panel"><h2>🗓️ Kế hoạch học tập</h2>' +
        '<p class="muted">Chọn nhịp độ phù hợp với bạn. Kế hoạch được dùng để gợi ý việc cần làm mỗi ngày ở trang chủ.</p>' +
        '<div class="pace-grid">' + paces + '</div>' +
        '<h3>Một tuần mẫu – ' + esc(p.pace.name) + '</h3><div class="week">' + week + '</div>' +
        '<p class="estimate">' + (p.remaining
          ? 'Còn <b>' + p.remaining + '</b> bài ở ' + p.levelName + ' → dự kiến hoàn thành ngày <b>' + fmtDate(p.finish) + '</b>' + (p.beforeXmas ? ' – kịp trước Giáng sinh 🎄' : '') + '.'
          : 'Bạn đã học xong các bài hiện có! 🎉') + '</p>' +
        '<h3>Một buổi học chuẩn</h3><ol class="steps">' +
          '<li><b>Khởi động 5 phút:</b> vào trang <a href="#/review">Ôn tập</a> để ôn từ cũ.</li>' +
          '<li><b>Học mới 10 phút:</b> Từ vựng → Ngữ pháp → Câu mẫu. Đọc to theo từng câu.</li>' +
          '<li><b>Luyện 4 kỹ năng 15–20 phút:</b> Nghe → Nói → Đọc → Viết (mỗi kỹ năng ~5 phút).</li>' +
          '<li><b>Tổng kết:</b> kỹ năng nào dưới 2 sao thì luyện lại vào buổi sau.</li>' +
        '</ol>' +
        '<h3>Quy tắc vàng</h3><ul class="steps">' +
          '<li>Học đều mỗi ngày – 15 phút mỗi ngày hiệu quả hơn 2 tiếng mỗi tuần.</li>' +
          '<li>Cuối mỗi chặng (2 bài): ôn lại toàn bộ từ vựng của chặng trước khi sang chặng mới.</li>' +
          '<li>Cuối mỗi cấp: luyện lại các kỹ năng còn 1 sao rồi mới lên cấp tiếp theo.</li>' +
          '<li>Không hiểu ngữ pháp? Đọc lại phần Ngữ pháp và các câu ví dụ, sau đó làm lại phần Viết.</li>' +
        '</ul></section>' +

      '<div class="levels">' + levelHtml + '</div>';

    $$('.pace-card', app).forEach(function (b) {
      b.addEventListener('click', function () {
        store.setSetting('pace', b.getAttribute('data-pace'));
        viewSyllabus();
        toast('Đã chọn kế hoạch: ' + b.querySelector('b').textContent);
      });
    });
  }

  function treeSvg() {
    return '<svg viewBox="0 0 220 260" class="tree-svg">' +
      '<polygon points="110,10 116,28 135,28 120,39 126,57 110,46 94,57 100,39 85,28 104,28" fill="#f4c04f" class="tree-star"/>' +
      '<polygon points="110,40 170,120 50,120" fill="#1e7a4c"/>' +
      '<polygon points="110,80 185,175 35,175" fill="#19693f"/>' +
      '<polygon points="110,125 200,230 20,230" fill="#145536"/>' +
      '<rect x="96" y="230" width="28" height="24" rx="3" fill="#7a4a2b"/>' +
      '<circle cx="95" cy="105" r="7" fill="#c62f3e" class="bauble b1"/>' +
      '<circle cx="130" cy="150" r="8" fill="#f4c04f" class="bauble b2"/>' +
      '<circle cx="80" cy="160" r="7" fill="#3a8dde" class="bauble b3"/>' +
      '<circle cx="120" cy="200" r="9" fill="#c62f3e" class="bauble b1"/>' +
      '<circle cx="70" cy="212" r="7" fill="#f4c04f" class="bauble b2"/>' +
      '<circle cx="160" cy="210" r="7" fill="#fff" class="bauble b3"/>' +
      '<path d="M70,120 Q110,140 150,118 M55,170 Q110,195 168,168" stroke="#f7e3a1" stroke-width="3" fill="none" stroke-dasharray="2 6" stroke-linecap="round"/>' +
      '</svg>';
  }

  // =====================================================================
  // COURSE MAP
  // =====================================================================
  function viewCourse() {
    var c = course();
    var next = store.nextLesson(c);
    var html = '<div class="page-head"><h1>🗺️ Lộ trình ' + esc(c.name) + '</h1>' +
      '<p class="muted">' + esc(c.tagline) + ' · ' + c.units.length + ' chặng · ' + c.lessonList.length + ' bài học</p></div>';

    var levelMap = levelOfUnit(c);
    var shownLevel = -1;
    c.units.forEach(function (u, ui) {
      var li = levelMap[u.id];
      var lv = c.syllabus && c.syllabus[li];
      if (lv && li !== shownLevel) {
        shownLevel = li;
        html += '<div class="level-banner"><span class="level-icon">' + lv.icon + '</span><div>' +
          '<div class="unit-label">Cấp ' + (li + 1) + ' · ' + esc(lv.cefr) + '</div>' +
          '<h2>' + esc(lv.name) + '</h2><p>' + esc(lv.outcome) + '</p></div></div>';
      }
      var p = unitProgress(c, u);
      html += '<section class="unit' + (p.complete ? ' complete' : '') + '">' +
        '<div class="unit-head"><div class="unit-badge">' + u.icon + '</div><div>' +
        '<div class="unit-label">Chặng ' + (ui + 1) + '</div>' +
        '<h2>' + esc(u.title) + ' <span class="muted">· ' + esc(u.titleEn) + '</span></h2>' +
        '<p class="muted">' + esc(u.goal) + '</p></div>' +
        '<div class="unit-gift" title="' + (p.complete ? 'Đã mở quà!' : 'Hoàn thành chặng để mở quà') + '">' + (p.complete ? '🎁' : '🎀') + '</div></div>' +
        '<div class="lesson-path">';
      u.lessons.forEach(function (l) {
        var unlocked = store.isLessonUnlocked(c, l);
        var done = store.isLessonComplete(l);
        var current = next && next.id === l.id;
        var stars = store.lessonStars(l);
        var cls = 'ornament' + (done ? ' done' : '') + (current ? ' current' : '') + (!unlocked ? ' locked' : '');
        var inner = '<span class="ornament-ball"><span class="ornament-cap"></span>' + (unlocked ? l.icon : '🔒') + '</span>' +
          '<span class="ornament-title">' + esc(l.title) + '</span>' +
          '<span class="ornament-sub">' + esc(l.titleEn) + '</span>' +
          '<span class="ornament-stars">' + (done ? '★ ' + stars + '/12' : unlocked ? skillDots(l) : 'Chưa mở') + '</span>';
        html += unlocked ? '<a class="' + cls + '" href="#/lesson/' + l.id + '">' + inner + '</a>' : '<div class="' + cls + '">' + inner + '</div>';
      });
      html += '</div></section>';
    });
    app.innerHTML = html;
  }

  function skillDots(lesson) {
    return L.SKILLS.map(function (s) {
      return '<i class="dot' + (store.isSkillPassed(lesson.id, s.id) ? ' on' : '') + '" title="' + s.name + '"></i>';
    }).join('');
  }

  // =====================================================================
  // LESSON
  // =====================================================================
  function viewLesson(id) {
    var c = course();
    var lesson = c.lessonById[id];
    if (!lesson) return viewNotFound();
    if (!store.isLessonUnlocked(c, lesson)) { toast('Hãy hoàn thành bài trước để mở khoá bài này 🔒'); location.hash = '#/course'; return; }
    var unit = c.units[lesson.unitIndex];
    store.markLearned(lesson.id);

    var vocab = lesson.vocab.map(function (v) {
      return '<div class="vocab-card">' +
        '<div class="vocab-emoji">' + (v.emoji || '✨') + '</div>' +
        '<div class="vocab-en">' + esc(v.en) + '</div>' +
        '<div class="vocab-ipa">' + esc(v.ipa || '') + '</div>' +
        '<div class="vocab-vi">' + esc(v.vi) + '</div>' +
        '<div class="vocab-actions">' + speakBtn(v.en, { slow: true }) + '</div></div>';
    }).join('');

    var g = lesson.grammar;
    var grammar = '<ul class="grammar-points">' + g.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
      '<div class="examples">' + g.examples.map(function (ex) {
        return '<div class="example">' + speakBtn(ex.en) + '<div><div class="ex-en">' + esc(ex.en) + '</div><div class="ex-vi">' + esc(ex.vi) + '</div></div></div>';
      }).join('') + '</div>';

    var sentences = lesson.sentences.map(function (s) {
      return '<div class="example">' + speakBtn(s.en, { slow: true }) + '<div><div class="ex-en">' + esc(s.en) + '</div><div class="ex-vi">' + esc(s.vi) + '</div></div></div>';
    }).join('');

    var skills = L.SKILLS.map(function (s, i) {
      var r = store.skillResult(lesson.id, s.id);
      var passed = r && r.stars > 0;
      return '<a class="skill-card' + (passed ? ' passed' : '') + '" href="#/practice/' + lesson.id + '/' + s.id + '">' +
        '<span class="skill-step">' + (i + 1) + '</span>' +
        '<span class="skill-icon">' + s.icon + '</span>' +
        '<span class="skill-name">' + s.name + '</span>' +
        '<span class="skill-desc">' + esc(s.desc) + '</span>' +
        (r ? starsHtml(r.stars) + '<span class="skill-score">Cao nhất: ' + Math.round(r.best * 100) + '%</span>' : '<span class="skill-score">Chưa luyện</span>') +
        '<span class="btn btn-small ' + (passed ? 'btn-ghost-dark' : 'btn-red') + '">' + (passed ? 'Luyện lại' : 'Bắt đầu') + '</span></a>';
    }).join('');

    var prev = c.lessonList[lesson.order - 1];
    var nxt = c.lessonList[lesson.order + 1];

    app.innerHTML =
      '<div class="breadcrumb"><a href="#/course">Lộ trình</a> › Chặng ' + (unit.index + 1) + ': ' + esc(unit.title) + '</div>' +
      '<div class="lesson-hero"><div class="lesson-icon">' + lesson.icon + '</div><div>' +
        '<div class="unit-label">Bài ' + (lesson.order + 1) + ' / ' + c.lessonList.length + '</div>' +
        '<h1>' + esc(lesson.title) + ' <span class="muted">· ' + esc(lesson.titleEn) + '</span></h1>' +
        '<p>🎯 ' + esc(lesson.goal) + '</p></div></div>' +

      '<nav class="tabs" role="tablist">' +
        '<button class="tab active" data-tab="vocab">📚 Từ vựng</button>' +
        '<button class="tab" data-tab="grammar">📐 Ngữ pháp</button>' +
        '<button class="tab" data-tab="sentences">💬 Câu mẫu</button>' +
        '<button class="tab" data-tab="practice">🏋️ Luyện tập</button>' +
      '</nav>' +

      '<section class="tab-panel panel" data-panel="vocab"><h2>📚 Từ vựng (' + lesson.vocab.length + ' từ)</h2>' +
        '<p class="muted">Bấm 🔊 để nghe, 🐢 để nghe chậm. Hãy đọc to theo từng từ!</p>' +
        '<div class="vocab-grid">' + vocab + '</div>' +
        '<p class="center"><button class="btn btn-green" data-goto="grammar">Tiếp: Ngữ pháp →</button></p></section>' +

      '<section class="tab-panel panel" data-panel="grammar" hidden><h2>📐 ' + esc(g.title) + '</h2>' + grammar +
        '<p class="center"><button class="btn btn-green" data-goto="sentences">Tiếp: Câu mẫu →</button></p></section>' +

      '<section class="tab-panel panel" data-panel="sentences" hidden><h2>💬 Câu mẫu</h2>' +
        '<p class="muted">Nghe và nhắc lại từng câu. Các câu này sẽ xuất hiện trong phần luyện tập.</p>' +
        '<div class="examples">' + sentences + '</div>' +
        '<p class="center"><button class="btn btn-red" data-goto="practice">Bắt đầu luyện 4 kỹ năng →</button></p></section>' +

      '<section class="tab-panel panel" data-panel="practice" hidden><h2>🏋️ Luyện 4 kỹ năng</h2>' +
        '<p class="muted">Hoàn thành cả 4 kỹ năng (mỗi kỹ năng ≥ 60%) để mở khoá bài tiếp theo.</p>' +
        '<div class="skill-cards">' + skills + '</div></section>' +

      '<div class="lesson-nav">' +
        (prev ? '<a class="btn btn-ghost" href="#/lesson/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
        (nxt && store.isLessonUnlocked(c, nxt) ? '<a class="btn btn-ghost" href="#/lesson/' + nxt.id + '">' + esc(nxt.title) + ' →</a>' : '<span></span>') +
      '</div>';

    function openTab(name) {
      $$('.tab', app).forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-tab') === name); });
      $$('.tab-panel', app).forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== name; });
      sessionStorage.setItem('lea.tab.' + lesson.id, name);
    }
    $$('.tab', app).forEach(function (t) { t.addEventListener('click', function () { openTab(t.getAttribute('data-tab')); }); });
    $$('[data-goto]', app).forEach(function (b) {
      b.addEventListener('click', function () { openTab(b.getAttribute('data-goto')); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    });
    var saved = sessionStorage.getItem('lea.tab.' + lesson.id);
    if (saved) openTab(saved);
  }

  // =====================================================================
  // PRACTICE
  // =====================================================================
  var PRAISE = ['Chính xác! 🎉', 'Tuyệt vời! ⭐', 'Giỏi quá! 🎄', 'Đúng rồi! 🔔', 'Xuất sắc! 🎁'];
  var HINTS = {
    listen_choose: '🎧 Nghe và chọn nghĩa đúng',
    listen_pick: '🎧 Nghe và chọn câu bạn nghe được',
    dictation: '✍️ Nghe và viết lại',
    speak: '🎤 Đọc to từ / câu sau',
    speak_translate: '🎤 Nói câu này bằng tiếng Anh',
    match: '🧩 Nối từ tiếng Anh với nghĩa tiếng Việt',
    read_choose: '📖 Đọc câu và chọn nghĩa đúng',
    passage: '📖 Đọc đoạn văn và trả lời câu hỏi',
    translate: '✍️ Viết bằng tiếng Anh',
    order: '🧱 Sắp xếp các từ thành câu đúng',
    fill: '✍️ Điền từ còn thiếu',
  };

  function optionsHtml(opts) {
    return '<div class="options">' + opts.map(function (o, i) {
      return '<button class="option" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(o) + '</span></button>';
    }).join('') + '</div>';
  }

  /** Renderers: html(ex) + bind(root, ex, ctx). ctx: ready(bool), setCheck(fn), finish(ok, answerText, speakText) */
  var R = {};

  function bindOptions(root, ex, ctx, reveal) {
    var chosen = -1;
    $$('.option', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (ctx.locked()) return;
        chosen = +b.getAttribute('data-i');
        $$('.option', root).forEach(function (x) { x.classList.toggle('selected', x === b); });
        ctx.ready(true);
      });
    });
    ctx.onKey(function (e) {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= ex.options.length) { var b = $$('.option', root)[n - 1]; if (b) b.click(); }
    });
    ctx.setCheck(function () {
      var ok = chosen === ex.answer;
      $$('.option', root).forEach(function (x, i) {
        if (i === ex.answer) x.classList.add('correct');
        else if (i === chosen) x.classList.add('wrong');
      });
      return { ok: ok, answer: reveal || ex.options[ex.answer] };
    });
  }

  R.listen_choose = {
    html: function (ex) {
      return '<div class="listen-box">' + speakBtn(ex.audio, { big: true, slow: true }) + '</div>' + optionsHtml(ex.options);
    },
    bind: function (root, ex, ctx) {
      bindOptions(root, ex, ctx, ex.reveal);
      setTimeout(function () { L.speech.speak(ex.audio); }, 300);
    },
  };
  R.listen_pick = R.listen_choose;

  R.dictation = {
    html: function (ex) {
      return '<div class="listen-box">' + speakBtn(ex.audio, { big: true, slow: true }) + '</div>' +
        '<input class="answer-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ những gì bạn nghe được…" />';
    },
    bind: function (root, ex, ctx) {
      bindInput(root, ex, ctx, ex.answers, ex.audio + ' — ' + ex.vi);
      setTimeout(function () { L.speech.speak(ex.audio); }, 300);
    },
  };

  function bindInput(root, ex, ctx, answers, reveal) {
    var input = $('.answer-input', root);
    input.focus();
    input.addEventListener('input', function () { ctx.ready(input.value.trim().length > 0); });
    ctx.setCheck(function () {
      var r = L.exercises.checkText(input.value, answers, course());
      input.classList.add(r.ok ? 'correct' : 'wrong');
      input.disabled = true;
      var note = r.ok && !r.exact ? ' (gần đúng – chú ý chính tả)' : '';
      return { ok: r.ok, answer: (reveal || answers[0]) + note, speak: answers[0] };
    });
  }

  R.translate = {
    html: function (ex) {
      return '<div class="prompt-card"><span class="prompt-emoji">' + (ex.hint || '💬') + '</span><span class="prompt-vi">' + esc(ex.vi) + '</span></div>' +
        '<input class="answer-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Viết bằng tiếng Anh…" />';
    },
    bind: function (root, ex, ctx) { bindInput(root, ex, ctx, ex.answers); },
  };

  R.fill = {
    html: function (ex) {
      return '<div class="fill-sentence">' + esc(ex.before) +
        '<input class="answer-input inline" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" size="' + Math.max(4, ex.answer.length + 1) + '" />' +
        esc(ex.after) + '</div>' +
        '<p class="muted center">' + esc(ex.vi) + (ex.hint ? ' · Gợi ý: <b>' + esc(ex.hint) + '</b>' : '') + '</p>';
    },
    bind: function (root, ex, ctx) {
      bindInput(root, ex, ctx, [ex.answer], ex.before + ex.answer + ex.after);
    },
  };

  R.order = {
    html: function (ex) {
      return '<div class="prompt-card"><span class="prompt-emoji">💬</span><span class="prompt-vi">' + esc(ex.vi) + '</span></div>' +
        '<div class="order-line" aria-label="Câu của bạn"></div>' +
        '<div class="order-bank">' + ex.tiles.map(function (t, i) {
          return '<button class="tile" data-i="' + i + '">' + esc(t) + '</button>';
        }).join('') + '</div>';
    },
    bind: function (root, ex, ctx) {
      var line = $('.order-line', root), bank = $('.order-bank', root);
      function update() { ctx.ready(line.children.length > 0); }
      root.addEventListener('click', function (e) {
        var t = e.target.closest('.tile');
        if (!t || ctx.locked()) return;
        (t.parentNode === bank ? line : bank).appendChild(t);
        update();
      });
      ctx.setCheck(function () {
        var text = $$('.tile', line).map(function (t) { return t.textContent; }).join(' ');
        var r = L.exercises.checkText(text, [ex.answer].concat(ex.alts || []), course());
        line.classList.add(r.ok ? 'correct' : 'wrong');
        return { ok: r.ok, answer: ex.answer, speak: ex.answer };
      });
    },
  };

  R.read_choose = {
    html: function (ex) {
      return '<div class="read-sentence">' + speakBtn(ex.text) + '<span>' + esc(ex.text) + '</span></div>' + optionsHtml(ex.options);
    },
    bind: function (root, ex, ctx) { bindOptions(root, ex, ctx); },
  };

  R.passage = {
    html: function (ex) {
      return '<article class="passage"><div class="passage-head"><h3>' + esc(ex.reading.title) + '</h3><span class="speak-group">' + speakBtn(ex.reading.text, { slow: true }) + '</span></div>' +
        '<p class="passage-text">' + multiline(ex.reading.text) + '</p>' +
        '<details class="translation"><summary>Xem bản dịch</summary><p>' + multiline(ex.reading.vi) + '</p></details></article>' +
        '<p class="question">❓ ' + esc(ex.question) + '</p>' + optionsHtml(ex.options);
    },
    bind: function (root, ex, ctx) { bindOptions(root, ex, ctx); },
  };

  R.match = {
    html: function (ex) {
      var left = L.exercises.shuffle(ex.pairs), right = L.exercises.shuffle(ex.pairs);
      return '<div class="match">' +
        '<div class="match-col">' + left.map(function (p) { return '<button class="match-item" data-side="en" data-key="' + esc(p.en) + '">' + esc(p.en) + '</button>'; }).join('') + '</div>' +
        '<div class="match-col">' + right.map(function (p) { return '<button class="match-item" data-side="vi" data-key="' + esc(p.en) + '">' + esc(p.vi) + '</button>'; }).join('') + '</div>' +
        '</div>';
    },
    bind: function (root, ex, ctx) {
      ctx.hideCheck();
      var sel = { en: null, vi: null }, mistakes = 0, matched = 0;
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.match-item');
        if (!b || b.classList.contains('matched') || ctx.locked()) return;
        var side = b.getAttribute('data-side');
        if (side === 'en') L.speech.speak(b.getAttribute('data-key'));
        if (sel[side]) sel[side].classList.remove('selected');
        sel[side] = b; b.classList.add('selected');
        if (sel.en && sel.vi) {
          var a = sel.en, v = sel.vi;
          sel = { en: null, vi: null };
          if (a.getAttribute('data-key') === v.getAttribute('data-key')) {
            [a, v].forEach(function (x) { x.classList.remove('selected'); x.classList.add('matched'); });
            matched++;
            if (matched === ex.pairs.length) {
              ctx.finish(mistakes <= 1, mistakes ? 'Bạn nối sai ' + mistakes + ' lần' : 'Nối đúng tất cả!');
            }
          } else {
            mistakes++;
            [a, v].forEach(function (x) { x.classList.add('shake'); });
            setTimeout(function () { [a, v].forEach(function (x) { x.classList.remove('shake', 'selected'); }); }, 450);
          }
        }
      });
    },
  };

  // ---- Speaking ----
  function speakHtml(ex, translate) {
    var top = translate
      ? '<div class="prompt-card"><span class="prompt-emoji">🗣️</span><span class="prompt-vi">' + esc(ex.vi) + '</span></div>' +
        '<p class="center"><button class="link-btn" data-reveal>👀 Xem gợi ý</button></p><p class="speak-hint center" hidden>' + esc(ex.text) + ' ' + speakBtn(ex.text) + '</p>'
      : '<div class="speak-target"><div class="speak-text">' + esc(ex.text) + '</div>' +
        (ex.ipa ? '<div class="vocab-ipa">' + esc(ex.ipa) + '</div>' : '') +
        '<div class="muted">' + esc(ex.vi) + '</div><div class="speak-listen">' + speakBtn(ex.text, { slow: true }) + '</div></div>';
    var mic;
    if (L.speech.sttSupported) {
      mic = '<div class="mic-wrap"><button class="mic-btn" aria-label="Bấm để nói">🎤</button><div class="mic-status muted">Bấm micro và đọc to</div><div class="heard"></div></div>';
    } else {
      mic = '<div class="mic-wrap"><p class="notice">Trình duyệt này chưa hỗ trợ nhận diện giọng nói (hãy dùng Chrome hoặc Edge). Bạn hãy nghe mẫu, ' +
        (navigator.mediaDevices && window.MediaRecorder ? 'ghi âm lại giọng mình để so sánh, ' : '') + 'rồi tự đánh giá.</p>' +
        (navigator.mediaDevices && window.MediaRecorder ? '<button class="btn btn-ghost-dark rec-btn">⏺ Ghi âm</button> <button class="btn btn-ghost-dark play-btn" hidden>▶ Nghe lại</button>' : '') +
        '<div class="self-check"><button class="btn btn-green" data-self="1">✅ Tôi nói được</button> <button class="btn btn-ghost-dark" data-self="0">Chưa được</button></div></div>';
    }
    return top + mic;
  }

  function bindSpeak(root, ex, ctx) {
    ctx.hideCheck();
    var reveal = $('[data-reveal]', root);
    if (reveal) reveal.addEventListener('click', function () { $('.speak-hint', root).hidden = false; reveal.remove(); });
    var tries = 0;

    if (!L.speech.sttSupported) {
      $$('[data-self]', root).forEach(function (b) {
        b.addEventListener('click', function () { ctx.finish(b.getAttribute('data-self') === '1', ex.text, ex.text); });
      });
      var recBtn = $('.rec-btn', root), playBtn = $('.play-btn', root), recorder, chunks = [], url;
      if (recBtn) recBtn.addEventListener('click', function () {
        if (recorder && recorder.state === 'recording') { recorder.stop(); return; }
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          chunks = [];
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function (e) { chunks.push(e.data); };
          recorder.onstop = function () {
            stream.getTracks().forEach(function (t) { t.stop(); });
            if (url) URL.revokeObjectURL(url);
            url = URL.createObjectURL(new Blob(chunks));
            playBtn.hidden = false;
            recBtn.textContent = '⏺ Ghi âm lại';
          };
          recorder.start();
          recBtn.textContent = '⏹ Dừng';
        }).catch(function () { toast('Không truy cập được micro'); });
      });
      if (playBtn) playBtn.addEventListener('click', function () { if (url) new Audio(url).play(); });
      return;
    }

    var btn = $('.mic-btn', root), status = $('.mic-status', root), heard = $('.heard', root);
    function listen() {
      if (ctx.locked()) return;
      if (btn.classList.contains('recording')) { L.speech.stopListening(); return; }
      btn.classList.add('recording');
      status.textContent = 'Đang nghe… hãy nói!';
      L.speech.listen().then(function (alts) {
        btn.classList.remove('recording');
        if (!alts.length) { status.textContent = 'Không nghe thấy gì. Bấm micro và thử lại nhé.'; return; }
        tries++;
        var r = L.exercises.checkSpeech(alts, ex.answers, course());
        var pct = Math.round(r.score * 100);
        heard.innerHTML = 'Bạn nói: <b>“' + esc(r.heard) + '”</b> <span class="pct ' + (r.ok ? 'good' : 'bad') + '">' + pct + '%</span>';
        if (r.ok) { ctx.finish(true, ex.text, ex.text); return; }
        if (tries >= 3) { ctx.finish(false, ex.text, ex.text); return; }
        status.innerHTML = 'Chưa khớp lắm – nghe lại mẫu rồi thử lần nữa (' + tries + '/3). <button class="link-btn" data-skip>Bỏ qua</button>';
        var skip = $('[data-skip]', root);
        if (skip) skip.addEventListener('click', function () { ctx.finish(false, ex.text, ex.text); });
      }).catch(function (err) {
        btn.classList.remove('recording');
        if (err && /not-allowed|service-not-allowed/.test(err.message)) {
          status.innerHTML = 'Bạn cần cho phép dùng micro. <button class="link-btn" data-skip>Bỏ qua câu này</button>';
        } else if (err && err.message === 'network') {
          status.innerHTML = 'Nhận diện giọng nói cần kết nối Internet. <button class="link-btn" data-skip>Bỏ qua câu này</button>';
        } else {
          status.innerHTML = 'Có lỗi khi nghe (' + esc(err && err.message) + '). Thử lại hoặc <button class="link-btn" data-skip>bỏ qua</button>';
        }
        var skip = $('[data-skip]', root);
        if (skip) skip.addEventListener('click', function () { ctx.finish(false, ex.text, ex.text); });
      });
    }
    btn.addEventListener('click', listen);
    ctx.onKey(function (e) { if (e.key === ' ' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); listen(); } });
  }

  R.speak = { html: function (ex) { return speakHtml(ex, false); }, bind: bindSpeak };
  R.speak_translate = { html: function (ex) { return speakHtml(ex, true); }, bind: bindSpeak };

  function viewPractice(lessonId, skillId) {
    var c = course();
    var lesson = c.lessonById[lessonId];
    var skill = L.SKILLS.find(function (s) { return s.id === skillId; });
    if (!lesson || !skill) return viewNotFound();
    if (!store.isLessonUnlocked(c, lesson)) { location.hash = '#/course'; return; }

    var exs = L.exercises.build(skillId, c, lesson);
    var i = 0, correct = 0;

    app.innerHTML =
      '<div class="practice">' +
        '<div class="practice-top">' +
          '<a class="close-btn" href="#/lesson/' + lesson.id + '" title="Thoát" aria-label="Thoát">✕</a>' +
          '<div class="candy-bar"><span></span></div>' +
          '<span class="counter"></span>' +
        '</div>' +
        '<div class="practice-title">' + skill.icon + ' ' + skill.name + ' · ' + esc(lesson.title) + '</div>' +
        '<div class="practice-card"><p class="ex-hint"></p><div class="ex-body"></div></div>' +
        '<div class="practice-foot"></div>' +
      '</div>';

    var body = $('.ex-body', app), foot = $('.practice-foot', app), hint = $('.ex-hint', app);

    function show() {
      var ex = exs[i];
      $('.candy-bar span', app).style.width = (i / exs.length * 100) + '%';
      $('.counter', app).textContent = (i + 1) + '/' + exs.length;
      hint.textContent = HINTS[ex.type] || '';
      body.innerHTML = R[ex.type].html(ex);

      var state = { locked: false, check: null, key: null };
      foot.innerHTML = '<button class="btn btn-red btn-lg check-btn" disabled>Kiểm tra</button>';
      var checkBtn = $('.check-btn', foot);

      var ctx = {
        ready: function (v) { checkBtn.disabled = !v; },
        setCheck: function (fn) { state.check = fn; },
        locked: function () { return state.locked; },
        hideCheck: function () { foot.innerHTML = '<button class="btn btn-ghost-dark skip-btn">Bỏ qua</button>'; $('.skip-btn', foot).onclick = function () { ctx.finish(false, ex.text || ''); }; },
        onKey: function (fn) { state.key = fn; },
        finish: function (ok, answer, speakText) {
          if (state.locked) return;
          state.locked = true;
          if (ok) correct++;
          L.speech.stopListening();
          foot.innerHTML =
            '<div class="feedback ' + (ok ? 'ok' : 'bad') + '">' +
              '<div class="fb-text"><strong>' + (ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : 'Chưa đúng rồi 😅') + '</strong>' +
              (answer ? '<div>' + (ok ? '' : 'Đáp án: ') + '<b>' + esc(answer) + '</b> ' + (speakText ? speakBtn(speakText) : '') + '</div>' : '') +
              '</div>' +
              '<button class="btn ' + (ok ? 'btn-green' : 'btn-red') + ' btn-lg next-btn">Tiếp tục →</button>' +
            '</div>';
          var nb = $('.next-btn', foot);
          nb.focus();
          nb.addEventListener('click', next);
          if (ok && speakText && ex.type.indexOf('speak') !== 0) L.speech.speak(speakText);
        },
      };
      checkBtn.addEventListener('click', function () {
        if (!state.check || checkBtn.disabled) return;
        var r = state.check();
        ctx.finish(r.ok, r.answer, r.speak);
      });
      keyHandler = function (e) {
        if (e.key === 'Enter') {
          var nb = $('.next-btn', foot);
          if (nb) { e.preventDefault(); nb.click(); return; }
          if (!checkBtn.disabled && document.body.contains(checkBtn)) { e.preventDefault(); checkBtn.click(); }
          return;
        }
        if (!state.locked && state.key && document.activeElement.tagName !== 'INPUT') state.key(e);
      };
      R[ex.type].bind(body, ex, ctx);
    }

    function next() {
      i++;
      if (i < exs.length) show(); else finish();
    }

    function finish() {
      keyHandler = null;
      var unit = c.units[lesson.unitIndex];
      var wasLessonDone = store.isLessonComplete(lesson);
      var wasUnitDone = unitProgress(c, unit).complete;
      var res = store.recordSkill(lesson.id, skillId, correct, exs.length);
      var lessonDone = !wasLessonDone && store.isLessonComplete(lesson);
      var unitDone = !wasUnitDone && unitProgress(c, unit).complete;
      renderStats();

      var nextSkill = L.SKILLS.find(function (s) { return !store.isSkillPassed(lesson.id, s.id); });
      var nextLesson = c.lessonList[lesson.order + 1];
      var pct = Math.round(res.score * 100);
      var msg = res.stars === 3 ? 'Hoàn hảo! Ông già Noel cũng phải khen bạn 🎅' :
        res.stars === 2 ? 'Rất tốt! Thêm chút nữa là đạt 3 sao ⭐' :
        res.stars === 1 ? 'Bạn đã vượt qua! Luyện lại để được nhiều sao hơn nhé.' :
        'Chưa đạt 60%. Xem lại từ vựng và thử lại nhé – bạn làm được mà! 💪';

      var actions = '<a class="btn btn-ghost-dark" href="#/practice/' + lesson.id + '/' + skillId + '" data-retry>↻ Luyện lại</a>';
      if (lessonDone && nextLesson) actions += '<a class="btn btn-red" href="#/lesson/' + nextLesson.id + '">Bài tiếp theo →</a>';
      else if (nextSkill && res.stars > 0) actions += '<a class="btn btn-red" href="#/practice/' + lesson.id + '/' + nextSkill.id + '">' + nextSkill.icon + ' Luyện ' + nextSkill.name + ' →</a>';
      actions += '<a class="btn btn-green" href="#/lesson/' + lesson.id + '">Về bài học</a>';

      app.innerHTML =
        '<div class="result panel">' +
          '<div class="result-icon">' + (unitDone ? '🎁' : lessonDone ? '🏆' : res.stars ? '🎄' : '☃️') + '</div>' +
          '<h1>' + (unitDone ? 'Bạn đã mở quà chặng "' + esc(unit.title) + '"!' : lessonDone ? 'Hoàn thành bài học!' : skill.icon + ' ' + skill.name + ': ' + pct + '%') + '</h1>' +
          '<div class="result-stars">' + starsHtml(res.stars) + '</div>' +
          '<p>' + msg + '</p>' +
          '<p class="muted">Đúng ' + correct + '/' + exs.length + ' câu · +' + res.xp + ' ⭐</p>' +
          '<div class="result-actions">' + actions + '</div>' +
        '</div>';
      $('[data-retry]', app).addEventListener('click', function (e) { e.preventDefault(); viewPractice(lessonId, skillId); });
      if (res.stars >= 2 || lessonDone) celebrate();
    }

    show();
  }

  // =====================================================================
  // REVIEW (spaced repetition flashcards)
  // =====================================================================
  function viewReview() {
    var c = course();
    var today = new Date().toISOString().slice(0, 10);
    var words = [];
    c.lessonList.forEach(function (l) {
      var lp = store.peekLesson(l.id);
      if (lp.learned || Object.keys(lp.skills).length) words = words.concat(l.vocab);
    });
    if (!words.length) {
      app.innerHTML = '<div class="panel center empty"><div class="result-icon">☃️</div><h1>Chưa có từ để ôn</h1>' +
        '<p class="muted">Hãy học bài đầu tiên, các từ vựng sẽ xuất hiện ở đây để bạn ôn tập mỗi ngày.</p>' +
        '<a class="btn btn-red" href="#/course">Đến lộ trình</a></div>';
      return;
    }
    var due = words.filter(function (w) { var it = store.srsItem(w.en); return !it.due || it.due <= today; });
    var deck = L.exercises.shuffle(due).sort(function (a, b) { return store.srsItem(a.en).box - store.srsItem(b.en).box; }).slice(0, 20);
    var mastered = words.filter(function (w) { return store.srsItem(w.en).box >= 4; }).length;

    var head = '<div class="page-head"><h1>🔁 Ôn tập từ vựng</h1><p class="muted">' + words.length + ' từ đã học · ' + mastered + ' từ đã thuộc · ' + due.length + ' từ cần ôn hôm nay</p></div>';

    if (!deck.length) {
      app.innerHTML = head + '<div class="panel center empty"><div class="result-icon">🎉</div><h2>Bạn đã ôn hết từ hôm nay!</h2><p class="muted">Quay lại vào ngày mai nhé. Từ được ôn theo phương pháp lặp lại ngắt quãng.</p><a class="btn btn-red" href="#/course">Học bài mới</a></div>';
      return;
    }

    var idx = 0, remembered = 0;
    app.innerHTML = head + '<div class="flash-wrap"><div class="counter center"></div><div class="flashcard" tabindex="0"></div><div class="flash-actions"></div></div>';
    var card = $('.flashcard', app), actions = $('.flash-actions', app), counter = $('.counter', app);

    function showCard() {
      if (idx >= deck.length) {
        app.innerHTML = head + '<div class="panel center"><div class="result-icon">🎄</div><h2>Xong lượt ôn tập!</h2><p>Bạn nhớ ' + remembered + '/' + deck.length + ' từ.</p><a class="btn btn-red" href="#/review" data-again>Ôn tiếp</a> <a class="btn btn-green" href="#/course">Về lộ trình</a></div>';
        $('[data-again]', app).addEventListener('click', function (e) { e.preventDefault(); viewReview(); });
        celebrate();
        return;
      }
      var w = deck[idx];
      counter.textContent = (idx + 1) + ' / ' + deck.length;
      card.classList.remove('flipped');
      card.innerHTML = '<div class="flash-front"><div class="vocab-emoji">' + (w.emoji || '✨') + '</div><div class="flash-word">' + esc(w.en) + '</div><div class="vocab-ipa">' + esc(w.ipa || '') + '</div><div class="muted">Bấm vào thẻ để xem nghĩa</div></div>' +
        '<div class="flash-back"><div class="flash-word">' + esc(w.vi) + '</div><div class="muted">' + esc(w.en) + '</div></div>';
      actions.innerHTML = speakBtn(w.en, { slow: true }) + '<button class="btn btn-ghost-dark" data-ans="0">😕 Chưa nhớ</button><button class="btn btn-green" data-ans="1">😊 Đã nhớ</button>';
      L.speech.speak(w.en);
      $$('[data-ans]', actions).forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = b.getAttribute('data-ans') === '1';
          store.srsAnswer(w.en, ok);
          if (ok) remembered++;
          renderStats();
          idx++;
          showCard();
        });
      });
    }
    card.addEventListener('click', function () { card.classList.toggle('flipped'); });
    keyHandler = function (e) {
      if (e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
      if (e.key === '1') { var b = $('[data-ans="0"]', actions); if (b) b.click(); }
      if (e.key === '2') { var b2 = $('[data-ans="1"]', actions); if (b2) b2.click(); }
    };
    showCard();
  }

  // =====================================================================
  // ALPHABET
  // =====================================================================
  function viewAlphabet() {
    var c = course();
    var letters = (c.alphabet || []).map(function (a) {
      return '<button class="letter-card" data-letter="' + esc(a.letter) + '" data-word="' + esc(a.word) + '">' +
        '<span class="letter">' + esc(a.letter) + '<small>' + esc(a.letter.toLowerCase()) + '</small></span>' +
        '<span class="vocab-ipa">' + esc(a.ipa) + '</span>' +
        '<span class="letter-word">' + a.emoji + ' ' + esc(a.word) + '</span>' +
        '<span class="muted">' + esc(a.vi) + '</span></button>';
    }).join('');
    app.innerHTML = '<div class="page-head"><h1>🔤 Bảng chữ cái ' + esc(c.name) + '</h1>' +
      '<p class="muted">Bấm vào từng chữ cái để nghe cách đọc tên chữ và một từ ví dụ. Đây là bước khởi động trước khi vào bài 1!</p></div>' +
      '<div class="panel"><div class="tips"><b>Mẹo:</b> 5 nguyên âm trong tiếng Anh là <b>A, E, I, O, U</b>. Khi đánh vần tên, người bản xứ đọc tên từng chữ cái: Tom = <i>tee – oh – em</i>.</div>' +
      '<div class="letter-grid">' + letters + '</div></div>';
    $$('.letter-card', app).forEach(function (b) {
      b.addEventListener('click', function () {
        b.classList.add('playing');
        L.speech.speak(b.getAttribute('data-letter') + '. ' + b.getAttribute('data-word'))
          .then(function () { b.classList.remove('playing'); });
      });
    });
  }

  // =====================================================================
  // SETTINGS
  // =====================================================================
  function viewSettings() {
    var c = course();
    var s = store.settings();
    var voices = L.speech.voicesFor(c.speechLang);
    var voiceOpts = '<option value="">Tự động</option>' + voices.map(function (v) {
      return '<option value="' + esc(v.name) + '"' + (v.name === s.voice ? ' selected' : '') + '>' + esc(v.name) + ' (' + esc(v.lang) + ')</option>';
    }).join('');

    app.innerHTML = '<div class="page-head"><h1>⚙️ Cài đặt</h1></div>' +
      '<div class="panel settings">' +
        '<h2>🔊 Giọng đọc</h2>' +
        '<label class="field"><span>Tốc độ đọc: <b class="rate-val">' + s.rate.toFixed(2) + '</b></span>' +
          '<input type="range" min="0.5" max="1.2" step="0.05" value="' + s.rate + '" class="rate" /></label>' +
        '<label class="field"><span>Giọng ' + esc(c.name) + '</span><select class="voice">' + voiceOpts + '</select></label>' +
        '<button class="btn btn-green test-voice">▶ Nghe thử</button>' +
        '<h2>🎄 Giao diện & học tập</h2>' +
        '<label class="toggle"><input type="checkbox" class="snow-toggle"' + (s.snow ? ' checked' : '') + ' /> Hiệu ứng tuyết rơi</label>' +
        '<label class="toggle"><input type="checkbox" class="unlock-toggle"' + (s.unlockAll ? ' checked' : '') + ' /> Mở khoá tất cả bài học (dành cho người đã có nền tảng)</label>' +
        '<h2>🧪 Hỗ trợ của trình duyệt</h2>' +
        '<ul class="support">' +
          '<li>' + (L.speech.ttsSupported ? '✅' : '❌') + ' Đọc văn bản (phần Nghe)' + (voices.length ? ' – ' + voices.length + ' giọng ' + esc(c.name) : (L.speech.ttsSupported ? ' – chưa tìm thấy giọng ' + esc(c.name) : '')) + '</li>' +
          '<li>' + (L.speech.sttSupported ? '✅' : '⚠️') + ' Nhận diện giọng nói (phần Nói)' + (L.speech.sttSupported ? '' : ' – hãy dùng Chrome hoặc Edge; hiện bạn sẽ tự đánh giá phần Nói') + '</li>' +
        '</ul>' +
        '<h2>🗑️ Dữ liệu</h2>' +
        '<p class="muted">Tiến độ được lưu trên trình duyệt này.</p>' +
        '<button class="btn btn-red reset">Xoá toàn bộ tiến độ</button>' +
      '</div>';

    var rate = $('.rate', app);
    rate.addEventListener('input', function () { $('.rate-val', app).textContent = (+rate.value).toFixed(2); store.setSetting('rate', +rate.value); });
    $('.voice', app).addEventListener('change', function (e) { store.setSetting('voice', e.target.value); });
    $('.test-voice', app).addEventListener('click', function () { L.speech.speak('Hello! Merry Christmas and happy learning!'); });
    $('.snow-toggle', app).addEventListener('change', function (e) {
      store.setSetting('snow', e.target.checked);
      if (e.target.checked) L.snow.start(); else L.snow.stop();
    });
    $('.unlock-toggle', app).addEventListener('change', function (e) { store.setSetting('unlockAll', e.target.checked); });
    $('.reset', app).addEventListener('click', function () {
      if (confirm('Xoá toàn bộ tiến độ học? Thao tác này không thể hoàn tác.')) {
        store.reset(); renderStats(); toast('Đã xoá tiến độ.');
      }
    });
    // Voices may load late.
    if (!voices.length && L.speech.ttsSupported && !viewSettings._retried) {
      viewSettings._retried = true;
      setTimeout(function () { if (location.hash === '#/settings') viewSettings(); }, 700);
    }
  }

  function viewNotFound() {
    app.innerHTML = '<div class="panel center"><div class="result-icon">🦌</div><h1>Không tìm thấy trang</h1><a class="btn btn-red" href="#/">Về trang chủ</a></div>';
  }

  // =====================================================================
  // ROUTER
  // =====================================================================
  function route() {
    keyHandler = null;
    L.speech.stopListening();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    var parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    var page = parts[0] || 'home';
    $$('#nav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === (page === 'lesson' || page === 'practice' ? 'course' : page)); });
    document.body.classList.toggle('in-practice', page === 'practice');
    if (page === 'home') viewHome();
    else if (page === 'course') viewCourse();
    else if (page === 'lesson') viewLesson(parts[1]);
    else if (page === 'practice') viewPractice(parts[1], parts[2]);
    else if (page === 'syllabus') viewSyllabus();
    else if (page === 'review') viewReview();
    else if (page === 'alphabet') viewAlphabet();
    else if (page === 'settings') viewSettings();
    else viewNotFound();
    renderStats();
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  if (store.settings().snow) L.snow.start();
  route();
})(window.LEA);
