import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function ConsultarEstadisticasJugador (props){

    const [clubes, setClubes] = useState([]);
    const [clubSelect, setClubSelect] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    const [jugadorSelect, setJugadorSelect] = useState("");
    const [campeonatos, setCampeonatos ] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState([]);
    const [datosJugador, setDatosJugador] = useState({});
    const [estadisticasJugador, setEstadisticasJugador] = useState([]);




    useEffect(() => {
        if(props.idJugador === undefined){
            axios.get("http://localhost:8080/obtenerCampeonatos")
            .then( response => {
                setCampeonatos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            console.log(props.idJugador)
            axios.get("http://localhost:8080/obtenerCampeonatosDeUnJugador?idJugador="+props.idJugador)
            .then( response => {
                setCampeonatos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },[])



    useEffect(() => {
        if (props.idJugador === undefined){
            axios.get('http://localhost:8080/obtenerClubesCampeonato?idCampeonato='+campeonatoSelect)
            .then( response => {
                setClubes(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },[campeonatoSelect])

    useEffect(() => {
        if (props.idJugador === undefined){
            axios.get("http://localhost:8080/getJugadoresClub?idClub="+clubSelect)
            .then( response => {
                setJugadores(response.data);
            })
            .catch(error => {
            })
        }
    },[clubSelect])

    useEffect(() => {
        if (props.idJugador === undefined){
            axios.get("http://localhost:8080/getJugadorPorId?idJugador="+jugadorSelect)
            .then( response => {
                setDatosJugador(response.data);
            })
            .catch(error => {
                console.log(error);
            })

            axios.get("http://localhost:8080/getEstadisticaJugadorCampeonato?idJugador="+jugadorSelect+"&idCampeonato="+campeonatoSelect)
            .then( response => {
                setEstadisticasJugador(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },[jugadorSelect])

    useEffect(() => {
        if (props.idJugador !== undefined){
            axios.get("http://localhost:8080/getJugadorPorId?idJugador="+props.idJugador)
            .then( response => {
                setDatosJugador(response.data);
            })
            .catch(error => {
                console.log(error);
            })

            axios.get("http://localhost:8080/getEstadisticaJugadorCampeonato?idJugador="+props.idJugador+"&idCampeonato="+campeonatoSelect)
            .then( response => {
                setEstadisticasJugador(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },[campeonatoSelect])




    function handleCampeonatoChange(e){
        setCampeonatoSelect(e.target.value);
    }
    function handleClubChange(e){
        setClubSelect(e.target.value);

    }

    function handleJugadorChange(e){
        setJugadorSelect(e.target.value);
    }
    
    

    return(

        <div className="container">
        <ToastContainer/>
        <div className="row">
            <h2>Consultar estadisticas de los jugadores</h2>

            <div class="mb-3">
                    <label for="club" class="form-label">Seleccione el club del jugador</label>
                    <select class="form-select" id="campeonatos" onChange={handleCampeonatoChange} aria-label="campeonatos">
                                    <option value="-1">Seleccione un Campeonato</option>
                                    {campeonatos.map(campeonato => {
                                        return (
                                            <option value={campeonato.idCampeonato}>{campeonato.descripcion}</option>
                                        );
                                    })
                                    }              
                </select>
                </div>

                {props.idJugador === undefined ? <div class="mb-3">
                    <label for="club" class="form-label">Seleccione el club del jugador</label>
                    <select class="form-select" id="clubes" onChange={handleClubChange} aria-label="clubes">
                                    <option value="-1">Seleccione un club</option>
                                    {clubes.map(club => {
                                        return (
                                            <option value={club.idClub}>{club.nombre}</option>
                                        );
                                    })
                                    }              
                </select>
                </div> : null}

                {props.idJugador === undefined ? <div class="mb-3">
                    <label for="nombre" class="form-label">Seleccione el club del jugador</label>
                    <select class="form-select" id="jugadores" onChange={handleJugadorChange} aria-label="jugadores">
                                    <option value="-1">Seleccione un jugador del club</option>
                                    {jugadores.map(jugador => {
                                        return (
                                            <option value={jugador.idJugador}>{jugador.nombre} {jugador.apellido}</option>
                                        );
                                    })
                                    }              
                </select>
                </div> : null }
                <hr class = "my 4"/>
                { jugadorSelect != null ?
                

                <div class="card">
                    <div class ="card-body">
                        <div class="row">
                            <div class="col-2">
                            <img src="https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414608/120957993-ilustraci%C3%B3n-creativa-del-marcador-de-posici%C3%B3n-de-perfil-de-avatar-predeterminado-aislado-en-segundo-.jpg?ver=6" class="card-img-top" alt="..."/>
                            </div>
                            <div class= "col-10 mt-2">
                            <h3 class = "mt-3">{datosJugador.nombre} {datosJugador.apellido}</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6" >
                                
                            <p> Fecha de Nacimiento: {datosJugador.fechaNacimiento !== undefined ? datosJugador.fechaNacimiento.slice(0,10) : null}</p>
                            </div>
                            <div class="col-6">
                                <p>Categoria {datosJugador.categoria} </p>
                            </div>
                        
                        </div>
                        <hr/>
                        <div class="row">
                            <h4>Faltas {estadisticasJugador[4]}</h4>
                            <div class="col-6" >
                                <div class ="row">
                                    <div class="col-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi text-danger bi-square-fill" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>
                                    </div>

                                    <div class="col-11">
                                        <p>Rojas: {estadisticasJugador[6]}</p>
                                    </div>

                                </div>
                            </div>
                            <div class="col-6">
                            <div class ="row">
                                    <div class="col-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi text-warning bi-square-fill" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>
                                    </div>
                                    <div class="col-11">
                                        <p>Amarillas: {estadisticasJugador[5]}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div class="row">
                            <h4></h4>
                            <div class="col-6" >
                            <div class ="row">
                                    <div class="col-1">
                                    <i class="far fa-futbol"></i>
                                    </div>

                                    <div class="col-11">
                                        <p>Goles {estadisticasJugador[3]}</p>
                                    </div>

                                </div>

                            </div>
                            <div class="col-6">
                                <p>Partidos Jugados {estadisticasJugador[2]} </p>
                            </div>
                        </div>


                    </div>
                </div>:null}
        </div>

    </div>


    )





    





}


export default ConsultarEstadisticasJugador;