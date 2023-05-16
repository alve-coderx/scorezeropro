import React from "react";
const BannerCard = ({ item, icon }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full overlay"></div>
      <img src={item} alt="cat" className="w-full h-full" />
      <div className="absolute w-full h-full p-5 top-10 flex flex-col justify-start space-y-2 text-white ">
        <p className="text-sm">Changing the way you hold your phone</p>
        <p className="text-4xl">Grid Inovation</p>
        <p className="text-lg">$39.99-$74.99</p>
        <img src={icon} alt="wear" className="w-16 " />
      </div>
    </div>
  );
};

export default BannerCard;
