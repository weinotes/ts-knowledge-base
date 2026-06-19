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
          <h1>NestJS 完全指南</h1>
          <p className="lead">企业级 Node.js 框架，从基础到高级架构模式</p>

          <div className="table-of-contents">
            <h2>目录</h2>
            <ul>
              <li><a href="#introduction">第一章：NestJS 简介</a></li>
              <li><a href="#modules">第二章：模块系统</a></li>
              <li><a href="#controllers">第三章：控制器</a></li>
              <li><a href="#providers">第四章：提供者与服务</a></li>
              <li><a href="#middleware">第五章：中间件</a></li>
              <li><a href="#pipes">第六章：管道与验证</a></li>
              <li><a href="#guards">第七章：守卫与授权</a></li>
              <li><a href="#interceptors">第八章：拦截器</a></li>
              <li><a href="#database">第九章：数据库集成</a></li>
              <li><a href="#authentication">第十章：认证授权</a></li>
              <li><a href="#websockets">第十一章：WebSocket</a></li>
              <li><a href="#microservices">第十二章：微服务</a></li>
              <li><a href="#testing">第十三章：测试</a></li>
              <li><a href="#patterns">第十四章：设计模式</a></li>
            </ul>
          </div>

          <section id="introduction">
            <h2>第一章：NestJS 简介</h2>

            <h3>1.1 什么是 NestJS</h3>
            <p>NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用现代 TypeScript，结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应编程）的元素。</p>
            <pre><code>{`// NestJS 核心概念
- 模块化架构（Module）
- 依赖注入（DI）
- 装饰器驱动
- 平台无关（Express / Fastify）
- 内置 TypeScript 支持
- 类似 Angular 的架构`}</code></pre>

            <h3>1.2 创建项目</h3>
            <pre><code>{`# 使用 CLI 创建
npm i -g @nestjs/cli
nest new project-name

# 手动创建
mkdir project-name && cd project-name
npm init -y
npm install @nestjs/core @nestjs/common @nestjs/platform-express
npm install reflect-metadata rxjs
npm install -D @types/node typescript ts-node nodemon

# CLI 常用命令
nest g module users        # 生成模块
nest g controller users    # 生成控制器
nest g service users       # 生成服务
nest g resource users      # 生成完整 CRUD 资源

# 项目结构
src/
├── app.module.ts          # 根模块
├── app.controller.ts      # 根控制器
├── app.service.ts         # 根服务
├── main.ts                # 入口文件
└── users/                 # 用户模块
    ├── users.module.ts
    ├── users.controller.ts
    ├── users.service.ts
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    └── entities/
        └── user.entity.ts`}</code></pre>

            <h3>1.3 入口文件</h3>
            <pre><code>{`// main.ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // 自动删除非白名单属性
      forbidNonWhitelisted: true, // 非白名单属性报错
      transform: true,          // 自动类型转换
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })

  // 全局前缀
  app.setGlobalPrefix('api')

  // Swagger 文档
  // npm install @nestjs/swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(3000)
}
bootstrap()`}</code></pre>

            <h3>1.4 根模块</h3>
            <pre><code>{`// app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    // 配置模块（全局）
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}`}</code></pre>
          </section>

          <section id="modules">
            <h2>第二章：模块系统</h2>

            <h3>2.1 模块基础</h3>
            <pre><code>{`// users/users.module.ts
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],           // 导入其他模块
  controllers: [UsersController],     // 控制器
  providers: [UsersService],          // 提供者（服务）
  exports: [UsersService],            // 导出供其他模块使用
})
export class UsersModule {}

// 模块是组织代码的基本单元
// - 每个应用至少有一个根模块
// - 模块可以导入其他模块
// - 模块可以导出提供者`}</code></pre>

            <h3>2.2 全局模块</h3>
            <pre><code>{`// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()  // 标记为全局模块
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // 全局可用
})
export class PrismaModule {}

// 其他模块无需 import PrismaModule 即可使用 PrismaService`}</code></pre>

            <h3>2.3 动态模块</h3>
            <pre><code>{`// config/config.module.ts
import { Module, DynamicModule } from '@nestjs/common'

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      global: options.isGlobal,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    }
  }

  // 用于特性模块
  static forFeature(options: FeatureOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'FEATURE_CONFIG',
          useValue: options,
        },
      ],
    }
  }
}

// 使用
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forFeature({ namespace: 'users' }),
  ],
})
export class AppModule {}`}</code></pre>

            <h3>2.4 模块懒加载</h3>
            <pre><code>{`// 使用 LazyModuleLoader 实现懒加载
import { Module } from '@nestjs/common'
import { LazyModuleLoader } from '@nestjs/core'

@Module({
  imports: [LazyModuleLoader],
})
export class AppModule {}

// 在服务中懒加载模块
@Injectable()
export class AppService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async onDemand() {
    const { LazyModule } = await import('./lazy.module')
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule)
    const service = moduleRef.get(LazyService)
    return service.doSomething()
  }
}`}</code></pre>
          </section>

          <section id="controllers">
            <h2>第三章：控制器</h2>

            <h3>3.1 基础控制器</h3>
            <pre><code>{`// users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usersService.findAll({ page, limit })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}`}</code></pre>

            <h3>3.2 请求装饰器</h3>
            <pre><code>{`import { Req, Res, Headers, Ip, HostParam } from '@nestjs/common'

@Controller('demo')
export class DemoController {
  @Get()
  demo(
    @Req() request: Request,       // 完整请求对象
    @Res() response: Response,     // 响应对象（注意：使用后需手动返回）
    @Body() body: any,             // 请求体
    @Param('id') id: string,       // 路径参数
    @Query('sort') sort: string,   // 查询参数
    @Headers('authorization') auth: string, // 请求头
    @Ip() ip: string,              // 客户端 IP
    @HostParam('api') api: string, // 主机参数
  ) {
    // ...
  }
}

// 自定义装饰器
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    return data ? user?.[data] : user
  },
)

// 使用
@Get('profile')
getProfile(@User() user: UserEntity) {
  return user
}

@Get('email')
getEmail(@User('email') email: string) {
  return { email }
}`}</code></pre>

            <h3>3.3 响应格式</h3>
            <pre><code>{`// 标准响应格式
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// 分页响应
@Get()
async findAll(@Query() pagination: PaginationDto) {
  const { page, limit } = pagination
  const [data, total] = await this.usersService.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// 流式响应
@Get('stream')
streamData(@Res() res: Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const interval = setInterval(() => {
    res.write('data: ' + JSON.stringify({ time: new Date() }) + '\\n\\n')
  }, 1000)

  res.on('close', () => clearInterval(interval))
}

// 文件下载
@Get('download')
downloadFile(@Res() res: Response) {
  const file = createReadStream('/path/to/file.pdf')
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=file.pdf')
  file.pipe(res)
}`}</code></pre>

            <h3>3.4 异常处理</h3>
            <pre><code>{`// 内置异常
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'

@Get(':id')
async findOne(@Param('id') id: string) {
  const user = await this.usersService.findOne(id)
  if (!user) {
    throw new NotFoundException('User not found')
  }
  return user
}

// 自定义异常
export class BusinessException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message)
  }
}

// 全局异常过滤器
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception instanceof Error ? exception.message : 'Internal error',
    })
  }
}

// 注册全局过滤器
app.useGlobalFilters(new AllExceptionsFilter())`}</code></pre>
          </section>

          <section id="providers">
            <h2>第四章：提供者与服务</h2>

            <h3>4.1 基础服务</h3>
            <pre><code>{`// users/users.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
  }

  async findAll(params: { page: number; limit: number }) {
    const { page, limit } = params
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: { id: true, email: true, name: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ])

    return { data, total, page, limit }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id) // 确保存在
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: { id: true, email: true, name: true },
    })
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.user.delete({ where: { id } })
  }
}`}</code></pre>

            <h3>4.2 依赖注入</h3>
            <pre><code>{`// 构造函数注入（推荐）
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}
}

// 属性注入
@Injectable()
export class UsersService {
  @Inject('LOGGER')
  private readonly logger: LoggerService
}

// 自定义提供者
@Module({
  providers: [
    // 使用值
    {
      provide: 'CONFIG',
      useValue: { apiVersion: 'v1' },
    },

    // 使用工厂函数
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (config: ConfigService) => {
        return createConnection(config.get('DATABASE_URL'))
      },
      inject: [ConfigService],
    },

    // 使用已有提供者
    {
      provide: 'LOGGER',
      useClass: CustomLoggerService,
    },

    // 别名
    {
      provide: 'APP_SERVICE',
      useExisting: UsersService,
    },
  ],
})
export class AppModule {}

// 异步工厂提供者
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ASYNC_SERVICE',
      useFactory: async (config: ConfigService) => {
        const service = new AsyncService()
        await service.initialize(config.get('API_KEY'))
        return service
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}`}</code></pre>

            <h3>4.3 作用域</h3>
            <pre><code>{`// 默认：单例（Singleton）- 整个应用共享一个实例
@Injectable()
export class UsersService {}

// 请求作用域 - 每个请求创建新实例
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
}

// 瞬态作用域 - 每次注入创建新实例
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {}

// 模块级作用域设置
@Module({
  providers: [UsersService],
  scope: Scope.REQUEST,  // 影响模块内所有提供者
})
export class UsersModule {}`}</code></pre>

            <h3>4.4 生命周期钩子</h3>
            <pre><code>{`import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
} from '@nestjs/common'

@Injectable()
export class PrismaService
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnApplicationBootstrap,
    OnApplicationShutdown
{
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // 模块初始化时调用
  async onModuleInit() {
    await this.prisma.$connect()
    console.log('Database connected')
  }

  // 模块销毁时调用
  async onModuleDestroy() {
    await this.prisma.$disconnect()
    console.log('Database disconnected')
  }

  // 应用启动后调用
  onApplicationBootstrap() {
    console.log('Application bootstrapped')
  }

  // 应用关闭前调用
  beforeApplicationShutdown(signal?: string) {
    console.log('Shutting down...', signal)
  }

  // 应用关闭时调用
  onApplicationShutdown(signal?: string) {
    console.log('Application shutdown', signal)
  }

  // 启用关闭钩子
  // main.ts: app.enableShutdownHooks()
}`}</code></pre>
          </section>

          <section id="middleware">
            <h2>第五章：中间件</h2>

            <h3>5.1 基础中间件</h3>
            <pre><code>{`// logger/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request:', {
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString(),
    })
    next()
  }
}

// 在模块中注册
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users')  // 应用到 /users 路由
      // .forRoutes({ path: 'users', method: RequestMethod.GET })
      // .exclude('users/admin')  // 排除路由
  }
}`}</code></pre>

            <h3>5.2 函数式中间件</h3>
            <pre><code>{`// 简单中间件（不需要依赖注入时使用）
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request:', req.method, req.url)
  next()
}

// 多个中间件
consumer.apply(cors(), helmet(), logger).forRoutes('*')`}</code></pre>

            <h3>5.3 请求日志中间件</h3>
            <pre><code>{`import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    const { method, originalUrl, ip } = req
    const userAgent = req.get('user-agent') || ''

    res.on('finish', () => {
      const duration = Date.now() - start
      const { statusCode } = res

      console.log({
        method,
        url: originalUrl,
        status: statusCode,
        duration: duration + 'ms',
        ip,
        userAgent,
      })
    })

    next()
  }
}`}</code></pre>
          </section>

          <section id="pipes">
            <h2>第六章：管道与验证</h2>

            <h3>6.1 内置管道</h3>
            <pre><code>{`import { ParseIntPipe, ParseBoolPipe, ParseUUIDPipe, ParseEnumPipe, DefaultValuePipe } from '@nestjs/common'

// 解析整数
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id 自动转为 number
  return this.usersService.findOne(id)
}

// 解析 UUID
@Get(':id')
findOne(@Param('id', new ParseUUIDPipe()) id: string) {
  return this.usersService.findOne(id)
}

// 默认值
@Get()
findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
  return this.usersService.findAll(page)
}

// 解析枚举
enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

@Get()
findAll(@Query('sort', new ParseEnumPipe(SortOrder)) sort: SortOrder) {
  // sort 只能是 'asc' 或 'desc'
}`}</code></pre>

            <h3>6.2 DTO 与 class-validator</h3>
            <pre><code>{`// npm install class-validator class-transformer

// dto/create-user.dto.ts
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  Matches,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message: 'Password must contain uppercase, lowercase and number',
  })
  password!: string

  @IsOptional()
  @IsEnum(['user', 'admin'])
  role?: 'user' | 'admin'

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString()
  bio?: string
}

// dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // 所有属性变为可选
}

// 自定义验证装饰器
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 8 characters with uppercase, lowercase and number'
        },
      },
    })
  }
}`}</code></pre>

            <h3>6.3 自定义管道</h3>
            <pre><code>{`import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntSafePipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      throw new BadRequestException('Invalid number')
    }
    return num
  }
}

// 文件验证管道
@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required')
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type')
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File too large')
    }

    return file
  }
}`}</code></pre>
          </section>

          <section id="guards">
            <h2>第七章：守卫与授权</h2>

            <h3>7.1 认证守卫</h3>
            <pre><code>{`// auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查是否为公开路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}

// 公开路由装饰器
import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

// 使用
@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  login() {
    // 无需认证
  }
}`}</code></pre>

            <h3>7.2 角色守卫</h3>
            <pre><code>{`// auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}

// 角色装饰器
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

// 使用
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    // 仅 admin 角色可访问
  }
}`}</code></pre>

            <h3>7.3 全局注册守卫</h3>
            <pre><code>{`// main.ts 或模块中
import { APP_GUARD } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,  // 全局认证守卫
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,    // 全局角色守卫
    },
  ],
})
export class AppModule {}

// 注意：全局守卫的执行顺序是按注册顺序
// JwtAuthGuard -> RolesGuard
// 所以 RolesGuard 可以访问到 JwtAuthGuard 设置的 request.user`}</code></pre>
          </section>

          <section id="interceptors">
            <h2>第八章：拦截器</h2>

            <h3>8.1 日志拦截器</h3>
            <pre><code>{`import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url } = request
    const now = Date.now()

    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(\`\${method} \${url} - \${Date.now() - now}ms\`)
        }),
      )
  }
}`}</code></pre>

            <h3>8.2 响应转换拦截器</h3>
            <pre><code>{`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, map } from 'rxjs'

export interface Response<T> {
  success: boolean
  data: T
  timestamp: string
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    )
  }
}

// 全局注册
app.useGlobalInterceptors(new TransformInterceptor())`}</code></pre>

            <h3>8.3 超时拦截器</h3>
            <pre><code>{`import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutMs: number = 5000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException())
        }
        return throwError(() => err)
      }),
    )
  }
}

// 使用
@UseInterceptors(new TimeoutInterceptor(3000))
@Get('slow')
slowEndpoint() {
  return this.service.slowOperation()
}`}</code></pre>

            <h3>8.4 缓存拦截器</h3>
            <pre><code>{`// npm install cache-manager
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, { data: any; expiry: number }>()

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const key = request.method + ':' + request.url

    const cached = this.cache.get(key)
    if (cached && cached.expiry > Date.now()) {
      return of(cached.data)
    }

    return next.handle().pipe(
      tap(data => {
        this.cache.set(key, {
          data,
          expiry: Date.now() + 60000, // 1 分钟缓存
        })
      }),
    )
  }
}`}</code></pre>
          </section>

          <section id="database">
            <h2>第九章：数据库集成</h2>

            <h3>9.1 Prisma 集成</h3>
            <pre><code>{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  passwordHash String
  role         Role     @default(USER)
  posts        Post[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}

// prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}`}</code></pre>

            <h3>9.2 TypeORM 集成</h3>
            <pre><code>{`// npm install @nestjs/typeorm typeorm pg
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([User, Post]),
  ],
})
export class AppModule {}

// entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @OneToMany(() => Post, post => post.author)
  posts: Post[]
}`}</code></pre>

            <h3>9.3 事务处理</h3>
            <pre><code>{`// Prisma 交互式事务
async transferFunds(fromId: string, toId: string, amount: number) {
  await this.prisma.$transaction(async (tx) => {
    const sender = await tx.account.findUnique({ where: { id: fromId } })
    if (!sender || sender.balance < amount) {
      throw new BadRequestException('Insufficient funds')
    }

    await tx.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } },
    })

    await tx.account.update({
      where: { id: toId },
      data: { balance: { increment: amount } },
    })

    await tx.transaction.create({
      data: {
        fromId,
        toId,
        amount,
        type: 'TRANSFER',
      },
    })
  })
}

// 批量操作事务
async bulkCreateUsers(users: CreateUserDto[]) {
  return this.prisma.$transaction(
    users.map(user =>
      this.prisma.user.create({ data: user })
    )
  )
}`}</code></pre>
          </section>

          <section id="authentication">
            <h2>第十章：认证授权</h2>

            <h3>10.1 JWT 认证模块</h3>
            <pre><code>{`// auth/auth.module.ts
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) throw new UnauthorizedException('Invalid credentials')

    return user
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password)

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }

  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email)
    if (existing) {
      throw new ConflictException('Email already exists')
    }

    const user = await this.usersService.create(dto)
    const payload = { sub: user.id, email: user.email }

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }
}`}</code></pre>

            <h3>10.2 JWT 策略</h3>
            <pre><code>{`// auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  }
}

// auth/auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password)
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Get('profile')
  async getProfile(@User() user: any) {
    return this.usersService.findOne(user.userId)
  }
}`}</code></pre>
          </section>

          <section id="websockets">
            <h2>第十一章：WebSocket</h2>

            <h3>11.1 网关基础</h3>
            <pre><code>{`// npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

// chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room)
    client.emit('joinedRoom', room)
    this.server.to(room).emit('userJoined', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string },
  ) {
    this.server.to(data.room).emit('message', {
      sender: client.id,
      message: data.message,
      timestamp: new Date(),
    })
  }
}`}</code></pre>

            <h3>11.2 带认证的 WebSocket</h3>
            <pre><code>{`@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  constructor(private authService: AuthService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1]
      if (!token) {
        client.disconnect()
        return
      }

      const payload = await this.jwtService.verifyAsync(token)
      client.data.user = payload
    } catch {
      client.disconnect()
    }
  }
}`}</code></pre>
          </section>

          <section id="microservices">
            <h2>第十二章：微服务</h2>

            <h3>12.1 微服务基础</h3>
            <pre><code>{`// npm install @nestjs/microservices

// main.ts
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: { durable: false },
    },
  })
  await app.listen()
}
bootstrap()

// 混合应用（HTTP + 微服务）
const app = await NestFactory.create(AppModule)
app.connectMicroservice({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'cats_queue',
  },
})
await app.startAllMicroservices()
await app.listen(3000)`}</code></pre>

            <h3>12.2 消息模式</h3>
            <pre><code>{`// 消息模式（Message Pattern）- 请求/响应
@Controller()
export class AppController {
  @MessagePattern('get_user')
  getUser(@Payload() data: { id: string }): Promise<User> {
    return this.usersService.findOne(data.id)
  }
}

// 事件模式（Event Pattern）- 触发即忘
@Controller()
export class AppController {
  @EventPattern('user_created')
  handleUserCreated(@Payload() data: UserCreatedEvent) {
    // 处理事件（不需要返回值）
    this.emailService.sendWelcomeEmail(data.email)
  }
}

// 客户端发送
constructor(private client: ClientProxy) {}

async getUser(id: string) {
  // 请求/响应
  return this.client.send('get_user', { id }).toPromise()
}

async createUser(dto: CreateUserDto) {
  // 触发事件
  this.client.emit('user_created', dto)
}`}</code></pre>
          </section>

          <section id="testing">
            <h2>第十三章：测试</h2>

            <h3>13.1 单元测试</h3>
            <pre><code>{`// users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'

describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue([
                { id: '1', name: 'Alice', email: 'alice@test.com' },
              ]),
              findUnique: jest.fn().mockResolvedValue({
                id: '1', name: 'Alice', email: 'alice@test.com',
              }),
              create: jest.fn().mockResolvedValue({
                id: '1', name: 'Alice', email: 'alice@test.com',
              }),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll({ page: 1, limit: 10 })
      expect(result.data).toHaveLength(1)
    })
  })

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await service.findOne('1')
      expect(result.name).toBe('Alice')
    })

    it('should throw NotFoundException', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException)
    })
  })
})`}</code></pre>

            <h3>13.2 E2E 测试</h3>
            <pre><code>{`// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/api/users (POST)', () => {
    it('should create a user', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({ name: 'Alice', email: 'alice@test.com', password: 'Password1' })
        .expect(201)
    })

    it('should reject invalid email', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({ name: 'Alice', email: 'invalid', password: 'Password1' })
        .expect(400)
    })
  })

  describe('/api/users (GET)', () => {
    it('should return users', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
    })
  })
})`}</code></pre>
          </section>

          <section id="patterns">
            <h2>第十四章：设计模式</h2>

            <h3>14.1 CQRS 模式</h3>
            <pre><code>{`// npm install @nestjs/cqrs

// commands/impl/create-user.command.ts
export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

// commands/handlers/create-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private usersService: UsersService) {}

  async execute(command: CreateUserCommand) {
    return this.usersService.create(command.dto)
  }
}

// queries/impl/get-user.query.ts
export class GetUserQuery {
  constructor(public readonly id: string) {}
}

// queries/handlers/get-user.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private usersService: UsersService) {}

  async execute(query: GetUserQuery) {
    return this.usersService.findOne(query.id)
  }
}

// 在控制器中使用
@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id))
  }
}`}</code></pre>

            <h3>14.2 事件驱动架构</h3>
            <pre><code>{`// events/user-created.event.ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}

// events/user-created.handler.ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private emailService: EmailService) {}

  handle(event: UserCreatedEvent) {
    this.emailService.sendWelcomeEmail(event.email)
  }
}

// 发布事件
@Injectable()
export class UsersService {
  constructor(private eventBus: EventBus) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto })
    this.eventBus.publish(new UserCreatedEvent(user.id, user.email))
    return user
  }
}`}</code></pre>

            <h3>14.3 健康检查</h3>
            <pre><code>{`// npm install @nestjs/terminus

// health/health.module.ts
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { DatabaseHealthIndicator } from './database.health'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator],
})
export class HealthModule {}

// health/database.health.ts
import { Injectable } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(private prisma: PrismaService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw\`SELECT 1\`
      return this.status(key, true)
    } catch (error) {
      throw new HealthCheckError('Database check failed', this.status(key, false))
    }
  }
}

// health/health.controller.ts
import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import { DatabaseHealthIndicator } from './database.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: DatabaseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.isHealthy('database')])
  }
}`}</code></pre>
          </section>

          <div className="navigation">
            <Link href="/docs/nextjs" className="nav-link">← Next.js 完全指南</Link>
            <Link href="/docs/react" className="nav-link">React 完全指南 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
