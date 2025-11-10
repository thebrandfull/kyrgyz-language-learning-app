# 🇰🇬 Kyrgyz Language Learning App

A beautiful, modern, and engaging language learning application for Kyrgyz, built with cutting-edge technologies to rival Duolingo in both aesthetics and functionality.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3-blue.svg)

## ✨ Features

### 🎮 Gamification
- **XP System**: Earn experience points for completing lessons
- **Streak Tracking**: Maintain daily learning streaks with visual indicators
- **Level Progression**: Level up as you gain more XP
- **Achievements**: Unlock badges and achievements for milestones
- **Leaderboards**: Compete with other learners (coming soon)

### 📚 Learning Features
- **Structured Lessons**: Progressive learning path from beginner to advanced
- **Multiple Exercise Types**:
  - Multiple Choice Questions
  - Translation Exercises
  - Listening Comprehension
  - Speaking Practice (with AI evaluation)
  - Fill in the Blanks
  - Matching Exercises
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Progress Tracking**: Detailed statistics and progress visualization

### 🤖 AI-Powered Features
- **Text-to-Speech**: Natural Kyrgyz pronunciation using ElevenLabs
- **AI Conversations**: Practice real conversations with Deepseek AI
- **Smart Feedback**: Get personalized feedback on your learning

### 🎨 Design Highlights
- **Modern UI**: Clean, intuitive interface with gradient backgrounds
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Themes**: (Coming soon)

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Zustand
- **Backend**: Supabase (Auth + Database)
- **AI Services**:
  - ElevenLabs for Text-to-Speech
  - Deepseek for AI Conversations
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (for auth and database)
- ElevenLabs API key (for text-to-speech)
- Deepseek API key (for AI features)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kyrgyz-language-learning-app.git
   cd kyrgyz-language-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Fill in your API keys:
   ```env
   # Supabase
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

   # ElevenLabs
   VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key

   # Deepseek
   VITE_DEEPSEEK_API_KEY=your-deepseek-api-key
   VITE_DEEPSEEK_API_URL=https://api.deepseek.com/v1
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, Layout)
│   ├── exercises/      # Exercise type components
│   ├── gamification/   # XP, streaks, achievements
│   └── lessons/        # Lesson-specific components
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LearnPage.tsx
│   ├── LessonPage.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
├── store/              # Zustand stores
│   ├── authStore.ts
│   ├── progressStore.ts
│   └── lessonStore.ts
├── services/           # API services
│   ├── elevenLabsService.ts
│   └── deepseekService.ts
├── lib/                # Utility functions
├── types/              # TypeScript types
├── config/             # Configuration files
└── assets/             # Static assets
```

## 🎯 Key Components

### Authentication
- Mock authentication with localStorage (for demo)
- Ready for Supabase integration
- Protected routes with automatic redirects

### Exercise System
Each exercise type is a standalone component with:
- Audio playback support
- Instant feedback
- XP rewards
- Progress tracking
- Beautiful animations

### Gamification
- **XP Bar**: Visual level progression
- **Streak Display**: Fire emoji indicators for daily streaks
- **Achievement Cards**: Unlockable badges
- **Progress Tracking**: Detailed statistics

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication (Email/Password)
3. Create the following tables:
   - `users`
   - `user_progress`
   - `lessons`
   - `exercises`
   - `achievements`

(SQL schema coming soon in `/database/schema.sql`)

### ElevenLabs Setup
1. Sign up at [ElevenLabs](https://elevenlabs.io)
2. Get your API key
3. Choose a voice for Kyrgyz pronunciation

### Deepseek Setup
1. Sign up at [Deepseek](https://www.deepseek.com)
2. Get your API key
3. Configure the API URL

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: { ... },
  success: { ... },
  warning: { ... },
  danger: { ... },
}
```

### Fonts
The app uses Google Fonts (Inter and Poppins). Change them in `src/index.css`.

## 📱 Screenshots

(Add screenshots here once the app is deployed)

## 🚧 Roadmap

- [ ] Complete all exercise types
- [ ] Add speaking evaluation
- [ ] Implement leaderboards
- [ ] Add social features
- [ ] Create mobile apps (React Native)
- [ ] Add more languages
- [ ] Offline mode
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Duolingo's gamification approach
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)

## 📞 Support

For support, email support@example.com or join our Discord community.

---

Made with ❤️ for the Kyrgyz language learning community
