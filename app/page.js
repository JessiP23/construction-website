'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Globe, Mail, MapPin, Moon, Pause, Phone, Play, Send, Sun } from 'lucide-react'
import HomeImage from '../public/home1.png'
import Image from 'next/image'
import { LanguageContext, ThemeContext, LanguageProvider, ThemeProvider } from './theme/Theme'
import { CompletedProjectsCarousel } from './components/Carousel'
import { AnimatePresence, motion } from 'framer-motion'
import { translations } from './components/Translation'


const expertiseData = [
  { image: '/example.jpeg' },
  { image: '/example1.jpeg' },
  { image: '/example2.jpeg' },
]

const projectsData = [
  {
    images: {
      before: '/bath2.jpg',
      during: '/bath.MOV',
      after: '/bath1.jpg'
    }
  },
  {
    images: {
      before: '/aaa5.jpg',
      during: '/aaa2.jpg',
      after: '/aaa.jpg'
    }
  },
  {
    images: {
      before: '/door1.jpg',
      during: '/door2.jpg',
      after: '/door3.jpg',
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

export default function HomeWrapper() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </LanguageProvider>
  )
}

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeImageType, setActiveImageType] = useState('after')
  const [activeProjects, setActiveProjects] = useState(
    projectsData.map(project => ({
      ...project,
      activeImageType: 'after'
    }))
  )

  const { language } = useContext(LanguageContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { toggleLanguage } = useContext(LanguageContext)

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

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-[#f8f5f0]'
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-[#2c1810]'
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-[#f8f5f0]'

  return (
    <main className={`min-h-screen ${bgColor} ${textColor} min-h-screen`}>
      {/* Language and Theme Toggle Buttons */}
      <div className="fixed top-4 right-4 z-50 flex space-x-4">
      {/* Language Toggle */}
      <motion.button 
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden
          w-16 h-10 rounded-full
          flex items-center justify-center
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          shadow-lg transition-all duration-300
          border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center"
          >
            {language === 'en' ? (
              <div className="flex items-center space-x-2">
                <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>EN</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>ES</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Theme Toggle */}
      <motion.button 
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden
          w-16 h-10 rounded-full
          flex items-center 
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700' 
            : 'bg-gradient-to-r from-gray-100 to-white border-gray-200'}
          shadow-lg transition-all duration-300
          border
        `}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="dark"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1 flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full"
            >
              <Moon className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-1 flex items-center justify-center w-8 h-8 bg-yellow-400 rounded-full"
            >
              <Sun className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>

      <section className={`relative h-screen overflow-hidden bg-cover bg-center ${theme === 'dark' ? 'bg-gray-900' : ''}`} style={{ backgroundImage: "url('/home1.png')" }}>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-[#2c1810]'} bg-opacity-75`}></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full container mx-auto px-4">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow animate-fade-in-up">
              {translations[language].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-shadow animate-fade-in-up delay-200">
              {translations[language].description}
            </p>
            <button className="bg-[#dbf240] text-[#2c1810] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#3f3def] hover:text-white transition-all duration-300 shadow-lg animate-fade-in-up delay-400">
              {translations[language].ctaButton}
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

      <section className={`py-20 ${cardBg}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${textColor} animate-fade-in-up`}>
            {translations[language].expertise}
          </h2>
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
                  <Image
                    width={600}
                    height={600}
                    alt="Expertise images"
                    src={item.image}
                    className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                  </div>
                  <div className="absolute inset-0 bg-[#2c1810] bg-opacity-50 flex justify-center rounded-lg">
                    <h3 className="text-white text-xl md:text-2xl font-semibold text-shadow absolute bottom-9">{translations[language].expertiseData[index].title}</h3>
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

      <section className={`py-20 ${sectionBg}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${textColor} 
            transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def] animate-fade-in-up`}>
            {translations[language].projects}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeProjects.map((project, index) => (
              <div 
                key={index} 
                className={`${cardBg} rounded-2xl shadow-2xl overflow-hidden 
                  transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-4 
                  hover:scale-[1.02] animate-fade-in-up flex flex-col`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  height: '700px', // Fixed total height
                }}
              >
                {/* Header Section */}
                <div className="p-8 bg-gradient-to-r from-[#2c1810] to-[#3f3def] text-white group h-[150px]">
                  <h3 className="text-2xl font-bold mb-2 transition-colors 
                    group-hover:text-[#dbf240] line-clamp-2">{translations[language].projectsData[index].title}</h3>
                  <p className="text-gray-200 line-clamp-3">{translations[language].projectsData[index].description}</p>
                </div>

                {/* Image/Video Section */}
                <div className="flex-grow relative group" style={{height: '450px'}}>
                  {project.images[project.activeImageType].toLowerCase().endsWith('.mov') || 
                  project.images[project.activeImageType].toLowerCase().endsWith('.mp4') ? (
                    <video
                      src={project.images[project.activeImageType]}
                      className="w-full h-full object-cover 
                        transition-transform duration-300 group-hover:scale-105"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <Image
                      width={900}
                      height={600}
                      src={project.images[project.activeImageType]}
                      alt={`Project ${project.activeImageType} phase`}
                      className="w-full h-full object-cover 
                        transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Button Section */}
                <div className="h-[100px] flex justify-center items-center">
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

      <section className={`${sectionBg} py-12`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${textColor} 
            transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def] animate-fade-in-up`}>
            {translations[language].craftsmanship}
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
                    group-hover:text-[#dbf240]">{translations[language].videoData[index].title}</h3>
                  <p className="text-gray-200 line-clamp-3">{translations[language].videoData[index].description}</p>
                </div>
                <div className="relative group">
                  <div className="relative w-full pt-[75%]"> {/* 4:3 Aspect Ratio */}
                    <video
                      src={video.videoUrl}
                      className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                      controls
                      playsInline
                      preload="metadata"
                    />
              
                    
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

      <section className={`py-20 ${sectionBg}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${textColor} 
            transform transition-all duration-500 hover:scale-105 hover:text-[#3f3def] animate-fade-in-up`}>
            {translations[language].completed}
          </h2>
          <CompletedProjectsCarousel />
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#2c1810] to-[#3f3def] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold mb-6 animate-pulse">{translations[language].contact}</h2>
            <p className="text-lg mb-6">{translations[language].transform}</p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-[#dbf240]" />
                <span>(347) 424-0746</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-[#dbf240]" />
                <span>e.avila.homeimprovements@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-[#dbf240]" />
                <span>Manhattan, Bronx, Staten Island, New Jersey, New York</span>
              </div>
            </div>
          </div>
          
        </div>
        <div className="mt-12 text-center">
          <p>&copy; 2024 Titino Home Improvement. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </main>

  )
}
