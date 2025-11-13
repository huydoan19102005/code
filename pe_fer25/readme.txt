========================================
PERSONAL BUDGET MANAGEMENT APPLICATION
========================================

INSTALLED PACKAGES:
-------------------
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^7.9.5
- @reduxjs/toolkit: ^2.10.1
- react-redux: ^9.2.0
- axios: ^1.13.2
- bootstrap: ^5.3.8
- react-bootstrap: ^2.10.10
- json-server: ^1.0.0-beta.3

HOW TO RUN:
-----------
1. Install dependencies (if not already installed):
   npm install

2. Start JSON Server (Terminal 1):
   npm run server
   - This will start JSON Server on port 3001
   - The server will watch db.json file for changes

3. Start React Application (Terminal 2):
   npm start
   - This will start the React app on port 3000
   - The app will automatically open in your browser

4. Login Credentials:
   - Username: anhnv
   - Password: admin123
   
   OR
   
   - Username: TamNT
   - Password: admin123

FEATURES:
---------
- User Authentication (Login page with validation)
- Monthly Dashboard with expense management
- Add, Edit, Delete expenses
- View total expenses in VND format
- Filter expenses by category
- Real-time updates using Redux Toolkit

PROJECT STRUCTURE:
------------------
src/
  ├── components/
  │   ├── Header.js
  │   ├── Footer.js
  │   ├── TotalExpenses.js
  │   ├── Filter.js
  │   ├── AddExpenseForm.js
  │   └── ExpenseTable.js
  ├── pages/
  │   ├── Login.js
  │   └── Home.js
  ├── store/
  │   ├── store.js
  │   ├── authSlice.js
  │   └── expensesSlice.js
  ├── services/
  │   └── api.js
  ├── App.js
  └── index.js

NOTES:
------
- Make sure JSON Server is running before using the application
- All expenses are stored in db.json file
- The application uses Redux Toolkit for state management
- React Router is used for navigation
- Bootstrap and React Bootstrap are used for UI styling

