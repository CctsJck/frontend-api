import React, { useEffect, useState } from 'react';
import '../css/home.css';
import MenuBar from './MenuBar';
import MenuVertical from './MenuVertical';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import CrearCampeonatoForms from './admin/CrearCampeonatoForms';
import CrearPartidoForms from './admin/CrearPartidoForms';
import AgregarClubCamp from './admin/AgregarClubCamp';
import AdminCampeonatos from './admin/AdminCampeonatos';
import GestionarClub from './representante/GestionarClub';




function Home(){
    const params = useParams();
    let history = useHistory();
    const [jugador,setJugador] = useState({});
    const [representante,setRepresentante] = useState({});

    useEffect(() => {
      if (params.idRol == 0){
        axios.get("http://localhost:8080/getJugadorPorId?idJugador="+params.idPersona)
        .then(response => {
            setJugador(response.data);
        })
      } else if(params.idRol == 1){
        if(params.idPersona != 2000){
          history.push("/login");
        }
      } else if (params.idRol == 2){
        axios.get("http://localhost:8080/getRepresentantePorId?idRepresentante="+params.idPersona)
        .then(response => {
            setRepresentante(response.data);
        })
        
      } else {
        history.push("/login");
      }
    },[])
    
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
              
                {params.opcion == undefined && params.idRol == 0 ? 
                  <div>
                    <h2 className="text-center mb-3">Bienvenido {jugador.nombre} {jugador.apellido}!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1200px-Football_iu_1996.jpg" className="img-thumbnail "/>

                    </div>
                  </div>
                  : null}
                {params.opcion == undefined && params.idRol == 1 ? 
                  <div>
                    <h2 className="text-center mb-3">Bienvenido Administrador!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://www.unir.net/wp-content/uploads/2021/06/beautiful-male-computer-engineer-and-scientists-create-neural-network-picture-id1182697690.jpg" className="img-thumbnail "/>

                    </div>
                  </div>
                : null}
                {params.opcion == undefined && params.idRol == 2 ? 
                
                  <div>
                    <h2 className="text-center mb-3">Bienvenido {representante.nombre} {representante.apellido}!</h2>
                    <div className="d-flex justify-content-center">
                      <img src="https://img.freepik.com/foto-gratis/concepto-hombres-negocios-apreton-manos_53876-31214.jpg?size=626&ext=jpg" className="img-thumbnail "/>

                    </div>
                  </div> 
                : null}
  
                {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : null}
                {params.opcion == "crearPartido" ? <CrearPartidoForms/> : null }
                {params.opcion == "agregarClubCamp" ? <AgregarClubCamp/> : null}
                {params.opcion == "adminCampeonatos" ? <AdminCampeonatos/> : null}
                {params.opcion == "gestionarDatosClub" ? <GestionarClub/> : null}


              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
}

export default Home;