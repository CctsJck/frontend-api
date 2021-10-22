import axios from 'axios';
import React, { useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';



function Login(){
    const [idJugador, setIdJugador] = useState(-1);
    const [idAdmin, setIdAdmin] = useState(-1);
    const [idRepresentante, setIdRepresentante] = useState(-1);
    let history = useHistory();

    

    function handleIdJugadorChange(e){
        setIdJugador(e.target.value);
    }

    function handleIdJugadorSubmit(e){
        e.preventDefault();
        axios.get("http://localhost:8080/getJugadorPorId?idJugador="+idJugador)
            .then(response => {
                history.push("/home/0/"+idJugador);
            })
            .catch(error => {
                document.getElementById("jugadorForm").reset();
                return toast.error("No existe el jugador");
            })
        

    }

    function handleIdAdminChange(e){
        setIdAdmin(e.target.value);
    }

    function handleIdAdminSubmit(e){
        e.preventDefault();
        if (idAdmin == 2000){
            history.push("/home/1/2000");
        } else {
            document.getElementById("adminForm").reset();
            return toast.error("Id incorrecto");
        }
        
    }

    function handleIdRepresentanteChange(e){
        setIdRepresentante(e.target.value);
    }

    function handleIdRepresentanteSubmit(e){
        e.preventDefault();
        axios.get("http://localhost:8080/getRepresentantePorId?idRepresentante="+idRepresentante)
            .then(response => {
                history.push("/home/2/"+idRepresentante);
            })
            .catch(error => {
                document.getElementById("representanteForm").reset();
                return toast.error("No existe el representante");
            })
        

    }
    
    
    return (
        <div className="fondo">
            
            <div className="container ">
                <ToastContainer/>
                <div className="row">
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src={require("../img/jugador.png").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center ">JUGADORES</h2>
                                <form onSubmit={handleIdJugadorSubmit} id="jugadorForm">
                                    <div class="mb-3">
                                        <label for="idJugador" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdJugadorChange} type="text" class="form-control" id="idJugador" aria-describedby="idJugador" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <button type="submit" class="btn btn-success">Ingresar</button>
                                </form>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src={require("../img/admin.jpg").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">ADMIN</h2>
                                <form onSubmit={handleIdAdminSubmit} id="adminForm">
                                    <div class="mb-3">
                                        <label for="idAdmin" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdAdminChange} type="text" class="form-control" id="idAdmin" aria-describedby="idAdmin" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <button type="submit" class="btn btn-success">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card bg-dark text-white h-100">
                            <img src={require("../img/RepresentanteFutbol.png").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">REPRESENTANTE</h2>
                                <form onSubmit={handleIdRepresentanteSubmit} id="representanteForm">
                                    <div class="mb-3">
                                        <label for="idRepresentante" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdRepresentanteChange} type="text" class="form-control" id="IdRepresentante" aria-describedby="IdRepresentante" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <button type="submit" class="btn btn-success">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
            
        </div>
        
    );
}

export default Login;