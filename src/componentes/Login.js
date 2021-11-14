import axios from 'axios';
import React, { useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';



function Login(){
    const [idUsuario, setIdUsuario] = useState(-1);
    const [idJugador, setIdJugador] = useState(-1);
    const [idAdmin, setIdAdmin] = useState(-1);
    const [idRepresentante, setIdRepresentante] = useState(-1);
    const [passwordJugador, setPasswordJugador] = useState("");
    const [passwordRepre, setPasswordRepre] = useState("");
    const [passwordAdmin, setPasswordAdmin] = useState("");
    let history = useHistory();

    

    function handleIdJugadorChange(e){
        setIdJugador(e.target.value);
    }

    function handleIdJugadorSubmit(e){
        e.preventDefault();
        axios.get("http://localhost:8080/getUsuarioByIdAndPassword?idUsuario="+idJugador+"&password="+passwordJugador)
            .then(response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    if (response.data.rol === "jugador"){
                        axios.get("http://localhost:8080/getJugadorByIdUsuario?idUsuario="+idJugador)
                        .then(response2 => {
                            if (typeof response2.data === "string"){
                                return toast.error(response.data);
                            } else {
                                history.push("/home/0/"+response2.data.idJugador);
                            }
                        })
                    } else {
                        return toast.error("Usted no es un jugador");
                    }
                    

                }
            })
            
        document.getElementById("jugadorForm").reset();


    }

    function handleIdAdminChange(e){
        setIdAdmin(e.target.value);
    }

    function handleIdAdminSubmit(e){
        e.preventDefault();
        if (idAdmin == "admin" && passwordAdmin == "admin"){
            history.push("/home/1/admin");
        } else {
            document.getElementById("adminForm").reset();
            return toast.error("Datos incorrectos");
        }
        
    }

    function handleIdRepresentanteChange(e){
        setIdRepresentante(e.target.value);
    }

    function handleIdRepresentanteSubmit(e){
        e.preventDefault();

        axios.get("http://localhost:8080/getUsuarioByIdAndPassword?idUsuario="+idRepresentante+"&password="+passwordRepre)
            .then(response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    if (response.data.rol === "Repre"){
                        axios.get("http://localhost:8080/getRepresentanteByIdUsuario?idUsuario="+idRepresentante)
                        .then(response2 => {
                            if (typeof response2.data === "string"){
                                return toast.error(response.data);
                            } else {
                                history.push("/home/0/"+response2.data.legajo);
                            }
                        })
                    } else {
                        return toast.error("Usted no es un representante");
                    }
                    

                }
            })

            document.getElementById("representanteForm").reset();

        
        

    }

    function handlePasswordJugadorChange(e){
        setPasswordJugador(e.target.value);
    }

    function handlePasswordRepresentanteChange(e){
        setPasswordRepre(e.target.value);
    }

    function handlePasswordAdminChange(e){
        setPasswordAdmin(e.target.value);
    }

    
    
    
    return (
        <div className="fondo">
            
            <div className="container ">
                <ToastContainer/>
                
                <div className="row">
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card card-overflow bg-dark text-white h-100">
                            <img src={require("../img/jugador.png").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center ">JUGADORES</h2>
                                <form onSubmit={handleIdJugadorSubmit} id="jugadorForm" className="container">
                                    <div class="mb-3">
                                        <label for="idJugador" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdJugadorChange} type="text" class="form-control" id="idJugador" aria-describedby="idJugador" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordJugador" class="form-label">Ingrese su contraseña</label>
                                        <input onChange={handlePasswordJugadorChange} type="password" class="form-control" id="passwordJugador" aria-describedby="idJugador" placeholder="Ejemplo: 1234"/>
                                    </div>
                                    <div class="mb-3">
                                        <button type="submit" class="btn btn-success">Ingresar</button>

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card card-overflow bg-dark text-white h-100">
                            <img src={require("../img/admin.jpg").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">ADMIN</h2>
                                <form onSubmit={handleIdAdminSubmit} id="adminForm" className="container">
                                    <div class="mb-3">
                                        <label for="idAdmin" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdAdminChange} type="text" class="form-control" id="idAdmin" aria-describedby="idAdmin" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordAdmin" class="form-label">Ingrese su contraseña</label>
                                        <input onChange={handlePasswordAdminChange} type="password" class="form-control" id="passwordAdmin" aria-describedby="passwordAdmin" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <button type="submit" class="btn btn-success">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mt-5"> 
                        <div class="card card-overflow bg-dark text-white h-100">
                            <img src={require("../img/RepresentanteFutbol.png").default} class="card-img-top" alt="..."/>
                            <div class="card-img-overlay vision">
                                <h2 class="card-title text-center">REPRESENTANTE</h2>
                                <form onSubmit={handleIdRepresentanteSubmit} id="representanteForm" className="container">
                                    <div class="mb-3">
                                        <label for="idRepresentante" class="form-label">Ingrese ID</label>
                                        <input onChange={handleIdRepresentanteChange} type="text" class="form-control" id="IdRepresentante" aria-describedby="IdRepresentante" placeholder="Ejemplo: 1"/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordRepresentante" class="form-label">Ingrese su contraseña</label>
                                        <input onChange={handlePasswordRepresentanteChange} type="password" class="form-control" id="passwordRepresentante" aria-describedby="passwordRepresentante" placeholder="Ejemplo: 1"/>
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