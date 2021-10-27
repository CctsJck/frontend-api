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
    const [idJugador,setJugador] = useState('-1');
    const[minuto,setMinuto] = useState('0');
    const[tipo,setTipo] = useState("a favor");
    const[campeonatos,setCampeonatos] = useState([]);
    const[clubes,setClubes] = useState([]);
    const[campeonato,setCampeonato] = useState('-1');
    const[visitante,setVisitante] = useState({});
    const[local,setLocal] = useState({})

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

    

    
    function  handleCampChange(e){
        setCampeonato(e.target.value);
        
    }



    function handleSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:8080/agregarGolJugador?idJugador='+idJugador+'&idPartido='+partido);
        return toast.success("Gol agregado al Partido");
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
                        <select class="form-select" id="partidos" onChange={handleCampChange}aria-label= "partidos" >
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
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Agregar Falta
                        </label>
                </div>

                <div className="mb-5">
                <button type="submit" className="btn btn-success">Agregar</button>
                </div>
            </form>
        </div>

    </div>

)



}

export default CargarResultadoPartido;