import React from "react";
import { ColorRing } from "react-loader-spinner";

import Karmashree_logo from "/assets/img/Karmashree_logo.png";



const ColorRingCustomLoader = ({ isLoader=true }) => {
  return (
    <>
      <div className="loaderCntr">
        <div className="loaderDesign">
          <img src={Karmashree_logo} width="55px" />
          <ColorRing
            visible={isLoader}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            color="#4fa94d"
//   secondaryColor= '#4fa94d'
          />
        </div>
      </div>
    </>
  );
};

export default ColorRingCustomLoader;
