import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const completedProjects = [
  { id: 1, title: 'Modern Kitchen Remodel', image: '/completed-kitchen.jpg' },
  { id: 2, title: 'Luxurious Bathroom Renovation', image: '/completed-bathroom.jpg' },
  { id: 3, title: 'Cozy Living Room Makeover', image: '/completed-living-room.jpg' },
  { id: 4, title: 'Elegant Master Bedroom', image: '/completed-bedroom.jpg' },
  { id: 5, title: 'Spacious Home Office', image: '/completed-office.jpg' },
]

export function CompletedProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % completedProjects.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out'
      carouselRef.current.style.transform = `translateX(-${currentIndex * 20}%)`
    }
  }, [currentIndex])

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex"
          style={{ width: `${completedProjects.length * 100}%` }}
        >
          {[...completedProjects, ...completedProjects].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="w-1/5 flex-shrink-0"
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

