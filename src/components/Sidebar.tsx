'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation, NavSection } from '@/lib/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      {navigation.map((section: NavSection, i: number) => (
        <div key={i} className="sidebar-section">
          <div className="sidebar-title">{section.title}</div>
          <ul className="sidebar-nav">
            {section.items.map((item: any) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                  {item.badge && <span className="badge">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
