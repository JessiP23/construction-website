'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const expertiseData = [
  { title: 'Residential', image: '/placeholder.svg?height=600&width=800' },
  { title: 'Commercial', image: '/placeholder.svg?height=600&width=800' },
  { title: 'Industrial', image: '/placeholder.svg?height=600&width=800' },
]

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? expertiseData.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === expertiseData.length - 1 ? 0 : prev + 1))
  }

  return (
    <main className="min-h-screen">
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            filter: `blur(${Math.min(scrollPosition / 10, 10)}px)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-6xl font-bold mb-4">BuildMaster Construction</h1>
          <p className="text-2xl mb-8">Building Dreams, Crafting Excellence</p>
          <button className="bg-[#dbf240] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3f3def] hover:text-white transition-colors duration-300">
            Get a Quote
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Expertise</h2>
          <div className="relative flex justify-center items-center h-[400px]">
            {expertiseData.map((item, index) => {
              const isActive = index === activeIndex
              const isLeft = (activeIndex === 0 && index === 2) || 
                             (activeIndex === 1 && index === 0) || 
                             (activeIndex === 2 && index === 1)
              const isRight = (activeIndex === 0 && index === 1) || 
                              (activeIndex === 1 && index === 2) || 
                              (activeIndex === 2 && index === 0)
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    isActive
                      ? 'w-[60%] h-[400px] z-20 opacity-100'
                      : 'w-[40%] h-[300px] z-10 opacity-70'
                  } ${
                    isLeft
                      ? '-translate-x-[55%]'
                      : isRight
                      ? 'translate-x-[55%]'
                      : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <h3 className="text-white text-2xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              )
            })}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg z-30 hover:bg-opacity-75 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg z-30 hover:bg-opacity-75 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3f3def]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {[
              '/placeholder.svg?height=600&width=1200',
              '/placeholder.svg?height=600&width=1200',
              '/placeholder.svg?height=600&width=1200',
            ].map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-semibold">Project {index + 1}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 BuildMaster Construction. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

