import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';




function MenuVertical(){
    const params = useParams();
    

    

    return(
        <div class="list-group" id="list-tab" role="tab-list">
            {params.idRol == 1 ? 
            <div>
            <h2>Administrador</h2>


            <a type="button"  href={"/home/"+params.idRol+"/"+params.idPersona+"/crearCampeonato"}  class={params.opcion == 'crearCampeonato' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Crear Campeonato</a>
            <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/crearPartido"}  class={params.opcion == 'crearPartido' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Crear partido</a>
            <a type="button" href="" class="list-group-item list-group-item-action" >Cargar resultado partido</a>
            <a type="button" href="" class="list-group-item list-group-item-action"   >Consulta estadistica jugador</a>
            <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/agregarClubCamp"} class={params.opcion == 'agregarClubCamp' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} >Agregar club a un Campeonato</a>
            <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/adminCampeonatos"} class={params.opcion == 'adminCampeonatos' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Administrar campeonatos</a>
            <a type="button" href="" class="list-group-item list-group-item-action">Administrar representantes</a>
            <a type="button" href="" class="list-group-item list-group-item-action">Administrar partidos</a>
            <hr/>
            </div>:null}
            
            {params.idRol == 0 || params.idRol == 1 ?
            <div>
                <h2>Jugadores</h2>

                <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/gestionarDatosPesonalesJugador"} class={params.opcion == 'gestionarDatosPersonalesJugador' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">Gestionar datos personales</a>
                <a type="button" href="" class="list-group-item list-group-item-action" aria-current="true">Consultar estadistica jugador</a>
                
            </div>:null}

            {params.idRol == 1 || params.idRol == 2 ? 
            <div>
                {params.idRol == 1 ? <hr/> : null}
                <h2>Representante</h2>

                <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/gestionarDatosPesonalesRepresentante"} class={params.opcion == 'gestionarDatosPersonalesRepresentante' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">Gestionar datos personales</a>
                <a type="button" href={"/home/"+params.idRol+"/"+params.idPersona+"/gestionarDatosClub"} class={params.opcion == 'gestionarDatosClub' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">Gestionar datos del club</a>
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