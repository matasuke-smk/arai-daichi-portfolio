import React, { useState, useEffect } from 'react'
import { smoothScrollTo, getActiveSection } from '../utils/scrollUtils'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { id: 'home', label: 'ホーム' },
    { id: 'services', label: 'サービス' },
    { id: 'profile', label: 'プロフィール' },
    { id: 'gallery', label: '作品ギャラリー' },
    { id: 'pricing', label: '料金表' },
    { id: 'contact', label: 'お問い合わせ' },
  ]

  // スクロール位置に基づいてアクティブセクションを更新
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const currentSection = getActiveSection(sections)
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初期実行

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (sectionId) => {
    smoothScrollTo(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleClick('home')}
              className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
            >
              Arai Daichi
            </button>
          </div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-800 border-t border-dark-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`block nav-link w-full text-left ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header