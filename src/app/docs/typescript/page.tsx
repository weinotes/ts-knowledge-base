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
          <h1>TypeScript 完全指南</h1>
          <p className="lead">从类型基础到高级类型系统，成为 TypeScript 专家</p>

          <div className="table-of-contents">
            <h2>目录</h2>
            <ul>
              <li><a href="#basics">第一章：类型基础</a></li>
              <li><a href="#interfaces">第二章：接口与类型别名</a></li>
              <li><a href="#functions">第三章：函数类型</a></li>
              <li><a href="#generics">第四章：泛型</a></li>
              <li><a href="#utility-types">第五章：工具类型</a></li>
              <li><a href="#advanced">第六章：高级类型</a></li>
              <li><a href="#decorators">第七章：装饰器</a></li>
              <li><a href="#best-practices">第八章：最佳实践</a></li>
              <li><a href="#common-errors">第九章：常见错误</a></li>
            </ul>
          </div>

          <section id="basics">
            <h2>第一章：类型基础</h2>
            
            <h3>1.1 原始类型</h3>
            <p>TypeScript 支持 JavaScript 的所有原始类型，并添加了静态类型检查。</p>
            <pre><code>{`// 原始类型
let name: string = 'Alice';
let age: number = 25;
let isActive: boolean = true;
let notDefined: undefined = undefined;
let nothing: null = null;

// Symbol - 创建唯一的标识符
const sym: symbol = Symbol('id');

// BigInt - 大整数
const bigNum: bigint = 100n;`}</code></pre>

            <h3>1.2 数组类型</h3>
            <pre><code>{`// 数组声明方式
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ['a', 'b', 'c'];  // 泛型语法

// 只读数组
let readonly: ReadonlyArray<number> = [1, 2, 3];
// readonly numbers: readonly [1, 2, 3];  // 元组语法

// 多维数组
let matrix: number[][] = [[1, 2], [3, 4]];`}</code></pre>

            <h3>1.3 元组类型</h3>
            <p>元组是固定长度和类型的数组。</p>
            <pre><code>{`// 基本元组
let tuple: [string, number, boolean] = ['hello', 42, true];

// 可选元素
let optionalTuple: [string, number?];
optionalTuple = ['hello'];
optionalTuple = ['hello', 42];

// 命名元组（提高可读性）
type HTTPResponse = [number, string, Record<string, any>?];
const response: HTTPResponse = [200, 'OK', { timestamp: Date.now() }];`}</code></pre>

            <h3>1.4 枚举类型</h3>
            <pre><code>{`// 数字枚举
enum Status {
  Pending,    // 0
  Active,    // 1
  Completed, // 2
}

// 字符串枚举
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// 常量枚举（编译时内联）
const enum Color {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
}

// 异构枚举（混合）
enum BooleanLike {
  Yes = 1,
  No = 0,
}`}</code></pre>

            <h3>1.5 Any 与 Unknown</h3>
            <pre><code>{`// any - 任意类型，失去类型检查
let value: any = 'hello';
value = 42;  // OK
value.foo(); // OK，编译器不报错

// unknown - 未知类型，更安全
let unknownValue: unknown = 'hello';
// unknownValue.foo(); // Error: Object is of type 'unknown'

// 使用类型守卫
if (typeof unknownValue === 'string') {
  console.log(unknownValue.toUpperCase()); // OK
}

// 类型断言
const str = unknownValue as string;
console.log(str.toUpperCase()); // OK`}</code></pre>

            <h3>1.6 Void、Never、Object</h3>
            <pre><code>{`// void - 表示没有返回值
function logMessage(message: string): void {
  console.log(message);
  // 没有 return 语句
}

// never - 表示永不返回
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// object - 非原始类型
let obj: object = { key: 'value' };
let arr: object = [1, 2, 3];
let func: object = function() {};`}</code></pre>
          </section>

          <section id="interfaces">
            <h2>第二章：接口与类型别名</h2>

            <h3>2.1 接口基础</h3>
            <pre><code>{`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;       // 可选属性
  readonly createdAt: Date;  // 只读属性
}

// 实现接口
class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public readonly createdAt: Date = new Date()
  ) {}
}`}</code></pre>

            <h3>2.2 索引签名</h3>
            <pre><code>{`// 字符串索引签名
interface StringMap {
  [key: string]: string;
}

// 数字索引签名
interface NumberArray {
  [index: number]: string;
}

// 混合索引
interface MixedIndex {
  [key: string]: string | number;
  length: number;  // 兼容
  name: string;    // 兼容
}`}</code></pre>

            <h3>2.3 接口继承</h3>
            <pre><code>{`interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 多重继承
interface Service extends Dog, Animal {
  serviceYears: number;
}

// 继承与覆盖
interface Base {
  prop: string | number;
}

interface Derived extends Base {
  prop: number;  // 收窄类型
}`}</code></pre>

            <h3>2.4 函数类型接口</h3>
            <pre><code>{`interface FunctionType {
  (x: number, y: number): number;
}

const add: FunctionType = (a, b) => a + b;

// 可索引接口
interface Callable {
  (arg: string): void;
  [key: string]: any;
}`}</code></pre>

            <h3>2.5 类型别名</h3>
            <pre><code>{`// 基本类型别名
type ID = string | number;

// 元组类型别名
type Point = [number, number];
type Callback = (error: Error | null, result?: any) => void;

// 联合类型别名
type StringOrNumber = string | number;
type Serializable = string | number | object;

// 交叉类型别名
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;`}</code></pre>

            <h3>2.6 接口 vs 类型别名</h3>
            <pre><code>{`// 接口 - 推荐用于对象结构
interface Config {
  endpoint: string;
  apiKey: string;
}

// 类型别名 - 用于复杂类型
type ConfigOrFallback = Config | { fallback: string };

// 接口可以声明合并
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}
// Animal 现在有两个属性

// 类型别名可以用 typeof
const config = { endpoint: '/api', apiKey: 'key' };
type Config = typeof config;`}</code></pre>
          </section>

          <section id="functions">
            <h2>第三章：函数类型</h2>

            <h3>3.1 函数类型声明</h3>
            <pre><code>{`// 函数声明
function greet(name: string): string {
  return 'Hello, ' + name;
}

// 函数表达式
const greet2 = function(name: string): string {
  return 'Hello, ' + name;
};

// 箭头函数
const greet3 = (name: string): string => 'Hello, ' + name;

// 完整类型签名
let myGreeter: (name: string) => string;
myGreeter = (name) => 'Hello, ' + name;`}</code></pre>

            <h3>3.2 可选参数与默认参数</h3>
            <pre><code>{`// 可选参数
function buildName(first: string, last?: string): string {
  return last ? first + ' ' + last : first;
}

// 默认参数
function connect(host: string, port: number = 8080): string {
  return host + ':' + port;
}

// 剩余参数
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}`}</code></pre>

            <h3>3.3 泛型函数</h3>
            <pre><code>{`// 单个泛型参数
function identity<T>(arg: T): T {
  return arg;
}

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// 约束泛型
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}`}</code></pre>

            <h3>3.4 函数重载</h3>
            <pre><code>{`// 函数重载签名
function reverse(str: string): string;
function reverse(arr: number[]): number[];
function reverse(arr: string[]): string[];

// 实现签名
function reverse(arr: any): any {
  if (typeof arr === 'string') {
    return arr.split('').reverse().join('');
  }
  return Array.isArray(arr) ? arr.reverse() : arr;
}`}</code></pre>

            <h3>3.5 this 类型</h3>
            <pre><code>{`// 显式 this 参数
interface UIElement {
  addClickListener(onClick: (this: void, event: Event) => void): void;
}

// 类中的 this
class Handler {
  info: string = '';
  handleClick(this: Handler, event: Event): void {
    this.info = event.type;
  }
}`}</code></pre>

            <h3>3.6 回调函数类型</h3>
            <pre><code>{`// 异步回调类型
type AsyncCallback<T> = (error: Error | null, result?: T) => void;

// Promise 类型
async function fetchData(): Promise<User> {
  return new Promise((resolve) => {
    resolve({ id: 1, name: 'Alice' });
  });
}

// 泛型 Promise
async function fetchById<T>(id: number): Promise<T> {
  const response = await fetch('/api/' + id);
  return response.json();
}`}</code></pre>
          </section>

          <section id="generics">
            <h2>第四章：泛型</h2>

            <h3>4.1 泛型基础</h3>
            <pre><code>{`// 泛型函数
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

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

            <h3>4.2 泛型约束</h3>
            <pre><code>{`// 继承约束
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// keyof 约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 多重约束
function combine<T extends HasLength & HasName, U extends HasLength>(t: T, u: U) {
  console.log(t.length + u.length);
}`}</code></pre>

            <h3>4.3 泛型默认值</h3>
            <pre><code>{`interface Response<T = any, E = Error> {
  data: T;
  error: E | null;
}

// 使用默认值
const success: Response<string> = { data: 'ok', error: null };

// 覆盖默认值
const custom: Response<User, string> = { data: user, error: 'Failed' };`}</code></pre>

            <h3>4.4 条件类型与泛型</h3>
            <pre><code>{`// 条件类型
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 提取数组元素类型
type ElementOf<T> = T extends Array<infer U> ? U : never;

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`}</code></pre>

            <h3>4.5 泛型工具类</h3>
            <pre><code>{`// 链式调用
class Chain<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  map<U>(fn: (v: T) => U): Chain<U> {
    return new Chain(fn(this.value));
  }
  
  get(): T {
    return this.value;
  }
}`}</code></pre>
          </section>

          <section id="utility-types">
            <h2>第五章：工具类型</h2>

            <h3>5.1 通用工具类型</h3>
            <pre><code>{`interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<PartialUser>;

