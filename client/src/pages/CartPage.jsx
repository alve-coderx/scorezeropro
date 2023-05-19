import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
// import "../styles/CartStyles.css";

const CartPage = ({ setOpen, open }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="row">
                      <div className="flex  h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <AiOutlineClose
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                          {!auth?.user
                            ? "Hello Guest"
                            : `Hello  ${auth?.token && auth?.user?.name}`}
                          <p className="text-center">
                            {cart?.length
                              ? `You Have ${cart.length} items in your cart ${
                                  auth?.token
                                    ? ""
                                    : "please login to checkout !"
                                }`
                              : " Your Cart Is Empty"}
                          </p>
                        </h1>
                      </div>
                    </div>
                    <div className="container ">
                      <div className="row ">
                        <div className="flex flex-col items-center px-2 h-[790px] pb-10 overflow-y-auto space-y-2">
                          {cart?.map((p) => (
                            <div
                              className="cursor-pointer flex items-start space-x-5 bg-white border drop-shadow-sm w-full p-1 rounded-md"
                              key={p._id}
                            >
                              <div className="">
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  className="hover:scale-75 transition-all w-48"
                                  alt={p.name}
                                  width="100%"
                                  height={"130px"}
                                />
                              </div>
                              <div>
                                <div className="text-center my-2">
                                  <p className="text-black font-[600]">
                                    {p.name}
                                  </p>
                                  <p className="text-gray-500 font-[400] text-sm">
                                    {p.description.substring(0, 30)}
                                  </p>
                                  <p className="text-black font-[600] text-sm">
                                    Price : {p.price}
                                  </p>
                                </div>
                                <div className="flex justify-center items-center space-x-1">
                                  <button
                                    className="bg-black text-sm rounded-md text-white py-2 px-4"
                                    onClick={() => removeCartItem(p._id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute border-t bg-white bottom-0 flex items-start justify-between w-full p-5">
                          <div>
                            <p className="text-black font-[600]">
                              Total : {totalPrice()}{" "}
                            </p>
                            {auth?.user?.address ? (
                              <>
                                <div className="flex items-start justify-between">
                                  <p className="text-black font-[600]">
                                    Current Address :
                                  </p>
                                  <div>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                      className="text-xs text-black font-[600]"
                                      onClick={() =>
                                        navigate("/dashboard/user/profile")
                                      }
                                    >
                                      Update Address
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="mb-3">
                                {auth?.token ? (
                                  <button
                                    className="btn btn-outline-warning"
                                    onClick={() =>
                                      navigate("/dashboard/user/profile")
                                    }
                                  >
                                    Update Address
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-warning"
                                    onClick={() =>
                                      navigate("/login", {
                                        state: "/cart",
                                      })
                                    }
                                  >
                                    Plase Login to checkout
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          <div >
                            {!cart?.length ? (
                              ""
                            ) : (
                              <button
                                className="bg-black px-4 py-2 text-white"
                                onClick={handlePayment}
                                disabled={loading || !auth?.user?.address}
                              >
                                {loading ? "Processing ...." : "Make Payment"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartPage;
