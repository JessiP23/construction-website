'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HomeImage from '../public/home1.png'
import Image from 'next/image'


const expertiseData = [
  { title: 'Kitchen Remodeling', image: '/example.jpeg' },
  { title: 'Bathroom Renovation', image: '/example1.jpeg' },
  { title: 'Home Extensions', image: '/example2.jpeg' },
]

const projectsData = [
  {
    title: 'Paint',
    description: 'Complete kitchen renovation with custom cabinetry and state-of-the-art appliances.',
    images: {
      before: '/paint.jpg',
      during: '/paint1.jpg',
      after: '/paint2.jpg'
    }
  },
  {
    title: 'Luxurious Bathroom Spa',
    description: 'Transformed an outdated bathroom into a relaxing spa-like retreat.',
    images: {
      before: '/placeholder.svg?height=400&width=600',
      during: '/placeholder.svg?height=400&width=600',
      after: '/placeholder.svg?height=400&width=600'
    }
  },
  {
    title: 'Cozy Attic Conversion',
    description: 'Converted an unused attic into a comfortable living space with plenty of natural light.',
    images: {
      before: '/placeholder.svg?height=400&width=600',
      during: '/placeholder.svg?height=400&width=600',
      after: '/placeholder.svg?height=400&width=600'
    }
  },
]

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeImageType, setActiveImageType] = useState('after')
  const [activeProjects, setActiveProjects] = useState(
    projectsData.map(project => ({
      ...project,
      activeImageType: 'after'
    }))
  )

  const handleImageTypeChange = (projectIndex, imageType) => {
    const updatedProjects = [...activeProjects]
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      activeImageType: imageType
    }
    setActiveProjects(updatedProjects)
  }

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
    <main className="min-h-screen bg-[#f8f5f0]">
      <section className="relative h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/home1.png')" }}>
        <div className="absolute inset-0 bg-[#2c1810] bg-opacity-75"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full container mx-auto px-4">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">Titino Home Imrovement</h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-shadow">
              Transforming houses into dream homes. With over 15 years of experience, 
              we specialize in kitchen remodeling, bathroom renovations, and home extensions. 
              Quality craftsmanship and customer satisfaction guaranteed.
            </p>
            <button className="bg-[#dbf240] text-[#2c1810] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#3f3def] hover:text-white transition-colors duration-300 shadow-lg">
              Schedule a Consultation
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={HomeImage}
                alt="Beautifully renovated kitchen"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#2c1810]">Our Expertise</h2>
          <div className="relative flex justify-center items-center h-[300px] md:h-[400px]">
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
                      ? 'w-[80%] md:w-[60%] h-[300px] md:h-[400px] z-20 opacity-100'
                      : 'w-[60%] md:w-[40%] h-[225px] md:h-[300px] z-10 opacity-70'
                  } ${
                    isLeft
                      ? '-translate-x-[40%] md:-translate-x-[55%]'
                      : isRight
                      ? 'translate-x-[40%] md:translate-x-[55%]'
                      : ''
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#2c1810] bg-opacity-50 flex items-center justify-center rounded-lg">
                    <h3 className="text-white text-xl md:text-2xl font-semibold text-shadow">{item.title}</h3>
                  </div>
                </div>
              )
            })}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg z-30 hover:bg-opacity-75 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-[#2c1810]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg z-30 hover:bg-opacity-75 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-[#2c1810]" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8f5f0]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#2c1810] 
          transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def]">
          Our Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden 
                transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-4 
                hover:scale-[1.02]"
            >
              <div className="p-6 bg-[#2c1810] text-white group">
                <h3 className="text-2xl font-bold mb-2 transition-colors 
                  group-hover:text-[#dbf240]">{project.title}</h3>
                <p className="text-gray-300 line-clamp-3">{project.description}</p>
              </div>
              <div className="relative group">
                <img
                  src={project.images[project.activeImageType]}
                  alt={`${project.title} - ${project.activeImageType} phase`}
                  className="w-full h-[300px] md:h-[400px] object-cover 
                    transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 
                  bg-gradient-to-t from-black to-transparent">
                  <div className="flex gap-2 bg-white bg-opacity-20 backdrop-blur-sm 
                    rounded-full p-1 shadow-lg">
                    {['before', 'during', 'after'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleImageTypeChange(index, type)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold 
                          transition-all duration-300 ${
                          project.activeImageType === type
                            ? 'bg-[#2c1810] text-white scale-105'
                            : 'text-[#2c1810] hover:bg-[#2c1810] hover:text-white'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <footer className="bg-[#2c1810] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 HomeStyle Renovations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
