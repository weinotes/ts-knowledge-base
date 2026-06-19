'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { navigation, searchIndex, NavSection } from '@/lib/navigation'
import { Search, X, Menu } from 'lucide-react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof searchIndex>([])
  const [showResults, setShowResults] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          <span className="logo-icon">📚</span>
          <span>TS知识库</span>
        </Link>

        <nav className="header-nav">
          {navigation.slice(0, 3).map((section: NavSection, i: number) => (
            section.items.map((item: any) => (
              <Link key={item.href} href={item.href}>{item.title}</Link>
            ))
          ))}
        </nav>

        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="搜索文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 1 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, i) => (
                <Link key={i} href={result.href} className="search-result-item">
                  <div className="category">{result.category}</div>
                  <div className="title">{result.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{display: 'none'}}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  )
}
