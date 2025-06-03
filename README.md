
<h1 align="center">PostgreSQL Todo App (PERN Stack)</h1>

A full-stack todo application built with **PostgreSQL**, **Express**, **React**, and **Node.js**.

---

## 🚀 Deployment Instructions for Vercel

### 🔧 Backend Deployment

1. Create a PostgreSQL database using a service like **Supabase**, **Neon**, or any other PostgreSQL provider.

2. Update the `.env` file in the `server` directory:
   ```env
   DATABASE_URL=your_production_database_url
   ```

3. Deploy the server to **Vercel**:
   ```bash
   cd server
   npm install -g vercel
   vercel login
   vercel
   ```

4. When prompted during deployment, set the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string

5. After deployment, Vercel will provide a URL for your backend API (e.g., `https://your-app-name.vercel.app`).

---

### 🎨 Frontend Deployment

1. Update the `.env.production` file in the `client` directory:
   ```env
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

2. Deploy the client to Vercel:
   ```bash
   cd client
   vercel
   ```

3. Your frontend application will now be deployed and connected to your backend API.

---

## 💻 Local Development

### 🖥 Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your local database configuration.

4. Start the server:
   ```bash
   npm run server
   ```

---

### 🖼 Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🗃 Database Schema

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---
