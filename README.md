# 🔬 SKINSTRIC

**AI-Powered Skin Analysis Platform**

A professional dermatology web application that uses artificial intelligence to analyze facial images and provide detailed demographic predictions including race, age, and gender with confidence percentages.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://skinstricapp.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

---

## 🌟 Features

### Core Functionality
- 📸 **Live Camera Capture** - Real-time facial image capture with browser camera API
- 🖼️ **Gallery Upload** - Upload existing photos for analysis
- 🤖 **AI Analysis** - Advanced facial recognition and demographic prediction
- 📊 **Interactive Visualizations** - Dynamic circular charts showing confidence percentages
- 📱 **Fully Responsive** - Seamless experience across mobile, tablet, and desktop
- ⚡ **Real-time Processing** - Instant image compression and API integration

### User Experience
- 🎨 **Custom Loading Animations** - Spinning diamond loaders during processing
- 🔄 **Smooth Transitions** - Polished page navigation and state changes
- ✅ **Permission Handling** - Clear camera permission prompts and flows
- 🎯 **Intuitive Navigation** - Simple, guided user journey from upload to results
- 💾 **Local Data Persistence** - Results saved for cross-page access

---

## 🚀 Live Demo

**Production URL:** [https://skinstricapp.vercel.app/](https://skinstricapp.vercel.app/)

### User Flow
1. **Landing Page** (`/`) - Introduction and call-to-action
2. **Onboarding** (`/introduce`) - Feature explanation and instructions
3. **Upload** (`/result`) - Camera or gallery image selection
4. **Analysis Selection** (`/select`) - Choose analysis categories
5. **Demographics** (`/summary`) - View detailed results with confidence scores

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern component-based architecture
- **Vite 7.1** - Lightning-fast build tool and dev server
- **React Router DOM 7** - Client-side routing and navigation
- **Tailwind CSS 3.4** - Utility-first CSS framework

### API & Backend
- **Google Cloud Functions** - Serverless API for AI processing
- **REST API** - JSON-based image upload and analysis
- **Base64 Encoding** - Secure image data transmission

### Deployment & Tools
- **Vercel** - Edge network deployment platform
- **Git/GitHub** - Version control and collaboration
- **ESLint** - Code quality and consistency

---

## 📂 Project Structure

skinstricapp/
│
├── public/
│ └── Image/ # SVG assets and graphics
│ ├── camera-left.svg
│ ├── gallery-right.svg
│ ├── diamond-large.svg
│ ├── diamond-medium.svg
│ └── diamond-small.svg
│
├── src/
│ ├── pages/
│ │ ├── Hero.jsx # Landing page
│ │ ├── Introduce.jsx # Onboarding
│ │ ├── Result.jsx # Upload page
│ │ ├── Select.jsx # Category selector
│ │ └── Demographics.jsx # Results display
│ │
│ ├── App.jsx # Main app with routing
│ └── main.jsx # Entry point
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md


---

## ⚡ Getting Started

### Prerequisites
- Node.js 16+ 
- npm 7+

### Installation

```bash
# Clone the repository
git clone https://github.com/jradame/skinstricapp.git
cd skinstricapp

# Install dependencies
npm install

# Start development server
npm run dev

Open http://localhost:5173

Available Scripts
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

🎨 Key Features
Camera & Upload
Browser camera API integration

Image compression (800px max, 70% quality)

Permission handling with custom popups

Fallback to gallery upload

AI Analysis
API Endpoint:
https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo

Request:

json
{
  "image": "base64_encoded_image"
}
Response:

json
{
  "success": true,
  "data": {
    "race": { "latinohispanic": 72, "white": 11, ... },
    "age": { "3-9": 86, "10-19": 4, ... },
    "sex": { "female": 52, "male": 47 }
  }
}
Custom Animations
Spinning diamonds in tailwind.config.js:

javascript
animation: {
  'spin-slow': 'spin 30s linear infinite',
  'spin-slower': 'spin 40s linear infinite',
  'spin-slowest': 'spin 50s linear infinite',
}
🚢 Deployment
Live on Vercel:
Auto-deploys from main branch
# Manual deploy
npm run build
vercel --prod
🤝 Contributing
Fork the repo

Create feature branch: git checkout -b feature/NewFeature

Commit changes: git commit -m 'Add NewFeature'

Push: git push origin feature/NewFeature

Open Pull Request

👤 Author
Justin Adame
Full-Stack Developer & UI/UX Designer

🌐 justinadame.com

💼 LinkedIn

🐙 @jradame

📍 Austin, Texas

🙏 Acknowledgments
AI powered by Google Cloud Functions

Design created in Figma

Deployed on Vercel

Built with ❤️ in Austin, Texas

Last Updated: February 2026


### 4. Save the file
`Cmd + S` (Mac) or `Ctrl + S` (Windows)

### 5. Deploy

```bash
git add README.md
git commit -m "Add comprehensive README documentation"
git push origin main
