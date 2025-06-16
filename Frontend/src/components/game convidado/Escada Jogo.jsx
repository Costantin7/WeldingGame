import React from "react";
import Soldadores from "./Soldadores";


function Lugarnaescada(props)
{

    var valy0=-props.level*20+275;
    var valx0=-props.level*20+1040;
    var valy=-props.level*24+260;
    var valx=-props.level*44+920;

    if(props.level==0)
    {
        return(
            <div className="relative z-50 w-[120px]" style={{ top: `${valy0}px`, left: `${valx0}px` }}> 
                <img src={`./src/img/Soldadores/Nivel${props.level}.png`}  alt={`nivel ${props.level}`}  />
            </div>
        );
    }
    else
    {
        return(
            <div className="relative z-50 w-[220px]" style={{ top: `${valy}px`, left: `${valx}px` }}> 
                <img src={`./src/img/Soldadores/Nivel${props.level}.png`}  alt={`nivel ${props.level}`}  />
            </div>
        );
    }
}
    
    //${-props.level*10
function EscadaJogo(props){
    return(
        <div>
            <div className="w-[1200px]">
                <img className="absolute " src={props.link} alt={props.nome} />
                <Lugarnaescada level={props.nivel}/> 
            </div>
        </div>
    );
}

export default EscadaJogo;