import React from "react";
import Footer from "./footer";
import Header from "./header";

type props = {
  //   className: string;
};
const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex place-start">
        <div
          id="sidebar"
          className="p-0 bg-gray-100 invisible md:visible md:p-24 "
        ></div>
        <div id="main" className="">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
