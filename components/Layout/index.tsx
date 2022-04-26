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
        <div className="flex flex-col md:flex-row place-content-center">
          {!hideSideBars && (
            <div className="m-2 mt-7">
              {" "}
              <LeftSideBar />
            </div>
          )}
          <div id="main" className="">
            {children}
          </div>
          {!hideSideBars && (
            <div className="order-first md:order-last">
              <RightSideBar />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
