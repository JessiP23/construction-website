'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
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

const videoData = [
  {
    title: 'Kitchen Transformation',
    description: 'Watch our complete kitchen renovation process from start to finish.',
    videoUrl: '/first.MOV',
    thumbnail: '/example.jpeg'
  },
  {
    title: 'Bathroom Makeover',
    description: 'See how we turn an outdated bathroom into a modern sanctuary.',
    videoUrl: '/second.MOV',
    thumbnail: '/example.jpeg'
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
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRefs = useRef([])

  const handleVideoPlay = (index) => {
    // Pause all other videos
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
      }
    });

    // Toggle play/pause for the clicked video
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
    setActiveVideoIndex(index);
  }

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow animate-fade-in-up">
            Titino Home Improvement
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-shadow animate-fade-in-up delay-200">
            Transforming houses into dream homes. With over 15 years of experience, 
            we specialize in kitchen remodeling, bathroom renovations, and home extensions. 
            Quality craftsmanship and customer satisfaction guaranteed.
          </p>
          <button className="bg-[#dbf240] text-[#2c1810] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#3f3def] hover:text-white transition-all duration-300 shadow-lg animate-fade-in-up delay-400">
            Schedule a Consultation
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-lg shadow-2xl animate-fade-in-up delay-600">
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
        <h2 className="text-4xl font-bold mb-12 text-center text-[#2c1810] animate-fade-in-up">Our Expertise</h2>
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
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                <img
  src={item.image}
  alt={item.title}
  className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
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
          transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def] animate-fade-in-up">
          Our Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden 
                transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-4 
                hover:scale-[1.02] animate-fade-in-up"
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className="p-6 bg-gradient-to-r from-[#2c1810] to-[#3f3def] text-white group">
                <h3 className="text-2xl font-bold mb-2 transition-colors 
                  group-hover:text-[#dbf240]">{project.title}</h3>
                <p className="text-gray-200 line-clamp-3">{project.description}</p>
              </div>
              <div className="relative group aspect-w-4 aspect-h-3">
                <img
                  src={project.images[project.activeImageType]}
                  alt={`${project.title} - ${project.activeImageType} phase`}
                  className="w-full h-full object-contain 
                    transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
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
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-to-b from-white to-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#2c1810] 
            transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def]">
            Our Craftsmanship in Motion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {videoData.map((video, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-2xl overflow-hidden 
                  transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-4 
                  hover:scale-[1.02]"
              >
                <div className="p-6 bg-gradient-to-r from-[#2c1810] to-[#3f3def] text-white group">
                  <h3 className="text-2xl font-bold mb-2 transition-colors 
                    group-hover:text-[#dbf240]">{video.title}</h3>
                  <p className="text-gray-200 line-clamp-3">{video.description}</p>
                </div>
                <div className="relative group">
                  <div className="relative w-full pt-[75%]"> {/* 4:3 Aspect Ratio */}
                    <video
                      ref={el => videoRefs.current[index] = el}
                      src={video.videoUrl}
                      poster={video.thumbnail}
                      className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    <button
                      onClick={() => handleVideoPlay(index)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-white bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full 
                        transition-all duration-300 z-10 group-hover:scale-110"
                    >
                      {activeVideoIndex === index && isPlaying ? (
                        <Pause className="w-8 h-8 text-[#3f3def]" />
                      ) : (
                        <Play className="w-8 h-8 text-[#3f3def]" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration: 1:15</span>    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#2c1810] text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Titino Home Improvement. All rights reserved.</p>
      </div>
    </footer>
    </main>
  )
}
