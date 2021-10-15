import React from 'react';
import '../css/login.css';

function Login(){
    return (
        <div className="container-fluid">
                <div className="row columnaMenu m-5">
                    <h2 className="text-center">Seleccione su perfil</h2>

                </div>
                <div className="row ">
                    <div className="col-4"> 
                        <div class="card bg-dark text-white h-100">
                            <img src="https://cdn.discordapp.com/attachments/759833803433705516/898579175861018694/diputados-maradonajpg.png" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay">
                                <h5 class="card-title text-center">JUGADORES</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"> 
                    <div class="card bg-dark text-white h-100">
                            <img src="https://blogs.rockyview.ab.ca/wp-content/uploads/2018/04/admin-prof-day.jpg" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay">
                                <h5 class="card-title text-center">Administrador</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"> 
                    <div class="card bg-dark text-white h-100">
                            <img src="https://cdn.discordapp.com/attachments/759833803433705516/898596337380130886/RepresentanteFutbol.png" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay">
                                <h5 class="card-title text-center">Representante</h5>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    );
}

export default Login;