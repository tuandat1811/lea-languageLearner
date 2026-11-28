/*
 * Registry of learnable languages.
 * Each course file (data/<code>.js) calls LEA.registerLanguage({...}).
 * To add a new language: create data/<code>.js and add a <script> tag in index.html.
 */
window.LEA = window.LEA || {};

(function (L) {
  L.languages = {};
  L.languageOrder = [];

  // Languages shown on the home page as "coming soon" (no course data yet).
  L.upcoming = [
    { code: 'ja', name: 'Tiếng Nhật', flag: '🇯🇵' },
    { code: 'ko', name: 'Tiếng Hàn', flag: '🇰🇷' },
    { code: 'zh', name: 'Tiếng Trung', flag: '🇨🇳' },
    { code: 'fr', name: 'Tiếng Pháp', flag: '🇫🇷' },
  ];

  function index(course) {
    course.lessonList = [];
    course.lessonById = {};
    course.units.forEach(function (unit, ui) {
      unit.index = ui;
      unit.lessons.forEach(function (lesson, li) {
        lesson.unitId = unit.id;
        lesson.unitIndex = ui;
        lesson.indexInUnit = li;
        lesson.order = course.lessonList.length;
        course.lessonList.push(lesson);
        course.lessonById[lesson.id] = lesson;
      });
    });
    // Grammar check-point tests: one after every TEST_EVERY units.
    course.tests = [];
    course.testById = {};
    course.testAfterUnit = {};
    for (var i = 0; i < course.units.length; i += L.TEST_EVERY) {
      var units = course.units.slice(i, i + L.TEST_EVERY);
      var test = {
        id: 'test' + (course.tests.length + 1),
        number: course.tests.length + 1,
        units: units,
        lessons: units.reduce(function (all, u) { return all.concat(u.lessons); }, []),
        firstUnit: i + 1,
        lastUnit: i + units.length,
      };
      course.tests.push(test);
      course.testById[test.id] = test;
      course.testAfterUnit[units[units.length - 1].id] = test;
    }
  }

  /** Number of units covered by each grammar test (≈ 4 lessons). */
  L.TEST_EVERY = 2;

  L.registerLanguage = function (course) {
    if (!course || !course.code) throw new Error('Course needs a code');
    index(course);
    L.languages[course.code] = course;
    if (L.languageOrder.indexOf(course.code) === -1) L.languageOrder.push(course.code);
    // A registered language is no longer "upcoming".
    L.upcoming = L.upcoming.filter(function (u) { return u.code !== course.code; });
  };

  /**
   * Add more units (e.g. a new level) to a registered course, from its own file.
   * extra: { units: [...], contractions?: {...}, equivalents?: {...}, noLooseContractions?: [...] }
   */
  L.extendLanguage = function (code, extra) {
    var course = L.languages[code];
    if (!course) throw new Error('Register ' + code + ' before extending it');
    course.units = course.units.concat(extra.units || []);
    ['contractions', 'equivalents'].forEach(function (k) {
      if (extra[k]) course[k] = Object.assign({}, course[k] || {}, extra[k]);
    });
    if (extra.noLooseContractions) {
      course.noLooseContractions = (course.noLooseContractions || []).concat(extra.noLooseContractions);
    }
    if (extra.talk) {
      // Communication situations, keyed by unit id: { u1: { title, phrases, dialogue, ... } }.
      course.talk = course.talk || {};
      Object.keys(extra.talk).forEach(function (unitId) {
        var t = extra.talk[unitId];
        t.id = 'talk-' + unitId;
        t.unitId = unitId;
        course.talk[unitId] = t;
      });
    }
    if (extra.pronunciation) {
      course.pronunciation = (course.pronunciation || []).concat(extra.pronunciation);
      course.pronById = {};
      course.pronunciation.forEach(function (p, i) { p.order = i; course.pronById[p.id] = p; });
    }
    index(course);
  };

  L.getCourse = function (code) {
    return L.languages[code] || L.languages[L.languageOrder[0]];
  };

  // Study paces for the learning plan (lessons per week).
  L.PACES = [
    {
      id: 'intensive', name: 'Tăng tốc', icon: '🚀', perWeek: 5,
      desc: '1 bài mỗi ngày từ thứ Hai đến thứ Sáu, khoảng 35 phút/ngày. Thứ Bảy ôn tập, Chủ nhật nghỉ.',
      week: [
        ['T2', 'Học 1 bài: từ vựng → ngữ pháp → 4 kỹ năng'], ['T3', 'Học 1 bài'], ['T4', 'Học 1 bài'],
        ['T5', 'Học 1 bài'], ['T6', 'Học 1 bài'], ['T7', 'Ôn tập từ vựng + luyện lại kỹ năng dưới 3 sao'], ['CN', 'Nghỉ ngơi 😌'],
      ],
    },
    {
      id: 'standard', name: 'Tiêu chuẩn', icon: '⭐', perWeek: 3,
      desc: '3 bài mỗi tuần, khoảng 25 phút/ngày. Mỗi bài trải qua 2 ngày: học mới rồi luyện tập.',
      week: [
        ['T2', 'Bài A: từ vựng, ngữ pháp, câu mẫu + Nghe'], ['T3', 'Bài A: Nói, Đọc, Viết'],
        ['T4', 'Bài B: từ vựng, ngữ pháp, câu mẫu + Nghe'], ['T5', 'Bài B: Nói, Đọc, Viết'],
        ['T6', 'Bài C: học mới + Nghe, Nói'], ['T7', 'Bài C: Đọc, Viết + ôn tập'], ['CN', 'Ôn tập từ vựng 10 phút'],
      ],
    },
    {
      id: 'relaxed', name: 'Thong thả', icon: '☕', perWeek: 2,
      desc: '2 bài mỗi tuần, khoảng 15 phút/ngày. Phù hợp người bận rộn.',
      week: [
        ['T2', 'Bài A: từ vựng + ngữ pháp'], ['T3', 'Bài A: Nghe + Nói'], ['T4', 'Bài A: Đọc + Viết'],
        ['T5', 'Bài B: từ vựng + ngữ pháp'], ['T6', 'Bài B: Nghe + Nói'], ['T7', 'Bài B: Đọc + Viết'], ['CN', 'Ôn tập từ vựng'],
      ],
    },
  ];

  // The four skills, in teaching order.
  L.SKILLS = [
    { id: 'listening', name: 'Nghe', icon: '🎧', desc: 'Nghe và nhận biết từ, câu' },
    { id: 'speaking', name: 'Nói', icon: '🎤', desc: 'Luyện phát âm, nói thành câu' },
    { id: 'reading', name: 'Đọc', icon: '📖', desc: 'Đọc hiểu từ, câu và đoạn văn' },
    { id: 'writing', name: 'Viết', icon: '✍️', desc: 'Viết từ, sắp xếp và dịch câu' },
  ];
})(window.LEA);
