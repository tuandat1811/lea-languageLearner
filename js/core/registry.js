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

  L.registerLanguage = function (course) {
    if (!course || !course.code) throw new Error('Course needs a code');
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
    L.languages[course.code] = course;
    if (L.languageOrder.indexOf(course.code) === -1) L.languageOrder.push(course.code);
    // A registered language is no longer "upcoming".
    L.upcoming = L.upcoming.filter(function (u) { return u.code !== course.code; });
  };

  L.getCourse = function (code) {
    return L.languages[code] || L.languages[L.languageOrder[0]];
  };

  // The four skills, in teaching order.
  L.SKILLS = [
    { id: 'listening', name: 'Nghe', icon: '🎧', desc: 'Nghe và nhận biết từ, câu' },
    { id: 'speaking', name: 'Nói', icon: '🎤', desc: 'Luyện phát âm, nói thành câu' },
    { id: 'reading', name: 'Đọc', icon: '📖', desc: 'Đọc hiểu từ, câu và đoạn văn' },
    { id: 'writing', name: 'Viết', icon: '✍️', desc: 'Viết từ, sắp xếp và dịch câu' },
  ];
})(window.LEA);
