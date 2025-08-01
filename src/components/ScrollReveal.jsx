import React, { useEffect, useRef, useState } from 'react'

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = '0.6s',
  distance = '20px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}, 0)`
      case 'down':
        return `translate3d(0, -${distance}, 0)`
      case 'left':
        return `translate3d(${distance}, 0, 0)`
      case 'right':
        return `translate3d(-${distance}, 0, 0)`
      default:
        return `translate3d(0, ${distance}, 0)`
    }
  }

  const style = {
    transform: getTransform(),
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    willChange: 'transform, opacity'
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  )
}

export default ScrollReveal