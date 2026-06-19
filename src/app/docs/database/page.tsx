import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function DatabasePage() {
  return (
    <div>
      <Header />
      
      <div className="main-container">
        <Sidebar />
        
        <main className="content">
          <div className="breadcrumb">
            <Link href="/">首页</Link>
            <span>/</span>
            <span>数据库</span>
          </div>

          <h1>🗄️ 数据库完全指南</h1>
          <p style={{fontSize: '1.1em', color: '#94a3b8', marginBottom: '32px'}}>
            PostgreSQL、MongoDB、Redis 等数据库的使用与优化
          </p>

          {/* PostgreSQL */}
          <div className="content-card">
            <h2>🐘 PostgreSQL</h2>

            <h3>基础 SQL</h3>
            <pre><code>{`-- 创建表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  age INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (email, name, age) 
VALUES ('zhang@example.com', '张三', 25);

-- 批量插入
INSERT INTO users (email, name) VALUES
  ('user1@example.com', '用户1'),
  ('user2@example.com', '用户2');

-- 查询
SELECT * FROM users WHERE age >= 18 ORDER BY created_at DESC LIMIT 10;

-- 更新
UPDATE users SET name = '新名字' WHERE id = 1;

-- 删除
DELETE FROM users WHERE id = 1;`}</code></pre>

            <h3>高级查询</h3>
            <pre><code>{`-- JOIN 查询
SELECT u.name, p.title 
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.published = true;

-- 子查询
SELECT * FROM users 
WHERE id IN (
  SELECT user_id FROM posts 
  GROUP BY user_id 
  HAVING COUNT(*) > 5
);

-- 聚合查询
SELECT 
  u.name,
  COUNT(p.id) as post_count,
  AVG(p.views) as avg_views
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;`}</code></pre>

            <h3>索引优化</h3>
            <pre><code>{`-- 单列索引
CREATE INDEX idx_users_email ON users(email);

-- 多列索引
CREATE INDEX idx_posts_user_published ON posts(user_id, published);

-- 唯一索引
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 表达式索引
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- 部分索引
CREATE INDEX idx_posts_published ON posts(created_at) 
WHERE published = true;

-- 查看查询计划
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';`}</code></pre>

            <h3>事务</h3>
            <pre><code>{`-- 开始事务
BEGIN;

-- 或者
START TRANSACTION;

-- 执行操作
INSERT INTO users (email, name) VALUES ('test@example.com', '测试');
INSERT INTO logs (action) VALUES ('create_user');

-- 提交
COMMIT;

-- 回滚
ROLLBACK;

-- 保存点
SAVEPOINT my_savepoint;
-- ... 操作 ...
ROLLBACK TO SAVEPOINT my_savepoint;`}</code></pre>
          </div>

          {/* Redis */}
          <div className="content-card">
            <h2>🔴 Redis</h2>

            <h3>基础命令</h3>
            <pre><code>{`# 字符串
SET user:1 "张三"
GET user:1
INCR views:post:1
DECR views:post:1

# 哈希
HSET user:1 name "张三" email "zhang@example.com"
HGET user:1 name
HGETALL user:1
HINCRBY user:1 age 1

# 列表
LPUSH notifications "新消息"
RPUSH notifications "另一条"
LRANGE notifications 0 -1
LPOP notifications

# 集合
SADD tags "react" "typescript"
SMEMBERS tags
SISMEMBER tags "react"

# 有序集合
ZADD leaderboard 100 "张三"
ZADD leaderboard 200 "李四"
ZREVRANGE leaderboard 0 -1 WITHSCORES`}</code></pre>

            <h3>应用场景</h3>
            <pre><code>{`# 缓存示例
async function getUserWithCache(id) {
  const cacheKey = \`user:\${id}\`;
  
  // 1. 尝试从缓存获取
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // 2. 缓存未命中，从数据库获取
  const user = await db.user.findUnique({ where: { id } });
  
  // 3. 设置缓存，过期时间 1 小时
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
}

// 会话存储
redis.setex(\`session:\${sessionId}\`, 86400, JSON.stringify(userData));

// 分布式锁
async function acquireLock(key, ttl = 10) {
  const result = await redis.set(key, "1", "EX", ttl, "NX");
  return result === "OK";
}

async function releaseLock(key) {
  await redis.del(key);
}`}</code></pre>
          </div>

          {/* MongoDB */}
          <div className="content-card">
            <h2>🍃 MongoDB</h2>

            <h3>基础操作</h3>
            <pre><code>{`// 插入
db.users.insertOne({ name: "张三", email: "zhang@example.com" });
db.users.insertMany([
  { name: "用户1", email: "user1@example.com" },
  { name: "用户2", email: "user2@example.com" },
]);

// 查询
db.users.find({ age: { $gte: 18 } });
db.users.findOne({ email: "zhang@example.com" });
db.users.find({}, { name: 1, email: 1 });  // 只返回 name 和 email

// 更新
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { name: "新名字" } }
);

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: "minor" } }
);

// 删除
db.users.deleteOne({ _id: ObjectId("...") });
db.users.deleteMany({ status: "inactive" });`}</code></pre>

            <h3>聚合管道</h3>
            <pre><code>{`// 统计每个用户的文章数
db.posts.aggregate([
  { $group: { _id: "$authorId", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
]);

// 复杂聚合
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$customerId",
      total: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $project: {
      customerId: "$_id",
      total: 1,
      count: 1,
      average: { $divide: ["$total", "$count"] }
    }
  }
]);`}</code></pre>
          </div>

          <div className="page-nav">
            <Link href="/docs/prisma">← Prisma</Link>
            <Link href="/docs/deployment">部署 →</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
