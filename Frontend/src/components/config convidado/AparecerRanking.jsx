import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Gametype from "./Gametypes";
import Gamemodes from "./Gamemodes";


function AparecerRanking(){
    return(
        <div className="w-[250px] h-[90px] border bg-white">
            <p>◎ Aparecer no ranking</p>
        </div>
    );
}

export default AparecerRanking;