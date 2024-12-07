import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const completedProjects = [
  { id: 1, title: 'Modern Kitchen Remodel', image: '/completed-kitchen.jpg' },
  { id: 2, title: 'Luxurious Bathroom Renovation', image: '/completed-bathroom.jpg' },
  { id: 3, title: 'Cozy Living Room Makeover', image: '/completed-living-room.jpg' },
  { id: 4, title: 'Elegant Master Bedroom', image: '/completed-bedroom.jpg' },
  { id: 5, title: 'Spacious Home Office', image: '/completed-office.jpg' },
];

export function CompletedProjectsCarousel() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const carouselRef = useRef(null);
  const totalImages = completedProjects.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => {
        const newPosition = prevPosition + 0.01; // Slower rotation speed
        return newPosition >= totalImages * 50 ? 0 : newPosition; // Adjust based on the width of images
      });
    }, 16); // ~60 fps for smooth animation

    return () => clearInterval(interval);
  }, [totalImages]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentPosition}%)`;
    }
  }, [currentPosition]);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-[16ms] ease-linear"
          style={{ width: `${totalImages * 50}%` }} // Adjusted width for 2 images
        >
          {[...completedProjects, ...completedProjects].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="w-[10%] flex-shrink-0" // Each image takes 50% of the width
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
  );
}