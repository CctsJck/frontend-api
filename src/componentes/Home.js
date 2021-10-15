import React from 'react';
import '../css/home.css';
import MenuLateral from './componentes/MenuLateral';


function Home(){
    return(
    <div className="row">
      <div className="col-2 columna">
        <MenuLateral/>
      </div>
      <div className="col-10  ">
        <div className="row pb-5 columnaMenu">


        </div>
        <div className="row columnaContenido">
          <Home/>

        </div>

      </div>
    </div>
    );
}

export default Home;