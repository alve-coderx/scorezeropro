import React, { useEffect, useState } from "react";
import banner3 from "../../assets/banner3.png";

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
    <div className=" ">
      <div className="relative flex justify-center ">
        <div className=" bg-[#edeef0] w-full bg-[#edeef0] overflow-hidden ">
          {Banners.map((item, index) => (
            <div className="flex">
              <img
                src={item.src}
                key={item.id}
                alt="banner"
                className={
                  activeIndex === index
                    ? " translate-x-0 transition-all"
                    : "opacity-0 absolute translate-x-full  transition-all"
                }
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 flex space-x-5">
          {Banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChange(index)}
              className={` px-5 text-xs rounded-full opacity-50 h-3 ${
                activeIndex === index ? "bg-black" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
