import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function ValidarResultadoPartido(){
    const [partidosValidar,setPartidosValidar] = useState([]);
    const [club,setClub] = useState({});

    let params = useParams();
    //Obtener los partidos que estan pendientes de validar
    //Obtener cuantos goles hizo el equipo y quienes los hicieron
    //Obtener las faltas que hizo el equipo y quienes las hicieron

    useEffect(() => {
        axios.get("http://localhost:8080/getClubPorIdRepresentante?idRepresentante="+params.idPersona)
        .then( response => {
            if (typeof response.data === 'string'){
                toast.error(response.data);
            } else {
                setClub(response.data);                
            }
            
        })
        
    },[])

    useEffect(() => {
        axios.get("http://localhost:8080/partidosPendientesValidar?idClub="+club.idClub)
            .then(response => {
                if (typeof response.data === 'string'){
                    toast.error(response.data);
                } else {
                    setPartidosValidar(response.data);
                    console.log(response.data);
                    
                }
                
            })
    },[club])

    function validarPartido(idPartido){
        axios.put("http://localhost:8080/validarPartido?idClub="+club.idClub+" &idPartido="+idPartido)
            .then(response => {
                toast.success("Partido validado con exito");
            })
    }

    return(
        <>
            <div className="container">
                <ToastContainer/>
                <div className="row">
                    <h2>Validar resultados de {club.nombre}</h2>
                    <div className="table-responsive mt-5">
                        <table class="table ">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fecha partido</th>
                                <th scope="col">Campeonato</th>
                                <th scope="col">Nro fecha</th>
                                <th scope="col">Nro Zona</th>
                                <th scope="col">Club Local</th>
                                <th scope="col">Club Visitante</th>
                                <th scope="col">Goles local</th>
                                <th scope="col">Goles visitante</th>
                                <th scope="col">Acciones</th>



                                </tr>
                            </thead>
                            <tbody>
                                {partidosValidar.length !== 0 ? partidosValidar.map(partido => {
                                    return (
                                        <tr key={partido.idPartido}>
                                            <th scope="row">{partido.idPartido}</th>
                                            <td>{partido.fechaPartido.substring(0,10)}</td>
                                            <td>{partido.idCampeonato}</td>
                                            <td>{partido.nroFecha}</td>
                                            <td>{partido.nroZona}</td>
                                            <td>{partido.local}</td>
                                            <td>{partido.visitante}</td>
                                            <td>{partido.golesLocal}</td>
                                            <td>{partido.golesVisitante}</td>
                                            <td>
                                                <button onClick={() => validarPartido(partido.idPartido)} className="btn btn-success">Validar</button>
                                            </td>



                                        </tr>
                                    )
                                }) : null}
                                
                            </tbody>
                        </table>
                    </div>
                    
                </div>

            </div>

        </>
    )
    
}

export default ValidarResultadoPartido;