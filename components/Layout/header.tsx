import React from "react";
import Link from "next/link";

const LinkStyle = "mr-5 md:mr-10 hover:font-extrabold hover:text-cyan-400";

const Header: React.FC = () => {
  return (
    <div id="header" className="p-4 bg-white flex">
      <div className="font-lobster text-xl md:text-3xl  flex-1 ml-2 md:ml-10">
        Q&A
      </div>
      <div className="font-serif text-sm md:text-lg font-bold">
        <div className="">
          <Link href="/">
            <a className={`${LinkStyle}`}>Home</a>
          </Link>
          <Link href="/question">
            <a className={LinkStyle}>Questions</a>
          </Link>
          <Link href="/">
            <a className={LinkStyle}>FAQ</a>
          </Link>
          <button className="border rounded-full bg-black text-white text-center text-base md:text-lg px-7 py-2 pb-3 font-bold   hover:bg-cyan-400">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
