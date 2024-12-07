'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const completedProjects = [
  { id: 1, title: 'Modern Kitchen Remodel', image: '/comp.jpg' },
  { id: 2, title: 'Luxurious Bathroom Renovation', image: '/comp1.jpg' },
  { id: 3, title: 'Cozy Living Room Makeover', image: '/comp2.jpg' },
  { id: 4, title: 'Elegant Master Bedroom', image: '/comp3.jpg' },
  { id: 5, title: 'Spacious Home Office', image: '/comp4.jpg' },
  { id: 5, title: 'Spacious Home Office', image: '/comp5.jpg' },
  { id: 5, title: 'Spacious Home Office', image: '/comp6.jpg' },
]

export function CompletedProjectsCarousel() {
  const [currentPosition, setCurrentPosition] = useState(0)
  const carouselRef = useRef(null)
  const totalImages = completedProjects.length
  const imageWidth = 100 / totalImages // Each image takes 100% / totalImages width

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => {
        const newPosition = prevPosition + 0.01 // Slower rotation speed
        if (newPosition >= imageWidth) {
          // When the first image is completely out of view, reset the position
          // This creates the illusion of an infinite loop
          return 0
        }
        return newPosition
      })
    }, 16) // ~60 fps for smooth animation

    return () => clearInterval(interval)
  }, [imageWidth])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentPosition}%)`
    }
  }, [currentPosition])

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-[16ms] ease-linear"
          style={{ width: `${totalImages * 100}%` }}
        >
          {completedProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: `${imageWidth}%` }}
            >
              <div className="m-2 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

