import React from 'react';
import {useParams} from 'react-router-dom';


function MenuVertical(){
    const params = useParams();

    return(
        <div class="list-group" id="list">
            {params.id == 1 ? 
            <div>
            <h2>Administrador</h2>
            <a type="button" href={"/home/"+params.id+"/crearCampeonato"}  class={params.opcion == 'crearCampeonato' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Crear Campeonato</a>
            <a type="button" href={"/home/"+params.id+"/crearPartido"}  class={params.opcion == 'crearPartido' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Crear partido</a>
            <a type="button" href="" class="list-group-item list-group-item-action" >Cargar resultado partido</a>
            <a type="button" href="" class="list-group-item list-group-item-action"   >Consulta estadistica jugador</a>
            <a type="button" href={"/home/"+params.id+"/agregarClubCamp"} class={params.opcion == 'agregarClubCamp' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} >Agregar club a un Campeonato</a>
            <a type="button" href={"/home/"+params.id+"/adminCampeonatos"} class={params.opcion == 'adminCampeonatos' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Administrar campeonatos</a>
            <a type="button" href="" class="list-group-item list-group-item-action">Administrar representantes</a>
            <a type="button" href="" class="list-group-item list-group-item-action">Administrar partidos</a>
            <hr/>
            </div>:null}
            
            {params.id == 0 || params.id == 1 ?
            <div>
                <h2>Jugadores</h2>

                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos personales</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Consultar estadistica jugador</a>
                
            </div>:null}

            {params.id == 1 || params.id == 2 ? 
            <div>
                {params.id == 1 ? <hr/> : null}
                <h2>Representante</h2>

                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos personales</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos del club</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Gestionar datos de sus jugadores</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Definir lista jugadores de un partido</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Validar resultado de un partido</a>
                <a type="button" href="" class="list-group-item list-group-item-action">Consultar partidos</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Consultar estadisticas de un jugador</a>
            </div> : null}

        </div>
    )
    

}

export default MenuVertical;