import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import AgregarJugadorTorneo from './AgregarJugadorTorneo';

function ListaJugadoresTorneo(){

    const [campeonatos, setCampeonatos] = useState([]);
    const [idCampeonato, setIdCampeonato] = useState(-1);
    const [club, setClub] = useState({});
    const [jugadores,setJugadores] = useState([]);
    const [jugadoresDetalles, setJugadoresDetalles] = useState([]);
    let params = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/getClubPorIdRepresentante?idRepresentante="+params.idPersona)
            .then(res => {
                if (typeof res.data === "string"){
                    return toast.error(res.data);
                } else {
                    setClub(res.data);
                }
            })
    },[])

    useEffect(() => {
        if (club !== {}){
            axios.get("http://localhost:8080/getCampeonatosByIdClub?idClub="+club.idClub)
            .then(res => {
                if (typeof res.data === "string"){
                    return toast.error(res.data);
                } else {
                    setCampeonatos(res.data);
                }
            })
        }
        
    },[club])

    useEffect(() => {
        axios.get("http://localhost:8080/getJugadoresHabilitadosClub?idCampeonato="+idCampeonato+"&idClub="+club.idClub)
            .then(res => {
                if (typeof res.data === "string"){
                    return toast.error(res.data);
                } else {
                    setJugadores(res.data);
                }
            })
    },[idCampeonato])

    useEffect(() => {
        jugadores.map(async jugador => {
            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+jugador.idJugador)
                .then(res => {
                    if (typeof res.data === "string"){
                        return toast.error(res.data);
                    } else {
                        let detalle = {
                            jugadorTorneo: jugador,
                            jugadorDetalle:res.data
                        }
                        setJugadoresDetalles(jugadoresDetalles => [...jugadoresDetalles,detalle]);
                    }
                })
        })
    },[jugadores])


    function handleCampChange(e){
        setJugadores([]);
        setJugadoresDetalles([]);
        setIdCampeonato(e.target.value);
    }

    function handleChangeStatus(estado,idJugadorTorneo){
        axios.put("http://localhost:8080/cambiarEstadoJugadorTorneo?idJugadorTorneo="+idJugadorTorneo+"&estado="+estado)
            .then(res => {
                if (res.data !== ""){
                    return toast.error(res.data);
                } else {
                    window.location.reload(true);
                }
            })
    }

    
    return(
        <div className="container">
            <ToastContainer />
            <div className="row">
                <h2>Definir lista de jugadores de un torneo</h2>
                <div className="col-6 mt-5">
                    <div class="mb-3">
                        <label for="camp-label" class="form-label">Seleccione el campeonato</label>
                        <select class="form-select" id="campeonatos" onChange={handleCampChange} aria-label="campeonatos">
                            <option value="-1">Seleccione un campeonato</option>
                            {campeonatos.map(campeonato => {
                                    return (
                                        <option value={campeonato.idCampeonato}>{campeonato.descripcion}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div class="d-grid gap-2 mt-4 mb-3 d-md-flex justify-content-md-end">
                    <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#agregarJugador">Agregar jugador</button>
                </div>
                <div class="modal fade" id="agregarJugador" tabindex="-1" aria-labelledby="crearRepre" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Agregar jugador torneo</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <AgregarJugadorTorneo idClub={club.idClub} idCampeonato={idCampeonato}/>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadoresDetalles.length !== 0 ? jugadoresDetalles.map(jugador => {
                            return (
                                <tr key={jugador.jugadorDetalle.idJugador}>
                                    <th scope="row">{jugador.jugadorDetalle.idJugador}</th>
                                    <td>{jugador.jugadorDetalle.nombre}</td>
                                    <td>{jugador.jugadorDetalle.apellido}</td>
                                    <td>{jugador.jugadorTorneo.estado === true ? <span className="badge bg-success">Habilitado</span> : <span class="badge bg-danger">Inhabilitado</span>}</td>
                                    <td>
                                        {jugador.jugadorTorneo.estado === true ? 
                                            <button onClick={() => handleChangeStatus(false,jugador.jugadorTorneo.idJugadorTorneo)} className="btn btn-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                                </svg>
                                            </button> : 
                                            <button onClick={() => handleChangeStatus(true,jugador.jugadorTorneo.idJugadorTorneo)} className="btn btn-success me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                </svg>
                                            </button>
                                        }

                                    </td>
                                </tr>
                            )
                            
                        }):null}
                        
                        
                    </tbody>
                    </table>


            </div>



        </div>
    )
}   

export default ListaJugadoresTorneo;