import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import CartPage from "../../pages/CartPage";
import DropDown from "../../components/DropDown/DropDown";

const menus = [
  { name: "Home", href: "/" },
  { name: "Screen Protection", href: "/" },
];

const TopHead = ({
  open,
  setOpen,
  sidebar,
  setSidebar,
  auth,
  setAuth,
  cart,
}) => {
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between container mx-auto px-2">
        <AiOutlineMenu
          className="text-black lg:text-2xl text-md lg:hidden block"
          onClick={() => setSidebar(true)}
        />
        {/* <Sidebar sidebar={sidebar} setSidebar={setSidebar} /> */}
        <div>
          <img src={logo} alt="logo" className="lg:w-72 w-40" />
        </div>
        <div className="flex items-center space-x-3 ">
          <SearchInput />
          <div>
            {/* <span>{cart.length}</span> */}
            <AiOutlineShopping
              className="lg:text-2xl text-md cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          {<CartPage open={open} setOpen={setOpen} />}
          {auth.user ? (
            <DropDown
              label={
                <AiOutlineUser className="lg:text-2xl text-md cursor-pointer" />
              }
            >
              <NavLink
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                <p className=" font-[500] hover:text-secondary opacity-50">
                  {auth?.user?.role === 1 ? "Dashboard" : "Profile"}
                </p>
              </NavLink>
              <NavLink to={`/dashboard/user/orders`}>
                <p className=" font-[500] hover:text-secondary opacity-50">
                  Orders
                </p>
              </NavLink>
              <NavLink to={`/`}>
                <p className=" font-[500] hover:text-secondary opacity-50">
                  Account Details
                </p>
              </NavLink>
              <button
                onClick={handleLogout}
                className="font-[500] hover:text-secondary opacity-50"
              >
                Logout
              </button>
            </DropDown>
          ) : (
            <NavLink to="/login">
              <FiLogIn className="lg:text-xl text-md cursor-pointer" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
const MenuItems = ({ setOpenMenu, opemMenu, auth, categories }) => {
  return (
    <div className="bg-black lg:block hidden">
      <div className="container mx-auto flex items-center space-x-2">
        <div
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
          className="bg-secondary p-2 relative cursor-pointer"
        >
          <div className="flex items-center justify-between w-72">
            <div className="flex items-center">
              <BiCategoryAlt className="font-[600] text-lg" />
              <span className="font-[600]">CATEGORIES</span>
            </div>
            <MdOutlineKeyboardArrowDown className="font-[600] text-lg" />
          </div>
          <div
            className={`absolute top-8 border bg-white w-full overflow-y-hidden flex flex-col left-0 transition-all ${
              opemMenu ? "h-auto" : "h-0 "
            }`}
          >
            {categories.map((c, index) => (
              <NavLink
                to={`/category/${c.slug}`}
                key={index}
                className="hover:opacity-60 text-center px-5 py-2 font-[600] text-sm"
              >
                {c.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-5 ">
          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-white font-[500]"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
const Header = () => {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [opemMenu, setOpenMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  return (
    <>
      <nav className="fixed w-full z-10">
        <TopHead
          sidebar={sidebar}
          setSidebar={setSidebar}
          setOpen={setOpen}
          open={open}
          auth={auth}
          setAuth={setAuth}
          cart={cart}
        />
        <MenuItems
          categories={categories}
          auth={auth}
          setOpenMenu={setOpenMenu}
          opemMenu={opemMenu}
        />
      </nav>
    </>
  );
};

export default Header;
