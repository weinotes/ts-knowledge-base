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
          <h1>常见问题与解决方案</h1>
          <p className="lead">TypeScript 全栈开发中的常见问题与最佳实践（100+ 问题解答）</p>

          {/* TypeScript FAQ */}
          <div className="content-card">
            <h2 id="typescript">TypeScript 问题</h2>

            <div className="faq-item">
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
                <span>如何处理 undefined is not assignable to type?</span>
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
  console.log(user.profile.name);
}

# 4. 使用非空断言（谨慎）
const name = user.profile!.name;

# 5. 将属性标记为可选
interface User {
  profile?: Profile;
}`}</code></pre>
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

# 3. 多重约束
function merge<T extends HasId & HasName>(a: T, b: T): T {
  return { ...a, ...b };
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何在 TypeScript 中使用装饰器?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 启用装饰器（tsconfig.json）
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

# 2. 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
}

@sealed
class MyClass {}

# 3. 方法装饰器
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${methodName}\`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

# 4. 属性装饰器
function format(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get: () => target[\`_\${propertyKey}\`].toUpperCase(),
    set: (value) => target[\`_\${propertyKey}\`] = value,
  });
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>什么是条件类型，如何使用?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 条件类型
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

# 提取数组元素类型
type ElementOf<T> = T extends Array<infer U> ? U : never;
type Num = ElementOf<number[]>;  // number

# 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

# 工具类型实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何正确使用 infer 关键字?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# infer 用于在条件类型中推断类型
# 推断函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type A = ReturnType<() => string>;  // string

# 推断构造函数参数
type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;

# 推断 Promise 内部类型
type Awaited<T> = T extends Promise<infer U> ? U : T;
type A = Awaited<Promise<string>>;  // string

# 递归推断
type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;`}</code></pre>
              </div>
            </div>
          </div>

          {/* Next.js FAQ */}
          <div className="content-card">
            <h2 id="nextjs">Next.js 问题</h2>

            <div className="faq-item">
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
                <span>如何实现增量静态再生成(ISR)?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 按路由段配置
export const revalidate = 60; // 60秒后重新验证

# 2. 按页面配置
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  return <div>{post.title}</div>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

# 3. 使用标签重新验证
export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetch(\`/api/posts/\${params.slug}\`, {
    next: { tags: [\`post-\${params.slug}\`] },
  });
  return <div>{post.title}</div>;
}

# 4. Server Action 中触发重新验证
import { revalidateTag } from "next/cache";

export async function updatePost(id: string) {
  await db.post.update({ where: { id }, data: { updated: true } });
  revalidateTag(\`post-\${id}\`);
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何在 Server Component 中使用 cookies 和 headers?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# Server Components 中使用
import { cookies, headers } from 'next/headers'

export default async function ServerPage() {
  const cookieStore = cookies();
  const headersList = headers();
  
  const token = cookieStore.get('token');
  const userAgent = headersList.get('user-agent');
  
  return <div>User Agent: {userAgent}</div>;
}

# 警告：使用这些会使页面变为动态渲染
# 不要在全局 layout.tsx 中使用，否则所有页面都是动态的

# 客户端使用
'use client'
import { useCookies } from 'next-client-cookies';

export default function ClientComponent() {
  const cookies = useCookies();
  const token = cookies.get('token');
  return <div>{token}</div>;
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现图片上传?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装依赖
npm install react-dropzone

# 2. API Route
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });
  
  const filename = \`\${Date.now()}-\${file.name}\`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);
  
  return NextResponse.json({ url: \`/uploads/\${filename}\` });
}

# 3. 客户端上传组件
'use client'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function UploadButton() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const { url } = await res.json();
    console.log('Uploaded:', url);
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
  });
  
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop image here</p>
    </div>
  );
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现分页?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 服务端分页
export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    db.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    db.post.count(),
  ]);
  
  const totalPages = Math.ceil(total / limit);
  
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}

# 2. 客户端分页组件
'use client'
import Link from 'next/link';

export function Pagination({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={\`?page=\${currentPage - 1}\`}>Previous</Link>
      )}
      <span>Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <Link href={\`?page=\${currentPage + 1}\`}>Next</Link>
      )}
    </div>
  );
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何配置环境变量?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. .env.local（本地，不提交）
DATABASE_URL=postgresql://localhost:5432/mydb
SECRET_KEY=xxx

# 2. .env.production
DATABASE_URL=postgres://prod:5432/mydb

# 3. 客户端可访问变量（必须 NEXT_PUBLIC_ 前缀）
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXX

# 4. 服务端使用
process.env.DATABASE_URL

# 5. 类型提示
// env.d.ts
interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly NEXT_PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* NestJS FAQ */}
          <div className="content-card">
            <h2 id="nestjs">NestJS 问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现 JWT 认证?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装依赖
npm install @nestjs/jwt @nestjs/passport passport passport-jwt

# 2. JWT Strategy
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

# 3. Auth Service
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

# 4. JWT Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现文件上传?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装 multer
npm install multer @types/multer

# 2. 配置上传
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, \`\${Date.now()}\${extname(file.originalname)}\`);
  },
});

# 3. Controller
@Post('upload')
@UseInterceptors(FileInterceptor('file', { storage }))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { url: \`/uploads/\${file.filename}\` };
}

# 4. 多个文件
@Post('upload-multiple')
@UseInterceptors(FilesInterceptor('files', 5))
uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
  return files.map(file => ({ url: file.path }));
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现 WebSocket 实时通信?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

# 2. Gateway
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { room: string; text: string }) {
    this.server.to(payload.room).emit('message', {
      from: client.id,
      text: payload.text,
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
  }
}

# 3. 客户端
const socket = io('http://localhost:3000');
socket.emit('joinRoom', 'room1');
socket.on('message', (data) => console.log(data));`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现 CQRS 模式?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 安装
npm install @nestjs/cqrs

# 2. Command
export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

# 3. Command Handler
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  execute(command: CreateUserCommand) {
    return this.userRepository.create(command.dto);
  }
}

