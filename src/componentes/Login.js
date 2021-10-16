import React from 'react';
import '../css/login.css';

function Login(){
    return (
        <div className="fondo">
            
            <div className="container ">
                <div className="row">
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src="https://cdn.discordapp.com/attachments/759833803433705516/898579175861018694/diputados-maradonajpg.png" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center ">JUGADORES</h2>
                                <a href="#" class="stretched-link"></a>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src="https://blogs.rockyview.ab.ca/wp-content/uploads/2018/04/admin-prof-day.jpg" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">ADMIN</h2>
                                <a href="#" class="stretched-link"></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src="https://cdn.discordapp.com/attachments/759833803433705516/898596337380130886/RepresentanteFutbol.png" class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">REPRESENTANTE</h2>
                                <a href="#" class="stretched-link"></a>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        
    );
}

export default Login;