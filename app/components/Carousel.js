'use client'

import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { LanguageContext } from '../theme/Theme'
import { translations } from './Translation'

const completedProjects = [
  { id: 1, image: '/comp.jpg' },
  { id: 2, image: '/comp1.jpg' },
  { id: 3, image: '/comp2.jpg' },
  { id: 4, image: '/comp3.jpg' },
  { id: 5, image: '/comp4.jpg' },
  { id: 6, image: '/comp5.jpg' },
  { id: 7, image: '/comp6.jpg' },
]

export function CompletedProjectsCarousel () {
  const { language } = useContext(LanguageContext)
  const translatedProjects = translations[language].completedProjects

  const [selectedProject, setSelectedProject] = useState(null)


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedProjects.map((project, index) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <Image
                src={project.image}
                alt={translatedProjects[index].title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg text-black font-semibold">{translatedProjects[index].title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}