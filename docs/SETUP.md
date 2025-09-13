> *This document serves as a template for you to write **setup** instructions for your project.* 

> Depending on the scale/complexity of your project, it may prove beneficial to have a **Python/Batch/Bash** script in the `scripts/` directory which *automatically sets-up* the project.

# Project Setup Instructions

This guide will help you set up and run the AI Chatbot project locally on your machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js v18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download from git-scm.com](https://git-scm.com/)

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/intervaristy-hackathon-taste-25.git
cd intervaristy-hackathon-taste-25
```

### 2. Install Vercel CLI
```bash
npm install -g vercel
```

### 3. Link to Vercel Project
```bash
vercel link
```
- Choose "yes" when asked to set up the project
- Select the appropriate scope (your own project name)
- Link to the existing project when prompted

### 4. Pull Environment Variables
```bash
vercel env pull
```
This creates a `.env.local` file with all required environment variables.

### 5. Install Dependencies
```bash
# Option 1: Use npm (recommended for this project)
npm install --legacy-peer-deps

# Option 2: If you prefer pnpm
npm install -g pnpm
pnpm install
```

### 6. Start Development Server
```bash
# With npm
npm run dev

# With pnpm
pnpm dev
```

The application will be available at **http://localhost:3000**

---

## Troubleshooting

### Common Issues

#### 1. Dependency Resolution Errors
If you encounter ERESOLVE errors during `npm install`:
```bash
npm install --legacy-peer-deps
# or
npm install --force
```

#### 2. 'next' is not recognized
This happens when dependencies aren't installed properly. Try:
```bash
npm install --legacy-peer-deps
```

#### 3. Missing Environment Variables
If you get environment variable errors:
- Ensure you ran `vercel env pull`
- Check that `.env.local` file exists and contains required variables
- Alternatively, copy `.env.example` to `.env` and fill in the values

#### 4. Vercel Link Issues
If `vercel env pull` shows "not linked to project":
```bash
vercel link
```
Then try pulling environment variables again.

---

## Environment Variables

The project requires these environment variables:

| Variable | Purpose | Required |
|----------|---------|----------|
| `AUTH_SECRET` | Authentication secret | ✅ |
| `AI_GATEWAY_API_KEY` | AI service integration | ✅ |
| `BLOB_READ_WRITE_TOKEN` | File storage (Vercel Blob) | ✅ |
| `POSTGRES_URL` | Database connection | ✅ |
| `REDIS_URL` | Caching (optional) | ❌ |

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

---

## Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **Storage**: Vercel Blob
- **Authentication**: NextAuth.js
- **AI Integration**: Vercel AI SDK
- **Deployment**: Vercel

---

## Docker Alternative (Coming Soon)


---
