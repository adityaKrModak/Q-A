import React from "react";

type props = {
  //   className: string;
};
const Footer: React.FC<props> = ({ children }) => {
  return (
    <div id="footer" className="p-4 bg-gray-500">
      Footer
    </div>
  );
};

export default Footer;
