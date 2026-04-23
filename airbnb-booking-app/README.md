# 🏠 Airbnb Booking App

A full-stack **Airbnb clone** built with **React** and **Node.js/Express**, featuring property listings, bookings, user authentication, cloud-based image uploads via **Cloudinary**, and search functionality.

---

## ✨ Features

- **User Authentication** — Register, login & logout with JWT-based session management
- **Property Listings** — Create, view, and manage your own property listings
- **Booking System** — Book places with check-in/check-out dates, guest count & pricing
- **Cloud Image Uploads** — Upload property photos to **Cloudinary** (file upload or external URL)
- **Search & Filter** — Search for places with filters
- **User Profile** — Edit profile details from the account page
- **My Places** — Dashboard to manage your listed properties
- **My Bookings** — View and cancel your bookings
- **Responsive UI** — Tailwind CSS powered responsive design
- **Toast Notifications** — Real-time feedback with React Toastify
- **Loading Shimmer** — Skeleton loading states for better UX

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS 3 | Utility-first styling |
| Vite 6 | Build tool & dev server |
| React Toastify | Toast notifications |
| date-fns | Date formatting & utilities |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express 4 | Web framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens | Authentication |
| bcrypt | Password hashing |
| Cloudinary | Cloud image storage & CDN |
| Multer | Multipart file upload parsing |
| Joi | Request validation |
| cookie-parser | Cookie handling |
| CORS | Cross-origin requests |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
airbnb-booking-app/
├── Backend/
│   ├── src/
│   │   ├── app.js                     # Express server entry point
│   │   ├── config/
│   │   │   └── cloudinary.js          # Cloudinary SDK configuration
│   │   ├── controllers/
│   │   │   ├── user.controller.js     # Auth & profile logic
│   │   │   ├── place.controller.js    # Place CRUD operations
│   │   │   └── booking.controller.js  # Booking management
│   │   ├── models/
│   │   │   ├── user.model.js          # User schema & JWT method
│   │   │   ├── place.model.js         # Place schema
│   │   │   └── booking.model.js       # Booking schema
│   │   ├── routes/
│   │   │   ├── user.routes.js         # /api/user/*
│   │   │   ├── place.route.js         # /api/places/*
│   │   │   └── booking.route.js       # /api/bookings/*
│   │   ├── middlewares/
│   │   │   └── userAuth.js            # JWT auth middleware
│   │   ├── validators/
│   │   │   ├── user.validation.js
│   │   │   ├── place.validation.js
│   │   │   └── booking.validation.js
│   │   └── db/
│   │       └── db.js                  # MongoDB connection
│   ├── .env
│   ├── package.json
│   └── .gitignore
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                    # Root component
│   │   ├── main.jsx                   # React entry point
│   │   ├── pages/
│   │   │   ├── IndexPage.jsx          # Home / listings page
│   │   │   ├── LoginPage.jsx          # Login form
│   │   │   ├── RegisterPage.jsx       # Registration form
│   │   │   ├── AccountPage.jsx        # User profile page
│   │   │   ├── PlacePage.jsx          # Single place details
│   │   │   └── SearchPage.jsx         # Search results
│   │   ├── components/
│   │   │   ├── Header.jsx             # Navigation bar
│   │   │   ├── BookingWidget.jsx      # Booking form widget
│   │   │   ├── Bookings.jsx           # My bookings list
│   │   │   ├── Places.jsx             # My places manager
│   │   │   ├── PlacesForm.jsx         # Add/edit place form
│   │   │   ├── PlaceCards.jsx         # Place card component
│   │   │   ├── Perks.jsx              # Amenity/perk selectors
│   │   │   ├── AccountNav.jsx         # Account tab navigation
│   │   │   └── IndexCardShimmer.jsx   # Loading skeleton
│   │   ├── context/
│   │   │   └── user.context.jsx       # User auth context
│   │   └── routes/
│   │       └── routes.jsx             # React Router config
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account ([sign up free](https://cloudinary.com/users/register_free))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd airbnb-booking-app
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=8000
DB_URL=mongodb://localhost:27017/airbnb-booking-app
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:8000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📡 API Reference

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login with email & password |
| `POST` | `/logout` | ❌ | Logout (clear cookie) |
| `GET` | `/checkAuth` | ✅ | Verify authentication status |
| `POST` | `/edit` | ✅ | Update user profile |

### Place Routes — `/api/places`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/upload-image-by-link` | ✅ | Upload image from external URL to Cloudinary |
| `POST` | `/upload-photos` | ✅ | Upload photos to Cloudinary (up to 15) |
| `POST` | `/new` | ✅ | Create a new place listing |
| `GET` | `/my-places` | ✅ | Get all places owned by user |
| `GET` | `/all` | ✅ | Get all available places |
| `POST` | `/s` | ✅ | Search/filter places |
| `GET` | `/:placeId` | ✅ | Get a specific place by ID |

### Booking Routes — `/api/bookings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/new` | ✅ | Create a new booking |
| `GET` | `/me` | ✅ | Get all bookings for current user |
| `POST` | `/cancel` | ✅ | Cancel a booking |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend server port | `8000` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017/airbnb-booking-app` |
| `JWT_SECRET_KEY` | Secret for signing JWT tokens | `my_super_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiration duration | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |

---

## 📜 Available Scripts

### Backend (`/Backend`)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm start` | Start production server |

### Frontend (`/Frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.
