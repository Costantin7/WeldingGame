import React from "react";

function Soldadores(props){

    function NivSolda(nivel)
    {
        return(<img className="mz-50 " src={`./src/img/Soldadores/Nivel${nivel}.png`}  alt={`nivel ${nivel}`}  />);
    }

    return(<div>{NivSolda(props.nivel)}</div>);
}
export default Soldadores;