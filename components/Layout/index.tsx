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
        <div id="sidebar" className="p-24 bg-gray-100"></div>
        <div id="main" className="h-screen">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
