import React from "react";

function BotaoDeslizante(props) {
  return (
    <div>
      <div
        onClick={() => props.setTimer(!props.timer)}
        className="relative transition "
      >
        {!props.parameter ? (
          <div>
            <div className=" absolute bottom-4 right-3  h-[21px] w-[50px] bg-gray-400 rounded-xl cursor-pointer	"></div>
            <div className=" absolute bottom-4 right-3 h-[21px] w-[21px] bg-gray-800 rounded-xl cursor-pointer	"></div>
          </div>
        ) : (
          <div>
            <div className="absolute bottom-4 right-3  h-[21px] w-[50px] bg-blue-400 rounded-xl cursor-pointer	"></div>
            <div className="absolute bottom-4 right-11 h-[21px] w-[20px] bg-blue-600 rounded-xl cursor-pointer	"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BotaoDeslizante;
