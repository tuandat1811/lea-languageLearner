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
  },
});
