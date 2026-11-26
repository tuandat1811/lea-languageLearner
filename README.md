# 📚 Lea – Học ngoại ngữ mỗi ngày

Website học ngoại ngữ cho người Việt, giao diện tiếng Việt, theme "góc học tập" ấm áp (kem – đất nung – tím lavender), có chế độ sáng/tối và hiệu ứng mưa nhẹ.
Khoá đầu tiên: **Tiếng Anh từ con số 0 đến B2** – 4 cấp, 40 chặng, 80 bài, đủ 4 kỹ năng **Nghe – Nói – Đọc – Viết**.

Web tĩnh thuần HTML/CSS/JS, không cần build, không cần cài thư viện.

## Chạy

```powershell
node tools/serve.js
```

Mở http://localhost:5173. (Có thể mở thẳng `index.html`, nhưng phần **Nói** cần `localhost`/`https` để dùng micro.)
Nên dùng **Chrome** hoặc **Edge**: nhận diện giọng nói (Web Speech API) chỉ có trên các trình duyệt này. Trình duyệt khác vẫn học được — phần Nói chuyển sang ghi âm và tự đánh giá.

## Lộ trình tiếng Anh

Cấp 1 · Nền tảng (A0 – A1), `data/en.js`:

| Chặng | Chủ đề | Bài 1 | Bài 2 | Ngữ pháp chính |
|---|---|---|---|---|
| 1 | Chào hỏi | Xin chào! | Lời nói lịch sự | Chào theo buổi, thank you / sorry / please |
| 2 | Giới thiệu bản thân | Tôi là… | Bạn khoẻ không? | to be (am/is/are), My name is…, How are you? |
| 3 | Số đếm | Số 1–10 | Số 11–20 & tuổi | Số nhiều -s, have/has, How old…? |
| 4 | Màu sắc & đồ vật | Màu sắc | Đồ vật quanh ta | Tính từ trước danh từ, a/an, this/that |
| 5 | Gia đình | Thành viên gia đình | Mô tả người thân | 's sở hữu, be + tính từ, phủ định not |
| 6 | Đồ ăn & thức uống | Món ăn yêu thích | Gọi món | like/don't like, Can I have…? |
| 7 | Một ngày của tôi | Hoạt động hằng ngày | Thường xuyên thế nào? | Hiện tại đơn, do/does, trạng từ tần suất |
| 8 | Thời gian | Các ngày trong tuần | Mấy giờ rồi? | on + ngày, at + giờ, o'clock / half past |
| 9 | Nhà của tôi | Các phòng trong nhà | Ở đâu? | There is/are, giới từ vị trí |
| 10 | Giáng sinh vui vẻ | Mùa Giáng sinh | Tiệc Giáng sinh | Số nhiều bất quy tắc, hiện tại tiếp diễn, Let's |

Các cấp tiếp theo: Cấp 2 (A2, chặng 11–20: mua sắm, quá khứ đơn, tương lai, so sánh…) nằm ở `data/en-a2.js`; Cấp 3 (B1, chặng 21–30: hiện tại hoàn thành, câu điều kiện, bị động, mệnh đề quan hệ…) ở `data/en-b1.js`; Cấp 4 (B2, chặng 31–40: câu điều kiện loại 2–3, câu tường thuật, đảo ngữ…) ở `data/en-b2.js`. Chi tiết giáo trình và kế hoạch học tập (3 nhịp độ) nằm ở [docs/giao-trinh.md](docs/giao-trinh.md) và trang **Giáo trình** trên web.

Trước bài 1 có trang **Bảng chữ cái** (26 chữ cái + từ ví dụ, bấm để nghe).

Mỗi bài gồm: **Từ vựng** (8–10 từ, IPA, phát âm) → **Ngữ pháp** → **Câu mẫu** → **4 kỹ năng**, mỗi kỹ năng có **bài giảng** (`#/study/<bài>/<kỹ năng>`, dựng từ dữ liệu bài học) và **bài tập** chấm điểm:

| Kỹ năng | Bài giảng | Bài tập |
|---|---|---|
| 🎧 Nghe | Nghe từ khoá; bài nghe hội thoại phát từng câu, ẩn/hiện lời và bản dịch; nghe cấu trúc | Nghe chọn nghĩa, nghe chọn câu, chép chính tả |
| 🎤 Nói | Bảng phát âm từ khoá (IPA, nghe chậm, 🎤 chấm thử); nói theo mẫu từng câu | Đọc to từ/câu, nói câu từ nghĩa tiếng Việt; **nói tự do** theo chủ đề (đếm từ, từ mới đã dùng) |
| 📖 Đọc | Bài đọc tô sáng từ vựng (chạm để nghe), bản dịch, câu hỏi định hướng | Nối từ, đọc chọn nghĩa, đọc hiểu |
| ✍️ Viết | Cấu trúc câu, bài viết mẫu | Dịch, sắp xếp, điền từ; **viết đoạn văn** có checklist (số câu, số từ, từ mới, viết hoa, dấu câu), lưu nháp |

**👄 Phát âm** (`#/pronunciation`, dữ liệu `data/en-pron.js`): 10 bài – nguyên âm dài/ngắn, /æ/–/e/, th, /s/–/ʃ/–/tʃ/, âm cuối, đuôi -s/-es, đuôi -ed, /l/–/n/–/r/, trọng âm, ngữ điệu & nối âm. Mỗi bài có bài giảng (khẩu hình, ví dụ, cặp từ dễ nhầm) và bài tập: nghe phân biệt cặp từ, phân loại cách đọc, nói.

Đạt ≥ 60% mỗi kỹ năng để mở khoá bài tiếp theo (1–3 sao). Có **Ôn tập** từ vựng theo phương pháp lặp lại ngắt quãng, chuỗi ngày học 🔥 và điểm sao ⭐. Tiến độ lưu trong `localStorage`.

## Thêm ngôn ngữ mới

1. Tạo `data/<mã>.js` (ví dụ `data/ja.js`) theo cấu trúc của `data/en.js` và gọi `LEA.registerLanguage({...})`:
   - `code`, `name`, `flag`, `speechLang` (ví dụ `ja-JP`), `level`, `description`
   - `units[].lessons[]` với `vocab`, `grammar`, `sentences` (≥ 5 câu), `reading`
   - tuỳ chọn: `alphabet`, `contractions`, `equivalents` (quy tắc so sánh đáp án riêng của ngôn ngữ)
2. Thêm `<script src="data/<mã>.js"></script>` vào `index.html`.
3. Chạy `node tools/validate.js` để kiểm tra dữ liệu.

Bài tập được sinh tự động từ dữ liệu bài học (`js/core/exercises.js`), nên không cần viết thêm code. Ngôn ngữ đã đăng ký sẽ tự biến mất khỏi danh sách "Sắp ra mắt" (`js/core/registry.js`).

## Cấu trúc

```
index.html
css/style.css            Theme góc học tập (sáng/tối qua biến CSS)
js/core/registry.js      Đăng ký ngôn ngữ, danh sách 4 kỹ năng
js/core/storage.js       Tiến độ, sao, chuỗi ngày, ôn tập (localStorage)
js/core/speech.js        Đọc (speechSynthesis) & nhận diện giọng nói
js/core/exercises.js     Sinh bài tập & chấm đáp án
js/ui/rain.js            Hiệu ứng mưa nhẹ (tuỳ chọn)
js/app.js                Router + các trang
data/en.js               Khoá tiếng Anh
tools/serve.js           Server tĩnh
tools/validate.js        Kiểm tra dữ liệu khoá học
```