# 4. 在 Controller 使用
@Controller()
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现数据库连接池?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# TypeORM 连接池配置
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        // 连接池配置
        extra: {
          max: 20,           // 最大连接数
          min: 5,            // 最小连接数
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
        // 连接超时
        connectTimeoutMS: 10000,
        // 申请连接超时
        acquireTimeoutMS: 10000,
      }),
    }),
  ],
})`}</code></pre>
              </div>
            </div>
          </div>

          {/* React FAQ */}
          <div className="content-card">
            <h2 id="react">React 问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何在 React 中正确处理表单?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 使用 react-hook-form
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { 
        required: 'Email is required',
        pattern: { value: /\\S+@\\S+/, message: 'Invalid email' }
      })} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password', { 
        required: 'Password is required',
        minLength: { value: 8, message: 'Min 8 characters' }
      })} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Login'}
      </button>
    </form>
  );
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何避免无限循环的 useEffect?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 错误写法
useEffect(() => {
  setCount(count + 1);  // 会导致无限循环
}, [count]);

# 正确写法
useEffect(() => {
  if (count < 10) {
    setCount(count + 1);
  }
}, [count]);

# 常见原因
# 1. 在 effect 中更新 state
# 2. useEffect 依赖数组不完整
# 3. 对象/函数作为依赖（每次渲染都是新引用）

# 解决
# 1. 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

# 2. 使用 useMemo 缓存对象
const config = useMemo(() => ({
  color: 'red',
  size: 'large',
}), []);

# 3. 检查依赖数组
// 使用 ESLint exhaustive-deps 规则
// npx eslint --ext .ts,.tsx src --rule 'react-hooks/exhaustive-deps: error'`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现自定义 Hook?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. useDebounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

# 2. useLocalStorage Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

# 3. useFetch Hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何优化 React 性能?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. React.memo 避免不必要的重新渲染
const MemoizedComponent = React.memo(function MyComponent({ data }) {
  return <div>{data.name}</div>;
});

# 2. useMemo 缓存计算结果
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

# 3. useCallback 缓存函数
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

# 4. 代码分割
const HeavyComponent = lazy(() => import('./HeavyComponent'));

# 5. 虚拟列表（长列表）
import { FixedSizeList } from 'react-window';

# 6. 避免内联对象/函数
// 不好
<Child config={{ color: 'red' }} onClick={() => {}} />

// 好
const config = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => {}, []);
<Child config={config} onClick={handleClick} />

# 7. 使用 React DevTools Profiler 找出瓶颈`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现全局状态管理?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# Zustand（推荐，轻量级）
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

# Redux Toolkit
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>;
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Prisma FAQ */}
          <div className="content-card">
            <h2 id="prisma">Prisma 问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何处理 Prisma 迁移错误?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 迁移文件冲突
rm -rf prisma/migrations
npx prisma migrate dev

# 2. 数据库已有数据无法迁移
npx prisma migrate dev --create-only
# 手动编辑迁移文件，然后执行
npx prisma migrate deploy

