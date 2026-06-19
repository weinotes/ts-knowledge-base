import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function ReactPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>React</span>
          </div>

          <h1>⚛️ React 完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            React 18+ Hooks、状态管理、性能优化最佳实践
          </p>

          {/* Hooks */}
          <div className="content-card">
            <h2>核心 Hooks</h2>

            <h3>useState</h3>
            <pre><code>{`import { useState } from "react";

// 基础用法
const [count, setCount] = useState(0);

// 复杂状态
const [user, setUser] = useState<{ name: string; age: number } | null>(null);

// 函数式更新
setCount(prev => prev + 1);

// 对象状态 - 需要展开
setUser(prev => ({ ...prev!, name: "新名字" }));

// 多个状态
const [name, setName] = useState("");
const [age, setAge] = useState(0);`}</code></pre>

            <h3>useEffect</h3>
            <pre><code>{`import { useEffect } from "react";

// 基础用法
useEffect(() => {
  console.log("Component mounted");
  
  return () => {
    console.log("Component will unmount");
  };
}, []); // 空依赖数组 - 只运行一次

// 依赖变化时执行
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// 清理异步操作
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const data = await api.getData();
    if (!cancelled) {
      setData(data);
    }
  }
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, []);`}</code></pre>

            <h3>useCallback & useMemo</h3>
            <pre><code>{`import { useCallback, useMemo } from "react";

// useCallback - 缓存函数
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // 空依赖 - 函数引用保持稳定

// useMemo - 缓存计算结果
const sortedItems = useMemo(() => {
  return items
    .filter(item => item.active)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [items]); // 依赖数组变化时才重新计算

// 性能优化示例
const memoizedCallback = useCallback(
  (param) => {
    return expensiveCalculation(param, data);
  },
  [data]
);`}</code></pre>

            <h3>useContext</h3>
            <pre><code>{`import { createContext, useContext, useState } from "react";

// 创建 Context
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggle: () => void;
} | undefined>(undefined);

// Provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const toggle = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用
function ThemeButton() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("必须在 ThemeProvider 内使用");
  
  return (
    <button onClick={context.toggle}>
      当前: {context.theme}
    </button>
  );
}`}</code></pre>

            <h3>useReducer</h3>
            <pre><code>{`import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}`}</code></pre>
          </div>

          {/* State Management */}
          <div className="content-card">
            <h2>状态管理方案</h2>

            <h3>Zustand（推荐）</h3>
            <pre><code>{`import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// 使用
function Profile() {
  const { user, logout } = useUserStore();
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>登出</button>
    </div>
  );
}`}</code></pre>

            <h3>Jotai</h3>
            <pre><code>{`import { atom, useAtom } from "jotai";

// 定义 atoms
const countAtom = atom(0);
const userAtom = atom<User | null>(null);

// 派生状态
const doubledCountAtom = atom((get) => get(countAtom) * 2);

// 使用
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubledCountAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`}</code></pre>
          </div>

          {/* Forms */}
          <div className="content-card">
            <h2>表单处理</h2>

            <h3>React Hook Form + Zod</h3>
            <pre><code>{`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 定义 schema
const schema = z.object({
  email: z.string().email("无效的邮箱"),
  password: z.string().min(8, "密码至少8位"),
  name: z.string().min(2, "名字至少2个字符"),
});

type FormData = z.infer<typeof schema>;

// 表单组件
function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data: FormData) => {
    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="名字" />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register("email")} placeholder="邮箱" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register("password")} type="password" placeholder="密码" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "提交中..." : "注册"}
      </button>
    </form>
  );
}`}</code></pre>
          </div>

          {/* Performance */}
          <div className="content-card">
            <h2>性能优化</h2>

            <pre><code>{`import { lazy, Suspense } from "react";

// 1. 代码分割 - 懒加载
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// 2. React.memo - 缓存组件
const MemoizedComponent = React.memo(({ data }) => {
  return <ExpensiveRender data={data} />;
});

// 3. 虚拟列表 - 大列表优化
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}

// 4. useTransition - 非紧急更新
import { useTransition } from "react";

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  
  startTransition(() => {
    // 标记为非紧急更新
    setResults(searchDatabase(query));
  });
  
  return isPending ? <Spinner /> : <Results results={results} />;
}`}</code></pre>
          </div>

          <div className="page-nav">
            <Link href="/docs/typescript">← TypeScript</Link>
            <Link href="/docs/nextjs">Next.js →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
