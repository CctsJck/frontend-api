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
    const[campeonatos,setCampeonatos] = useState([]);
    const[campeonato,setCampeonato] = useState('-1');
    const[jugador,setJugador] = useState('-1');
    const[listaJugadoresPartido,setlistaJugadoresPartido] = useState([]);

    const [partidoConEquipos,setPartidosConEquipos] = useState([]);
    const [partidoConJugadores,setPartidoConJugadores] = useState([]);
    const [jugadores, setJugadores] = useState([]);

    const [tipoSuceso, setTipoSuceso] = useState("falta");
    const [tipoGol,setTipoGol] = useState("");
    const [tipoFalta,setTipoFalta] = useState("");
    const [minuto, setMinuto] = useState(-1);



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
        partidos.map( par => {
            
            axios.get("http://localhost:8080/obtenerJugadoresPartido?idPartido="+par.idPartido)
            .then(response => {
                setlistaJugadoresPartido(response.data);
                
                
                
            })
        })
    },[partido])

    useEffect(() => {
        listaJugadoresPartido.map(jug => {
            axios.get("http://localhost:8080/getJugadorPorId?idJugador="+jug.idJugador)
            .then(response => {
                setJugadores(jugadores => ([...jugadores,response.data]));
            })
        })
        
    },[listaJugadoresPartido])

    useEffect(() => {
        console.log(jugadores);
    },[jugadores])
    

    
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
        setMinuto(e.target.value);
        console.log(e.target.value);

    }

    function handleSucesoChange(e){
        setTipoSuceso(e.target.value);
    }

    function handleTipoFaltaChange(e){
        setTipoFalta(e.target.value);
        
    }

    function handleTipoGolChange(e){
        setTipoGol(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target.value);
        if (tipoSuceso === "falta"){
            axios.post("http://localhost:8080/agregarFaltaJugador?idJugador="+jugador+"&idPartido="+partido+"&idCampeonato="+campeonato+"&minuto="+minuto+"&tipo="+tipoFalta)
            .then(response => {
                return toast.success("Falta agregado con exito");
            })
        } else {
            axios.post("http://localhost:8080/agregarGolJugador?idJugador="+jugador+"&idPartido="+partido+"&minuto="+minuto+"&tipo="+tipoGol)
            .then(response => {
                return toast.success("Gol agregado con exito");
            })

        }

    }




return(
    <div className = "container">
        <ToastContainer/>
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
                            <option value="-1">Seleccione el partido</option>

                            {partidoConEquipos.map(part => {
                                
                                return(
                                    <option value={part.partido.idPartido}>{part.clubL.nombre} VS {part.clubV.nombre}</option>
                                )
                            }
                            )}
                        </select>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="agregarFalta" value="falta" onChange={handleSucesoChange} id="agregarFalta" checked={tipoSuceso === "falta"}/>
                    <label class="form-check-label" for="agregarFalta">
                        Agregar falta
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="agregarGol" value="gol" onChange={handleSucesoChange} id="agregarGol" checked={tipoSuceso === "gol"}/>
                    <label class="form-check-label" for="agregarGol">
                        Agregar gol
                    </label>
                </div>

            <div class="mb-3">
                <label for="nombreJugador" class="form-label">Nombre del Jugador</label>
                <select class="form-select" id="jugadores" onChange={handleJugadorChange}aria-label= "partidos" >
                    <option value="-1">Jugadores</option>
                    {jugadores.map(jug => {
                        return(
                            <option value={jug.idJugador}> {jug.nombre} {jug.apellido}</option>
                        )
                    }
                        )}
                </select>
                            
            </div>

            <div class="mb-3">
                <label for="minuto" class="form-label">Minuto de Juego</label>
                <input type="text" class="form-control" onChange={handleMinutoChange} id="minuto" placeholder="Tiempo de Juego" aria-describedby="minuto"/>
            </div>

            {tipoSuceso === "gol" ? 
            <div class="mb-3">
                <label for="tipo" class="form-label">Tipo de Gol</label>
                <select class="form-select" onChange={handleTipoGolChange} aria-label= "tipoGoles" >
                <option value="-1">Seleccione el tipo</option>
                    <option value="a favor">A favor</option>
                    <option value="en contra">En contra</option>
                </select>

            </div> : <div class="mb-3">
                <label for="tipo" class="form-label">Tipo de falta</label>
                <select class="form-select" onChange={handleTipoFaltaChange} aria-label= "tipoFalta" >
                    <option value="-1">Seleccione el tipo</option>
                    <option value="amarilla">Amarilla</option>
                    <option value="roja">Roja</option>
                </select>

            </div>}

            

            <div className="mb-5">
                <button type="submit" className="btn btn-success">Agregar</button>
            </div>
        </form>



        </div>

    </div>

)



}

export default CargarResultadoPartido;