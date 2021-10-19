import React from 'react';
import '../css/home.css';
import MenuLateral from './MenuLateral';
import {useParams} from 'react-router-dom';
import CrearCampeonatoForms from './CrearCampeonatoForms';
import CrearPartidoForms from './CrearPartidoForms';



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
<<<<<<< Updated upstream
          {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : console.log("No")}
          {params.opcion == "crearPartido" ? <CrearPartidoForms/> : console.log("No") }

=======
          {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : console.log("No ")}
          
>>>>>>> Stashed changes
        </div>

      </div>
    </div>
    );
}

export default Home;