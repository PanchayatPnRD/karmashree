import { Children } from "react";
import { SidebarElement, SidebarExpand } from "./SidebarElems";

export const Sidebar = () => {
  return (
    <div className="h-full bg-blue-950 flex flex-col">
      <SidebarElement to="/dashboard/first">
        <div className="text-white text-center">Hello</div>
      </SidebarElement>
    </div>
  );
};
