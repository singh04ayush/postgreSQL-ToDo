# PostgreSQL Todo App with Authentication (PERN Stack)

A full-stack todo application built with PostgreSQL, Express, React, and Node.js featuring user authentication and personalized task management.

## Deployment Instructions for Vercel

### Backend Deployment

1. Create a PostgreSQL database on a service like Supabase, Neon, or any other PostgreSQL provider.

2. Update the `.env` file in the server directory with your production database URL:
   ```
   DATABASE_URL=your_production_database_url
   NODE_ENV=production
   ```

3. Deploy the server to Vercel:
   ```bash
   cd server
   npm install -g vercel
   vercel login
   vercel
   ```

4. During deployment, Vercel will ask you to set environment variables. Make sure to set:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: Set to "production"
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `CORS_ORIGIN`: Your frontend application URL

5. After deployment, Vercel will provide you with a URL for your backend API (e.g., `https://your-app-name.vercel.app`).

### Frontend Deployment

1. Update the `.env.production` file in the client directory with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

2. Deploy the client to Vercel:
   ```bash
   cd client
   vercel
   ```

3. Your frontend application will now be deployed and connected to your backend API.

## Local Development

### Server Setup

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

### Client Setup

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

## Features

- User registration and login system
- JWT-based authentication
- Personalized todo lists for each user
- Modern UI with responsive design
- Social login placeholders (Google, Facebook)

## Database Schema

The application uses the following PostgreSQL tables:

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