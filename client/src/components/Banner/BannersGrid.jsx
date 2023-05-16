import React from "react";
import jacket1 from "../../assets/jacket1.jpg";
import attar from "../../assets/attar1.jpg";
import badam from "../../assets/badam.jpg";
import wear from "../../assets/wear.svg";
import organic from "../../assets/organic.svg";
import fragrance from "../../assets/fragrance.svg";
import BannerCard from "./BannerCard";

const BannersGrid = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-5 my-5 ">
        <BannerCard item={jacket1} icon={wear}/>
        <BannerCard item={attar} icon={fragrance}/>
        <BannerCard item={badam} icon={organic}/>
    </div>
  );
};

export default BannersGrid;
