import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swipeable from "react-swipeable";

export const CardCarousel = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % (slides.length - 4));
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, slides.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex - 1 + slides.length - 4) % (slides.length - 4)
    );
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % (slides.length - 4));
  };

  const handleSlideClick = (url) => {
    window.open(url, "_blank");
  };

  const handlers = {
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  };

  return (
    <div className="relative">
      <Swipeable {...handlers}>
        <div className="flex overflow-hidden">
          {slides.slice(currentIndex, currentIndex + 5).map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/5 cursor-pointer"
              onClick={() => handleSlideClick(slide.url)}
            >
              <div className="mx-2 bg-white rounded-lg shadow-md">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{slide.title}</h3>
                  <p className="text-gray-600">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Swipeable>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        onClick={handlePrev}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        onClick={handleNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

