// スムーズスクロールユーティリティ関数

export const smoothScrollTo = (targetId) => {
  const target = document.getElementById(targetId)
  if (!target) return

  // ヘッダーの実際の高さを取得
  const header = document.querySelector('header')
  const headerHeight = header ? header.offsetHeight : 64
  
  // デバイスに応じたオフセット調整
  const isMobile = window.innerWidth < 768
  const extraOffset = isMobile ? 20 : 16
  const totalOffset = headerHeight + extraOffset

  // 目標位置を計算
  const targetPosition = target.offsetTop - totalOffset

  // スムーズスクロール実行
  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: 'smooth'
  })
}

// アクティブセクションを判定する関数
export const getActiveSection = (sections) => {
  const scrollPosition = window.scrollY
  const header = document.querySelector('header')
  const headerHeight = header ? header.offsetHeight : 64
  const offset = headerHeight + 20

  // 下から上に向かってチェック
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && (scrollPosition + offset) >= section.offsetTop) {
      return sections[i]
    }
  }
  
  return sections[0] // デフォルトは最初のセクション
}