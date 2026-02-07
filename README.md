# Startup Benefits & Deals Platform

**🚀 [Live Demo](https://startup-benefits-platform-project.vercel.app)**

A premium full-stack MERN application connecting early-stage startups with exclusive deals on SaaS tools and services.

## 🚀 Features

- **User Authentication**: Secure JWT-based Login & Signup.
- **Role-Based Access**: Specialized Admin Dashboard for managing deals.
- **Deals Dashboard**: Filterable and searchable grid of startup benefits.
- **Deal Details**: Comprehensive view of each offer with redemption steps.
- **Responsive Design**: Mobile-first, glassmorphism-inspired UI using Tailwind CSS.
- **Animations**: Smooth transitions powered by Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling & Design System)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **Node.js & Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **Bcrypt.js** (Password Hashing)
- **JSON Web Token** (Authentication)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### 1. Clone the repository
```bash
git clone <repository_url>
cd <folder_name>
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/startup-benefits
JWT_SECRET=your_super_secret_key
```
**Seed the Database (Optional):**
```bash
node seeder.js
```
*Creates Admin user: `admin@example.com` / `password123`*

Start the Server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
# Application running on http://localhost:5173
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user & get token
- `GET /api/auth/me` - Get current user profile (Protected)

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get single deal
- `POST /api/deals` - Create a deal (Admin only)
- `PUT /api/deals/:id` - Update a deal (Admin only)
- `DELETE /api/deals/:id` - Delete a deal (Admin only)

## 🎨 UI/UX Highlights
- **Glassmorphism Cards**: Modern, translucent card designs.
- **Interactive States**: Hover scales, button glowing effects.
- **Dark Mode**: Default sleek dark theme optimized for developers.

## 🚀 24/7 Deployment (Free)

To keep this project live 24/7 without the server sleeping, follow these steps:

### 1. Backend (Koyeb)
- **Platform**: [Koyeb](https://www.koyeb.com/)
- **Setup**:
  - Connect GitHub.
  - Work Directory: `server`
  - Build Command: `npm install`
  - Run Command: `node index.js`
  - **Env Vars**:
    - `PORT`: `8000`
    - `MONGO_URI`: Your MongoDB Atlas URI
    - `JWT_SECRET`: Your secret key

### 2. Frontend (Vercel)
- **Platform**: [Vercel](https://vercel.com/)
- **Setup**:
  - Connect GitHub.
  - Root Directory: `client`
  - **Env Vars**:
    - `VITE_API_URL`: Your Koyeb Backend URL (e.g., `https://my-app.koyeb.app`)
