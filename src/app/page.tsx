import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          {/* Hero Section */}
          <div className="content-card" style={{textAlign: 'center', padding: '60px 40px'}}>
            <h1 style={{fontSize: '3em', marginBottom: '20px'}}>TypeScript 全栈知识库</h1>
            <p style={{fontSize: '1.2em', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px'}}>
              从入门到精通的 TypeScript 全栈开发学习平台<br/>
              包含 Next.js、NestJS、React、Prisma 等框架完整文档
            </p>
            
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link href="/docs/roadmap" style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}>
                🗺️ 学习路线图
              </Link>
              <Link href="/docs/faq" style={{
                padding: '14px 28px',
                background: 'transparent',
                border: '1px solid #6366f1',
                color: '#818cf8',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}>
                ❓ 常见问题
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">框架文档</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">常见问题</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">代码示例</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">解决方案</div>
            </div>
          </div>

          {/* Framework Cards */}
          <h2 style={{marginTop: '40px'}}>📚 核心框架</h2>
          <div className="card-grid">
            <div className="card">
              <div className="card-icon">📘</div>
              <h3>TypeScript</h3>
              <p>类型安全的 JavaScript 超集，掌握类型系统、泛型、装饰器等核心概念。</p>
              <Link href="/docs/typescript" className="card-link">开始学习 →</Link>
            </div>
            
            <div className="card">
              <div className="card-icon">▲</div>
              <h3>Next.js</h3>
              <p>React 全栈框架，掌握 App Router、Server Components、API Routes。</p>
              <Link href="/docs/nextjs" className="card-link">开始学习 →</Link>
            </div>
            
            <div className="card">
              <div className="card-icon">🪹</div>
              <h3>NestJS</h3>
              <p>Node.js 企业级框架，掌握模块化、依赖注入、中间件、数据库集成。</p>
              <Link href="/docs/nestjs" className="card-link">开始学习 →</Link>
            </div>
            
            <div className="card">
              <div className="card-icon">⚛️</div>
              <h3>React</h3>
              <p>UI 库，掌握 Hooks、状态管理、性能优化、最佳实践。</p>
              <Link href="/docs/react" className="card-link">开始学习 →</Link>
            </div>
            
            <div className="card">
              <div className="card-icon">🔷</div>
              <h3>Prisma</h3>
              <p>类型安全的 ORM，掌握 Schema设计、迁移、查询、关联关系。</p>
              <Link href="/docs/prisma" className="card-link">开始学习 →</Link>
            </div>
            
            <div className="card">
              <div className="card-icon">🐳</div>
              <h3>Docker</h3>
              <p>容器化部署，掌握镜像构建、容器管理、Docker Compose。</p>
              <Link href="/docs/deployment" className="card-link">开始学习 →</Link>
            </div>
          </div>

          {/* Quick Links */}
          <h2 style={{marginTop: '40px'}}>🚀 快速链接</h2>
          <div className="card-grid">
            <div className="card" style={{borderLeft: '4px solid #ef4444'}}>
              <h3 style={{color: '#ef4444'}}>🔧 错误排查</h3>
              <p>快速定位和解决开发中遇到的常见错误。</p>
              <Link href="/docs/troubleshooting" className="card-link">立即查看 →</Link>
            </div>
            
            <div className="card" style={{borderLeft: '4px solid #f59e0b'}}>
              <h3 style={{color: '#f59e0b'}}>❓ FAQ</h3>
              <p>TypeScript、Next.js、NestJS 等框架常见问题解答。</p>
              <Link href="/docs/faq" className="card-link">查看全部 →</Link>
            </div>
            
            <div className="card" style={{borderLeft: '4px solid #10b981'}}>
              <h3 style={{color: '#10b981'}}>🗺️ 学习路线</h3>
              <p>从零到专家的完整学习路径规划。</p>
              <Link href="/docs/roadmap" className="card-link">查看路线 →</Link>
            </div>
          </div>

          {/* Why Learn */}
          <h2 style={{marginTop: '40px'}}>💡 为什么学习 TypeScript 全栈？</h2>
          <div className="content-card">
            <table>
              <thead>
                <tr>
                  <th>优势</th>
                  <th>说明</th>
                  <th>应用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="tag tag-primary">类型安全</span></td>
                  <td>编译时检查，减少运行时错误</td>
                  <td>大型项目、企业级应用</td>
                </tr>
                <tr>
                  <td><span className="tag tag-success">全栈统一</span></td>
                  <td>前后端使用同一语言，代码复用</td>
                  <td>全栈开发、微服务</td>
                </tr>
                <tr>
                  <td><span className="tag tag-warning">生态完善</span></td>
                  <td>Next.js + NestJS 黄金组合</td>
                  <td>Web 应用、SaaS 产品</td>
                </tr>
                <tr>
                  <td><span className="tag tag-danger">市场需求</span></td>
                  <td>薪资高、就业广、前景好</td>
                  <td>互联网、金融、科技公司</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>TypeScript 全栈知识库 | Next.js + NestJS + React + Prisma</p>
        <p style={{marginTop: '8px', fontSize: '14px'}}>
          Made with ❤️ for TypeScript Developers
        </p>
      </footer>
    </div>
  )
}
