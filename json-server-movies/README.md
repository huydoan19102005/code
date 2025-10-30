# 🎬 Movies Management System

Ứng dụng quản lý phim sử dụng React và JSON Server - Bài tập Client-Server Communication

## 📋 Giới thiệu

Đây là một ứng dụng web hoàn chỉnh để quản lý danh sách phim, sử dụng:
- **React** - Frontend framework
- **React Bootstrap** - UI Components
- **JSON Server** - RESTful API backend
- **Axios** - HTTP client

## 🚀 Tính năng

- ✅ Hiển thị danh sách phim với thông tin chi tiết
- ✅ Thêm phim mới
- ✅ Sửa thông tin phim
- ✅ Xóa phim
- ✅ Lọc theo thể loại
- ✅ Đánh giá phim (rating)
- ✅ Giao diện đẹp, responsive

## 📦 Cài đặt

### Bước 1: Cài đặt dependencies
```bash
npm install
```

Hoặc nếu gặp lỗi, cài đặt lại:
```bash
npm install react-bootstrap bootstrap json-server axios
```

## 🎯 Chạy ứng dụng

### Bước 1: Chạy JSON Server (Backend)
Mở terminal thứ nhất và chạy:
```bash
npm run server
```

JSON Server sẽ chạy tại: **http://localhost:3001**

### Bước 2: Chạy React App (Frontend)
Mở terminal thứ hai và chạy:
```bash
npm start
```

React App sẽ chạy tại: **http://localhost:3000**

## 📚 Cấu trúc dự án

```
json-server-movies/
├── db.json                 # Database JSON Server
├── package.json           # Dependencies và scripts
├── public/
└── src/
    ├── App.js             # Component chính
    ├── App.css            # Styles chính
    ├── index.js           # Entry point
    └── components/
        ├── MovieList.jsx  # Hiển thị danh sách phim
        └── MovieForm.jsx  # Form thêm/sửa phim
```

## 🔌 API Endpoints

JSON Server tự động tạo các RESTful endpoints:

### Movies
- `GET http://localhost:3001/movies` - Lấy tất cả phim
- `GET http://localhost:3001/movies/:id` - Lấy phim theo ID
- `POST http://localhost:3001/movies` - Thêm phim mới
- `PUT http://localhost:3001/movies/:id` - Cập nhật phim
- `DELETE http://localhost:3001/movies/:id` - Xóa phim

### Genres
- `GET http://localhost:3001/genres` - Lấy tất cả thể loại

## 📝 Cấu trúc dữ liệu

### Movie Object
```json
{
  "id": 1,
  "title": "The Matrix",
  "genreId": 1,
  "year": 1999,
  "director": "The Wachowskis",
  "rating": 8.7,
  "description": "A computer hacker learns..."
}
```

### Genre Object
```json
{
  "id": 1,
  "name": "Sci-Fi"
}
```

## 🎨 Screenshots

### Danh sách phim
- Hiển thị tất cả phim với card đẹp mắt
- Thông tin: Tên, năm, thể loại, rating, đạo diễn, mô tả
- Nút Sửa và Xóa

### Form thêm/sửa phim
- Modal popup với form đầy đủ
- Validation input
- Dropdown chọn thể loại

## 🔧 Troubleshooting

### Lỗi: "Cannot GET /movies"
➡️ Đảm bảo JSON Server đang chạy (`npm run server`)

### Lỗi: "Network Error"
➡️ Kiểm tra JSON Server chạy đúng port 3001

### Lỗi: CORS
➡️ JSON Server tự động enable CORS, không cần config thêm

## 📖 Hướng dẫn sử dụng

1. **Xem danh sách phim**: Trang chủ hiển thị tất cả phim
2. **Thêm phim mới**: Click nút "Thêm Phim Mới" ở góc trên
3. **Sửa phim**: Click nút "Sửa" trên card phim
4. **Xóa phim**: Click nút "Xóa" và xác nhận

## 🌟 Mở rộng

Có thể thêm các tính năng:
- Tìm kiếm phim
- Phân trang
- Sắp xếp theo rating/năm
- Upload ảnh poster
- Thêm actors, reviews
- Authentication

## 👨‍💻 Kiến thức cần thiết

- React Hooks (useState, useEffect)
- API calls với Axios
- RESTful API
- JSON Server
- Bootstrap styling
- CRUD operations

## 📄 License

MIT License - Free to use for learning purposes

---

**Chúc bạn học tập vui vẻ! 🎓**
