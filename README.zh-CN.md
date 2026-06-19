# TypeScript 全栈知识库

> TypeScript 全栈开发学习平台，涵盖 Next.js、NestJS、React、Prisma、数据库和部署。

中文 | [English](README.md)

## 概述

这是一个完整的 TypeScript 全栈开发学习知识库，专为想要掌握现代 TypeScript Web 开发的开发者设计。

## 功能特性

- **TypeScript 完全指南** - 类型系统、泛型、装饰器、常见错误
- **Next.js 完全指南** - App Router、Server Components、API Routes、Middleware
- **NestJS 完全指南** - 模块化架构、依赖注入、数据库集成
- **React 完全指南** - Hooks、状态管理、性能优化
- **Prisma 完全指南** - Schema 设计、CRUD 操作、关联关系、事务
- **数据库指南** - PostgreSQL、MongoDB、Redis
- **部署指南** - Docker、CI/CD、Nginx、Vercel
- **常见问题 FAQ** - 100+ 常见问题解答
- **错误排查** - 构建错误、运行时错误、性能问题
- **学习路线图** - 从零到专家的完整路径规划

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建静态网站

```bash
npm run build
```

静态文件会生成在 `out/` 目录。

## 部署到 Vercel

### 方式一：GitHub 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入你的仓库
5. Vercel 会自动检测并部署

### 方式二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 预览部署
vercel

# 生产部署
vercel --prod
```

### 方式三：直接上传

1. 运行 `npm run build`
2. 访问 vercel.com
3. 拖拽 `out/` 目录到页面

## 项目结构

```
ts-knowledge-base/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   └── docs/             # 文档页面
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
│   ├── components/            # React 组件
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── lib/                   # 工具函数
│       └── navigation.ts
├── public/                    # 静态资源
├── next.config.js            # Next.js 配置
├── tsconfig.json             # TypeScript 配置
├── vercel.json               # Vercel 部署配置
└── package.json
```

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (通过 CSS 变量)
- 静态导出（可部署到任何 CDN）

## 贡献指南

欢迎贡献！请随时提交 Pull Request。

## 开源协议

Apache 2.0

---

作者：Davey Wong <wgwcko@gmail.com> (https://www.guangweiblog.com)
