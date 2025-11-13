# HƯỚNG DẪN TỪNG BƯỚC - PERSONAL BUDGET MANAGEMENT

## BƯỚC 1: CÀI ĐẶT DỰ ÁN

### 1.1. Tạo React Application
- Dự án đã được tạo với tên `pe_fer25` (có thể đổi tên thành `fer202-02` nếu cần)

### 1.2. Cài đặt các packages cần thiết
Chạy lệnh sau trong terminal:
```bash
npm install react-router-dom @reduxjs/toolkit react-redux axios bootstrap react-bootstrap json-server --save
```

**Các packages đã cài đặt:**
- `react-router-dom`: Điều hướng trong ứng dụng React
- `@reduxjs/toolkit`: State management
- `react-redux`: Kết nối React với Redux
- `axios`: HTTP client để gọi API
- `bootstrap`: Framework CSS
- `react-bootstrap`: React components cho Bootstrap
- `json-server`: Mock REST API server

### 1.3. Thêm script cho JSON Server
Đã thêm script vào `package.json`:
```json
"server": "json-server --watch db.json --port 3001"
```

---

## BƯỚC 2: TẠO CẤU TRÚC THỨ MỤC

Đã tạo cấu trúc thư mục như sau:
```
src/
  ├── components/       # Các React components
  │   ├── Header.js
  │   ├── Footer.js
  │   ├── TotalExpenses.js
  │   ├── Filter.js
  │   ├── AddExpenseForm.js
  │   └── ExpenseTable.js
  ├── pages/           # Các trang của ứng dụng
  │   ├── Login.js
  │   └── Home.js
  ├── store/           # Redux store và slices
  │   ├── store.js
  │   ├── authSlice.js
  │   └── expensesSlice.js
  ├── services/        # API services
  │   └── api.js
  ├── App.js
  └── index.js
```

---

## BƯỚC 3: SETUP JSON SERVER

### 3.1. File db.json
File `db.json` đã có sẵn trong thư mục root với cấu trúc:
```json
{
  "users": [...],
  "expenses": [...]
}
```

### 3.2. Chạy JSON Server
Để chạy JSON Server, mở terminal và chạy:
```bash
npm run server
```
Server sẽ chạy trên `http://localhost:3001`

---

## BƯỚC 4: AUTHENTICATION

### 4.1. Login Page (`src/pages/Login.js`)
- Form đăng nhập với 2 trường: Username và Password
- Validation:
  - Kiểm tra cả 2 trường không được để trống
  - Kiểm tra password phải có ít nhất 6 ký tự
- Hiển thị thông báo lỗi khi validation fail
- Khi đăng nhập thành công, redirect đến `/home`

### 4.2. Auth Slice (`src/store/authSlice.js`)
- Quản lý state authentication
- Lưu user info vào localStorage
- Actions: `loginSuccess`, `logout`, `loadUserFromStorage`

### 4.3. API Service (`src/services/api.js`)
- Function `login()` để xác thực user với JSON Server

---

## BƯỚC 5: REDUX STORE VÀ SLICES

### 5.1. Redux Store (`src/store/store.js`)
- Cấu hình Redux store với `configureStore`
- Combine 2 reducers: `authReducer` và `expensesReducer`

### 5.2. Auth Slice (`src/store/authSlice.js`)
- Quản lý authentication state
- Lưu trữ user info và token

### 5.3. Expenses Slice (`src/store/expensesSlice.js`)
- Quản lý expenses state
- Async thunks:
  - `fetchExpenses`: Lấy danh sách expenses
  - `addExpenseAsync`: Thêm expense mới
  - `updateExpenseAsync`: Cập nhật expense
  - `deleteExpenseAsync`: Xóa expense
- Reducers:
  - `setSelectedCategory`: Set category filter
  - `setEditingExpense`: Set expense đang edit

---

## BƯỚC 6: HOME PAGE VÀ COMPONENTS

### 6.1. Header Component (`src/components/Header.js`)
- Logo và tên ứng dụng: "PersonalBudget"
- Hiển thị "Signed in as [FullName]"
- Nút Logout (redirect về `/login` và clear state)

### 6.2. Total Expenses Component (`src/components/TotalExpenses.js`)
- Hiển thị tổng chi phí
- Format VND: `2.720.000 ₫`
- Tự động cập nhật khi thêm/sửa/xóa expense
- Lọc theo category nếu có filter

### 6.3. Filter Component (`src/components/Filter.js`)
- Dropdown để lọc expenses theo category
- Mặc định: "All categories"

