import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function DeploymentPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>部署</span>
          </div>

          <h1>🐳 部署与 DevOps</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            Docker 容器化、CI/CD 流水线、Vercel 部署
          </p>

          {/* Docker */}
          <div className="content-card">
            <h2>Docker 容器化</h2>

            <h3>Docker 基础</h3>
            <pre><code>{`# Dockerfile - Next.js 应用
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]`}</code></pre>

            <h3>Docker Compose</h3>
            <pre><code>{`# docker-compose.yml
version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
      - NODE_ENV=production
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`}</code></pre>

            <h3>常用命令</h3>
            <pre><code>{`# 构建镜像
docker build -t my-app .

# 运行容器
docker run -p 3000:3000 my-app

# 后台运行
docker run -d -p 3000:3000 --name my-app my-app

# 查看日志
docker logs -f my-app

# 进入容器
docker exec -it my-app sh

# 停止并删除
docker stop my-app && docker rm my-app

# 使用 Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down
docker-compose restart`}</code></pre>
          </div>

          {/* Vercel */}
          <div className="content-card">
            <h2>Vercel 部署</h2>

            <h3>vercel.json 配置</h3>
            <pre><code>{`{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}`}</code></pre>

            <h3>环境变量</h3>
            <pre><code>{`# .env.local (本地开发)
DATABASE_URL=postgresql://localhost:5432/mydb
NEXT_PUBLIC_API_URL=http://localhost:3000

# .env.production (Vercel)
DATABASE_URL=postgresql://user:password@host:5432/mydb
NEXT_PUBLIC_API_URL=https://your-app.vercel.app`}</code></pre>

            <h3>部署命令</h3>
            <pre><code>{`# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署预览
vercel

# 4. 部署生产
vercel --prod

# 5. 查看部署
vercel ls

# 6. 回滚
vercel rollback [deployment-url]`}</code></pre>
          </div>

          {/* GitHub Actions */}
          <div className="content-card">
            <h2>GitHub Actions CI/CD</h2>

            <pre><code>{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: .`}</code></pre>
          </div>

          {/* Nginx */}
          <div className="content-card">
            <h2>Nginx 配置</h2>

            <pre><code>{`# /etc/nginx/sites-available/nextjs
upstream nextjs_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name yourdomain.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;
    
    # 代理到 Next.js
    location / {
        proxy_pass http://nextjs_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 静态文件（如果直接服务）
    location /_next/static {
        proxy_pass http://nextjs_app;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`}</code></pre>
          </div>

          {/* Environment Variables */}
          <div className="content-card">
            <h2>环境变量最佳实践</h2>

            <pre><code>{`# .env.example (Git 追踪)
# 数据库
DATABASE_URL=

# 认证
JWT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# API Keys
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=


# .env.local (不提交)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=your-super-secret-key
# ... 其他敏感信息


# 在代码中使用
// Next.js
const dbUrl = process.env.DATABASE_URL;

// NestJS
@Injectable()
class ConfigService {
  get databaseUrl() {
    return process.env.DATABASE_URL;
  }
}`}</code></pre>
          </div>

          {/* PM2 */}
          <div className="content-card">
            <h2>PM2 进程管理</h2>

            <pre><code>{`# 安装
npm install -g pm2

# 启动应用
pm2 start npm --name "my-app" -- start

# 启动配置文件
pm2 start ecosystem.config.js

# ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./dist/main.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "1G",
      autorestart: true,
      watch: false,
    },
  ],
};

# 常用命令
pm2 list           # 查看进程
pm2 logs my-app    # 查看日志
pm2 restart my-app # 重启
pm2 stop my-app    # 停止
pm2 delete my-app # 删除
pm2 monit          # 监控`}</code></pre>
          </div>

          <div className="page-nav">
            <Link href="/docs/prisma">← Prisma</Link>
            <Link href="/docs/faq">FAQ →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
