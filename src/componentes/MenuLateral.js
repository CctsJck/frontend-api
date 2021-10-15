import React from 'react';
import '../css/menuLateral.css';

function MenuLateral(){


    return(
        <div>
            <div class="nav flex-column  mt-5">
                
                <a class="nav-link active text-dark mt-5 " aria-current="page"><h4>Administrador</h4></a>
                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Crear Campeonato</a>
                        <a class="nav-link text-dark" href="#">Crear Partido</a>
                        <a class="nav-link text-dark" href="#">Cargar resultado partido</a>
                        <a class="nav-link text-dark" href="#">Consultar estadistica jugador</a>

                    </nav>
                <a class="nav-link text-dark mt-5"><h4>Jugadores</h4></a>
                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Consultar estadistica equipo</a>
                    </nav>
                <a class="nav-link text-dark mt-5"><h4>Representante</h4></a>
                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos del club</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos de sus jugadores</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Definir lista jugadores partido</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Validar resultado de un partido</a>
                    </nav>
            </div>

        </div>
    );

}

export default MenuLateral;