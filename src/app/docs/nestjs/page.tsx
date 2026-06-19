import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function NestJSPage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>NestJS</span>
          </div>

          <h1>🪹 NestJS 完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            Node.js 企业级框架 - 模块化、依赖注入、装饰器驱动
          </p>

          {/* Core Concepts */}
          <div className="content-card">
            <h2>核心概念</h2>

            <h3>项目结构</h3>
            <pre><code>{`src/
├── common/                    # 公共模块
│   ├── decorators/           # 自定义装饰器
│   ├── filters/              # 异常过滤器
│   ├── guards/               # 守卫
│   ├── interceptors/        # 拦截器
│   ├── pipes/                # 管道
│   └── dto/                   # 数据传输对象
│
├── modules/                  # 业务模块
│   ├── users/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   └── posts/
│
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts`}</code></pre>

            <h3>Controller</h3>
            <pre><code>{`import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  findAll(@Query("page") page: number = 1): User[] {
    return this.usersService.findAll(page);
  }
  
  @Get(":id")
  findOne(@Param("id") id: string): User {
    return this.usersService.findOne(+id);
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }
  
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): User {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @Delete(":id")
  remove(@Param("id") id: string): void {
    this.usersService.remove(+id);
  }
}`}</code></pre>

            <h3>Provider (Service)</h3>
            <pre><code>{`import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  findAll(page = 1): User[] {
    const skip = (page - 1) * 10;
    return this.userRepository.find({ skip, take: 10 });
  }
  
  findOne(id: number): User | null {
    return this.userRepository.findOne({ where: { id } });
  }
  
  create(dto: CreateUserDto): User {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
  
  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }
  
  remove(id: number): void {
    this.userRepository.delete(id);
  }
}`}</code></pre>

            <h3>Module</h3>
            <pre><code>{`import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // 导出供其他模块使用
})
export class UsersModule {}

// 根模块
@Module({
  imports: [UsersModule, PostsModule, AuthModule],
})
export class AppModule {}`}</code></pre>
          </div>

          {/* Dependency Injection */}
          <div className="content-card">
            <h2>依赖注入</h2>

            <pre><code>{`// 构造函数注入（推荐）
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
}

// 属性注入
@Controller("users")
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;
}

// 自定义 Provider
{
  provide: "MY_TOKEN",
  useValue: { name: "test" },
}

// 工厂 Provider
{
  provide: "CONFIG",
  useFactory: async (http: HttpService) => {
    const config = await http.get("/api/config").toPromise();
    return config.data;
  },
  inject: [HttpService],
}

// 类 Provider
{
  provide: UsersService,
  useClass: UsersServiceImpl,
}

// 别名 Provider
{
  provide: "AliasedLogger",
  useExisting: Logger,
}`}</code></pre>
          </div>

          {/* DTOs */}
          <div className="content-card">
            <h2>DTO 与验证</h2>

            <h3>安装依赖</h3>
            <pre><code>{`npm install class-validator class-transformer`}</code></pre>

            <h3>创建 DTO</h3>
            <pre><code>{`import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(2)
  name: string;
  
  @IsString()
  @IsOptional()
  bio?: string;
  
  @IsEnum(["user", "admin"])
  role: "user" | "admin";
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;
}`}</code></pre>

            <h3>启用验证</h3>
            <pre><code>{`// main.ts
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 全局管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // 移除不在 DTO 中的属性
    transform: true,           // 自动转换类型
    forbidNonWhitelisted: true, // 拒绝多余属性
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  await app.listen(3000);
}
bootstrap();`}</code></pre>
          </div>

          {/* Database */}
          <div className="content-card">
            <h2>数据库集成</h2>

            <h3>TypeORM 配置</h3>
            <pre><code>{`// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "secret",
      database: "mydb",
      entities: [User, Post],
      synchronize: true,  // 开发环境，生产环境用 migrations
      logging: true,
    }),
  ],
})
export class AppModule {}

// 定义实体
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  name: string;
  
  @Column({ default: true })
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}`}</code></pre>

            <h3>关联关系</h3>
            <pre><code>{`// 一对多
@Entity()
export class User {
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity()
export class Post {
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: "author_id" })
  author: User;
  
  @Column()
  authorId: number;
}

// 多对多
@Entity()
export class Post {
  @ManyToMany(() => Tag, tag => tag.posts)
  @JoinTable()
  tags: Tag[];
}`}</code></pre>
          </div>

          {/* Authentication */}
          <div className="content-card">
            <h2>认证与授权</h2>

            <h3>安装 Passport</h3>
            <pre><code>{`npm install @nestjs/passport passport passport-jwt @nestjs/jwt
npm install -D @types/passport-jwt`}</code></pre>

            <h3>JWT 策略</h3>
            <pre><code>{`// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "your-secret",
    });
  }
  
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}

// 使用守卫
@Get("profile")
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return req.user;
}

// 角色守卫
@Get("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata("roles", ["admin"])
adminOnly() {}`}</code></pre>

            <h3>Auth Module</h3>
            <pre><code>{`@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "your-secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

// AuthService
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}`}</code></pre>
          </div>

          {/* Common Problems */}
          <div className="content-card">
            <h2>常见问题与解决方案</h2>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Cannot inject 'xxxService'</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>服务未在模块中注册，或模块未正确导入</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 确保服务已在 Module 中注册
@Module({
  providers: [UsersService],  // 添加服务
  exports: [UsersService],    // 导出服务
})
export class UsersModule {}

# 2. 确保模块已导入
@Module({
  imports: [UsersModule],  // 导入模块
})
export class AppModule {}

# 3. 检查循环依赖
# 两个服务互相依赖会导致注入失败
# 使用 forwardRef() 解决
constructor(
  @Inject(forwardRef(() => ServiceA))
  private serviceA: ServiceA,
)`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Circular dependency detected</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>两个服务相互依赖，形成循环引用</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 使用 forwardRef() 解决循环依赖
import { forwardRef } from "@nestjs/common";

@Injectable()
export class ServiceA {
  constructor(
    @Inject(forwardRef(() => ServiceB))
    private serviceB: ServiceB,
  ) {}
}

@Injectable()
export class ServiceB {
  constructor(private serviceA: ServiceA) {}  // 无需 forwardRef
}

# 或者重构代码，消除循环依赖
# 将共享逻辑提取到第三个服务中`}</code></pre>
              </div>
            </div>

            <div className="problem-solution">
              <div className="problem-header">
                <span className="problem-icon">❌</span>
                <span className="problem-title">Validation failed</span>
              </div>
              <div className="problem-content">
                <h4>原因</h4>
                <p>请求数据不符合 DTO 定义的验证规则</p>
                <h4 className="success">解决方案</h4>
                <pre><code>{`# 1. 检查 DTO 定义是否正确
export class CreateUserDto {
  @IsString()
  name: string;  // 确保是字符串类型
}

# 2. 确保 ValidationPipe 已启用
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));

# 3. 查看具体错误信息
# 响应会包含详细的验证错误

# 4. 使用 transformBody 转换类型
app.useGlobalPipes(new ValidationPipe({
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
}));`}</code></pre>
              </div>
            </div>
          </div>

          <div className="page-nav">
            <Link href="/docs/nextjs">← Next.js</Link>
            <Link href="/docs/react">React →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
