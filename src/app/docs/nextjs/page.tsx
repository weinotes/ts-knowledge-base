import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function NextJSPage() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <h1>Next.js 完全指南</h1>
          <p className="lead">Next.js 14 App Router 深度指南</p>

          <div className="table-of-contents">
            <h2>目录</h2>
            <ul>
              <li><a href="#introduction">第一章：Next.js 简介</a></li>
              <li><a href="#app-router">第二章：App Router 核心</a></li>
              <li><a href="#server-components">第三章：Server Components</a></li>
              <li><a href="#client-components">第四章：Client Components</a></li>
              <li><a href="#routing">第五章：路由系统</a></li>
              <li><a href="#data-fetching">第六章：数据获取</a></li>
              <li><a href="#styling">第七章：样式方案</a></li>
              <li><a href="#api-routes">第八章：API Routes</a></li>
              <li><a href="#middleware">第九章：中间件</a></li>
              <li><a href="#authentication">第十章：认证授权</a></li>
              <li><a href="#optimization">第十一章：性能优化</a></li>
              <li><a href="#deployment">第十二章：部署</a></li>
            </ul>
          </div>

          <section id="introduction">
            <h2>第一章：Next.js 简介</h2>
            
            <h3>1.1 什么是 Next.js</h3>
            <p>Next.js 是一个基于 React 的全栈框架，用于构建 SSR、SSG、ISR 等多种渲染模式的 Web 应用。</p>
            
            <pre><code>{`# Next.js 核心特性
- App Router（新一代路由系统）
- Server Components（服务端组件）
- Server Actions（服务端动作）
- 静态站点生成 (SSG)
- 增量静态再生成 (ISR)
- API Routes（API 路由）
- 自动图片优化
- 自动字体优化
- 内置 CSS 支持
- TypeScript 优先`}</code></pre>

            <h3>1.2 创建项目</h3>
            <pre><code>{`# 使用 create-next-app
npx create-next-app@latest my-app

# 选项
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: Yes
# - Import alias: @/*

# 项目结构
my-app/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
├── public/
├── next.config.js
├── tsconfig.json
└── package.json`}</code></pre>
          </section>

          <section id="app-router">
            <h2>第二章：App Router 核心</h2>

            <h3>2.1 布局（Layouts）</h3>
            <pre><code>{`// app/layout.tsx - 根布局
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '我的应用',
  description: '应用描述',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}`}</code></pre>

            <h3>2.2 页面（Pages）</h3>
            <pre><code>{`// app/page.tsx - 首页
export default function HomePage() {
  return (
    <main>
      <h1>欢迎来到首页</h1>
    </main>
  )
}

// app/about/page.tsx - 关于页面
export default function AboutPage() {
  return (
    <main>
      <h1>关于我们</h1>
    </main>
  )
}`}</code></pre>
          </section>

          <section id="server-components">
            <h2>第三章：Server Components</h2>

            <h3>3.1 服务端组件基础</h3>
            <pre><code>{`// app/page.tsx - 默认是服务端组件
import { db } from '@/lib/db'

export default async function Page() {
  // 直接数据库查询
  const posts = await db.post.findMany({
    where: { published: true },
  })

  return (
    <main>
      <h1>最新文章</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  )
}`}</code></pre>
          </section>

          <div className="navigation">
            <Link href="/docs/typescript" className="nav-link">← TypeScript 完全指南</Link>
            <Link href="/docs/nestjs" className="nav-link">NestJS 完全指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
