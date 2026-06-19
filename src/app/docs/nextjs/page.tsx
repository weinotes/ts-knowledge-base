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
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>Next.js</span>
          </div>

          <h1>▲ Next.js 完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            React 全栈框架 - 服务端渲染、静态站点生成、API Routes
          </p>

          {/* App Router */}
          <div className="content-card">
            <h2>App Router (Next.js 13+)</h2>

            <p>App Router 是 Next.js 13 引入的新路由系统，使用 React Server Components</p>

            <h3>目录结构</h3>
            <pre><code>{`app/
├── layout.tsx          # 根布局
├── page.tsx            # 首页 /
├── about/
│   └── page.tsx        # /about
├── posts/
│   ├── page.tsx        # /posts
│   └── [id]/
│       └── page.tsx    # /posts/1
├── api/
│   └── users/
│       └── route.ts    # /api/users
├── loading.tsx         # 加载状态
├── error.tsx           # 错误边界
├── not-found.tsx       # 404 页面
└── globals.css`}</code></pre>

            <h3>Layout</h3>
            <pre><code>{`// app/layout.tsx - 根布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <nav>导航栏</nav>
        {children}
        <footer>页脚</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx - 嵌套布局
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside>侧边栏</aside>
      <main>{children}</main>
    </div>
  );
}`}</code></pre>

            <h3>Page</h3>
            <pre><code>{`// app/page.tsx - 首页
export default function HomePage() {
  return (
    <main>
      <h1>欢迎来到我的网站</h1>
    </main>
  );
}

// app/posts/[id]/page.tsx - 动态页面
import { useParams } from 'next/navigation';

export default function PostPage() {
  const params = useParams();
  const { id } = params;
  
  return <h1>文章 ID: {id}</h1>;
}`}</code></pre>

            <h3>服务端组件 vs 客户端组件</h3>
            <pre><code>{`// 默认是服务端组件 - 可以直接访问数据库
export default async function ServerComponent() {
  // 直接在服务端获取数据
  const data = await db.getData();
  
  return <div>{data}</div>;
}

// 添加 "use client" 变成客户端组件
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      点击次数: {count}
    </button>
  );
}`}</code></pre>
          </div>

          {/* Data Fetching */}
          <div className="content-card">
            <h2>数据获取</h2>

            <h3>基础数据获取</h3>
            <pre><code>{`// app/posts/page.tsx
async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</code></pre>

            <h3>数据缓存策略</h3>
            <pre><code>{`// 默认缓存 - 缓存请求结果
fetch(url);

// 重新验证 - ISR 增量静态再生
fetch(url, { next: { revalidate: 3600 } });  // 1小时后重新验证

// 动态 - 每次请求都获取新数据
fetch(url, { cache: "no-store" });

// 静态生成
export const dynamic = "force-static";`}</code></pre>

            <h3>并行数据获取</h3>
            <pre><code>{`export default async function Page({ params }: { params: { id: string } }) {
  // 并行请求
  const [product, reviews] = await Promise.all([
    fetch(\`/api/products/\${params.id}\`).then(r => r.json()),
    fetch(\`/api/products/\${params.id}/reviews\`).then(r => r.json()),
  ]);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <Reviews reviews={reviews} />
    </div>
  );
}`}</code></pre>
          </div>

          {/* API Routes */}
          <div className="content-card">
            <h2>API Routes</h2>

            <h3>基础 API</h3>
            <pre><code>{`// app/api/users/route.ts
import { NextResponse } from "next/server";

// GET 请求
export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

// POST 请求
export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`}</code></pre>

            <h3>动态路由 API</h3>
            <pre><code>{`// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  });
  
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await db.user.update({
    where: { id: params.id },
    data: body
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}`}</code></pre>
          </div>

          {/* Server Actions */}
          <div className="content-card">
            <h2>Server Actions</h2>

            <p>Server Actions 允许在服务端直接处理表单提交和数据变更</p>

            <pre><code>{`// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  
  // 在服务端处理数据
  const post = await db.post.create({
    data: { title, content }
  });
  
  // 重新验证页面缓存
  revalidatePath("/posts");
  
  return post;
}

// app/posts/new/page.tsx
"use client";

import { createPost } from "@/app/actions";

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="标题" />
      <textarea name="content" placeholder="内容" />
      <button type="submit">发布</button>
    </form>
  );
}`}</code></pre>
          </div>

          {/* Middleware */}
          <div className="content-card">
            <h2>中间件 (Middleware)</h2>

            <pre><code>{`// middleware.ts - 在项目根目录
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 获取请求路径
  const path = request.nextUrl.pathname;
  
  // 公开路径
  const publicPaths = ["/", "/login", "/register"];
  
  // 检查是否已登录
  const token = request.cookies.get("token");
  
  // 需要认证的路径
  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // 继续处理请求
  return NextResponse.next();
}

// 配置匹配路径
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};`}</code></pre>
          </div>

          {/* Common Problems */}
          <div className="content-card">
            <h2>常见问题与解决方案</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Hydration Failed: HTML mismatch</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>服务端渲染的 HTML 与客户端不匹配，常见于日期、随机数等动态内容</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 使用 useEffect 在客户端渲染动态内容
"use client";
import { useState, useEffect } from "react";

export function DateDisplay() {
  const [date, setDate] = useState(null);
  
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);
  
  return <span>{date || "加载中..."}</span>;
}

# 2. 使用 suppressHydrationWarning
<span suppressHydrationWarning>{new Date().toLocaleDateString()}</span>

# 3. 动态导入（禁用 SSR）
import dynamic from "next/dynamic";

const DateComponent = dynamic(
  () => import("@/components/Date"),
  { ssr: false }
);`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Module not found: 'xxx'</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>模块解析失败，可能是路径别名配置问题</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 检查 tsconfig.json 配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 检查文件路径是否正确
import { utils } from "@/lib/utils";  // 正确
import { utils } from "~/lib/utils";   // 可能出错

# 重启开发服务器
rm -rf .next
npm run dev`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Image not loading</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>Next.js Image 组件对外部图片有安全限制</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 在 next.config.js 配置允许的域名
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/images/**",
      },
    ],
  },
};

# 2. 使用普通 img 标签（不需要优化时）
<img src="https://example.com/image.jpg" alt="图片" />

# 3. 将图片放在 public 目录
# public/images/logo.png
<img src="/images/logo.png" alt="Logo" />`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/typescript">← TypeScript</Link>
            <Link href="/docs/nestjs">NestJS →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
