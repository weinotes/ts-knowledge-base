import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TroubleshootingPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>错误排查</span>
          </div>

          <h1>🔧 错误排查指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            开发中常见错误的诊断与解决方法
          </p>

          {/* TypeScript Errors */}
          <div className="content-card" style={{borderLeft: '4px solid #6366f1'}}>
            <h2>📘 TypeScript 错误</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TS2307: Cannot find module</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>模块解析失败，可能是路径错误或包未安装</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 安装缺失的包
npm install @types/xxx

# 检查路径是否正确
import { utils } from "./utils";
import { utils } from "@/lib/utils";

# 配置 tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TS2741: Property is missing</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>对象字面量缺少必需的属性</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 添加缺失的属性
const user: User = {
  id: 1,
  name: "张三",
  email: "zhang@example.com"
};

# 2. 将属性设为可选
interface User {
  age?: number;
}

# 3. 使用类型断言
const user = { id: 1, name: "张三" } as User;`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TS2322: Type assignment error</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>类型不匹配</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 类型转换
const str: string = someNumber as string;

# 2. 扩展类型定义
type ExtendedUser = User & { newProperty: string };

# 3. 使用 any
const obj: any = someUnknownType;`}</code></pre>
              </div>
            </div>
          </div>

          {/* Next.js Errors */}
          <div className="content-card" style={{borderLeft: '4px solid #10b981'}}>
            <h2>▲ Next.js 错误</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Hydration Mismatch</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>服务端渲染的内容与客户端不匹配</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 使用 useEffect 在客户端渲染
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
const ClientOnly = dynamic(() => import("./ClientOnly"), { ssr: false });`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Module not found</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>模块解析失败</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 检查路径别名配置
# tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 2. 重启开发服务器
rm -rf .next
npm run dev`}</code></pre>
              </div>
            </div>
          </div>

          {/* NestJS Errors */}
          <div className="content-card" style={{borderLeft: '4px solid #f59e0b'}}>
            <h2>🪹 NestJS 错误</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Cannot inject Service</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>服务未在模块中注册，或模块未正确导入</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 确保 Provider 在模块中注册
@Module({
  providers: [UsersService],
})
export class UsersModule {}

# 2. 确保模块已导入
@Module({
  imports: [UsersModule],
})
export class AppModule {}

# 3. 解决循环依赖
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

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Validation failed</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>请求数据不符合 DTO 验证规则</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 检查 DTO 定义
export class CreateUserDto {
  @IsString()
  name: string;
}

# 2. 启用 ValidationPipe
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));`}</code></pre>
              </div>
            </div>
          </div>

          {/* Prisma Errors */}
          <div className="content-card" style={{borderLeft: '4px solid #ec4899'}}>
            <h2>🔷 Prisma 错误</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">P2002: Unique constraint failed</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>尝试插入重复的唯一字段值</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 检查是否已存在
const existing = await prisma.user.findUnique({
  where: { email: "zhang@example.com" }
});

# 2. 使用 upsert
await prisma.user.upsert({
  where: { email: "zhang@example.com" },
  create: { email: "zhang@example.com", name: "张三" },
  update: { name: "张三" },
});`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">P2025: Record not found</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>尝试更新或删除不存在的记录</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 先检查是否存在
const user = await prisma.user.findUnique({
  where: { id: 1 }
});

if (!user) {
  throw new NotFoundException("用户不存在");
}

# 2. 使用 deleteMany
await prisma.user.deleteMany({
  where: { id: 1 }
});`}</code></pre>
              </div>
            </div>
          </div>

          {/* Runtime Errors */}
          <div className="content-card" style={{borderLeft: '4px solid #8b5cf6'}}>
            <h2>⏱️ 运行时错误</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TypeError: Cannot read property</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>访问 undefined/null 对象的属性</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 使用可选链
const name = user?.profile?.name;

# 使用空值合并
const name = user?.profile?.name ?? "默认值";

# 使用类型守卫
if (user && user.profile) {
  console.log(user.profile.name);
}`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">UnhandledPromiseRejection</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>Promise 被拒绝但未被捕获</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 使用 async/await + try-catch
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="content-card" style={{borderLeft: '4px solid #10b981'}}>
            <h2>⚡ 性能问题</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">🐌</span>
                <span className="problem-title">React re-render 过多</span>
              </div>
              <div className="problem-content">
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. React.memo 缓存组件
const MemoizedComponent = React.memo(({ data }) => {
  return <ExpensiveRender data={data} />;
});

# 2. useMemo 缓存计算
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

# 3. useCallback 缓存函数
const handleClick = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">🐌</span>
                <span className="problem-title">Bundle 体积过大</span>
              </div>
              <div className="problem-content">
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 动态导入
const HeavyComponent = dynamic(
  () => import("./HeavyComponent"),
  { loading: () => <p>加载中...</p> }
);

# 2. 使用 lodash-es
import { debounce } from "lodash-es";

# 3. Tree shaking
# 确保使用 ES modules`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/faq">← FAQ</Link>
            <Link href="/docs/prisma">Prisma →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
