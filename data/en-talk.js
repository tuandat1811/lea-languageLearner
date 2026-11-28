/*
 * Tiếng Anh giao tiếp: mỗi chặng một tình huống, mở khi học xong chặng đó.
 *
 * Cấu trúc một tình huống (khoá là id của chặng):
 *   title, titleEn, icon, situation (bối cảnh, tiếng Việt), partner (tên người đối thoại)
 *   phrases:   [{ fn: 'chức năng', items: [{ en, vi, note? }] }]   – mẫu câu theo chức năng
 *   culture:   ['lưu ý văn hoá / lịch sự']
 *   dialogue:  [{ who, en, vi }] hoặc [{ you: true, en, vi, accept: [câu đáp khác cũng được chấp nhận] }]
 *   responses: [{ say?, context?, options: [...], answer, why }] – chọn câu đáp phù hợp (answer: chỉ số đáp án đúng)
 * Bài tập (chọn câu đáp, sắp xếp hội thoại, nói câu đáp) được sinh từ dữ liệu này (js/core/exercises.js).
 */
LEA.extendLanguage('en', {
  talk: {
    // ───────────────────────── CẤP 1 ─────────────────────────
    u1: {
      title: 'Chào hàng xóm', titleEn: 'Saying hello to a neighbour', icon: '🏡',
      situation: 'Buổi sáng, bạn gặp bà Brown – hàng xóm – trước cửa nhà. Bà mang thư đến cho bạn.',
      partner: 'Mrs Brown',
      phrases: [
        { fn: 'Chào khi gặp', items: [
          { en: 'Good morning!', vi: 'Chào buổi sáng!' },
          { en: 'Hello! / Hi!', vi: 'Xin chào!', note: 'Hi thân mật hơn, dùng với bạn bè.' },
          { en: 'Good afternoon, Mr Smith.', vi: 'Chào buổi chiều, ông Smith.' },
        ] },
        { fn: 'Tạm biệt', items: [
          { en: 'Goodbye! / Bye!', vi: 'Tạm biệt!' },
          { en: 'See you later!', vi: 'Hẹn gặp lại!' },
          { en: 'Have a nice day!', vi: 'Chúc một ngày tốt lành!', note: 'Đáp lại: "You too!"' },
        ] },
        { fn: 'Cảm ơn và đáp lại', items: [
          { en: 'Thank you very much!', vi: 'Cảm ơn rất nhiều!' },
          { en: "You're welcome. / No problem.", vi: 'Không có gì.' },
        ] },
        { fn: 'Xin lỗi', items: [
          { en: "Sorry! / I'm so sorry!", vi: 'Xin lỗi!' },
          { en: "That's okay.", vi: 'Không sao đâu.' },
        ] },
      ],
      culture: [
        'Khi chào người lớn tuổi hoặc người không thân, thêm <b>Mr / Mrs / Ms + họ</b>: "Good morning, Mrs Brown!". Không dùng Mr/Ms với tên riêng (không nói "Mr Tom").',
        '<b>Good night</b> chỉ dùng khi chia tay buổi tối hoặc trước khi đi ngủ – không dùng để chào khi gặp nhau.',
        'Người Anh, Mỹ hay chúc <b>"Have a nice day!"</b> khi chia tay. Đáp lại ngắn gọn: <b>"You too!"</b>',
      ],
      dialogue: [
        { who: 'Mrs Brown', en: 'Good morning!', vi: 'Chào buổi sáng cháu!' },
        { you: true, en: 'Good morning, Mrs Brown!', vi: 'Cháu chào bà Brown ạ!', accept: ['Good morning!', 'Hello, Mrs Brown!', 'Hi, Mrs Brown!'] },
        { who: 'Mrs Brown', en: 'Here is your letter.', vi: 'Thư của cháu đây.' },
        { you: true, en: 'Thank you very much!', vi: 'Cháu cảm ơn bà nhiều ạ!', accept: ['Thank you!', 'Thanks!', 'Thank you so much!'] },
        { who: 'Mrs Brown', en: "You're welcome. Have a nice day!", vi: 'Không có gì. Chúc cháu một ngày tốt lành!' },
        { you: true, en: 'Thank you. You too!', vi: 'Cháu cảm ơn. Bà cũng vậy nhé!', accept: ['You too!', 'Thanks, you too!'] },
        { who: 'Mrs Brown', en: 'Bye! See you later.', vi: 'Tạm biệt! Hẹn gặp lại.' },
        { you: true, en: 'Goodbye, Mrs Brown!', vi: 'Cháu chào bà ạ!', accept: ['Bye!', 'Goodbye!', 'See you later!', 'Bye, Mrs Brown!'] },
      ],
      responses: [
        { context: 'Bạn gặp cô giáo lúc 8 giờ sáng.', options: ['Good morning!', 'Good night!', 'Goodbye!'], answer: 0, why: '"Good night" chỉ dùng khi chia tay buổi tối. Gặp nhau buổi sáng thì nói "Good morning".' },
        { context: 'Bạn giữ cửa giúp một người. Họ nói:', say: 'Thank you!', options: ["You're welcome.", 'Sorry.', 'Good morning.'], answer: 0, why: 'Đáp lại lời cảm ơn: "You\'re welcome." hoặc "No problem."' },
        { context: 'Người bán hàng chào bạn khi bạn ra về:', say: 'Have a nice day!', options: ['You too!', 'Yes, I do.', "I'm fine."], answer: 0, why: 'Đáp lời chúc bằng "You too!" (bạn cũng vậy nhé).' },
        { context: 'Bạn lỡ giẫm vào chân một người.', options: ["I'm so sorry!", 'Thank you!', 'Hello!'], answer: 0, why: 'Khi làm sai, xin lỗi bằng "Sorry!" hoặc "I\'m so sorry!".' },
      ],
    },

    u2: {
      title: 'Làm quen ở lớp học', titleEn: 'Meeting a new classmate', icon: '🤝',
      situation: 'Ngày đầu tiên ở lớp tiếng Anh. Bạn tên là Nam. Anna ngồi cạnh bạn và bắt chuyện.',
      partner: 'Anna',
      phrases: [
        { fn: 'Hỏi và nói tên', items: [
          { en: "What's your name?", vi: 'Bạn tên là gì?' },
          { en: "My name is Nam. / I'm Nam.", vi: 'Mình tên là Nam.' },
        ] },
        { fn: 'Gặp lần đầu', items: [
          { en: 'Nice to meet you.', vi: 'Rất vui được gặp bạn.' },
          { en: 'Nice to meet you, too.', vi: 'Mình cũng rất vui được gặp bạn.' },
        ] },
        { fn: 'Hỏi thăm', items: [
          { en: 'How are you?', vi: 'Bạn khoẻ không?' },
          { en: "I'm fine, thank you. And you?", vi: 'Mình khoẻ, cảm ơn. Còn bạn?' },
          { en: 'Not bad, thanks.', vi: 'Cũng ổn, cảm ơn.' },
        ] },
        { fn: 'Giới thiệu người khác', items: [
          { en: 'This is my friend, Lan.', vi: 'Đây là bạn mình, Lan.' },
        ] },
      ],
      culture: [
        '<b>"How are you?"</b> thường chỉ là một lời chào. Trả lời ngắn gọn "Fine, thanks. And you?" là đủ, không cần kể chi tiết.',
        'Giữa bạn bè cùng lớp chỉ cần nói "Hi!". Ở nơi trang trọng (phỏng vấn, gặp đối tác), người ta thường bắt tay khi gặp lần đầu.',
        'Hỏi lại <b>"And you?"</b> để cuộc trò chuyện không bị một chiều.',
      ],
      dialogue: [
        { who: 'Anna', en: "Hi! I'm Anna. What's your name?", vi: 'Chào bạn! Mình là Anna. Bạn tên gì?' },
        { you: true, en: 'Hi, Anna! My name is Nam.', vi: 'Chào Anna! Mình tên là Nam.', accept: ["I'm Nam.", 'My name is Nam.', "Hi! I'm Nam."] },
        { who: 'Anna', en: 'Nice to meet you, Nam.', vi: 'Rất vui được gặp bạn, Nam.' },
        { you: true, en: 'Nice to meet you, too.', vi: 'Mình cũng rất vui được gặp bạn.', accept: ['Nice to meet you too!', 'Nice to meet you, too, Anna.'] },
        { who: 'Anna', en: 'How are you today?', vi: 'Hôm nay bạn thế nào?' },
        { you: true, en: "I'm fine, thank you. And you?", vi: 'Mình khoẻ, cảm ơn bạn. Còn bạn?', accept: ['Fine, thanks. And you?', "I'm good, thanks. And you?", "I'm fine, thanks. How are you?"] },
        { who: 'Anna', en: "I'm great! This is my friend, Tom.", vi: 'Mình khoẻ lắm! Đây là bạn mình, Tom.' },
        { you: true, en: 'Hi, Tom! Nice to meet you.', vi: 'Chào Tom! Rất vui được gặp bạn.', accept: ['Hello, Tom!', 'Nice to meet you, Tom.', 'Hi, Tom!'] },
      ],
      responses: [
        { say: 'Nice to meet you.', options: ['Nice to meet you, too.', 'Yes, I am.', 'Goodbye.'], answer: 0, why: 'Đáp "Nice to meet you" bằng "Nice to meet you, too."' },
        { say: 'How are you?', options: ["I'm fine, thanks. And you?", "I'm twelve.", "I'm Nam."], answer: 0, why: '"How are you?" hỏi thăm sức khoẻ, không hỏi tuổi hay tên.' },
        { say: "What's your name?", options: ["I'm Lan.", "I'm fine.", 'Yes, it is.'], answer: 0, why: 'Hỏi tên thì đáp "I\'m…" hoặc "My name is…".' },
        { context: 'Bạn muốn giới thiệu bạn Minh với Anna.', options: ['This is my friend, Minh.', 'He is name Minh.', 'Minh is me.'], answer: 0, why: 'Giới thiệu người khác bằng "This is…".' },
      ],
    },

    u3: {
      title: 'Xin số điện thoại', titleEn: 'Swapping phone numbers', icon: '📱',
      situation: 'Bạn và Tom vừa làm quen ở câu lạc bộ. Bạn muốn xin số điện thoại của Tom.',
      partner: 'Tom',
      phrases: [
        { fn: 'Hỏi số điện thoại', items: [
          { en: "What's your phone number?", vi: 'Số điện thoại của bạn là gì?' },
          { en: "It's 0912 345 678.", vi: 'Số của mình là 0912 345 678.' },
        ] },
        { fn: 'Đọc số điện thoại', items: [
          { en: 'oh-nine-one-two…', vi: 'Đọc từng chữ số một; số 0 đọc là "oh" hoặc "zero".' },
          { en: 'double three', vi: 'Hai số giống nhau liền nhau: 33 = double three.' },
        ] },
        { fn: 'Hỏi tuổi', items: [
          { en: 'How old are you?', vi: 'Bạn bao nhiêu tuổi?' },
          { en: "I'm twelve (years old).", vi: 'Mình mười hai tuổi.' },
        ] },
        { fn: 'Nhờ nhắc lại', items: [
          { en: 'Sorry, can you say that again?', vi: 'Xin lỗi, bạn nói lại được không?' },
          { en: 'Can you say it slowly, please?', vi: 'Bạn nói chậm lại giúp mình nhé?' },
        ] },
      ],
      culture: [
        'Khi đọc số điện thoại, người Anh thường đọc số 0 là <b>"oh"</b>, người Mỹ hay đọc <b>"zero"</b>. Cả hai đều đúng.',
        'Hỏi tuổi người lớn hoặc người mới quen có thể bị coi là bất lịch sự. Chỉ nên hỏi tuổi trẻ em hoặc bạn bè cùng trang lứa.',
        'Không nghe rõ thì nói <b>"Sorry?"</b> hoặc <b>"Pardon?"</b> với giọng lên cao – lịch sự hơn "What?".',
      ],
      dialogue: [
        { you: true, en: "What's your phone number, Tom?", vi: 'Số điện thoại của bạn là gì vậy Tom?', accept: ["What's your phone number?", 'Can I have your phone number?', 'What is your phone number?'] },
        { who: 'Tom', en: "It's 0987 654 321.", vi: 'Số của mình là 0987 654 321.' },
        { you: true, en: 'Sorry, can you say that again?', vi: 'Xin lỗi, bạn nói lại được không?', accept: ['Sorry?', 'Pardon?', 'Can you say that again, please?', 'Sorry, can you say it again?'] },
        { who: 'Tom', en: 'Sure. Oh-nine-eight-seven, six-five-four, three-two-one.', vi: 'Được chứ. Không-chín-tám-bảy, sáu-năm-bốn, ba-hai-một.' },
        { you: true, en: 'Thank you! How old are you, Tom?', vi: 'Cảm ơn bạn! Bạn bao nhiêu tuổi vậy Tom?', accept: ['Thanks! How old are you?', 'How old are you?', 'Thank you! How old are you?'] },
        { who: 'Tom', en: "I'm thirteen. And you?", vi: 'Mình mười ba. Còn bạn?' },
        { you: true, en: "I'm twelve years old.", vi: 'Mình mười hai tuổi.', accept: ["I'm twelve.", 'I am twelve years old.', 'Twelve.'] },
      ],
      responses: [
        { say: 'How old are you?', options: ["I'm twelve.", "I'm fine.", "It's twelve o'clock."], answer: 0, why: '"How old…?" hỏi tuổi – đáp "I\'m + số tuổi".' },
        { context: 'Bạn không nghe rõ số điện thoại.', options: ['Sorry, can you say that again?', 'What?!', 'No.'], answer: 0, why: '"Sorry, can you say that again?" lịch sự hơn nhiều so với "What?".' },
        { context: 'Cách người Anh hay đọc "33" trong số điện thoại:', options: ['double three', 'three three times', 'thirty-three'], answer: 0, why: 'Hai chữ số giống nhau liền nhau đọc là "double": 33 = double three.' },
        { say: "What's your phone number?", options: ["It's 0912 345 678.", "I'm 0912.", 'Yes, I have.'], answer: 0, why: 'Cho số điện thoại: "It\'s…".' },
      ],
    },

    u4: {
      title: 'Mượn đồ dùng học tập', titleEn: 'Borrowing things', icon: '✏️',
      situation: 'Trong giờ học, bạn quên mang bút. Bạn hỏi mượn bút của Mai, bạn ngồi bên cạnh.',
      partner: 'Mai',
      phrases: [
        { fn: 'Hỏi mượn', items: [
          { en: 'Can I borrow your pen, please?', vi: 'Cho mình mượn bút của bạn nhé?' },
          { en: 'Sure. Here you are.', vi: 'Được chứ. Của bạn đây.' },
          { en: 'Sorry, I need it.', vi: 'Xin lỗi, mình đang cần dùng.' },
        ] },
        { fn: 'Hỏi cái nào', items: [
          { en: 'Which one?', vi: 'Cái nào?' },
          { en: 'The red one, please.', vi: 'Cái màu đỏ nhé.' },
        ] },
        { fn: 'Hỏi đồ vật', items: [
          { en: "What's this?", vi: 'Đây là cái gì?' },
          { en: "It's an eraser.", vi: 'Đó là cục tẩy.' },
        ] },
        { fn: 'Trả lại', items: [
          { en: "Here's your pen. Thanks!", vi: 'Bút của bạn đây. Cảm ơn nhé!' },
        ] },
      ],
      culture: [
        '<b>"Here you are."</b> là câu chuẩn khi đưa đồ cho ai đó.',
        'Luôn thêm <b>"please"</b> khi hỏi mượn đồ – thiếu "please" nghe khá cộc lốc.',
        'Dùng <b>"the … one"</b> để khỏi lặp lại danh từ: "the blue one" = cái màu xanh.',
      ],
      dialogue: [
        { you: true, en: 'Excuse me, Mai. Can I borrow your pen, please?', vi: 'Mai ơi, cho mình mượn cây bút nhé?', accept: ['Can I borrow your pen, please?', 'Can I borrow your pen?', 'Excuse me, can I borrow your pen?'] },
        { who: 'Mai', en: 'Sure. Which one? The black pen or the red pen?', vi: 'Được chứ. Cây nào? Bút đen hay bút đỏ?' },
        { you: true, en: 'The red one, please.', vi: 'Cây màu đỏ nhé.', accept: ['The red one.', 'The red pen, please.', 'Red, please.'] },
        { who: 'Mai', en: 'Here you are.', vi: 'Của bạn đây.' },
        { you: true, en: "Thank you! What's this?", vi: 'Cảm ơn bạn! Đây là cái gì vậy?', accept: ['Thanks! What is this?', "What's this?", 'Thank you. What is this?'] },
        { who: 'Mai', en: "It's an eraser. Do you need it too?", vi: 'Đó là cục tẩy. Bạn có cần nó không?' },
        { you: true, en: 'No, thank you.', vi: 'Không, cảm ơn bạn.', accept: ['No, thanks.', "No, thank you. I'm okay."] },
      ],
      responses: [
        { context: 'Bạn đưa quyển sách cho bạn cùng lớp.', options: ['Here you are.', 'Here are you.', 'You are here.'], answer: 0, why: 'Câu chuẩn khi đưa đồ: "Here you are."' },
        { say: 'Which one?', options: ['The blue one.', 'Yes, one.', "It's one."], answer: 0, why: '"Which one?" hỏi cái nào – đáp "The … one."' },
        { context: 'Bạn muốn mượn thước kẻ của bạn.', options: ['Can I borrow your ruler, please?', 'Give me ruler.', 'I borrow your ruler.'], answer: 0, why: 'Hỏi mượn lịch sự: "Can I borrow…, please?"' },
        { say: "What's this?", options: ["It's an umbrella.", "It's a umbrella.", 'This umbrella.'], answer: 0, why: 'Trước âm nguyên âm dùng "an": an umbrella.' },
      ],
    },

    u5: {
      title: 'Kể về ảnh gia đình', titleEn: 'Talking about a family photo', icon: '🖼️',
      situation: 'Emma, bạn của bạn, nhìn thấy ảnh gia đình bạn trên điện thoại và hỏi về những người trong ảnh.',
      partner: 'Emma',
      phrases: [
        { fn: 'Hỏi người trong ảnh', items: [
          { en: "Who's this?", vi: 'Đây là ai?' },
          { en: 'This is my brother, Huy.', vi: 'Đây là anh trai mình, Huy.' },
        ] },
        { fn: 'Mô tả người thân', items: [
          { en: "He's tall and funny.", vi: 'Anh ấy cao và vui tính.' },
          { en: "My mother is a teacher. She's very kind.", vi: 'Mẹ mình là giáo viên. Mẹ rất hiền.' },
        ] },
        { fn: 'Khen và đáp lời khen', items: [
          { en: 'What a lovely photo!', vi: 'Bức ảnh đẹp quá!' },
          { en: 'Your family is so nice!', vi: 'Gia đình bạn dễ thương quá!' },
          { en: 'Thank you!', vi: 'Cảm ơn bạn!' },
        ] },
      ],
      culture: [
        'Khi bạn bè cho xem ảnh gia đình, người nói tiếng Anh thường khen một câu: <b>"What a lovely family!"</b>',
        'Hỏi về người thì dùng <b>"Who\'s this?"</b> – "What\'s this?" chỉ dùng cho đồ vật.',
        'Được khen thì đáp <b>"Thank you!"</b> – không cần chối khéo như trong tiếng Việt ("Đâu có").',
      ],
      dialogue: [
        { who: 'Emma', en: 'Is this your family photo?', vi: 'Đây là ảnh gia đình bạn à?' },
        { you: true, en: 'Yes, it is. This is my family.', vi: 'Đúng rồi. Đây là gia đình mình.', accept: ['Yes, it is.', 'Yes! This is my family.'] },
        { who: 'Emma', en: "What a lovely photo! Who's this?", vi: 'Ảnh đẹp quá! Đây là ai thế?' },
        { you: true, en: "This is my mother. She's a teacher.", vi: 'Đây là mẹ mình. Mẹ là giáo viên.', accept: ['This is my mother.', "That's my mom. She's a teacher.", "She's my mother."] },
        { who: 'Emma', en: "And who's this tall boy?", vi: 'Còn cậu con trai cao này là ai?' },
        { you: true, en: "He's my brother, Huy. He's very funny.", vi: 'Anh trai mình, Huy. Anh ấy rất vui tính.', accept: ["That's my brother, Huy.", "He's my brother.", 'This is my brother, Huy.'] },
        { who: 'Emma', en: 'Your family is so nice!', vi: 'Gia đình bạn dễ thương quá!' },
        { you: true, en: 'Thank you!', vi: 'Cảm ơn bạn!', accept: ['Thanks!', 'Thank you very much!', 'Thanks a lot!'] },
      ],
      responses: [
        { context: 'Bạn chỉ vào một người trong ảnh và muốn hỏi đó là ai.', options: ["Who's this?", "What's this?", "Where's this?"], answer: 0, why: 'Hỏi về người dùng "Who"; "What" dùng cho đồ vật.' },
        { say: 'Is this your sister?', options: ["Yes, it is. She's my sister.", 'Yes, I do.', 'Yes, she do.'], answer: 0, why: 'Câu hỏi bắt đầu bằng "Is…?" đáp "Yes, it is." / "No, it isn\'t."' },
        { say: 'What a lovely family!', options: ['Thank you!', "You're welcome.", 'Sorry.'], answer: 0, why: 'Được khen thì đáp "Thank you!" – "You\'re welcome" dùng để đáp lời cảm ơn.' },
        { context: 'Bạn muốn nói: Bố tôi cao và khoẻ.', options: ['My father is tall and strong.', 'My father tall and strong.', 'My father are tall and strong.'], answer: 0, why: 'Câu mô tả cần động từ "be" chia đúng: My father is…' },
      ],
    },

    u6: {
      title: 'Ở quán cà phê', titleEn: 'At a café', icon: '☕',
      situation: 'Bạn vào một quán cà phê để gọi đồ uống và bánh, rồi thanh toán.',
      partner: 'Staff',
      phrases: [
        { fn: 'Nhân viên hỏi', items: [
          { en: 'What would you like?', vi: 'Bạn muốn dùng gì?' },
          { en: 'Anything else?', vi: 'Bạn có gọi thêm gì không?' },
          { en: 'For here or to go?', vi: 'Dùng tại chỗ hay mang đi?' },
        ] },
        { fn: 'Gọi món', items: [
          { en: 'Can I have a cup of tea, please?', vi: 'Cho tôi một tách trà nhé.' },
          { en: 'A piece of cake, please.', vi: 'Cho tôi một miếng bánh.' },
          { en: "No, that's all, thanks.", vi: 'Không, vậy thôi, cảm ơn.' },
        ] },
        { fn: 'Hỏi giá và trả tiền', items: [
          { en: 'How much is it?', vi: 'Bao nhiêu tiền vậy?' },
          { en: "That's five dollars.", vi: 'Tất cả là năm đô la.' },
          { en: 'Here you are.', vi: 'Gửi bạn.' },
        ] },
      ],
      culture: [
        'Ở Mỹ, nhân viên hay hỏi <b>"For here or to go?"</b> (dùng tại chỗ hay mang đi). Ở Anh thường hỏi "Eat in or take away?".',
        'Gọi món luôn kèm <b>"please"</b> và cảm ơn khi nhận đồ.',
        'Muốn gọi nhân viên, nói <b>"Excuse me!"</b> – không vẫy tay hay gõ bàn.',
      ],
      dialogue: [
        { who: 'Staff', en: 'Hi! What would you like?', vi: 'Xin chào! Bạn muốn dùng gì?' },
        { you: true, en: 'Can I have a cup of coffee, please?', vi: 'Cho tôi một tách cà phê nhé.', accept: ['A coffee, please.', 'Can I have a coffee, please?', 'One coffee, please.'] },
        { who: 'Staff', en: 'Sure. Anything else?', vi: 'Vâng. Bạn gọi thêm gì không?' },
        { you: true, en: 'Yes, a piece of cake, please.', vi: 'Có, cho tôi một miếng bánh.', accept: ['And a piece of cake, please.', 'Can I have a piece of cake, please?', 'A piece of cake, please.'] },
        { who: 'Staff', en: 'For here or to go?', vi: 'Dùng tại chỗ hay mang đi ạ?' },
        { you: true, en: 'For here, please.', vi: 'Dùng tại chỗ.', accept: ['For here.', 'For here, thanks.'] },
        { who: 'Staff', en: "That's five dollars.", vi: 'Tất cả là năm đô la.' },
        { you: true, en: 'Here you are. Thank you!', vi: 'Gửi bạn. Cảm ơn nhé!', accept: ['Here you are.', 'Here you go. Thanks!'] },
      ],
      responses: [
        { say: 'Anything else?', options: ["No, that's all, thanks.", 'Yes, I am.', "No, I don't like."], answer: 0, why: 'Không gọi thêm: "No, that\'s all, thanks."' },
        { say: 'For here or to go?', options: ['To go, please.', 'Yes, please.', "I'm here."], answer: 0, why: 'Chọn một trong hai: "For here" (tại chỗ) hoặc "To go" (mang đi).' },
        { context: 'Bạn muốn gọi một tách trà một cách lịch sự.', options: ['Can I have a cup of tea, please?', 'Give me tea.', 'I want tea now.'], answer: 0, why: '"Can I have…, please?" là cách gọi món lịch sự.' },
        { context: 'Bạn muốn hỏi giá cái bánh.', options: ['How much is it?', 'How many is it?', 'What is cost?'], answer: 0, why: 'Hỏi giá: "How much is it?"' },
      ],
    },

    u7: {
      title: 'Hỏi về thói quen hằng ngày', titleEn: 'Talking about routines', icon: '⏰',
      situation: 'Giờ ra chơi, Jack hỏi bạn thường làm gì sau giờ học.',
      partner: 'Jack',
      phrases: [
        { fn: 'Hỏi thói quen', items: [
          { en: 'What do you usually do after school?', vi: 'Sau giờ học bạn thường làm gì?' },
          { en: 'What time do you usually get up?', vi: 'Bạn thường dậy lúc mấy giờ?' },
        ] },
        { fn: 'Hỏi mức độ thường xuyên', items: [
          { en: 'How often do you play sport?', vi: 'Bạn chơi thể thao thường xuyên không?' },
          { en: 'Twice a week. / Every day.', vi: 'Hai lần một tuần. / Hằng ngày.' },
        ] },
        { fn: 'Đồng ý và hỏi lại', items: [
          { en: 'Me too!', vi: 'Mình cũng vậy!', note: 'Đáp câu khẳng định.' },
          { en: 'Me neither.', vi: 'Mình cũng không.', note: 'Đáp câu phủ định.' },
          { en: 'What about you?', vi: 'Còn bạn thì sao?' },
        ] },
      ],
      culture: [
        'Câu trả lời ngắn rất tự nhiên: <b>"Every day."</b> thay vì nhắc lại cả câu.',
        'Dùng <b>"Me too!"</b> để đồng ý với câu khẳng định, <b>"Me neither."</b> với câu phủ định.',
        'Hỏi lại <b>"What about you?"</b> cho thấy bạn quan tâm đến người kia.',
      ],
      dialogue: [
        { who: 'Jack', en: 'What do you usually do after school?', vi: 'Sau giờ học bạn thường làm gì?' },
        { you: true, en: 'I usually play football with my friends.', vi: 'Mình thường đá bóng với các bạn.', accept: ['I usually play football.', 'I play football with my friends.', 'I often play football with my friends.'] },
        { who: 'Jack', en: 'Me too! How often do you play?', vi: 'Mình cũng vậy! Bạn chơi thường xuyên không?' },
        { you: true, en: 'Three times a week. What about you?', vi: 'Ba lần một tuần. Còn bạn?', accept: ['Three times a week.', 'Three times a week. And you?'] },
        { who: 'Jack', en: 'Every day! Do you get up early?', vi: 'Ngày nào cũng chơi! Bạn có dậy sớm không?' },
        { you: true, en: "Yes, I always get up at six o'clock.", vi: 'Có, mình luôn dậy lúc sáu giờ.', accept: ['Yes, I get up at six.', 'Yes, I always get up at six.', 'Yes, I usually get up at six.'] },
        { who: 'Jack', en: "Wow, that's early!", vi: 'Ồ, sớm thật đấy!' },
        { you: true, en: 'Yes, but I go to bed early, too.', vi: 'Ừ, nhưng mình cũng đi ngủ sớm.', accept: ['But I go to bed early, too.', 'Yes, but I go to bed early.'] },
      ],
      responses: [
        { say: 'How often do you watch TV?', options: ['Every evening.', 'At seven.', 'Yes, I do.'], answer: 0, why: '"How often" hỏi mức độ thường xuyên – đáp every day, twice a week, sometimes…' },
        { say: 'I love pizza!', options: ['Me too!', 'Me neither.', 'Yes, I am.'], answer: 0, why: 'Đồng ý với câu khẳng định: "Me too!".' },
        { say: "I don't like coffee.", options: ['Me neither.', 'Me too.', 'Yes, I like.'], answer: 0, why: 'Đồng ý với câu phủ định: "Me neither."' },
        { context: 'Bạn muốn hỏi bạn thường dậy lúc mấy giờ.', options: ['What time do you usually get up?', 'What time you usually get up?', 'What time does you get up?'], answer: 0, why: 'Câu hỏi thì hiện tại đơn cần trợ động từ "do": What time do you…?' },
      ],
    },

    u8: {
      title: 'Hẹn giờ gặp nhau', titleEn: 'Making plans to meet', icon: '📅',
      situation: 'Lily rủ bạn cuối tuần đi xem phim. Hai bạn hẹn ngày, giờ và chỗ gặp.',
      partner: 'Lily',
      phrases: [
        { fn: 'Hỏi có rảnh không', items: [
          { en: 'Are you free on Saturday?', vi: 'Thứ Bảy bạn rảnh không?' },
          { en: "Yes, I am. / Sorry, I'm busy.", vi: 'Có, mình rảnh. / Xin lỗi, mình bận.' },
        ] },
        { fn: 'Rủ và nhận lời', items: [
          { en: "Let's go to the cinema!", vi: 'Mình đi xem phim đi!' },
          { en: 'Good idea! / Sure!', vi: 'Ý hay đấy! / Được chứ!' },
          { en: "Sorry, I can't. Maybe next time?", vi: 'Xin lỗi, mình không đi được. Lần sau nhé?' },
        ] },
        { fn: 'Hẹn giờ và chỗ', items: [
          { en: "Let's meet at half past three.", vi: 'Mình gặp nhau lúc ba rưỡi nhé.' },
          { en: 'Where shall we meet?', vi: 'Mình gặp nhau ở đâu?' },
          { en: 'See you on Saturday!', vi: 'Hẹn gặp bạn thứ Bảy!' },
        ] },
      ],
      culture: [
        'Người Anh, Mỹ rất coi trọng đúng giờ. Nếu đến muộn, hãy nhắn trước: <b>"Sorry, I\'m running late!"</b>',
        'Từ chối lịch sự: <b>"Sorry, I can\'t. Maybe next time?"</b> thay vì chỉ nói "No."',
        'Ngày dùng <b>on</b> (on Saturday), giờ dùng <b>at</b> (at three o\'clock).',
      ],
      dialogue: [
        { who: 'Lily', en: 'Are you free on Saturday?', vi: 'Thứ Bảy bạn rảnh không?' },
        { you: true, en: 'Yes, I am. Why?', vi: 'Có, mình rảnh. Sao thế?', accept: ['Yes, I am.', "Yes, I'm free.", 'Yes! Why?'] },
        { who: 'Lily', en: "Let's go to the cinema!", vi: 'Mình đi xem phim đi!' },
        { you: true, en: 'Good idea! What time?', vi: 'Ý hay đấy! Mấy giờ?', accept: ['Great idea! What time?', 'Sure! What time?', 'Okay! What time?'] },
        { who: 'Lily', en: "The film starts at four o'clock.", vi: 'Phim bắt đầu lúc bốn giờ.' },
        { you: true, en: "Let's meet at half past three.", vi: 'Mình gặp nhau lúc ba rưỡi nhé.', accept: ["Let's meet at three thirty.", 'Can we meet at half past three?'] },
        { who: 'Lily', en: 'Okay. Where shall we meet?', vi: 'Được. Mình gặp nhau ở đâu?' },
        { you: true, en: 'At the bus stop near my house.', vi: 'Ở bến xe buýt gần nhà mình.', accept: ['At the bus stop.', "Let's meet at the bus stop."] },
        { who: 'Lily', en: 'Perfect. See you on Saturday!', vi: 'Tuyệt. Hẹn gặp bạn thứ Bảy!' },
        { you: true, en: 'See you!', vi: 'Hẹn gặp lại!', accept: ['See you on Saturday!', 'Bye! See you!'] },
      ],
      responses: [
        { say: 'Are you free on Sunday?', options: ["Sorry, I'm busy. Maybe next time?", 'No.', "I'm not free on Sunday at."], answer: 0, why: 'Từ chối lịch sự và gợi ý hẹn lần sau.' },
        { context: 'Bạn muốn rủ bạn đi công viên.', options: ["Let's go to the park!", "Let's going to the park!", 'We go park?'], answer: 0, why: '"Let\'s + động từ nguyên mẫu": Let\'s go…' },
        { context: 'Bạn muốn nói: Hẹn gặp lúc 5 giờ.', options: ["Let's meet at five o'clock.", "Let's meet on five o'clock.", "Let's meet in five o'clock."], answer: 0, why: 'Giờ dùng giới từ "at".' },
        { context: 'Bạn sẽ đến muộn 10 phút.', options: ["Sorry, I'm running late!", "I'm late. Bye.", 'You wait.'], answer: 0, why: 'Báo trước một cách lịch sự khi bị muộn.' },
      ],
    },

    u9: {
      title: 'Đến chơi nhà bạn', titleEn: "Visiting a friend's home", icon: '🏠',
      situation: 'Bạn đến chơi nhà Ben lần đầu tiên. Ben mời bạn vào nhà.',
      partner: 'Ben',
      phrases: [
        { fn: 'Chủ nhà mời', items: [
          { en: 'Come in, please.', vi: 'Mời bạn vào.' },
          { en: 'Make yourself at home.', vi: 'Cứ tự nhiên như ở nhà nhé.' },
          { en: 'Would you like some water?', vi: 'Bạn uống chút nước không?' },
        ] },
        { fn: 'Khen nhà', items: [
          { en: 'What a nice house!', vi: 'Nhà đẹp quá!' },
          { en: 'Your room is really big.', vi: 'Phòng bạn rộng thật.' },
        ] },
        { fn: 'Hỏi chỗ', items: [
          { en: "Where's the bathroom, please?", vi: 'Cho mình hỏi nhà vệ sinh ở đâu?' },
          { en: "It's next to the kitchen.", vi: 'Ở cạnh nhà bếp.' },
        ] },
        { fn: 'Ra về', items: [
          { en: 'Thank you for having me!', vi: 'Cảm ơn bạn đã mời mình đến chơi!' },
        ] },
      ],
      culture: [
        'Đến chơi nhà ai, nên khen nhà một câu và cảm ơn khi ra về: <b>"Thank you for having me."</b>',
        'Ở nhiều nước phương Tây, khách thường không cần cởi giày. Nếu không chắc, hãy hỏi: <b>"Should I take off my shoes?"</b>',
        'Khi được mời, đáp <b>"Yes, please."</b> hoặc <b>"No, thank you."</b> – chỉ nói "Yes" hay "No" nghe cộc lốc.',
      ],
      dialogue: [
        { who: 'Ben', en: 'Hi! Come in, please.', vi: 'Chào bạn! Mời bạn vào.' },
        { you: true, en: 'Thank you. What a nice house!', vi: 'Cảm ơn bạn. Nhà đẹp quá!', accept: ['Thanks! What a nice house!', 'Thank you. Your house is very nice.'] },
        { who: 'Ben', en: 'Thanks! This is the living room. Would you like some water?', vi: 'Cảm ơn! Đây là phòng khách. Bạn uống chút nước không?' },
        { you: true, en: 'Yes, please.', vi: 'Có, cảm ơn bạn.', accept: ['Yes, please. Thank you.', 'Yes, thanks.'] },
        { who: 'Ben', en: 'Here you are. Make yourself at home!', vi: 'Của bạn đây. Cứ tự nhiên nhé!' },
        { you: true, en: "Thank you. Where's the bathroom, please?", vi: 'Cảm ơn. Cho mình hỏi nhà vệ sinh ở đâu?', accept: ["Where's the bathroom?", 'Excuse me, where is the bathroom?'] },
        { who: 'Ben', en: "It's upstairs, next to my bedroom.", vi: 'Ở trên tầng, cạnh phòng ngủ của mình.' },
        { you: true, en: 'Thanks!', vi: 'Cảm ơn nhé!', accept: ['Thank you!', 'Okay, thanks.'] },
      ],
      responses: [
        { say: 'Would you like some juice?', options: ['Yes, please.', 'Yes, I would like.', 'Yes, I like.'], answer: 0, why: 'Nhận lời mời: "Yes, please."' },
        { context: 'Bạn ra về sau buổi chơi ở nhà bạn.', options: ['Thank you for having me!', 'Thank you for having you!', 'Goodbye, house!'], answer: 0, why: 'Cảm ơn chủ nhà khi ra về: "Thank you for having me."' },
        { say: "Where's the kitchen?", options: ["It's next to the living room.", "It's next the living room.", 'There is kitchen.'], answer: 0, why: '"next to" luôn đi cùng "to".' },
        { context: 'Bạn muốn hỏi có cần cởi giày không.', options: ['Should I take off my shoes?', 'I take off shoes?', 'Shoes off?'], answer: 0, why: 'Hỏi lịch sự với "Should I…?"' },
      ],
    },

    u10: {
      title: 'Chúc mừng và tặng quà', titleEn: 'Greetings and gifts', icon: '🎁',
      situation: 'Ở bữa tiệc Giáng sinh, Sophie chúc mừng và tặng quà cho bạn.',
      partner: 'Sophie',
      phrases: [
        { fn: 'Chúc mừng', items: [
          { en: 'Merry Christmas!', vi: 'Giáng sinh vui vẻ!' },
          { en: 'Merry Christmas to you, too!', vi: 'Bạn cũng Giáng sinh vui vẻ nhé!' },
          { en: 'Happy New Year!', vi: 'Chúc mừng năm mới!' },
        ] },
        { fn: 'Tặng quà', items: [
          { en: 'This is for you.', vi: 'Cái này tặng bạn.' },
          { en: 'I hope you like it.', vi: 'Mong là bạn thích.' },
        ] },
        { fn: 'Nhận quà', items: [
          { en: 'Thank you so much! I love it!', vi: 'Cảm ơn bạn nhiều! Mình thích lắm!' },
          { en: 'Can I open it now?', vi: 'Mình mở ra luôn được không?' },
        ] },
        { fn: 'Rủ nhau', items: [
          { en: "Let's take a photo!", vi: 'Mình chụp ảnh đi!' },
          { en: 'Good idea!', vi: 'Ý hay đấy!' },
        ] },
      ],
      culture: [
        'Ở các nước phương Tây, người nhận thường <b>mở quà ngay</b> trước mặt người tặng và nói cảm nghĩ.',
        'Nếu không chắc người kia có đón Giáng sinh không, có thể chúc chung: <b>"Happy holidays!"</b>',
        'Đáp lời chúc: <b>"Merry Christmas to you, too!"</b> hoặc ngắn gọn <b>"You too!"</b>',
      ],
      dialogue: [
        { who: 'Sophie', en: 'Merry Christmas!', vi: 'Giáng sinh vui vẻ!' },
        { you: true, en: 'Merry Christmas to you, too!', vi: 'Bạn cũng Giáng sinh vui vẻ nhé!', accept: ['Merry Christmas!', 'You too! Merry Christmas!'] },
        { who: 'Sophie', en: 'This is for you. I hope you like it.', vi: 'Cái này tặng bạn. Mong là bạn thích.' },
        { you: true, en: 'Thank you so much! Can I open it now?', vi: 'Cảm ơn bạn nhiều! Mình mở luôn được không?', accept: ['Thank you! Can I open it?', 'Thanks! Can I open it now?'] },
        { who: 'Sophie', en: 'Of course!', vi: 'Tất nhiên rồi!' },
        { you: true, en: 'Wow, a red scarf! I love it!', vi: 'Ồ, một chiếc khăn quàng đỏ! Mình thích lắm!', accept: ['I love it!', 'Wow! I love it!', "It's beautiful! I love it!"] },
        { who: 'Sophie', en: "Let's take a photo with the Christmas tree!", vi: 'Mình chụp ảnh với cây thông đi!' },
        { you: true, en: 'Good idea!', vi: 'Ý hay đấy!', accept: ['Great idea!', "Okay, let's do it!", 'Sure!'] },
      ],
      responses: [
        { say: 'Merry Christmas!', options: ['Merry Christmas to you, too!', "You're welcome!", 'Yes, it is.'], answer: 0, why: 'Đáp lời chúc bằng cách chúc lại: "…to you, too!" hoặc "You too!"' },
        { context: 'Bạn tặng quà cho bạn.', options: ['This is for you.', 'This is your.', 'For you this is.'], answer: 0, why: 'Câu tặng quà: "This is for you."' },
        { say: "Let's sing a song!", options: ['Good idea!', "Yes, let's sang!", 'I singing.'], answer: 0, why: 'Đồng ý với lời rủ "Let\'s…": "Good idea!" hoặc "Sure!"' },
        { context: 'Bạn nhận quà và muốn nói mình rất thích.', options: ['Thank you so much! I love it!', "Thanks. I don't open.", 'How much is it?'], answer: 0, why: 'Cảm ơn và bày tỏ cảm xúc khi nhận quà.' },
      ],
    },

    // ───────────────────────── CẤP 2 ─────────────────────────
    u11: {
      title: 'Mua áo và đổi cỡ', titleEn: 'Buying clothes', icon: '👕',
      situation: 'Bạn vào cửa hàng quần áo muốn mua một chiếc áo khoác. Chiếc đầu tiên bị chật nên bạn hỏi đổi cỡ.',
      partner: 'Shop assistant',
      phrases: [
        { fn: 'Nhân viên hỏi', items: [
          { en: 'Can I help you?', vi: 'Tôi giúp gì được cho bạn?' },
          { en: 'What size are you?', vi: 'Bạn mặc cỡ nào?' },
          { en: 'How is it? / Does it fit?', vi: 'Thế nào? / Có vừa không?' },
        ] },
        { fn: 'Hỏi và thử đồ', items: [
          { en: "I'm looking for a jacket.", vi: 'Tôi đang tìm một chiếc áo khoác.' },
          { en: 'Can I try it on?', vi: 'Tôi mặc thử được không?' },
          { en: "It's too small. Do you have a bigger one?", vi: 'Nó chật quá. Có cỡ lớn hơn không?' },
        ] },
        { fn: 'Hỏi giá và quyết định', items: [
          { en: 'How much is it?', vi: 'Cái này bao nhiêu tiền?' },
          { en: "I'll take it.", vi: 'Tôi lấy cái này.' },
          { en: "I'm just looking, thanks.", vi: 'Tôi chỉ xem thôi, cảm ơn.' },
        ] },
      ],
      culture: [
        'Nếu chưa muốn mua, trả lời nhân viên: <b>"I\'m just looking, thanks."</b> – hoàn toàn lịch sự.',
        'Ở nhiều cửa hàng phương Tây giá đã cố định, không mặc cả. Mặc cả chỉ phổ biến ở chợ hoặc chợ đồ cũ.',
        '<b>"I\'ll take it."</b> là cách nói tự nhiên khi quyết định mua – không nói "I buy it."',
      ],
      dialogue: [
        { who: 'Shop assistant', en: 'Hello! Can I help you?', vi: 'Xin chào! Tôi giúp gì được cho bạn?' },
        { you: true, en: "Yes, please. I'm looking for a jacket.", vi: 'Vâng. Tôi đang tìm một chiếc áo khoác.', accept: ["I'm looking for a jacket.", "Yes, I'm looking for a jacket."] },
        { who: 'Shop assistant', en: 'What about this one? It is very popular.', vi: 'Chiếc này thì sao? Nó được mua nhiều lắm.' },
        { you: true, en: 'It looks nice. Can I try it on?', vi: 'Trông đẹp đấy. Tôi mặc thử được không?', accept: ['Can I try it on?', 'Can I try it on, please?'] },
        { who: 'Shop assistant', en: 'Of course. The changing room is over there. … How is it?', vi: 'Tất nhiên. Phòng thử ở đằng kia. … Thế nào ạ?' },
        { you: true, en: "It's too small. Do you have a bigger one?", vi: 'Nó chật quá. Có cỡ lớn hơn không?', accept: ["It's too small. Do you have a bigger size?", 'Do you have a bigger one?'] },
        { who: 'Shop assistant', en: 'Here you are. This one is a medium.', vi: 'Của bạn đây. Chiếc này cỡ M.' },
        { you: true, en: "This one fits. How much is it?", vi: 'Chiếc này vừa. Nó bao nhiêu tiền?', accept: ['How much is it?', "It fits. How much is it?"] },
        { who: 'Shop assistant', en: "It's forty dollars.", vi: 'Bốn mươi đô la ạ.' },
        { you: true, en: "Great. I'll take it.", vi: 'Tốt. Tôi lấy chiếc này.', accept: ["I'll take it.", "Okay, I'll take it."] },
      ],
      responses: [
        { say: 'Can I help you?', context: 'Bạn chỉ muốn xem hàng, chưa định mua.', options: ["I'm just looking, thanks.", 'No. Go away.', "I don't help."], answer: 0, why: '"I\'m just looking, thanks." là cách từ chối lịch sự.' },
        { context: 'Bạn muốn mặc thử chiếc áo.', options: ['Can I try it on?', 'Can I try on it?', 'Can I wear test it?'], answer: 0, why: 'Với đại từ "it", đặt nó giữa động từ và "on": try it on.' },
        { context: 'Bạn quyết định mua chiếc áo.', options: ["I'll take it.", 'I buy it now.', 'I am take it.'], answer: 0, why: 'Câu tự nhiên khi quyết định mua: "I\'ll take it."' },
        { say: 'Whose bag is this?', options: ["It's mine.", "It's my.", "It's me."], answer: 0, why: 'Đứng một mình dùng đại từ sở hữu: mine, yours, hers…' },
      ],
    },

    u12: {
      title: 'Đi chợ mua đồ nấu ăn', titleEn: 'At the market', icon: '🥕',
      situation: 'Bạn ra chợ mua rau và trái cây để nấu bữa tối. Bạn hỏi giá và mua với số lượng phù hợp.',
      partner: 'Seller',
      phrases: [
        { fn: 'Hỏi có hàng không', items: [
          { en: 'Do you have any carrots?', vi: 'Có cà rốt không?' },
          { en: "Sorry, we don't have any today.", vi: 'Xin lỗi, hôm nay hết rồi.' },
        ] },
        { fn: 'Hỏi giá', items: [
          { en: 'How much are the tomatoes?', vi: 'Cà chua bao nhiêu tiền?' },
          { en: 'Two dollars a kilo.', vi: 'Hai đô một cân.' },
        ] },
        { fn: 'Nói số lượng', items: [
          { en: 'A kilo of potatoes, please.', vi: 'Cho tôi một cân khoai tây.' },
          { en: 'Just a few, please. / Just a little, please.', vi: 'Một ít thôi.', note: 'a few + danh từ đếm được; a little + không đếm được.' },
          { en: "That's all, thanks.", vi: 'Vậy thôi, cảm ơn.' },
        ] },
      ],
      culture: [
        'Khi hỏi giá nhiều thứ (danh từ số nhiều), dùng <b>"How much are…?"</b>; một thứ thì <b>"How much is…?"</b>.',
        'Ở chợ nông sản (farmers\' market) bên Anh, Mỹ, người bán hay để bạn nếm thử: <b>"Would you like to try one?"</b>',
        'Câu hỏi và câu phủ định thường dùng <b>any</b>; lời mời và câu khẳng định dùng <b>some</b>.',
      ],
      dialogue: [
        { who: 'Seller', en: 'Good morning! What would you like?', vi: 'Chào buổi sáng! Bạn muốn mua gì?' },
        { you: true, en: 'How much are the tomatoes?', vi: 'Cà chua bao nhiêu tiền?', accept: ['How much are these tomatoes?', 'How much are the tomatoes, please?'] },
        { who: 'Seller', en: "They're two dollars a kilo.", vi: 'Hai đô một cân.' },
        { you: true, en: 'A kilo of tomatoes, please.', vi: 'Cho tôi một cân cà chua.', accept: ['One kilo, please.', "I'd like a kilo of tomatoes, please."] },
        { who: 'Seller', en: 'Here you are. Anything else?', vi: 'Của bạn đây. Còn gì nữa không?' },
        { you: true, en: 'Do you have any carrots?', vi: 'Có cà rốt không?', accept: ['Have you got any carrots?', 'Do you have carrots?'] },
        { who: 'Seller', en: 'Yes, we do. How many would you like?', vi: 'Có. Bạn muốn bao nhiêu?' },
        { you: true, en: 'Just a few, please. Maybe five.', vi: 'Chỉ một ít thôi. Khoảng năm củ.', accept: ['Just a few, please.', 'Five, please.'] },
        { who: 'Seller', en: "That's four dollars altogether.", vi: 'Tổng cộng bốn đô.' },
        { you: true, en: "Here you are. That's all, thanks.", vi: 'Gửi chị. Vậy thôi, cảm ơn.', accept: ['Here you are. Thanks!', "That's all, thanks."] },
      ],
      responses: [
        { context: 'Bạn muốn hỏi giá táo (nhiều quả).', options: ['How much are the apples?', 'How much is the apples?', 'How many are the apples?'], answer: 0, why: 'Danh từ số nhiều đi với "How much are…?"; "How many" hỏi số lượng chứ không hỏi giá.' },
        { say: 'Would you like some sugar?', options: ['Just a little, please.', 'Just a few, please.', 'Just many, please.'], answer: 0, why: '"Sugar" không đếm được nên dùng "a little".' },
        { context: 'Bạn muốn hỏi người bán có trứng không.', options: ['Do you have any eggs?', 'Do you have some egg?', 'Do you have much eggs?'], answer: 0, why: 'Câu hỏi dùng "any" + danh từ số nhiều.' },
        { say: 'Anything else?', options: ["No, that's all, thanks.", 'Yes, no thanks.', "That's anything."], answer: 0, why: 'Kết thúc việc mua: "No, that\'s all, thanks."' },
      ],
    },

    u13: {
      title: 'Hỏi đường đến bảo tàng', titleEn: 'Asking for directions', icon: '🗺️',
      situation: 'Bạn đang ở trung tâm một thành phố lạ và muốn đến bảo tàng. Bạn hỏi đường một người qua đường.',
      partner: 'Passer-by',
      phrases: [
        { fn: 'Hỏi đường', items: [
          { en: 'Excuse me, how do I get to the museum?', vi: 'Xin lỗi, đến bảo tàng đi đường nào ạ?' },
          { en: 'Is there a bank near here?', vi: 'Gần đây có ngân hàng không?' },
          { en: 'Is it far from here?', vi: 'Có xa đây không?' },
        ] },
        { fn: 'Chỉ đường', items: [
          { en: 'Go straight on.', vi: 'Đi thẳng.' },
          { en: 'Turn left at the traffic lights.', vi: 'Rẽ trái ở đèn giao thông.' },
          { en: "It's on the right, opposite the park.", vi: 'Nó ở bên phải, đối diện công viên.' },
        ] },
        { fn: 'Kiểm tra lại và cảm ơn', items: [
          { en: 'So, turn left at the lights?', vi: 'Vậy là rẽ trái ở chỗ đèn đúng không?' },
          { en: 'Thanks for your help!', vi: 'Cảm ơn bạn đã giúp!' },
        ] },
      ],
      culture: [
        'Luôn mở đầu bằng <b>"Excuse me"</b> khi hỏi người lạ – không hỏi thẳng vào câu hỏi.',
        'Nhắc lại hướng dẫn để kiểm tra (<b>"So, I turn left at the lights?"</b>) là thói quen tốt, người chỉ đường không thấy phiền.',
        'Dùng <b>the</b> cho nơi cả hai người đều biết: the museum, the station. Lần đầu nhắc đến một nơi bất kỳ thì dùng <b>a</b>: Is there a bank…?',
      ],
      dialogue: [
        { you: true, en: 'Excuse me. How do I get to the museum?', vi: 'Xin lỗi. Đến bảo tàng đi đường nào ạ?', accept: ['Excuse me, where is the museum?', 'How do I get to the museum?'] },
        { who: 'Passer-by', en: 'Go straight on and turn left at the traffic lights.', vi: 'Đi thẳng rồi rẽ trái ở đèn giao thông.' },
        { you: true, en: 'So, turn left at the traffic lights?', vi: 'Vậy là rẽ trái ở đèn giao thông ạ?', accept: ['Turn left at the lights?', 'So I turn left at the traffic lights?'] },
        { who: 'Passer-by', en: "That's right. The museum is on the right, opposite the park.", vi: 'Đúng rồi. Bảo tàng ở bên phải, đối diện công viên.' },
        { you: true, en: 'Is it far from here?', vi: 'Có xa đây không ạ?', accept: ['Is it far?', 'Is it near here?'] },
        { who: 'Passer-by', en: "No, it's about five minutes on foot.", vi: 'Không, đi bộ khoảng năm phút.' },
        { you: true, en: 'Thank you very much for your help!', vi: 'Cảm ơn bạn rất nhiều!', accept: ['Thanks for your help!', 'Thank you very much!'] },
        { who: 'Passer-by', en: 'No problem. Enjoy the museum!', vi: 'Không có gì. Tham quan vui nhé!' },
      ],
      responses: [
        { context: 'Bạn muốn hỏi một người lạ đường đến nhà ga.', options: ['Excuse me, how do I get to the station?', 'Where station?', 'Tell me the station.'], answer: 0, why: 'Mở đầu bằng "Excuse me" và hỏi trọn câu cho lịch sự.' },
        { say: 'Is there a pharmacy near here?', options: ["Yes, there's one next to the bank.", 'Yes, it is a pharmacy.', 'Yes, I am near.'], answer: 0, why: '"Is there…?" đáp bằng "Yes, there\'s one…" / "No, there isn\'t."' },
        { context: 'Bạn muốn nói với bạn: Đừng rẽ phải.', options: ["Don't turn right.", 'No turn right.', 'Not turn right.'], answer: 0, why: 'Câu mệnh lệnh phủ định: "Don\'t + động từ".' },
        { context: 'Bạn chưa chắc mình hiểu đúng hướng dẫn.', options: ['So, I go straight and turn left?', 'What?', 'I understand nothing.'], answer: 0, why: 'Nhắc lại hướng dẫn để kiểm tra là cách lịch sự và hiệu quả.' },
      ],
    },

    u14: {
      title: 'Tham gia câu lạc bộ', titleEn: 'Joining a club', icon: '🏸',
      situation: 'Bạn muốn tham gia câu lạc bộ thể thao ở trường. Chị trưởng câu lạc bộ hỏi bạn biết chơi môn gì và thích gì.',
      partner: 'Club leader',
      phrases: [
        { fn: 'Hỏi về khả năng', items: [
          { en: 'Can you play badminton?', vi: 'Bạn biết chơi cầu lông không?' },
          { en: "Yes, I can. / No, I can't, but I'd like to learn.", vi: 'Có, mình biết. / Không, nhưng mình muốn học.' },
          { en: "I can swim, but I can't swim very fast.", vi: 'Mình biết bơi nhưng bơi không nhanh lắm.' },
        ] },
        { fn: 'Nói về sở thích', items: [
          { en: 'I really enjoy playing football.', vi: 'Mình rất thích đá bóng.' },
          { en: 'I love dancing, but I hate running.', vi: 'Mình thích nhảy nhưng ghét chạy bộ.' },
          { en: 'What do you do in your free time?', vi: 'Lúc rảnh bạn làm gì?' },
        ] },
        { fn: 'Hỏi thông tin câu lạc bộ', items: [
          { en: 'When does the club meet?', vi: 'Câu lạc bộ sinh hoạt khi nào?' },
          { en: 'How can I join?', vi: 'Làm sao để tham gia?' },
        ] },
      ],
      culture: [
        'Người nói tiếng Anh hay nói khiêm tốn về khả năng: <b>"I can play a bit."</b> (mình chơi được chút chút).',
        'Sau like / love / enjoy / hate thường dùng <b>V-ing</b>: I enjoy playing… (không nói "enjoy to play").',
        'Khi chưa biết làm, nói <b>"…but I\'d like to learn."</b> nghe tích cực hơn chỉ nói "I can\'t."',
      ],
      dialogue: [
        { who: 'Club leader', en: 'Hi! Do you want to join our sports club?', vi: 'Chào bạn! Bạn muốn vào câu lạc bộ thể thao à?' },
        { you: true, en: "Yes, I do. How can I join?", vi: 'Vâng ạ. Làm sao để tham gia ạ?', accept: ['Yes! How can I join?', 'Yes, please. How can I join?'] },
        { who: 'Club leader', en: 'Just fill in this form. Can you play badminton?', vi: 'Chỉ cần điền mẫu này. Bạn biết chơi cầu lông không?' },
        { you: true, en: "Yes, I can, but I can't play very well.", vi: 'Có, nhưng mình chơi không giỏi lắm.', accept: ["Yes, I can play a bit.", "Yes, I can, but not very well."] },
        { who: 'Club leader', en: "That's okay. What sports do you enjoy?", vi: 'Không sao. Bạn thích môn thể thao nào?' },
        { you: true, en: 'I really enjoy swimming and playing football.', vi: 'Mình rất thích bơi và đá bóng.', accept: ['I enjoy swimming.', 'I love swimming and playing football.'] },
        { who: 'Club leader', en: 'Great! We have a football team, too.', vi: 'Tuyệt! Bọn mình cũng có đội bóng đá.' },
        { you: true, en: 'When does the club meet?', vi: 'Câu lạc bộ sinh hoạt khi nào ạ?', accept: ['When do you meet?', 'What time does the club meet?'] },
        { who: 'Club leader', en: 'Every Tuesday and Friday after school.', vi: 'Mỗi thứ Ba và thứ Sáu sau giờ học.' },
      ],
      responses: [
        { say: 'Can you dance?', options: ["No, I can't, but I'd like to learn.", "No, I don't can.", "No, I can't to dance."], answer: 0, why: 'Phủ định của can là "can\'t" + động từ nguyên mẫu, không dùng "don\'t can".' },
        { context: 'Bạn muốn nói mình thích chụp ảnh.', options: ['I enjoy taking photos.', 'I enjoy to take photos.', 'I enjoy take photos.'], answer: 0, why: 'Sau "enjoy" dùng V-ing.' },
        { say: 'What do you do in your free time?', options: ['I usually read books or play the guitar.', 'Yes, I have free time.', 'I am free time.'], answer: 0, why: 'Câu hỏi về việc làm lúc rảnh – đáp bằng hoạt động cụ thể.' },
        { context: 'Bạn biết bơi nhưng chưa giỏi.', options: ['I can swim a bit.', 'I can swimming a bit.', 'I can to swim a bit.'], answer: 0, why: '"can" + động từ nguyên mẫu không "to": can swim.' },
      ],
    },

    u15: {
      title: 'Đi khám bệnh', titleEn: "At the doctor's", icon: '🩺',
      situation: 'Bạn bị sốt và đau đầu hai ngày nay nên đi khám. Bác sĩ hỏi triệu chứng và khuyên bạn.',
      partner: 'Doctor',
      phrases: [
        { fn: 'Bác sĩ hỏi', items: [
          { en: "What's the matter? / What's wrong?", vi: 'Bạn bị sao vậy?' },
          { en: 'How long have you felt like this?', vi: 'Bạn bị như vậy bao lâu rồi?' },
        ] },
        { fn: 'Kể triệu chứng', items: [
          { en: 'I have a headache and a fever.', vi: 'Tôi bị đau đầu và sốt.' },
          { en: "I've got a sore throat.", vi: 'Tôi bị đau họng.' },
          { en: 'I feel tired all the time.', vi: 'Tôi lúc nào cũng thấy mệt.' },
        ] },
        { fn: 'Lời khuyên và quy định', items: [
          { en: 'You should rest and drink a lot of water.', vi: 'Bạn nên nghỉ ngơi và uống nhiều nước.' },
          { en: "You shouldn't go to school for two days.", vi: 'Bạn không nên đi học hai ngày.' },
          { en: 'You must take this medicine after meals.', vi: 'Bạn phải uống thuốc này sau bữa ăn.' },
        ] },
      ],
      culture: [
        'Ở Anh, Mỹ thường phải <b>đặt lịch hẹn</b> (make an appointment) trước khi đi khám, trừ trường hợp cấp cứu.',
        '<b>should</b> là lời khuyên; <b>must</b> là điều bắt buộc. Bác sĩ dùng "must" khi nói cách dùng thuốc.',
        'Nói với bác sĩ càng cụ thể càng tốt: bị từ khi nào, đau ở đâu, đau thế nào.',
      ],
      dialogue: [
        { who: 'Doctor', en: "Hello. What's the matter?", vi: 'Chào bạn. Bạn bị sao vậy?' },
        { you: true, en: 'I have a headache and a fever.', vi: 'Tôi bị đau đầu và sốt ạ.', accept: ["I've got a headache and a fever.", 'I have a fever and a headache.'] },
        { who: 'Doctor', en: 'I see. How long have you felt like this?', vi: 'Tôi hiểu. Bạn bị như vậy bao lâu rồi?' },
        { you: true, en: 'For two days.', vi: 'Hai ngày nay rồi ạ.', accept: ['Two days.', 'For two days now.'] },
        { who: 'Doctor', en: 'You have a bad cold. You should stay in bed and drink a lot of water.', vi: 'Bạn bị cảm nặng. Bạn nên nằm nghỉ và uống nhiều nước.' },
        { you: true, en: 'Should I go to school tomorrow?', vi: 'Mai tôi có nên đi học không ạ?', accept: ['Can I go to school tomorrow?', 'Should I go to school?'] },
        { who: 'Doctor', en: "No, you shouldn't. And you must take this medicine three times a day.", vi: 'Không nên. Và bạn phải uống thuốc này ba lần một ngày.' },
        { you: true, en: 'Okay. Thank you, doctor.', vi: 'Vâng. Cảm ơn bác sĩ.', accept: ['Thank you, doctor.', 'Thanks, doctor.'] },
      ],
      responses: [
        { say: "What's the matter?", options: ['I have a terrible toothache.', "It's a matter.", "I'm a matter."], answer: 0, why: '"What\'s the matter?" hỏi bạn bị sao – đáp bằng triệu chứng.' },
        { context: 'Bạn của bạn bị ho. Bạn khuyên nên uống trà nóng.', options: ['You should drink some hot tea.', 'You should to drink hot tea.', 'You should drinking hot tea.'], answer: 0, why: '"should" + động từ nguyên mẫu không "to".' },
        { context: 'Biển báo ở bệnh viện: không được hút thuốc.', options: ["You mustn't smoke here.", "You don't have to smoke here.", "You shouldn't to smoke here."], answer: 0, why: '"mustn\'t" = cấm; "don\'t have to" = không bắt buộc.' },
        { say: 'Do I have to stay in hospital?', options: ["No, you don't have to. You can go home.", "No, you mustn't.", "No, you haven't."], answer: 0, why: '"don\'t have to" nghĩa là không cần phải.' },
      ],
    },

    u16: {
      title: 'Cuối tuần qua thế nào?', titleEn: 'How was your weekend?', icon: '🛋️',
      situation: 'Sáng thứ Hai, đồng nghiệp/bạn học hỏi bạn cuối tuần vừa rồi ở đâu và thế nào.',
      partner: 'Linda',
      phrases: [
        { fn: 'Hỏi về hôm qua, tuần trước', items: [
          { en: 'How was your weekend?', vi: 'Cuối tuần của bạn thế nào?' },
          { en: 'Where were you yesterday?', vi: 'Hôm qua bạn ở đâu?' },
        ] },
        { fn: 'Trả lời', items: [
          { en: 'It was great! / It was boring.', vi: 'Tuyệt lắm! / Chán lắm.' },
          { en: 'I was at home all day.', vi: 'Mình ở nhà cả ngày.' },
          { en: 'There were a lot of people at the concert.', vi: 'Có rất nhiều người ở buổi hoà nhạc.' },
        ] },
        { fn: 'Thể hiện quan tâm', items: [
          { en: 'Really? / Oh, nice!', vi: 'Thật à? / Ồ, hay quá!' },
          { en: 'Oh no! That sounds terrible.', vi: 'Ôi không! Nghe tệ quá.' },
        ] },
      ],
      culture: [
        '<b>"How was your weekend?"</b> là câu bắt chuyện rất phổ biến vào sáng thứ Hai ở công sở, trường học.',
        'Phản hồi ngắn như <b>"Really?"</b>, <b>"Oh, nice!"</b> cho thấy bạn đang lắng nghe.',
        'Đừng quên hỏi lại: <b>"What about you?"</b>',
      ],
      dialogue: [
        { who: 'Linda', en: 'Hi! How was your weekend?', vi: 'Chào bạn! Cuối tuần của bạn thế nào?' },
        { you: true, en: 'It was great, thanks!', vi: 'Tuyệt lắm, cảm ơn bạn!', accept: ['It was great!', 'It was really good, thanks.'] },
        { who: 'Linda', en: 'Where were you on Saturday? I called you.', vi: 'Thứ Bảy bạn ở đâu vậy? Mình gọi cho bạn đấy.' },
        { you: true, en: 'I was at a concert with my sister.', vi: 'Mình đi xem hoà nhạc với em gái.', accept: ['I was at a concert.', 'I was at a concert with my sister. Sorry!'] },
        { who: 'Linda', en: 'Oh, nice! Was it good?', vi: 'Ồ, hay quá! Buổi đó hay không?' },
        { you: true, en: 'Yes, it was amazing. There were a lot of people there.', vi: 'Có, tuyệt vời lắm. Ở đó rất đông người.', accept: ['Yes, it was amazing!', 'It was amazing. There were a lot of people.'] },
        { who: 'Linda', en: "Lucky you! I was at home. I was sick.", vi: 'Sướng thế! Mình ở nhà. Mình bị ốm.' },
        { you: true, en: 'Oh no! Are you okay now?', vi: 'Ôi không! Giờ bạn ổn chưa?', accept: ['Oh no! Are you better now?', 'Are you okay now?'] },
      ],
      responses: [
        { say: 'How was your weekend?', options: ['It was relaxing. I stayed at home.', 'It is relaxing.', 'Yes, it was.'], answer: 0, why: 'Hỏi về quá khứ thì đáp bằng "was" và nói thêm một chi tiết.' },
        { say: 'I was in hospital last week.', options: ['Oh no! Are you okay now?', 'Oh, nice!', 'Lucky you!'], answer: 0, why: 'Tin không vui thì thể hiện sự quan tâm, không nói "nice".' },
        { context: 'Bạn muốn hỏi hôm qua bạn ấy ở đâu.', options: ['Where were you yesterday?', 'Where was you yesterday?', 'Where are you yesterday?'], answer: 0, why: '"you" đi với "were" ở quá khứ.' },
        { context: 'Bạn muốn nói: Hôm qua ở công viên có nhiều trẻ em.', options: ['There were a lot of children in the park yesterday.', 'There was a lot of children in the park yesterday.', 'There are a lot of children in the park yesterday.'], answer: 0, why: 'Danh từ số nhiều ở quá khứ: "There were…".' },
      ],
    },

    u17: {
      title: 'Kể về kỳ nghỉ', titleEn: 'Telling a holiday story', icon: '🏖️',
      situation: 'Bạn vừa đi du lịch Đà Nẵng về. Một người bạn nước ngoài hỏi về chuyến đi.',
      partner: 'Mark',
      phrases: [
        { fn: 'Hỏi về chuyến đi', items: [
          { en: 'How was your holiday?', vi: 'Kỳ nghỉ của bạn thế nào?' },
          { en: 'Where did you go? / What did you do?', vi: 'Bạn đã đi đâu? / Bạn đã làm gì?' },
          { en: 'Did you try the local food?', vi: 'Bạn có ăn thử món địa phương không?' },
        ] },
        { fn: 'Kể lại', items: [
          { en: 'We went to Da Nang two weeks ago.', vi: 'Chúng tôi đi Đà Nẵng cách đây hai tuần.' },
          { en: 'We swam in the sea and ate a lot of seafood.', vi: 'Chúng tôi bơi ở biển và ăn rất nhiều hải sản.' },
          { en: "We didn't have time to visit Hoi An.", vi: 'Chúng tôi không có thời gian đi Hội An.' },
        ] },
        { fn: 'Bày tỏ cảm nhận', items: [
          { en: 'It was the best holiday ever!', vi: 'Đó là kỳ nghỉ tuyệt nhất từ trước đến giờ!' },
          { en: 'The weather was perfect.', vi: 'Thời tiết hoàn hảo.' },
        ] },
      ],
      culture: [
        'Khi kể chuyện, thêm cảm nhận (<b>It was amazing</b>, <b>The food was delicious</b>) giúp câu chuyện sinh động hơn chỉ liệt kê việc làm.',
        'Câu hỏi và phủ định ở quá khứ dùng <b>did / didn\'t + động từ nguyên mẫu</b>: Did you go…? I didn\'t go…',
        '<b>ago</b> đứng sau khoảng thời gian: two weeks ago (không nói "ago two weeks").',
      ],
      dialogue: [
        { who: 'Mark', en: 'Welcome back! How was your holiday?', vi: 'Chào mừng bạn về! Kỳ nghỉ thế nào?' },
        { you: true, en: 'It was the best holiday ever!', vi: 'Đó là kỳ nghỉ tuyệt nhất từ trước đến giờ!', accept: ['It was amazing!', 'It was great, thanks!'] },
        { who: 'Mark', en: 'Where did you go?', vi: 'Bạn đã đi đâu?' },
        { you: true, en: 'I went to Da Nang with my family.', vi: 'Mình đi Đà Nẵng cùng gia đình.', accept: ['We went to Da Nang.', 'I went to Da Nang.'] },
        { who: 'Mark', en: 'Lovely! What did you do there?', vi: 'Tuyệt! Ở đó bạn đã làm gì?' },
        { you: true, en: 'We swam in the sea and ate a lot of seafood.', vi: 'Bọn mình bơi ở biển và ăn rất nhiều hải sản.', accept: ['We swam and ate seafood.', 'We went to the beach and ate a lot of seafood.'] },
        { who: 'Mark', en: 'Did you visit Hoi An too?', vi: 'Bạn có đi Hội An không?' },
        { you: true, en: "No, we didn't. We didn't have time.", vi: 'Không. Bọn mình không có thời gian.', accept: ["No, we didn't.", "No, we didn't have time."] },
      ],
      responses: [
        { say: 'Did you enjoy the trip?', options: ['Yes, I did. It was fantastic!', 'Yes, I enjoyed.', 'Yes, I was.'], answer: 0, why: '"Did you…?" đáp bằng "Yes, I did." / "No, I didn\'t."' },
        { context: 'Bạn muốn nói: Tôi về nhà ba ngày trước.', options: ['I came back three days ago.', 'I came back ago three days.', 'I come back three days ago.'], answer: 0, why: 'Quá khứ đơn + khoảng thời gian + "ago".' },
        { context: 'Bạn không đi bảo tàng.', options: ["We didn't go to the museum.", "We didn't went to the museum.", "We not go to the museum."], answer: 0, why: 'Sau "didn\'t" dùng động từ nguyên mẫu: didn\'t go.' },
        { say: 'What did you do last summer?', options: ['I visited my grandparents in Hue.', 'I visit my grandparents in Hue.', 'I am visiting my grandparents.'], answer: 0, why: 'Hỏi về "last summer" thì đáp bằng quá khứ đơn.' },
      ],
    },

    u18: {
      title: 'Lên kế hoạch cuối tuần', titleEn: 'Making weekend plans', icon: '🧭',
      situation: 'Bạn và bạn thân bàn kế hoạch cho cuối tuần tới. Bạn ấy còn nhờ bạn giúp một việc.',
      partner: 'Kate',
      phrases: [
        { fn: 'Hỏi và nói dự định', items: [
          { en: 'What are you going to do this weekend?', vi: 'Cuối tuần này bạn định làm gì?' },
          { en: "I'm going to visit my grandmother.", vi: 'Mình định đi thăm bà.' },
        ] },
        { fn: 'Dự đoán', items: [
          { en: 'It will probably rain on Sunday.', vi: 'Chủ nhật chắc trời sẽ mưa.' },
          { en: "I think you'll love it.", vi: 'Mình nghĩ bạn sẽ thích lắm.' },
        ] },
        { fn: 'Đề nghị giúp và hứa', items: [
          { en: "I'll help you.", vi: 'Mình sẽ giúp bạn.', note: '"will" dùng cho quyết định ngay lúc nói.' },
          { en: "I promise I won't be late.", vi: 'Mình hứa sẽ không đến muộn.' },
        ] },
      ],
      culture: [
        '<b>be going to</b> nói về dự định đã có từ trước; <b>will</b> dùng cho quyết định ngay lúc nói, lời hứa, dự đoán.',
        'Khi ai đó cần giúp, nói <b>"I\'ll help you!"</b> – tự nhiên hơn "I help you."',
        'Lời hứa thường dùng <b>"I promise I\'ll…"</b> hoặc <b>"I won\'t…"</b>.',
      ],
      dialogue: [
        { who: 'Kate', en: 'What are you going to do this weekend?', vi: 'Cuối tuần này bạn định làm gì?' },
        { you: true, en: "I'm going to visit my grandmother on Saturday.", vi: 'Thứ Bảy mình định đi thăm bà.', accept: ["I'm going to visit my grandmother.", "On Saturday I'm going to visit my grandmother."] },
        { who: 'Kate', en: "That's nice. I'm going to move to a new flat on Sunday.", vi: 'Hay đấy. Chủ nhật mình sẽ chuyển sang căn hộ mới.' },
        { you: true, en: "Really? I'll help you!", vi: 'Thật à? Mình sẽ giúp bạn!', accept: ["I'll help you!", "Really? I can help you."] },
        { who: 'Kate', en: 'Thank you so much! Can you come at nine?', vi: 'Cảm ơn bạn nhiều! Bạn đến lúc chín giờ được không?' },
        { you: true, en: "Sure. I promise I won't be late.", vi: 'Được chứ. Mình hứa sẽ không đến muộn.', accept: ["Sure, I won't be late.", "Okay, I'll be there at nine."] },
        { who: 'Kate', en: "Great. I hope it won't rain.", vi: 'Tuyệt. Mong là trời không mưa.' },
        { you: true, en: "Don't worry. I think it will be sunny.", vi: 'Đừng lo. Mình nghĩ trời sẽ nắng.', accept: ['I think it will be sunny.', "Don't worry, it will be fine."] },
      ],
      responses: [
        { say: 'This box is so heavy!', options: ["I'll help you.", "I'm going to help you yesterday.", 'I help you.'], answer: 0, why: 'Quyết định giúp ngay lúc nói dùng "will".' },
        { context: 'Bạn đã mua vé và định đi Huế tháng sau.', options: ["I'm going to travel to Hue next month.", 'I travel to Hue last month.', "I'll travelling to Hue."], answer: 0, why: 'Dự định đã có kế hoạch từ trước: "be going to".' },
        { say: "Don't forget my book!", options: ["I won't. I promise.", "I don't forget.", "I'm not going forget."], answer: 0, why: 'Lời hứa: "I won\'t (forget)."' },
        { context: 'Bạn dự đoán đội bạn sẽ thắng.', options: ['I think our team will win.', 'I think our team wins yesterday.', 'I think our team will wins.'], answer: 0, why: '"will" + động từ nguyên mẫu để dự đoán.' },
      ],
    },

    u19: {
      title: 'Chọn mua điện thoại', titleEn: 'Choosing a new phone', icon: '📱',
      situation: 'Bạn đi mua điện thoại mới cùng anh bạn người Úc, phân vân giữa hai mẫu máy.',
      partner: 'Sam',
      phrases: [
        { fn: 'So sánh hai thứ', items: [
          { en: 'This one is cheaper than that one.', vi: 'Cái này rẻ hơn cái kia.' },
          { en: 'The black phone is more expensive.', vi: 'Chiếc điện thoại đen đắt hơn.' },
          { en: 'The camera is better, but the battery is worse.', vi: 'Máy ảnh tốt hơn, nhưng pin kém hơn.' },
        ] },
        { fn: 'Bằng nhau và nhất', items: [
          { en: "It's as fast as the other one.", vi: 'Nó nhanh bằng chiếc kia.' },
          { en: "It's the best phone in the shop.", vi: 'Đây là chiếc tốt nhất cửa hàng.' },
        ] },
        { fn: 'Xin ý kiến', items: [
          { en: 'Which one do you think is better?', vi: 'Bạn nghĩ cái nào tốt hơn?' },
          { en: 'If I were you, I… / I think you should get…', vi: 'Mình nghĩ bạn nên mua…' },
        ] },
      ],
      culture: [
        'Tính từ ngắn thêm <b>-er / -est</b> (cheaper, the cheapest); tính từ dài dùng <b>more / the most</b> (more expensive).',
        'Dùng <b>"this one / that one"</b> để khỏi nhắc lại danh từ.',
        'Khi xin lời khuyên, người nói tiếng Anh thường đưa lý do: <b>"…because the battery is better."</b>',
      ],
      dialogue: [
        { you: true, en: 'Which one do you think is better, Sam?', vi: 'Sam, bạn nghĩ cái nào tốt hơn?', accept: ['Which one is better?', 'Which one do you think is better?'] },
        { who: 'Sam', en: 'Well, the white one is cheaper than the black one.', vi: 'Ừm, chiếc trắng rẻ hơn chiếc đen.' },
        { you: true, en: 'But the black one has a better camera.', vi: 'Nhưng chiếc đen có máy ảnh tốt hơn.', accept: ['The black one has a better camera.', 'But the camera of the black one is better.'] },
        { who: 'Sam', en: 'True. Is it faster too?', vi: 'Đúng vậy. Nó cũng nhanh hơn à?' },
        { you: true, en: "No, it's as fast as the white one.", vi: 'Không, nó nhanh bằng chiếc trắng.', accept: ["It's as fast as the white one.", "No, they're as fast as each other."] },
        { who: 'Sam', en: 'Then I think you should get the white one. It is the cheapest phone here.', vi: 'Vậy mình nghĩ bạn nên mua chiếc trắng. Nó là chiếc rẻ nhất ở đây.' },
        { you: true, en: "You're right. I'll take the white one.", vi: 'Bạn nói đúng. Mình sẽ lấy chiếc trắng.', accept: ["I'll take the white one.", "Okay, I'll buy the white one."] },
      ],
      responses: [
        { context: 'Chiếc A giá 200 đô, chiếc B giá 300 đô.', options: ['Phone A is cheaper than phone B.', 'Phone A is more cheap than phone B.', 'Phone A is cheapest than phone B.'], answer: 0, why: 'Tính từ ngắn "cheap" → "cheaper than".' },
        { context: 'Bạn thấy món này ngon nhất trong thực đơn.', options: ["It's the best dish on the menu.", "It's the goodest dish on the menu.", "It's the better dish on the menu."], answer: 0, why: 'good → better → the best.' },
        { say: 'Which bag do you like?', options: ['I like this one. It is bigger.', 'I like this. It is more big.', 'I like one this.'], answer: 0, why: '"this one" thay cho danh từ; big → bigger.' },
        { context: 'Hai bạn cao như nhau.', options: ['Lan is as tall as Mai.', 'Lan is as taller as Mai.', 'Lan is tall as as Mai.'], answer: 0, why: 'So sánh bằng: as + tính từ nguyên dạng + as.' },
      ],
    },

    u20: {
      title: 'Mời dự tiệc năm mới', titleEn: 'Invitations', icon: '🎆',
      situation: 'Một người bạn mời bạn đến tiệc đón năm mới. Bạn nhận lời một lời mời và khéo léo từ chối một lời mời khác.',
      partner: 'Chris',
      phrases: [
        { fn: 'Mời', items: [
          { en: 'Would you like to come to my party?', vi: 'Bạn có muốn đến dự tiệc của mình không?' },
          { en: 'Do you want to watch the fireworks with us?', vi: 'Bạn có muốn xem pháo hoa với bọn mình không?' },
        ] },
        { fn: 'Nhận lời', items: [
          { en: "Yes, I'd love to!", vi: 'Có, mình rất muốn!' },
          { en: 'Sounds great! What time?', vi: 'Nghe hay đấy! Mấy giờ?' },
        ] },
        { fn: 'Từ chối lịch sự', items: [
          { en: "I'd love to, but I can't because…", vi: 'Mình rất muốn, nhưng không được vì…' },
          { en: 'Thanks for asking. Maybe next time?', vi: 'Cảm ơn đã rủ mình. Lần sau nhé?' },
        ] },
      ],
      culture: [
        'Từ chối lời mời, người nói tiếng Anh thường <b>cảm ơn + nói lý do + đề nghị lần sau</b>, không chỉ nói "No".',
        '<b>"Would you like to…?"</b> lịch sự hơn <b>"Do you want to…?"</b>',
        'Đến dự tiệc ở nhà, khách thường mang theo một món nhỏ: đồ uống, bánh hoặc hoa. Hỏi chủ nhà: <b>"Can I bring anything?"</b>',
      ],
      dialogue: [
        { who: 'Chris', en: "Would you like to come to my New Year's Eve party?", vi: 'Bạn có muốn đến dự tiệc đêm giao thừa của mình không?' },
        { you: true, en: "Yes, I'd love to! What time does it start?", vi: 'Có, mình rất muốn! Mấy giờ bắt đầu?', accept: ["I'd love to! What time?", "Yes, I'd love to!"] },
        { who: 'Chris', en: "At eight. We're going to watch the fireworks at midnight.", vi: 'Tám giờ. Nửa đêm bọn mình sẽ xem pháo hoa.' },
        { you: true, en: 'Sounds great! Can I bring anything?', vi: 'Nghe hay đấy! Mình mang theo gì được không?', accept: ['Can I bring anything?', 'Great! Can I bring something?'] },
        { who: 'Chris', en: 'Maybe some drinks. And would you like to go to the cinema with us tomorrow?', vi: 'Có lẽ ít đồ uống. À, mai bạn có muốn đi xem phim với bọn mình không?' },
        { you: true, en: "I'd love to, but I can't because I have to work.", vi: 'Mình rất muốn, nhưng không được vì mình phải làm việc.', accept: ["Sorry, I can't because I have to work.", "I'd love to, but I have to work."] },
        { who: 'Chris', en: 'No problem.', vi: 'Không sao đâu.' },
        { you: true, en: 'Thanks for asking. Maybe next time?', vi: 'Cảm ơn đã rủ mình. Lần sau nhé?', accept: ['Maybe next time?', 'Thanks anyway. Maybe next time.'] },
      ],
      responses: [
        { say: 'Would you like to have dinner with us?', options: ["I'd love to, but I'm busy tonight. Maybe next time?", "No, I wouldn't.", "Yes, I'd like."], answer: 0, why: 'Từ chối lịch sự: cảm ơn/muốn + lý do + hẹn lần sau.' },
        { say: 'Would you like some cake?', options: ['Yes, please.', 'Yes, I would like.', 'Yes, I like cake.'], answer: 0, why: 'Nhận lời mời ăn uống: "Yes, please."' },
        { context: 'Bạn mời đồng nghiệp đi ăn trưa một cách lịch sự.', options: ['Would you like to have lunch with me?', 'Would you like having lunch with me?', 'You want lunch me?'], answer: 0, why: '"Would you like + to V…?"' },
        { context: 'Bạn muốn nói: Mình mệt nên mình về sớm.', options: ["I'm tired, so I'm going home early.", "I'm tired, because I'm going home early.", "I'm tired, but I'm going home early."], answer: 0, why: '"so" chỉ kết quả; "because" chỉ lý do.' },
      ],
    },

    // ───────────────────────── CẤP 3 ─────────────────────────
    u21: {
      title: 'Trò chuyện với đồng nghiệp mới', titleEn: 'Small talk about experiences', icon: '☕',
      situation: 'Giờ nghỉ trưa ở công ty, bạn trò chuyện với Daniel – đồng nghiệp mới đến từ Canada – về những nơi đã từng đến.',
      partner: 'Daniel',
      phrases: [
        { fn: 'Hỏi về trải nghiệm', items: [
          { en: 'Have you ever been to Japan?', vi: 'Bạn đã bao giờ đến Nhật chưa?' },
          { en: 'Have you tried pho yet?', vi: 'Bạn đã ăn thử phở chưa?' },
        ] },
        { fn: 'Trả lời', items: [
          { en: "Yes, I have. I went there last year.", vi: 'Rồi. Mình đến đó năm ngoái.', note: 'Thời điểm cụ thể → quá khứ đơn.' },
          { en: "No, I've never been there.", vi: 'Chưa, mình chưa bao giờ đến đó.' },
          { en: "I've just arrived. / I haven't finished yet.", vi: 'Mình vừa mới đến. / Mình chưa xong.' },
        ] },
        { fn: 'Kéo dài câu chuyện', items: [
          { en: 'What was it like?', vi: 'Ở đó thế nào?' },
          { en: 'You should definitely try it!', vi: 'Bạn nhất định nên thử!' },
        ] },
      ],
      culture: [
        'Small talk (chuyện xã giao) thường xoay quanh du lịch, đồ ăn, thời tiết, cuối tuần – tránh hỏi lương, tuổi, tôn giáo, chính trị.',
        'Trả lời "Have you ever…?" bằng <b>Yes, I have</b> rồi chuyển sang <b>quá khứ đơn</b> để kể chi tiết.',
        'Hỏi <b>"What was it like?"</b> để người kia kể thêm – câu hỏi mở giúp cuộc trò chuyện tự nhiên.',
      ],
      dialogue: [
        { who: 'Daniel', en: 'Have you ever been to Canada?', vi: 'Bạn đã bao giờ đến Canada chưa?' },
        { you: true, en: "No, I've never been there. Have you lived in Vietnam long?", vi: 'Chưa, mình chưa bao giờ đến đó. Bạn sống ở Việt Nam lâu chưa?', accept: ["No, I've never been there.", "No, I haven't. Have you lived here long?"] },
        { who: 'Daniel', en: "No, I've just arrived. I came two weeks ago.", vi: 'Chưa, mình vừa mới đến. Mình đến hai tuần trước.' },
        { you: true, en: 'Have you tried pho yet?', vi: 'Bạn đã ăn thử phở chưa?', accept: ['Have you tried pho?', 'Have you eaten pho yet?'] },
        { who: 'Daniel', en: "Yes, I have! I had it for breakfast yesterday. It was delicious.", vi: 'Rồi! Mình ăn sáng hôm qua. Ngon lắm.' },
        { you: true, en: 'Great! Have you visited Ha Long Bay?', vi: 'Tuyệt! Bạn đã đi vịnh Hạ Long chưa?', accept: ['Have you been to Ha Long Bay?', 'Have you visited Ha Long Bay yet?'] },
        { who: 'Daniel', en: "Not yet. What's it like?", vi: 'Chưa. Ở đó thế nào?' },
        { you: true, en: "It's beautiful. You should definitely go there!", vi: 'Đẹp lắm. Bạn nhất định nên đến đó!', accept: ["It's beautiful. You should go!", "It's amazing. You should definitely visit it."] },
      ],
      responses: [
        { say: 'Have you ever eaten durian?', options: ["Yes, I have. I tried it last summer.", 'Yes, I did ever.', "Yes, I have eat it last summer."], answer: 0, why: 'Đáp "Yes, I have" rồi kể chi tiết bằng quá khứ đơn (last summer).' },
        { say: 'Have you finished the report?', options: ["Not yet. I'll finish it this afternoon.", "Not already.", "Yes, I finished it tomorrow."], answer: 0, why: '"Not yet" = chưa (xong); "already" dùng cho câu khẳng định.' },
        { context: 'Bạn muốn hỏi đồng nghiệp mới một câu small talk phù hợp.', options: ['Have you been to any nice places in Vietnam?', 'How much money do you earn?', 'How old are you?'], answer: 0, why: 'Tránh hỏi lương, tuổi với người mới quen.' },
        { context: 'Bạn vừa mới ăn trưa xong.', options: ["I've just had lunch.", 'I just have had lunch.', 'I have lunch just.'], answer: 0, why: '"just" đứng giữa have/has và V3: I\'ve just had…' },
      ],
    },

    u22: {
      title: 'Làm quen hàng xóm mới', titleEn: 'Meeting a new neighbour', icon: '🏢',
      situation: 'Bạn gặp bà Taylor ở thang máy chung cư. Hai người hỏi nhau đã sống ở đây bao lâu.',
      partner: 'Mrs Taylor',
      phrases: [
        { fn: 'Hỏi bao lâu', items: [
          { en: 'How long have you lived here?', vi: 'Bà sống ở đây bao lâu rồi?' },
          { en: 'How long have you worked there?', vi: 'Bạn làm ở đó bao lâu rồi?' },
        ] },
        { fn: 'For và since', items: [
          { en: "I've lived here for three years.", vi: 'Tôi sống ở đây được ba năm rồi.', note: 'for + khoảng thời gian.' },
          { en: "I've known her since 2019.", vi: 'Tôi quen cô ấy từ năm 2019.', note: 'since + mốc thời gian.' },
        ] },
        { fn: 'Mời và giúp đỡ hàng xóm', items: [
          { en: 'If you need anything, just knock on my door.', vi: 'Nếu cần gì cứ gõ cửa nhà tôi nhé.' },
          { en: "It's nice to have you here.", vi: 'Rất vui vì có bạn ở đây.' },
        ] },
      ],
      culture: [
        'Ở các nước phương Tây, hàng xóm mới thường tự giới thiệu và chào hỏi; một số người còn mang bánh sang làm quen.',
        '<b>for</b> + khoảng thời gian (for six months), <b>since</b> + mốc (since March, since I was a child).',
        'Việc đã kết thúc ở thời điểm xác định dùng quá khứ đơn: <b>I moved here in 2020.</b>',
      ],
      dialogue: [
        { who: 'Mrs Taylor', en: "Hello! I haven't seen you before. Are you new here?", vi: 'Chào cháu! Bà chưa gặp cháu bao giờ. Cháu mới đến à?' },
        { you: true, en: 'Yes, I moved here last month. I live on the fifth floor.', vi: 'Vâng, cháu chuyển đến tháng trước. Cháu sống ở tầng năm.', accept: ['Yes, I moved here last month.', "Yes, I'm new. I moved here last month."] },
        { who: 'Mrs Taylor', en: 'Welcome! Where did you live before?', vi: 'Chào mừng cháu! Trước đây cháu sống ở đâu?' },
        { you: true, en: 'In Da Lat. How long have you lived here?', vi: 'Ở Đà Lạt ạ. Bà sống ở đây bao lâu rồi ạ?', accept: ['How long have you lived here?', 'I lived in Da Lat. How long have you lived here?'] },
        { who: 'Mrs Taylor', en: "Oh, I've lived here for twenty years, since my children were small.", vi: 'Ồ, bà sống ở đây hai mươi năm rồi, từ khi các con bà còn nhỏ.' },
        { you: true, en: 'Wow, that is a long time!', vi: 'Ồ, lâu thật đấy ạ!', accept: ["Wow, that's a long time!", 'That is a long time!'] },
        { who: 'Mrs Taylor', en: 'If you need anything, just knock on my door.', vi: 'Nếu cần gì cứ gõ cửa nhà bà nhé.' },
        { you: true, en: "Thank you, that's very kind of you.", vi: 'Cháu cảm ơn, bà tốt quá.', accept: ["That's very kind of you, thank you.", 'Thank you so much.'] },
      ],
      responses: [
        { say: 'How long have you studied English?', options: ['For about two years.', 'Since two years.', 'Two years ago.'], answer: 0, why: 'Khoảng thời gian dùng "for".' },
        { context: 'Bạn biết Lan từ hồi học tiểu học.', options: ["I've known Lan since primary school.", 'I know Lan since primary school.', "I've known Lan for primary school."], answer: 0, why: 'Hiện tại hoàn thành + since + mốc.' },
        { say: 'When did you start this job?', options: ['I started in January.', "I've started in January.", 'I start since January.'], answer: 0, why: 'Thời điểm cụ thể (in January) dùng quá khứ đơn.' },
        { say: 'If you need anything, just ask.', options: ["Thank you, that's very kind of you.", "Yes, I need.", "You're welcome."], answer: 0, why: 'Cảm ơn khi được đề nghị giúp đỡ: "That\'s very kind of you."' },
      ],
    },

    u23: {
      title: 'Kể lại sự cố', titleEn: 'Telling what happened', icon: '📱',
      situation: 'Hôm qua bạn bị rơi điện thoại khi đang chạy theo xe buýt. Bạn kể lại cho bạn cùng phòng nghe.',
      partner: 'Alex',
      phrases: [
        { fn: 'Hỏi chuyện gì xảy ra', items: [
          { en: 'What happened?', vi: 'Chuyện gì đã xảy ra?' },
          { en: 'What were you doing when it happened?', vi: 'Lúc đó bạn đang làm gì?' },
        ] },
        { fn: 'Kể lại', items: [
          { en: 'I was running for the bus when I dropped my phone.', vi: 'Mình đang chạy theo xe buýt thì đánh rơi điện thoại.' },
          { en: 'While I was waiting, it started to rain.', vi: 'Trong lúc mình đang đợi thì trời bắt đầu mưa.' },
          { en: 'Suddenly, …', vi: 'Bỗng nhiên, …' },
        ] },
        { fn: 'Phản ứng khi nghe', items: [
          { en: 'Oh no! Are you okay?', vi: 'Ôi không! Bạn có sao không?' },
          { en: 'What a nightmare!', vi: 'Kinh khủng thật!' },
          { en: 'That was lucky!', vi: 'May thật đấy!' },
        ] },
      ],
      culture: [
        'Kể chuyện: việc <b>đang diễn ra</b> dùng quá khứ tiếp diễn, việc <b>xen vào</b> dùng quá khứ đơn: I was walking home when I saw…',
        'Người nghe thường xen vào những câu ngắn như <b>"Oh no!"</b>, <b>"Really?"</b>, <b>"And then?"</b> để thể hiện mình đang theo dõi.',
        'Dùng <b>suddenly, then, after that, in the end</b> để câu chuyện mạch lạc.',
      ],
      dialogue: [
        { who: 'Alex', en: "What happened to your phone? The screen is broken!", vi: 'Điện thoại bạn bị sao vậy? Màn hình vỡ rồi!' },
        { you: true, en: 'I dropped it yesterday.', vi: 'Mình đánh rơi nó hôm qua.', accept: ['I dropped it.', 'I dropped my phone yesterday.'] },
        { who: 'Alex', en: 'Oh no! What were you doing?', vi: 'Ôi không! Lúc đó bạn đang làm gì?' },
        { you: true, en: 'I was running for the bus when it fell out of my pocket.', vi: 'Mình đang chạy theo xe buýt thì nó rơi khỏi túi.', accept: ['I was running for the bus when I dropped it.', 'I was running for the bus.'] },
        { who: 'Alex', en: 'Did you catch the bus?', vi: 'Thế có kịp xe buýt không?' },
        { you: true, en: "No, I didn't. While I was picking up my phone, the bus left.", vi: 'Không. Trong lúc mình nhặt điện thoại thì xe buýt chạy mất.', accept: ["No, I didn't. The bus left.", "No. While I was picking up my phone, the bus left."] },
        { who: 'Alex', en: 'What a nightmare! Are you okay?', vi: 'Kinh khủng thật! Bạn có sao không?' },
        { you: true, en: "I'm fine, but I need a new screen.", vi: 'Mình không sao, nhưng mình cần thay màn hình mới.', accept: ["I'm okay, but I need a new screen.", "I'm fine. I need a new screen."] },
      ],
      responses: [
        { say: 'What were you doing at 8 last night?', options: ['I was watching a film.', 'I watched a film at 8 tomorrow.', 'I am watching a film.'], answer: 0, why: 'Hành động đang diễn ra tại một thời điểm quá khứ: quá khứ tiếp diễn.' },
        { context: 'Bạn đang ngủ thì điện thoại reo.', options: ['I was sleeping when the phone rang.', 'I slept when the phone was ringing.', 'I was sleeping when the phone was ring.'], answer: 0, why: 'Việc đang diễn ra (was sleeping) + việc xen vào (rang).' },
        { say: 'I fell off my bike this morning.', options: ['Oh no! Are you okay?', 'Lucky you!', 'Good idea!'], answer: 0, why: 'Nghe tin không may – hỏi thăm "Are you okay?"' },
        { context: 'Bạn muốn nối hai việc xảy ra cùng lúc: tôi nấu ăn – em tôi làm bài tập.', options: ['While I was cooking, my sister was doing her homework.', 'While I cooked, my sister was do her homework.', 'When I was cook, my sister did homework.'], answer: 0, why: 'Hai việc đang diễn ra song song: while + quá khứ tiếp diễn.' },
      ],
    },

    u24: {
      title: 'Lên kế hoạch dã ngoại', titleEn: 'Planning a picnic', icon: '🧺',
      situation: 'Bạn và Hannah bàn chuyến dã ngoại cuối tuần, nhưng dự báo có thể mưa.',
      partner: 'Hannah',
      phrases: [
        { fn: 'Điều kiện có thể xảy ra', items: [
          { en: "If it rains, we'll stay at home.", vi: 'Nếu trời mưa, chúng ta sẽ ở nhà.' },
          { en: "We'll miss the bus unless we hurry.", vi: 'Chúng ta sẽ lỡ xe buýt nếu không nhanh lên.', note: 'unless = if… not' },
        ] },
        { fn: 'Sự thật luôn đúng', items: [
          { en: 'If you heat ice, it melts.', vi: 'Nếu đun nóng đá, nó tan.' },
          { en: 'If I drink coffee at night, I can\'t sleep.', vi: 'Nếu uống cà phê buổi tối, tôi không ngủ được.' },
        ] },
        { fn: 'Đưa ra phương án', items: [
          { en: "What if it rains? / What'll we do if…?", vi: 'Lỡ trời mưa thì sao?' },
          { en: 'Plan B: we can go to the cinema.', vi: 'Phương án dự phòng: đi xem phim.' },
        ] },
      ],
      culture: [
        'Câu điều kiện loại 1: mệnh đề <b>if</b> dùng hiện tại đơn – không dùng "will": If it rains (không nói "If it will rain").',
        'Người nói tiếng Anh hay nói <b>"Let\'s keep our fingers crossed!"</b> (cầu may) khi hy vọng điều tốt xảy ra.',
        '<b>"Plan B"</b> nghĩa là phương án dự phòng.',
      ],
      dialogue: [
        { who: 'Hannah', en: 'Are we still going on the picnic on Saturday?', vi: 'Thứ Bảy mình vẫn đi dã ngoại chứ?' },
        { you: true, en: 'Yes, but the forecast says it might rain.', vi: 'Có, nhưng dự báo nói có thể mưa.', accept: ['Yes, but it might rain.', 'I hope so, but it might rain.'] },
        { who: 'Hannah', en: 'Oh no. What will we do if it rains?', vi: 'Ôi không. Nếu mưa thì mình làm gì?' },
        { you: true, en: "If it rains, we'll go to the cinema instead.", vi: 'Nếu mưa, mình sẽ đi xem phim thay vào đó.', accept: ["If it rains, we'll go to the cinema.", "We'll go to the cinema if it rains."] },
        { who: 'Hannah', en: 'Good idea. What time should we leave?', vi: 'Ý hay. Mấy giờ mình đi?' },
        { you: true, en: "At eight. We'll miss the bus unless we leave early.", vi: 'Tám giờ. Nếu không đi sớm thì sẽ lỡ xe buýt.', accept: ["At eight. If we don't leave early, we'll miss the bus.", "Let's leave at eight."] },
        { who: 'Hannah', en: "Okay. I'll bring some sandwiches.", vi: 'Được. Mình sẽ mang bánh mì kẹp.' },
        { you: true, en: "Great! Let's keep our fingers crossed for good weather.", vi: 'Tuyệt! Cầu cho trời đẹp nhé.', accept: ["Let's keep our fingers crossed!", 'Great! I hope the weather is nice.'] },
      ],
      responses: [
        { context: 'Bạn muốn nói: Nếu mai trời nắng, tụi mình đi biển.', options: ["If it's sunny tomorrow, we'll go to the beach.", "If it will be sunny tomorrow, we go to the beach.", "If it's sunny tomorrow, we went to the beach."], answer: 0, why: 'Mệnh đề if: hiện tại đơn; mệnh đề chính: will + V.' },
        { context: 'Sự thật khoa học: nước sôi ở 100 độ.', options: ['If you heat water to 100 degrees, it boils.', "If you heat water to 100 degrees, it'll boiled.", 'If you will heat water, it boils.'], answer: 0, why: 'Sự thật luôn đúng: câu điều kiện loại 0 (hiện tại – hiện tại).' },
        { context: 'Bạn nhắc bạn: Bạn sẽ trượt nếu không học.', options: ["You'll fail unless you study.", "You'll fail unless you don't study.", 'You fail unless you will study.'], answer: 0, why: '"unless" đã mang nghĩa phủ định (= if not), không thêm "don\'t".' },
        { say: "What if we can't get tickets?", options: ["Then we'll watch a film at home.", 'Then we watched a film at home.', "Then we'd watched a film."], answer: 0, why: 'Đưa phương án cho tình huống có thể xảy ra: will + V.' },
      ],
    },

    u25: {
      title: 'Cuộc sống du học', titleEn: 'Life in a new country', icon: '✈️',
      situation: 'Bạn đang du học ở Anh được ba tháng. Cô giáo hỏi bạn đã quen với cuộc sống mới chưa.',
      partner: 'Ms Green',
      phrases: [
        { fn: 'Thói quen ngày trước', items: [
          { en: 'I used to eat rice every day.', vi: 'Trước đây tôi ăn cơm hằng ngày.' },
          { en: "I didn't use to drink tea.", vi: 'Trước đây tôi không uống trà.' },
        ] },
        { fn: 'Đã quen / đang dần quen', items: [
          { en: "I'm used to the cold weather now.", vi: 'Giờ tôi đã quen với thời tiết lạnh.' },
          { en: "I'm getting used to cooking for myself.", vi: 'Tôi đang dần quen với việc tự nấu ăn.' },
          { en: "I'm not used to driving on the left.", vi: 'Tôi chưa quen lái xe bên trái.' },
        ] },
        { fn: 'Chia sẻ cảm xúc', items: [
          { en: 'I sometimes feel homesick.', vi: 'Đôi khi tôi thấy nhớ nhà.' },
          { en: 'It was hard at first, but it is better now.', vi: 'Lúc đầu khó khăn, nhưng giờ đã ổn hơn.' },
        ] },
      ],
      culture: [
        '<b>used to + V</b>: thói quen trong quá khứ nay không còn. <b>be/get used to + V-ing</b>: đã quen / đang dần quen.',
        'Ở Anh, người ta hay nói về thời tiết để bắt chuyện – than phiền về mưa là chuyện rất bình thường!',
        'Nói thật về khó khăn (<b>It was hard at first…</b>) giúp người nghe đồng cảm và dễ đưa ra lời khuyên.',
      ],
      dialogue: [
        { who: 'Ms Green', en: "How are you finding life in England?", vi: 'Em thấy cuộc sống ở Anh thế nào?' },
        { you: true, en: 'It was hard at first, but it is better now.', vi: 'Lúc đầu khó khăn ạ, nhưng giờ ổn hơn rồi.', accept: ["It was hard at first, but it's better now.", "It's getting better."] },
        { who: 'Ms Green', en: 'Are you used to the weather?', vi: 'Em đã quen với thời tiết chưa?' },
        { you: true, en: "Not really. I'm not used to the cold and the rain.", vi: 'Chưa hẳn ạ. Em chưa quen với cái lạnh và mưa.', accept: ["I'm not used to the cold.", "Not really. I'm still getting used to it."] },
        { who: 'Ms Green', en: 'What about the food?', vi: 'Còn đồ ăn thì sao?' },
        { you: true, en: "I used to eat rice every day, but now I'm getting used to bread.", vi: 'Trước đây em ăn cơm hằng ngày, nhưng giờ em đang quen dần với bánh mì.', accept: ["I used to eat rice every day.", "I'm getting used to the food."] },
        { who: 'Ms Green', en: 'Do you feel homesick?', vi: 'Em có nhớ nhà không?' },
        { you: true, en: 'Sometimes, but I call my family every weekend.', vi: 'Đôi khi ạ, nhưng cuối tuần nào em cũng gọi về cho gia đình.', accept: ['Sometimes, but I call my family every week.', 'Yes, sometimes.'] },
      ],
      responses: [
        { context: 'Hồi nhỏ bạn có mái tóc dài, giờ thì không.', options: ['I used to have long hair.', 'I am used to have long hair.', 'I use to having long hair.'], answer: 0, why: 'Thói quen/trạng thái trong quá khứ: used to + V.' },
        { context: 'Bạn đã quen dậy sớm.', options: ["I'm used to getting up early.", "I'm used to get up early.", 'I used to getting up early.'], answer: 0, why: 'be used to + V-ing = đã quen với việc gì.' },
        { say: 'Do you like your new job?', options: ["Yes, but I'm still getting used to the long hours.", "Yes, but I'm still get used to the long hours.", 'Yes, I used to like.'], answer: 0, why: 'Đang dần quen: be getting used to + danh từ/V-ing.' },
        { say: 'Did you use to play an instrument?', options: ['Yes, I used to play the piano.', 'Yes, I use to playing the piano.', 'Yes, I was used to play.'], answer: 0, why: 'Câu hỏi "Did you use to…?" đáp "I used to + V".' },
      ],
    },

    u26: {
      title: 'Xin lời khuyên học tiếng Anh', titleEn: 'Asking for study tips', icon: '📚',
      situation: 'Bạn sắp thi IELTS và hỏi một người bạn đã đạt điểm cao cách ôn tập.',
      partner: 'Olivia',
      phrases: [
        { fn: 'Xin lời khuyên', items: [
          { en: 'Can you give me some advice?', vi: 'Bạn cho mình lời khuyên được không?' },
          { en: 'What do you suggest?', vi: 'Bạn gợi ý gì?' },
        ] },
        { fn: 'Gợi ý (to V / V-ing)', items: [
          { en: 'Try listening to podcasts every day.', vi: 'Thử nghe podcast mỗi ngày xem.', note: 'try + V-ing: thử làm xem có hiệu quả không.' },
          { en: 'I suggest practising with a partner.', vi: 'Mình gợi ý luyện tập với bạn.' },
          { en: 'Remember to check your answers.', vi: 'Nhớ kiểm tra lại đáp án.', note: 'remember + to V: nhớ phải làm.' },
        ] },
        { fn: 'Phản hồi', items: [
          { en: "That's a good idea. I'll try it.", vi: 'Ý hay đấy. Mình sẽ thử.' },
          { en: "I've decided to study for an hour a day.", vi: 'Mình quyết định học mỗi ngày một tiếng.' },
        ] },
      ],
      culture: [
        'Một số động từ đi với <b>to V</b> (decide, want, plan, agree, refuse), một số đi với <b>V-ing</b> (enjoy, avoid, suggest, mind, keep).',
        '<b>stop to V</b> = dừng lại để làm việc khác; <b>stop V-ing</b> = thôi không làm nữa.',
        'Người nói tiếng Anh hay đưa lời khuyên nhẹ nhàng: <b>"Why don\'t you try…?"</b>, <b>"Maybe you could…"</b>.',
      ],
      dialogue: [
        { you: true, en: "Olivia, I'm taking the IELTS exam next month. Can you give me some advice?", vi: 'Olivia ơi, tháng sau mình thi IELTS. Bạn cho mình lời khuyên được không?', accept: ['Can you give me some advice?', "I'm taking the IELTS exam. Can you give me some advice?"] },
        { who: 'Olivia', en: 'Sure! Do you practise listening every day?', vi: 'Được chứ! Bạn có luyện nghe mỗi ngày không?' },
        { you: true, en: 'Not really. I find it difficult.', vi: 'Không hẳn. Mình thấy khó.', accept: ["No, I don't. I find it difficult.", "Not really. It's difficult for me."] },
        { who: 'Olivia', en: 'Try listening to podcasts on your way to work. It really helps.', vi: 'Thử nghe podcast trên đường đi làm đi. Nó giúp nhiều lắm.' },
        { you: true, en: "That's a good idea. What about speaking?", vi: 'Ý hay đấy. Còn phần nói thì sao?', accept: ["Good idea. What about speaking?", "That's a good idea. I'll try it."] },
        { who: 'Olivia', en: 'I suggest practising with a partner. And remember to record yourself.', vi: 'Mình gợi ý luyện với bạn. Và nhớ thu âm lại giọng mình.' },
        { you: true, en: "Thanks! I've decided to study for an hour every day.", vi: 'Cảm ơn bạn! Mình quyết định mỗi ngày học một tiếng.', accept: ["Thanks! I'll study for an hour every day.", "I've decided to study every day."] },
        { who: 'Olivia', en: "Great plan. Don't forget to take breaks, too!", vi: 'Kế hoạch hay đấy. Đừng quên nghỉ ngơi nữa nhé!' },
      ],
      responses: [
        { context: 'Bạn đề nghị cả nhóm cùng học vào tối thứ Sáu.', options: ['I suggest studying together on Friday evening.', 'I suggest to study together on Friday evening.', 'I suggest study together.'], answer: 0, why: '"suggest" đi với V-ing.' },
        { context: 'Bạn tự nhắc: nhớ khoá cửa trước khi đi.', options: ['Remember to lock the door.', 'Remember locking the door.', 'Remember lock the door.'], answer: 0, why: 'remember + to V = nhớ phải làm (việc chưa làm).' },
        { say: 'Do you mind waiting a few minutes?', options: ['No, not at all.', 'Yes, I mind to wait.', 'No, I mind.'], answer: 0, why: '"Do you mind…?" – đồng ý thì trả lời "No, not at all."' },
        { context: 'Bạn đã bỏ hút thuốc từ năm ngoái.', options: ['I stopped smoking last year.', 'I stopped to smoke last year.', 'I stop smoke last year.'], answer: 0, why: 'stop + V-ing = thôi không làm nữa.' },
      ],
    },

    u27: {
      title: 'Tham quan làng nghề', titleEn: 'Visiting a craft village', icon: '🧵',
      situation: 'Bạn dẫn một du khách nước ngoài tham quan làng lụa Vạn Phúc và giải thích cách lụa được làm ra.',
      partner: 'Tourist',
      phrases: [
        { fn: 'Giới thiệu sản phẩm', items: [
          { en: 'This silk is made by hand.', vi: 'Lụa này được làm thủ công.' },
          { en: 'These scarves are sold all over the world.', vi: 'Những chiếc khăn này được bán khắp thế giới.' },
        ] },
        { fn: 'Nói về lịch sử', items: [
          { en: 'The village was founded about a thousand years ago.', vi: 'Làng được lập khoảng một nghìn năm trước.' },
          { en: 'This temple was built in the 15th century.', vi: 'Ngôi đền này được xây vào thế kỷ 15.' },
        ] },
        { fn: 'Du khách hỏi', items: [
          { en: 'How is it made?', vi: 'Nó được làm như thế nào?' },
          { en: 'Where is it produced?', vi: 'Nó được sản xuất ở đâu?' },
        ] },
      ],
      culture: [
        'Câu bị động (<b>is made, was built</b>) dùng khi quan trọng là sự vật, không phải người làm. Muốn nói người làm thì thêm <b>by</b>.',
        'Khi làm hướng dẫn viên, nói chậm, rõ và kiểm tra người nghe: <b>"Does that make sense?"</b>',
        'Du khách thích nghe câu chuyện thú vị – một chi tiết lịch sử hay sẽ làm chuyến tham quan đáng nhớ.',
      ],
      dialogue: [
        { you: true, en: 'Welcome to Van Phuc silk village!', vi: 'Chào mừng đến với làng lụa Vạn Phúc!', accept: ['Welcome to Van Phuc!', 'Welcome to the silk village!'] },
        { who: 'Tourist', en: 'Thank you! How old is the village?', vi: 'Cảm ơn! Làng này bao nhiêu tuổi rồi?' },
        { you: true, en: 'It was founded about a thousand years ago.', vi: 'Làng được lập khoảng một nghìn năm trước.', accept: ['It was founded a thousand years ago.', 'The village was founded about a thousand years ago.'] },
        { who: 'Tourist', en: 'Amazing! How is the silk made?', vi: 'Tuyệt vời! Lụa được làm như thế nào?' },
        { you: true, en: 'It is made by hand, on old wooden looms.', vi: 'Nó được dệt thủ công trên những khung cửi gỗ cũ.', accept: ["It's made by hand.", 'The silk is made by hand.'] },
        { who: 'Tourist', en: 'Is it sold only in Vietnam?', vi: 'Nó chỉ được bán ở Việt Nam thôi à?' },
        { you: true, en: 'No, it is exported to many countries.', vi: 'Không, nó được xuất khẩu sang nhiều nước.', accept: ["No, it's exported to many countries.", "No, it's sold all over the world."] },
        { who: 'Tourist', en: "I'd love to buy a scarf for my mother.", vi: 'Tôi muốn mua một chiếc khăn cho mẹ.' },
      ],
      responses: [
        { say: 'Who painted this picture?', options: ['It was painted by a local artist.', 'It painted by a local artist.', 'It was paint by a local artist.'], answer: 0, why: 'Bị động quá khứ: was + V3 (+ by…).' },
        { context: 'Bạn giới thiệu: Tiếng Anh được nói ở nhiều nước.', options: ['English is spoken in many countries.', 'English speaks in many countries.', 'English is speak in many countries.'], answer: 0, why: 'Bị động hiện tại: is/are + V3.' },
        { say: 'Where is coffee grown in Vietnam?', options: ["It's mainly grown in the Central Highlands.", 'It mainly grows by the Central Highlands.', "It's growing the Central Highlands."], answer: 0, why: 'Trả lời bằng câu bị động cùng thì với câu hỏi.' },
        { context: 'Bạn muốn kiểm tra du khách có hiểu không.', options: ['Does that make sense?', 'Do you understand or not?', 'You understand?!'], answer: 0, why: '"Does that make sense?" là câu hỏi lịch sự và tự nhiên.' },
      ],
    },

    u28: {
      title: 'Tìm đồ thất lạc', titleEn: 'At the lost property office', icon: '🎒',
      situation: 'Bạn để quên ba lô trên tàu. Bạn đến phòng giữ đồ thất lạc và mô tả chiếc ba lô.',
      partner: 'Officer',
      phrases: [
        { fn: 'Báo mất đồ', items: [
          { en: 'I think I left my backpack on the train.', vi: 'Tôi nghĩ tôi để quên ba lô trên tàu.' },
          { en: 'Has anyone handed in a black wallet?', vi: 'Có ai gửi lại chiếc ví đen nào không?' },
        ] },
        { fn: 'Mô tả đồ vật', items: [
          { en: "It's a blue backpack which has a small panda on it.", vi: 'Đó là chiếc ba lô xanh có hình gấu trúc nhỏ.' },
          { en: "It's the one that has my name on the label.", vi: 'Đó là cái có tên tôi trên nhãn.' },
        ] },
        { fn: 'Mô tả người, nơi chốn', items: [
          { en: 'The man who helped me was very kind.', vi: 'Người đàn ông giúp tôi rất tốt bụng.' },
          { en: "That's the seat where I was sitting.", vi: 'Đó là chỗ ngồi nơi tôi đã ngồi.' },
        ] },
      ],
      culture: [
        'Mệnh đề quan hệ giúp mô tả chính xác: <b>who</b> cho người, <b>which/that</b> cho vật, <b>where</b> cho nơi chốn, <b>whose</b> cho sở hữu.',
        'Khi báo mất đồ, chuẩn bị sẵn: màu sắc, kích cỡ, thương hiệu, đồ bên trong và thời gian, địa điểm bị mất.',
        'Nhân viên thường hỏi giấy tờ để xác nhận: <b>"Can I see some ID, please?"</b>',
      ],
      dialogue: [
        { who: 'Officer', en: 'Good afternoon. How can I help you?', vi: 'Chào buổi chiều. Tôi giúp gì được cho bạn?' },
        { you: true, en: 'I think I left my backpack on the train this morning.', vi: 'Tôi nghĩ sáng nay tôi để quên ba lô trên tàu.', accept: ['I left my backpack on the train.', 'I think I left my bag on the train.'] },
        { who: 'Officer', en: 'Can you describe it?', vi: 'Bạn mô tả nó được không?' },
        { you: true, en: "It's a blue backpack which has a small panda on it.", vi: 'Đó là chiếc ba lô xanh có hình gấu trúc nhỏ.', accept: ["It's a blue backpack with a small panda on it.", "It's a blue backpack that has a panda on it."] },
        { who: 'Officer', en: "What's inside it?", vi: 'Bên trong có gì?' },
        { you: true, en: 'A laptop and a notebook that has my name on it.', vi: 'Một máy tính xách tay và một quyển sổ có tên tôi.', accept: ['A laptop and a notebook.', 'There is a laptop and a notebook with my name on it.'] },
        { who: 'Officer', en: 'Is this the one? A passenger who found it brought it here.', vi: 'Có phải cái này không? Một hành khách nhặt được đã mang đến đây.' },
        { you: true, en: "Yes, that's it! Thank you so much!", vi: 'Đúng nó rồi! Cảm ơn rất nhiều!', accept: ["Yes, that's my backpack! Thank you!", "That's it! Thank you!"] },
      ],
      responses: [
        { context: 'Bạn mô tả người đã giúp bạn.', options: ['The woman who helped me was very kind.', 'The woman which helped me was very kind.', 'The woman where helped me was very kind.'], answer: 0, why: 'Người dùng "who".' },
        { context: 'Bạn mô tả quán ăn nơi bạn hay ăn trưa.', options: ["That's the café where I usually have lunch.", "That's the café which I usually have lunch.", "That's the café who I usually have lunch."], answer: 0, why: 'Nơi chốn + mệnh đề đầy đủ dùng "where".' },
        { context: 'Bạn có một người bạn, bố bạn ấy là phi công.', options: ['I have a friend whose father is a pilot.', "I have a friend who's father is a pilot.", 'I have a friend which father is a pilot.'], answer: 0, why: 'Sở hữu dùng "whose" (không phải "who\'s").' },
        { say: 'Can I see some ID, please?', options: ['Sure. Here is my passport.', 'No, I see.', 'Yes, you can see.'], answer: 0, why: 'Được hỏi giấy tờ thì đưa ra và nói "Here is…".' },
      ],
    },

    u29: {
      title: 'Hỏi ở quầy thông tin nhà ga', titleEn: 'At the information desk', icon: '🚉',
      situation: 'Bạn ở nhà ga London và cần hỏi thông tin chuyến tàu đi Oxford.',
      partner: 'Staff',
      phrases: [
        { fn: 'Hỏi lịch sự (câu hỏi gián tiếp)', items: [
          { en: 'Could you tell me when the next train leaves?', vi: 'Bạn có thể cho tôi biết khi nào chuyến tàu tiếp theo khởi hành không?' },
          { en: 'Do you know where platform 4 is?', vi: 'Bạn có biết sân ga số 4 ở đâu không?' },
          { en: 'I was wondering if I could change my ticket.', vi: 'Không biết tôi có thể đổi vé được không.' },
        ] },
        { fn: 'Xác nhận lại (câu hỏi đuôi)', items: [
          { en: "The train stops at Reading, doesn't it?", vi: 'Tàu có dừng ở Reading, phải không?' },
          { en: "It isn't delayed, is it?", vi: 'Nó không bị trễ, phải không?' },
        ] },
        { fn: 'Đồng tình', items: [
          { en: 'So do I. / Neither do I.', vi: 'Tôi cũng vậy. / Tôi cũng không.' },
        ] },
      ],
      culture: [
        'Câu hỏi gián tiếp (<b>Could you tell me where… is?</b>) lịch sự hơn câu hỏi trực tiếp. Chú ý: sau từ để hỏi, động từ đứng sau chủ ngữ.',
        'Câu hỏi đuôi dùng để <b>xác nhận</b> điều mình nghĩ là đúng: khẳng định → đuôi phủ định và ngược lại.',
        'Ở Anh, xếp hàng (queue) rất quan trọng – chen ngang bị coi là rất bất lịch sự.',
      ],
      dialogue: [
        { you: true, en: 'Excuse me, could you tell me when the next train to Oxford leaves?', vi: 'Xin lỗi, bạn có thể cho tôi biết khi nào có chuyến tàu tiếp theo đi Oxford không?', accept: ['Could you tell me when the next train to Oxford leaves?', 'Excuse me, when does the next train to Oxford leave?'] },
        { who: 'Staff', en: 'It leaves at 10:15 from platform 4.', vi: 'Tàu khởi hành lúc 10 giờ 15 ở sân ga số 4.' },
        { you: true, en: "It stops at Reading, doesn't it?", vi: 'Nó có dừng ở Reading, phải không?', accept: ["Does it stop at Reading?", "The train stops at Reading, doesn't it?"] },
        { who: 'Staff', en: "Yes, it does. It's a fast train.", vi: 'Có. Đó là tàu nhanh.' },
        { you: true, en: 'Do you know where platform 4 is?', vi: 'Bạn có biết sân ga số 4 ở đâu không?', accept: ['Could you tell me where platform 4 is?', 'Where is platform 4?'] },
        { who: 'Staff', en: "It's just over there, next to the café.", vi: 'Ngay đằng kia, cạnh quán cà phê.' },
        { you: true, en: "Thank you. The train isn't delayed, is it?", vi: 'Cảm ơn. Tàu không bị trễ, phải không?', accept: ["The train isn't delayed, is it?", 'Thanks. Is the train on time?'] },
        { who: 'Staff', en: "No, it's on time today.", vi: 'Không, hôm nay tàu đúng giờ.' },
      ],
      responses: [
        { context: 'Bạn muốn hỏi lịch sự bảo tàng mở cửa lúc mấy giờ.', options: ['Could you tell me what time the museum opens?', 'Could you tell me what time does the museum open?', 'What time open the museum?'], answer: 0, why: 'Câu hỏi gián tiếp: từ để hỏi + chủ ngữ + động từ (không đảo).' },
        { context: 'Bạn nghĩ bạn ấy là người Úc và muốn xác nhận.', options: ["You're from Australia, aren't you?", "You're from Australia, isn't it?", "You're from Australia, are you?"], answer: 0, why: 'Câu khẳng định với "you are" → đuôi "aren\'t you?".' },
        { say: "I don't like waiting in long queues.", options: ['Neither do I.', 'So do I.', 'Neither I do.'], answer: 0, why: 'Đồng tình với câu phủ định: "Neither do I."' },
        { say: 'I love travelling by train.', options: ['So do I.', 'Neither do I.', 'So I do.'], answer: 0, why: 'Đồng tình với câu khẳng định: "So do I."' },
      ],
    },

    u30: {
      title: 'Nói về một bộ phim', titleEn: 'Talking about a film', icon: '🎬',
      situation: 'Bạn và Ryan vừa xem xong một bộ phim. Hai người chia sẻ cảm nhận.',
      partner: 'Ryan',
      phrases: [
        { fn: 'Hỏi cảm nhận', items: [
          { en: 'What did you think of the film?', vi: 'Bạn thấy bộ phim thế nào?' },
          { en: 'Did you enjoy it?', vi: 'Bạn có thích không?' },
        ] },
        { fn: 'Tính từ -ing và -ed', items: [
          { en: 'The story was boring, so I was bored.', vi: 'Câu chuyện nhàm chán nên tôi thấy chán.', note: '-ing: tính chất sự vật; -ed: cảm xúc của người.' },
          { en: 'The ending was surprising. I was really surprised.', vi: 'Cái kết bất ngờ. Tôi thật sự bất ngờ.' },
        ] },
        { fn: 'Mức độ', items: [
          { en: 'It was too long.', vi: 'Phim dài quá.' },
          { en: "The actors didn't speak clearly enough.", vi: 'Diễn viên nói không đủ rõ.' },
          { en: 'The music was beautifully written.', vi: 'Nhạc được viết rất hay.' },
        ] },
      ],
      culture: [
        'Người học hay nhầm <b>"I am boring"</b> (tôi là người nhàm chán) với <b>"I am bored"</b> (tôi thấy chán).',
        'Khi không đồng ý, nói nhẹ nhàng: <b>"I see what you mean, but…"</b> thay vì "You\'re wrong."',
        '<b>too</b> + tính từ (quá… – ý tiêu cực); tính từ + <b>enough</b> (đủ…).',
      ],
      dialogue: [
        { who: 'Ryan', en: 'So, what did you think of the film?', vi: 'Thế bạn thấy bộ phim thế nào?' },
        { you: true, en: 'I thought it was really exciting!', vi: 'Mình thấy nó rất hấp dẫn!', accept: ['It was really exciting!', 'I thought it was exciting.'] },
        { who: 'Ryan', en: "Really? I was a bit bored. It was too long for me.", vi: 'Thật à? Mình hơi chán. Với mình thì nó dài quá.' },
        { you: true, en: 'I see what you mean, but the ending was amazing.', vi: 'Mình hiểu ý bạn, nhưng cái kết tuyệt vời.', accept: ['I see what you mean, but the ending was great.', 'The ending was amazing, though.'] },
        { who: 'Ryan', en: 'True. I was really surprised when the hero died.', vi: 'Đúng. Mình rất bất ngờ khi nhân vật chính chết.' },
        { you: true, en: 'Me too! I was so shocked.', vi: 'Mình cũng vậy! Mình sốc lắm.', accept: ['Me too! I was shocked.', 'So was I!'] },
        { who: 'Ryan', en: "But the actors didn't speak clearly enough. I didn't understand some parts.", vi: 'Nhưng diễn viên nói không đủ rõ. Mình không hiểu vài đoạn.' },
        { you: true, en: "Let's watch it again with subtitles!", vi: 'Mình xem lại có phụ đề đi!', accept: ["Let's watch it with subtitles next time.", 'We can watch it again with subtitles.'] },
      ],
      responses: [
        { context: 'Bài giảng quá dài và bạn thấy chán.', options: ['The lecture was boring, so I was bored.', 'The lecture was bored, so I was boring.', 'The lecture was boring, so I was boring.'], answer: 0, why: '-ing: tính chất của sự vật; -ed: cảm xúc của người.' },
        { context: 'Bạn chưa đủ tuổi để xem phim này.', options: ["I'm not old enough to watch this film.", "I'm not enough old to watch this film.", "I'm too old enough to watch this film."], answer: 0, why: 'Tính từ đứng trước "enough": old enough.' },
        { say: 'The film was terrible!', options: ['I see what you mean, but I liked the music.', "You're wrong.", 'No, it was terrible.'], answer: 0, why: 'Bất đồng nhẹ nhàng: "I see what you mean, but…"' },
        { context: 'Cô ấy hát rất hay (trạng từ).', options: ['She sings beautifully.', 'She sings beautiful.', 'She beautiful sings.'], answer: 0, why: 'Bổ nghĩa cho động từ dùng trạng từ -ly.' },
      ],
    },

    // ───────────────────────── CẤP 4 ─────────────────────────
    u31: {
      title: 'Báo cáo tiến độ dự án', titleEn: 'A project update meeting', icon: '📊',
      situation: 'Trong cuộc họp nhóm hằng tuần, trưởng nhóm hỏi bạn tiến độ dự án và vì sao một phần bị chậm.',
      partner: 'Team leader',
      phrases: [
        { fn: 'Báo cáo việc đang làm', items: [
          { en: "I've been working on the design all week.", vi: 'Tôi làm phần thiết kế suốt cả tuần nay.' },
          { en: "We've been testing the app since Monday.", vi: 'Chúng tôi kiểm thử ứng dụng từ thứ Hai.' },
        ] },
        { fn: 'Giải thích sự chậm trễ', items: [
          { en: "By the time we got the data, the deadline had already passed.", vi: 'Lúc chúng tôi nhận được dữ liệu thì đã quá hạn.' },
          { en: "We hadn't expected so many bugs.", vi: 'Chúng tôi không lường trước nhiều lỗi như vậy.' },
        ] },
        { fn: 'Đề xuất hướng giải quyết', items: [
          { en: 'Could we extend the deadline to Friday?', vi: 'Chúng ta có thể lùi hạn đến thứ Sáu không?' },
          { en: "I'll keep you updated.", vi: 'Tôi sẽ cập nhật thường xuyên cho anh/chị.' },
        ] },
      ],
      culture: [
        'Trong môi trường công sở phương Tây, báo trước khi có rủi ro chậm tiến độ được đánh giá cao hơn là im lặng đến phút cuối.',
        '<b>Hiện tại hoàn thành tiếp diễn</b> nhấn mạnh quá trình kéo dài đến hiện tại; <b>quá khứ hoàn thành</b> nói việc xảy ra trước một mốc quá khứ.',
        'Đưa ra vấn đề kèm giải pháp: <b>"The problem is…, so I suggest…"</b>',
      ],
      dialogue: [
        { who: 'Team leader', en: "Let's start. How's the project going?", vi: 'Bắt đầu nhé. Dự án đang thế nào rồi?' },
        { you: true, en: "Quite well. I've been working on the design all week.", vi: 'Khá tốt ạ. Cả tuần nay tôi làm phần thiết kế.', accept: ["I've been working on the design all week.", "It's going well. I've been working on the design."] },
        { who: 'Team leader', en: 'Good. And the user testing?', vi: 'Tốt. Còn phần kiểm thử người dùng?' },
        { you: true, en: "It's a bit behind schedule, I'm afraid.", vi: 'E là hơi chậm tiến độ ạ.', accept: ["It's behind schedule, I'm afraid.", "I'm afraid it's a bit late."] },
        { who: 'Team leader', en: 'Why is that?', vi: 'Sao vậy?' },
        { you: true, en: 'By the time we got the data, the testing team had already left for the holiday.', vi: 'Lúc chúng tôi nhận được dữ liệu thì nhóm kiểm thử đã nghỉ lễ rồi.', accept: ['By the time we got the data, the team had already left.', 'The testing team had already left when we got the data.'] },
        { who: 'Team leader', en: 'I see. What do you suggest?', vi: 'Tôi hiểu. Bạn đề xuất gì?' },
        { you: true, en: "Could we extend the deadline to Friday? I'll keep you updated.", vi: 'Chúng ta lùi hạn đến thứ Sáu được không ạ? Tôi sẽ cập nhật thường xuyên.', accept: ['Could we extend the deadline to Friday?', 'I suggest moving the deadline to Friday.'] },
      ],
      responses: [
        { say: 'You look exhausted!', options: ["I've been working on this report since 7 a.m.", "I've worked on this report since 7 a.m. yesterday.", 'I was working since 7 a.m.'], answer: 0, why: 'Giải thích kết quả hiện tại bằng một quá trình kéo dài: hiện tại hoàn thành tiếp diễn.' },
        { context: 'Khi bạn đến ga, tàu đã chạy rồi.', options: ['When I arrived at the station, the train had already left.', 'When I arrived at the station, the train has already left.', 'When I had arrived, the train left already.'], answer: 0, why: 'Việc xảy ra trước một mốc quá khứ: quá khứ hoàn thành.' },
        { context: 'Bạn muốn báo sếp một cách lịch sự rằng dự án bị chậm.', options: ["I'm afraid the project is a bit behind schedule.", 'The project is late. Not my fault.', 'Project slow.'], answer: 0, why: '"I\'m afraid…" làm tin xấu nghe nhẹ nhàng, chuyên nghiệp hơn.' },
        { say: 'Can you send me the figures by Monday?', options: ["Sure. I'll keep you updated if anything changes.", "Sure. I'll keeping you updated.", 'Sure. I keep you update.'], answer: 0, why: 'Hứa hẹn/đề nghị dùng "will" + V nguyên mẫu.' },
      ],
    },

    u32: {
      title: 'Sắp xếp lịch họp', titleEn: 'Scheduling a meeting', icon: '🗓️',
      situation: 'Một đối tác muốn hẹn gặp bạn tuần tới, nhưng lịch của bạn khá kín.',
      partner: 'Mr Lee',
      phrases: [
        { fn: 'Việc sẽ đang diễn ra', items: [
          { en: "I'll be flying to Singapore on Monday.", vi: 'Thứ Hai tôi sẽ đang bay đi Singapore.' },
          { en: "This time tomorrow, I'll be giving a presentation.", vi: 'Giờ này ngày mai tôi sẽ đang thuyết trình.' },
        ] },
        { fn: 'Việc sẽ hoàn thành', items: [
          { en: "By Thursday, I'll have finished the report.", vi: 'Trước thứ Năm, tôi sẽ hoàn thành báo cáo.' },
          { en: "By the time you arrive, we'll have prepared everything.", vi: 'Lúc anh đến, chúng tôi sẽ chuẩn bị xong mọi thứ.' },
        ] },
        { fn: 'Đề xuất thời gian', items: [
          { en: 'Would Wednesday afternoon suit you?', vi: 'Chiều thứ Tư có tiện cho anh không?' },
          { en: 'Does 3 p.m. work for you?', vi: '3 giờ chiều có được không?' },
          { en: "I'll send you a calendar invite.", vi: 'Tôi sẽ gửi anh lời mời qua lịch.' },
        ] },
      ],
      culture: [
        'Trong email, cuộc gọi công việc, người ta hay hỏi <b>"Does … work for you?"</b> hoặc <b>"Would … suit you?"</b> thay vì áp đặt thời gian.',
        'Nhớ ghi rõ <b>múi giờ</b> khi hẹn với đối tác nước ngoài (e.g. 3 p.m. Hanoi time).',
        '<b>Tương lai tiếp diễn</b> (will be V-ing) nghe lịch sự khi giải thích lý do mình không rảnh.',
      ],
      dialogue: [
        { who: 'Mr Lee', en: 'Are you free for a meeting on Monday?', vi: 'Thứ Hai anh/chị có rảnh để họp không?' },
        { you: true, en: "I'm afraid not. I'll be flying to Singapore on Monday.", vi: 'E là không ạ. Thứ Hai tôi sẽ đang bay đi Singapore.', accept: ["Sorry, I'll be flying to Singapore on Monday.", "I'm afraid not. I'll be travelling on Monday."] },
        { who: 'Mr Lee', en: 'What about Tuesday?', vi: 'Thứ Ba thì sao?' },
        { you: true, en: "I'll be attending a conference all day.", vi: 'Tôi sẽ dự hội nghị cả ngày.', accept: ["On Tuesday I'll be attending a conference.", "I'll be at a conference all day."] },
        { who: 'Mr Lee', en: "You're very busy! When will the report be ready?", vi: 'Anh/chị bận thật! Khi nào báo cáo xong?' },
        { you: true, en: "By Thursday, I'll have finished it.", vi: 'Trước thứ Năm tôi sẽ hoàn thành nó.', accept: ["I'll have finished it by Thursday.", "By Thursday, I'll have finished the report."] },
        { who: 'Mr Lee', en: "Great. Then let's meet after that.", vi: 'Tốt. Vậy mình gặp sau đó nhé.' },
        { you: true, en: "Would Friday at 3 p.m. suit you? I'll send you a calendar invite.", vi: 'Thứ Sáu lúc 3 giờ chiều có tiện cho anh không? Tôi sẽ gửi lời mời qua lịch.', accept: ['Does Friday at 3 p.m. work for you?', 'Would Friday afternoon suit you?'] },
      ],
      responses: [
        { say: 'Can I call you at 10 tomorrow?', options: ["Sorry, I'll be having an interview then. How about 11?", "Sorry, I'll have an interview then yesterday.", "Sorry, I was having an interview."], answer: 0, why: 'Việc sẽ đang diễn ra tại thời điểm tương lai: will be V-ing.' },
        { context: 'Đến năm 2030, bạn sẽ đã làm ở công ty 10 năm.', options: ["By 2030, I'll have worked here for ten years.", 'By 2030, I work here for ten years.', "By 2030, I'll be work here for ten years."], answer: 0, why: 'Hoàn thành trước một mốc tương lai: will have + V3.' },
        { context: 'Bạn đề xuất thời gian họp một cách lịch sự.', options: ['Does Thursday morning work for you?', 'We meet Thursday. Okay?', 'You come Thursday.'], answer: 0, why: '"Does … work for you?" là cách hỏi lịch sự, tự nhiên.' },
        { context: 'Bạn hẹn với đối tác ở Mỹ.', options: ['Shall we say 9 a.m. Hanoi time?', 'Shall we say 9 a.m.?', 'At 9, any time.'], answer: 0, why: 'Ghi rõ múi giờ tránh nhầm lẫn khi làm việc quốc tế.' },
      ],
    },

    u33: {
      title: 'Cho lời khuyên khó xử', titleEn: 'Giving advice on a dilemma', icon: '🤔',
      situation: 'Bạn của bạn được mời làm việc ở nước ngoài nhưng phân vân vì phải xa gia đình. Bạn ấy xin lời khuyên.',
      partner: 'Emily',
      phrases: [
        { fn: 'Khuyên (điều kiện loại 2)', items: [
          { en: "If I were you, I'd accept the offer.", vi: 'Nếu tôi là bạn, tôi sẽ nhận lời.' },
          { en: 'What would you do if you were in my position?', vi: 'Bạn sẽ làm gì nếu ở vị trí của tôi?' },
        ] },
        { fn: 'Tiếc nuối (điều kiện loại 3, wish)', items: [
          { en: "If I had known, I would have helped you.", vi: 'Nếu tôi biết thì tôi đã giúp bạn rồi.' },
          { en: 'I wish I had studied harder.', vi: 'Ước gì tôi đã học chăm hơn.' },
          { en: 'If only I spoke French!', vi: 'Giá mà tôi nói được tiếng Pháp!' },
        ] },
        { fn: 'Thể hiện sự đồng cảm', items: [
          { en: "That's a tough decision.", vi: 'Đó là một quyết định khó khăn.' },
          { en: 'I know how you feel.', vi: 'Tôi hiểu cảm giác của bạn.' },
        ] },
      ],
      culture: [
        'Khuyên kiểu <b>"If I were you, I\'d…"</b> nhẹ nhàng hơn "You must…". Trong tiếng Anh chuẩn dùng <b>were</b> cho mọi ngôi.',
        'Trước khi khuyên, nên thể hiện đồng cảm: <b>"That\'s a tough decision."</b>',
        'Người nói tiếng Anh tôn trọng quyết định cá nhân – thường kết thúc bằng <b>"But it\'s your decision."</b>',
      ],
      dialogue: [
        { who: 'Emily', en: "I've been offered a job in Australia, but I don't know if I should take it.", vi: 'Mình được mời làm việc ở Úc, nhưng không biết có nên nhận không.' },
        { you: true, en: "Wow, congratulations! That's a tough decision, though.", vi: 'Ồ, chúc mừng bạn! Nhưng đó đúng là quyết định khó.', accept: ["Congratulations! That's a tough decision.", "That's a tough decision."] },
        { who: 'Emily', en: "I'd miss my family so much. What would you do if you were me?", vi: 'Mình sẽ nhớ gia đình lắm. Nếu là mình thì bạn sẽ làm gì?' },
        { you: true, en: "If I were you, I'd accept the offer. It's a great chance.", vi: 'Nếu mình là bạn, mình sẽ nhận lời. Đó là cơ hội tuyệt vời.', accept: ["If I were you, I'd accept it.", "If I were you, I'd take the job."] },
        { who: 'Emily', en: "But what if I don't like it there?", vi: 'Nhưng lỡ mình không thích ở đó thì sao?' },
        { you: true, en: 'You could always come back. You can call your family every day.', vi: 'Bạn lúc nào cũng có thể quay về mà. Bạn có thể gọi cho gia đình mỗi ngày.', accept: ['You could always come back.', 'You can always come back.'] },
        { who: 'Emily', en: "You're right. I wish I could decide faster!", vi: 'Bạn nói đúng. Ước gì mình quyết định nhanh hơn!' },
        { you: true, en: "Take your time. But it's your decision.", vi: 'Cứ từ từ thôi. Nhưng đó là quyết định của bạn.', accept: ["It's your decision.", 'Take your time.'] },
      ],
      responses: [
        { context: 'Bạn khuyên bạn nên xin lỗi.', options: ["If I were you, I'd apologise.", "If I was you, I'll apologise.", 'If I am you, I apologise.'], answer: 0, why: 'Điều kiện loại 2: If + quá khứ (were), would + V.' },
        { context: 'Bạn tiếc vì đã không mang ô (và đã bị ướt).', options: ['If I had brought an umbrella, I wouldn\'t have got wet.', "If I brought an umbrella, I won't get wet.", "If I had brought an umbrella, I didn't get wet."], answer: 0, why: 'Tiếc nuối về quá khứ: điều kiện loại 3 (had V3, would have V3).' },
        { say: "I've failed my driving test again.", options: ["Oh no, I know how you feel. You'll pass next time.", 'Good job!', 'That is your problem.'], answer: 0, why: 'Thể hiện đồng cảm và động viên.' },
        { context: 'Bạn ước mình biết nói tiếng Nhật (hiện tại không biết).', options: ['I wish I could speak Japanese.', 'I wish I can speak Japanese.', 'I wish I will speak Japanese.'], answer: 0, why: 'Ước về hiện tại: wish + quá khứ (could).' },
      ],
    },

    u34: {
      title: 'Truyền đạt lại lời nhắn', titleEn: 'Passing on a message', icon: '📞',
      situation: 'Trong lúc sếp đi vắng, khách hàng gọi điện. Khi sếp quay lại, bạn thuật lại nội dung cuộc gọi.',
      partner: 'Manager',
      phrases: [
        { fn: 'Thuật lại lời nói', items: [
          { en: 'Mr Brown called. He said that the shipment would arrive late.', vi: 'Ông Brown gọi. Ông ấy nói hàng sẽ đến muộn.' },
          { en: "She told me she couldn't come to the meeting.", vi: 'Cô ấy bảo tôi cô ấy không đến họp được.' },
        ] },
        { fn: 'Thuật lại câu hỏi', items: [
          { en: 'He asked whether we could change the date.', vi: 'Ông ấy hỏi liệu ta có thể đổi ngày không.' },
          { en: 'She asked when the invoice would be sent.', vi: 'Cô ấy hỏi khi nào hoá đơn sẽ được gửi.' },
        ] },
        { fn: 'Thuật lại yêu cầu', items: [
          { en: 'He asked you to call him back.', vi: 'Ông ấy nhờ anh gọi lại.' },
          { en: 'She reminded me to send the contract.', vi: 'Cô ấy nhắc tôi gửi hợp đồng.' },
        ] },
      ],
      culture: [
        'Khi thuật lại, thường <b>lùi một thì</b>: will → would, can → could, is → was.',
        '<b>say</b> không cần tân ngữ (He said that…), <b>tell</b> cần tân ngữ (He told me that…).',
        'Ghi lời nhắn nên có: ai gọi, số điện thoại, nội dung chính và việc cần làm tiếp theo.',
      ],
      dialogue: [
        { who: 'Manager', en: 'Did anyone call while I was out?', vi: 'Lúc tôi đi vắng có ai gọi không?' },
        { you: true, en: 'Yes, Mr Brown called. He said that the shipment would arrive late.', vi: 'Có, ông Brown gọi. Ông ấy nói hàng sẽ đến muộn.', accept: ['Mr Brown called. He said the shipment would arrive late.', 'Yes. Mr Brown said the shipment would be late.'] },
        { who: 'Manager', en: 'Oh no. Did he say why?', vi: 'Ôi không. Ông ấy có nói vì sao không?' },
        { you: true, en: 'He told me there was a problem at the port.', vi: 'Ông ấy bảo tôi có vấn đề ở cảng.', accept: ['He said there was a problem at the port.', 'He told me that there was a problem at the port.'] },
        { who: 'Manager', en: 'Anything else?', vi: 'Còn gì nữa không?' },
        { you: true, en: 'He asked whether we could change the meeting to Thursday.', vi: 'Ông ấy hỏi liệu ta có thể dời cuộc họp sang thứ Năm không.', accept: ['He asked if we could change the meeting to Thursday.', 'He asked whether we could meet on Thursday.'] },
        { who: 'Manager', en: "Thursday is fine. Anything I need to do?", vi: 'Thứ Năm được. Tôi có cần làm gì không?' },
        { you: true, en: 'He asked you to call him back before five.', vi: 'Ông ấy nhờ anh gọi lại trước năm giờ.', accept: ['He asked you to call him back.', 'He wants you to call him back before five.'] },
      ],
      responses: [
        { context: 'Lan nói: "I will be late." Bạn thuật lại.', options: ['Lan said that she would be late.', 'Lan said that she will be late yesterday.', 'Lan told that she would be late.'], answer: 0, why: 'Lùi thì will → would; "say" không cần tân ngữ.' },
        { context: 'Sếp hỏi: "Can you work on Saturday?" Bạn kể lại.', options: ['My boss asked if I could work on Saturday.', 'My boss asked can I work on Saturday.', 'My boss asked if could I work on Saturday.'], answer: 0, why: 'Câu hỏi Yes/No thuật lại: asked if/whether + chủ ngữ + động từ.' },
        { context: 'Cô giáo bảo: "Don\'t use your phones." Bạn kể lại.', options: ['The teacher told us not to use our phones.', "The teacher told us don't use our phones.", 'The teacher said us not using phones.'], answer: 0, why: 'Mệnh lệnh phủ định: told + người + not to V.' },
        { context: 'Bạn ghi lời nhắn cho đồng nghiệp.', options: ['Anna called at 2 p.m. She asked you to email her the report.', 'Anna call. Report.', 'Someone called about something.'], answer: 0, why: 'Lời nhắn tốt: ai gọi, lúc nào, nội dung, việc cần làm.' },
      ],
    },

    u35: {
      title: 'Gọi dịch vụ sửa chữa', titleEn: 'Arranging a repair', icon: '🔧',
      situation: 'Điều hoà ở căn hộ bạn thuê bị hỏng. Bạn gọi cho công ty quản lý toà nhà để sắp xếp sửa chữa.',
      partner: 'Receptionist',
      phrases: [
        { fn: 'Báo sự cố', items: [
          { en: "The air conditioner in my flat isn't working.", vi: 'Điều hoà trong căn hộ của tôi không chạy.' },
          { en: "It's been making a strange noise.", vi: 'Nó cứ phát ra tiếng lạ.' },
        ] },
        { fn: 'Nhờ sửa (have / get something done)', items: [
          { en: "I'd like to have it checked as soon as possible.", vi: 'Tôi muốn nhờ người kiểm tra càng sớm càng tốt.' },
          { en: 'When can I get it repaired?', vi: 'Khi nào tôi có thể cho sửa nó?' },
        ] },
        { fn: 'Bị động nâng cao', items: [
          { en: 'Your request is being processed.', vi: 'Yêu cầu của bạn đang được xử lý.' },
          { en: 'It will be fixed by tomorrow.', vi: 'Nó sẽ được sửa xong trước ngày mai.' },
          { en: 'The part has already been ordered.', vi: 'Linh kiện đã được đặt rồi.' },
        ] },
      ],
      culture: [
        '<b>have/get + vật + V3</b> nghĩa là nhờ/thuê người khác làm: I had my car repaired (tôi mang xe đi sửa, không tự sửa).',
        'Khi gọi dịch vụ, cung cấp đủ thông tin: địa chỉ, số phòng, sự cố, thời gian bạn có nhà.',
        'Lịch sự nhưng rõ ràng về mức độ khẩn cấp: <b>"It\'s quite urgent because…"</b>',
      ],
      dialogue: [
        { who: 'Receptionist', en: 'Good morning, City Apartments. How can I help?', vi: 'Chào buổi sáng, City Apartments xin nghe. Tôi giúp gì được ạ?' },
        { you: true, en: "Hi, I'm calling from flat 12B. The air conditioner isn't working.", vi: 'Chào chị, tôi gọi từ căn 12B. Điều hoà không chạy.', accept: ["The air conditioner in my flat isn't working.", "Hello, the air conditioner in flat 12B isn't working."] },
        { who: 'Receptionist', en: "I'm sorry to hear that. When did the problem start?", vi: 'Rất tiếc về điều đó. Sự cố bắt đầu khi nào ạ?' },
        { you: true, en: "Yesterday. It's been making a strange noise since then.", vi: 'Hôm qua. Từ lúc đó nó cứ phát ra tiếng lạ.', accept: ["Yesterday. It's been making a strange noise.", 'It started yesterday.'] },
        { who: 'Receptionist', en: "Okay. Your request is being processed now.", vi: 'Vâng. Yêu cầu của anh/chị đang được xử lý.' },
        { you: true, en: "It's quite urgent because it's very hot. When can I get it repaired?", vi: 'Khá gấp vì trời rất nóng. Khi nào tôi có thể cho sửa nó?', accept: ['When can I get it repaired?', "It's quite urgent. When can it be repaired?"] },
        { who: 'Receptionist', en: 'A technician will come this afternoon. It should be fixed by tonight.', vi: 'Chiều nay kỹ thuật viên sẽ đến. Chắc tối nay sẽ được sửa xong.' },
        { you: true, en: "Perfect. I'll be at home after two. Thank you!", vi: 'Tuyệt. Sau hai giờ tôi có nhà. Cảm ơn chị!', accept: ["Great, I'll be home after two. Thank you!", 'Thank you! I will be at home this afternoon.'] },
      ],
      responses: [
        { context: 'Bạn mang xe đến tiệm để sửa (không tự sửa).', options: ['I had my car repaired yesterday.', 'I repaired my car by a mechanic.', 'I had repaired my car myself.'], answer: 0, why: 'Nhờ người khác làm: have + vật + V3.' },
        { context: 'Con đường đang được sửa trong tuần này.', options: ['The road is being repaired this week.', 'The road is repairing this week.', 'The road is been repaired this week.'], answer: 0, why: 'Bị động tiếp diễn: is being + V3.' },
        { context: 'Mẹ cho phép bạn đi chơi muộn.', options: ['My mum let me stay out late.', 'My mum let me to stay out late.', 'My mum made me to stay out.'], answer: 0, why: 'let/make + người + động từ nguyên mẫu không "to".' },
        { say: 'When will my order be delivered?', options: ['It will be delivered on Friday.', 'It will deliver on Friday.', 'It is delivering on Friday.'], answer: 0, why: 'Bị động tương lai: will be + V3.' },
      ],
    },

    u36: {
      title: 'Đoán xem chuyện gì đã xảy ra', titleEn: 'Speculating about the past', icon: '🔍',
      situation: 'Đồng nghiệp Tom không đến cuộc họp quan trọng và không nghe điện thoại. Bạn và Jess đoán xem chuyện gì đã xảy ra.',
      partner: 'Jess',
      phrases: [
        { fn: 'Suy đoán chắc chắn / có thể / không thể', items: [
          { en: 'He must have forgotten about the meeting.', vi: 'Chắc hẳn anh ấy đã quên cuộc họp.' },
          { en: 'He might have missed the bus.', vi: 'Có thể anh ấy đã lỡ xe buýt.' },
          { en: "He can't have overslept – he's always early.", vi: 'Không thể nào anh ấy ngủ quên – anh ấy luôn đến sớm.' },
        ] },
        { fn: 'Trách nhẹ / tiếc', items: [
          { en: 'He should have called us.', vi: 'Lẽ ra anh ấy nên gọi cho chúng ta.' },
          { en: "We shouldn't have scheduled it so early.", vi: 'Lẽ ra chúng ta không nên xếp lịch sớm như vậy.' },
          { en: "You needn't have waited for me.", vi: 'Lẽ ra bạn không cần đợi tôi (nhưng bạn đã đợi).' },
        ] },
      ],
      culture: [
        '<b>must have V3</b> (gần như chắc chắn), <b>might/may have V3</b> (có thể), <b>can\'t have V3</b> (chắc chắn không).',
        '<b>should have V3</b> dùng để trách nhẹ hoặc tiếc – người nói tiếng Anh thường dùng thay vì phê phán trực tiếp.',
        'Khi chưa rõ sự việc, tránh kết luận vội: <b>"Let\'s not jump to conclusions."</b>',
      ],
      dialogue: [
        { who: 'Jess', en: "Where's Tom? The meeting started twenty minutes ago.", vi: 'Tom đâu rồi? Cuộc họp bắt đầu hai mươi phút trước rồi.' },
        { you: true, en: 'He must have forgotten about it.', vi: 'Chắc hẳn anh ấy quên mất rồi.', accept: ['He must have forgotten.', 'Maybe he forgot about it.'] },
        { who: 'Jess', en: "He can't have forgotten. I reminded him yesterday.", vi: 'Không thể quên được. Hôm qua mình đã nhắc anh ấy.' },
        { you: true, en: 'Then he might have missed the bus.', vi: 'Vậy có thể anh ấy lỡ xe buýt.', accept: ['He might have missed the bus.', 'Maybe he missed the bus.'] },
        { who: 'Jess', en: "Maybe. But he isn't answering his phone either.", vi: 'Có thể. Nhưng anh ấy cũng không nghe máy.' },
        { you: true, en: 'His battery may have died. He should have called us, though.', vi: 'Có thể điện thoại hết pin. Dù vậy lẽ ra anh ấy nên gọi cho chúng ta.', accept: ['His phone may have died.', 'He should have called us.'] },
        { who: 'Jess', en: "Let's not jump to conclusions. I hope he's okay.", vi: 'Đừng vội kết luận. Mong là anh ấy ổn.' },
        { you: true, en: "You're right. Let's start without him and update him later.", vi: 'Bạn nói đúng. Mình bắt đầu trước rồi cập nhật cho anh ấy sau.', accept: ["Let's start without him.", "You're right. Let's start the meeting."] },
      ],
      responses: [
        { context: 'Đường ướt hết. Bạn đoán đêm qua trời mưa (gần như chắc chắn).', options: ['It must have rained last night.', 'It must rain last night.', 'It can\'t have rained last night.'], answer: 0, why: 'Suy đoán gần như chắc chắn về quá khứ: must have + V3.' },
        { context: 'Bạn thấy Lan ở Hà Nội sáng nay, nên cô ấy không thể đi Đà Nẵng hôm qua.', options: ["She can't have gone to Da Nang yesterday.", "She mustn't have gone to Da Nang yesterday.", "She shouldn't go to Da Nang yesterday."], answer: 0, why: 'Chắc chắn điều gì không xảy ra: can\'t have + V3.' },
        { context: 'Bạn bị cháy nắng vì không bôi kem chống nắng.', options: ['I should have put on sunscreen.', 'I must have put on sunscreen.', 'I should put on sunscreen yesterday.'], answer: 0, why: 'Tiếc nuối việc đã không làm: should have + V3.' },
        { context: 'Bạn mang ô nhưng trời không mưa.', options: ["I needn't have brought an umbrella.", "I mustn't have brought an umbrella.", "I didn't need bring an umbrella."], answer: 0, why: 'Đã làm nhưng hoá ra không cần: needn\'t have + V3.' },
      ],
    },

    u37: {
      title: 'Phỏng vấn xin việc', titleEn: 'A job interview', icon: '💼',
      situation: 'Bạn đang phỏng vấn vị trí trưởng nhóm. Người phỏng vấn hỏi về khó khăn bạn đã vượt qua.',
      partner: 'Interviewer',
      phrases: [
        { fn: 'Giới thiệu điểm mạnh', items: [
          { en: "I'm a hard-working and reliable person.", vi: 'Tôi là người chăm chỉ và đáng tin cậy.' },
          { en: 'I have five years of experience in marketing.', vi: 'Tôi có năm năm kinh nghiệm marketing.' },
        ] },
        { fn: 'Kể về khó khăn (although / despite)', items: [
          { en: 'Although the deadline was very tight, we finished on time.', vi: 'Mặc dù hạn chót rất gấp, chúng tôi vẫn xong đúng hạn.' },
          { en: 'Despite the difficulties, the project was a success.', vi: 'Bất chấp khó khăn, dự án đã thành công.' },
        ] },
        { fn: 'Kết quả và mức độ', items: [
          { en: 'The campaign was so successful that sales doubled.', vi: 'Chiến dịch thành công đến mức doanh số tăng gấp đôi.' },
          { en: 'It was such a challenge that I learned a lot.', vi: 'Đó là thử thách lớn đến mức tôi học được rất nhiều.' },
        ] },
      ],
      culture: [
        'Trả lời câu hỏi về khó khăn theo mô hình <b>STAR</b>: Situation (tình huống), Task (nhiệm vụ), Action (bạn làm gì), Result (kết quả).',
        '<b>although / even though + mệnh đề</b>; <b>despite / in spite of + danh từ hoặc V-ing</b>.',
        'Cuối buổi phỏng vấn nên hỏi lại một câu: <b>"What would a typical day look like in this role?"</b> – cho thấy bạn thật sự quan tâm.',
      ],
      dialogue: [
        { who: 'Interviewer', en: 'Tell me about a difficult situation you have faced at work.', vi: 'Hãy kể về một tình huống khó khăn bạn từng gặp ở công việc.' },
        { you: true, en: 'Last year, my team had only two weeks to launch a new product.', vi: 'Năm ngoái, nhóm tôi chỉ có hai tuần để ra mắt một sản phẩm mới.', accept: ['Last year my team had only two weeks to launch a product.', 'We had only two weeks to launch a new product.'] },
        { who: 'Interviewer', en: 'What did you do?', vi: 'Bạn đã làm gì?' },
        { you: true, en: 'Although the deadline was very tight, I divided the work and we finished on time.', vi: 'Mặc dù hạn chót rất gấp, tôi đã chia việc và chúng tôi hoàn thành đúng hạn.', accept: ['Although the deadline was tight, we finished on time.', 'Despite the tight deadline, we finished on time.'] },
        { who: 'Interviewer', en: 'And what was the result?', vi: 'Và kết quả thế nào?' },
        { you: true, en: 'The launch was so successful that sales doubled in a month.', vi: 'Buổi ra mắt thành công đến mức doanh số tăng gấp đôi trong một tháng.', accept: ['It was so successful that sales doubled.', 'The launch was very successful. Sales doubled.'] },
        { who: 'Interviewer', en: 'Impressive. Do you have any questions for us?', vi: 'Ấn tượng đấy. Bạn có câu hỏi nào cho chúng tôi không?' },
        { you: true, en: 'Yes. What would a typical day look like in this role?', vi: 'Có ạ. Một ngày làm việc điển hình ở vị trí này sẽ như thế nào?', accept: ['What would a typical day look like?', 'What does a typical day look like in this role?'] },
      ],
      responses: [
        { context: 'Mặc dù mưa, trận đấu vẫn diễn ra.', options: ['Despite the rain, the match went ahead.', 'Despite it rained, the match went ahead.', 'Although the rain, the match went ahead.'], answer: 0, why: '"Despite" + danh từ; "although" + mệnh đề.' },
        { context: 'Buổi diễn hài đến mức ai cũng cười.', options: ['It was such a funny show that everyone laughed.', 'It was so funny show that everyone laughed.', 'It was such funny show that everyone laughed.'], answer: 0, why: 'such + a + tính từ + danh từ + that…' },
        { say: 'Do you have any questions for us?', options: ['Yes. What are the next steps in the process?', "No. When do I get paid?", 'No, nothing.'], answer: 0, why: 'Hỏi một câu thể hiện quan tâm tới công việc gây ấn tượng tốt.' },
        { say: 'What is your greatest strength?', options: ["I'm very organised. In my last job, I managed three projects at once.", "I'm the best.", "I don't have any weaknesses."], answer: 0, why: 'Nêu điểm mạnh kèm ví dụ cụ thể.' },
      ],
    },

    u38: {
      title: 'Góp ý trong cuộc họp', titleEn: 'Giving opinions in a meeting', icon: '🗣️',
      situation: 'Nhóm bạn đang chọn nhà cung cấp mới. Bạn đưa ra ý kiến và phản hồi ý kiến của đồng nghiệp.',
      partner: 'Colleague',
      phrases: [
        { fn: 'Nêu ý kiến', items: [
          { en: 'In my opinion, supplier A is the better choice.', vi: 'Theo tôi, nhà cung cấp A là lựa chọn tốt hơn.' },
          { en: 'They are not only cheaper but also more reliable.', vi: 'Họ không chỉ rẻ hơn mà còn đáng tin cậy hơn.' },
          { en: 'Both the price and the quality are important.', vi: 'Cả giá lẫn chất lượng đều quan trọng.' },
        ] },
        { fn: 'Đồng ý và phản biện lịch sự', items: [
          { en: 'I completely agree with you.', vi: 'Tôi hoàn toàn đồng ý với anh/chị.' },
          { en: 'I see your point, but…', vi: 'Tôi hiểu ý anh/chị, nhưng…' },
          { en: 'Could I just add something?', vi: 'Tôi có thể bổ sung một ý không?' },
        ] },
        { fn: 'Tóm tắt', items: [
          { en: "So, to sum up, we've agreed to…", vi: 'Vậy, tóm lại, chúng ta đã thống nhất…' },
        ] },
      ],
      culture: [
        'Trong cuộc họp, phản biện thường bắt đầu bằng một điểm đồng ý: <b>"I see your point, but…"</b> – không nói thẳng "That\'s wrong."',
        'Muốn chen vào lịch sự: <b>"Sorry to interrupt, but…"</b> hoặc <b>"Could I just add something?"</b>',
        'Cấu trúc song song giúp lập luận rõ ràng: <b>not only… but also</b>, <b>both… and</b>, <b>as well as</b>.',
      ],
      dialogue: [
        { who: 'Colleague', en: 'So, which supplier should we choose?', vi: 'Vậy chúng ta nên chọn nhà cung cấp nào?' },
        { you: true, en: 'In my opinion, supplier A is the better choice.', vi: 'Theo tôi, nhà cung cấp A là lựa chọn tốt hơn.', accept: ['I think supplier A is the better choice.', 'In my opinion, we should choose supplier A.'] },
        { who: 'Colleague', en: 'Why do you think so?', vi: 'Sao anh/chị nghĩ vậy?' },
        { you: true, en: 'They are not only cheaper but also more reliable.', vi: 'Họ không chỉ rẻ hơn mà còn đáng tin cậy hơn.', accept: ["They're not only cheaper but also more reliable.", 'They are cheaper and more reliable.'] },
        { who: 'Colleague', en: 'But supplier B delivers much faster.', vi: 'Nhưng nhà cung cấp B giao hàng nhanh hơn nhiều.' },
        { you: true, en: 'I see your point, but both price and quality matter more to our customers.', vi: 'Tôi hiểu ý anh/chị, nhưng cả giá lẫn chất lượng quan trọng hơn với khách hàng của chúng ta.', accept: ['I see your point, but price and quality matter more.', 'I see your point, but quality is more important.'] },
        { who: 'Colleague', en: "That's fair. Let's go with supplier A.", vi: 'Hợp lý. Chọn nhà cung cấp A nhé.' },
        { you: true, en: "So, to sum up, we've agreed to choose supplier A.", vi: 'Vậy, tóm lại, chúng ta đã thống nhất chọn nhà cung cấp A.', accept: ["To sum up, we've agreed to choose supplier A.", "Great. So we've agreed on supplier A."] },
      ],
      responses: [
        { say: 'I think we should cancel the project.', options: ['I see your point, but we have already invested a lot.', "That's a stupid idea.", 'No. Wrong.'], answer: 0, why: 'Phản biện lịch sự: ghi nhận ý kiến trước rồi mới đưa lý do.' },
        { context: 'Bạn muốn nói: Cô ấy vừa thông minh vừa chăm chỉ.', options: ['She is both intelligent and hard-working.', 'She is both intelligent and works hard.', 'She is both intelligence and hard-working.'], answer: 0, why: 'Cấu trúc song song: hai vế cùng loại từ (tính từ – tính từ).' },
        { context: 'Bạn muốn chen vào để bổ sung ý.', options: ['Sorry to interrupt, but could I just add something?', 'Stop! Listen to me.', 'Wait, I talk now.'], answer: 0, why: 'Chen ngang lịch sự trong cuộc họp.' },
        { context: 'Mọi người trong nhóm đều đồng ý (chủ ngữ số ít).', options: ['Everyone in the team agrees.', 'Everyone in the team agree.', 'Everyone in the team are agree.'], answer: 0, why: '"Everyone" là chủ ngữ số ít → agrees.' },
      ],
    },

    u39: {
      title: 'Giới thiệu điểm du lịch', titleEn: 'Recommending a destination', icon: '🏞️',
      situation: 'Một khách du lịch ở khách sạn nhờ bạn – nhân viên lễ tân – gợi ý nơi nên đi trong hai ngày.',
      partner: 'Guest',
      phrases: [
        { fn: 'Mô tả gọn (rút gọn mệnh đề)', items: [
          { en: 'Sa Pa is a town located in the mountains.', vi: 'Sa Pa là một thị trấn nằm trên núi.' },
          { en: 'The rice terraces, built centuries ago, are breathtaking.', vi: 'Những ruộng bậc thang, được làm từ nhiều thế kỷ trước, đẹp ngoạn mục.' },
          { en: 'Visitors staying overnight can enjoy the night market.', vi: 'Du khách ở lại qua đêm có thể dạo chợ đêm.' },
        ] },
        { fn: 'Gợi ý', items: [
          { en: 'I highly recommend visiting Ninh Binh.', vi: 'Tôi rất khuyên anh/chị nên đến Ninh Bình.' },
          { en: "If you're interested in nature, …", vi: 'Nếu anh/chị thích thiên nhiên thì…' },
        ] },
        { fn: 'Mở đầu bằng V-ing / Having V3', items: [
          { en: 'Having visited Ha Long, many tourists then go to Ninh Binh.', vi: 'Sau khi thăm Hạ Long, nhiều du khách đi tiếp Ninh Bình.' },
        ] },
      ],
      culture: [
        'Lễ tân khách sạn thường hỏi lại sở thích của khách trước khi gợi ý: <b>"What kind of things do you enjoy?"</b>',
        'Rút gọn mệnh đề quan hệ giúp câu ngắn gọn, tự nhiên hơn: a town <b>(which is) located</b> in… → a town located in…',
        'Đưa thông tin thực tế đi kèm: thời gian di chuyển, giá vé, thời điểm đẹp nhất trong ngày.',
      ],
      dialogue: [
        { who: 'Guest', en: 'Hi! I have two free days. Where would you recommend going?', vi: 'Chào bạn! Tôi có hai ngày rảnh. Bạn gợi ý nên đi đâu?' },
        { you: true, en: 'What kind of things do you enjoy?', vi: 'Anh/chị thích những hoạt động như thế nào ạ?', accept: ['What do you enjoy doing?', 'What kind of things do you like?'] },
        { who: 'Guest', en: 'I love nature and photography.', vi: 'Tôi thích thiên nhiên và chụp ảnh.' },
        { you: true, en: 'Then I highly recommend visiting Ninh Binh.', vi: 'Vậy tôi rất khuyên anh/chị đến Ninh Bình.', accept: ['I highly recommend Ninh Binh.', 'Then you should visit Ninh Binh.'] },
        { who: 'Guest', en: 'What is it like?', vi: 'Ở đó như thế nào?' },
        { you: true, en: "It's a province known for limestone mountains surrounded by rice fields.", vi: 'Đó là một tỉnh nổi tiếng với núi đá vôi được bao quanh bởi những cánh đồng lúa.', accept: ["It's known for limestone mountains and rice fields.", 'It has limestone mountains surrounded by rice fields.'] },
        { who: 'Guest', en: 'Sounds perfect. How do I get there?', vi: 'Nghe tuyệt quá. Đi đến đó bằng cách nào?' },
        { you: true, en: 'It takes about two hours by bus. Leaving early, you can avoid the crowds.', vi: 'Đi xe buýt khoảng hai tiếng. Đi sớm thì anh/chị có thể tránh đông người.', accept: ['It takes about two hours by bus.', 'About two hours by bus. You should leave early.'] },
      ],
      responses: [
        { context: 'Bạn viết gọn: "Hue is a city which is located on the Perfume River."', options: ['Hue is a city located on the Perfume River.', 'Hue is a city locating on the Perfume River.', 'Hue is a city is located on the Perfume River.'], answer: 0, why: 'Rút gọn mệnh đề bị động: bỏ "which is", giữ V3.' },
        { context: 'Viết gọn: "The man who is standing at the door is my uncle."', options: ['The man standing at the door is my uncle.', 'The man stood at the door is my uncle.', 'The man is standing at the door is my uncle.'], answer: 0, why: 'Rút gọn mệnh đề chủ động: dùng V-ing.' },
        { context: 'Sau khi ăn sáng xong, họ ra biển.', options: ['Having finished breakfast, they went to the beach.', 'Having finish breakfast, they went to the beach.', 'Finished breakfast, they went to the beach.'], answer: 0, why: 'Việc xảy ra trước: Having + V3.' },
        { say: 'Is there anything to do in the evening?', options: ['Yes, I highly recommend the night market near the lake.', 'Yes, there is evening.', 'Evening is dark.'], answer: 0, why: 'Gợi ý cụ thể, hữu ích cho khách.' },
      ],
    },

    u40: {
      title: 'Khiếu nại lịch sự', titleEn: 'Making a polite complaint', icon: '🛎️',
      situation: 'Phòng khách sạn bạn đặt không đúng như mô tả. Bạn xuống quầy lễ tân để khiếu nại một cách lịch sự nhưng kiên quyết.',
      partner: 'Hotel manager',
      phrases: [
        { fn: 'Nêu vấn đề', items: [
          { en: "I'm afraid there's a problem with my room.", vi: 'E là phòng của tôi có vấn đề.' },
          { en: 'Never have I stayed in such a noisy room.', vi: 'Tôi chưa bao giờ ở một căn phòng ồn như vậy.', note: 'Đảo ngữ để nhấn mạnh.' },
          { en: 'Not until I opened the window did I notice the building site.', vi: 'Mãi đến khi mở cửa sổ tôi mới thấy công trường.' },
        ] },
        { fn: 'Yêu cầu (giả định, would rather)', items: [
          { en: 'I insist that the room be changed.', vi: 'Tôi đề nghị dứt khoát phải đổi phòng.' },
          { en: "I'd rather have a room on a higher floor.", vi: 'Tôi muốn một phòng ở tầng cao hơn.' },
          { en: "It's time something was done about it.", vi: 'Đã đến lúc phải làm gì đó với chuyện này.' },
        ] },
        { fn: 'Kết thúc tích cực', items: [
          { en: 'I appreciate your help.', vi: 'Tôi cảm kích sự giúp đỡ của anh/chị.' },
        ] },
      ],
      culture: [
        'Khiếu nại hiệu quả: <b>bình tĩnh – nêu rõ vấn đề – đưa yêu cầu cụ thể – cảm ơn</b>. Lớn tiếng thường phản tác dụng.',
        'Mở đầu bằng <b>"I\'m afraid…"</b> hoặc <b>"I\'m sorry to bother you, but…"</b> giúp lời khiếu nại nhẹ nhàng hơn.',
        'Đảo ngữ (<b>Never have I…</b>, <b>Not until… did I…</b>) mang sắc thái trang trọng, nhấn mạnh – dùng vừa phải trong văn nói.',
      ],
      dialogue: [
        { who: 'Hotel manager', en: 'Good evening. How can I help you?', vi: 'Chào buổi tối. Tôi giúp gì được cho anh/chị?' },
        { you: true, en: "Good evening. I'm afraid there's a problem with my room.", vi: 'Chào anh. E là phòng của tôi có vấn đề.', accept: ["I'm afraid there's a problem with my room.", "I'm sorry to bother you, but there's a problem with my room."] },
        { who: 'Hotel manager', en: "I'm sorry to hear that. What's the problem?", vi: 'Rất tiếc về điều đó. Vấn đề là gì ạ?' },
        { you: true, en: 'It is extremely noisy. There is a building site right next to it.', vi: 'Phòng cực kỳ ồn. Ngay bên cạnh có một công trường.', accept: ["It's very noisy. There's a building site next to it.", 'The room is extremely noisy.'] },
        { who: 'Hotel manager', en: 'I do apologise. The construction only started this week.', vi: 'Thành thật xin lỗi. Công trình mới bắt đầu tuần này.' },
        { you: true, en: "I'd rather have a quiet room on a higher floor, please.", vi: 'Tôi muốn một phòng yên tĩnh ở tầng cao hơn.', accept: ["I'd rather have a quieter room, please.", "Could I have a quiet room on a higher floor?"] },
        { who: 'Hotel manager', en: 'Of course. We can move you to the tenth floor, and breakfast will be free tomorrow.', vi: 'Tất nhiên. Chúng tôi có thể chuyển anh/chị lên tầng mười, và bữa sáng mai sẽ miễn phí.' },
        { you: true, en: 'Thank you. I really appreciate your help.', vi: 'Cảm ơn anh. Tôi thật sự cảm kích sự giúp đỡ của anh.', accept: ['Thank you, I appreciate your help.', 'Thank you so much. I really appreciate it.'] },
      ],
      responses: [
        { context: 'Bạn muốn khiếu nại món ăn bị nguội một cách lịch sự.', options: ["I'm sorry to bother you, but my soup is cold.", 'This soup is cold! Terrible service!', 'Cold soup. Change.'], answer: 0, why: 'Mở đầu nhẹ nhàng rồi nêu rõ vấn đề.' },
        { context: 'Nhấn mạnh: Tôi chưa bao giờ thấy cảnh đẹp như vậy.', options: ['Never have I seen such a beautiful view.', 'Never I have seen such a beautiful view.', 'Never have I saw such a beautiful view.'], answer: 0, why: 'Đảo ngữ: Never + trợ động từ + chủ ngữ + V3.' },
        { context: 'Bác sĩ khuyên dứt khoát rằng anh ấy phải nghỉ ngơi.', options: ['The doctor recommended that he rest.', 'The doctor recommended that he rests.', 'The doctor recommended him to resting.'], answer: 0, why: 'Câu giả định: recommend that + chủ ngữ + V nguyên mẫu.' },
        { context: 'Bạn thích ở nhà hơn là ra ngoài tối nay.', options: ["I'd rather stay in tonight.", "I'd rather to stay in tonight.", "I'd rather staying in tonight."], answer: 0, why: "would rather + V nguyên mẫu (không 'to')." },
      ],
    },
  },
});
