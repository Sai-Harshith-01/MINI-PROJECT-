# TechOrbit Frontend

Modern React application for the TechOrbit Hackathon Management System.

## 🎨 Features

- 🎯 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🌓 **Dark Mode Ready** - Glassmorphism and modern aesthetics
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🤖 **AI Chatbot** - Orbiton assistant for user help
- 🔔 **Real-time Notifications** - Instant updates for users
- 🎭 **Role-based Views** - Different interfaces for students, colleges, and admins

## 📁 Folder Structure

```
frontend/
├── public/                        # Static assets
│   └── (images, icons, etc.)
│
├── src/
│   ├── components/                # Reusable React components
│   │   ├── ArticleCard.jsx        # Article display card
│   │   ├── Chatbot.jsx            # Orbiton AI chatbot
│   │   ├── HackathonCard.jsx      # Hackathon display card
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── NewsCard.jsx           # News article card
│   │   ├── NotificationBell.jsx   # Notification dropdown
│   │   ├── ProtectedRoute.jsx     # Route authentication guard
│   │   └── StatsCard.jsx          # Statistics display card
│   │
│   ├── pages/                     # Page components
│   │   ├── AdminDashboard.jsx     # Admin control panel
│   │   ├── ApproveColleges.jsx    # College approval interface
│   │   ├── CollegeDashboard.jsx   # College management dashboard
│   │   ├── CreateHackathon.jsx    # Hackathon creation form
│   │   ├── Hackathons.jsx         # Hackathon listing page
│   │   ├── Login.jsx              # Login page
│   │   ├── PostArticle.jsx        # Article creation form
│   │   ├── Register.jsx           # College registration
│   │   └── StudentDashboard.jsx   # Student home/discover page
│   │
│   ├── services/                  # API integration layer
│   │   ├── adminService.js        # Admin API calls
│   │   ├── api.js                 # Axios instance & interceptors
│   │   ├── articleService.js      # Article API calls
│   │   ├── authService.js         # Authentication API calls
│   │   ├── hackathonService.js    # Hackathon API calls
│   │   ├── newsService.js         # News/RSS API calls
│   │   └── notificationService.js # Notification API calls
│   │
│   ├── App.jsx                    # Main app component & routing
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles & Tailwind
│
├── index.html                     # HTML template
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 User Roles & Routes

### Public Routes
- `/` - Student Dashboard (Discover Hackathons)
- `/login` - Login page
- `/register` - College registration

### College Routes (Protected)
- `/college/dashboard` - College dashboard with stats
- `/college/create-hackathon` - Create new hackathon
- `/college/hackathons/:id/participants` - View registrations

### Admin Routes (Protected)
- `/admin/dashboard` - Admin control panel
- `/admin/approve-colleges` - Approve pending colleges
- `/admin/post-article` - Post news articles

## 🎨 Design System

### Color Palette
- **Primary**: Modern gradients and vibrant colors
- **Background**: Clean whites with subtle grays
- **Accents**: Dynamic hover effects and transitions

### Typography
- **Font Family**: System fonts with fallbacks
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible text

### Components
- **Cards**: Glassmorphism effects with shadows
- **Buttons**: Smooth transitions and hover states
- **Forms**: Clean inputs with validation feedback
- **Modals**: Centered overlays with backdrop

## 🔧 Configuration

### API Base URL

Update in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Tailwind Configuration

Customize in `tailwind.config.js`:
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Your custom theme
    },
  },
}
```

## 📦 Key Dependencies

### Core
- **React** (18.x) - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### API & State
- **Axios** - HTTP client
- **React Hooks** - State management

### Utilities
- **date-fns** or **moment** - Date formatting (if used)
- **react-icons** - Icon library (if used)

## 🧩 Component Usage

### HackathonCard
```jsx
import HackathonCard from './components/HackathonCard';

<HackathonCard 
  hackathon={hackathonData}
  onRegister={handleRegister}
/>
```

### Chatbot
```jsx
import Chatbot from './components/Chatbot';

<Chatbot />  // Automatically appears as floating button
```

### NotificationBell
```jsx
import NotificationBell from './components/NotificationBell';

<NotificationBell />  // Shows in navbar
```

## 🔐 Authentication

### Login Flow
1. User enters credentials
2. `authService.login()` sends request to backend
3. JWT token stored in `localStorage`
4. Token included in subsequent API requests via Axios interceptor
5. `ProtectedRoute` guards authenticated routes

### Logout
```javascript
localStorage.removeItem('token');
localStorage.removeItem('userRole');
navigate('/login');
```

## 🎭 Role-Based Rendering

```jsx
const userRole = localStorage.getItem('userRole');

{userRole === 'admin' && <AdminPanel />}
{userRole === 'college' && <CollegePanel />}
{userRole === 'student' && <StudentPanel />}
```

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

## 🤖 Orbiton Chatbot

The AI assistant helps users with:
- Navigation guidance
- Feature explanations
- FAQ responses
- Creator information

Customize responses in `src/components/Chatbot.jsx`

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS is configured for `http://localhost:5173`
- Check `FRONTEND_URL` in backend `.env`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Failed
- Verify backend is running on port 5000
- Check `API_BASE_URL` in `src/services/api.js`
- Inspect browser console for errors

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables
Set `VITE_API_URL` for production API endpoint.

## 🎯 Best Practices

- ✅ Use functional components with hooks
- ✅ Keep components small and focused
- ✅ Extract reusable logic into custom hooks
- ✅ Use proper prop validation
- ✅ Handle loading and error states
- ✅ Implement proper error boundaries
- ✅ Optimize images and assets
- ✅ Use lazy loading for routes

## 📄 License

MIT License

## 👥 Authors

- Sai Harshith
- Siddharth

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility framework
- Vite for blazing fast development experience
