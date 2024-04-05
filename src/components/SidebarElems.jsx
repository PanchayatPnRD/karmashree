import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const SidebarElement = ({ to, children, className }) => {
  return (
    <div className={className || "py-2.5 pl-16 "}>
      <NavLink
        end
        to={to}
        className={({ isActive }) =>
          isActive ? "text-white font-bold transition-all " : "text-white/70 font-normal transition-all"
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export const SidebarExpand = ({ text, children }) => {
  const [isopen, setIsopen] = useState(false);

  const textColor = useMemo(() => {
    return isopen ? "text-white font-bold transition-all" : "text-white/70 transition-all";
  }, [isopen]);

  return (
    <div className={"flex flex-col pl-16 " + textColor}>
      <button
        className="flex py-2.5 space-x-2 items-center"
        onClick={() => setIsopen((prev) => !prev)}
      >
        <span>{text}</span>
        {isopen ? (
          <Icon icon={"ep:arrow-up-bold"} />
        ) : (
          <Icon icon={"ep:arrow-down-bold"} />
        )}
      </button>
      {isopen && children}
    </div>
  );
};