### 6.4. Add Expense Form (`src/components/AddExpenseForm.js`)
- Form với các trường:
  - Name (text)
  - Amount (number)
  - Category (select)
  - Date (text, format: DD/MM/YYYY)
- Validation:
  - Name và Category không được để trống
  - Amount phải là số > 0
- Buttons: Reset và Add expense (hoặc Save khi edit)

### 6.5. Expense Table (`src/components/ExpenseTable.js`)
- Bảng hiển thị danh sách expenses
- Columns: Name | Amount | Category | Date | Actions
- Format date: DD-MM-YYYY
- Format amount: VND
- Buttons Edit và Delete cho mỗi row

### 6.6. Footer Component (`src/components/Footer.js`)
- "© 2025 PersonalBudget Demo"
- "Built with React, Redux Toolkit & JSON Server"

### 6.7. Home Page (`src/pages/Home.js`)
- Layout với Bootstrap Grid
- Kết hợp tất cả components
- Fetch expenses khi component mount
- Protected route (chỉ cho phép khi đã đăng nhập)

---

## BƯỚC 7: CRUD OPERATIONS

### 7.1. Add Expense
- Form validation
- Gọi API để thêm expense
- Tự động refresh danh sách expenses
- Reset form sau khi thêm thành công

### 7.2. Edit Expense
- Click nút Edit trong bảng
- Form tự động điền dữ liệu expense cần edit
- Validation tương tự Add
- Cập nhật expense và refresh danh sách

### 7.3. Delete Expense
- Click nút Delete
- Confirm dialog
- Xóa expense và refresh danh sách

### 7.4. Real-time Updates
- Tất cả components sử dụng Redux state
- Khi state thay đổi, UI tự động cập nhật
- Không cần reload trang

---

## BƯỚC 8: TOTAL OF EXPENSES

### 8.1. Tính toán tổng
- Lọc expenses theo current user
- Lọc theo selected category (nếu có)
- Tính tổng từ tất cả expenses đã lọc

### 8.2. Format VND
- Sử dụng `Intl.NumberFormat` với locale `vi-VN`
- Format: `2.720.000 ₫`

### 8.3. Auto Update
- Component tự động cập nhật khi:
  - Thêm expense mới
  - Sửa expense (thay đổi amount)
  - Xóa expense
  - Thay đổi filter category

---

## BƯỚC 9: FILTER BY CATEGORY

### 9.1. Filter Component
- Dropdown hiển thị các categories duy nhất từ expenses của user hiện tại
- Option "All categories" luôn có

### 9.2. Filter Logic
- Khi chọn category, tất cả components liên quan tự động cập nhật:
  - ExpenseTable: Chỉ hiển thị expenses thuộc category đã chọn
  - TotalExpenses: Chỉ tính tổng expenses thuộc category đã chọn

---

## BƯỚC 10: REACT ROUTER

### 10.1. Router Setup (`src/index.js`)
- Wrap App với `BrowserRouter`
- Wrap với `Provider` từ Redux

### 10.2. Routes (`src/App.js`)
- `/login`: Trang đăng nhập
- `/home`: Trang chính (protected route)
- `/`: Redirect về `/login`
- `*`: Redirect về `/login` (404)

### 10.3. Protected Routes
- Component `ProtectedRoute` kiểm tra authentication
- Nếu chưa đăng nhập, redirect về `/login`

---

## CÁCH CHẠY ỨNG DỤNG

### Terminal 1: Start JSON Server
```bash
npm run server
```

### Terminal 2: Start React App
```bash
npm start
```

### Login Credentials:
- Username: `anhnv`, Password: `admin123`
- Username: `TamNT`, Password: `admin123`

---

## CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH

✅ Login page với validation đầy đủ
✅ Redirect đến /home sau khi đăng nhập
✅ Header với logo, tên user, và nút logout
✅ Total Expenses card với format VND
✅ Filter card với dropdown category
✅ Add Expense form với validation
✅ Expense Management table
✅ Footer
✅ Add, Edit, Delete expenses
✅ Real-time updates với Redux Toolkit
✅ Total expenses tự động cập nhật
✅ Filter by category
✅ Date format DD-MM-YYYY
✅ Amount format VND
✅ Protected routes
✅ Lưu trữ authentication state

---

## GHI CHÚ

- Tất cả expenses được lưu trong `db.json`
- Redux Toolkit được sử dụng để quản lý state (đạt 10 điểm)
- React Router được sử dụng cho navigation
- Bootstrap và React Bootstrap được sử dụng cho UI
- Axios được sử dụng để gọi API
- JSON Server chạy trên port 3001

