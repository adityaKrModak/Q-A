import Image from "next/image";
import Link from "next/link";
import React from "react";
import GoogleIcon from "../components/Common/Icons/googleIcon";
import loginBackground from "../public/img/login-background.jpg";

const login = () => {
  return (
    <div className="bg-sky-100 h-screen w-screen grid place-content-center">
      <div className="md:grid md:grid-cols-2 bg-sky-100 md:min-h-[500px] md:min-w-[800px]">
        <div className="bg-white pl-[10%] w-[400px] md:w-inherit rounded-md">
          <div className="font-lobster text-3xl text-cyan-400 mb-8 mt-4 pt-4 md:pt-0">
            Q&A
          </div>
          <div className="font-serif text-xl font-bold mb-1">Login</div>
          <div className="text-gray-400 font-bold text-sm mb-4">
            Ask your questions and get answers!
          </div>
          <button className="rounded-full border-slate-300 border-2 w-[280px] py-2 mb-4 hover:bg-cyan-400 hover:text-white">
            <div className="mx-2 font-bold text-sm flex place-content-center w-full">
              <GoogleIcon className="w-5 h-5 mr-1" /> Sign in with Google
            </div>
          </button>
          <br />

          <label htmlFor="email" className="font-bold text-sm ">
            Email:
          </label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="aa@bb.com"
            className="rounded-full border-slate-300 border-2 w-[280px] px-4 py-2 text-sm mb-2"
          />
          <br />
          <label htmlFor="password" className="font-bold text-sm ">
            Password:
          </label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Min 8 characters"
            className="rounded-full border-slate-300 border-2 w-[280px] px-4 py-2 text-sm mb-2"
          />

          <br />
          <div className="flex place-content-between mt-2 w-[280px] font-bold text-xs">
            <div>
              <input id="rememberMe" type="checkbox" />
              <label htmlFor="rememberMe" className="pl-2">
                Remember me
              </label>
            </div>
            <Link href={"/"}>
              <a className="text-cyan-400 hover:text-black">
                {" "}
                Forgot Password?
              </a>
            </Link>
          </div>

          <button className="rounded-full border-slate-300 border-2 w-[280px]  py-2 bg-cyan-400 text-sm font-bold text-white mt-4 hover:bg-black">
            Login
          </button>

          <div className="text-xs flex mt-4 pb-4 md:pb-0">
            Not registered yet?{" "}
            <Link href="/login">
              <a className="text-cyan-400 font-bold hover:text-black">
                Create an Account
              </a>
            </Link>
          </div>
        </div>

        <div className="md:grid content-center bg-cyan-400 hidden md:visible">
          <Image
            src={loginBackground}
            width="100%"
            height="100%"
            alt="backgroundImage"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default login;
