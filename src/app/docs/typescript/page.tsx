import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TypeScriptPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <Link href="/docs/roadmap">学习路线</Link>
            <span>/</span>
            <span>TypeScript</span>
          </div>

          <h1>📘 TypeScript 完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            TypeScript 是 JavaScript 的超集，添加了类型系统和其他高级特性
          </p>

          {/* Basics */}
          <div className="content-card">
            <h2>基础类型</h2>
            
            <h3>原始类型</h3>
            <pre><code>{`// 字符串
const name: string = "张三";
const greeting: string = \`Hello, \${name}\`;

// 数字
const age: number = 25;
const pi: number = 3.14;

// 布尔值
const isActive: boolean = true;

// undefined / null
const u: undefined = undefined;
const n: null = null;`}</code></pre>

            <h3>数组</h3>
            <pre><code>{`// 两种声明方式
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["a", "b", "c"];

// 只读数组
const readonly: readonly number[] = [1, 2, 3];`}</code></pre>

            <h3>元组 (Tuple)</h3>
            <pre><code>{`// 固定长度和类型的数组
const tuple: [string, number] = ["hello", 42];

// 可选元素
const optional: [string, number?] = ["hello"];

// 具名元素
type HTTPResponse = [number, string];
const response: HTTPResponse = [200, "OK"];`}</code></pre>

            <h3>枚举 (Enum)</h3>
            <pre><code>{`// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// 字符串枚举
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Done = "DONE"
}

// 常量枚举 (编译时内联)
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00"
}`}</code></pre>
          </div>

          {/* Interfaces vs Types */}
          <div className="content-card">
            <h2>接口与类型别名</h2>

            <div className="alert alert-info">
              <span>💡</span>
              <div>
                <strong>interface vs type</strong><br/>
                接口主要用于定义对象结构，类型别名更灵活，可以定义任何类型
              </div>
            </div>

            <h3>接口 (Interface)</h3>
            <pre><code>{`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // 可选属性
  readonly createdAt: Date;  // 只读属性
}

// 接口继承
interface Admin extends User {
  role: string;
}

// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const search: SearchFunc = (src, sub) => {
  return src.search(sub) > -1;
};`}</code></pre>

            <h3>类型别名 (Type)</h3>
            <pre><code>{`type ID = string | number;
type Point = { x: number; y: number };
type Config = { [key: string]: any };

// 联合类型
type Status = "pending" | "active" | "done";

// 交叉类型
type Employee = Person & { department: string };

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};`}</code></pre>
          </div>

          {/* Generics */}
          <div className="content-card">
            <h2>泛型 (Generics)</h2>

            <p>泛型让我们编写可重用的组件，同时保持类型安全</p>

            <h3>基础泛型</h3>
            <pre><code>{`// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
const num = identity(42);  // 类型推断

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

// 泛型类
class Box<T> {
  private content: T;
  
  constructor(value: T) {
    this.content = value;
  }
  
  get(): T {
    return this.content;
  }
}`}</code></pre>

            <h3>泛型约束</h3>
            <pre><code>{`// 约束必须包含某个属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

logLength("hello");    // OK
logLength([1, 2, 3]);  // OK
logLength(123);        // Error: number 没有 length

// 约束另一个类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "张三", age: 25 };
getProperty(user, "name");  // string
getProperty(user, "age");   // number
getProperty(user, "id");   // Error`}</code></pre>

            <h3>条件类型</h3>
            <pre><code>{`// 基本语法
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// 提取类型
type ExtractArray<T> = T extends Array<infer U> ? U : never;

type C = ExtractArray<string[]>;  // string
type D = ExtractArray<number>;    // never

// ReturnType
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function foo(): string { return "hello"; }
type E = MyReturnType<typeof foo>;  // string`}</code></pre>
          </div>

          {/* Utility Types */}
          <div className="content-card">
            <h2>实用类型 (Utility Types)</h2>

            <pre><code>{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>;

// Required - 所有属性变为必需
type RequiredUser = Required<User>;

// Pick - 挑选属性
type UserPreview = Pick<User, "id" | "name">;

// Omit - 排除属性
type UserWithoutEmail = Omit<User, "email">;

// Record - 键值对
type UserMap = Record<string, User>;

// Exclude - 排除类型
type Status = "pending" | "active" | "done";
type NonPending = Exclude<Status, "pending">;  // "active" | "done"

// Extract - 提取类型
type ExtractActive = Extract<Status, "active" | "done">;  // "active"

// NonNullable - 去除 null 和 undefined
type NonNull = NonNullable<string | null | undefined>;  // string

// ReturnType - 获取函数返回类型
function createUser() { return { name: "张三" }; }
type UserReturn = ReturnType<typeof createUser>;

// Parameters - 获取函数参数类型
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>;  // [string, number]`}</code></pre>
          </div>

          {/* Decorators */}
          <div className="content-card">
            <h2>装饰器 (Decorators)</h2>

            <div className="alert alert-warning">
              <span>⚠️</span>
              <div>
                装饰器是实验性功能，需要在 tsconfig.json 中开启 <code>experimentalDecorators: true</code>
              </div>
            </div>

            <pre><code>{`// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

// 方法装饰器
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

// 属性装饰器
function readonly(target: any, key: string) {
  Object.defineProperty(target, key, {
    writable: false,
    value: target[key]
  });
}

// 参数装饰器
function minLength(target: any, key: string, index: number) {
  // 实现参数验证逻辑
}

// 装饰器工厂
function required(role: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    // 检查用户角色
  };
}`}</code></pre>
          </div>

          {/* Common Errors */}
          <div className="content-card">
            <h2>常见错误与解决方案</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TS2307: Cannot find module 'xxx'</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>模块解析失败，可能是路径错误或包未安装</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 安装缺失的包
npm install xxx

# 2. 检查路径是否正确
import { xxx } from "./utils/xxx";  // 相对路径
import { xxx } from "@/utils/xxx";  // 绝对路径

# 3. 检查 tsconfig.json 配置
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
                <span className="problem-title">TS2339: Property 'xxx' does not exist</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>访问了不存在的属性，或类型定义缺失</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 检查属性名是否正确
obj.name  // 不是 obj.nmae

# 2. 使用可选链
obj?.name

# 3. 类型断言
(obj as User).name

# 4. 安装类型定义
npm install @types/xxx

# 5. 扩展现有类型
declare module "xxx" {
  interface XxxType {
    newProperty: string;
  }
}`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">TS2741: Property 'xxx' is missing</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>对象字面量缺少必需的属性</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 添加缺失的属性
const user: User = {
  id: 1,
  name: "张三",
  email: "zhang@example.com"  // 添加缺失的属性
};

# 2. 将属性标记为可选
interface User {
  age?: number;  // 添加 ? 使其可选
}

# 3. 使用类型断言绕过检查（不推荐）
const user = { id: 1, name: "张三" } as User;`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/roadmap">← 学习路线图</Link>
            <Link href="/docs/react">React 指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
