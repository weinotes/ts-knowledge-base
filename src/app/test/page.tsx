import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TestPage() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <h1>测试页面</h1>
          <p>这是一个测试页面</p>
          <pre><code>{`# 测试代码
npm install example`}</code></pre>
        </main>
      </div>
    </div>
  )
}
