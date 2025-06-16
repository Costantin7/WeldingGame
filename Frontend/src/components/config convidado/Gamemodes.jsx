import React, { useState } from "react";


function Gamemodes(props){
    const [ativo,setAtivo]=useState(true)
    const butt=()=>{setAtivo(!ativo)}

    return(     
        <button 
            className=
            {
                ativo?" border w-[250px] h-[90px] border !bg-white rounded-md shadow-xl":
                "w-[250px] h-[90px] border !bg-gray-300 rounded-md shadow-xl border "
            }
            onClick={butt}
        >
            
        <p className="underline font-serif">{props.texto}</p>
        
        <p className="font-serif">{props.legenda}</p>

        </button>
    );
}
export default Gamemodes;