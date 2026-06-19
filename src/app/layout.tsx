import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TypeScript 全栈知识库',
  description: 'Next.js, NestJS, React, Prisma 等框架的完整学习指南与常见问题解决方案',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