# 3. 强制重置数据库（开发环境）
npx prisma db push --force-reset

# 4. 生产环境迁移
npx prisma migrate deploy

# 5. 迁移状态重置
npx prisma migrate resolve --rolled-back "migration_name"
npx prisma migrate resolve --applied "migration_name"`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现软删除?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. Schema 添加 deletedAt 字段
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  deletedAt DateTime?

  @@index([deletedAt])
}

# 2. 查询时过滤软删除
const users = await prisma.user.findMany({
  where: { deletedAt: null },
});

# 3. 创建中间件自动过滤
prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'findMany' || params.action === 'findFirst') {
      if (!params.args.where) params.args.where = {};
      params.args.where.deletedAt = null;
    }
  }
  return next(params);
});

# 4. 软删除操作
const user = await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() },
});`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何优化 Prisma 查询性能?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 使用 select 减少返回字段
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true },
});

# 2. 使用 include 避免 N+1
const posts = await prisma.post.findMany({
  include: { author: true, tags: true },
});

# 3. 分页
const users = await prisma.user.findMany({
  skip: 0,
  take: 10,
});

# 4. 索引
model User {
  email String @unique
  @@index([email])
}

# 5. 投影（避免加载不必要数据）
const result = await prisma.user.aggregate({
  _count: { id: true },
});

# 6. 批量操作
await prisma.user.createMany({
  data: users,
  skipDuplicates: true,
});`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何在 Prisma 中实现乐观锁?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 添加 version 字段
model Article {
  id      String @id @default(cuid())
  title   String
  version Int    @default(0)
}

# 2. 实现乐观锁
async function updateArticle(id: string, data: Partial<Article>, expectedVersion: number) {
  const result = await prisma.article.updateMany({
    where: {
      id,
      version: expectedVersion,
    },
    data: {
      ...data,
      version: { increment: 1 },
    },
  });

  if (result.count === 0) {
    throw new Error('Article was modified by another user');
  }

  return prisma.article.findUnique({ where: { id } });
}

# 3. 使用
try {
  const updated = await updateArticle(id, { title: 'New' }, 5);
} catch (e) {
  // 处理冲突：重新获取数据并重试
}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Deployment FAQ */}
          <div className="content-card">
            <h2 id="deployment">部署问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何部署 Next.js 到 Vercel?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. GitHub 集成（推荐）
# - Push 代码到 GitHub
# - 访问 vercel.com/new
# - Import GitHub 仓库
# - Vercel 自动检测 Next.js 项目
# - 配置环境变量
# - Deploy

# 2. Vercel CLI
npm i -g vercel
vercel login
vercel --prod

# 3. 静态导出（可部署到任意平台）
# next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
}

# 4. 环境变量
# Vercel Dashboard → Settings → Environment Variables`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何部署 NestJS 到生产环境?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 1. 构建
npm run build

# 2. Dockerfile
FROM node:20-alpine AS base
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]

# 3. Docker Compose
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何配置 CI/CD?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}`}</code></pre>
              </div>
            </div>
          </div>

          {/* Security FAQ */}
          <div className="content-card">
            <h2 id="security">安全问题</h2>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何防止 SQL 注入?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 使用 Prisma Client（自动参数化）
# 安全
const user = await prisma.user.findUnique({
  where: { email: userInput },
});

# 不安全 - 永远不要这样做
await prisma.$queryRaw\`SELECT * FROM users WHERE email = '\${userInput}'\`;

# 验证用户输入
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const validated = UserSchema.parse(userInput);`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何安全存储密码?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 使用 bcrypt
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// 密码哈希
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// 密码验证
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 使用
const hash = await hashPassword('userPassword');
const isValid = await verifyPassword('userPassword', hash);

// NestJS 使用
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现 CORS?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# Next.js API Route
export async function GET(request: Request) {
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

# NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://example.com'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();

# Express
app.use(cors({
  origin: 'https://example.com',
  credentials: true,
}));`}</code></pre>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span>如何实现 Rate Limiting?</span>
                <span className="faq-icon">▼</span>
              </div>
              <div className="faq-answer">
                <pre><code>{`# 使用 express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 最多 100 请求
  message: 'Too many requests, please try again later.',
});

// 应用到所有路由
app.use(limiter);

// 应用到特定路由
app.use('/api/', limiter);

# NestJS
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    RateLimiterModule.register({
      points: 100,
      duration: 60,
    }),
  ],
})`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/prisma" className="nav-link">← Prisma 完全指南</Link>
            <Link href="/docs/troubleshooting" className="nav-link">错误排查 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
