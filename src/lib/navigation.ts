// 导航配置
export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: '快速导航',
    items: [
      { title: '首页', href: '/', icon: '🏠' },
      { title: '知识图谱', href: '/docs/roadmap', icon: '🗺️' },
    ]
  },
  {
    title: '前端框架',
    items: [
      { title: 'TypeScript', href: '/docs/typescript', icon: '📘', badge: '必学' },
      { title: 'React', href: '/docs/react', icon: '⚛️' },
      { title: 'Next.js', href: '/docs/nextjs', icon: '▲', badge: '核心' },
    ]
  },
  {
    title: '后端框架',
    items: [
      { title: 'NestJS', href: '/docs/nestjs', icon: '🪹', badge: '核心' },
      { title: 'Node.js', href: '/docs/nodejs', icon: '🟢' },
    ]
  },
  {
    title: '数据库 & ORM',
    items: [
      { title: 'Prisma', href: '/docs/prisma', icon: '🔷' },
      { title: 'PostgreSQL', href: '/docs/database', icon: '🐘' },
    ]
  },
  {
    title: '部署 & DevOps',
    items: [
      { title: 'Docker', href: '/docs/deployment', icon: '🐳' },
      { title: 'Vercel', href: '/docs/vercel', icon: '▲' },
    ]
  },
  {
    title: '常见问题',
    items: [
      { title: 'FAQ', href: '/docs/faq', icon: '❓', badge: '100+' },
      { title: '错误排查', href: '/docs/troubleshooting', icon: '🔧' },
    ]
  }
]

// 搜索索引
export interface SearchItem {
  title: string
  category: string
  href: string
  excerpt?: string
}

export const searchIndex: SearchItem[] = [
  // TypeScript
  { title: 'TypeScript 基础类型', category: 'TypeScript', href: '/docs/typescript/basics', excerpt: 'string, number, boolean, array, tuple, enum' },
  { title: 'TypeScript 接口与类型', category: 'TypeScript', href: '/docs/typescript/interfaces', excerpt: 'interface vs type, 泛型, 联合类型' },
  { title: 'TypeScript 装饰器', category: 'TypeScript', href: '/docs/typescript/decorators', excerpt: '@decorator, 类装饰器, 方法装饰器' },
  
  // React
  { title: 'React Hooks 指南', category: 'React', href: '/docs/react/hooks', excerpt: 'useState, useEffect, useContext, useReducer' },
  { title: 'React 状态管理', category: 'React', href: '/docs/react/state', excerpt: 'Zustand, Jotai, Redux Toolkit' },
  
  // Next.js
  { title: 'Next.js App Router', category: 'Next.js', href: '/docs/nextjs/app-router', excerpt: 'Server Components, Layout, Routing' },
  { title: 'Next.js 数据获取', category: 'Next.js', href: '/docs/nextjs/data-fetching', excerpt: 'fetch, caching, revalidation' },
  { title: 'Next.js API Routes', category: 'Next.js', href: '/docs/nextjs/api-routes', excerpt: 'REST API, Server Actions' },
  
  // NestJS
  { title: 'NestJS 核心概念', category: 'NestJS', href: '/docs/nestjs/overview', excerpt: 'Module, Controller, Provider, DI' },
  { title: 'NestJS 数据库集成', category: 'NestJS', href: '/docs/nestjs/database', excerpt: 'TypeORM, Prisma, Repository' },
  { title: 'NestJS 认证授权', category: 'NestJS', href: '/docs/nestjs/auth', excerpt: 'JWT, Passport, Guards' },
  
  // Prisma
  { title: 'Prisma 快速入门', category: 'Prisma', href: '/docs/prisma/getting-started', excerpt: 'schema, migrate, generate' },
  { title: 'Prisma 关联关系', category: 'Prisma', href: '/docs/prisma/relations', excerpt: 'One-to-One, One-to-Many, Many-to-Many' },
  
  // FAQ
  { title: 'TypeScript 类型错误', category: 'FAQ', href: '/docs/faq#typescript', excerpt: 'TS2307, TS2339, TS2741' },
  { title: 'Next.js 构建错误', category: 'FAQ', href: '/docs/faq#nextjs', excerpt: 'Module not found, Hydration' },
  { title: 'NestJS 依赖注入', category: 'FAQ', href: '/docs/faq#nestjs', excerpt: 'Cannot inject, Circular dependency' },
  { title: 'Prisma 查询问题', category: 'FAQ', href: '/docs/faq#prisma', excerpt: 'Not found, Unique constraint' },
]
