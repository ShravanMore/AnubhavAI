# Anubhav AI 🏛️

An AI-powered platform for discovering, analyzing, and preserving cultural artifacts and heritage sites. Anubhav AI combines cutting-edge artificial intelligence with augmented reality to provide immersive experiences and insights into our cultural heritage.

![Anubhav AI Banner](https://png.pngtree.com/background/20250104/original/pngtree-artifacts-and-the-ruins-of-greece-picture-image_15514197.jpg)

## 🌟 Features

### 1. **Discover Artifacts**
- Upload images of artifacts for AI-powered identification
- Get detailed information about historical significance
- Learn about the cultural context and time period

### 2. **AR Experience**
- View 3D models of famous Indian heritage sites
- Interactive augmented reality experiences
- Explore monuments in their historical context

### 3. **Climate Impact Analysis**
- Analyze environmental effects on cultural heritage
- AI-generated predictions of climate change impact
- Visual representations of future deterioration

### 4. **Restoration Suggestions**
- AI-powered restoration recommendations
- Before and after comparisons
- Preservation techniques and guidelines

### 5. **Cultural Mapping**
- Interactive timeline of cultural evolution
- Geographic mapping of heritage sites
- Historical connections and influences

### 6. **Community Hub**
- Connect with heritage enthusiasts and experts
- Share discoveries and insights
- Collaborative preservation efforts

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Three.js / React Three Fiber** - 3D rendering for AR experiences
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Google Generative AI (Gemini)** - AI-powered artifact analysis
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/ShravanMore/AnubhavAI.git
cd AnubhavAI
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the backend server:
```bash
node serverfinal.js
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
AnubhavAI/
├── backend/
│   ├── serverfinal.js          # Main server file
│   ├── uploads/                # Uploaded artifact images
│   ├── outputs/                # Generated analysis outputs
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoutes.tsx
│   │   ├── contexts/           # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── DiscoverArtifact.tsx
│   │   │   ├── ARExperience.tsx
│   │   │   ├── ClimateImpact.tsx
│   │   │   ├── Restoration.tsx
│   │   │   ├── CulturalMapping.tsx
│   │   │   └── Community.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── models/             # 3D models for AR
│   └── package.json
└── README.md
```

## 🎯 Usage

1. **Sign Up/Login**: Create an account or login to access all features
2. **Upload Artifacts**: Navigate to "Discover Artifacts" and upload images
3. **Explore AR**: Visit "AR Experience" to view 3D models of heritage sites
4. **Analyze Climate Impact**: Check how climate change affects monuments
5. **View Restoration**: See AI-generated restoration suggestions
6. **Explore Maps**: Navigate through cultural timelines and geographic maps
7. **Join Community**: Connect with other heritage enthusiasts

## 🔑 API Keys Required

- **Google Gemini API**: For AI-powered artifact analysis and climate impact predictions
  - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🌐 Deployment

### Frontend (Netlify)
The frontend is configured for Netlify deployment with `_redirects` file for SPA routing.

### Backend
Can be deployed on platforms like:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

## 📚 Credits & References

### AI & APIs
- **Google Generative AI (Gemini)** - Artifact identification and analysis
  - [Google AI Documentation](https://ai.google.dev/)
- **OpenAI** - Additional AI capabilities (if used)

### 3D Models & Assets
- **Sketchfab** - 3D models of Indian heritage sites
- **Three.js** - 3D graphics library
  - [Three.js Documentation](https://threejs.org/)

### UI/UX Resources
- **Tailwind CSS** - Styling framework
  - [Tailwind Documentation](https://tailwindcss.com/)
- **Lucide Icons** - Icon library
  - [Lucide Icons](https://lucide.dev/)
- **PNGTree** - Background images and graphics
  - [PNGTree](https://pngtree.com/)

### Libraries & Frameworks
- **React** - [React Documentation](https://react.dev/)
- **Vite** - [Vite Documentation](https://vitejs.dev/)
- **Express.js** - [Express Documentation](https://expressjs.com/)
- **React Router** - [React Router Documentation](https://reactrouter.com/)

### Heritage & Cultural References
- Archaeological Survey of India (ASI)
- UNESCO World Heritage Sites
- Indian National Trust for Art and Cultural Heritage (INTACH)

### Inspiration & Research
- Digital preservation initiatives
- Cultural heritage conservation projects
- Climate change impact studies on monuments

## 👥 Contributors

- **Shravan More** - Project Lead & Developer
  - GitHub: [@ShravanMore](https://github.com/ShravanMore)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Email**: info@anubhavai.com
- **Phone**: +919876545678
- **GitHub**: [https://github.com/ShravanMore/AnubhavAI](https://github.com/ShravanMore/AnubhavAI)

## 🙏 Acknowledgments

Special thanks to:
- Google for providing the Gemini AI API
- The open-source community for amazing tools and libraries
- Cultural heritage organizations for inspiration and resources
- All contributors and supporters of this project

---

**Made with ❤️ for preserving our cultural heritage**

© 2026 Anubhav AI. All rights reserved.
