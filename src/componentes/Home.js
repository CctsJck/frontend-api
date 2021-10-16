import React from 'react';
import '../css/home.css';
import MenuLateral from './MenuLateral';
import {useParams} from 'react-router-dom';
import CrearCampeonatoForms from './CrearCampeonatoForms';



function Home(){
    const params = useParams();
    
    
    return(
    <div className="row">
      <div className="col-2 columna">
        <MenuLateral/>
      </div>
      <div className="col-10  ">
        <div className="row pb-5 columnaMenu">


        </div>
        <div className="row columnaContenido">
          {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : console.log("No ")}

        </div>

      </div>
    </div>
    );
}

export default Home;