// Readonly - 所有属性只读
type ReadonlyUser = Readonly<User>;

// Pick - 选择属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除属性
type UserWithoutId = Omit<User, 'id'>;`}</code></pre>

            <h3>5.2 Record</h3>
            <pre><code>{`// Record 创建键值对类型
type UserRole = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

// 嵌套 Record
type NestedRecord = Record<string, Record<string, number>>;`}</code></pre>

            <h3>5.3 Exclude 与 Extract</h3>
            <pre><code>{`type Status = 'pending' | 'active' | 'completed' | 'failed';

// Exclude - 排除类型
type NonPending = Exclude<Status, 'pending'>;  // 'active' | 'completed' | 'failed'

// Extract - 提取类型
type SuccessStatus = Extract<Status, 'active' | 'completed'>;  // 'active' | 'completed'

// 与联合类型结合
type A = string | number | boolean;
type B = Exclude<A, boolean>;  // string | number`}</code></pre>

            <h3>5.4 NonNullable</h3>
            <pre><code>{`type Maybe<T> = T | null | undefined;

type Definite<T> = NonNullable<T>;

type A = Maybe<string>;    // string | null | undefined
type B = Definite<A>;      // string

// 实际应用：清理 API 响应
type APIResponse<T> = {
  data: T | null;
  error: string | null;
};

type CleanResponse<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};`}</code></pre>

            <h3>5.5 ReturnType 与 Parameters</h3>
            <pre><code>{`function createUser(name: string, age: number) {
  return { id: Date.now(), name, age };
}

// 获取函数参数类型
type UserParams = Parameters<typeof createUser>;
// [name: string, age: number]

// 获取单个参数
type FirstParam = UserParams[0];  // string
type SecondParam = UserParams[1];  // number

// 获取返回类型
type User = ReturnType<typeof createUser>;
// { id: number; name: string; age: number }`}</code></pre>

            <h3>5.6 实例类型</h3>
            <pre><code>{`class UserService {
  private users: User[] = [];
  
  add(user: User): void {
    this.users.push(user);
  }
  
  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

// 获取构造函数参数类型
type ServiceConstructor = ConstructorParameters<typeof UserService>;

// 获取实例类型
type ServiceInstance = InstanceType<typeof UserService>;`}</code></pre>
          </section>

          <section id="advanced">
            <h2>第六章：高级类型</h2>

            <h3>6.1 条件类型</h3>
            <pre><code>{`// 基本条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>;  // string[] | number[]

// 非分布式（用元组包装）
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Single = ToArrayNonDist<string | number>;  // (string | number)[]`}</code></pre>

            <h3>6.2 映射类型</h3>
            <pre><code>{`// 基本映射
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 泛型映射
type Mapped<T> = {
  [P in keyof T]: T[P];
};

// 添加可选和只读
type WithOptional<T> = {
  [P in keyof T]?: T[P];
};

type WithReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 键名映射
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};`}</code></pre>

            <h3>6.3 模板字面量类型</h3>
            <pre><code>{`// 基本模板字面量
type World = 'world';
type Greeting = \`Hello, \${World}!\`;  // 'Hello, world!'

// 联合类型展开
type Direction = 'top' | 'bottom' | 'left' | 'right';
type EventName = \`on\${Capitalize<Direction>}\`;  
// 'onTop' | 'onBottom' | 'onLeft' | 'onRight'

// 提取路径
type Path = '/users/:id/posts/:postId';
type ExtractParams<T> = T extends \`\${string}:\${infer P}/\${infer Rest}\`
  ? P | ExtractParams<\`\${string}/\${Rest}\`>
  : T extends \`\${string}:\${infer P}\`
  ? P
  : never;`}</code></pre>

            <h3>6.4 递归类型</h3>
            <pre><code>{`// JSON 类型
type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONValue[] | { [key: string]: JSONValue };
type JSONObject = { [key: string]: JSONValue };

// 深度只读
type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

// 深度可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};`}</code></pre>

            <h3>6.5 协变与逆变</h3>
            <pre><code>{`// 协变（输出位置）
type Producer<T> = () => T;
type Producer<Dog> extends Producer<Animal>  // 正确

// 逆变（输入位置）
type Consumer<T> = (arg: T) => void;
type Consumer<Animal> extends Consumer<Dog>  // 正确

// TypeScript 默认在函数参数上是双向协变
interface Callback<T> {
  (value: T): void;
}

declare function forEach(arr: any[], callback: Callback<any>): void;`}</code></pre>

            <h3>6.6 类型守卫</h3>
            <pre><code>{`// 自定义类型守卫
function isString(value: any): value is string {
  return typeof value === 'string';
}

// 类型谓词
function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// in 操作符守卫
interface Admin {
  role: 'admin';
  permissions: string[];
}

interface User {
  name: string;
}

function isAdmin(obj: Admin | User): obj is Admin {
  return 'role' in obj && obj.role === 'admin';
}`}</code></pre>
          </section>

          <section id="decorators">
            <h2>第七章：装饰器</h2>
            <p>注意：装饰器是实验性功能，需要在 tsconfig.json 中启用 "experimentalDecorators": true</p>

            <h3>7.1 类装饰器</h3>
            <pre><code>{`// 简单装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 装饰器工厂
function log(prefix: string) {
  return function(constructor: Function) {
    console.log(\`\${prefix} \${constructor.name} defined\`);
  };
}

@log('INFO:')
@sealed
class MyClass {}

// 装饰器组合
@first @second
class MyClass {}

// 执行顺序：second -> first（从下到上）`}</code></pre>

            <h3>7.2 方法装饰器</h3>
            <pre><code>{`// 方法装饰器
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 日志装饰器
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${methodName} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${methodName} returned\`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}`}</code></pre>

            <h3>7.3 属性装饰器</h3>
            <pre><code>{`// 属性装饰器
function format(target: any, propertyKey: string) {
  let value: string;
  
  const getter = () => value;
  const setter = (newValue: string) => {
    value = newValue.toUpperCase();
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

class Person {
  @format
  name: string = '';
}

// 访问器装饰器
function minLength(value: number) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.set;
    descriptor.set = function(v: string) {
      if (v.length < value) {
        throw new Error(\`Minimum length is \${value}\`);
      }
      original.call(this, v);
    };
    return descriptor;
  };
}`}</code></pre>

            <h3>7.4 参数装饰器</h3>
            <pre><code>{`// 参数装饰器
function required(target: any, methodName: string, paramIndex: number) {
  console.log(\`Parameter at index \${paramIndex} in \${methodName} is required\`);
}

// 参数装饰器工厂
function validate(target: any, methodName: string, paramIndex: number) {
  const original = target[methodName];
  
  target[methodName] = function(...args: any[]) {
    // 验证逻辑
    if (paramIndex >= args.length || args[paramIndex] === undefined) {
      throw new Error('Required parameter missing');
    }
    return original.apply(this, args);
  };
}

class UserService {
  create(@required name: string, @required email: string) {
    // ...
  }
}`}</code></pre>
          </section>

          <section id="best-practices">
            <h2>第八章：最佳实践</h2>

            <h3>8.1 配置建议</h3>
            <pre><code>{`// tsconfig.json 推荐配置
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  }
}`}</code></pre>

            <h3>8.2 命名规范</h3>
            <pre><code>{`// 类型命名
interface UserProps { ... }     // 接口
type UserState = { ... };       // 类型别名
class UserService { ... }       // 类
enum UserRole { ... }          // 枚举
type UserId = string | number;  // 类型别名

// 泛型命名
function identity<T>(arg: T): T { ... }           // 单字母
function Map<K, V>(key: K, value: V): Map<K, V> { ... }  // 描述性

// 布尔值命名
isActive, hasPermission, canEdit, shouldUpdate`}</code></pre>

            <h3>8.3 类型设计原则</h3>
            <pre><code>{`// 1. 优先使用接口
interface Config { ... }

// 2. 使用类型别名处理联合/交叉类型
type Result = Success | Error;
type Props = BaseProps & ExtraProps;

// 3. 使用 readonly 防止意外修改
interface Point {
  readonly x: number;
  readonly y: number;
}

// 4. 使用 satisfies 验证但不收窄
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>;`}</code></pre>

            <h3>8.4 类型断言安全</h3>
            <pre><code>{`// 不安全的断言
const str: any = 'hello';
const len: number = str.length as number;  // OK，但可能出错

// 安全的类型守卫
function isString(value: any): value is string {
  return typeof value === 'string';
}

if (isString(str)) {
  console.log(str.length);  // 安全
}

// 使用 unknown 进行安全断言
function safeAssert(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  throw new Error('Not a string');
}`}</code></pre>
          </section>

          <section id="common-errors">
            <h2>第九章：常见错误</h2>

            <h3>9.1 TS7006 - 隐式 any</h3>
            <pre><code>{`// 错误：Parameter 'x' implicitly has an 'any' type
function add(x, y) {
  return x + y;
}

// 修复
function add(x: number, y: number): number {
  return x + y;
}`}</code></pre>

            <h3>9.2 TS2322 - 类型不匹配</h3>
            <pre><code>{`// 错误：Type 'string' is not assignable to type 'number'
let num: number = '42';

// 修复
let num: number = Number('42');
let num2: number = 42;`}</code></pre>

            <h3>9.3 TS2339 - 属性不存在</h3>
            <pre><code>{`// 错误：Property 'name' does not exist on type '{ age: number }'
const obj = { age: 25 };
console.log(obj.name);

// 修复：添加属性或使用类型断言
console.log((obj as any).name);`}</code></pre>

            <h3>9.4 TS2538 - 不能将 undefined 赋值给非 undefined</h3>
            <pre><code>{`// 错误：Argument of type 'undefined' is not assignable
function greet(name: string) {
  console.log('Hello, ' + name);
}

greet(undefined);

// 修复：使用可选参数或提供默认值
function greet(name?: string) {
  console.log('Hello, ' + (name ?? 'World'));
}`}</code></pre>

            <h3>9.5 TS2345 - 参数类型不匹配</h3>
            <pre><code>{`// 错误：Argument of type 'string' is not assignable to type 'number'
function square(n: number): number {
  return n * n;
}

console.log(square('5'));

// 修复
console.log(square(Number('5')));
console.log(square(5));`}</code></pre>

            <h3>9.6 TS2722 - 可能未初始化</h3>
            <pre><code>{`// 错误：Property 'name' has no initializer
class User {
  name: string;
}

// 修复：使用 definite assignment 或构造函数
class User {
  name!: string;  // 明确知道会在其他地方初始化
}

// 或
class User {
  name: string;
  
  constructor() {
    this.name = '';
  }
}`}</code></pre>
          </section>

          <div className="navigation">
            <Link href="/docs" className="nav-link">← 返回文档首页</Link>
            <Link href="/docs/nextjs" className="nav-link">Next.js 完全指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
