import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function FAQPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>常见问题</span>
          </div>

          <h1>❓ 常见问题与解决方案</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            TypeScript 全栈开发中的常见问题与最佳实践
          </p>

          {/* TypeScript FAQ */}
          <div className="content-card">
            <h2 id="typescript">📘 TypeScript 问题</h2>

            <div className="faq-item open">
              <div className="faq-question">
                <span>如何解决 TS2307: Cannot find module?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <p><strong>原因：</strong>模块解析失败，可能是路径错误或包未安装</p>
                <pre><code>{`# 1. 安装缺失的包
npm install @types/xxx

# 2. 检查路径是否正确
import { utils } from "./utils";
import { utils } from "@/lib/utils";

# 3. 配置 tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 4. 检查文件扩展名
import { xxx } from "./utils.ts";  # 需要 .ts
import { xxx } from "./utils";     # 正确`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何处理 'undefined' is not assignable to type?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <p><strong>原因：</strong>变量可能为 undefined，但类型定义不允许</p>
                <pre><code>{`# 1. 使用可选链
const name = user?.profile?.name;

# 2. 使用空值合并
const name = user.profile?.name ?? "匿名";

# 3. 使用类型守卫
if (user.profile) {
  console.log(user.profile.name);  // TypeScript 知道这里 profile 存在
}

# 4. 使用非空断言（谨慎）
const name = user.profile!.name;

# 5. 将属性标记为可选
interface User {
  profile?: Profile;  // 添加 ?
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何定义函数返回类型为 Promise?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 显式声明返回类型
async function fetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  return response.json();
}

# 2. 使用 void Promise
async function logMessage(): Promise<void> {
  console.log("Hello");
}

# 3. 返回类型推断（推荐用于内部函数）
async function getData() {
  return { name: "张三", age: 25 };  // TypeScript 自动推断
}

# 4. 箭头函数
const fetchUser = async (): Promise<User> => {
  return { id: 1, name: "张三" };
};`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何使用泛型约束?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 约束必须包含某个属性
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

# 2. 约束为另一个类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

# 3. 约束继承接口
interface Person {
  name: string;
  age: number;
}

function greet<T extends Person>(person: T): string {
  return \`Hello, \${person.name}\`;
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Next.js FAQ */}
          <div className="content-card">
            <h2 id="nextjs">▲ Next.js 问题</h2>

            <div className="faq-item open">
              <div className="faq-question">
                <span>如何修复 Hydration Mismatch 错误?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <p><strong>原因：</strong>服务端渲染的内容与客户端不匹配</p>
                <pre><code>{`# 1. 使用 useEffect 在客户端渲染动态内容
"use client";
import { useState, useEffect } from "react";

export function DateDisplay() {
  const [date, setDate] = useState<string | null>(null);
  
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  
  return <span suppressHydrationWarning>{date || "加载中..."}</span>;
}

# 2. 动态导入禁用 SSR
import dynamic from "next/dynamic";

const ClientOnlyComponent = dynamic(
  () => import("@/components/ClientOnly"),
  { ssr: false }
);

# 3. 使用 suppressHydrationWarning
<span suppressHydrationWarning>
  {new Date().toISOString()}
</span>`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何在 Server Component 中使用 hooks?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <p><strong>原因：</strong>Server Components 不能使用 hooks，这是设计限制</p>
                <pre><code>{`# Server Components（无 hooks）
export default async function ServerPage() {
  // 可以使用 async/await
  const data = await fetchData();
  return <div>{data}</div>;
}

# Client Components（有 hooks）
"use client";

import { useState, useEffect } from "react";

export function ClientComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>{data}</div>;
}

# 组合使用
export default async function Page() {
  const staticData = await getStaticData();  // 服务端
  
  return (
    <div>
      <StaticContent data={staticData} />
      <ClientComponent />  {/* 客户端交互部分 */}
    </div>
  );
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何处理 API Route 的 CORS 错误?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = { users: [] };
  
  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",  // 允许所有源
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// 处理 OPTIONS 预检请求
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何获取 URL 参数?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# App Router - 路由参数
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const { id, category } = params;
  // URL: /posts/123/tech -> id: "123", category: "tech"
  return <div>Post {id}</div>;
}

# App Router - 搜索参数
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  // URL: /search?q=hello -> query: "hello"
  return <div>搜索: {query}</div>;
}

# Server Component - 获取参数
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;
  const { q, page } = searchParams;
  return <div>Search {q}</div>;
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* NestJS FAQ */}
          <div className="content-card">
            <h2 id="nestjs">🪹 NestJS 问题</h2>

            <div className="faq-item open">
              <div className="faq-question">
                <span>如何解决 Cannot inject 错误?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <p><strong>原因：</strong>依赖注入配置问题</p>
                <pre><code>{`# 1. 确保 Provider 在模块中注册
@Module({
  providers: [UsersService],  // 必须在这里
})
export class UsersModule {}

# 2. 确保模块已导入
@Module({
  imports: [UsersModule],  // 必须在这里
})
export class AppModule {}

# 3. 导出 Provider 给其他模块使用
@Module({
  exports: [UsersService],  // 必须导出
})
export class UsersModule {}

# 4. 解决循环依赖
import { forwardRef } from "@nestjs/common";

@Injectable()
export class ServiceA {
  constructor(
    @Inject(forwardRef(() => ServiceB))
    private serviceB: ServiceB,
  ) {}
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现全局异常处理?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception;
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === "object" ? message : { message },
    });
  }
}

# main.ts 启用
app.useGlobalFilters(new AllExceptionsFilter());`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何配置环境变量?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装配置模块
npm install @nestjs/config

# 2. 使用 ConfigModule
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // 全局可用
      envFilePath: ".env",
    }),
  ],
})
export class AppModule {}

