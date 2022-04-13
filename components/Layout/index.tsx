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
      <div className={sidebar ? "bg-slate-100" : ""}>
        <div className="md:flex md:justify-evenly">
          {sidebar && (
            <div
              id="sidebar"
              className="p-0 bg-gray-100 invisible md:visible "
            ></div>
          )}
          <div id="main" className="">
            {children}
          </div>
          {sidebar && (
            <div id="rightBar" className="bg-white m-2 invisible md:visible">
              <div
                id="askQuestion"
                className=" border-slate-100 border-b-4 p-5 "
              >
                <button className="bg-cyan-400 text-white p-4 font-bold lg:w-[300px]">
                  Ask A Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
