import React from "react";
import Footer from "./footer";
import Header from "./header";

type props = {
  sidebar?: boolean;
  //   className: string;
};
const Layout: React.FC<props> = ({ sidebar = true, children }) => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex md:place-content-start place-content-center">
        {sidebar && (
          <div
            id="sidebar"
            className="p-0 bg-gray-100 invisible md:visible md:p-24 "
          ></div>
        )}
        <div id="main" className="">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
