import React, { useEffect, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";

const Product = ({ item }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer bg-white p-2 border drop-shadow-sm card-max-w rounded-md">
      <div>
        <img
          src={`/api/v1/product/product-photo/${item._id}`}
          alt="samp"
          className="hover:scale-75 transition-all "
        />
      </div>
      <div className="text-center my-2">
        <p className="text-black lg:text-md text-xs font-[600]">{item.name}</p>
        <p className="text-gray-500 font-[400] lg:text-md text-xs">
          {item.description.substring(0, 20)}...
        </p>
        <p className="text-black font-[600] lg:text-md text-xs">
          {item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="flex justify-center  items-center space-x-1">
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
