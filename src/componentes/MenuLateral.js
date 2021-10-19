import React from 'react';
import '../css/menuLateral.css';
import {useParams} from 'react-router-dom';

function MenuLateral(){
    const parametros = useParams();

    return(
        <div className="colorFondo">
            {/*<div class="nav flex-column ">
                { parametros.id == 1 ? 
                    <div>
                        <a class="nav-link active text-dark mt-5 " aria-current="page"><h4>Administrador</h4></a>
                        <hr/>
                        <nav class="nav flex-column ms-3 link-menu">
                            <a class="nav-link active text-dark" aria-current="page" href={"/home/"+parametros.id+"/crearCampeonato"}>Crear Campeonato</a>
                            <a class="nav-link text-dark" aria-current="page" href={"/home/"+parametros.id+"/crearPartido"}>Crear Partido</a>
                            <a class="nav-link text-dark" href="#">Cargar resultado partido</a>
                            <a class="nav-link text-dark" href="#">Consultar estadistica jugador</a>
                        </nav>
                    </div> : <div></div>}
                
                {parametros.id == 0 || parametros.id == 1 ?
                    <div>
                     <a class="nav-link text-dark mt-5"><h4>Jugadores</h4></a>
                     <hr/>

                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Consultar estadistica equipo</a>
                    </nav>
                    </div> : <div></div>}

                {parametros.id == 1 || parametros.id == 2 ? 
                <div>
                    <a class="nav-link text-dark mt-5"><h4>Representante</h4></a>
                    <hr/>

                    <nav class="nav flex-column ms-3 link-menu">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos personales</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos del club</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Gestionar datos de sus jugadores</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Definir lista jugadores partido</a>
                        <a class="nav-link active text-dark" aria-current="page" href="#">Validar resultado de un partido</a>
                    </nav>
                </div> : <div></div>}
                
                </div>

                <ul class="nav justify-content-center p-4">
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="#admin">Administrador</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Jugadores</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Representante   </a>
                </li>
                
                </ul>*/}
                <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                  <a class="navbar-brand text-white" href="#">FUADE</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                      <li class="nav-item">
                        <a class="nav-link text-white" aria-current="page" href={"/home/"+parametros.id}>HOME</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-white" href="/login">LOGOUT</a>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                </nav>


        </div>
           
                
            
           
    );

}

export default MenuLateral;