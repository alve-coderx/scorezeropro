import React, { useEffect, useState } from "react";
import banner3 from "../../assets/banner3.jpg";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChange = (index) => setActiveIndex(index);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const Banners = [
    {
      src: banner3,
      id: 0,
    },
    {
      src: banner3,
      id: 1,
    },
    {
      src: banner3,
      id: 2,
    },
  ];

  return (
    <div className="container mx-auto ">
      <div className="relative flex justify-center ">
        <div className="flex lg:h-[600px] overflow-hidden border drop-shadow-md">
          {Banners.map((item, index) => (
            <>
              {imageLoaded ? (
                <img
                  src={item.src}
                  key={item.id}
                  alt="banner"
                  className={
                    activeIndex === index
                      ? "w-full translate-x-0 transition-all"
                      : "w-[600px] h-full opacity-0 absolute translate-x-full  transition-all"
                  }
                />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="lg:w-96 w-64 lg:h-96 h-64 animate-pulse bg-gray-200 cus-shimmer"></div>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="absolute bottom-4 flex space-x-5">
          {Banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChange(index)}
              className={` px-2 text-xs rounded-full h-2 ${
                activeIndex === index ? "bg-secondary" : "bg-[#1F1F1F]"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
