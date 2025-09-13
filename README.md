# Resume Builder Pro

A modern, responsive resume builder built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design
- 📝 **Resume Builder** - Step-by-step resume creation
- 📄 **Multiple Templates** - Professional resume templates
- 💾 **Local Storage** - Data persists in browser
- 🔐 **Mock Authentication** - Demo user system
- 📱 **Mobile Responsive** - Works on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit `http://localhost:3000`

## Usage

### Demo Login
- Click "Sign In" or "Get Started" to login with demo credentials
- Demo user: John Doe (Software Engineer)

### Building Resumes
1. Go to **Dashboard** after logging in
2. Click **"Build Resume"** to start creating
3. Fill in your information across different tabs:
   - Personal Information
   - Work Experience
   - Skills
   - Portfolio Projects
4. Use **"Preview Resume"** to see the final result
5. **Export as PDF** or generate share links

### Features Available
- **Home Page** - Landing page with features
- **Templates** - Browse resume templates
- **Pricing** - Subscription plans
- **Dashboard** - Manage your resume data
- **Profile** - User profile management

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **UI Components**: Radix UI
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication system
│   ├── layout/         # Header, Footer
│   ├── pages/          # Page components
│   └── ui/             # Reusable UI components
├── entities/           # Type definitions
├── services/           # Data services
└── styles/             # Global styles
```

## Development

- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Data Storage

The app uses browser localStorage to persist data:
- User authentication state
- Resume data (portfolio, skills, work experience)
- All data is stored locally in your browser

## License

This project is for demonstration purposes.
