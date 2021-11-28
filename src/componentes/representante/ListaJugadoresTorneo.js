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