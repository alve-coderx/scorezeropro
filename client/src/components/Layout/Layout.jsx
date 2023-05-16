import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "83vh" }} className="lg:pt-28 pt-10">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
