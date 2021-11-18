import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListaJugadoresPartido(){
    const [campeonato, setCampeonato] = useState('-1');
    const[partido,setPartido] = useState('-1');
    const [campeonatos, setCampeonatos] = useState([]);
    const [club, setClub] = useState('0');
    const [clubes,setClubes] = useState([]);
    const[partidos,setPartidos] = useState([]);
    const [partidoConEquipos,setPartidosConEquipos] = useState([]);
    const [jugadores,setJugadores] = useState([]);

    const [jugadoresDisponibles, setJugadoresDisponibles] = useState([]);
    const [jugadorDisponible, setJugadorDisponible] = useState("-1");



    useEffect(()=>{
        const fetchData = async () => {
            const campeonatosAPI = await axios('http://localhost:8080/obtenerCampeonatos');
            setCampeonatos(campeonatosAPI.data);
        };
        fetchData();
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
        axios.get("http://localhost:8080/obtenerJugadoresPartido?idPartido="+partido)
            .then(response => {
                response.data.map(miembro => {
                    axios.get("http://localhost:8080/getJugadorPorId?idJugador="+miembro.idJugador)
                    .then(response => {
                        if (response.data.idClub == club){
                            setJugadores(jugadores => ([...jugadores, response.data]));
                        }
                    })
                })
                
            })

        axios.get("http://localhost:8080/getJugadoresDisponiblesPartido?idPartido="+partido+"&idClub="+club)
            .then(response => {
                setJugadoresDisponibles(response.data);
            })
    },[partido,club])

    
    

    function handleCampChange(e){
        setCampeonato(e.target.value);
        const clubesAPI = axios.get('http://localhost:8080//obtenerClubesCampeonato?idCampeonato='+e.target.value)
                            .then(response => {
                                setClubes(response.data);
        });
    }

    function handleClubChange(e){
        setClub(e.target.value);
    }

    function handlePartidoChange(e){
        setPartido(e.target.value);
    }

    function handleJugadorChange(e){
        setJugadorDisponible(e.target.value);
    }

    function handleJugadorSubmit(e){
        e.preventDefault();
        if (jugadorDisponible != -1){
            axios.post("http://localhost:8080/agregarJugadorPartido?idPartido="+partido+"&idJugador="+jugadorDisponible+"&idClub="+club)
                .then(response => {
                    toast.success("Jugador agregado con exito");
                })

            setTimeout(() => {
                window.location.reload(true);
            },3000)
        }
    }


    return (
        <>
            <div className="container">
                <ToastContainer/>
                <div className="row">
                    <h2 className="text-center">Lista jugadores partido</h2>
                    
                    <form>
                        <div class="col-sm-4 mb-3 mt-4">
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
                        <div class="col-sm-4 mb-3">
                            <label for="camp-label" class="form-label">Seleccione el club</label>
                                <select class="form-select" onChange={handleClubChange} aria-label="campeonatos">
                                    <option value="-1">Seleccione un club</option>
                                    {clubes.map(club => {
                                        return (
                                            <option value={club.idClub}>{club.nombre}</option>
                                        );
                                    })
                                    }
                                </select>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="camp-label" class="form-label">Seleccione el partido</label>
                            <select class="form-select" id="partidos" onChange={handlePartidoChange} aria-label= "partidos" >
                            <option value="-1">Seleccione el partido</option>
                                {partidoConEquipos.map(part => {
                                    
                                    return(
                                        <option value={part.partido.idPartido}>{part.clubL.nombre} VS {part.clubV.nombre}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                    </form>
                    <div className="table-responsive mt-4">
                        <div class="d-grid gap-2 mt-4 d-md-flex justify-content-md-end mb-4">
                            <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#agregarJugadorPartido">Agregar jugador</button>
                        </div>
                        {/*Modal agregar jugador*/}
                        <div class="modal fade" id="agregarJugadorPartido" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Agregar Jugador Partido</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleJugadorSubmit}>
                                        <div class="col-6 mb-3">
                                            <label for="camp-label" class="form-label">Seleccione el jugador</label>
                                            <select class="form-select" id="jugadores" onChange={handleJugadorChange} aria-label= "partidos" >
                                                <option value="-1">Seleccione el jugador</option>
                                                {jugadoresDisponibles.length !== 0 ? jugadoresDisponibles.map(jugador => {
                                                    return(
                                                        <option value={jugador.idJugador}>{jugador.nombre} {jugador.apellido}</option>
                                                    )
                                                }
                                                ) : null}
                                            </select>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-success">Agregar</button>
                                        </div>
                                    </form>
                                    
                                </div>
                                
                                </div>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre </th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Fecha nac</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Acciones</th>


                                </tr>
                            </thead>
                            <tbody>
                                {jugadores.length !== 0 ? jugadores.map(jugador => {
                                    return (
                                        <tr key={jugador.idJugador}>
                                            <th scope="row">{jugador.idJugador}</th>
                                            <td>{jugador.nombre}</td>
                                            <td>{jugador.apellido}</td>
                                            <td>{jugador.fechaNacimiento.substring(0,10)}</td>
                                            <td>{jugador.categoria}</td>
                                            <td><button class="btn btn-danger" disabled>Eliminar</button></td>

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

export default ListaJugadoresPartido;