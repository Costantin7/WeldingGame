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
            <div className=" absolute bottom-4 right-3  h-[21px] w-[50px] bg-gray-400 rounded-xl"></div>
            <div className=" absolute bottom-4 right-3 h-[21px] w-[21px] bg-blue-600 rounded-xl"></div>
          </div>
        ) : (
          <div>
            <div className="absolute bottom-4 right-3  h-[21px] w-[50px] bg-blue-400 rounded-xl"></div>
            <div className="absolute bottom-4 right-10 h-[21px] w-[21px] bg-blue-600 rounded-xl"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BotaoDeslizante;
