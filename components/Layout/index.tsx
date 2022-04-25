import React from "react";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import Footer from "./footer";
import Header from "./header";

type props = {
  hideSideBars?: boolean;
  //   className: string;
};
const Layout: React.FC<props> = ({ hideSideBars = false, children }) => {
  return (
    <div className="flex-col">
      <Header />
      <div className={!hideSideBars ? "bg-slate-100" : ""}>
        <div className="md:flex md:place-content-center">
          {!hideSideBars && <LeftSideBar />}
          <div id="main" className="">
            {children}
          </div>
          {!hideSideBars && <RightSideBar />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