# 3. 注入配置
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  
  getDatabaseUrl() {
    return this.configService.get("DATABASE_URL");
  }
  
  // 带默认值
  getPort() {
    return this.configService.get("PORT", "3000");
  }
}

# 4. .env 文件
DATABASE_URL=postgres://localhost:5432/mydb
JWT_SECRET=your-secret-key
PORT=3000`}</code></pre>
              </div>
            </div>
          </div>

          {/* Prisma FAQ */}
          <div className="content-card">
            <h2 id="prisma">🔷 Prisma 问题</h2>

            <div className="faq-item open">
              <div className="faq-question">
                <span>如何处理 Prisma 迁移错误?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 常见迁移问题及解决方案

# 1. 迁移文件冲突
# 删除 migrations 文件夹，重新迁移
rm -rf prisma/migrations
npx prisma migrate dev

# 2. 数据库已有数据无法迁移
npx prisma migrate dev --create-only  # 只创建迁移文件
# 手动编辑迁移文件，然后执行
npx prisma migrate deploy

# 3. 强制重置数据库（开发环境）
npx prisma db push --force-reset

# 4. 查看 SQL 而不执行
npx prisma migrate dev --create-only --skip-generate
# 查看生成的 SQL

# 5. 生产环境迁移
npx prisma migrate deploy`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何处理 Prisma 查询性能问题?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 使用 select 减少返回字段
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

# 2. 使用 include 避免 N+1
// 不推荐：N+1 查询
const posts = await prisma.post.findMany();
for (const post of posts) {
  post.author = await prisma.user.findUnique({ where: { id: post.authorId } });
}

// 推荐：一次性加载
const posts = await prisma.post.findMany({
  include: { author: true },
});

# 3. 使用分页
const users = await prisma.user.findMany({
  skip: 0,
  take: 10,
});

# 4. 添加索引
model User {
  @@index([email])  // 添加索引
}

# 5. 使用 raw 查询（复杂场景）
const users = await prisma.$queryRaw\`SELECT * FROM users WHERE age > 18\`;`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何处理事务?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 交互式事务
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { name: "张三", email: "zhang@example.com" },
  });
  
  await tx.log.create({
    data: { action: "create_user", userId: user.id },
  });
  
  return user;
});

# 2. 批量操作
await prisma.$transaction([
  prisma.user.update({
    where: { id: 1 },
    data: { name: "新名字" },
  }),
  prisma.user.update({
    where: { id: 2 },
    data: { name: "另一个名字" },
  }),
]);

# 3. 隔离级别
await prisma.$transaction(
  async (tx) => {
    // 事务操作
  },
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  }
);`}</code></pre>
              </div>
            </div>
          </div>

          {/* General FAQ */}
          <div className="content-card">
            <h2>🛠️ 开发工具问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何配置 ESLint 和 Prettier?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装
npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier

# 2. .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-console": "warn"
  }
}

# 3. .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}

# 4. package.json scripts
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write ."
  }
}

# 5. .gitignore 添加
node_modules/
dist/
.next/
.prettierrc`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何配置 Git Hooks?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装
npm install -D husky lint-staged

# 2. package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,json,css,md}": ["prettier --write"]
  }
}

# 3. 初始化 husky
npx husky install

# 4. 添加 pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/nextjs">← Next.js</Link>
            <Link href="/docs/troubleshooting">错误排查 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
