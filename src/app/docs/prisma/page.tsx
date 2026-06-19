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
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>Prisma</span>
          </div>

          <h1>🔷 Prisma 完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            类型安全的 ORM，Prisma Schema → 数据库
          </p>

          {/* Schema */}
          <div className="content-card">
            <h2>Prisma Schema</h2>

            <pre><code>{`// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 定义模型
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  age       Int?
  posts     Post[]   // 一对多关系
  profile   Profile? // 一对一关系
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]   // 多对多关系
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}`}</code></pre>

            <h3>字段类型</h3>
            <pre><code>{`model Example {
  // 基础类型
  id       Int      @id @default(autoincrement())
  uuid     String   @default(uuid())
  email    String   @unique
  name     String?
  age      Int?
  price    Float
  active   Boolean  @default(true)
  data     Json
  birthday DateTime
  
  // 特殊修饰符
  tags     String[]          // 数组
  email    String   @unique  // 唯一
  name     String   @default("匿名")  // 默认值
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // 索引
  @@index([email])
  @@index([createdAt, active])
}`}</code></pre>
          </div>

          {/* CRUD */}
          <div className="content-card">
            <h2>CRUD 操作</h2>

            <h3>创建</h3>
            <pre><code>{`// 创建单条
const user = await prisma.user.create({
  data: {
    email: "zhang@example.com",
    name: "张三",
    age: 25,
  },
});

// 批量创建
const users = await prisma.user.createMany({
  data: [
    { email: "user1@example.com", name: "用户1" },
    { email: "user2@example.com", name: "用户2" },
  ],
});

// 带关联创建
const post = await prisma.post.create({
  data: {
    title: "我的第一篇文章",
    author: {
      connect: { id: 1 },  // 关联已有用户
    },
  },
});

// 或创建新关联
const post2 = await prisma.post.create({
  data: {
    title: "第二篇文章",
    author: {
      create: {
        email: "new@example.com",
        name: "新用户",
      },
    },
  },
});`}</code></pre>

            <h3>查询</h3>
            <pre><code>{`// 查询所有
const users = await prisma.user.findMany();

// 条件查询
const activeUsers = await prisma.user.findMany({
  where: {
    age: { gte: 18 },  // >= 18
    OR: [
      { name: { contains: "张" } },
      { email: { endsWith: "@gmail.com" } },
    ],
  },
  orderBy: { createdAt: "desc" },
  take: 10,      // 限制数量
  skip: 0,       // 跳过数量
});

// 查询单个
const user = await prisma.user.findUnique({
  where: { email: "zhang@example.com" },
});

// 包含关联数据
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      where: { published: true },
      select: { title: true },
    },
  },
});`}</code></pre>

            <h3>更新</h3>
            <pre><code>{`// 更新单个
const user = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: "新名字",
    age: { increment: 1 },  // 递增
  },
});

// 条件更新
await prisma.user.updateMany({
  where: { age: { lt: 18 } },
  data: { status: "minor" },
});

// upsert - 存在则更新，不存在则创建
const result = await prisma.user.upsert({
  where: { email: "zhang@example.com" },
  create: { email: "zhang@example.com", name: "张三" },
  update: { name: "张三更新" },
});`}</code></pre>

            <h3>删除</h3>
            <pre><code>{`// 删除单个
await prisma.user.delete({
  where: { id: 1 },
});

// 批量删除
await prisma.user.deleteMany({
  where: { age: { lt: 18 } },
});

// 清空表
await prisma.user.deleteMany();`}</code></pre>
          </div>

          {/* Relations */}
          <div className="content-card">
            <h2>关联关系</h2>

            <pre><code>{`// 一对多
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,  // 包含用户的所有文章
  },
});

// 获取所有文章及其作者
const posts = await prisma.post.findMany({
  include: {
    author: true,
  },
});

// 多对多
// 添加标签到文章
await prisma.post.update({
  where: { id: 1 },
  data: {
    tags: {
      connect: [{ id: 1 }, { id: 2 }],
    },
  },
});

// 获取文章及其所有标签
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    tags: true,
  },
});

// 创建带标签的文章
await prisma.post.create({
  data: {
    title: "新文章",
    tags: {
      connectOrCreate: [
        {
          where: { name: "React" },
          create: { name: "React" },
        },
        {
          where: { name: "TypeScript" },
          create: { name: "TypeScript" },
        },
      ],
    },
  },
});`}</code></pre>
          </div>

          {/* Transactions */}
          <div className="content-card">
            <h2>事务与批量操作</h2>

            <pre><code>{`// 交互式事务
const result = await prisma.$transaction(async (tx) => {
  // 创建用户
  const user = await tx.user.create({
    data: { email: "zhang@example.com", name: "张三" },
  });
  
  // 创建用户日志
  await tx.log.create({
    data: { action: "create_user", userId: user.id },
  });
  
  return user;
});

// 批量操作
await prisma.$transaction([
  prisma.user.update({
    where: { id: 1 },
    data: { name: "更新1" },
  }),
  prisma.user.update({
    where: { id: 2 },
    data: { name: "更新2" },
  }),
]);

// Raw SQL 查询
const users = await prisma.$queryRaw\`SELECT * FROM users WHERE age > 18\`;

// 带参数的 Raw 查询
const users = await prisma.$queryRaw(
  \`SELECT * FROM users WHERE age > \${18}\`
);`}</code></pre>
          </div>

          {/* Common Issues */}
          <div className="content-card">
            <h2>常见问题</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Schema 修改后数据库未更新</span>
              </div>
              <div className="problem-content">
                <pre><code>{`# 1. 开发环境 - 自动同步
npx prisma db push

# 2. 创建并应用迁移
npx prisma migrate dev --name add_new_field

# 3. 重置数据库（开发环境）
npx prisma db push --force-reset

# 4. 只生成客户端
npx prisma generate`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">N+1 查询问题</span>
              </div>
              <div className="problem-content">
                <pre><code>{`# 问题：循环查询
const users = await prisma.user.findMany();
for (const user of users) {
  user.posts = await prisma.post.findMany({  // N次查询
    where: { authorId: user.id },
  });
}

# 解决：使用 include 预加载
const users = await prisma.user.findMany({
  include: {
    posts: true,  // 一次查询完成
  },
});

# 条件预加载
const users = await prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
    },
  },
});`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/nestjs">← NestJS</Link>
            <Link href="/docs/database">数据库 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
