import React from 'react';
import '../css/home.css';
import MenuLateral from './MenuLateral';
import {useParams} from 'react-router-dom';
import CrearCampeonatoForms from './CrearCampeonatoForms';
import CrearPartidoForms from './CrearPartidoForms';



function Home(){
    const params = useParams();
    
    
    return(
    <div className="">
      <div className="col-12">
        <MenuLateral/>
      </div>
      <div className="container ">
        <div className="row">
          <div className="col-3 mt-5 ">
            <div class="list-group">
              {params.id == 1 ? 
              <div>

              <a type="button" href={"/home/"+params.id+"/crearCampeonato"} class="list-group-item list-group-item-action" aria-current="true">Crear Campeonato</a>
              <a type="button" href={"/home/"+params.id+"/crearPartido"} class="list-group-item list-group-item-action" aria-current="true">Crear partido</a>
              <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Cargar resultado partido</a>
              <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Consulta estadistica jugador</a>
              <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Agregar club a un Campeonato</a>
              <hr/>
              </div>:null}
              
              {params.id == 0 || params.id == 1 ?
              <div>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos personales</a>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Consultar estadistica jugador</a>
                  
              </div>:null}

              {params.id == 1 || params.id == 2 ? 
              <div>
                  {params.id == 1 ? <hr/> : null}
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos personales</a>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos del club</a>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos de sus jugadores</a>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Definir lista jugadores de un partido</a>
                  <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Validar resultado de un partido</a>

              </div> : null}

            </div>
          </div>
          <div className="col-9">
            <div className="row columnaContenido mt-5 shadow-lg p-3 mb-5 bg-body rounded">
              {params.opcion == "crearCampeonato" ? <CrearCampeonatoForms/> : console.log("No")}
              {params.opcion == "crearPartido" ? <CrearPartidoForms/> : console.log("No") }
            </div>
          </div>
        
        </div>
      </div>
    </div>
    );
}

export default Home;