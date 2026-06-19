import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function PrismaPage() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <h1>Prisma 完全指南</h1>
          <p className="lead">下一代 Node.js 和 TypeScript ORM，从 Schema 到数据库查询</p>

          <div className="table-of-contents">
            <h2>目录</h2>
            <ul>
              <li><a href="#introduction">第一章：Prisma 简介</a></li>
              <li><a href="#setup">第二章：安装与配置</a></li>
              <li><a href="#schema">第三章：Schema 定义</a></li>
              <li><a href="#models">第四章：模型定义</a></li>
              <li><a href="#relations">第五章：关联关系</a></li>
              <li><a href="#client">第六章：Prisma Client</a></li>
              <li><a href="#crud">第七章：CRUD 操作</a></li>
              <li><a href="#migrate">第八章：数据库迁移</a></li>
              <li><a href="#queries">第九章：查询优化</a></li>
            </ul>
          </div>

          <section id="introduction">
            <h2>第一章：Prisma 简介</h2>

            <h3>1.1 什么是 Prisma</h3>
            <p>Prisma 是新一代 TypeScript ORM，提供类型安全的数据库访问、自动迁移和可视化数据管理。</p>
            <pre><code>{`# Prisma 核心组件
- Prisma Schema: 数据模型定义
- Prisma Client: 类型安全查询客户端
- Prisma Migrate: 数据库迁移工具
- Prisma Studio: 可视化数据库管理界面`}</code></pre>

            <h3>1.2 Prisma 优势</h3>
            <pre><code>{`# 为什么选择 Prisma
- 全类型安全
- 自动生成查询代码
- 直观的 Schema 语法
- 强大的迁移系统
- 优秀的开发者体验
- 支持多种数据库`}</code></pre>
          </section>

          <section id="setup">
            <h2>第二章：安装与配置</h2>

            <h3>2.1 安装依赖</h3>
            <pre><code>{`# 安装 Prisma CLI 和 Client
npm install prisma @prisma/client

# 初始化 Prisma
npx prisma init

# 安装数据库驱动（以 PostgreSQL 为例）
npm install pg
# 或 SQLite
npm install better-sqlite3`}</code></pre>

            <h3>2.2 环境变量配置</h3>
            <pre><code>{`# .env 文件
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# SQLite 示例
DATABASE_URL="file:./dev.db"`}</code></pre>
          </section>

          <section id="schema">
            <h2>第三章：Schema 定义</h2>

            <h3>3.1 Schema 文件结构</h3>
            <p>schema.prisma 是 Prisma 的核心配置文件，定义数据源、生成器和模型。</p>
            <pre><code>{`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
}`}</code></pre>

            <h3>3.2 字段修饰符</h3>
            <pre><code>{`model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</code></pre>
          </section>

          <section id="models">
            <h2>第四章：模型定义</h2>

            <h3>4.1 基本模型</h3>
            <pre><code>{`model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  posts     Post[]
}

enum Role {
  USER
  ADMIN
}`}</code></pre>

            <h3>4.2 字段类型</h3>
            <pre><code>{`# 常用 Prisma 字段类型
- String: 字符串
- Int: 整数
- Float: 浮点数
- Boolean: 布尔值
- DateTime: 日期时间
- Json: JSON 数据
- Decimal: 高精度小数
- Bytes: 二进制数据
- BigInt: 大整数`}</code></pre>
          </section>

          <section id="relations">
            <h2>第五章：关联关系</h2>

            <h3>5.1 一对一关系</h3>
            <pre><code>{`model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}`}</code></pre>

            <h3>5.2 一对多关系</h3>
            <pre><code>{`model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}`}</code></pre>

            <h3>5.3 多对多关系</h3>
            <pre><code>{`model Post {
  id     Int     @id @default(autoincrement())
  title  String
  tags   Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}`}</code></pre>
          </section>

          <section id="client">
            <h2>第六章：Prisma Client</h2>

            <h3>6.1 初始化客户端</h3>
            <p>Prisma Client 根据 Schema 自动生成类型安全的数据库访问方法。</p>
            <pre><code>{`import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;`}</code></pre>

            <h3>6.2 单例模式</h3>
            <pre><code>{`import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`}</code></pre>
          </section>

          <section id="crud">
            <h2>第七章：CRUD 操作</h2>

            <h3>7.1 创建记录</h3>
            <pre><code>{`const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
  },
});

const users = await prisma.user.createMany({
  data: [
    { email: 'a@example.com' },
    { email: 'b@example.com' },
  ],
});`}</code></pre>

            <h3>7.2 查询记录</h3>
            <pre><code>{`// 查询所有用户
const allUsers = await prisma.user.findMany();

// 条件查询
const activeUsers = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// 根据 ID 查询
const user = await prisma.user.findUnique({
  where: { id: 1 },
});`}</code></pre>

            <h3>7.3 更新与删除</h3>
            <pre><code>{`// 更新
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Wang' },
});

// 删除
const deleted = await prisma.user.delete({
  where: { id: 1 },
});`}</code></pre>
          </section>

          <section id="migrate">
            <h2>第八章：数据库迁移</h2>

            <h3>8.1 创建迁移</h3>
            <pre><code>{`# 创建并应用迁移
npx prisma migrate dev --name init

# 生成迁移但不应用
npx prisma migrate dev --create-only

# 应用待处理迁移
npx prisma migrate deploy`}</code></pre>

            <h3>8.2 生成客户端</h3>
            <pre><code>{`# 根据 Schema 生成 Prisma Client
npx prisma generate

# 查看数据库结构
npx prisma db pull

# 重置数据库（开发环境）
npx prisma migrate reset`}</code></pre>
          </section>

          <section id="queries">
            <h2>第九章：查询优化</h2>

            <h3>9.1 关联查询</h3>
            <pre><code>{`const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    },
  },
});`}</code></pre>

            <h3>9.2 选择字段</h3>
            <pre><code>{`const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
  where: { role: 'USER' },
});`}</code></pre>
          </section>

          <div className="navigation">
            <Link href="/docs/nextjs" className="nav-link">← Next.js 完全指南</Link>
            <Link href="/docs/nestjs" className="nav-link">NestJS 完全指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
