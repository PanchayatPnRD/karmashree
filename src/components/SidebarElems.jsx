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
      <button className="flex" onClick={() => setIsopen((prev) => !prev)}>
        <span>{text}</span>
        {isopen ? (<Icon icon={"ep:arrow-down"} />):(<Icon icon={"ep:arrow-up"} />)}
      </button>
      {isopen && children}
    </div>
  );
};
