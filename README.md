# 🛕 DarshanEase — Temple Darshan Ticket Booking App

A full-stack MERN web application for booking temple darshan slots online.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Bootstrap, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (cloud) |
| Auth | JWT + bcryptjs |
| Deploy (Frontend) | Vercel |
| Deploy (Backend) | Render |
| Version Control | GitHub |

---

## 📁 Project Structure

```
darshanease/
├── server/
│   ├── config/db.js
│   ├── models/          # User, Temple, DarshanSlot, Booking, Donation
│   ├── routes/          # auth, temple, slot, booking, donation
│   ├── controllers/     # Business logic
│   ├── middleware/       # JWT auth, error handler
│   └── server.js        # Entry point
├── client/
│   └── src/
│       ├── pages/       # Home, Temples, TempleDetail, Login, Register, MyBookings, Donations, AdminDashboard
│       ├── components/  # Navbar
│       ├── context/     # AuthContext
│       └── services/    # api.js (Axios)
├── .env.example
├── vercel.json
├── render.yaml
└── README.md
```

---

## 🖥️ Local Development Setup

### Step 1 — Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/darshanease.git
cd darshanease
```

### Step 2 — Set up backend
```bash
# Install backend dependencies
npm install

# Copy .env and fill in your values
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/darshanease
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Step 3 — Set up frontend
```bash
cd client
npm install
cp .env.example .env
# Leave REACT_APP_API_URL empty — proxy in package.json handles it
```

### Step 4 — Run both servers

**Terminal 1 (backend):**
```bash
# In root folder
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 (frontend):**
```bash
cd client
npm start
# App runs on http://localhost:3000
```

---

## ☁️ STEP-BY-STEP DEPLOYMENT

---

### PART 1 — Push to GitHub

```bash
# 1. Create a new repo on github.com (name: darshanease)

# 2. In your project root:
git init
git add .
git commit -m "Initial commit: DarshanEase MERN app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/darshanease.git
git push -u origin main
```

---

### PART 2 — Set up MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a **free** account → Create a free cluster (M0)
3. Under **Database Access** → Add new user (username + password)
4. Under **Network Access** → Add IP Address → **Allow access from anywhere** (0.0.0.0/0)
5. Click **Connect** → **Connect your application** → Copy the URI
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/darshanease
   ```
6. Save this URI — you'll need it for Render.

---

### PART 3 — Deploy Backend on Render (Free)

1. Go to https://render.com → Sign up / Login
2. Click **New** → **Web Service**
3. Connect your **GitHub account** → Select `darshanease` repo
4. Fill in settings:
   - **Name:** `darshanease-api`
   - **Region:** Singapore (or nearest)
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/server.js`
5. Under **Environment Variables**, add:
   ```
   NODE_ENV = production
   MONGO_URI = mongodb+srv://...  (your Atlas URI)
   JWT_SECRET = any_long_random_string_here
   JWT_EXPIRE = 7d
   CLIENT_URL = https://your-app.vercel.app  (update after Vercel deploy)
   ```
6. Click **Create Web Service**
7. Wait ~3 minutes → Your API URL will be:
   ```
   https://darshanease-api.onrender.com
   ```
8. Test it: open `https://darshanease-api.onrender.com/api/health` — should return JSON ✅

---

### PART 4 — Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com → Sign up / Login with GitHub
2. Click **New Project** → Import `darshanease` repo
3. Configure project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Under **Environment Variables**, add:
   ```
   REACT_APP_API_URL = https://darshanease-api.onrender.com/api
   ```
5. Click **Deploy**
6. Your live URL will be: `https://darshanease.vercel.app`

---

### PART 5 — Update CORS on Render

After Vercel gives you a URL, go back to Render → your service → Environment → update:
```
CLIENT_URL = https://darshanease.vercel.app
```
Then click **Manual Deploy** → Redeploy.

---

## 🔑 API Endpoints Reference

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Private |

### Temples
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/temples` | Public |
| GET | `/api/temples/:id` | Public |
| POST | `/api/temples` | Admin |
| PUT | `/api/temples/:id` | Admin/Organizer |
| DELETE | `/api/temples/:id` | Admin |

### Slots
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/slots/temple/:templeId` | Public |
| POST | `/api/slots` | Admin/Organizer |
| PUT | `/api/slots/:id` | Admin/Organizer |
| DELETE | `/api/slots/:id` | Admin |

### Bookings
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/bookings` | User |
| GET | `/api/bookings/my` | User |
| PUT | `/api/bookings/:id/cancel` | User |
| GET | `/api/bookings` | Admin |

### Donations
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/donations` | User |
| GET | `/api/donations/my` | User |
| GET | `/api/donations` | Admin |

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| USER | Register, login, browse temples, book slots, cancel bookings, donate |
| ORGANIZER | USER + create/update slots for their temple |
| ADMIN | Full access — manage temples, all bookings, all donations |

---

## 🧪 Testing with Postman

1. Download Postman: https://www.postman.com
2. Create a new collection: **DarshanEase API**
3. Test flow:
   - POST `/api/auth/register` → copy the `token` from response
   - Set header: `Authorization: Bearer <token>`
   - GET `/api/temples` → browse temples
   - POST `/api/bookings` → create booking

---

## 📝 License

MIT — Built for educational purposes as a MERN stack assignment project.
