'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const completedProjects = [
  { id: 1, title: 'House Remodel', image: '/comp.jpg', description: 'A sleek, contemporary kitchen with state-of-the-art appliances and elegant finishes.' },
  { id: 2, title: 'Complex Space Renovation', image: '/comp1.jpg', description: 'A spa-like bathroom featuring a freestanding tub, walk-in shower, and custom vanity.' },
  { id: 3, title: 'Paint Garage', image: '/comp2.jpg', description: 'A warm and inviting living space with custom built-ins and a stunning fireplace.' },
  { id: 4, title: 'Elegant Master Bedroom', image: '/comp3.jpg', description: 'A serene master retreat with a custom headboard and luxurious window treatments.' },
  { id: 5, title: 'Spacious Home Office', image: '/comp4.jpg', description: 'A functional and stylish home office with ample storage and a comfortable workspace.' },
  { id: 6, title: 'Drywall', image: '/comp5.jpg', description: 'A modern dining space perfect for entertaining, featuring a custom table and statement lighting.' },
  { id: 7, title: 'Rooftop', image: '/comp6.jpg', description: 'A clean and welcoming entryway with clever storage solutions and minimalist decor.' },
]

export function CompletedProjectsCarousel () {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModelOpen, setIsModelOpen] = useState(false)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModelOpen(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsModelOpen(false)
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (isModelOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModelOpen])


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(project)}
          >
            <div className="p-4">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg text-black font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-10 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            {selectedProject && (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-md mb-4"
                />
                <p className="mb-4">{selectedProject.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
