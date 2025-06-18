// import { useState } from "react";

function BotaoIdioma(props) {
  // const[Lang,setLang]=useState(0)

  function changeLang() {
    if (props.langprops === 0) {
      props.setlangUpprops();
    } else {
      props.setlangDownprops();
    }
  }

  return (
    <div className="font-serif  flex">
      <button
        onClick={changeLang}
        className=" h-11 shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !border !border-black !bg-white flex p-4 ml-auto mb-10 space-x-3"
      >
        {props.langprops == 0 && (
          <div className="flex gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/500px-Flag_of_Brazil.svg.png"
            />
            <p>Portugues </p>
            <p> ▼</p>
          </div>
        )}

        {props.langprops == 1 && (
          <div className="flex gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png"
            />
            <p>English </p>
            <p> ▼ </p>
          </div>
        )}
      </button>
    </div>
  );
}
export default BotaoIdioma;
