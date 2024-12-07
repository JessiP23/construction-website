'use client'

import { useState } from 'react'
import Image from 'next/image'

const completedProjects = [
  { id: 1, title: 'Modern Kitchen Remodel', image: '/comp.jpg', description: 'A sleek, contemporary kitchen with state-of-the-art appliances and elegant finishes.' },
  { id: 2, title: 'Luxurious Bathroom Renovation', image: '/comp1.jpg', description: 'A spa-like bathroom featuring a freestanding tub, walk-in shower, and custom vanity.' },
  { id: 3, title: 'Cozy Living Room Makeover', image: '/comp2.jpg', description: 'A warm and inviting living space with custom built-ins and a stunning fireplace.' },
  { id: 4, title: 'Elegant Master Bedroom', image: '/comp3.jpg', description: 'A serene master retreat with a custom headboard and luxurious window treatments.' },
  { id: 5, title: 'Spacious Home Office', image: '/comp4.jpg', description: 'A functional and stylish home office with ample storage and a comfortable workspace.' },
  { id: 6, title: 'Contemporary Dining Area', image: '/comp5.jpg', description: 'A modern dining space perfect for entertaining, featuring a custom table and statement lighting.' },
  { id: 7, title: 'Minimalist Entryway', image: '/comp6.jpg', description: 'A clean and welcoming entryway with clever storage solutions and minimalist decor.' },
]

export function CompletedProjectsCarousel () {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
    document.getElementById('projectModal').style.display = 'block'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.getElementById('projectModal').style.display = 'none'
  }

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
      <div id="projectModal" className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center hidden">
        <div className="bg-white p-8 rounded-lg max-w-lg w-full">
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
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
