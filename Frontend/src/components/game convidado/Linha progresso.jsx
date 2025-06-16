import React from "react";


function LinhaProgresso(props) {
  return (
    <div>

      <p className="flex">
        {props.nivel} / 20
      </p>

      <div className="relative w-[600]">

        <div className="absolute top-0 left-0 h-[15px] bg-gray-500 mt-7 w-full rounded-xl"></div>
        <div className="absolute top-0 left-0 h-[15px] bg-blue-500 mt-7 rounded-xl"style={{ width: `${props.nivel*60}px` }}></div>  
              
      </div>

    </div>
  );
}

export default LinhaProgresso;