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
          <h1>React 完全指南</h1>
          <p className="lead">从组件基础到 Hooks 与状态管理，掌握现代 React 开发</p>

          <div className="table-of-contents">
            <h2>目录</h2>
            <ul>
              <li><a href="#introduction">第一章：React 简介</a></li>
              <li><a href="#components">第二章：组件基础</a></li>
              <li><a href="#jsx">第三章：JSX 语法</a></li>
              <li><a href="#props">第四章：Props 与 State</a></li>
              <li><a href="#hooks">第五章：Hooks 详解</a></li>
              <li><a href="#events">第六章：事件处理</a></li>
              <li><a href="#rendering">第七章：条件与列表渲染</a></li>
              <li><a href="#performance">第八章：性能优化</a></li>
              <li><a href="#state-management">第九章：状态管理</a></li>
            </ul>
          </div>

          <section id="introduction">
            <h2>第一章：React 简介</h2>

            <h3>1.1 什么是 React</h3>
            <p>React 是 Facebook 开发的用于构建用户界面的 JavaScript 库，采用组件化和声明式编程思想。</p>
            <pre><code>{`# React 核心特性
- 组件化开发
- 声明式 UI
- 虚拟 DOM
- 单向数据流
- 丰富的生态系统
- 跨平台支持（React Native）`}</code></pre>

            <h3>1.2 创建 React 项目</h3>
            <pre><code>{`# 使用 Vite 创建
npm create vite@latest my-app -- --template react-ts

# 使用 Next.js 创建
npx create-next-app@latest my-app

# 进入项目并启动
cd my-app
npm install
npm run dev`}</code></pre>
          </section>

          <section id="components">
            <h2>第二章：组件基础</h2>

            <h3>2.1 函数组件</h3>
            <p>函数组件是 React 推荐的主要组件写法，简洁且易于测试。</p>
            <pre><code>{`// 基础函数组件
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

// 默认导出
export default function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}`}</code></pre>

            <h3>2.2 组件组合</h3>
            <pre><code>{`function Header() {
  return <header>网站标题</header>;
}

function Footer() {
  return <footer>版权信息</footer>;
}

function Layout() {
  return (
    <div>
      <Header />
      <main>内容区域</main>
      <Footer />
    </div>
  );
}`}</code></pre>
          </section>

          <section id="jsx">
            <h2>第三章：JSX 语法</h2>

            <h3>3.1 JSX 基本规则</h3>
            <p>JSX 是 JavaScript 的语法扩展，允许在 JS 中编写类似 HTML 的结构。</p>
            <pre><code>{`// 表达式用花括号
const name = 'React';
const element = <h1>Hello, {name}</h1>;

// 属性使用 camelCase
const input = <input className="form-control" readOnly />;

// 必须闭合标签
const img = <img src="photo.jpg" alt="照片" />;

// 返回多个元素需要根节点
return (
  <>
    <p>第一行</p>
    <p>第二行</p>
  </>
);`}</code></pre>

            <h3>3.2 JSX 与条件表达式</h3>
            <pre><code>{`function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? <p>欢迎回来</p> : <p>请先登录</p>}
      {isLoggedIn && <p>您有 3 条消息</p>}
    </div>
  );
}`}</code></pre>
          </section>

          <section id="props">
            <h2>第四章：Props 与 State</h2>

            <h3>4.1 Props 传递数据</h3>
            <p>Props 是父组件向子组件传递数据的方式，只读不可修改。</p>
            <pre><code>{`interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}`}</code></pre>

            <h3>4.2 State 管理状态</h3>
            <pre><code>{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`}</code></pre>
          </section>

          <section id="hooks">
            <h2>第五章：Hooks 详解</h2>

            <h3>5.1 useState</h3>
            <p>useState 用于在函数组件中添加状态。</p>
            <pre><code>{`import { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="请输入姓名"
    />
  );
}`}</code></pre>

            <h3>5.2 useEffect</h3>
            <pre><code>{`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>已运行 {seconds} 秒</p>;
}`}</code></pre>

            <h3>5.3 useContext</h3>
            <pre><code>{`import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}`}</code></pre>
          </section>

          <section id="events">
            <h2>第六章：事件处理</h2>

            <h3>6.1 事件绑定</h3>
            <p>React 事件使用 camelCase 命名，需要传入函数而非字符串。</p>
            <pre><code>{`function ClickExample() {
  function handleClick() {
    console.log('按钮被点击');
  }

  return <button onClick={handleClick}>点击我</button>;
}`}</code></pre>

            <h3>6.2 表单事件</h3>
            <pre><code>{`function FormExample() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('提交表单');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">提交</button>
    </form>
  );
}`}</code></pre>
          </section>

          <section id="rendering">
            <h2>第七章：条件与列表渲染</h2>

            <h3>7.1 条件渲染</h3>
            <pre><code>{`function Notification({ count }: { count: number }) {
  if (count === 0) {
    return <p>没有新消息</p>;
  }

  return <p>您有 {count} 条新消息</p>;
}`}</code></pre>

            <h3>7.2 列表渲染</h3>
            <pre><code>{`interface Item {
  id: number;
  name: string;
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`}</code></pre>
          </section>

          <section id="performance">
            <h2>第八章：性能优化</h2>

            <h3>8.1 React.memo</h3>
            <p>React.memo 用于避免组件在 props 不变时重新渲染。</p>
            <pre><code>{`import { memo } from 'react';

const UserCard = memo(function UserCard({ name }: { name: string }) {
  return <div>{name}</div>;
});

export default UserCard;`}</code></pre>

            <h3>8.2 useMemo 与 useCallback</h3>
            <pre><code>{`import { useMemo, useCallback } from 'react';

function Page({ data }: { data: number[] }) {
  const total = useMemo(() => data.reduce((a, b) => a + b, 0), [data]);
  const handleClick = useCallback(() => console.log(total), [total]);

  return <button onClick={handleClick}>总数: {total}</button>;
}`}</code></pre>
          </section>

          <section id="state-management">
            <h2>第九章：状态管理</h2>

            <h3>9.1 useReducer</h3>
            <p>useReducer 适合管理复杂状态逻辑。</p>
            <pre><code>{`import { useReducer } from 'react';

function reducer(state: number, action: { type: string }) {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    default: return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}`}</code></pre>

            <h3>9.2 Zustand 状态库</h3>
            <pre><code>{`import { create } from 'zustand';

interface BearStore {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));`}</code></pre>
          </section>

          <div className="navigation">
            <Link href="/docs/typescript" className="nav-link">← TypeScript 完全指南</Link>
            <Link href="/docs/nextjs" className="nav-link">Next.js 完全指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
