import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const SidebarElement = ({ to, children }) => {
  return (
    <>
      <Link to={to}>{children}</Link>
    </>
  );
};

export const SidebarExpand = ({ text, children }) => {
  const [isopen, setIsopen] = useState(false);

  return (
    <div className="flex flex-col">
      <button onClick={() => setIsopen((prev) => !prev)}>{text}</button>
      {isopen && children}
    </div>
  );
};
