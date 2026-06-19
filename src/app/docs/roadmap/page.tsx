import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Roadmap() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>学习路线图</span>
          </div>

          <h1>🗺️ TypeScript 全栈学习路线图</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            从零基础到高级工程师的完整学习路径
          </p>

          {/* Phase 1 */}
          <div className="content-card" style={{borderLeft: '4px solid #6366f1'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <span style={{fontSize: '2em'}}>第一阶段</span>
              <span className="tag tag-primary">基础 (2-3周)</span>
            </div>
            <h2 style={{border: 'none', margin: '0 0 16px', fontSize: '1.5em'}}>JavaScript & TypeScript 基础</h2>
            
            <h3>学习内容</h3>
            <ul>
              <li>JavaScript ES6+ 语法（let/const, arrow functions, destructuring, spread operator）</li>
              <li>TypeScript 类型系统（基础类型、接口、泛型、联合类型、交叉类型）</li>
              <li>TypeScript 高级类型（条件类型、映射类型、模板字面量类型）</li>
              <li>TypeScript 配置（tsconfig.json, strict mode）</li>
            </ul>

            <h3>推荐资源</h3>
            <div className="card-grid">
              <div className="card">
                <h4>📘 TypeScript 官方文档</h4>
                <p>typescriptlang.org/docs/</p>
                <Link href="/docs/typescript" className="card-link">开始学习</Link>
              </div>
              <div className="card">
                <h4>🎬 TypeScript 教程</h4>
                <p>视频教程 + 实战练习</p>
                <span className="tag tag-success">推荐</span>
              </div>
            </div>

            <h3>实战项目</h3>
            <p>使用 TypeScript 重构一个纯 JavaScript 项目</p>
          </div>

          {/* Phase 2 */}
          <div className="content-card" style={{borderLeft: '4px solid #10b981'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <span style={{fontSize: '2em'}}>第二阶段</span>
              <span className="tag tag-success">React (3-4周)</span>
            </div>
            <h2 style={{border: 'none', margin: '0 0 16px', fontSize: '1.5em'}}>React 前端开发</h2>
            
            <h3>学习内容</h3>
            <ul>
              <li>React 基础（JSX、组件、Props、State）</li>
              <li>React Hooks（useState, useEffect, useContext, useRef, useMemo, useCallback）</li>
              <li>React Router（路由、嵌套路由、动态路由）</li>
              <li>状态管理（Zustand / Jotai / Redux Toolkit）</li>
              <li>表单处理（React Hook Form + Zod）</li>
              <li>HTTP 请求（fetch / axios / TanStack Query）</li>
            </ul>

            <h3>推荐资源</h3>
            <div className="card-grid">
              <div className="card">
                <h4>⚛️ React 官方文档</h4>
                <p>react.dev</p>
                <Link href="/docs/react" className="card-link">开始学习</Link>
              </div>
            </div>

            <h3>实战项目</h3>
            <p>Todo App / 博客前端 / 电商产品列表</p>
          </div>

          {/* Phase 3 */}
          <div className="content-card" style={{borderLeft: '4px solid #8b5cf6'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <span style={{fontSize: '2em'}}>第三阶段</span>
              <span className="tag tag-primary">Next.js (2-3周)</span>
            </div>
            <h2 style={{border: 'none', margin: '0 0 16px', fontSize: '1.5em'}}>Next.js 全栈开发</h2>
            
            <h3>学习内容</h3>
            <ul>
              <li>App Router vs Pages Router</li>
              <li>Server Components vs Client Components</li>
              <li>数据获取（fetch, cache, revalidation）</li>
              <li>API Routes / Server Actions</li>
              <li>认证（NextAuth.js）</li>
              <li>样式方案（Tailwind CSS / CSS Modules）</li>
            </ul>

            <h3>推荐资源</h3>
            <div className="card-grid">
              <div className="card">
                <h4>▲ Next.js 官方文档</h4>
                <p>nextjs.org/docs</p>
                <Link href="/docs/nextjs" className="card-link">开始学习</Link>
              </div>
            </div>

            <h3>实战项目</h3>
            <p>博客系统 / 管理后台 / SaaS 产品原型</p>
          </div>

          {/* Phase 4 */}
          <div className="content-card" style={{borderLeft: '4px solid #f59e0b'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <span style={{fontSize: '2em'}}>第四阶段</span>
              <span className="tag tag-warning">Node.js & NestJS (3-4周)</span>
            </div>
            <h2 style={{border: 'none', margin: '0 0 16px', fontSize: '1.5em'}}>Node.js 后端开发</h2>
            
            <h3>学习内容</h3>
            <ul>
              <li>Node.js 基础（模块系统、文件系统、事件循环）</li>
              <li>NestJS 核心概念（Module, Controller, Provider, DI）</li>
              <li>数据库集成（Prisma / TypeORM + PostgreSQL）</li>
              <li>认证授权（JWT, Passport, Guards）</li>
              <li>API 设计（RESTful, 错误处理, 验证）</li>
              <li>中间件、管道、守卫、拦截器</li>
            </ul>

            <h3>推荐资源</h3>
            <div className="card-grid">
              <div className="card">
                <h4>🪹 NestJS 官方文档</h4>
                <p>docs.nestjs.com</p>
                <Link href="/docs/nestjs" className="card-link">开始学习</Link>
              </div>
            </div>

            <h3>实战项目</h3>
            <p>REST API / 用户认证系统 / 博客后端</p>
          </div>

          {/* Phase 5 */}
          <div className="content-card" style={{borderLeft: '4px solid #ec4899'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <span style={{fontSize: '2em'}}>第五阶段</span>
              <span className="tag tag-primary">数据库 & DevOps (2-3周)</span>
            </div>
            <h2 style={{border: 'none', margin: '0 0 16px', fontSize: '1.5em'}}>数据库与部署</h2>
            
            <h3>学习内容</h3>
            <ul>
              <li>PostgreSQL 基础（SQL, 索引, 事务）</li>
              <li>Prisma ORM（Schema, Migration, Query）</li>
              <li>Redis（缓存, Session, 队列）</li>
              <li>Docker 容器化</li>
              <li>CI/CD 流水线（GitHub Actions）</li>
              <li>云服务器部署（Nginx, SSL）</li>
            </ul>

            <h3>推荐资源</h3>
            <div className="card-grid">
              <div className="card">
                <h4>🐘 PostgreSQL</h4>
                <p>postgresql.org</p>
                <Link href="/docs/database" className="card-link">开始学习</Link>
              </div>
              <div className="card">
                <h4>🔷 Prisma</h4>
                <p>prisma.io</p>
                <Link href="/docs/prisma" className="card-link">开始学习</Link>
              </div>
              <div className="card">
                <h4>🐳 Docker</h4>
                <p>docker.com</p>
                <Link href="/docs/deployment" className="card-link">开始学习</Link>
              </div>
            </div>

            <h3>实战项目</h3>
            <p>Docker 部署全栈应用 / CI/CD 自动化</p>
          </div>

          {/* Timeline */}
          <h2 style={{marginTop: '40px'}}>📅 学习时间线</h2>
          <div className="content-card">
            <table>
              <thead>
                <tr>
                  <th>周数</th>
                  <th>阶段</th>
                  <th>核心技能</th>
                  <th>产出</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1-3周</td><td>第一阶段</td><td>JS + TS 基础</td><td>类型化项目</td></tr>
                <tr><td>4-7周</td><td>第二阶段</td><td>React + 状态管理</td><td>React 应用</td></tr>
                <tr><td>8-10周</td><td>第三阶段</td><td>Next.js</td><td>全栈项目</td></tr>
                <tr><td>11-14周</td><td>第四阶段</td><td>NestJS + 数据库</td><td>REST API</td></tr>
                <tr><td>15-17周</td><td>第五阶段</td><td>DevOps</td><td>部署上线</td></tr>
                <tr><td>18周+</td><td>持续学习</td><td>高级主题</td><td>作品集</td></tr>
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="alert alert-info" style={{marginTop: '32px'}}>
            <span style={{fontSize: '1.5em'}}>💡</span>
            <div>
              <strong>学习建议</strong>
              <ul style={{margin: '8px 0 0 20px'}}>
                <li>每个阶段都要做实战项目，理论+实践结合</li>
                <li>遇到问题先查文档，再搜 Google，最后提问</li>
                <li>阅读优秀的开源项目源码</li>
                <li>坚持写技术博客，输出倒逼输入</li>
                <li>加入技术社区，与他人交流学习</li>
              </ul>
            </div>
          </div>

          <div className="page-nav">
            <span></span>
            <Link href="/docs/typescript">开始学习 TypeScript →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
