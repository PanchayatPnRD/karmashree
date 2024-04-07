import { NavLink, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const SidebarElement = ({ to, children, className }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={()=>navigate(to)}
      className={
        (className || "py-2.5 pl-16 ") +
        " hover:bg-blue-800/40 rounded-lg transition-all duration-100 cursor-pointer"
      }
    >
      <NavLink
        end
        to={to}
        className={({ isActive }) => {
          return (
            (isActive
              ? "text-white font-semibold"
              : "text-white/40 font-normal") + " transition-all duration-300"
          );
        }}
      >
        {children}
      </NavLink>
    </div>
  );
};

export const SidebarExpand = ({ text, children }) => {
  const [isopen, setIsopen] = useState(false);

  const textColor = useMemo(() => {
    return isopen ? "text-white font-semibold" : "text-white/40";
  }, [isopen]);

  return (
    <div className={"flex flex-col transition-all " + textColor}>
      <button
        className="flex py-2.5 pl-16 space-x-2 rounded-lg items-center hover:bg-blue-800/40 transition-all duration-100"
        onClick={() => setIsopen((prev) => !prev)}
      >
        <span>{text}</span>
        {isopen ? (
          <Icon icon={"ep:arrow-up-bold"} />
        ) : (
          <Icon icon={"ep:arrow-down-bold"} />
        )}
      </button>
      <div className="pl-16">{isopen && children}</div>
    </div>
  );
};
