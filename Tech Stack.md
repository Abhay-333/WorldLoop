# 🚀 Social Media Platform

A full-stack social media platform built using the MERN Stack with real-time communication, scalable architecture, and modern development practices.

---

# 🛠 Tech Stack

## Frontend

* React 19
* Vite
* Redux Toolkit
* RTK Query
* React Router DOM
* React Hook Form
* Zod
* Axios
* Socket.IO Client
* Tailwind CSS
* Shadcn UI
* Framer Motion
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Socket.IO
* Cloudinary
* Multer
* Nodemailer
* Redis (Optional)
* Zod Validation

## Dev Tools

* ESLint
* Prettier
* Husky
* lint-staged
* Docker
* Postman
* GitHub Actions

---

# ✨ Features

## Authentication

* Register
* Login
* Logout
* Refresh Token
* Forgot Password
* Reset Password
* Verify Email
* Change Password

## User Management

* User Profile
* Edit Profile
* Upload Avatar
* Upload Cover Photo
* Bio
* Followers
* Following
* Suggested Users

## Posts

* Create Post
* Edit Post
* Delete Post
* Like Post
* Comment Post
* Share Post
* Save Post
* Media Upload

## Real-Time Features

* Real-Time Notifications
* Real-Time Messaging
* Online Status
* Typing Indicator

## Search

* Search Users
* Search Posts
* Search Hashtags

## Notifications

* Follow Notification
* Like Notification
* Comment Notification
* Message Notification

---

# 🏗 Frontend Architecture (Feature-Based)

```text
src
│
├── app
│   ├── store.ts
│   ├── router.tsx
│   └── providers
│
├── shared
│   ├── components
│   ├── hooks
│   ├── utils
│   ├── constants
│   ├── services
│   └── types
│
└── features
    ├── auth
    │   ├── api
    │   ├── components
    │   ├── hooks
    │   ├── pages
    │   ├── schemas
    │   └── types
    │
    ├── profile
    ├── posts
    ├── comments
    ├── notifications
    ├── messages
    ├── search
    └── settings
```

---

# 🏗 Backend Architecture (Layered)

```text
src
│
├── config
│   ├── database.js
│   ├── redis.js
│   └── cloudinary.js
│
├── modules
│   ├── auth
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── validation
│   │   ├── dto
│   │   ├── routes
│   │   └── model
│   │
│   ├── user
│   ├── post
│   ├── comment
│   ├── follow
│   ├── notification
│   └── message
│
├── middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── upload.middleware.js
│
├── sockets
│   └── socket.js
│
├── utils
│
├── app.js
└── server.js
```

---

# 🔄 Request Flow

```text
Client
   │
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database
```

---

# 🗄 Database Collections

```text
users
posts
comments
likes
follows
notifications
messages
conversations
refresh_tokens
```

---

# 📦 State Management

## Redux Slices

```text
authSlice
userSlice
postSlice
notificationSlice
messageSlice
```

## RTK Query APIs

```text
authApi
userApi
postApi
commentApi
notificationApi
messageApi
```

---

# 🔐 Authentication Strategy

## Access Token

* Expiry: 15 Minutes

## Refresh Token

* Expiry: 7 Days
* Stored in HTTP-Only Cookies

---

# ☁️ Cloudinary Structure

```text
avatars/
covers/
posts/
```

---

# ⚡ Socket.IO Events

```text
user-online
user-offline

send-message
receive-message

typing
stop-typing

notification
```

---

# 📈 Scalability Roadmap

## Phase 1

* MERN Stack
* Socket.IO

## Phase 2

* Redis Caching
* Rate Limiting

## Phase 3

* Microservices

## Phase 4

* Kubernetes
* AWS Deployment

---

# 🌐 API Endpoints

## Authentication

```http
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
```

## Users

```http
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
```

## Posts

```http
POST   /api/v1/posts
GET    /api/v1/posts
GET    /api/v1/posts/:id
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id

POST   /api/v1/posts/:id/like
POST   /api/v1/posts/:id/save
```

## Comments

```http
POST   /api/v1/comments
GET    /api/v1/comments/:postId
```

## Follow

```http
POST   /api/v1/follow/:id
DELETE /api/v1/follow/:id
```

## Notifications

```http
GET    /api/v1/notifications
```

## Messages

```http
GET    /api/v1/messages
POST   /api/v1/messages
```
