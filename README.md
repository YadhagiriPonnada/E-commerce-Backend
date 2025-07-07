# 🛒 AdaptNXT E-commerce Backend API

A fully functional backend API built with **Node.js**, **Express.js**, and **MongoDB**, developed as part of an internship assignment at **AdaptNXT**. This project supports core e-commerce features including product listings, cart management, order creation, and secure authentication using JWT.

---

## 🚀 Features

- ✅ User Signup & Login (JWT-based Authentication)
- 👥 Role-Based Access (Customer & Admin)
- 📦 Product Management (CRUD for Admins)
- 🛒 Cart Management (Add, Update, Remove items)
- 🧾 Order Creation (Place orders from cart)
- 🔐 Secure Routes & Password Hashing with Bcrypt
- 📁 MongoDB integration with Mongoose

---

## 🧑‍💻 Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Runtime       | Node.js           |
| Framework     | Express.js        |
| Database      | MongoDB + Mongoose |
| Auth          | JWT, Bcrypt       |
| Environment   | dotenv            |
| Dev Tooling   | Nodemon, Git      |

---

## 📂 Project Structure

AdaptNXT/
├── controllers/
│ ├── authController.js
│ ├── productController.js
│ ├── cartController.js
│ └── orderController.js
├── middleware/
│ └── auth.js
├── models/
│ ├── User.js
│ ├── Product.js
│ ├── Cart.js
│ └── Order.js
├── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│ ├── cartRoutes.js
│ └── orderRoutes.js
├── .env
├── server.js
└── package.json

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YadhagiriPonnada/E-commerce-Backend.git
   cd E-commerce-Backend
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment Variables

Create a .env file in the root:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
Run the Server

bash
Copy
Edit
npm run dev
🔐 API Authentication
All routes (except /auth/login & /auth/signup) require a JWT token.

Use the token in the header as:

makefile
Copy
Edit
Authorization: Bearer <your_token>
📬 API Endpoints
🔑 Auth
POST /api/auth/signup

POST /api/auth/login

📦 Products
GET /api/products – All users

POST /api/products – Admin only

PUT /api/products/:id – Admin only

DELETE /api/products/:id – Admin only

🛒 Cart
GET /api/cart – View cart

POST /api/cart – Add/Update item

DELETE /api/cart/:productId – Remove item

🧾 Orders
POST /api/orders – Place order (clears cart)

💡 Example Requests
🔐 Auth Header
http
Copy
Edit
Authorization: Bearer <your_jwt_token>
📥 Add Item to Cart (POST /api/cart)
json
Copy
Edit
{
  "productId": "64abcdef1234567890abcdef",
  "quantity": 2
}
📌 Notes
Admin users can manage products.

Customers can only view products, manage cart, and place orders.

Orders are created from the cart and the cart is cleared post-order.
const HOST = '192.168.98.1'; // ← your local IP
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

//http://192.168.98.1:5000/    -   "local IP"
