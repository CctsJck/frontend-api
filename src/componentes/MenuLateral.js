import React from 'react';
import '../css/menuLateral.css';
import {useParams} from 'react-router-dom';

function MenuLateral(){
    const parametros = useParams();

    return(
        <div>
            <div class="nav flex-column  mt-5">
                { parametros.id == 1 ? 
                    <div>
                        <a class="nav-link active text-dark mt-5 " aria-current="page"><h4>Administrador</h4></a>
                        <nav class="nav flex-column ms-3 link-menu">
                            <a class="nav-link active text-dark" aria-current="page" href={"/home/"+parametros.id+"/crearCampeonato"}>Crear Campeonato</a>
                            <a class="nav-link text-dark" href="#">Crear Partido</a>
                            <a class="nav-link text-dark" href="#">Cargar resultado partido</a>
                            <a class="nav-link text-dark" href="#">Consultar estadistica jugador</a>
                        </nav>
                    </div> : <div></div>}
                
                {parametros.id == 0 || parametros.id == 1 ?
                    <div>
                     <a class="nav-link text-dark mt-5"><h4>Jugadores</h4></a>
                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Consultar estadistica equipo</a>
                    </nav>
                    </div> : <div></div>}

                {parametros.id == 1 || parametros.id == 2 ? 
                <div>
                    <a class="nav-link text-dark mt-5"><h4>Representante</h4></a>
                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos del club</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos de sus jugadores</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Definir lista jugadores partido</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Validar resultado de un partido</a>
                    </nav>
                </div> : <div></div>}
                
            </div>

        </div>
    );

}

export default MenuLateral;