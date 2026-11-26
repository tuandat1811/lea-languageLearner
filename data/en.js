/*
 * Khoá học Tiếng Anh cho người mới bắt đầu (A0 → A1), giao diện tiếng Việt.
 *
 * Cấu trúc một bài (lesson):
 *   vocab:     [{ en, vi, ipa, emoji, alts? }]       – từ vựng (alts: đáp án chấp nhận thêm)
 *   grammar:   { title, points: [html], examples: [{ en, vi }] }
 *   sentences: [{ en, vi, alts? }]                   – ít nhất 5 câu mẫu
 *   reading:   { title, text, vi, questions: [{ q, options, answer }] }
 * Bài tập Nghe – Nói – Đọc – Viết được sinh tự động từ dữ liệu này (js/core/exercises.js).
 */
LEA.registerLanguage({
  code: 'en',
  name: 'Tiếng Anh',
  nativeName: 'English',
  flag: '🇬🇧',
  speechLang: 'en-US',
  level: 'A0 → A2',
  tagline: 'Từ con số 0 đến giao tiếp hằng ngày',
  description:
    'Lộ trình 20 chặng, 40 bài học (Cấp 1 – 2) dành cho người chưa biết gì về tiếng Anh. Mỗi bài có từ vựng, ngữ pháp và luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết.',

  // Viết tắt được mở rộng trước khi so sánh đáp án (I'm = I am ...).
  contractions: {
    "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
    "we're": 'we are', "they're": 'they are', "don't": 'do not', "doesn't": 'does not',
    "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "let's": 'let us',
    "what's": 'what is', "where's": 'where is', "there's": 'there is', "that's": 'that is',
    "i'd": 'i would', "name's": 'name is',
  },
  // Không hiểu "were" là "we're" khi người học gõ thiếu dấu nháy.
  noLooseContractions: ['were'],
  // Từ tương đương (máy nhận giọng nói hay trả về chữ số hoặc từ đồng âm).
  equivalents: {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
    '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
    '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen', '18': 'eighteen',
    '19': 'nineteen', '20': 'twenty', '30': 'thirty',
    to: 'two', too: 'two', for: 'four', won: 'one', ok: 'okay', mum: 'mom', mommy: 'mom', daddy: 'dad',
    color: 'colour', grey: 'gray',
  },

  alphabet: [
    { letter: 'A', ipa: '/eɪ/', word: 'apple', vi: 'quả táo', emoji: '🍎' },
    { letter: 'B', ipa: '/biː/', word: 'ball', vi: 'quả bóng', emoji: '⚽' },
    { letter: 'C', ipa: '/siː/', word: 'cat', vi: 'con mèo', emoji: '🐱' },
    { letter: 'D', ipa: '/diː/', word: 'dog', vi: 'con chó', emoji: '🐶' },
    { letter: 'E', ipa: '/iː/', word: 'egg', vi: 'quả trứng', emoji: '🥚' },
    { letter: 'F', ipa: '/ef/', word: 'fish', vi: 'con cá', emoji: '🐟' },
    { letter: 'G', ipa: '/dʒiː/', word: 'gift', vi: 'món quà', emoji: '🎁' },
    { letter: 'H', ipa: '/eɪtʃ/', word: 'hat', vi: 'cái mũ', emoji: '🎩' },
    { letter: 'I', ipa: '/aɪ/', word: 'ice cream', vi: 'kem', emoji: '🍦' },
    { letter: 'J', ipa: '/dʒeɪ/', word: 'juice', vi: 'nước ép', emoji: '🧃' },
    { letter: 'K', ipa: '/keɪ/', word: 'kite', vi: 'con diều', emoji: '🪁' },
    { letter: 'L', ipa: '/el/', word: 'lion', vi: 'sư tử', emoji: '🦁' },
    { letter: 'M', ipa: '/em/', word: 'milk', vi: 'sữa', emoji: '🥛' },
    { letter: 'N', ipa: '/en/', word: 'nose', vi: 'cái mũi', emoji: '👃' },
    { letter: 'O', ipa: '/oʊ/', word: 'orange', vi: 'quả cam', emoji: '🍊' },
    { letter: 'P', ipa: '/piː/', word: 'pen', vi: 'cây bút', emoji: '🖊️' },
    { letter: 'Q', ipa: '/kjuː/', word: 'queen', vi: 'nữ hoàng', emoji: '👑' },
    { letter: 'R', ipa: '/ɑːr/', word: 'reindeer', vi: 'tuần lộc', emoji: '🦌' },
    { letter: 'S', ipa: '/es/', word: 'star', vi: 'ngôi sao', emoji: '⭐' },
    { letter: 'T', ipa: '/tiː/', word: 'tree', vi: 'cái cây', emoji: '🎄' },
    { letter: 'U', ipa: '/juː/', word: 'umbrella', vi: 'cái ô', emoji: '☂️' },
    { letter: 'V', ipa: '/viː/', word: 'violin', vi: 'đàn vi-ô-lông', emoji: '🎻' },
    { letter: 'W', ipa: '/ˈdʌbəl juː/', word: 'water', vi: 'nước', emoji: '💧' },
    { letter: 'X', ipa: '/eks/', word: 'fox', vi: 'con cáo', emoji: '🦊' },
    { letter: 'Y', ipa: '/waɪ/', word: 'yellow', vi: 'màu vàng', emoji: '💛' },
    { letter: 'Z', ipa: '/ziː/', word: 'zebra', vi: 'ngựa vằn', emoji: '🦓' },
  ],

  /*
   * Giáo trình 4 cấp độ (A0 → B2). Thứ tự chủ điểm ngữ pháp đi từ cơ bản đến nâng cao,
   * tham khảo bố cục của tài liệu "Ngữ pháp tiếng Anh cơ bản" (xem docs/giao-trinh.md).
   * Cấp có status 'available' dùng các units bên dưới; cấp 'planned' mới có đề cương.
   */
  syllabus: [
    {
      id: 'L1', name: 'Cấp 1 · Nền tảng', cefr: 'A0 – A1', status: 'available', icon: '🌱',
      outcome: 'Chào hỏi, giới thiệu bản thân, nói về gia đình, đồ ăn, thói quen hằng ngày, thời gian và nhà cửa bằng câu đơn.',
      units: [
        { unit: 'u1', grammar: 'Lời chào theo buổi; thank you / sorry / excuse me / please' },
        { unit: 'u2', grammar: 'Động từ to be (am/is/are); đại từ chủ ngữ; tính từ sở hữu my/your' },
        { unit: 'u3', grammar: 'Danh từ số nhiều -s; have/has; How many? How old?' },
        { unit: 'u4', grammar: 'Tính từ đứng trước danh từ; a/an; this/that; What is this?' },
        { unit: 'u5', grammar: "Sở hữu cách 's; be + tính từ; phủ định với not; we/they" },
        { unit: 'u6', grammar: "like / don't like / likes; câu hỏi Do…?; Can I have…?" },
        { unit: 'u7', grammar: 'Thì hiện tại đơn; do/does; trạng từ tần suất always/often/never' },
        { unit: 'u8', grammar: "Giới từ thời gian on (ngày) / at (giờ); o'clock, half past" },
        { unit: 'u9', grammar: 'There is / There are; giới từ vị trí in/on/under/next to/behind' },
        { unit: 'u10', grammar: "Số nhiều bất quy tắc; thì hiện tại tiếp diễn; Let's…" },
      ],
    },
    {
      id: 'L2', name: 'Cấp 2 · Sơ cấp', cefr: 'A2', status: 'available', icon: '🌿',
      outcome: 'Kể chuyện đã xảy ra, nói về kế hoạch, so sánh, mua sắm, xin và cho lời khuyên.',
      units: [
        { unit: 'u11', grammar: 'Đại từ tân ngữ me/him/her/us/them; đại từ sở hữu mine/yours/hers; Whose…?' },
        { unit: 'u12', grammar: 'Danh từ đếm được & không đếm được; some/any; much/many/a lot of/a few/a little' },
        { unit: 'u13', grammar: "Mạo từ a/an và the; chỉ đường; câu mệnh lệnh Go/Turn/Don't…" },
        { unit: 'u14', grammar: "can / can't; like / love / enjoy / hate + V-ing" },
        { unit: 'u15', grammar: "should / shouldn't; must / mustn't; have to / don't have to" },
        { unit: 'u16', grammar: 'Quá khứ của be: was / were; was born; There was / There were' },
        { unit: 'u17', grammar: "Quá khứ đơn: động từ -ed và bất quy tắc; did / didn't; ago" },
        { unit: 'u18', grammar: "be going to (dự định); will / won't (dự đoán, lời hứa)" },
        { unit: 'u19', grammar: 'So sánh hơn -er/more; so sánh nhất -est/most; as…as; good–better–best' },
        { unit: 'u20', grammar: 'would like; lời mời; liên từ and / but / or / because / so' },
      ],
    },
    {
      id: 'L3', name: 'Cấp 3 · Tiền trung cấp', cefr: 'B1', status: 'planned', icon: '🌳',
      outcome: 'Kể lại trải nghiệm, giải thích nguyên nhân – kết quả, đặt giả thiết, mô tả người và vật chi tiết.',
      units: [
        { title: 'Trải nghiệm', grammar: 'Hiện tại hoàn thành; ever / never; already / yet / just' },
        { title: 'Bao lâu rồi?', grammar: 'for / since; hiện tại hoàn thành vs quá khứ đơn' },
        { title: 'Khi đang… thì…', grammar: 'Quá khứ tiếp diễn; when / while' },
        { title: 'Nếu…', grammar: 'Câu điều kiện loại 0 và loại 1; unless' },
        { title: 'Ngày xưa', grammar: 'used to + V; be / get used to + V-ing' },
        { title: 'Muốn làm & thích làm', grammar: 'Động từ + to V / V-ing; stop / remember / forget / try' },
        { title: 'Được làm bởi…', grammar: 'Câu bị động thì hiện tại và quá khứ; by / with' },
        { title: 'Người mà… vật mà…', grammar: 'Mệnh đề quan hệ who / which / that / whose' },
        { title: 'Hỏi cho lịch sự', grammar: 'Câu hỏi đuôi; câu hỏi gián tiếp Do you know where…?; so / neither' },
        { title: 'Cảm xúc & mức độ', grammar: 'Tính từ -ing / -ed; trạng từ cách thức -ly; too / enough' },
      ],
    },
    {
      id: 'L4', name: 'Cấp 4 · Trung cấp', cefr: 'B2', status: 'planned', icon: '🎄',
      outcome: 'Viết đoạn văn mạch lạc, tường thuật, lập luận, dùng câu phức và các cấu trúc nâng cao (nền tảng cho IELTS).',
      units: [
        { title: 'Thì hoàn thành nâng cao', grammar: 'Hiện tại hoàn thành tiếp diễn; quá khứ hoàn thành' },
        { title: 'Tương lai nâng cao', grammar: 'Tương lai tiếp diễn; tương lai hoàn thành; by the time' },
        { title: 'Giá như…', grammar: 'Câu điều kiện loại 2 và 3; wish; if only' },
        { title: 'Anh ấy nói rằng…', grammar: 'Câu tường thuật; say / tell; lùi thì' },
        { title: 'Nhờ người khác làm', grammar: 'Bị động nâng cao; have / get something done; make / let / help' },
        { title: 'Phỏng đoán quá khứ', grammar: 'must / might / could have + P2; should have + P2' },
        { title: 'Mặc dù…', grammar: 'although / despite / in spite of; so…that; such…that' },
        { title: 'Viết câu chuẩn', grammar: 'Hòa hợp chủ ngữ – động từ; cấu trúc song song; tránh thừa từ' },
        { title: 'Câu gọn gàng', grammar: 'Rút gọn mệnh đề quan hệ; V-ing / P2 mở đầu câu' },
        { title: 'Nhấn mạnh', grammar: 'Đảo ngữ Never / Hardly / Only…; câu giả định; would rather' },
      ],
    },
  ],

  units: [
    // ───────────────────────── CHẶNG 1 ─────────────────────────
    {
      id: 'u1', title: 'Chào hỏi', titleEn: 'Greetings', icon: '👋',
      goal: 'Chào hỏi, tạm biệt và nói lời lịch sự.',
      lessons: [
        {
          id: 'u1l1', title: 'Xin chào!', titleEn: 'Hello!', icon: '👋',
          goal: 'Chào nhau theo các thời điểm trong ngày.',
          vocab: [
            { en: 'hello', vi: 'xin chào', ipa: '/həˈloʊ/', emoji: '👋', alts: ['hi'] },
            { en: 'hi', vi: 'chào (thân mật)', ipa: '/haɪ/', emoji: '🙋', alts: ['hello'] },
            { en: 'goodbye', vi: 'tạm biệt', ipa: '/ɡʊdˈbaɪ/', emoji: '🚪', alts: ['bye'] },
            { en: 'bye', vi: 'tạm biệt (thân mật)', ipa: '/baɪ/', emoji: '✋', alts: ['goodbye'] },
            { en: 'good morning', vi: 'chào buổi sáng', ipa: '/ɡʊd ˈmɔːrnɪŋ/', emoji: '🌅' },
            { en: 'good afternoon', vi: 'chào buổi chiều', ipa: '/ɡʊd ˌæftərˈnuːn/', emoji: '🌤️' },
            { en: 'good evening', vi: 'chào buổi tối', ipa: '/ɡʊd ˈiːvnɪŋ/', emoji: '🌆' },
            { en: 'good night', vi: 'chúc ngủ ngon', ipa: '/ɡʊd naɪt/', emoji: '🌙' },
          ],
          grammar: {
            title: 'Chào theo thời gian trong ngày',
            points: [
              '<b>Hello</b> dùng được mọi lúc; <b>Hi</b> thân mật hơn, dùng với bạn bè.',
              '<b>Good morning</b> (buổi sáng), <b>Good afternoon</b> (từ trưa đến khoảng 6 giờ chiều), <b>Good evening</b> (buổi tối, khi gặp nhau).',
              '<b>Good night</b> KHÔNG dùng để chào khi gặp – chỉ dùng khi chia tay buổi tối hoặc trước khi đi ngủ.',
              'Tạm biệt: <b>Goodbye</b> (trang trọng), <b>Bye</b> (thân mật), <b>See you later</b> (hẹn gặp lại).',
            ],
            examples: [
              { en: 'Good morning, Mom!', vi: 'Chào buổi sáng mẹ!' },
              { en: 'Bye! See you later.', vi: 'Tạm biệt! Hẹn gặp lại.' },
            ],
          },
          sentences: [
            { en: 'Hello, Anna!', vi: 'Xin chào, Anna!', alts: ['Hi, Anna!'] },
            { en: 'Good morning, Mom.', vi: 'Chào buổi sáng mẹ.' },
            { en: 'Hi, Tom!', vi: 'Chào Tom!', alts: ['Hello, Tom!'] },
            { en: 'Goodbye, see you later.', vi: 'Tạm biệt, hẹn gặp lại sau.', alts: ['Bye, see you later.'] },
            { en: 'Good night, Dad.', vi: 'Chúc bố ngủ ngon.' },
            { en: 'Good evening, teacher.', vi: 'Chào buổi tối, cô giáo.' },
          ],
          reading: {
            title: 'Buổi sáng ở trường',
            text: 'Anna: Good morning, Tom!\nTom: Hi, Anna! Good morning.\nAnna: Goodbye, Tom. See you later!\nTom: Bye, Anna!',
            vi: 'Anna: Chào buổi sáng, Tom!\nTom: Chào Anna! Chào buổi sáng.\nAnna: Tạm biệt Tom. Hẹn gặp lại sau nhé!\nTom: Tạm biệt Anna!',
            questions: [
              { q: 'Anna và Tom gặp nhau vào buổi nào?', options: ['Buổi sáng', 'Buổi chiều', 'Buổi tối', 'Ban đêm'], answer: 0 },
              { q: 'Tom chào Anna bằng từ nào?', options: ['Hi', 'Good night', 'Sorry', 'Thank you'], answer: 0 },
              { q: '"See you later" nghĩa là gì?', options: ['Hẹn gặp lại sau', 'Chúc ngủ ngon', 'Xin lỗi', 'Cảm ơn'], answer: 0 },
            ],
          },
        },
        {
          id: 'u1l2', title: 'Lời nói lịch sự', titleEn: 'Polite words', icon: '🙏',
          goal: 'Nói cảm ơn, xin lỗi, làm ơn; trả lời có / không.',
          vocab: [
            { en: 'thank you', vi: 'cảm ơn', ipa: '/ˈθæŋk juː/', emoji: '🙏', alts: ['thanks'] },
            { en: 'please', vi: 'làm ơn, vui lòng', ipa: '/pliːz/', emoji: '🥺' },
            { en: 'sorry', vi: 'xin lỗi (khi làm sai)', ipa: '/ˈsɑːri/', emoji: '😔' },
            { en: 'excuse me', vi: 'xin lỗi (cho tôi hỏi)', ipa: '/ɪkˈskjuːz miː/', emoji: '🙋' },
            { en: "you're welcome", vi: 'không có gì', ipa: '/jʊr ˈwelkəm/', emoji: '😊' },
            { en: 'yes', vi: 'vâng, có', ipa: '/jes/', emoji: '✅' },
            { en: 'no', vi: 'không', ipa: '/noʊ/', emoji: '❌' },
            { en: 'okay', vi: 'được, đồng ý', ipa: '/oʊˈkeɪ/', emoji: '👌', alts: ['ok'] },
          ],
          grammar: {
            title: 'Cảm ơn, xin lỗi và làm ơn',
            points: [
              '<b>Thank you</b> = cảm ơn (lịch sự); <b>Thanks</b> = cảm ơn (thân mật). Đáp lại: <b>You\'re welcome</b>.',
              '<b>Sorry</b> dùng khi bạn làm sai; <b>Excuse me</b> dùng khi muốn hỏi, nhờ hoặc làm phiền ai đó.',
              '<b>Please</b> đặt ở đầu hoặc cuối câu để lịch sự hơn: <i>Water, please.</i>',
              'Trả lời lịch sự: <b>Yes, please.</b> (Vâng, cho tôi xin.) / <b>No, thank you.</b> (Không, cảm ơn.)',
            ],
            examples: [
              { en: 'Thank you! – You\'re welcome.', vi: 'Cảm ơn! – Không có gì.' },
              { en: 'Excuse me, where is the bus?', vi: 'Xin lỗi, xe buýt ở đâu ạ?' },
            ],
          },
          sentences: [
            { en: 'Thank you, Anna.', vi: 'Cảm ơn Anna.', alts: ['Thanks, Anna.'] },
            { en: "You're welcome.", vi: 'Không có gì.' },
            { en: 'Sorry, Tom.', vi: 'Xin lỗi Tom.' },
            { en: 'Yes, please.', vi: 'Vâng, cho tôi xin.' },
            { en: 'No, thank you.', vi: 'Không, cảm ơn.', alts: ['No, thanks.'] },
            { en: 'Okay, thank you.', vi: 'Được rồi, cảm ơn.', alts: ['Okay, thanks.', 'OK, thank you.'] },
          ],
          reading: {
            title: 'Ở quán cà phê',
            text: "Waiter: Hello! Water?\nAnna: Yes, please.\nWaiter: Here you are.\nAnna: Thank you!\nWaiter: You're welcome.",
            vi: 'Phục vụ: Xin chào! Uống nước nhé?\nAnna: Vâng, cho tôi xin.\nPhục vụ: Của bạn đây.\nAnna: Cảm ơn!\nPhục vụ: Không có gì.',
            questions: [
              { q: 'Anna có muốn uống nước không?', options: ['Có', 'Không', 'Không rõ', 'Anna muốn cà phê'], answer: 0 },
              { q: 'Anna nói gì sau khi nhận nước?', options: ['Thank you!', 'Sorry!', 'Good night!', 'No!'], answer: 0 },
              { q: '"Here you are" nghĩa là gì?', options: ['Của bạn đây', 'Bạn ở đâu?', 'Tạm biệt', 'Xin lỗi'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 2 ─────────────────────────
    {
      id: 'u2', title: 'Giới thiệu bản thân', titleEn: 'About me', icon: '🙂',
      goal: 'Nói tên, hỏi tên và hỏi thăm sức khoẻ.',
      lessons: [
        {
          id: 'u2l1', title: 'Tôi là…', titleEn: 'I am…', icon: '🏷️',
          goal: 'Dùng I am / You are / He is / She is để giới thiệu.',
          vocab: [
            { en: 'I', vi: 'tôi', ipa: '/aɪ/', emoji: '🙋' },
            { en: 'you', vi: 'bạn', ipa: '/juː/', emoji: '👉' },
            { en: 'he', vi: 'anh ấy, cậu ấy', ipa: '/hiː/', emoji: '👦' },
            { en: 'she', vi: 'cô ấy, chị ấy', ipa: '/ʃiː/', emoji: '👧' },
            { en: 'name', vi: 'tên', ipa: '/neɪm/', emoji: '🏷️' },
            { en: 'my', vi: 'của tôi', ipa: '/maɪ/', emoji: '🫵' },
            { en: 'your', vi: 'của bạn', ipa: '/jʊr/', emoji: '🤲' },
            { en: 'friend', vi: 'bạn bè', ipa: '/frend/', emoji: '🤝' },
          ],
          grammar: {
            title: 'Động từ "to be": am / is / are',
            points: [
              '<b>I am</b> (tôi là), <b>You are</b> (bạn là), <b>He is / She is</b> (anh ấy / cô ấy là).',
              'Viết tắt: I am = <b>I\'m</b>, you are = <b>you\'re</b>, he is = <b>he\'s</b>, she is = <b>she\'s</b>.',
              'Giới thiệu tên: <b>My name is</b> + tên. Hỏi tên: <b>What is your name?</b> (= What\'s your name?)',
              'Chữ <b>I</b> (tôi) luôn viết hoa, dù ở giữa câu.',
            ],
            examples: [
              { en: "I'm Anna.", vi: 'Tôi là Anna.' },
              { en: "What's your name? – My name is Tom.", vi: 'Bạn tên là gì? – Tên tôi là Tom.' },
            ],
          },
          sentences: [
            { en: 'I am Anna.', vi: 'Tôi là Anna.' },
            { en: 'My name is Tom.', vi: 'Tên tôi là Tom.' },
            { en: 'What is your name?', vi: 'Tên bạn là gì?' },
            { en: 'She is my friend.', vi: 'Cô ấy là bạn của tôi.' },
            { en: 'He is Ben.', vi: 'Cậu ấy là Ben.' },
            { en: 'You are my friend.', vi: 'Bạn là bạn của tôi.' },
          ],
          reading: {
            title: 'Lớp học mới',
            text: 'Hello! My name is Lily. I am a student. This is Tom. He is my friend. This is Anna. She is my friend, too.',
            vi: 'Xin chào! Tên mình là Lily. Mình là học sinh. Đây là Tom. Cậu ấy là bạn của mình. Đây là Anna. Cô ấy cũng là bạn của mình.',
            questions: [
              { q: 'Người viết đoạn văn tên là gì?', options: ['Lily', 'Anna', 'Tom', 'Ben'], answer: 0 },
              { q: 'Tom là ai?', options: ['Bạn của Lily', 'Bố của Lily', 'Thầy giáo', 'Em trai của Lily'], answer: 0 },
              { q: '"I am a student" nghĩa là gì?', options: ['Tôi là học sinh', 'Tôi là giáo viên', 'Tôi là bạn', 'Tôi tên là Lily'], answer: 0 },
            ],
          },
        },
        {
          id: 'u2l2', title: 'Bạn khoẻ không?', titleEn: 'How are you?', icon: '😊',
          goal: 'Hỏi thăm và nói về cảm xúc của mình.',
          vocab: [
            { en: 'how', vi: 'thế nào', ipa: '/haʊ/', emoji: '❓' },
            { en: 'fine', vi: 'khoẻ, ổn', ipa: '/faɪn/', emoji: '🙂' },
            { en: 'good', vi: 'tốt', ipa: '/ɡʊd/', emoji: '👍' },
            { en: 'great', vi: 'tuyệt vời', ipa: '/ɡreɪt/', emoji: '🤩' },
            { en: 'tired', vi: 'mệt', ipa: '/ˈtaɪərd/', emoji: '🥱' },
            { en: 'happy', vi: 'vui', ipa: '/ˈhæpi/', emoji: '😄' },
            { en: 'sad', vi: 'buồn', ipa: '/sæd/', emoji: '😢' },
            { en: 'nice to meet you', vi: 'rất vui được gặp bạn', ipa: '/naɪs tə miːt juː/', emoji: '🤝' },
          ],
          grammar: {
            title: 'Hỏi thăm sức khoẻ',
            points: [
              'Hỏi: <b>How are you?</b> (Bạn khoẻ không?)',
              'Trả lời: <b>I\'m fine, thank you.</b> / <b>I\'m good.</b> / <b>I\'m great!</b> / <b>I\'m tired.</b>',
              'Hỏi lại: <b>And you?</b> (Còn bạn thì sao?)',
              'Lần đầu gặp: <b>Nice to meet you.</b> – Đáp: <b>Nice to meet you, too.</b>',
            ],
            examples: [
              { en: "How are you? – I'm fine, thanks. And you?", vi: 'Bạn khoẻ không? – Mình khoẻ, cảm ơn. Còn bạn?' },
              { en: 'Nice to meet you, too.', vi: 'Mình cũng rất vui được gặp bạn.' },
            ],
          },
          sentences: [
            { en: 'How are you?', vi: 'Bạn khoẻ không?' },
            { en: 'I am fine, thank you.', vi: 'Tôi khoẻ, cảm ơn.', alts: ["I'm fine, thanks."] },
            { en: 'I am tired.', vi: 'Tôi mệt.' },
            { en: 'She is happy.', vi: 'Cô ấy vui.' },
            { en: 'Nice to meet you, Tom.', vi: 'Rất vui được gặp bạn, Tom.' },
            { en: 'He is sad.', vi: 'Anh ấy buồn.' },
          ],
          reading: {
            title: 'Gặp bạn mới',
            text: "Ben: Hi! I'm Ben. What's your name?\nMai: Hello, Ben. My name is Mai.\nBen: Nice to meet you, Mai. How are you?\nMai: I'm great, thank you. And you?\nBen: I'm a little tired.",
            vi: 'Ben: Chào! Mình là Ben. Bạn tên gì?\nMai: Chào Ben. Mình tên là Mai.\nBen: Rất vui được gặp bạn, Mai. Bạn khoẻ không?\nMai: Mình rất tuyệt, cảm ơn. Còn bạn?\nBen: Mình hơi mệt một chút.',
            questions: [
              { q: 'Bạn gái tên là gì?', options: ['Mai', 'Ben', 'Anna', 'Lily'], answer: 0 },
              { q: 'Mai cảm thấy thế nào?', options: ['Tuyệt vời', 'Mệt', 'Buồn', 'Đói'], answer: 0 },
              { q: 'Ben cảm thấy thế nào?', options: ['Hơi mệt', 'Rất vui', 'Buồn', 'Tuyệt vời'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 3 ─────────────────────────
    {
      id: 'u3', title: 'Số đếm', titleEn: 'Numbers', icon: '🔢',
      goal: 'Đếm từ 1 đến 20, hỏi số lượng và tuổi.',
      lessons: [
        {
          id: 'u3l1', title: 'Số 1 – 10', titleEn: 'One to ten', icon: '🔟',
          goal: 'Đếm 1–10 và dùng danh từ số nhiều.',
          vocab: [
            { en: 'one', vi: 'một (1)', ipa: '/wʌn/', emoji: '1️⃣' },
            { en: 'two', vi: 'hai (2)', ipa: '/tuː/', emoji: '2️⃣' },
            { en: 'three', vi: 'ba (3)', ipa: '/θriː/', emoji: '3️⃣' },
            { en: 'four', vi: 'bốn (4)', ipa: '/fɔːr/', emoji: '4️⃣' },
            { en: 'five', vi: 'năm (5)', ipa: '/faɪv/', emoji: '5️⃣' },
            { en: 'six', vi: 'sáu (6)', ipa: '/sɪks/', emoji: '6️⃣' },
            { en: 'seven', vi: 'bảy (7)', ipa: '/ˈsevən/', emoji: '7️⃣' },
            { en: 'eight', vi: 'tám (8)', ipa: '/eɪt/', emoji: '8️⃣' },
            { en: 'nine', vi: 'chín (9)', ipa: '/naɪn/', emoji: '9️⃣' },
            { en: 'ten', vi: 'mười (10)', ipa: '/ten/', emoji: '🔟' },
          ],
          grammar: {
            title: 'Đếm số và danh từ số nhiều',
            points: [
              'Hỏi số lượng: <b>How many</b> + danh từ số nhiều? (Bao nhiêu…?)',
              'Danh từ số nhiều thường thêm <b>-s</b>: one cat → two cat<b>s</b>, one book → three book<b>s</b>.',
              'Động từ <b>have</b> = có: I <b>have</b> two cats. Với he / she dùng <b>has</b>: She <b>has</b> six apples.',
              'Số 0 đọc là <b>zero</b> (khi đọc số điện thoại có thể đọc là <b>oh</b>).',
            ],
            examples: [
              { en: 'How many cats? – Two cats.', vi: 'Bao nhiêu con mèo? – Hai con mèo.' },
              { en: 'one book, three books', vi: 'một quyển sách, ba quyển sách' },
            ],
          },
          sentences: [
            { en: 'I have two cats.', vi: 'Tôi có hai con mèo.' },
            { en: 'One, two, three, four, five.', vi: 'Một, hai, ba, bốn, năm.' },
            { en: 'I have three books.', vi: 'Tôi có ba quyển sách.' },
            { en: 'She has six apples.', vi: 'Cô ấy có sáu quả táo.' },
            { en: 'Seven, eight, nine, ten.', vi: 'Bảy, tám, chín, mười.' },
          ],
          reading: {
            title: 'Đồ chơi của Tom',
            text: 'Tom has many toys. He has one ball. He has two cars. He has three teddy bears. How many toys? Six toys!',
            vi: 'Tom có nhiều đồ chơi. Cậu ấy có một quả bóng. Cậu ấy có hai chiếc ô tô. Cậu ấy có ba con gấu bông. Bao nhiêu đồ chơi? Sáu món đồ chơi!',
            questions: [
              { q: 'Tom có mấy quả bóng?', options: ['Một', 'Hai', 'Ba', 'Sáu'], answer: 0 },
              { q: 'Tom có mấy chiếc ô tô?', options: ['Hai', 'Một', 'Ba', 'Mười'], answer: 0 },
              { q: 'Tom có tất cả bao nhiêu đồ chơi?', options: ['Sáu', 'Mười', 'Ba', 'Năm'], answer: 0 },
            ],
          },
        },
        {
          id: 'u3l2', title: 'Số 11 – 20 & tuổi', titleEn: 'How old are you?', icon: '🎂',
          goal: 'Đếm đến 20, hỏi và nói tuổi.',
          vocab: [
            { en: 'eleven', vi: 'mười một (11)', ipa: '/ɪˈlevən/', emoji: '🕚' },
            { en: 'twelve', vi: 'mười hai (12)', ipa: '/twelv/', emoji: '🕛' },
            { en: 'thirteen', vi: 'mười ba (13)', ipa: '/ˌθɜːrˈtiːn/', emoji: '🔢' },
            { en: 'fifteen', vi: 'mười lăm (15)', ipa: '/ˌfɪfˈtiːn/', emoji: '🔢' },
            { en: 'eighteen', vi: 'mười tám (18)', ipa: '/ˌeɪˈtiːn/', emoji: '🔢' },
            { en: 'twenty', vi: 'hai mươi (20)', ipa: '/ˈtwenti/', emoji: '🔢' },
            { en: 'old', vi: 'già; … tuổi', ipa: '/oʊld/', emoji: '👴' },
            { en: 'year', vi: 'năm (thời gian)', ipa: '/jɪr/', emoji: '📅' },
          ],
          grammar: {
            title: 'Hỏi và nói tuổi',
            points: [
              'Số 13–19 kết thúc bằng <b>-teen</b>: thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen. Nhấn mạnh vào âm "<b>teen</b>".',
              'Hỏi tuổi: <b>How old are you?</b> (Bạn bao nhiêu tuổi?)',
              'Trả lời: <b>I am</b> + số + <b>years old</b>. Ví dụ: I am twelve years old. Nói ngắn: <b>I\'m twelve.</b>',
              'Chú ý phân biệt: thir<b>teen</b> (13) và thir<b>ty</b> (30).',
            ],
            examples: [
              { en: 'How old are you? – I am twelve years old.', vi: 'Bạn bao nhiêu tuổi? – Tôi mười hai tuổi.' },
              { en: 'She is eighteen.', vi: 'Cô ấy mười tám tuổi.' },
            ],
          },
          sentences: [
            { en: 'How old are you?', vi: 'Bạn bao nhiêu tuổi?' },
            { en: 'I am twelve years old.', vi: 'Tôi mười hai tuổi.', alts: ['I am twelve.'] },
            { en: 'She is eighteen years old.', vi: 'Cô ấy mười tám tuổi.', alts: ['She is eighteen.'] },
            { en: 'He is twenty years old.', vi: 'Anh ấy hai mươi tuổi.', alts: ['He is twenty.'] },
            { en: 'My brother is eleven.', vi: 'Em trai tôi mười một tuổi.', alts: ['My brother is eleven years old.'] },
          ],
          reading: {
            title: 'Chị em nhà Lily',
            text: 'My name is Lily. I am thirteen years old. My brother Sam is eleven. My sister Kate is eighteen. How old are you?',
            vi: 'Tên mình là Lily. Mình mười ba tuổi. Em trai mình, Sam, mười một tuổi. Chị gái mình, Kate, mười tám tuổi. Còn bạn bao nhiêu tuổi?',
            questions: [
              { q: 'Lily bao nhiêu tuổi?', options: ['13', '11', '18', '15'], answer: 0 },
              { q: 'Sam bao nhiêu tuổi?', options: ['11', '13', '18', '20'], answer: 0 },
              { q: 'Ai lớn tuổi nhất?', options: ['Kate', 'Lily', 'Sam', 'Không biết'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 4 ─────────────────────────
    {
      id: 'u4', title: 'Màu sắc & đồ vật', titleEn: 'Colors & things', icon: '🎨',
      goal: 'Gọi tên màu sắc, đồ vật và hỏi "Đây là cái gì?".',
      lessons: [
        {
          id: 'u4l1', title: 'Màu sắc', titleEn: 'Colors', icon: '🌈',
          goal: 'Nói màu sắc và đặt tính từ trước danh từ.',
          vocab: [
            { en: 'red', vi: 'màu đỏ', ipa: '/red/', emoji: '🔴' },
            { en: 'green', vi: 'màu xanh lá', ipa: '/ɡriːn/', emoji: '🟢' },
            { en: 'blue', vi: 'màu xanh dương', ipa: '/bluː/', emoji: '🔵' },
            { en: 'yellow', vi: 'màu vàng', ipa: '/ˈjeloʊ/', emoji: '🟡' },
            { en: 'white', vi: 'màu trắng', ipa: '/waɪt/', emoji: '⚪' },
            { en: 'black', vi: 'màu đen', ipa: '/blæk/', emoji: '⚫' },
            { en: 'pink', vi: 'màu hồng', ipa: '/pɪŋk/', emoji: '🩷' },
            { en: 'brown', vi: 'màu nâu', ipa: '/braʊn/', emoji: '🟤' },
          ],
          grammar: {
            title: 'Nói về màu sắc',
            points: [
              'Hỏi màu: <b>What color is it?</b> (Nó màu gì?) – <b>It is red.</b> (Nó màu đỏ.)',
              'Tính từ chỉ màu đứng <b>TRƯỚC</b> danh từ (ngược với tiếng Việt): a <b>red</b> hat = một chiếc mũ <b>đỏ</b>.',
              '<b>It is</b> viết tắt là <b>It\'s</b>.',
              'Thích màu gì: <b>I like</b> blue. (Tôi thích màu xanh dương.)',
            ],
            examples: [
              { en: "What color is it? – It's green.", vi: 'Nó màu gì? – Nó màu xanh lá.' },
              { en: 'a red hat', vi: 'một chiếc mũ đỏ' },
            ],
          },
          sentences: [
            { en: 'What color is it?', vi: 'Nó màu gì?' },
            { en: 'It is red.', vi: 'Nó màu đỏ.' },
            { en: 'The tree is green.', vi: 'Cái cây màu xanh lá.' },
            { en: 'Santa has a red hat.', vi: 'Ông già Noel có một chiếc mũ đỏ.' },
            { en: 'The snow is white.', vi: 'Tuyết màu trắng.' },
            { en: 'I like blue.', vi: 'Tôi thích màu xanh dương.' },
          ],
          reading: {
            title: 'Cây thông của Mai',
            text: 'This is my Christmas tree. It is green. It has red balls and yellow stars. The snow outside is white. I love my tree!',
            vi: 'Đây là cây thông Noel của mình. Nó màu xanh lá. Nó có những quả bóng đỏ và những ngôi sao vàng. Tuyết bên ngoài màu trắng. Mình yêu cây thông của mình!',
            questions: [
              { q: 'Cây thông màu gì?', options: ['Xanh lá', 'Đỏ', 'Trắng', 'Vàng'], answer: 0 },
              { q: 'Những quả bóng trên cây màu gì?', options: ['Đỏ', 'Xanh dương', 'Hồng', 'Nâu'], answer: 0 },
              { q: 'Những ngôi sao màu gì?', options: ['Vàng', 'Trắng', 'Đen', 'Xanh lá'], answer: 0 },
            ],
          },
        },
        {
          id: 'u4l2', title: 'Đồ vật quanh ta', titleEn: 'Things around us', icon: '🎒',
          goal: 'Dùng a / an, this / that để chỉ đồ vật.',
          vocab: [
            { en: 'book', vi: 'quyển sách', ipa: '/bʊk/', emoji: '📕' },
            { en: 'pen', vi: 'cây bút', ipa: '/pen/', emoji: '🖊️' },
            { en: 'bag', vi: 'cái cặp, cái túi', ipa: '/bæɡ/', emoji: '🎒' },
            { en: 'phone', vi: 'điện thoại', ipa: '/foʊn/', emoji: '📱' },
            { en: 'table', vi: 'cái bàn', ipa: '/ˈteɪbəl/', emoji: '🪵' },
            { en: 'chair', vi: 'cái ghế', ipa: '/tʃer/', emoji: '🪑' },
            { en: 'cup', vi: 'cái cốc, cái tách', ipa: '/kʌp/', emoji: '☕' },
            { en: 'hat', vi: 'cái mũ', ipa: '/hæt/', emoji: '🎩' },
          ],
          grammar: {
            title: 'a / an, this / that',
            points: [
              '<b>a</b> + danh từ bắt đầu bằng phụ âm: a book, a pen. <b>an</b> + danh từ bắt đầu bằng nguyên âm (a, e, i, o, u): an apple, an egg.',
              '<b>This is</b> … (Đây là – vật ở gần), <b>That is</b> … (Kia là – vật ở xa).',
              'Hỏi: <b>What is this?</b> (Đây là cái gì?) – <b>It is a book.</b>',
            ],
            examples: [
              { en: "What is this? – It's a pen.", vi: 'Đây là cái gì? – Đó là một cây bút.' },
              { en: 'an apple, a cup', vi: 'một quả táo, một cái cốc' },
            ],
          },
          sentences: [
            { en: 'What is this?', vi: 'Đây là cái gì?' },
            { en: 'This is a book.', vi: 'Đây là một quyển sách.' },
            { en: 'That is my bag.', vi: 'Kia là cái cặp của tôi.' },
            { en: 'It is a red pen.', vi: 'Nó là một cây bút đỏ.' },
            { en: 'This is a blue cup.', vi: 'Đây là một cái cốc xanh dương.' },
            { en: 'That is a black hat.', vi: 'Kia là một cái mũ đen.' },
          ],
          reading: {
            title: 'Trong lớp học',
            text: 'This is my classroom. That is my table and that is my chair. This is my bag. It is pink. In my bag, I have a book, two pens and a phone.',
            vi: 'Đây là lớp học của mình. Kia là bàn của mình và kia là ghế của mình. Đây là cặp của mình. Nó màu hồng. Trong cặp, mình có một quyển sách, hai cây bút và một chiếc điện thoại.',
            questions: [
              { q: 'Cái cặp màu gì?', options: ['Hồng', 'Đen', 'Xanh lá', 'Nâu'], answer: 0 },
              { q: 'Trong cặp có mấy cây bút?', options: ['Hai', 'Một', 'Ba', 'Không có'], answer: 0 },
              { q: 'Thứ nào KHÔNG có trong cặp?', options: ['Cái mũ', 'Quyển sách', 'Điện thoại', 'Cây bút'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 5 ─────────────────────────
    {
      id: 'u5', title: 'Gia đình', titleEn: 'Family', icon: '👨‍👩‍👧',
      goal: 'Giới thiệu người thân và mô tả họ.',
      lessons: [
        {
          id: 'u5l1', title: 'Thành viên gia đình', titleEn: 'Family members', icon: '🏡',
          goal: 'Gọi tên người thân, dùng have / has và \'s.',
          vocab: [
            { en: 'family', vi: 'gia đình', ipa: '/ˈfæməli/', emoji: '👨‍👩‍👧' },
            { en: 'mother', vi: 'mẹ', ipa: '/ˈmʌðər/', emoji: '👩', alts: ['mom'] },
            { en: 'father', vi: 'bố', ipa: '/ˈfɑːðər/', emoji: '👨', alts: ['dad'] },
            { en: 'sister', vi: 'chị gái, em gái', ipa: '/ˈsɪstər/', emoji: '👧' },
            { en: 'brother', vi: 'anh trai, em trai', ipa: '/ˈbrʌðər/', emoji: '👦' },
            { en: 'grandmother', vi: 'bà', ipa: '/ˈɡrænmʌðər/', emoji: '👵', alts: ['grandma'] },
            { en: 'grandfather', vi: 'ông', ipa: '/ˈɡrænfɑːðər/', emoji: '👴', alts: ['grandpa'] },
            { en: 'baby', vi: 'em bé', ipa: '/ˈbeɪbi/', emoji: '👶' },
          ],
          grammar: {
            title: 'Sở hữu và động từ have',
            points: [
              '<b>This is my mother.</b> (Đây là mẹ tôi.)',
              '<b>I / You / We / They have</b> … – <b>He / She has</b> … (có): I have a brother. She has a sister.',
              'Sở hữu cách <b>\'s</b>: Tom<b>\'s</b> sister = chị/em gái của Tom.',
              'Cách gọi thân mật: mother = <b>mom</b>, father = <b>dad</b>, grandmother = <b>grandma</b>, grandfather = <b>grandpa</b>.',
            ],
            examples: [
              { en: 'I have a brother and a sister.', vi: 'Tôi có một anh trai và một em gái.' },
              { en: "Tom's mother is a teacher.", vi: 'Mẹ của Tom là giáo viên.' },
            ],
          },
          sentences: [
            { en: 'This is my family.', vi: 'Đây là gia đình tôi.' },
            { en: 'I have a sister.', vi: 'Tôi có một em gái.' },
            { en: 'This is my father.', vi: 'Đây là bố tôi.', alts: ['This is my dad.'] },
            { en: 'She has a baby brother.', vi: 'Cô ấy có một em trai nhỏ.' },
            { en: "Tom's sister is Anna.", vi: 'Em gái của Tom là Anna.' },
            { en: 'My grandmother is kind.', vi: 'Bà tôi rất hiền.', alts: ['My grandma is kind.'] },
          ],
          reading: {
            title: 'Gia đình của Nam',
            text: "Hi, I'm Nam. This is my family. My father is Hung and my mother is Lan. I have a sister. Her name is Hoa. My grandmother and grandfather live with us. We are a happy family!",
            vi: 'Chào, mình là Nam. Đây là gia đình mình. Bố mình là Hùng và mẹ mình là Lan. Mình có một chị gái. Chị ấy tên là Hoa. Ông bà mình sống cùng với chúng mình. Chúng mình là một gia đình hạnh phúc!',
            questions: [
              { q: 'Bố của Nam tên là gì?', options: ['Hung', 'Lan', 'Hoa', 'Nam'], answer: 0 },
              { q: 'Nam có anh chị em nào?', options: ['Một chị gái', 'Một anh trai', 'Hai em trai', 'Không có'], answer: 0 },
              { q: 'Ai sống cùng gia đình Nam?', options: ['Ông và bà', 'Cô và chú', 'Bạn của Nam', 'Không ai'], answer: 0 },
            ],
          },
        },
        {
          id: 'u5l2', title: 'Mô tả người thân', titleEn: 'Describing people', icon: '🧑‍🤝‍🧑',
          goal: 'Mô tả ngoại hình, tính cách; dùng we / they và not.',
          vocab: [
            { en: 'tall', vi: 'cao', ipa: '/tɔːl/', emoji: '🦒' },
            { en: 'short', vi: 'thấp, ngắn', ipa: '/ʃɔːrt/', emoji: '🐧' },
            { en: 'young', vi: 'trẻ', ipa: '/jʌŋ/', emoji: '🧒' },
            { en: 'kind', vi: 'tốt bụng, hiền', ipa: '/kaɪnd/', emoji: '💖' },
            { en: 'funny', vi: 'vui tính, hài hước', ipa: '/ˈfʌni/', emoji: '🤪' },
            { en: 'beautiful', vi: 'xinh đẹp', ipa: '/ˈbjuːtɪfəl/', emoji: '🌸' },
            { en: 'strong', vi: 'khoẻ mạnh', ipa: '/strɔːŋ/', emoji: '💪' },
            { en: 'smart', vi: 'thông minh', ipa: '/smɑːrt/', emoji: '🧠' },
          ],
          grammar: {
            title: 'Mô tả: be + tính từ',
            points: [
              'Cấu trúc: chủ ngữ + <b>am / is / are</b> + tính từ: She <b>is</b> tall.',
              'Số nhiều: <b>We are</b> (chúng tôi), <b>They are</b> (họ): They are funny.',
              'Phủ định thêm <b>not</b> sau be: He is <b>not</b> tall. (is not = <b>isn\'t</b>, are not = <b>aren\'t</b>)',
              '<b>very</b> = rất, đứng trước tính từ: She is <b>very</b> kind.',
            ],
            examples: [
              { en: "My dad is tall, but he isn't strong.", vi: 'Bố tôi cao nhưng không khoẻ lắm.' },
              { en: 'They are very funny.', vi: 'Họ rất vui tính.' },
            ],
          },
          sentences: [
            { en: 'My father is tall.', vi: 'Bố tôi cao.' },
            { en: 'My mother is very kind.', vi: 'Mẹ tôi rất tốt bụng.' },
            { en: 'My brother is funny.', vi: 'Anh trai tôi vui tính.' },
            { en: 'They are young.', vi: 'Họ còn trẻ.' },
            { en: 'He is not short.', vi: 'Anh ấy không thấp.' },
            { en: 'My sister is smart.', vi: 'Em gái tôi thông minh.' },
          ],
          reading: {
            title: 'Ông bà của tôi',
            text: 'My grandfather is old, but he is very strong. He is tall and funny. My grandmother is short. She is kind and beautiful. I love them very much.',
            vi: 'Ông tôi đã già nhưng ông rất khoẻ. Ông cao và vui tính. Bà tôi thấp. Bà hiền và đẹp. Tôi yêu ông bà rất nhiều.',
            questions: [
              { q: 'Ông như thế nào?', options: ['Khoẻ, cao và vui tính', 'Thấp và buồn', 'Trẻ và mệt', 'Yếu và thấp'], answer: 0 },
              { q: 'Bà cao hay thấp?', options: ['Thấp', 'Cao', 'Không biết', 'Rất cao'], answer: 0 },
              { q: '"I love them very much" nghĩa là gì?', options: ['Tôi yêu ông bà rất nhiều', 'Tôi rất mệt', 'Ông bà rất trẻ', 'Tôi không thích ông bà'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 6 ─────────────────────────
    {
      id: 'u6', title: 'Đồ ăn & thức uống', titleEn: 'Food & drinks', icon: '🍎',
      goal: 'Nói sở thích ăn uống và gọi món lịch sự.',
      lessons: [
        {
          id: 'u6l1', title: 'Món ăn yêu thích', titleEn: 'Food I like', icon: '🍰',
          goal: 'Dùng like / don\'t like / likes để nói sở thích.',
          vocab: [
            { en: 'rice', vi: 'cơm, gạo', ipa: '/raɪs/', emoji: '🍚' },
            { en: 'bread', vi: 'bánh mì', ipa: '/bred/', emoji: '🍞' },
            { en: 'egg', vi: 'quả trứng', ipa: '/eɡ/', emoji: '🥚' },
            { en: 'milk', vi: 'sữa', ipa: '/mɪlk/', emoji: '🥛' },
            { en: 'water', vi: 'nước', ipa: '/ˈwɔːtər/', emoji: '💧' },
            { en: 'apple', vi: 'quả táo', ipa: '/ˈæpəl/', emoji: '🍎' },
            { en: 'cake', vi: 'bánh ngọt', ipa: '/keɪk/', emoji: '🍰' },
            { en: 'like', vi: 'thích', ipa: '/laɪk/', emoji: '❤️' },
          ],
          grammar: {
            title: 'Thích và không thích',
            points: [
              '<b>I like</b> + món: I like cake. (Tôi thích bánh ngọt.)',
              'Phủ định: <b>I don\'t like</b> milk. (don\'t = do not)',
              'Với he / she thêm <b>-s</b>: She <b>likes</b> apples. Phủ định: He <b>doesn\'t like</b> eggs.',
              'Hỏi: <b>Do you like</b> rice? – <b>Yes, I do.</b> / <b>No, I don\'t.</b>',
            ],
            examples: [
              { en: 'Do you like cake? – Yes, I do!', vi: 'Bạn có thích bánh ngọt không? – Có chứ!' },
              { en: "He doesn't like milk.", vi: 'Anh ấy không thích sữa.' },
            ],
          },
          sentences: [
            { en: 'I like apples.', vi: 'Tôi thích táo.' },
            { en: "I don't like milk.", vi: 'Tôi không thích sữa.' },
            { en: 'She likes cake.', vi: 'Cô ấy thích bánh ngọt.' },
            { en: 'Do you like rice?', vi: 'Bạn có thích cơm không?' },
            { en: "He doesn't like eggs.", vi: 'Anh ấy không thích trứng.' },
          ],
          reading: {
            title: 'Bữa sáng',
            text: "In the morning, I eat bread and eggs. I drink milk. My sister doesn't like milk. She drinks water. We both like apples!",
            vi: 'Buổi sáng, mình ăn bánh mì và trứng. Mình uống sữa. Em gái mình không thích sữa. Em ấy uống nước. Cả hai chúng mình đều thích táo!',
            questions: [
              { q: 'Bữa sáng bạn ấy ăn gì?', options: ['Bánh mì và trứng', 'Cơm và trứng', 'Bánh ngọt', 'Táo'], answer: 0 },
              { q: 'Em gái uống gì?', options: ['Nước', 'Sữa', 'Cà phê', 'Nước cam'], answer: 0 },
              { q: 'Cả hai người đều thích gì?', options: ['Táo', 'Sữa', 'Trứng', 'Bánh mì'], answer: 0 },
            ],
          },
        },
        {
          id: 'u6l2', title: 'Gọi món', titleEn: 'Ordering food', icon: '🍽️',
          goal: 'Nói đói / khát và gọi đồ ăn thức uống.',
          vocab: [
            { en: 'want', vi: 'muốn', ipa: '/wɑːnt/', emoji: '🙏' },
            { en: 'eat', vi: 'ăn', ipa: '/iːt/', emoji: '🍴' },
            { en: 'drink', vi: 'uống', ipa: '/drɪŋk/', emoji: '🥤' },
            { en: 'hungry', vi: 'đói', ipa: '/ˈhʌŋɡri/', emoji: '😋' },
            { en: 'thirsty', vi: 'khát', ipa: '/ˈθɜːrsti/', emoji: '🥵' },
            { en: 'tea', vi: 'trà', ipa: '/tiː/', emoji: '🍵' },
            { en: 'coffee', vi: 'cà phê', ipa: '/ˈkɔːfi/', emoji: '☕' },
            { en: 'delicious', vi: 'ngon', ipa: '/dɪˈlɪʃəs/', emoji: '😍' },
          ],
          grammar: {
            title: 'Gọi món lịch sự',
            points: [
              '<b>I want</b> + món (tôi muốn) – dùng với bạn bè, người thân.',
              'Lịch sự hơn: <b>Can I have</b> a coffee, <b>please</b>? / <b>I would like</b> a tea. (I\'d like)',
              '<b>I am hungry</b> = tôi đói, <b>I am thirsty</b> = tôi khát (dùng <b>be</b>, không dùng "have").',
              'Khen món ăn: <b>It\'s delicious!</b> (Ngon quá!)',
            ],
            examples: [
              { en: 'Can I have a cup of tea, please?', vi: 'Cho tôi một tách trà được không?' },
              { en: "I'm thirsty. I want water.", vi: 'Tôi khát. Tôi muốn uống nước.' },
            ],
          },
          sentences: [
            { en: 'I am hungry.', vi: 'Tôi đói.' },
            { en: 'I want a cup of tea.', vi: 'Tôi muốn một tách trà.' },
            { en: 'Can I have a coffee, please?', vi: 'Cho tôi một ly cà phê được không?' },
            { en: 'This cake is delicious.', vi: 'Chiếc bánh này ngon.' },
            { en: 'Are you thirsty?', vi: 'Bạn có khát không?' },
            { en: 'I eat rice every day.', vi: 'Tôi ăn cơm mỗi ngày.' },
          ],
          reading: {
            title: 'Ở nhà hàng',
            text: "Waiter: Hello! What do you want?\nTom: I'm hungry. Can I have rice and chicken, please?\nWaiter: And to drink?\nTom: A cup of tea, please.\nWaiter: Here you are.\nTom: Thank you. It's delicious!",
            vi: 'Phục vụ: Xin chào! Bạn muốn gì?\nTom: Tôi đói. Cho tôi cơm và gà được không?\nPhục vụ: Còn đồ uống?\nTom: Cho tôi một tách trà.\nPhục vụ: Của bạn đây.\nTom: Cảm ơn. Ngon quá!',
            questions: [
              { q: 'Tom gọi món gì?', options: ['Cơm và gà', 'Bánh mì', 'Bánh ngọt', 'Trứng'], answer: 0 },
              { q: 'Tom uống gì?', options: ['Trà', 'Cà phê', 'Sữa', 'Nước'], answer: 0 },
              { q: 'Tom thấy món ăn thế nào?', options: ['Ngon', 'Không ngon', 'Quá cay', 'Quá nhiều'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 7 ─────────────────────────
    {
      id: 'u7', title: 'Một ngày của tôi', titleEn: 'My day', icon: '☀️',
      goal: 'Kể về thói quen hằng ngày bằng thì hiện tại đơn.',
      lessons: [
        {
          id: 'u7l1', title: 'Hoạt động hằng ngày', titleEn: 'Daily activities', icon: '⏰',
          goal: 'Dùng thì hiện tại đơn; thêm -s / -es với he / she.',
          vocab: [
            { en: 'wake up', vi: 'thức dậy', ipa: '/weɪk ʌp/', emoji: '⏰' },
            { en: 'go', vi: 'đi', ipa: '/ɡoʊ/', emoji: '🚶' },
            { en: 'work', vi: 'làm việc', ipa: '/wɜːrk/', emoji: '💼' },
            { en: 'study', vi: 'học', ipa: '/ˈstʌdi/', emoji: '📚' },
            { en: 'read', vi: 'đọc', ipa: '/riːd/', emoji: '📖' },
            { en: 'play', vi: 'chơi', ipa: '/pleɪ/', emoji: '⚽' },
            { en: 'watch TV', vi: 'xem TV', ipa: '/wɑːtʃ ˌtiːˈviː/', emoji: '📺' },
            { en: 'sleep', vi: 'ngủ', ipa: '/sliːp/', emoji: '😴' },
          ],
          grammar: {
            title: 'Thì hiện tại đơn',
            points: [
              'Dùng để nói về <b>thói quen</b>, việc làm lặp lại hằng ngày.',
              '<b>I / You / We / They</b> + động từ nguyên mẫu: I <b>work</b>. They <b>play</b>.',
              '<b>He / She / It</b> + động từ thêm <b>-s / -es</b>: she <b>works</b>, he <b>watches</b> TV, she <b>studies</b>, he <b>goes</b>.',
              'Buổi trong ngày: <b>in the morning</b>, <b>in the afternoon</b>, <b>in the evening</b>, <b>at night</b>.',
            ],
            examples: [
              { en: 'I study English in the evening.', vi: 'Tôi học tiếng Anh vào buổi tối.' },
              { en: 'She goes to school in the morning.', vi: 'Cô ấy đi học vào buổi sáng.' },
            ],
          },
          sentences: [
            { en: 'I wake up at six.', vi: 'Tôi thức dậy lúc sáu giờ.' },
            { en: 'She goes to school.', vi: 'Cô ấy đi học.' },
            { en: 'My father works in a bank.', vi: 'Bố tôi làm việc ở ngân hàng.' },
            { en: 'I study English.', vi: 'Tôi học tiếng Anh.' },
            { en: 'We play football in the afternoon.', vi: 'Chúng tôi chơi bóng đá vào buổi chiều.' },
            { en: 'They watch TV in the evening.', vi: 'Họ xem TV vào buổi tối.' },
          ],
          reading: {
            title: 'Một ngày của Ben',
            text: 'Ben wakes up at six. He eats breakfast and goes to school. He studies English and math. In the afternoon, he plays football. In the evening, he reads a book. He goes to sleep at ten.',
            vi: 'Ben thức dậy lúc sáu giờ. Cậu ấy ăn sáng và đi học. Cậu ấy học tiếng Anh và toán. Buổi chiều, cậu ấy chơi bóng đá. Buổi tối, cậu ấy đọc sách. Cậu ấy đi ngủ lúc mười giờ.',
            questions: [
              { q: 'Ben thức dậy lúc mấy giờ?', options: ['Sáu giờ', 'Bảy giờ', 'Mười giờ', 'Năm giờ'], answer: 0 },
              { q: 'Buổi chiều Ben làm gì?', options: ['Chơi bóng đá', 'Xem TV', 'Đọc sách', 'Ngủ'], answer: 0 },
              { q: 'Ben đi ngủ lúc mấy giờ?', options: ['Mười giờ', 'Sáu giờ', 'Chín giờ', 'Mười một giờ'], answer: 0 },
            ],
          },
        },
        {
          id: 'u7l2', title: 'Thường xuyên thế nào?', titleEn: 'How often?', icon: '🔁',
          goal: 'Câu hỏi, phủ định với do / does và trạng từ tần suất.',
          vocab: [
            { en: 'always', vi: 'luôn luôn', ipa: '/ˈɔːlweɪz/', emoji: '💯' },
            { en: 'often', vi: 'thường xuyên', ipa: '/ˈɔːfən/', emoji: '🔁' },
            { en: 'sometimes', vi: 'thỉnh thoảng', ipa: '/ˈsʌmtaɪmz/', emoji: '🎲' },
            { en: 'never', vi: 'không bao giờ', ipa: '/ˈnevər/', emoji: '🚫' },
            { en: 'every day', vi: 'mỗi ngày', ipa: '/ˈevri deɪ/', emoji: '📆' },
            { en: 'school', vi: 'trường học', ipa: '/skuːl/', emoji: '🏫' },
            { en: 'home', vi: 'nhà (tổ ấm)', ipa: '/hoʊm/', emoji: '🏠' },
            { en: 'cook', vi: 'nấu ăn', ipa: '/kʊk/', emoji: '🍳' },
          ],
          grammar: {
            title: 'do / does và trạng từ tần suất',
            points: [
              'Phủ định: I / You / We / They + <b>don\'t</b> + động từ; He / She + <b>doesn\'t</b> + động từ (không thêm -s).',
              'Câu hỏi: <b>Do</b> you cook? – Yes, I do. / <b>Does</b> she cook? – No, she doesn\'t.',
              'Trạng từ tần suất đứng <b>trước</b> động từ thường: I <b>always</b> wake up early. Nhưng đứng <b>sau</b> be: She is <b>never</b> late.',
              'Mức độ: <b>always</b> (100%) → <b>often</b> → <b>sometimes</b> → <b>never</b> (0%).',
            ],
            examples: [
              { en: "Does he cook? – No, he doesn't.", vi: 'Anh ấy có nấu ăn không? – Không.' },
              { en: 'I sometimes read at home.', vi: 'Thỉnh thoảng tôi đọc sách ở nhà.' },
            ],
          },
          sentences: [
            { en: 'I always go to school.', vi: 'Tôi luôn đi học.' },
            { en: 'She often cooks dinner.', vi: 'Cô ấy thường nấu bữa tối.' },
            { en: 'I sometimes watch TV.', vi: 'Thỉnh thoảng tôi xem TV.' },
            { en: 'He never drinks coffee.', vi: 'Anh ấy không bao giờ uống cà phê.' },
            { en: 'Do you study every day?', vi: 'Bạn có học mỗi ngày không?' },
            { en: 'I stay at home on Sunday.', vi: 'Tôi ở nhà vào Chủ nhật.' },
          ],
          reading: {
            title: 'Mẹ của An',
            text: 'My mother always wakes up early. She often cooks breakfast for us. She sometimes reads books at home. She never watches TV in the morning. Does she like coffee? Yes, she does!',
            vi: 'Mẹ tôi luôn dậy sớm. Mẹ thường nấu bữa sáng cho chúng tôi. Thỉnh thoảng mẹ đọc sách ở nhà. Mẹ không bao giờ xem TV vào buổi sáng. Mẹ có thích cà phê không? Có chứ!',
            questions: [
              { q: 'Mẹ có hay nấu bữa sáng không?', options: ['Thường xuyên', 'Không bao giờ', 'Thỉnh thoảng', 'Không rõ'], answer: 0 },
              { q: 'Mẹ có xem TV vào buổi sáng không?', options: ['Không bao giờ', 'Luôn luôn', 'Thường xuyên', 'Thỉnh thoảng'], answer: 0 },
              { q: 'Mẹ có thích cà phê không?', options: ['Có', 'Không', 'Không rõ', 'Chỉ thích trà'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 8 ─────────────────────────
    {
      id: 'u8', title: 'Thời gian', titleEn: 'Time', icon: '🕰️',
      goal: 'Nói thứ trong tuần và hỏi giờ.',
      lessons: [
        {
          id: 'u8l1', title: 'Các ngày trong tuần', titleEn: 'Days of the week', icon: '📅',
          goal: 'Gọi tên 7 ngày, dùng giới từ on.',
          vocab: [
            { en: 'Monday', vi: 'thứ Hai', ipa: '/ˈmʌndeɪ/', emoji: '1️⃣' },
            { en: 'Tuesday', vi: 'thứ Ba', ipa: '/ˈtuːzdeɪ/', emoji: '2️⃣' },
            { en: 'Wednesday', vi: 'thứ Tư', ipa: '/ˈwenzdeɪ/', emoji: '3️⃣' },
            { en: 'Thursday', vi: 'thứ Năm', ipa: '/ˈθɜːrzdeɪ/', emoji: '4️⃣' },
            { en: 'Friday', vi: 'thứ Sáu', ipa: '/ˈfraɪdeɪ/', emoji: '5️⃣' },
            { en: 'Saturday', vi: 'thứ Bảy', ipa: '/ˈsætərdeɪ/', emoji: '6️⃣' },
            { en: 'Sunday', vi: 'Chủ nhật', ipa: '/ˈsʌndeɪ/', emoji: '☀️' },
            { en: 'today', vi: 'hôm nay', ipa: '/təˈdeɪ/', emoji: '📍' },
          ],
          grammar: {
            title: 'Ngày trong tuần',
            points: [
              'Tên các ngày luôn <b>viết hoa</b> chữ cái đầu: Monday, Friday…',
              'Dùng giới từ <b>on</b>: <b>on</b> Monday (vào thứ Hai), <b>on</b> Sunday.',
              'Hỏi: <b>What day is it today?</b> – <b>It\'s</b> Friday.',
              'Cuối tuần: <b>the weekend</b> (Saturday và Sunday).',
            ],
            examples: [
              { en: "What day is it today? – It's Monday.", vi: 'Hôm nay là thứ mấy? – Hôm nay là thứ Hai.' },
              { en: 'I play football on Saturday.', vi: 'Tôi chơi bóng đá vào thứ Bảy.' },
            ],
          },
          sentences: [
            { en: 'What day is it today?', vi: 'Hôm nay là thứ mấy?' },
            { en: 'It is Friday.', vi: 'Hôm nay là thứ Sáu.', alts: ['Today is Friday.'] },
            { en: 'I go to school on Monday.', vi: 'Tôi đi học vào thứ Hai.' },
            { en: 'We play football on Saturday.', vi: 'Chúng tôi chơi bóng đá vào thứ Bảy.' },
            { en: "I don't work on Sunday.", vi: 'Tôi không làm việc vào Chủ nhật.' },
          ],
          reading: {
            title: 'Thời gian biểu của Lily',
            text: 'On Monday and Wednesday, Lily studies English. On Tuesday and Thursday, she plays the piano. On Friday, she cooks with her mother. On the weekend, she visits her grandmother.',
            vi: 'Vào thứ Hai và thứ Tư, Lily học tiếng Anh. Thứ Ba và thứ Năm, cô ấy chơi piano. Thứ Sáu, cô ấy nấu ăn cùng mẹ. Cuối tuần, cô ấy đi thăm bà.',
            questions: [
              { q: 'Lily học tiếng Anh vào những ngày nào?', options: ['Thứ Hai và thứ Tư', 'Thứ Ba và thứ Năm', 'Thứ Sáu', 'Cuối tuần'], answer: 0 },
              { q: 'Thứ Sáu Lily làm gì?', options: ['Nấu ăn với mẹ', 'Chơi piano', 'Học tiếng Anh', 'Thăm bà'], answer: 0 },
              { q: 'Cuối tuần Lily đi thăm ai?', options: ['Bà', 'Bố', 'Bạn', 'Cô giáo'], answer: 0 },
            ],
          },
        },
        {
          id: 'u8l2', title: 'Mấy giờ rồi?', titleEn: 'What time is it?', icon: '🕖',
          goal: 'Hỏi giờ, nói giờ đúng, giờ rưỡi; dùng at.',
          vocab: [
            { en: 'time', vi: 'thời gian', ipa: '/taɪm/', emoji: '⌛' },
            { en: "o'clock", vi: 'giờ đúng', ipa: '/əˈklɑːk/', emoji: '🕖' },
            { en: 'half past', vi: 'rưỡi (… giờ 30)', ipa: '/hæf pæst/', emoji: '🕢' },
            { en: 'hour', vi: 'giờ (tiếng đồng hồ)', ipa: '/ˈaʊər/', emoji: '⏳' },
            { en: 'minute', vi: 'phút', ipa: '/ˈmɪnɪt/', emoji: '⏱️' },
            { en: 'morning', vi: 'buổi sáng', ipa: '/ˈmɔːrnɪŋ/', emoji: '🌄' },
            { en: 'afternoon', vi: 'buổi chiều', ipa: '/ˌæftərˈnuːn/', emoji: '🌇' },
            { en: 'night', vi: 'ban đêm', ipa: '/naɪt/', emoji: '🌃' },
          ],
          grammar: {
            title: 'Nói giờ',
            points: [
              'Hỏi: <b>What time is it?</b> (Mấy giờ rồi?)',
              'Giờ đúng: <b>It\'s</b> seven <b>o\'clock</b>. (7:00)',
              'Giờ rưỡi: <b>half past</b> seven (7:30), hoặc đọc số: seven thirty.',
              'Làm gì lúc mấy giờ dùng <b>at</b>: I get up <b>at</b> six o\'clock.',
              '<b>a.m.</b> = buổi sáng (0h–12h), <b>p.m.</b> = chiều/tối (12h–24h).',
            ],
            examples: [
              { en: "What time is it? – It's half past eight.", vi: 'Mấy giờ rồi? – Tám giờ rưỡi.' },
              { en: 'I have lunch at twelve.', vi: 'Tôi ăn trưa lúc mười hai giờ.' },
            ],
          },
          sentences: [
            { en: 'What time is it?', vi: 'Mấy giờ rồi?' },
            { en: "It is seven o'clock.", vi: 'Bây giờ là bảy giờ.', alts: ['It is seven.'] },
            { en: 'It is half past nine.', vi: 'Bây giờ là chín giờ rưỡi.', alts: ['It is nine thirty.'] },
            { en: "I wake up at six o'clock.", vi: 'Tôi thức dậy lúc sáu giờ.', alts: ['I wake up at six.'] },
            { en: 'School starts at eight in the morning.', vi: 'Trường học bắt đầu lúc tám giờ sáng.' },
          ],
          reading: {
            title: 'Một ngày của bố',
            text: "My father wakes up at five o'clock. He goes to work at half past six. He has lunch at twelve. He comes home at six in the evening. At night, he reads the news for an hour.",
            vi: 'Bố tôi thức dậy lúc năm giờ. Bố đi làm lúc sáu giờ rưỡi. Bố ăn trưa lúc mười hai giờ. Bố về nhà lúc sáu giờ tối. Buổi tối, bố đọc tin tức trong một tiếng.',
            questions: [
              { q: 'Bố thức dậy lúc mấy giờ?', options: ['5:00', '6:30', '6:00', '7:00'], answer: 0 },
              { q: 'Bố đi làm lúc mấy giờ?', options: ['6:30', '5:00', '12:00', '6:00'], answer: 0 },
              { q: 'Bố về nhà lúc nào?', options: ['6 giờ tối', '12 giờ trưa', '5 giờ sáng', '9 giờ tối'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 9 ─────────────────────────
    {
      id: 'u9', title: 'Nhà của tôi', titleEn: 'My home', icon: '🏠',
      goal: 'Mô tả ngôi nhà và vị trí đồ vật.',
      lessons: [
        {
          id: 'u9l1', title: 'Các phòng trong nhà', titleEn: 'Rooms', icon: '🛋️',
          goal: 'Gọi tên các phòng, dùng There is / There are.',
          vocab: [
            { en: 'house', vi: 'ngôi nhà', ipa: '/haʊs/', emoji: '🏠' },
            { en: 'room', vi: 'căn phòng', ipa: '/ruːm/', emoji: '🚪' },
            { en: 'kitchen', vi: 'nhà bếp', ipa: '/ˈkɪtʃən/', emoji: '🍳' },
            { en: 'bedroom', vi: 'phòng ngủ', ipa: '/ˈbedruːm/', emoji: '🛏️' },
            { en: 'bathroom', vi: 'phòng tắm', ipa: '/ˈbæθruːm/', emoji: '🛁' },
            { en: 'living room', vi: 'phòng khách', ipa: '/ˈlɪvɪŋ ruːm/', emoji: '🛋️' },
            { en: 'door', vi: 'cửa ra vào', ipa: '/dɔːr/', emoji: '🚪' },
            { en: 'window', vi: 'cửa sổ', ipa: '/ˈwɪndoʊ/', emoji: '🪟' },
          ],
          grammar: {
            title: 'There is / There are',
            points: [
              '<b>There is</b> + danh từ số ít: There is a kitchen. (Có một nhà bếp.)',
              '<b>There are</b> + danh từ số nhiều: There are three bedrooms. (Có ba phòng ngủ.)',
              'Hỏi: <b>Is there</b> a garden? – Yes, there is. / No, there isn\'t.',
              'Hỏi số lượng: <b>How many</b> rooms <b>are there</b>?',
            ],
            examples: [
              { en: 'There is a big window in my bedroom.', vi: 'Có một cửa sổ lớn trong phòng ngủ của tôi.' },
              { en: 'How many rooms are there? – There are five.', vi: 'Có bao nhiêu phòng? – Có năm phòng.' },
            ],
          },
          sentences: [
            { en: 'This is my house.', vi: 'Đây là nhà của tôi.' },
            { en: 'There is a big kitchen.', vi: 'Có một nhà bếp lớn.' },
            { en: 'There are two bedrooms.', vi: 'Có hai phòng ngủ.' },
            { en: 'Is there a bathroom?', vi: 'Có phòng tắm không?' },
            { en: 'The living room has a big window.', vi: 'Phòng khách có một cửa sổ lớn.' },
          ],
          reading: {
            title: 'Ngôi nhà nhỏ',
            text: 'I live in a small house. There are four rooms: a living room, a kitchen, a bedroom and a bathroom. The living room has two big windows. The door is red. I love my little house!',
            vi: 'Tôi sống trong một ngôi nhà nhỏ. Có bốn phòng: phòng khách, nhà bếp, phòng ngủ và phòng tắm. Phòng khách có hai cửa sổ lớn. Cửa ra vào màu đỏ. Tôi yêu ngôi nhà nhỏ của mình!',
            questions: [
              { q: 'Ngôi nhà có mấy phòng?', options: ['Bốn', 'Ba', 'Hai', 'Năm'], answer: 0 },
              { q: 'Phòng khách có mấy cửa sổ?', options: ['Hai', 'Một', 'Bốn', 'Không có'], answer: 0 },
              { q: 'Cửa ra vào màu gì?', options: ['Đỏ', 'Xanh lá', 'Trắng', 'Nâu'], answer: 0 },
            ],
          },
        },
        {
          id: 'u9l2', title: 'Ở đâu?', titleEn: 'Where is it?', icon: '📦',
          goal: 'Hỏi và chỉ vị trí bằng giới từ.',
          vocab: [
            { en: 'where', vi: 'ở đâu', ipa: '/wer/', emoji: '❔' },
            { en: 'in', vi: 'ở trong', ipa: '/ɪn/', emoji: '📥' },
            { en: 'on', vi: 'ở trên (bề mặt)', ipa: '/ɑːn/', emoji: '🔝' },
            { en: 'under', vi: 'ở dưới', ipa: '/ˈʌndər/', emoji: '⬇️' },
            { en: 'next to', vi: 'bên cạnh', ipa: '/nekst tuː/', emoji: '↔️' },
            { en: 'behind', vi: 'phía sau', ipa: '/bɪˈhaɪnd/', emoji: '🔙' },
            { en: 'in front of', vi: 'phía trước', ipa: '/ɪn frʌnt əv/', emoji: '🔜' },
            { en: 'box', vi: 'cái hộp', ipa: '/bɑːks/', emoji: '📦' },
          ],
          grammar: {
            title: 'Giới từ chỉ vị trí',
            points: [
              'Hỏi: <b>Where is</b> the cat? (Con mèo ở đâu?) – <b>It is under</b> the table.',
              '<b>in</b> (trong), <b>on</b> (trên, có chạm bề mặt), <b>under</b> (dưới), <b>next to</b> (cạnh), <b>behind</b> (sau), <b>in front of</b> (trước).',
              'Số nhiều: <b>Where are</b> my keys? – <b>They are on</b> the table.',
              '<b>the</b> dùng khi người nghe biết rõ vật đang nói tới: the table (cái bàn đó).',
            ],
            examples: [
              { en: "Where is my phone? – It's on the bed.", vi: 'Điện thoại của tôi đâu? – Nó ở trên giường.' },
              { en: 'The cat is in front of the door.', vi: 'Con mèo ở trước cửa.' },
            ],
          },
          sentences: [
            { en: 'Where is the cat?', vi: 'Con mèo ở đâu?' },
            { en: 'The cat is under the table.', vi: 'Con mèo ở dưới cái bàn.' },
            { en: 'The book is on the chair.', vi: 'Quyển sách ở trên cái ghế.' },
            { en: 'The gift is in the box.', vi: 'Món quà ở trong hộp.' },
            { en: 'The tree is next to the window.', vi: 'Cái cây ở cạnh cửa sổ.' },
            { en: 'The dog is behind the door.', vi: 'Con chó ở sau cánh cửa.' },
          ],
          reading: {
            title: 'Đi tìm mèo',
            text: "Mom: Where is the cat?\nTom: Is it under the bed?\nMom: No, it isn't.\nTom: Is it in the box?\nMom: No! Oh, look! It is behind the Christmas tree!",
            vi: 'Mẹ: Con mèo đâu rồi?\nTom: Nó có ở dưới giường không mẹ?\nMẹ: Không có.\nTom: Nó có ở trong hộp không?\nMẹ: Không! Ồ, nhìn kìa! Nó ở sau cây thông Noel!',
            questions: [
              { q: 'Họ đang tìm gì?', options: ['Con mèo', 'Con chó', 'Quyển sách', 'Món quà'], answer: 0 },
              { q: 'Con mèo có ở dưới giường không?', options: ['Không', 'Có', 'Không rõ', 'Có, nó đang ngủ'], answer: 0 },
              { q: 'Cuối cùng con mèo ở đâu?', options: ['Sau cây thông Noel', 'Trong hộp', 'Dưới giường', 'Trên bàn'], answer: 0 },
            ],
          },
        },
      ],
    },

    // ───────────────────────── CHẶNG 10 ─────────────────────────
    {
      id: 'u10', title: 'Giáng sinh vui vẻ', titleEn: 'Merry Christmas', icon: '🎄',
      goal: 'Nói về Giáng sinh, gửi lời chúc và kể việc đang làm.',
      lessons: [
        {
          id: 'u10l1', title: 'Mùa Giáng sinh', titleEn: 'Christmas time', icon: '🎅',
          goal: 'Từ vựng Giáng sinh, lời chúc và số nhiều đặc biệt.',
          vocab: [
            { en: 'Christmas', vi: 'Giáng sinh, Noel', ipa: '/ˈkrɪsməs/', emoji: '🎄' },
            { en: 'Christmas tree', vi: 'cây thông Noel', ipa: '/ˈkrɪsməs triː/', emoji: '🌲' },
            { en: 'gift', vi: 'món quà', ipa: '/ɡɪft/', emoji: '🎁', alts: ['present'] },
            { en: 'snow', vi: 'tuyết', ipa: '/snoʊ/', emoji: '❄️' },
            { en: 'star', vi: 'ngôi sao', ipa: '/stɑːr/', emoji: '⭐' },
            { en: 'Santa Claus', vi: 'ông già Noel', ipa: '/ˈsæntə klɔːz/', emoji: '🎅', alts: ['Santa'] },
            { en: 'bell', vi: 'cái chuông', ipa: '/bel/', emoji: '🔔' },
            { en: 'candle', vi: 'cây nến', ipa: '/ˈkændəl/', emoji: '🕯️' },
          ],
          grammar: {
            title: 'Lời chúc và số nhiều đặc biệt',
            points: [
              'Chúc mừng: <b>Merry Christmas!</b> (Giáng sinh vui vẻ!) – <b>Happy New Year!</b> (Chúc mừng năm mới!)',
              'Số nhiều thêm <b>-s</b>: gift → gifts, star → stars, bell → bells.',
              'Một số danh từ số nhiều bất quy tắc: <b>child → children</b> (trẻ em), <b>man → men</b>, <b>woman → women</b>.',
              '<b>Snow</b> là danh từ không đếm được: không nói "a snow", không thêm -s.',
            ],
            examples: [
              { en: 'Merry Christmas and Happy New Year!', vi: 'Giáng sinh vui vẻ và chúc mừng năm mới!' },
              { en: 'The children have many gifts.', vi: 'Bọn trẻ có nhiều quà.' },
            ],
          },
          sentences: [
            { en: 'Merry Christmas!', vi: 'Giáng sinh vui vẻ!' },
            { en: 'Santa Claus has many gifts.', vi: 'Ông già Noel có nhiều quà.', alts: ['Santa has many gifts.'] },
            { en: 'There is a star on the Christmas tree.', vi: 'Có một ngôi sao trên cây thông Noel.' },
            { en: 'The snow is white and cold.', vi: 'Tuyết trắng và lạnh.' },
            { en: 'The children love Christmas.', vi: 'Trẻ em yêu Giáng sinh.', alts: ['Children love Christmas.'] },
            { en: 'I can hear the bells.', vi: 'Tôi nghe thấy tiếng chuông.' },
          ],
          reading: {
            title: 'Đêm Giáng sinh',
            text: 'It is Christmas Eve. It is cold and there is snow outside. Our Christmas tree has a big star and many bells. We light candles. The children wait for Santa Claus and their gifts.',
            vi: 'Đêm nay là đêm Giáng sinh. Trời lạnh và bên ngoài có tuyết. Cây thông Noel nhà chúng tôi có một ngôi sao lớn và nhiều chuông. Chúng tôi thắp nến. Bọn trẻ chờ ông già Noel và những món quà.',
            questions: [
              { q: 'Thời tiết đêm Giáng sinh thế nào?', options: ['Lạnh và có tuyết', 'Nóng', 'Mưa', 'Có nắng'], answer: 0 },
              { q: 'Trên cây thông có gì?', options: ['Ngôi sao lớn và nhiều chuông', 'Chỉ có nến', 'Tuyết', 'Không có gì'], answer: 0 },
              { q: 'Bọn trẻ đang chờ ai?', options: ['Ông già Noel', 'Bà', 'Cô giáo', 'Bạn bè'], answer: 0 },
            ],
          },
        },
        {
          id: 'u10l2', title: 'Tiệc Giáng sinh', titleEn: 'Christmas party', icon: '🎉',
          goal: 'Thì hiện tại tiếp diễn, rủ rê với Let\'s và gửi lời chúc.',
          vocab: [
            { en: 'party', vi: 'bữa tiệc', ipa: '/ˈpɑːrti/', emoji: '🎉' },
            { en: 'card', vi: 'tấm thiệp', ipa: '/kɑːrd/', emoji: '💌' },
            { en: 'sing', vi: 'hát', ipa: '/sɪŋ/', emoji: '🎤' },
            { en: 'song', vi: 'bài hát', ipa: '/sɔːŋ/', emoji: '🎵' },
            { en: 'decorate', vi: 'trang trí', ipa: '/ˈdekəreɪt/', emoji: '✨' },
            { en: 'wish', vi: 'chúc, điều ước', ipa: '/wɪʃ/', emoji: '🌠' },
            { en: 'cookie', vi: 'bánh quy', ipa: '/ˈkʊki/', emoji: '🍪' },
            { en: 'reindeer', vi: 'tuần lộc', ipa: '/ˈreɪndɪr/', emoji: '🦌' },
          ],
          grammar: {
            title: 'Hiện tại tiếp diễn và Let\'s',
            points: [
              'Việc <b>đang</b> xảy ra: <b>am / is / are + động từ-ing</b>. I <b>am singing</b>. (Tôi đang hát.)',
              'She <b>is decorating</b> the tree. They <b>are eating</b> cookies.',
              'Rủ rê: <b>Let\'s</b> + động từ nguyên mẫu: <b>Let\'s sing</b> a song! (Cùng hát nào!)',
              'Gửi lời chúc: <b>I wish you</b> a Merry Christmas. (Chúc bạn Giáng sinh vui vẻ.)',
            ],
            examples: [
              { en: "Let's decorate the tree!", vi: 'Cùng trang trí cây thông nào!' },
              { en: 'They are singing Christmas songs.', vi: 'Họ đang hát những bài hát Giáng sinh.' },
            ],
          },
          sentences: [
            { en: "Let's sing a Christmas song!", vi: 'Cùng hát một bài hát Giáng sinh nào!' },
            { en: 'We are decorating the tree.', vi: 'Chúng tôi đang trang trí cây thông.' },
            { en: 'She is writing a card.', vi: 'Cô ấy đang viết thiệp.' },
            { en: 'I am eating a cookie.', vi: 'Tôi đang ăn một chiếc bánh quy.' },
            { en: 'I wish you a Merry Christmas.', vi: 'Chúc bạn một Giáng sinh vui vẻ.' },
            { en: 'Welcome to our party!', vi: 'Chào mừng đến bữa tiệc của chúng tôi!' },
          ],
          reading: {
            title: 'Tiệc Giáng sinh ở lớp',
            text: 'Today we have a Christmas party at school. Lily is decorating the room. Tom and Ben are singing a song. Mai is making cards for her friends. The teacher has cookies for everyone. What a happy day!',
            vi: 'Hôm nay chúng mình có tiệc Giáng sinh ở trường. Lily đang trang trí phòng. Tom và Ben đang hát. Mai đang làm thiệp cho các bạn. Cô giáo có bánh quy cho mọi người. Thật là một ngày vui!',
            questions: [
              { q: 'Lily đang làm gì?', options: ['Trang trí phòng', 'Hát', 'Làm thiệp', 'Ăn bánh quy'], answer: 0 },
              { q: 'Ai đang hát?', options: ['Tom và Ben', 'Lily', 'Mai', 'Cô giáo'], answer: 0 },
              { q: 'Cô giáo mang gì cho mọi người?', options: ['Bánh quy', 'Thiệp', 'Quà', 'Nến'], answer: 0 },
            ],
          },
        },
      ],
    },
  ],
});
