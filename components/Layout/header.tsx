import React from "react";

type props = {
  //   className: string;
};
const Header: React.FC<props> = ({ children }) => {
  return (
    <div id="header" className="p-4 bg-gray-400 flex">
      Header
    </div>
  );
};

export default Header;
