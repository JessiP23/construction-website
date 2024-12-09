import { useState, useEffect, useRef } from 'react'

export default function LazyVideo({ src, className }) {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true)
          observer.unobserve(ref.current)
        }
      },
      { rootMargin: '100px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div ref={ref}>
      {isIntersecting ? (
        <video src={src} className={className} controls playsInline preload="metadata" />
      ) : (
        <div className={`${className} bg-gray-200`} />
      )}
    </div>
  )
}

