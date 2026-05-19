# Backend User Management API

A backend portfolio project built with Node.js, Express.js, MongoDB, and JWT authentication, demonstrating secure REST API development with CRUD operations, user authentication, order management, file uploads, and protected routes.

## Features

- User Registration (Signup)
- User Login Authentication
- JWT Token-Based Authorization
- Password Encryption using bcrypt
- Product CRUD Operations
- Order Management API
- Protected Routes with Middleware Authentication
- File Upload Support for Product Images
- MongoDB Database Integration using Mongoose
- RESTful API Architecture
- Error Handling and Response Management

---

## Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication & Security**
- JWT (JSON Web Token)
- bcrypt

**File Upload**
- Multer

**Development Tools**
- Nodemon
- Postman

---

## Project Structure

```bash
project-root/
│
├── API/
│   ├── Controller/
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── user.js
│   │
│   ├── middleware/
│   │   └── check-auth.js
│   │
│   ├── Models/
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── user.js
│   │
│   └── routes/
│       ├── orders.js
│       ├── products.js
│       └── user.js
│
├── upload/
├── App.js
├── .gitignore
└── package.json
```

---

## API Endpoints

### Authentication

#### Register User
```http
POST /user/signup
```

Request Body:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

#### Login User
```http
POST /user/login
```

Request Body:
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "message": "Auth Successful!",
  "token": "jwt_token_here"
}
```

---

## Product APIs

### Get All Products
```http
GET /products
```

---

### Create Product
```http
POST /products
```

Headers:
```http
Authorization: Bearer <token>
```

Form Data:
```json
name
price
description
productImage
```

---

### Get Product By ID
```http
GET /products/:productId
```

---

### Update Product
```http
PATCH /products/:productId
```

Request Body:
```json
[
  {
    "propName": "name",
    "value": "Updated Product"
  }
]
```

---

### Delete Product
```http
DELETE /products/:productId
```

---

## Order APIs

### Get All Orders
```http
GET /orders
```

---

### Create Order
```http
POST /orders
```

Request Body:
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

---

### Get Single Order
```http
GET /orders/:orderId
```

---

### Delete Order
```http
DELETE /orders/:orderId
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/pratikshajare16/backend-user-management-api.git
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
```

Run project:

```bash
npm start
```

For development:

```bash
nodemon App.js
```

---

## Security Features

- JWT Authentication
- Protected API Routes
- Password Hashing
- Environment Variable Configuration
- Authorization Middleware

---

## Tools Used for Testing

- Postman
- MongoDB Compass

---

## Learning Outcomes

This project demonstrates practical backend development skills including:

- Authentication & Authorization
- Secure API Development
- REST API Design
- Database Schema Design
- File Upload Handling
- Express Middleware Implementation
- CRUD Operations
- MongoDB Relationships with Populate

---

## Future Improvements

- Role-Based Access Control
- Input Validation
- API Documentation with Swagger
- Refresh Token Authentication
- Unit Testing
- Deployment on Render / Railway

---

## Author

**Pratiksha Jare**
