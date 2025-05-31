# Busybuy-1
# 🛍️ BusyBuy – E-Commerce Web App

**BusyBuy** is a full-stack e-commerce web application built with the MERN stack. It features user authentication with JWT, shopping cart, order management, and dynamic product filtering. The frontend is built using React 19 and Context API (no Redux), while the backend uses Express and MongoDB with secure API endpoints.

<img width="960" alt="P2" src="https://github.com/user-attachments/assets/8410b591-1313-4abb-ae35-ad2c675cfd9c" />

---

## 🏗️ Tech Stack

### Frontend
- **React 19** with `react-router-dom v7`
- **Context API** for global state management *(✅ No Redux)*
- **Custom CSS**
- Modular component-based architecture

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Multer** for file uploads
- **CORS** configuration
- **dotenv** for environment variable handling

---

## 🚀 Features

### ✅ Frontend (React)
- Product listing with category and price filters
- Shopping cart with quantity controls
- Order placement and order history
- User signup, login, and logout via JWT
- Responsive layout with intuitive navigation
- **State managed using Context API (not Redux)**

### ✅ Backend (Node.js + MongoDB)
- RESTful API with modular routes
- Secure user authentication with JWT
- Token blacklisting on logout
- MongoDB models: `User`, `Cart`, `Order`, `Blacklist`
- File upload support via Multer

---

## 📁 Project Structure

### 🔧 Backend (`/`)
server.js
/src
├── config/mongooseConfig.js
├── middleware/
│ ├── jwt.middleware.js
│ └── fileUpload.middleware.js
├── models/
│ ├── user.schema.js
│ ├── cart.schema.js
│ ├── order.schema.js
│ └── blacklist.schema.js
└── features/
└── user.routes.js

### 🎨 Frontend (`/client` or `/frontend`)
App.js
index.js
/context
└── productContext.js
/pages
├── HomePage
├── CartPage
├── OrdersPage
├── LoginPage
└── RegisterPage
/components
├── NavBar
├── FilterSidebar
└── ProductList
