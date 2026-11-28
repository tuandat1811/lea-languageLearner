/*
 * Khoá học Tiếng Nhật sơ cấp, giao diện tiếng Việt.
 *
 * Trình tự ngữ pháp bám theo giáo trình Minna no Nihongo (Sơ cấp I – II, 50 bài): mỗi "Bài"
 * là một chặng gồm 2 bài học. Hội thoại, câu ví dụ và nhân vật là nội dung tự biên soạn.
 *
 * Câu tiếng Nhật được viết cách theo cụm từ (文節) như sách sơ cấp: 私は 学生です。
 * Cấu trúc một mục: { ja, kana, romaji, vi } – ja là chữ viết (có kanji), kana là cách đọc.
 * Mỗi bài có thêm quiz (câu hỏi cho bài kiểm tra ngữ pháp, xem js/core/exercises.js):
 *   mcq:   { q: 'câu có ___', options, answer, vi } hoặc { pick: true, options, answer, vi }
 *   write: { type: 'form', prompt, before, after, answer, reading?, hint, vi }
 *          { type: 'correct', wrong, answer, kana, vi }
 */
LEA.registerLanguage({
  code: 'ja',
  name: 'Tiếng Nhật',
  nativeName: '日本語',
  flag: '🇯🇵',
  speechLang: 'ja-JP',
  script: 'ja',
  level: 'N5 → N4',
  tagline: 'Theo trình tự ngữ pháp Minna no Nihongo · Sơ cấp',
  description:
    'Lộ trình 50 bài theo trình tự ngữ pháp của giáo trình Minna no Nihongo (N5 → N4). Bắt đầu với bảng chữ kana, mỗi bài luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết. Hiện đã có Bài 1 – 5.',
  inputHint: 'Gõ kana, romaji (vd: watashi wa) hoặc kanji…',
  sampleSentence: 'こんにちは。いっしょに 日本語を 勉強しましょう。',

  tips: {
    speaking: [
      'Tiếng Nhật đọc <b>đều từng nhịp</b> (mora), không nhấn mạnh như tiếng Anh: ちょっと = cho-t-to, giữ đủ 3 nhịp.',
      'Chú ý <b>âm dài</b> (おばさん "cô" ≠ おばあさん "bà") và <b>âm ngắt っ</b> (きて ≠ きって) – đổi độ dài là đổi nghĩa.',
      '<b>です・ます</b> cuối câu thường đọc lướt chữ u: "des", "mas".',
      'Bấm 🎤 để máy chấm thử. Nói chậm và rõ từng âm.',
    ],
    writing: [
      'Trật tự câu: <b>Chủ đề は … Động từ</b> – động từ luôn đứng <b>cuối câu</b>.',
      'Trợ từ đứng <b>sau</b> danh từ: 私<b>は</b>, 京都<b>へ</b>, 電車<b>で</b>.',
      'Kết thúc câu bằng dấu <b>。</b>; câu hỏi chỉ cần thêm <b>か</b> ở cuối.',
      'Có thể gõ bằng <b>romaji</b> (watashi wa gakusei desu) hoặc <b>kana</b>; máy chấp nhận cả hai, nhưng không bỏ qua lỗi chính tả.',
    ],
  },

  // Bảng chữ kana (romaji; '' = ô trống). Chữ kana được sinh từ romaji.
  kana: {
    groups: [
      { title: 'Âm cơ bản (gojūon)', rows: [
        ['a', 'i', 'u', 'e', 'o'], ['ka', 'ki', 'ku', 'ke', 'ko'], ['sa', 'shi', 'su', 'se', 'so'], ['ta', 'chi', 'tsu', 'te', 'to'],
        ['na', 'ni', 'nu', 'ne', 'no'], ['ha', 'hi', 'fu', 'he', 'ho'], ['ma', 'mi', 'mu', 'me', 'mo'], ['ya', '', 'yu', '', 'yo'],
        ['ra', 'ri', 'ru', 're', 'ro'], ['wa', '', '', '', 'wo'], ['n', '', '', '', ''],
      ] },
      { title: 'Âm đục và bán đục (dakuon, handakuon)', rows: [
        ['ga', 'gi', 'gu', 'ge', 'go'], ['za', 'ji', 'zu', 'ze', 'zo'], ['da', '', '', 'de', 'do'], ['ba', 'bi', 'bu', 'be', 'bo'], ['pa', 'pi', 'pu', 'pe', 'po'],
      ] },
      { title: 'Âm ghép (yōon)', rows: [
        ['kya', 'kyu', 'kyo'], ['sha', 'shu', 'sho'], ['cha', 'chu', 'cho'], ['nya', 'nyu', 'nyo'], ['hya', 'hyu', 'hyo'], ['mya', 'myu', 'myo'],
        ['rya', 'ryu', 'ryo'], ['gya', 'gyu', 'gyo'], ['ja', 'ju', 'jo'], ['bya', 'byu', 'byo'], ['pya', 'pyu', 'pyo'],
      ] },
    ],
    tips: {
      hira: [
        'Học theo hàng: あ – か – さ … mỗi ngày 1–2 hàng, vừa đọc to vừa viết ra giấy.',
        'Âm đục thêm dấu <b>゛</b> (か → が), âm bán đục thêm dấu <b>゜</b> (は → ぱ).',
        'Âm ghép = chữ hàng い + ゃ/ゅ/ょ viết nhỏ: き + ゃ = <b>きゃ</b> (kya).',
        'Chữ <b>っ</b> viết nhỏ là âm ngắt (gấp đôi phụ âm sau): きって = kitte.',
      ],
      kata: [
        'Katakana dùng cho <b>từ mượn</b> và tên nước ngoài: コーヒー, ベトナム, ラン.',
        'Dấu <b>ー</b> kéo dài nguyên âm phía trước: コーヒー = kōhī.',
        'Cặp dễ nhầm: <b>シ</b> (shi) – <b>ツ</b> (tsu), <b>ソ</b> (so) – <b>ン</b> (n).',
        'Mỗi chữ katakana đọc giống hệt chữ hiragana tương ứng: か = カ (ka).',
      ],
    },
  },

  syllabus: [
    {
      id: 'N5', name: 'Cấp 1 · Sơ cấp I', cefr: 'Bài 1 – 25 · N5', status: 'available', icon: '🌸',
      outcome: 'Giới thiệu bản thân, hỏi đường, mua sắm, nói về giờ giấc, đi lại, sở thích; dùng thể ます, て, ない, từ điển, た và thể thông thường.',
      units: [
        { unit: 'b1', grammar: 'N1 は N2 です; じゃ ありません; câu hỏi か; も; N1 の N2; さん' },
        { unit: 'b2', grammar: 'これ / それ / あれ; この / その / あの N; そうです; N1 ですか、N2 ですか; だれの' },
        { unit: 'b3', grammar: 'ここ / そこ / あそこ / こちら; N は (nơi chốn) です; どこ / どちら; いくら; どこの N' },
        { unit: 'b4', grammar: 'Giờ: 〜時〜分; 〜から〜まで; động từ ます / ません / ました / ませんでした; (thời gian) に' },
        { unit: 'b5', grammar: '行きます / 来ます / 帰ります; (nơi) へ; (phương tiện) で; (người) と; いつ; どこも + phủ định' },
        { title: 'Bài 6 · Rủ nhau đi ăn', grammar: 'N を V (tân ngữ); (nơi) で V; V ませんか; V ましょう' },
        { title: 'Bài 7 · Quà tặng', grammar: 'N で (công cụ); あげます / もらいます; もう V ました' },
        { title: 'Bài 8 · Thành phố của tôi', grammar: 'Tính từ đuôi い / đuôi な; とても / あまり; どんな N; どうですか' },
        { title: 'Bài 9 · Sở thích', grammar: 'N が あります / わかります / 好きです / 上手です; どうして; 〜から (vì)' },
        { title: 'Bài 10 · Có gì, ở đâu?', grammar: 'あります / います; (nơi) に N が あります; vị trí 上 / 下 / 中…; や … など' },
        { title: 'Bài 11 · Đếm số lượng', grammar: 'Đếm つ / 人 / 台 / 枚…; (khoảng thời gian) に 〜回; どのくらい' },
        { title: 'Bài 12 · So sánh', grammar: 'Quá khứ của danh từ và tính từ; N1 は N2 より; どちらが; いちばん' },
        { title: 'Bài 13 · Mong muốn', grammar: 'ほしい; V たい; (nơi) へ V に 行きます (mục đích)' },
        { title: 'Bài 14 · Nhờ vả', grammar: 'Thể て; V て ください; V て います (đang làm); V ましょうか' },
        { title: 'Bài 15 · Xin phép', grammar: 'V ても いいですか; V ては いけません; V て います (trạng thái, nghề nghiệp)' },
        { title: 'Bài 16 · Nối hành động', grammar: 'Nối câu bằng thể て; Adj くて / で; V て から' },
        { title: 'Bài 17 · Không được, phải', grammar: 'Thể ない; V ないで ください; V なければ なりません; V なくても いいです' },
        { title: 'Bài 18 · Khả năng', grammar: 'Thể từ điển; V ことが できます; 趣味は V ことです; V る 前に' },
        { title: 'Bài 19 · Trải nghiệm', grammar: 'Thể た; V た ことが あります; V たり V たり します; 〜く / に なります' },
        { title: 'Bài 20 · Nói chuyện thân mật', grammar: 'Thể thông thường (普通形) và cách nói với bạn bè' },
        { title: 'Bài 21 · Ý kiến', grammar: '〜と 思います; 〜と 言いました; 〜でしょう?' },
        { title: 'Bài 22 · Bổ nghĩa danh từ', grammar: 'Mệnh đề bổ nghĩa cho danh từ' },
        { title: 'Bài 23 · Khi…', grammar: '〜とき; V る と (hệ quả tất yếu)' },
        { title: 'Bài 24 · Cho và nhận', grammar: 'くれます; V て あげます / もらいます / くれます' },
        { title: 'Bài 25 · Nếu…', grammar: 'V たら; V ても (dù…)' },
      ],
    },
    {
      id: 'N4', name: 'Cấp 2 · Sơ cấp II', cefr: 'Bài 26 – 50 · N4', status: 'planned', icon: '🗻',
      outcome: 'Giải thích, xin lời khuyên, bày tỏ ý định và dự đoán; câu bị động, sai khiến; kính ngữ cơ bản.',
      units: [
        { title: 'Bài 26 · Giải thích', grammar: '〜んです; V て いただけませんか' },
        { title: 'Bài 27 · Có thể', grammar: 'Thể khả năng; 見えます / 聞こえます; しか' },
        { title: 'Bài 28 · Vừa… vừa…', grammar: 'V ながら; V て います (thói quen); 〜し、〜し' },
        { title: 'Bài 29 · Trạng thái', grammar: 'V て います (kết quả); V て しまいます' },
        { title: 'Bài 30 · Chuẩn bị', grammar: 'V て あります; V て おきます' },
        { title: 'Bài 31 · Dự định', grammar: 'Thể ý chí; V ようと 思って います; つもりです' },
        { title: 'Bài 32 · Lời khuyên', grammar: 'V た ほうが いいです; でしょう; かもしれません' },
        { title: 'Bài 33 · Biển báo', grammar: 'Thể mệnh lệnh, cấm đoán; 〜と 読みます; 〜という 意味です' },
        { title: 'Bài 34 · Làm theo', grammar: 'V た / N の とおりに; V た あとで; V て / V ないで (cách thức)' },
        { title: 'Bài 35 · Điều kiện', grammar: 'Thể điều kiện ば; 〜なら' },
        { title: 'Bài 36 · Để…', grammar: 'V ように; V ように なります; V ように します' },
        { title: 'Bài 37 · Bị động', grammar: 'Câu bị động (受身)' },
        { title: 'Bài 38 · Danh từ hoá', grammar: 'V の は / の が / の を' },
        { title: 'Bài 39 · Nguyên nhân', grammar: 'V て / Adj くて (nguyên nhân); 〜ので' },
        { title: 'Bài 40 · Liệu…', grammar: 'Từ để hỏi + か; 〜かどうか; V て みます' },
        { title: 'Bài 41 · Cho nhận lịch sự', grammar: 'いただきます / くださいます / やります' },
        { title: 'Bài 42 · Mục đích', grammar: 'V ために; 〜のに (dùng để)' },
        { title: 'Bài 43 · Có vẻ', grammar: 'V そうです (trông có vẻ); V て きます' },
        { title: 'Bài 44 · Quá…', grammar: 'V すぎます; V やすい / にくい; 〜に します' },
        { title: 'Bài 45 · Trường hợp', grammar: '〜場合は; 〜のに (trái với mong đợi)' },
        { title: 'Bài 46 · Vừa mới', grammar: 'V る / V て いる / V た ところです; V た ばかりです' },
        { title: 'Bài 47 · Nghe nói', grammar: '〜そうです (truyền đạt); 〜ようです' },
        { title: 'Bài 48 · Sai khiến', grammar: 'Thể sai khiến (使役)' },
        { title: 'Bài 49 · Tôn kính ngữ', grammar: 'Tôn kính ngữ (尊敬語)' },
        { title: 'Bài 50 · Khiêm nhường ngữ', grammar: 'Khiêm nhường ngữ (謙譲語)' },
      ],
    },
  ],

  units: [
    // ───────────────────────── BÀI 1 ─────────────────────────
    {
      id: 'b1', title: 'Rất hân hạnh', titleEn: 'はじめまして', icon: '🙇',
      goal: 'Tự giới thiệu tên, nghề nghiệp, quốc tịch; hỏi ai đó là ai.',
      lessons: [
        {
          id: 'b1l1', title: 'Tôi là…', titleEn: 'わたしは 〜です', icon: '🙋',
          goal: 'Giới thiệu bản thân với N1 は N2 です.',
          vocab: [
            { ja: '私', kana: 'わたし', romaji: 'watashi', vi: 'tôi', emoji: '🙋' },
            { ja: 'あなた', romaji: 'anata', vi: 'bạn, anh, chị (ngôi thứ hai)', emoji: '🫵' },
            { ja: 'あの人', kana: 'あのひと', romaji: 'ano hito', vi: 'người kia', emoji: '🧍' },
            { ja: '学生', kana: 'がくせい', romaji: 'gakusei', vi: 'học sinh, sinh viên', emoji: '🧑‍🎓' },
            { ja: '先生', kana: 'せんせい', romaji: 'sensei', vi: 'thầy, cô giáo', emoji: '👩‍🏫' },
            { ja: '会社員', kana: 'かいしゃいん', romaji: 'kaishain', vi: 'nhân viên công ty', emoji: '🧑‍💼' },
            { ja: '医者', kana: 'いしゃ', romaji: 'isha', vi: 'bác sĩ', emoji: '🩺' },
            { ja: 'エンジニア', romaji: 'enjinia', vi: 'kỹ sư', emoji: '👷' },
            { ja: 'ベトナム人', kana: 'ベトナムじん', romaji: 'Betonamujin', vi: 'người Việt Nam', emoji: '🇻🇳' },
            { ja: '日本人', kana: 'にほんじん', romaji: 'Nihonjin', vi: 'người Nhật', emoji: '🇯🇵' },
            { ja: 'はじめまして', romaji: 'hajimemashite', vi: 'rất hân hạnh (lần đầu gặp)', emoji: '🙇' },
            { ja: 'どうぞ よろしく', romaji: 'dōzo yoroshiku', vi: 'rất mong được giúp đỡ', emoji: '🤝' },
          ],
          grammar: {
            title: 'N1 は N2 です',
            points: [
              '<b>N1 は N2 です</b> = N1 là N2. Trợ từ <b>は</b> đánh dấu chủ đề và đọc là <b>wa</b> (không đọc "ha").',
              '<b>です</b> đứng cuối câu, làm câu lịch sự; thường đọc lướt là "des".',
              '<b>〜さん</b> gắn sau tên người khác để tỏ lịch sự (anh, chị, ông, bà). Không dùng さん cho chính mình.',
              'Tự giới thiệu lần đầu: <b>はじめまして。〇〇です。どうぞ よろしく。</b>',
            ],
            examples: [
              { ja: '私は エンジニアです。', kana: 'わたしは エンジニアです。', romaji: 'watashi wa enjinia desu.', vi: 'Tôi là kỹ sư.' },
              { ja: 'はじめまして。どうぞ よろしく。', romaji: 'hajimemashite. dōzo yoroshiku.', vi: 'Rất hân hạnh. Rất mong được giúp đỡ.' },
            ],
          },
          sentences: [
            { ja: '私は 学生です。', kana: 'わたしは がくせいです。', romaji: 'watashi wa gakusei desu.', vi: 'Tôi là sinh viên.' },
            { ja: 'はじめまして。ランです。', romaji: 'hajimemashite. Ran desu.', vi: 'Rất hân hạnh. Tôi là Lan.' },
            { ja: '田中さんは 先生です。', kana: 'たなかさんは せんせいです。', romaji: 'Tanaka-san wa sensei desu.', vi: 'Anh Tanaka là giáo viên.' },
            { ja: 'あの人は 医者です。', kana: 'あのひとは いしゃです。', romaji: 'ano hito wa isha desu.', vi: 'Người kia là bác sĩ.' },
            { ja: '私は ベトナム人です。', kana: 'わたしは ベトナムじんです。', romaji: 'watashi wa Betonamujin desu.', vi: 'Tôi là người Việt Nam.' },
            { ja: '鈴木さんは 会社員です。', kana: 'すずきさんは かいしゃいんです。', romaji: 'Suzuki-san wa kaishain desu.', vi: 'Chị Suzuki là nhân viên công ty.' },
          ],
          reading: {
            title: 'Ngày đầu ở lớp tiếng Nhật',
            text: '田中：はじめまして。田中です。\nラン：はじめまして。ランです。ベトナム人です。\n田中：私は 先生です。どうぞ よろしく。\nラン：私は 学生です。どうぞ よろしく。',
            kana: 'たなか：はじめまして。たなかです。\nラン：はじめまして。ランです。ベトナムじんです。\nたなか：わたしは せんせいです。どうぞ よろしく。\nラン：わたしは がくせいです。どうぞ よろしく。',
            vi: 'Tanaka: Rất hân hạnh. Tôi là Tanaka.\nLan: Rất hân hạnh. Tôi là Lan. Tôi là người Việt Nam.\nTanaka: Tôi là giáo viên. Rất mong được giúp đỡ.\nLan: Tôi là sinh viên. Rất mong được giúp đỡ.',
            questions: [
              { q: 'Tanaka làm nghề gì?', options: ['Giáo viên', 'Bác sĩ', 'Sinh viên', 'Kỹ sư'], answer: 0 },
              { q: 'Lan là người nước nào?', options: ['Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc'], answer: 0 },
              { q: '"はじめまして" dùng khi nào?', options: ['Khi gặp ai đó lần đầu', 'Khi chia tay', 'Khi cảm ơn', 'Khi xin lỗi'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '私___ 学生です。', options: ['は', 'を', 'に'], answer: 0, vi: 'Tôi là sinh viên.' },
              { q: '田中___は 先生です。', options: ['さん', 'です', 'の'], answer: 0, vi: 'Anh Tanaka là giáo viên.' },
              { pick: true, options: ['私は 医者です。', '私を 医者です。', '私は 医者を です。'], answer: 0, vi: 'Tôi là bác sĩ.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền trợ từ thích hợp', before: '私', after: ' ベトナム人です。', answer: 'は', hint: '(trợ từ chủ đề)', vi: 'Tôi là người Việt Nam.' },
              { type: 'correct', wrong: '私を 学生です。', answer: '私は 学生です。', kana: 'わたしは がくせいです。', vi: 'Tôi là sinh viên.' },
            ],
          },
        },
        {
          id: 'b1l2', title: 'Bạn có phải là…?', titleEn: '〜ですか', icon: '❓',
          goal: 'Hỏi và trả lời có / không; nói "cũng", "của", hỏi tuổi.',
          vocab: [
            { ja: 'はい', romaji: 'hai', vi: 'vâng, đúng', emoji: '⭕' },
            { ja: 'いいえ', romaji: 'iie', vi: 'không, không phải', emoji: '❌' },
            { ja: 'だれ', romaji: 'dare', vi: 'ai', emoji: '🤔' },
            { ja: '何歳', kana: 'なんさい', romaji: 'nansai', vi: 'mấy tuổi', emoji: '🎂' },
            { ja: 'おいくつ', romaji: 'oikutsu', vi: 'bao nhiêu tuổi (lịch sự)', emoji: '🎈' },
            { ja: '大学', kana: 'だいがく', romaji: 'daigaku', vi: 'trường đại học', emoji: '🏫' },
            { ja: '会社', kana: 'かいしゃ', romaji: 'kaisha', vi: 'công ty', emoji: '🏢' },
            { ja: '銀行員', kana: 'ぎんこういん', romaji: 'ginkōin', vi: 'nhân viên ngân hàng', emoji: '🏦' },
            { ja: '研究者', kana: 'けんきゅうしゃ', romaji: 'kenkyūsha', vi: 'nhà nghiên cứu', emoji: '🔬' },
            { ja: '韓国', kana: 'かんこく', romaji: 'Kankoku', vi: 'Hàn Quốc', emoji: '🇰🇷' },
            { ja: '中国', kana: 'ちゅうごく', romaji: 'Chūgoku', vi: 'Trung Quốc', emoji: '🇨🇳' },
            { ja: '友達', kana: 'ともだち', romaji: 'tomodachi', vi: 'bạn bè', emoji: '🧑‍🤝‍🧑' },
          ],
          grammar: {
            title: 'じゃ ありません / 〜か / も / の',
            points: [
              'Phủ định: <b>N1 は N2 じゃ ありません</b> (trang trọng hơn: では ありません).',
              'Câu hỏi: thêm <b>か</b> vào cuối câu và lên giọng. Trả lời <b>はい</b> (vâng) hoặc <b>いいえ</b> (không).',
              '<b>も</b> = cũng, dùng thay cho は: 田中さん<b>も</b> 会社員です.',
              '<b>N1 の N2</b>: N2 thuộc về N1 – ハノイ大学<b>の</b> 学生 (sinh viên của Đại học Hà Nội).',
              'Hỏi tuổi: <b>何歳ですか</b>; lịch sự hơn: <b>おいくつですか</b>.',
            ],
            examples: [
              { ja: 'あの人は だれですか。', kana: 'あのひとは だれですか。', romaji: 'ano hito wa dare desu ka.', vi: 'Người kia là ai?' },
              { ja: 'いいえ、医者じゃ ありません。', kana: 'いいえ、いしゃじゃ ありません。', romaji: 'iie, isha ja arimasen.', vi: 'Không, tôi không phải bác sĩ.' },
            ],
          },
          sentences: [
            { ja: 'ランさんは 学生ですか。', kana: 'ランさんは がくせいですか。', romaji: 'Ran-san wa gakusei desu ka.', vi: 'Lan có phải là sinh viên không?' },
            { ja: 'はい、学生です。', kana: 'はい、がくせいです。', romaji: 'hai, gakusei desu.', vi: 'Vâng, tôi là sinh viên.' },
            { ja: 'いいえ、先生じゃ ありません。', kana: 'いいえ、せんせいじゃ ありません。', romaji: 'iie, sensei ja arimasen.', vi: 'Không, tôi không phải là giáo viên.' },
            { ja: '田中さんも 会社員です。', kana: 'たなかさんも かいしゃいんです。', romaji: 'Tanaka-san mo kaishain desu.', vi: 'Anh Tanaka cũng là nhân viên công ty.' },
            { ja: '鈴木さんは 何歳ですか。', kana: 'すずきさんは なんさいですか。', romaji: 'Suzuki-san wa nansai desu ka.', vi: 'Chị Suzuki bao nhiêu tuổi?' },
            { ja: '私は ハノイ大学の 学生です。', kana: 'わたしは ハノイだいがくの がくせいです。', romaji: 'watashi wa Hanoi daigaku no gakusei desu.', vi: 'Tôi là sinh viên Đại học Hà Nội.' },
          ],
          reading: {
            title: 'Người kia là ai?',
            text: '鈴木：ランさん、あの人は だれですか。\nラン：高橋さんです。私の 友達です。\n鈴木：高橋さんも 学生ですか。\nラン：いいえ、学生じゃ ありません。銀行員です。',
            kana: 'すずき：ランさん、あのひとは だれですか。\nラン：たかはしさんです。わたしの ともだちです。\nすずき：たかはしさんも がくせいですか。\nラン：いいえ、がくせいじゃ ありません。ぎんこういんです。',
            vi: 'Suzuki: Lan ơi, người kia là ai vậy?\nLan: Là anh Takahashi. Bạn của tôi.\nSuzuki: Anh Takahashi cũng là sinh viên à?\nLan: Không, không phải sinh viên. Anh ấy là nhân viên ngân hàng.',
            questions: [
              { q: 'Takahashi là ai đối với Lan?', options: ['Bạn của Lan', 'Giáo viên của Lan', 'Anh trai của Lan', 'Bác sĩ của Lan'], answer: 0 },
              { q: 'Takahashi làm nghề gì?', options: ['Nhân viên ngân hàng', 'Sinh viên', 'Bác sĩ', 'Giáo viên'], answer: 0 },
              { q: '"も" trong "高橋さんも" nghĩa là gì?', options: ['cũng', 'không', 'và', 'của'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '田中さんは 学生です___。', options: ['か', 'も', 'の'], answer: 0, vi: 'Anh Tanaka có phải là sinh viên không?' },
              { q: 'ランさんは 学生です。鈴木さん___ 学生です。', options: ['も', 'か', 'を'], answer: 0, vi: 'Lan là sinh viên. Suzuki cũng là sinh viên.' },
              { pick: true, options: ['いいえ、先生じゃ ありません。', 'いいえ、先生です ありません。', 'いいえ、先生じゃ です。'], answer: 0, vi: 'Không, tôi không phải là giáo viên.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền trợ từ thích hợp', before: 'ハノイ大学', after: ' 学生です。', answer: 'の', hint: '(trợ từ: "của")', vi: 'Tôi là sinh viên Đại học Hà Nội.' },
              { type: 'correct', wrong: 'あの人は 何ですか。', answer: 'あの人は だれですか。', kana: 'あのひとは だれですか。', vi: 'Người kia là ai?' },
            ],
          },
        },
      ],
    },

    // ───────────────────────── BÀI 2 ─────────────────────────
    {
      id: 'b2', title: 'Đây là gì?', titleEn: 'これは 何ですか', icon: '📘',
      goal: 'Hỏi tên đồ vật, nói đồ vật là của ai, về cái gì.',
      lessons: [
        {
          id: 'b2l1', title: 'Cái này, cái đó, cái kia', titleEn: 'これ・それ・あれ', icon: '👉',
          goal: 'Dùng これ / それ / あれ để hỏi và nói về đồ vật.',
          vocab: [
            { ja: 'これ', romaji: 'kore', vi: 'cái này', emoji: '👇' },
            { ja: 'それ', romaji: 'sore', vi: 'cái đó', emoji: '👉' },
            { ja: 'あれ', romaji: 'are', vi: 'cái kia', emoji: '👆' },
            { ja: '何', kana: 'なん', romaji: 'nan', vi: 'cái gì', emoji: '❓' },
            { ja: '本', kana: 'ほん', romaji: 'hon', vi: 'quyển sách', emoji: '📕' },
            { ja: '辞書', kana: 'じしょ', romaji: 'jisho', vi: 'từ điển', emoji: '📖' },
            { ja: '雑誌', kana: 'ざっし', romaji: 'zasshi', vi: 'tạp chí', emoji: '📰' },
            { ja: '新聞', kana: 'しんぶん', romaji: 'shinbun', vi: 'tờ báo', emoji: '🗞️' },
            { ja: '鉛筆', kana: 'えんぴつ', romaji: 'enpitsu', vi: 'bút chì', emoji: '✏️' },
            { ja: 'かばん', romaji: 'kaban', vi: 'cặp, túi xách', emoji: '👜' },
            { ja: '時計', kana: 'とけい', romaji: 'tokei', vi: 'đồng hồ', emoji: '⌚' },
            { ja: '傘', kana: 'かさ', romaji: 'kasa', vi: 'cái ô, cái dù', emoji: '☂️' },
          ],
          grammar: {
            title: 'これ / それ / あれ は N です',
            points: [
              '<b>これ</b>: vật gần người nói; <b>それ</b>: vật gần người nghe; <b>あれ</b>: vật xa cả hai.',
              'Hỏi đồ vật: <b>これは 何ですか</b> (Đây là cái gì?). 何 ở đây đọc là <b>なん</b>.',
              'Xác nhận: <b>はい、そうです</b> (Vâng, đúng vậy) / <b>いいえ、そうじゃ ありません</b> (Không, không phải).',
              'Hỏi lựa chọn: <b>N1 ですか、N2 ですか</b> (là N1 hay N2?) – trả lời bằng chính danh từ, không dùng はい/いいえ.',
            ],
            examples: [
              { ja: 'これは 鉛筆です。', kana: 'これは えんぴつです。', romaji: 'kore wa enpitsu desu.', vi: 'Đây là bút chì.' },
              { ja: 'それは かばんですか。', romaji: 'sore wa kaban desu ka.', vi: 'Đó có phải là cái cặp không?' },
            ],
          },
          sentences: [
            { ja: 'これは 本です。', kana: 'これは ほんです。', romaji: 'kore wa hon desu.', vi: 'Đây là quyển sách.' },
            { ja: 'それは 辞書ですか。', kana: 'それは じしょですか。', romaji: 'sore wa jisho desu ka.', vi: 'Đó có phải là từ điển không?' },
            { ja: 'あれは 何ですか。', kana: 'あれは なんですか。', romaji: 'are wa nan desu ka.', vi: 'Kia là cái gì?' },
            { ja: 'これは 時計じゃ ありません。', kana: 'これは とけいじゃ ありません。', romaji: 'kore wa tokei ja arimasen.', vi: 'Đây không phải là đồng hồ.' },
            { ja: 'それは 新聞ですか、雑誌ですか。', kana: 'それは しんぶんですか、ざっしですか。', romaji: 'sore wa shinbun desu ka, zasshi desu ka.', vi: 'Đó là báo hay tạp chí?' },
            { ja: 'あれは 傘です。', kana: 'あれは かさです。', romaji: 'are wa kasa desu.', vi: 'Kia là cái ô.' },
          ],
          reading: {
            title: 'Trong lớp học',
            text: 'ラン：田中先生、これは 何ですか。\n田中：それは 辞書です。\nラン：日本語の 辞書ですか。\n田中：はい、そうです。\nラン：あれも 辞書ですか。\n田中：いいえ、あれは 雑誌です。',
            kana: 'ラン：たなかせんせい、これは なんですか。\nたなか：それは じしょです。\nラン：にほんごの じしょですか。\nたなか：はい、そうです。\nラン：あれも じしょですか。\nたなか：いいえ、あれは ざっしです。',
            vi: 'Lan: Thầy Tanaka ơi, cái này là gì ạ?\nTanaka: Đó là từ điển.\nLan: Từ điển tiếng Nhật ạ?\nTanaka: Ừ, đúng vậy.\nLan: Cái kia cũng là từ điển ạ?\nTanaka: Không, cái kia là tạp chí.',
            questions: [
              { q: 'Thứ Lan cầm trên tay là gì?', options: ['Từ điển', 'Tạp chí', 'Sách', 'Báo'], answer: 0 },
              { q: 'Thứ ở đằng xa là gì?', options: ['Tạp chí', 'Từ điển', 'Đồng hồ', 'Cái ô'], answer: 0 },
              { q: '"はい、そうです" nghĩa là gì?', options: ['Vâng, đúng vậy', 'Không phải', 'Cái gì vậy?', 'Cảm ơn'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '___は 何ですか。—それは 傘です。', options: ['これ', 'あれ', 'それ'], answer: 0, vi: 'Cái này là gì? — Đó là cái ô.' },
              { q: 'それは 新聞ですか、雑誌___。', options: ['ですか', 'です', 'じゃ'], answer: 0, vi: 'Đó là báo hay tạp chí?' },
              { pick: true, options: ['いいえ、そうじゃ ありません。', 'いいえ、そうです ありません。', 'いいえ、そう ありません。'], answer: 0, vi: 'Không, không phải vậy.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền từ để hỏi', before: 'あれは ', after: 'ですか。', answer: '何', reading: 'なん', hint: '(cái gì)', vi: 'Kia là cái gì?' },
              { type: 'correct', wrong: 'これは 時計じゃ です。', answer: 'これは 時計じゃ ありません。', kana: 'これは とけいじゃ ありません。', vi: 'Đây không phải là đồng hồ.' },
            ],
          },
        },
        {
          id: 'b2l2', title: 'Của ai? Về cái gì?', titleEn: 'この 本は だれのですか', icon: '🔑',
          goal: 'Dùng この / その / あの N và N1 の N2 để nói về đồ vật.',
          vocab: [
            { ja: 'この', romaji: 'kono', vi: '… này', emoji: '👇' },
            { ja: 'その', romaji: 'sono', vi: '… đó', emoji: '👉' },
            { ja: 'あの', romaji: 'ano', vi: '… kia', emoji: '👆' },
            { ja: '日本語', kana: 'にほんご', romaji: 'nihongo', vi: 'tiếng Nhật', emoji: '🇯🇵' },
            { ja: '英語', kana: 'えいご', romaji: 'eigo', vi: 'tiếng Anh', emoji: '🇬🇧' },
            { ja: 'だれの', romaji: 'dare no', vi: 'của ai', emoji: '❔' },
            { ja: '車', kana: 'くるま', romaji: 'kuruma', vi: 'ô tô', emoji: '🚗' },
            { ja: '鍵', kana: 'かぎ', romaji: 'kagi', vi: 'chìa khoá', emoji: '🔑' },
            { ja: '名刺', kana: 'めいし', romaji: 'meishi', vi: 'danh thiếp', emoji: '📇' },
            { ja: '手帳', kana: 'てちょう', romaji: 'techō', vi: 'sổ tay', emoji: '📒' },
            { ja: 'コーヒー', romaji: 'kōhī', vi: 'cà phê', emoji: '☕' },
            { ja: 'お土産', kana: 'おみやげ', romaji: 'omiyage', vi: 'quà lưu niệm', emoji: '🎁' },
          ],
          grammar: {
            title: 'この / その / あの N; N1 の N2',
            points: [
              '<b>この / その / あの</b> luôn đi kèm danh từ: <b>この 本</b> (quyển sách này). これ / それ / あれ thì đứng một mình.',
              '<b>N1 の N2</b> nói về nội dung (日本語の 本: sách tiếng Nhật) hoặc sở hữu (私の 本: sách của tôi).',
              'Khi đã rõ N2, có thể bỏ nó: この 本は <b>私の</b>です (là của tôi).',
              'Hỏi chủ sở hữu: <b>だれのですか</b> (của ai?). Đáp lời mới nghe được: <b>そうですか</b> (à, thế à – xuống giọng).',
            ],
            examples: [
              { ja: 'この 手帳は 私のです。', kana: 'この てちょうは わたしのです。', romaji: 'kono techō wa watashi no desu.', vi: 'Cuốn sổ tay này là của tôi.' },
              { ja: 'これは 英語の 辞書です。', kana: 'これは えいごの じしょです。', romaji: 'kore wa eigo no jisho desu.', vi: 'Đây là từ điển tiếng Anh.' },
            ],
          },
          sentences: [
            { ja: 'この 本は 私のです。', kana: 'この ほんは わたしのです。', romaji: 'kono hon wa watashi no desu.', vi: 'Quyển sách này là của tôi.' },
            { ja: 'その 車は だれのですか。', kana: 'その くるまは だれのですか。', romaji: 'sono kuruma wa dare no desu ka.', vi: 'Chiếc ô tô đó là của ai?' },
            { ja: 'これは 日本語の 本です。', kana: 'これは にほんごの ほんです。', romaji: 'kore wa nihongo no hon desu.', vi: 'Đây là sách tiếng Nhật.' },
            { ja: 'あの 鍵は 田中さんのです。', kana: 'あの かぎは たなかさんのです。', romaji: 'ano kagi wa Tanaka-san no desu.', vi: 'Chiếc chìa khoá kia là của anh Tanaka.' },
            { ja: 'これは コーヒーです。お土産です。', kana: 'これは コーヒーです。おみやげです。', romaji: 'kore wa kōhī desu. omiyage desu.', vi: 'Đây là cà phê. Quà cho bạn đấy.' },
            { ja: 'それは 英語の 雑誌ですか。', kana: 'それは えいごの ざっしですか。', romaji: 'sore wa eigo no zasshi desu ka.', vi: 'Đó có phải là tạp chí tiếng Anh không?' },
          ],
          reading: {
            title: 'Quà từ Việt Nam',
            text: 'ラン：鈴木さん、これ、どうぞ。お土産です。\n鈴木：ありがとう ございます。何ですか。\nラン：コーヒーです。ベトナムの コーヒーです。\n鈴木：そうですか。ありがとう。',
            kana: 'ラン：すずきさん、これ、どうぞ。おみやげです。\nすずき：ありがとう ございます。なんですか。\nラン：コーヒーです。ベトナムの コーヒーです。\nすずき：そうですか。ありがとう。',
            vi: 'Lan: Chị Suzuki ơi, cái này tặng chị. Là quà ạ.\nSuzuki: Cảm ơn em nhiều. Là gì vậy?\nLan: Là cà phê. Cà phê Việt Nam ạ.\nSuzuki: Thế à. Cảm ơn em.',
            questions: [
              { q: 'Lan tặng Suzuki thứ gì?', options: ['Cà phê', 'Trà', 'Sách', 'Đồng hồ'], answer: 0 },
              { q: 'Món quà đến từ đâu?', options: ['Việt Nam', 'Nhật Bản', 'Mỹ', 'Hàn Quốc'], answer: 0 },
              { q: '"お土産" nghĩa là gì?', options: ['Quà lưu niệm', 'Cà phê', 'Danh thiếp', 'Chìa khoá'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '___ 本は 私のです。', options: ['この', 'これ', 'ここ'], answer: 0, vi: 'Quyển sách này là của tôi.' },
              { q: 'その 傘は ___ですか。—鈴木さんのです。', options: ['だれの', 'だれ', '何'], answer: 0, vi: 'Cái ô đó là của ai? — Của chị Suzuki.' },
              { pick: true, options: ['これは 日本語の 本です。', 'これは 日本語 本です。', 'これの 日本語は 本です。'], answer: 0, vi: 'Đây là sách tiếng Nhật.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền từ thích hợp', before: '', after: ' 鍵は 田中さんのです。', answer: 'その', hint: '(… đó)', vi: 'Chiếc chìa khoá đó là của anh Tanaka.' },
              { type: 'correct', wrong: 'それ 車は だれのですか。', answer: 'その 車は だれのですか。', kana: 'その くるまは だれのですか。', vi: 'Chiếc ô tô đó là của ai?' },
            ],
          },
        },
      ],
    },

    // ───────────────────────── BÀI 3 ─────────────────────────
    {
      id: 'b3', title: 'Ở đâu?', titleEn: 'ここは どこですか', icon: '🏬',
      goal: 'Hỏi đường trong toà nhà, hỏi giá và nơi sản xuất.',
      lessons: [
        {
          id: 'b3l1', title: 'Chỗ này, chỗ đó, chỗ kia', titleEn: 'ここ・そこ・あそこ', icon: '📍',
          goal: 'Hỏi và chỉ vị trí với ここ / そこ / あそこ / どこ.',
          vocab: [
            { ja: 'ここ', romaji: 'koko', vi: 'chỗ này, ở đây', emoji: '📍' },
            { ja: 'そこ', romaji: 'soko', vi: 'chỗ đó, ở đó', emoji: '👉' },
            { ja: 'あそこ', romaji: 'asoko', vi: 'chỗ kia, ở đằng kia', emoji: '🏁' },
            { ja: 'どこ', romaji: 'doko', vi: 'ở đâu', emoji: '🗺️' },
            { ja: '教室', kana: 'きょうしつ', romaji: 'kyōshitsu', vi: 'phòng học', emoji: '🏫' },
            { ja: '食堂', kana: 'しょくどう', romaji: 'shokudō', vi: 'nhà ăn', emoji: '🍱' },
            { ja: 'トイレ', romaji: 'toire', vi: 'nhà vệ sinh', emoji: '🚻' },
            { ja: '受付', kana: 'うけつけ', romaji: 'uketsuke', vi: 'quầy lễ tân', emoji: '🛎️' },
            { ja: '事務所', kana: 'じむしょ', romaji: 'jimusho', vi: 'văn phòng', emoji: '🗄️' },
            { ja: 'エレベーター', romaji: 'erebētā', vi: 'thang máy', emoji: '🛗' },
            { ja: '階段', kana: 'かいだん', romaji: 'kaidan', vi: 'cầu thang', emoji: '🪜' },
            { ja: 'ロビー', romaji: 'robī', vi: 'sảnh', emoji: '🛋️' },
          ],
          grammar: {
            title: 'N は (nơi chốn) です',
            points: [
              '<b>ここ / そこ / あそこ</b> chỉ nơi chốn, tương ứng với これ / それ / あれ.',
              '<b>N は (nơi chốn) です</b> = N ở … : トイレは あそこです (Nhà vệ sinh ở đằng kia).',
              'Hỏi vị trí: <b>N は どこですか</b>.',
              'Lịch sự hơn: <b>こちら / そちら / あちら / どちら</b> thay cho ここ / そこ / あそこ / どこ.',
            ],
            examples: [
              { ja: '事務所は あそこです。', kana: 'じむしょは あそこです。', romaji: 'jimusho wa asoko desu.', vi: 'Văn phòng ở đằng kia.' },
              { ja: 'ここは 食堂ですか。', kana: 'ここは しょくどうですか。', romaji: 'koko wa shokudō desu ka.', vi: 'Đây có phải là nhà ăn không?' },
            ],
          },
          sentences: [
            { ja: 'ここは 教室です。', kana: 'ここは きょうしつです。', romaji: 'koko wa kyōshitsu desu.', vi: 'Đây là phòng học.' },
            { ja: 'トイレは どこですか。', romaji: 'toire wa doko desu ka.', vi: 'Nhà vệ sinh ở đâu?' },
            { ja: 'トイレは あそこです。', romaji: 'toire wa asoko desu.', vi: 'Nhà vệ sinh ở đằng kia.' },
            { ja: '食堂は どこですか。', kana: 'しょくどうは どこですか。', romaji: 'shokudō wa doko desu ka.', vi: 'Nhà ăn ở đâu?' },
            { ja: '受付は ロビーです。', kana: 'うけつけは ロビーです。', romaji: 'uketsuke wa robī desu.', vi: 'Quầy lễ tân ở sảnh.' },
            { ja: 'エレベーターは そこです。', romaji: 'erebētā wa soko desu.', vi: 'Thang máy ở chỗ đó.' },
          ],
          reading: {
            title: 'Ngày đầu đi làm',
            text: 'ラン：すみません。トイレは どこですか。\n受付：あそこです。\nラン：どうも。事務所は どこですか。\n受付：事務所は 三階です。エレベーターは あちらです。',
            kana: 'ラン：すみません。トイレは どこですか。\nうけつけ：あそこです。\nラン：どうも。じむしょは どこですか。\nうけつけ：じむしょは さんがいです。エレベーターは あちらです。',
            vi: 'Lan: Xin lỗi. Nhà vệ sinh ở đâu ạ?\nLễ tân: Ở đằng kia.\nLan: Cảm ơn. Văn phòng ở đâu ạ?\nLễ tân: Văn phòng ở tầng ba. Thang máy ở phía kia ạ.',
            questions: [
              { q: 'Nhà vệ sinh ở đâu?', options: ['Ở đằng kia', 'Ở tầng ba', 'Ở phòng học', 'Ở sảnh'], answer: 0 },
              { q: 'Văn phòng ở tầng mấy?', options: ['Tầng ba', 'Tầng một', 'Tầng hai', 'Tầng bốn'], answer: 0 },
              { q: '"あちら" là cách nói lịch sự của từ nào?', options: ['あそこ', 'ここ', 'どこ', 'そこ'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: 'トイレは ___ですか。', options: ['どこ', 'だれ', '何'], answer: 0, vi: 'Nhà vệ sinh ở đâu?' },
              { q: '食堂は どこですか。—___です。', options: ['あそこ', 'あの', 'どこ'], answer: 0, vi: 'Nhà ăn ở đâu? — Ở đằng kia.' },
              { pick: true, options: ['事務所は 二階です。', '事務所は 二階を です。', '事務所を 二階です。'], answer: 0, vi: 'Văn phòng ở tầng hai.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền từ để hỏi', before: 'エレベーターは ', after: 'ですか。', answer: 'どこ', hint: '(ở đâu)', vi: 'Thang máy ở đâu?' },
              { type: 'correct', wrong: 'ここは 教室を です。', answer: 'ここは 教室です。', kana: 'ここは きょうしつです。', vi: 'Đây là phòng học.' },
            ],
          },
        },
        {
          id: 'b3l2', title: 'Bao nhiêu tiền?', titleEn: 'いくらですか', icon: '💴',
          goal: 'Hỏi giá, hỏi nơi sản xuất, đọc số tiền.',
          vocab: [
            { ja: 'いくら', romaji: 'ikura', vi: 'bao nhiêu tiền', emoji: '💴' },
            { ja: '円', kana: 'えん', romaji: 'en', vi: 'yên (tiền Nhật)', emoji: '💰' },
            { ja: '百', kana: 'ひゃく', romaji: 'hyaku', vi: 'một trăm', emoji: '💯' },
            { ja: '千', kana: 'せん', romaji: 'sen', vi: 'một nghìn', emoji: '🔢' },
            { ja: '万', kana: 'まん', romaji: 'man', vi: 'mười nghìn', emoji: '🧮' },
            { ja: 'ワイン', romaji: 'wain', vi: 'rượu vang', emoji: '🍷' },
            { ja: '靴', kana: 'くつ', romaji: 'kutsu', vi: 'giày', emoji: '👞' },
            { ja: 'ネクタイ', romaji: 'nekutai', vi: 'cà vạt', emoji: '👔' },
            { ja: '国', kana: 'くに', romaji: 'kuni', vi: 'đất nước', emoji: '🌏' },
            { ja: 'どちら', romaji: 'dochira', vi: 'ở đâu, phía nào (lịch sự)', emoji: '🧭' },
            { ja: 'デパート', romaji: 'depāto', vi: 'cửa hàng bách hoá', emoji: '🏬' },
            { ja: '売り場', kana: 'うりば', romaji: 'uriba', vi: 'quầy bán hàng', emoji: '🛍️' },
          ],
          grammar: {
            title: 'いくらですか / どこの N',
            points: [
              'Hỏi giá: <b>N は いくらですか</b>.',
              'Hỏi nơi sản xuất: <b>どこの N ですか</b> (N của nước / công ty nào?) – trả lời: <b>(nước) の です</b>.',
              'Hỏi quê lịch sự: <b>お国は どちらですか</b>.',
              'Số: 百 (hyaku), 千 (sen), 万 (man). Chú ý biến âm: 三百 <b>sanbyaku</b>, 六百 <b>roppyaku</b>, 八百 <b>happyaku</b>, 三千 <b>sanzen</b>, 八千 <b>hassen</b>.',
            ],
            examples: [
              { ja: 'デパートは あそこです。', romaji: 'depāto wa asoko desu.', vi: 'Cửa hàng bách hoá ở đằng kia.' },
              { ja: 'この ワインは 一万円です。', kana: 'この ワインは いちまんえんです。', romaji: 'kono wain wa ichiman en desu.', vi: 'Chai rượu vang này giá 10.000 yên.' },
            ],
          },
          sentences: [
            { ja: 'この 靴は いくらですか。', kana: 'この くつは いくらですか。', romaji: 'kono kutsu wa ikura desu ka.', vi: 'Đôi giày này bao nhiêu tiền?' },
            { ja: '三千円です。', kana: 'さんぜんえんです。', romaji: 'sanzen en desu.', vi: 'Ba nghìn yên.' },
            { ja: 'これは どこの ワインですか。', romaji: 'kore wa doko no wain desu ka.', vi: 'Đây là rượu vang của nước nào?' },
            { ja: 'フランスの ワインです。', romaji: 'Furansu no wain desu.', vi: 'Là rượu vang Pháp.' },
            { ja: 'ネクタイ売り場は 二階です。', kana: 'ネクタイうりばは にかいです。', romaji: 'nekutai uriba wa nikai desu.', vi: 'Quầy cà vạt ở tầng hai.' },
            { ja: 'お国は どちらですか。', kana: 'おくには どちらですか。', romaji: 'okuni wa dochira desu ka.', vi: 'Quê bạn ở nước nào ạ?' },
          ],
          reading: {
            title: 'Ở cửa hàng bách hoá',
            text: 'ラン：すみません。ネクタイ売り場は どこですか。\n店員：二階です。\n（二階で）\nラン：この ネクタイは いくらですか。\n店員：五千円です。\nラン：どこの ネクタイですか。\n店員：イタリアのです。',
            kana: 'ラン：すみません。ネクタイうりばは どこですか。\nてんいん：にかいです。\n（にかいで）\nラン：この ネクタイは いくらですか。\nてんいん：ごせんえんです。\nラン：どこの ネクタイですか。\nてんいん：イタリアのです。',
            vi: 'Lan: Xin lỗi. Quầy cà vạt ở đâu ạ?\nNhân viên: Ở tầng hai.\n(Ở tầng hai)\nLan: Chiếc cà vạt này bao nhiêu tiền?\nNhân viên: 5.000 yên.\nLan: Cà vạt của nước nào vậy?\nNhân viên: Của Ý ạ.',
            questions: [
              { q: 'Quầy cà vạt ở tầng mấy?', options: ['Tầng hai', 'Tầng một', 'Tầng ba', 'Tầng năm'], answer: 0 },
              { q: 'Chiếc cà vạt giá bao nhiêu?', options: ['5.000 yên', '500 yên', '3.000 yên', '50.000 yên'], answer: 0 },
              { q: 'Chiếc cà vạt là hàng của nước nào?', options: ['Ý', 'Pháp', 'Nhật Bản', 'Việt Nam'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: 'この ワインは ___ですか。—二千円です。', options: ['いくら', 'どこ', '何'], answer: 0, vi: 'Chai rượu này bao nhiêu tiền? — 2.000 yên.' },
              { q: 'これは ___の 時計ですか。—スイスのです。', options: ['どこ', 'いくら', 'だれ'], answer: 0, vi: 'Đây là đồng hồ của nước nào? — Của Thụy Sĩ.' },
              { pick: true, options: ['三百円です。', '三百円を です。', '三百の 円です。'], answer: 0, vi: 'Ba trăm yên.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền từ để hỏi', before: 'お国は ', after: 'ですか。', answer: 'どちら', hint: '(ở đâu – lịch sự)', vi: 'Quê bạn ở nước nào ạ?' },
              { type: 'correct', wrong: 'これ 靴は いくらですか。', answer: 'この 靴は いくらですか。', kana: 'この くつは いくらですか。', vi: 'Đôi giày này bao nhiêu tiền?' },
            ],
          },
        },
      ],
    },

    // ───────────────────────── BÀI 4 ─────────────────────────
    {
      id: 'b4', title: 'Mấy giờ rồi?', titleEn: '今 何時ですか', icon: '⏰',
      goal: 'Nói giờ, giờ mở cửa; kể việc hằng ngày với động từ ます.',
      lessons: [
        {
          id: 'b4l1', title: 'Giờ giấc', titleEn: '〜時〜分', icon: '🕘',
          goal: 'Hỏi giờ, nói giờ mở và đóng cửa với 〜から〜まで.',
          vocab: [
            { ja: '今', kana: 'いま', romaji: 'ima', vi: 'bây giờ', emoji: '⏱️' },
            { ja: '何時', kana: 'なんじ', romaji: 'nanji', vi: 'mấy giờ', emoji: '🕐' },
            { ja: '何分', kana: 'なんぷん', romaji: 'nanpun', vi: 'mấy phút', emoji: '⏲️' },
            { ja: '半', kana: 'はん', romaji: 'han', vi: 'rưỡi (30 phút)', emoji: '🕧' },
            { ja: '午前', kana: 'ごぜん', romaji: 'gozen', vi: 'sáng (trước 12 giờ trưa)', emoji: '🌅' },
            { ja: '午後', kana: 'ごご', romaji: 'gogo', vi: 'chiều (sau 12 giờ trưa)', emoji: '🌇' },
            { ja: '朝', kana: 'あさ', romaji: 'asa', vi: 'buổi sáng', emoji: '☀️' },
            { ja: '晩', kana: 'ばん', romaji: 'ban', vi: 'buổi tối', emoji: '🌙' },
            { ja: '昼休み', kana: 'ひるやすみ', romaji: 'hiruyasumi', vi: 'nghỉ trưa', emoji: '🍙' },
            { ja: '銀行', kana: 'ぎんこう', romaji: 'ginkō', vi: 'ngân hàng', emoji: '🏦' },
            { ja: '郵便局', kana: 'ゆうびんきょく', romaji: 'yūbinkyoku', vi: 'bưu điện', emoji: '🏤' },
            { ja: '何曜日', kana: 'なんようび', romaji: "nan'yōbi", vi: 'thứ mấy', emoji: '📅' },
          ],
          grammar: {
            title: '今 〜時〜分です / 〜から〜まで',
            points: [
              'Nói giờ: <b>今 〜時〜分です</b>. Chú ý: 4 giờ = <b>よじ</b>, 7 giờ = <b>しちじ</b>, 9 giờ = <b>くじ</b>.',
              '<b>半</b> = rưỡi: 九時半 (9 giờ rưỡi). <b>午前 / 午後</b> đứng trước giờ: 午後 三時.',
              '<b>〜から〜まで</b> = từ … đến …: 九時から 五時まで.',
              'Hỏi thứ: <b>今日は 何曜日ですか</b> (Hôm nay thứ mấy?).',
            ],
            examples: [
              { ja: '今 午後 四時です。', kana: 'いま ごご よじです。', romaji: 'ima gogo yoji desu.', vi: 'Bây giờ là 4 giờ chiều.' },
              { ja: 'デパートは 十時から 八時までです。', kana: 'デパートは じゅうじから はちじまでです。', romaji: 'depāto wa jūji kara hachiji made desu.', vi: 'Cửa hàng bách hoá mở từ 10 giờ đến 8 giờ.' },
            ],
          },
          sentences: [
            { ja: '今 何時ですか。', kana: 'いま なんじですか。', romaji: 'ima nanji desu ka.', vi: 'Bây giờ là mấy giờ?' },
            { ja: '午前 九時半です。', kana: 'ごぜん くじはんです。', romaji: 'gozen kuji han desu.', vi: '9 giờ rưỡi sáng.' },
            { ja: '銀行は 九時から 三時までです。', kana: 'ぎんこうは くじから さんじまでです。', romaji: 'ginkō wa kuji kara sanji made desu.', vi: 'Ngân hàng mở từ 9 giờ đến 3 giờ.' },
            { ja: '昼休みは 十二時から 一時までです。', kana: 'ひるやすみは じゅうにじから いちじまでです。', romaji: 'hiruyasumi wa jūniji kara ichiji made desu.', vi: 'Nghỉ trưa từ 12 giờ đến 1 giờ.' },
            { ja: '郵便局は 何時までですか。', kana: 'ゆうびんきょくは なんじまでですか。', romaji: 'yūbinkyoku wa nanji made desu ka.', vi: 'Bưu điện mở đến mấy giờ?' },
            { ja: '今日は 何曜日ですか。', kana: 'きょうは なんようびですか。', romaji: "kyō wa nan'yōbi desu ka.", vi: 'Hôm nay là thứ mấy?' },
          ],
          reading: {
            title: 'Gọi điện hỏi giờ mở cửa',
            text: 'ラン：もしもし、みどり図書館ですか。\n係：はい、そうです。\nラン：すみません、何時から 何時までですか。\n係：九時から 六時までです。\nラン：休みは 何曜日ですか。\n係：月曜日です。',
            kana: 'ラン：もしもし、みどりとしょかんですか。\nかかり：はい、そうです。\nラン：すみません、なんじから なんじまでですか。\nかかり：くじから ろくじまでです。\nラン：やすみは なんようびですか。\nかかり：げつようびです。',
            vi: 'Lan: A lô, có phải thư viện Midori không ạ?\nNhân viên: Vâng, đúng vậy.\nLan: Xin lỗi, thư viện mở cửa từ mấy giờ đến mấy giờ ạ?\nNhân viên: Từ 9 giờ đến 6 giờ.\nLan: Ngày nghỉ là thứ mấy ạ?\nNhân viên: Thứ Hai.',
            questions: [
              { q: 'Thư viện mở cửa từ mấy giờ?', options: ['9 giờ', '6 giờ', '10 giờ', '8 giờ'], answer: 0 },
              { q: 'Thư viện đóng cửa lúc mấy giờ?', options: ['6 giờ', '9 giờ', '5 giờ', '7 giờ'], answer: 0 },
              { q: 'Thư viện nghỉ vào thứ mấy?', options: ['Thứ Hai', 'Chủ nhật', 'Thứ Bảy', 'Thứ Ba'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '銀行は 九時___ 三時までです。', options: ['から', 'まで', 'に'], answer: 0, vi: 'Ngân hàng mở từ 9 giờ đến 3 giờ.' },
              { q: '今 ___ですか。—二時です。', options: ['何時', 'いくら', 'どこ'], answer: 0, vi: 'Bây giờ là mấy giờ? — 2 giờ.' },
              { pick: true, options: ['午後 七時半です。', '七時半 午後です。', '午後の 七時を 半です。'], answer: 0, vi: '7 giờ rưỡi tối.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền trợ từ thích hợp', before: '昼休みは 十二時から 一時', after: 'です。', answer: 'まで', hint: '(đến)', vi: 'Nghỉ trưa từ 12 giờ đến 1 giờ.' },
              { type: 'correct', wrong: '銀行は 九時まで 三時からです。', answer: '銀行は 九時から 三時までです。', kana: 'ぎんこうは くじから さんじまでです。', vi: 'Ngân hàng mở từ 9 giờ đến 3 giờ.' },
            ],
          },
        },
        {
          id: 'b4l2', title: 'Tôi dậy lúc 6 giờ', titleEn: '〜ます・〜ました', icon: '🛏️',
          goal: 'Kể việc hằng ngày, hôm qua, ngày mai với động từ ます.',
          vocab: [
            { ja: '起きます', kana: 'おきます', romaji: 'okimasu', vi: 'thức dậy', emoji: '⏰' },
            { ja: '寝ます', kana: 'ねます', romaji: 'nemasu', vi: 'đi ngủ', emoji: '😴' },
            { ja: '働きます', kana: 'はたらきます', romaji: 'hatarakimasu', vi: 'làm việc', emoji: '💼' },
            { ja: '休みます', kana: 'やすみます', romaji: 'yasumimasu', vi: 'nghỉ ngơi', emoji: '🛋️' },
            { ja: '勉強します', kana: 'べんきょうします', romaji: 'benkyō shimasu', vi: 'học bài', emoji: '📚' },
            { ja: '終わります', kana: 'おわります', romaji: 'owarimasu', vi: 'kết thúc', emoji: '🏁' },
            { ja: '毎朝', kana: 'まいあさ', romaji: 'maiasa', vi: 'mỗi sáng', emoji: '🌄' },
            { ja: '毎晩', kana: 'まいばん', romaji: 'maiban', vi: 'mỗi tối', emoji: '🌃' },
            { ja: '毎日', kana: 'まいにち', romaji: 'mainichi', vi: 'mỗi ngày', emoji: '📆' },
            { ja: '昨日', kana: 'きのう', romaji: 'kinō', vi: 'hôm qua', emoji: '⏪' },
            { ja: '明日', kana: 'あした', romaji: 'ashita', vi: 'ngày mai', emoji: '⏩' },
            { ja: '試験', kana: 'しけん', romaji: 'shiken', vi: 'kỳ thi', emoji: '📝' },
          ],
          grammar: {
            title: 'V ます / ません / ました / ませんでした',
            points: [
              '<b>V ます</b>: hiện tại, thói quen hoặc tương lai (lịch sự). <b>V ません</b>: phủ định.',
              '<b>V ました</b>: quá khứ. <b>V ませんでした</b>: quá khứ phủ định.',
              'Thời điểm cụ thể + <b>に</b>: 六時<b>に</b> 起きます, 日曜日<b>に</b> 休みます.',
              'Không dùng に với 毎朝, 毎日, 今日, 明日, 昨日…: 明日 働きます (không nói 明日に).',
            ],
            examples: [
              { ja: '昨日 休みました。', kana: 'きのう やすみました。', romaji: 'kinō yasumimashita.', vi: 'Hôm qua tôi đã nghỉ.' },
              { ja: '毎日 働きます。', kana: 'まいにち はたらきます。', romaji: 'mainichi hatarakimasu.', vi: 'Tôi làm việc mỗi ngày.' },
            ],
          },
          sentences: [
            { ja: '私は 毎朝 六時に 起きます。', kana: 'わたしは まいあさ ろくじに おきます。', romaji: 'watashi wa maiasa rokuji ni okimasu.', vi: 'Mỗi sáng tôi dậy lúc 6 giờ.' },
            { ja: '毎晩 十一時に 寝ます。', kana: 'まいばん じゅういちじに ねます。', romaji: 'maiban jūichiji ni nemasu.', vi: 'Mỗi tối tôi ngủ lúc 11 giờ.' },
            { ja: '昨日 勉強しませんでした。', kana: 'きのう べんきょうしませんでした。', romaji: 'kinō benkyō shimasen deshita.', vi: 'Hôm qua tôi đã không học.' },
            { ja: '明日 働きますか。', kana: 'あした はたらきますか。', romaji: 'ashita hatarakimasu ka.', vi: 'Ngày mai bạn có làm việc không?' },
            { ja: 'いいえ、働きません。', kana: 'いいえ、はたらきません。', romaji: 'iie, hatarakimasen.', vi: 'Không, tôi không làm việc.' },
            { ja: '試験は 何時に 終わりますか。', kana: 'しけんは なんじに おわりますか。', romaji: 'shiken wa nanji ni owarimasu ka.', vi: 'Kỳ thi kết thúc lúc mấy giờ?' },
          ],
          reading: {
            title: 'Một ngày của Lan',
            text: 'ランさんは 毎朝 六時に 起きます。\n九時から 五時まで 働きます。\n毎晩 十一時に 寝ます。\n昨日 ランさんは 休みました。働きませんでした。',
            kana: 'ランさんは まいあさ ろくじに おきます。\nくじから ごじまで はたらきます。\nまいばん じゅういちじに ねます。\nきのう ランさんは やすみました。はたらきませんでした。',
            vi: 'Mỗi sáng Lan dậy lúc 6 giờ.\nCô ấy làm việc từ 9 giờ đến 5 giờ.\nMỗi tối cô ấy ngủ lúc 11 giờ.\nHôm qua Lan đã nghỉ. Cô ấy không đi làm.',
            questions: [
              { q: 'Lan dậy lúc mấy giờ?', options: ['6 giờ', '9 giờ', '5 giờ', '11 giờ'], answer: 0 },
              { q: 'Lan làm việc đến mấy giờ?', options: ['5 giờ', '6 giờ', '9 giờ', '11 giờ'], answer: 0 },
              { q: 'Hôm qua Lan đã làm gì?', options: ['Nghỉ ngơi', 'Đi làm', 'Đi học', 'Đi thi'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '毎朝 六時___ 起きます。', options: ['に', 'を', 'で'], answer: 0, vi: 'Mỗi sáng tôi dậy lúc 6 giờ.' },
              { q: '昨日 勉強___。', options: ['しませんでした', 'しません', 'します'], answer: 0, vi: 'Hôm qua tôi đã không học.' },
              { pick: true, options: ['明日 働きますか。', '明日に 働きますか。', '明日 働きましたか。'], answer: 0, vi: 'Ngày mai bạn có làm việc không?' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Chia động từ trong ngoặc', before: '昨日 ', after: '。', answer: '休みました', reading: 'やすみました', hint: '(休みます → quá khứ)', vi: 'Hôm qua tôi đã nghỉ.' },
              { type: 'correct', wrong: '毎晩 十一時を 寝ます。', answer: '毎晩 十一時に 寝ます。', kana: 'まいばん じゅういちじに ねます。', vi: 'Mỗi tối tôi ngủ lúc 11 giờ.' },
            ],
          },
        },
      ],
    },

    // ───────────────────────── BÀI 5 ─────────────────────────
    {
      id: 'b5', title: 'Đi đâu?', titleEn: 'どこへ 行きますか', icon: '🚃',
      goal: 'Nói đi đâu, khi nào, bằng phương tiện gì, với ai.',
      lessons: [
        {
          id: 'b5l1', title: 'Đi, đến, về', titleEn: '行きます・来ます・帰ります', icon: '🧳',
          goal: 'Dùng (nơi) へ 行きます / 来ます / 帰ります và いつ.',
          vocab: [
            { ja: '行きます', kana: 'いきます', romaji: 'ikimasu', vi: 'đi', emoji: '🚶' },
            { ja: '来ます', kana: 'きます', romaji: 'kimasu', vi: 'đến', emoji: '🛬' },
            { ja: '帰ります', kana: 'かえります', romaji: 'kaerimasu', vi: 'về', emoji: '🏠' },
            { ja: '学校', kana: 'がっこう', romaji: 'gakkō', vi: 'trường học', emoji: '🏫' },
            { ja: 'スーパー', romaji: 'sūpā', vi: 'siêu thị', emoji: '🛒' },
            { ja: '駅', kana: 'えき', romaji: 'eki', vi: 'nhà ga', emoji: '🚉' },
            { ja: '京都', kana: 'きょうと', romaji: 'Kyōto', vi: 'Kyoto', emoji: '⛩️' },
            { ja: '先週', kana: 'せんしゅう', romaji: 'senshū', vi: 'tuần trước', emoji: '⬅️' },
            { ja: '来週', kana: 'らいしゅう', romaji: 'raishū', vi: 'tuần sau', emoji: '➡️' },
            { ja: '去年', kana: 'きょねん', romaji: 'kyonen', vi: 'năm ngoái', emoji: '⏮️' },
            { ja: '来年', kana: 'らいねん', romaji: 'rainen', vi: 'năm sau', emoji: '⏭️' },
            { ja: 'いつ', romaji: 'itsu', vi: 'khi nào', emoji: '🗓️' },
          ],
          grammar: {
            title: '(nơi) へ 行きます / 来ます / 帰ります',
            points: [
              '<b>(nơi) へ 行きます / 来ます / 帰ります</b>: đi / đến / về đâu. Trợ từ <b>へ</b> đọc là <b>e</b>.',
              'Không đi đâu cả: <b>どこ(へ)も 行きません</b> (dùng với động từ phủ định).',
              'Hỏi thời gian: <b>いつ</b> (khi nào) – không thêm に.',
              'Thời gian tương đối như 先週, 来年, 去年 cũng không dùng に.',
            ],
            examples: [
              { ja: 'スーパーへ 行きます。', kana: 'スーパーへ いきます。', romaji: 'sūpā e ikimasu.', vi: 'Tôi đi siêu thị.' },
              { ja: '去年 日本へ 来ました。', kana: 'きょねん にほんへ きました。', romaji: 'kyonen Nihon e kimashita.', vi: 'Năm ngoái tôi đã đến Nhật.' },
            ],
          },
          sentences: [
            { ja: '明日 京都へ 行きます。', kana: 'あした きょうとへ いきます。', romaji: 'ashita Kyōto e ikimasu.', vi: 'Ngày mai tôi đi Kyoto.' },
            { ja: '先週 日本へ 来ました。', kana: 'せんしゅう にほんへ きました。', romaji: 'senshū Nihon e kimashita.', vi: 'Tuần trước tôi đã đến Nhật.' },
            { ja: '何時に うちへ 帰りますか。', kana: 'なんじに うちへ かえりますか。', romaji: 'nanji ni uchi e kaerimasu ka.', vi: 'Mấy giờ bạn về nhà?' },
            { ja: 'いつ ベトナムへ 帰りますか。', kana: 'いつ ベトナムへ かえりますか。', romaji: 'itsu Betonamu e kaerimasu ka.', vi: 'Khi nào bạn về Việt Nam?' },
            { ja: '来年 帰ります。', kana: 'らいねん かえります。', romaji: 'rainen kaerimasu.', vi: 'Năm sau tôi về.' },
            { ja: '昨日 どこも 行きませんでした。', kana: 'きのう どこも いきませんでした。', romaji: 'kinō doko mo ikimasen deshita.', vi: 'Hôm qua tôi không đi đâu cả.' },
          ],
          reading: {
            title: 'Kế hoạch tuần sau',
            text: '田中：ランさん、来週 どこへ 行きますか。\nラン：京都へ 行きます。\n田中：いいですね。いつ 帰りますか。\nラン：日曜日に 帰ります。',
            kana: 'たなか：ランさん、らいしゅう どこへ いきますか。\nラン：きょうとへ いきます。\nたなか：いいですね。いつ かえりますか。\nラン：にちようびに かえります。',
            vi: 'Tanaka: Lan ơi, tuần sau em đi đâu?\nLan: Em đi Kyoto ạ.\nTanaka: Hay nhỉ. Khi nào em về?\nLan: Chủ nhật em về ạ.',
            questions: [
              { q: 'Tuần sau Lan đi đâu?', options: ['Kyoto', 'Tokyo', 'Osaka', 'Việt Nam'], answer: 0 },
              { q: 'Lan về vào ngày nào?', options: ['Chủ nhật', 'Thứ Bảy', 'Thứ Hai', 'Thứ Sáu'], answer: 0 },
              { q: '"いいですね" thể hiện điều gì?', options: ['Khen: hay nhỉ', 'Hỏi giờ', 'Xin lỗi', 'Từ chối'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '明日 京都___ 行きます。', options: ['へ', 'を', 'で'], answer: 0, vi: 'Ngày mai tôi đi Kyoto.' },
              { q: '___ ベトナムへ 帰りますか。—来年 帰ります。', options: ['いつ', 'どこ', 'だれ'], answer: 0, vi: 'Khi nào bạn về Việt Nam? — Năm sau tôi về.' },
              { pick: true, options: ['昨日 どこも 行きませんでした。', '昨日 どこも 行きました。', '昨日 どこへ 行きませんでした。'], answer: 0, vi: 'Hôm qua tôi không đi đâu cả.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Chia động từ trong ngoặc', before: '先週 日本へ ', after: '。', answer: '来ました', reading: 'きました', hint: '(来ます → quá khứ)', vi: 'Tuần trước tôi đã đến Nhật.' },
              { type: 'correct', wrong: '来年に 帰ります。', answer: '来年 帰ります。', kana: 'らいねん かえります。', vi: 'Năm sau tôi về.' },
            ],
          },
        },
        {
          id: 'b5l2', title: 'Đi bằng gì? Với ai?', titleEn: '〜で・〜と', icon: '🚌',
          goal: 'Nói phương tiện đi lại và người đi cùng.',
          vocab: [
            { ja: '電車', kana: 'でんしゃ', romaji: 'densha', vi: 'tàu điện', emoji: '🚆' },
            { ja: 'バス', romaji: 'basu', vi: 'xe buýt', emoji: '🚌' },
            { ja: '飛行機', kana: 'ひこうき', romaji: 'hikōki', vi: 'máy bay', emoji: '✈️' },
            { ja: '自転車', kana: 'じてんしゃ', romaji: 'jitensha', vi: 'xe đạp', emoji: '🚲' },
            { ja: '地下鉄', kana: 'ちかてつ', romaji: 'chikatetsu', vi: 'tàu điện ngầm', emoji: '🚇' },
            { ja: 'タクシー', romaji: 'takushī', vi: 'taxi', emoji: '🚕' },
            { ja: '歩いて', kana: 'あるいて', romaji: 'aruite', vi: 'đi bộ', emoji: '🚶' },
            { ja: '一人で', kana: 'ひとりで', romaji: 'hitori de', vi: 'một mình', emoji: '🧍' },
            { ja: '家族', kana: 'かぞく', romaji: 'kazoku', vi: 'gia đình', emoji: '👨‍👩‍👧' },
            { ja: '誕生日', kana: 'たんじょうび', romaji: 'tanjōbi', vi: 'sinh nhật', emoji: '🎂' },
            { ja: '何で', kana: 'なんで', romaji: 'nan de', vi: 'bằng gì', emoji: '❓' },
            { ja: '彼女', kana: 'かのじょ', romaji: 'kanojo', vi: 'cô ấy, bạn gái', emoji: '👩' },
          ],
          grammar: {
            title: '(phương tiện) で / (người) と',
            points: [
              'Phương tiện + <b>で</b>: 電車<b>で</b> 行きます (đi bằng tàu điện). Hỏi: <b>何で</b> 行きますか.',
              'Đi bộ: <b>歩いて</b> 行きます (không có で).',
              'Người + <b>と</b> = cùng với: 家族<b>と</b> 行きます. Hỏi: <b>だれと</b>.',
              'Một mình: <b>一人で</b> (không dùng と).',
            ],
            examples: [
              { ja: 'バスで 駅へ 行きます。', kana: 'バスで えきへ いきます。', romaji: 'basu de eki e ikimasu.', vi: 'Tôi đi đến ga bằng xe buýt.' },
              { ja: '彼女と 来ました。', kana: 'かのじょと きました。', romaji: 'kanojo to kimashita.', vi: 'Tôi đã đến cùng cô ấy.' },
            ],
          },
          sentences: [
            { ja: '電車で 会社へ 行きます。', kana: 'でんしゃで かいしゃへ いきます。', romaji: 'densha de kaisha e ikimasu.', vi: 'Tôi đi làm bằng tàu điện.' },
            { ja: '何で 学校へ 来ましたか。', kana: 'なんで がっこうへ きましたか。', romaji: 'nan de gakkō e kimashita ka.', vi: 'Bạn đã đến trường bằng gì?' },
            { ja: '歩いて 帰ります。', kana: 'あるいて かえります。', romaji: 'aruite kaerimasu.', vi: 'Tôi đi bộ về.' },
            { ja: '家族と 京都へ 行きました。', kana: 'かぞくと きょうとへ いきました。', romaji: 'kazoku to Kyōto e ikimashita.', vi: 'Tôi đã đi Kyoto cùng gia đình.' },
            { ja: '一人で 東京へ 来ました。', kana: 'ひとりで とうきょうへ きました。', romaji: 'hitori de Tōkyō e kimashita.', vi: 'Tôi đã đến Tokyo một mình.' },
            { ja: '誕生日は いつですか。', kana: 'たんじょうびは いつですか。', romaji: 'tanjōbi wa itsu desu ka.', vi: 'Sinh nhật bạn là khi nào?' },
          ],
          reading: {
            title: 'Về quê dịp Tết',
            text: '鈴木：ランさん、ベトナムへ 何で 帰りますか。\nラン：飛行機で 帰ります。\n鈴木：一人で 帰りますか。\nラン：いいえ、友達と 帰ります。\n鈴木：空港まで 何で 行きますか。\nラン：電車で 行きます。',
            kana: 'すずき：ランさん、ベトナムへ なんで かえりますか。\nラン：ひこうきで かえります。\nすずき：ひとりで かえりますか。\nラン：いいえ、ともだちと かえります。\nすずき：くうこうまで なんで いきますか。\nラン：でんしゃで いきます。',
            vi: 'Suzuki: Lan ơi, em về Việt Nam bằng gì?\nLan: Em về bằng máy bay ạ.\nSuzuki: Em về một mình à?\nLan: Không ạ, em về cùng bạn.\nSuzuki: Em đến sân bay bằng gì?\nLan: Em đi bằng tàu điện ạ.',
            questions: [
              { q: 'Lan về Việt Nam bằng gì?', options: ['Máy bay', 'Tàu điện', 'Xe buýt', 'Tàu thuỷ'], answer: 0 },
              { q: 'Lan về cùng ai?', options: ['Bạn', 'Gia đình', 'Một mình', 'Chị Suzuki'], answer: 0 },
              { q: 'Lan đến sân bay bằng gì?', options: ['Tàu điện', 'Taxi', 'Xe đạp', 'Đi bộ'], answer: 0 },
            ],
          },
          quiz: {
            mcq: [
              { q: '電車___ 会社へ 行きます。', options: ['で', 'と', 'へ'], answer: 0, vi: 'Tôi đi làm bằng tàu điện.' },
              { q: '友達___ 京都へ 行きました。', options: ['と', 'を', 'へ'], answer: 0, vi: 'Tôi đã đi Kyoto cùng bạn.' },
              { pick: true, options: ['歩いて 帰ります。', '歩いてで 帰ります。', '歩くで 帰ります。'], answer: 0, vi: 'Tôi đi bộ về.' },
            ],
            write: [
              { type: 'form', prompt: 'Tự luận · Điền trợ từ thích hợp', before: 'バス', after: ' 駅へ 行きます。', answer: 'で', hint: '(bằng)', vi: 'Tôi đi đến ga bằng xe buýt.' },
              { type: 'correct', wrong: '一人と 東京へ 来ました。', answer: '一人で 東京へ 来ました。', kana: 'ひとりで とうきょうへ きました。', vi: 'Tôi đã đến Tokyo một mình.' },
            ],
          },
        },
      ],
    },
  ],
});
