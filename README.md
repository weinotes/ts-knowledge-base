# TypeScript Full-Stack Knowledge Base

> A comprehensive learning platform for TypeScript full-stack development, covering Next.js, NestJS, React, Prisma, databases, and deployment.

[简体中文](README.zh-CN.md) | English

## Overview

This is a complete learning knowledge base for TypeScript full-stack development, designed for developers who want to master modern web development with TypeScript.

## Features

- **TypeScript Complete Guide** - Type system, generics, decorators, common errors
- **Next.js Complete Guide** - App Router, Server Components, API Routes, Middleware
- **NestJS Complete Guide** - Modular architecture, dependency injection, database integration
- **React Complete Guide** - Hooks, state management, performance optimization
- **Prisma Complete Guide** - Schema design, CRUD operations, relations, transactions
- **Database Guide** - PostgreSQL, MongoDB, Redis
- **Deployment Guide** - Docker, CI/CD, Nginx, Vercel
- **FAQ** - 100+ common questions with answers
- **Troubleshooting** - Build errors, runtime errors, performance issues
- **Learning Roadmap** - Complete path from beginner to expert

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Build Static Site

```bash
npm run build
```

Static files will be generated in the `out/` directory.

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect and deploy

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Option 3: Direct Upload

1. Run `npm run build`
2. Visit vercel.com
3. Drag and drop the `out/` directory

## Project Structure

```
ts-knowledge-base/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   └── docs/             # Documentation pages
│   │       ├── roadmap/
│   │       ├── typescript/
│   │       ├── nextjs/
│   │       ├── nestjs/
│   │       ├── react/
│   │       ├── prisma/
│   │       ├── database/
│   │       ├── deployment/
│   │       ├── faq/
│   │       └── troubleshooting/
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── lib/                   # Utilities
│       └── navigation.ts
├── public/                    # Static assets
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment config
└── package.json
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (via CSS variables)
- Static Export (deployable to any CDN)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache 2.0

---

Author: Davey Wong <wgwcko@gmail.com> (https://www.guangweiblog.com)
