import { Link } from "react-router-dom";
import { useState } from "react";

export const SidebarElement = ({ to, children }) => {
  
  return (
    <>
      <Link to={to}>
        {children}
      </Link>
    </>
  )
}

export const SidebarExpand = () => {
  const [isopen, setIsopen] = useState(false);

  return <></>;
};

