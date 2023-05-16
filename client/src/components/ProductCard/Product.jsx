import React, { useEffect, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";

const Product = ({ item }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer bg-gray-100 border drop-shadow-sm card-max-w rounded-md">
      <div>
        <img
          src={`/api/v1/product/product-photo/${item._id}`}
          alt="samp"
          className="hover:scale-75 transition-all "
        />
      </div>
      <div className="text-center mt-1">
        <p className="text-black lg:text-lg text-xs font-[500]">{item.name}</p>
       
        <p className="text-black font-[500] lg:text-lg text-xs">
          {item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="flex justify-center mb-1 items-center space-x-1">
        <button
          onClick={() => navigate(`/product/${item.slug}`)}
          className="bg-black lg:text-sm text-xs rounded-md text-white py-2 px-4"
        >
          More Details
        </button>
        <button
          onClick={() => {
            setCart([...cart, item]);
            localStorage.setItem("cart", JSON.stringify([...cart, item]));
            toast.success("Item Added to cart");
          }}
          className="bg-black lg:text-xl text-sm rounded-md  text-white p-2"
        >
          <AiFillShopping />
        </button>
      </div>
    </div>
  );
};

export default Product;
