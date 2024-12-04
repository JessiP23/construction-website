'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import HomeImage from '../public/home.png'
import Image from 'next/image'

const expertiseData = [
  { title: 'Kitchen Remodeling', image: '/placeholder.svg?height=600&width=800' },
  { title: 'Bathroom Renovation', image: '/placeholder.svg?height=600&width=800' },
  { title: 'Home Extensions', image: '/placeholder.svg?height=600&width=800' },
]

const projectsData = [
  { title: 'Modern Kitchen Makeover', image: '/placeholder.svg?height=600&width=800', description: 'Complete kitchen renovation with custom cabinetry and state-of-the-art appliances.' },
  { title: 'Luxurious Bathroom Spa', image: '/placeholder.svg?height=600&width=800', description: 'Transformed an outdated bathroom into a relaxing spa-like retreat.' },
  { title: 'Cozy Attic Conversion', image: '/placeholder.svg?height=600&width=800', description: 'Converted an unused attic into a comfortable living space with plenty of natural light.' },
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
    <main className="min-h-screen bg-gray-100">
      <section className="relative h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-between h-full container mx-auto px-4">
          <div className="w-1/2 text-white">
            <h1 className="text-5xl font-bold mb-4 text-shadow">HomeStyle Renovations</h1>
            <p className="text-xl mb-8 leading-relaxed text-shadow">
              Transforming houses into dream homes. With over 15 years of experience, 
              we specialize in kitchen remodeling, bathroom renovations, and home extensions. 
              Quality craftsmanship and customer satisfaction guaranteed.
            </p>
            <button className="bg-[#dbf240] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3f3def] hover:text-white transition-colors duration-300 shadow-lg">
              Schedule a Consultation
            </button>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image
              width={1000} height={800}
              src={HomeImage}
              alt="Beautifully renovated kitchen"
              className="rounded-lg shadow-2xl max-w-md"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Expertise</h2>
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
                    <h3 className="text-white text-2xl font-semibold text-shadow">{item.title}</h3>
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

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 HomeStyle Renovations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

