import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div id="header" className="p-4 bg-white flex z-50">
      <div className="font-lobster text-xl md:text-3xl  flex-1 ml-2 md:ml-10">
        Q&A
      </div>
      <div className="font-serif text-sm md:text-lg font-bold">
        <div className="">
          <Link href="/">
            <a className="mr-5 md:mr-10 hover:font-extrabold hover:text-cyan-400">
              Home
            </a>
          </Link>
          <Link href="/question">
            <a className="mr-5 md:mr-10 hover:font-extrabold hover:text-cyan-400">
              Questions
            </a>
          </Link>
          <Link href="/">
            <a className=" mr-5 md:mr-10 hover:font-extrabold hover:text-cyan-400">
              FAQ
            </a>
          </Link>
          <button className="border rounded-full bg-black text-white text-center text-base md:text-xl px-7 py-2 font-bold   hover:bg-cyan-400">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
