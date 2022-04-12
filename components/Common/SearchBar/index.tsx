import React from "react";

const SearchBar = () => {
  return (
    <div className="grid place-items-center mt-5 ">
      <div className="flex w-[260px] h-[40px] md:w-[600px] block md:h-[50px] bg-white  border border-slate-300 rounded-full py-2 pl-9 pr-3  active:border-slate-700">
        <input
          className="flex-1  placeholder:text-slate-400 focus:outline-none"
          placeholder="What is your question?"
          type="text"
          name="search"
        />
        <span className="text-gray-500 md:mt-1 md:mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
