import React, { useEffect, useState } from 'react';
import '../css/home.css';
import MenuBar from './MenuBar';
import MenuVertical from './MenuVertical';
import {useParams} from 'react-router-dom';
import CrearCampeonatoForms from './admin/CrearCampeonatoForms';
import CrearPartidoForms from './admin/CrearPartidoForms';
import AgregarClubCamp from './admin/AgregarClubCamp';
import AdminCampeonatos from './admin/AdminCampeonatos';




function Home(){
    const params = useParams();

    
    return(
      <div className="">
        <div className="col-12">
          <MenuBar/>
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-3 mt-5 ">
              <MenuVertical/>
            </div>
            <div className="col-9 mt-5">
              <div className="row mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                {params.opcion == undefined && params.id == 0 ? 
                  <div>
                    <h2 className="text-center mb-3">Bienvenido Jugador!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1200px-Football_iu_1996.jpg" className="img-thumbnail "/>

                    </div>
                  </div>
                  : null}
                {params.opcion == undefined && params.id == 1 ? 
                  <div>
                    <h2 className="text-center mb-3">Bienvenido Administrador!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://www.unir.net/wp-content/uploads/2021/06/beautiful-male-computer-engineer-and-scientists-create-neural-network-picture-id1182697690.jpg" className="img-thumbnail "/>

                    </div>
                  </div>
                : null}
                {params.opcion == undefined && params.id == 2 ? 
                
                  <div>
                    <h2 className="text-center mb-3">Bienvenido Representante!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://img.freepik.com/foto-gratis/concepto-hombres-negocios-apreton-manos_53876-31214.jpg?size=626&ext=jpg" className="img-thumbnail "/>

                    </div>
                  </div> 
                : null}

                {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : null}
                {params.opcion == "crearPartido" ? <CrearPartidoForms/> : null }
                {params.opcion == "agregarClubCamp" ? <AgregarClubCamp/> : null}
                {params.opcion == "adminCampeonatos" ? <AdminCampeonatos/> : null}
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
}

export default Home;