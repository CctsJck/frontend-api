import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {ToastContainer,toast, useToast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CargarResultadoPartido(){
    /* Variables */
    const[partido,setPartido] = useState('-1');
    const[partidos,setPartidos] = useState([]);
    const [goles,setGoles] = useState([]);
    const[campeonatos,setCampeonatos] = useState([]);
    const[campeonato,setCampeonato] = useState('-1');
    const[jugador,setJugador] = useState('-1');
    const[jugadores,setJugadores] = useState([]);

    const [partidoConEquipos,setPartidosConEquipos] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:8080/obtenerCampeonatos')
        .then(response => {
            setCampeonatos(response.data);
        })

    },[])

    useEffect (() => {
        axios.get('http://localhost:8080/getPartidosByCampeonato?idCampeonato='+campeonato)
        .then(response => {
            //Obtengo los partidos de un campeonato :D
            setPartidos(response.data);
            
        })
    },[campeonato])

    useEffect(() => { 
        console.log(partidos);
        partidos.map( async part => {
            //AXIOS HTTP GET ANIDADOS
            axios.get("http://localhost:8080/getClubPorId?idClub="+part.local)
            .then(localResponse => {
                axios.get("http://localhost:8080/getClubPorId?idClub="+part.visitante)
                    .then(visitanteResponse => {
                        let nuevo = {
                            partido : part,
                            clubL: localResponse.data,
                            clubV:visitanteResponse.data
                        }
                        setPartidosConEquipos(partidoConEquipos => ([...partidoConEquipos,nuevo]));
                    })
            })
            
            
        })
    },[partidos])

    useEffect(() => {
        jugadores.map( async jug => {
    
            axios.get("http://localhost:8080/obtenerJugadoresPartido?idPartido="+partido)
            .then(response => {
                setJugadores(response.data);
            })
        }
            )
    })
    

    
    function  handleCampChange(e){
        setCampeonato(e.target.value);
    }



    function handlePartidoChange(e){
        setPartido(e.target.value);
        console.log(e.target.value);
    }

    function handleJugadorChange(e){
        setJugador(e.target.value);
        console.log(e.target.value);
    }

    function handleMinutoChange(e){

    }

    function handleTipoChange(e){

    }
    function handleSubmit(e){

    }




return(
    <div className = "container">
        <h2>Cargar resultado de un partido</h2>
        <div className="col-6 mt-5">
            <form onSubmit={handleSubmit}>
                <div class= "mb-3">
                    <label for="camp label" class="form-label"> Seleccione el Campeonato</label>
                    <select onChange={handleCampChange} class="form-select"  aria-label="campeonatos">
                        <option value="-1">Seleccione un campeonato</option>
                        {campeonatos.map(camp => {
                            return(
                                <option value={camp.idCampeonato}>{camp.descripcion}</option>
                            )
                        })}
                    </select>
                </div>
                <div class="mb-3">
                        <label for="par label" class="form-label">Seleccione el Partido</label>
                        <select class="form-select" id="partidos" onChange={handlePartidoChange}aria-label= "partidos" >
                            {partidoConEquipos.map(part => {
                                
                                return(
                                    <option value={part.partido.id}>{part.clubL.nombre} VS {part.clubV.nombre}</option>
                                )
                            }
                            )}
                        </select>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Agregar Gol
                        </label>
                </div>
                <div class="mb-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                              Agregar Falta
                        </label>
                </div>

            </form>
            <div class="mb-3">
                <label for="nombreJugador" class="form-label">Nombre del Jugador</label>
                <select class="form-select" id="jugadores" onChange={handleJugadorChange}aria-label= "partidos" >
                    <option value="-1">Jugadores</option>
                    {jugadores.map(jug => {
                        return(
                            <option value={jug.idJugador}> </option>
                        )
                    }
                        )}
                </select>
                            
            </div>

            <div class="mb-3">
                <label for="minuto" class="form-label">Minuto de Juego</label>
                <input type="text" class="form-control" onChange={handleMinutoChange} id="minuto" placeholder="Tiempo de Juego" aria-describedby="minuto"/>
            </div>

            <div class="mb-3">
                <label for="tipo" class="form-label">Tipo de Gol</label>
                <select class="form-select"  aria-label= "tipoGoles" >
                <option value="-1">Seleccione el tipo</option>
                    <option>A favor</option>
                    <option>Encontra</option>
                </select>

            </div>

            <div className="mb-5">
                <button type="submit" className="btn btn-success">Agregar</button>
            </div>



        </div>

    </div>

)



}

export default CargarResultadoPartido;