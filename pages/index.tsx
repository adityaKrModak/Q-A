import Image from "next/image";
import React from "react";
import SearchBar from "../components/Common/SearchBar";
import Layout from "../components/Layout";
import homeBackground from "../public/img/home-background.jpg";

const Home = () => {
  return (
    <Layout hideSideBars={true}>
      <div className="relative">
        <Image className="z-1" src={homeBackground} alt="backgroundImage" />
        <div className="absolute top-10 origin-center w-full ">
          <h1 className="text-center font-cormorant font-extrabold text-3xl md:text-5xl lg:text-7xl break-words">
            {" "}
            Asking Questions
          </h1>
          <h1 className="text-center font-cormorant font-extrabold text-xl md:text-5xl lg:text-7xl break-words">
            {" "}
            Important To Your learning
          </h1>
          <SearchBar />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
