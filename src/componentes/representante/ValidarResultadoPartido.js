import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InfoPartido from '../partido/InfoPartido';

function ValidarResultadoPartido(){
    const [partidosValidar,setPartidosValidar] = useState([]);
    const [club,setClub] = useState({});
    const [partidosCompleto, setPartidosCompleto] = useState([]);
    let params = useParams();

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
            .then(partidoResponse => {
                if (typeof partidoResponse.data === 'string'){
                    toast.error(partidoResponse.data);
                } else {
                    setPartidosValidar(partidoResponse.data);
                }
            })
    },[club])

    useEffect(() => {
        partidosValidar.map(async partido => {
            let nuevo = {
                nombreCamp: "",
                nombreClubLocal:"",
                nombreClubVisitante:"",
                partidoEntero:partido
            }

            await axios.get("http://localhost:8080/getCampeonatoById?idCampeonato="+partido.idCampeonato)
                .then(response => {
                    nuevo.nombreCamp = response.data.descripcion;
                })

            await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.local)
                .then(response => {
                    nuevo.nombreClubLocal = response.data.nombre;
                })

            await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.visitante)
                .then(response => {
                    nuevo.nombreClubVisitante = response.data.nombre;
                })

            setPartidosCompleto(partidosCompleto => ([...partidosCompleto,nuevo]));
        })

    },[partidosValidar])

    

    function validarPartido(idPartido){
        axios.put("http://localhost:8080/validarPartido?idClub="+club.idClub+" &idPartido="+idPartido)
            .then(response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    toast.success("Partido validado con exito");
                }
            })
        
        setTimeout(() => {
            window.location.reload(true);
        },3000)
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
                                {partidosCompleto.length !== 0 ? partidosCompleto.map(partido => {   
                                    if (club.idClub == partido.partidoEntero.local && partido.partidoEntero.convalidaLocal == false){
                                        return (
                                            <tr key={partido.partidoEntero.idPartido}>
                                                <th scope="row">
                                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={"#partido"+partido.partidoEntero.idPartido}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                        </svg>
                                                    </button>

                                                    <div class="modal fade" id={"partido"+partido.partidoEntero.idPartido} tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Detalles partido</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                            <InfoPartido idPartido={partido.partidoEntero.idPartido}/>
                                                            </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>{partido.partidoEntero.fechaPartido.substring(0,10)}</td>
                                                <td>{partido.nombreCamp}</td>
                                                <td>{partido.partidoEntero.nroFecha}</td>
                                                <td>{partido.partidoEntero.nroZona}</td>
                                                <td>{partido.nombreClubLocal}</td>
                                                <td>{partido.nombreClubVisitante}</td>
                                                <td>{partido.partidoEntero.golesLocal}</td>
                                                <td>{partido.partidoEntero.golesVisitante}</td>
                                                <td>
                                                    <button onClick={() => validarPartido(partido.partidoEntero.idPartido)} className="btn btn-success">Validar</button>
                                                </td>
                                            </tr>
                                        )
                                    } else if (club.idClub == partido.partidoEntero.visitante && partido.partidoEntero.convalidaVisitante == false) {
                                        return (
                                            <tr key={partido.partidoEntero.idPartido}>
                                                <th scope="row">
                                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={"#partido"+partido.partidoEntero.idPartido}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                        </svg>
                                                    </button>

                                                    <div class="modal fade" id={"partido"+partido.partidoEntero.idPartido} tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title">Detalles partido</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <InfoPartido idPartido={partido.partidoEntero.idPartido}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>{partido.partidoEntero.fechaPartido.substring(0,10)}</td>
                                                <td>{partido.nombreCamp}</td>
                                                <td>{partido.partidoEntero.nroFecha}</td>
                                                <td>{partido.partidoEntero.nroZona}</td>
                                                <td>{partido.nombreClubLocal}</td>
                                                <td>{partido.nombreClubVisitante}</td>
                                                <td>{partido.partidoEntero.golesLocal}</td>
                                                <td>{partido.partidoEntero.golesVisitante}</td>
                                                <td>
                                                    <button onClick={() => validarPartido(partido.partidoEntero.idPartido)} className="btn btn-success">Validar</button>
                                                </td>
                                            </tr>
                                        )
                                    }}) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default ValidarResultadoPartido;