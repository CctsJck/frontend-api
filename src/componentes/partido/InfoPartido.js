import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

function InfoPartido(props){
    const [partido,setPartido] = useState([]);
    const [goles, setGoles] = useState([]);
    const [faltas, setFaltas] = useState([]);
    const [partidoDetalles, setPartidoDetalles] = useState([]);
    const [golesDetalles, setGolesDetalles] = useState([]);
    const [faltasDetalles, setFaltasDetalles] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [miembrosDetalle, setMiembrosDetalles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:8080/getPartidoById?idPartido="+props.idPartido)
            .then(response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    setPartido(response.data); 
                }

            })

            await axios.get("http://localhost:8080/getGolesPartido?idPartido="+props.idPartido)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        setGoles(response.data);
                    }
                })

            await axios.get("http://localhost:8080/getFaltasPartido?idPartido="+props.idPartido)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        setFaltas(response.data);
                    }
                })

            await axios.get("http://localhost:8080/getIngresosEgresosPartido?idPartido="+props.idPartido)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        setMiembros(response.data);
                    }
                })


        }

        fetchData();
    },[])

    useEffect(() => {
        goles.map(async gol => {
            let golDetalle = {
                gol:gol,
                jugador:{}
            }
            
            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+gol.idJugador)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        golDetalle.jugador = response.data;
                        setGolesDetalles(golesDetalles => [...golesDetalles,golDetalle]);
                    }
                    
                })

            
        })
    },[goles])

    useEffect(() => {
        faltas.map(async falta => {
            let faltaDetalle = {
                falta:falta,
                jugador:{}
            }
            
            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+falta.idJugador)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        faltaDetalle.jugador = response.data;
                        setFaltasDetalles(faltasDetalles => [...faltasDetalles,faltaDetalle]);
                    }
                })
        })
    },[faltas])

    useEffect(() => {
        miembros.map(async miembro => {
            let miembroDetalle = {
                miembro:miembro,
                jugador:{}
            }
            
            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+miembro.idJugador)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        miembroDetalle.jugador = response.data;
                        setMiembrosDetalles(miembrosDetalles => [...miembrosDetalles,miembroDetalle]);
                    }
                })
        })
    },[miembros])


    
 
    return (
        <>
            <div className="container">
                <div className="row">
                    <h5>Goles</h5>
                    <table class="table table-borderless">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Local</th>
                                <th scope="col">Visitante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {golesDetalles.length !== 0 ? golesDetalles.map(gol => {

                                

                                return(
                                    <tr key={gol.gol.idGol}>
                                        {gol.jugador.idClub === partido.local ?
                                            <>
                                                <td>
                                                    {gol.gol.minuto}´
                                                    <i class="far fa-futbol"></i>
                                                    {gol.jugador.nombre} {gol.jugador.apellido}
                                                </td>
                                                <td></td>
                                            </>                                                    
                                        : 
                                            <>
                                                <td></td>
                                                <td>
                                                    {gol.gol.minuto}´
                                                    <i class="far fa-futbol"></i>
                                                    {gol.jugador.nombre} {gol.jugador.apellido}                                                          
                                                </td>
                                            </>  
                                        }
                                    </tr>
                                )})
                            : null}
                        </tbody>
                    </table>
                    <h5>Faltas</h5>
                    <table class="table table-borderless">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Local</th>
                                <th scope="col">Visitante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faltasDetalles.length !== 0 ?faltasDetalles.map(falta => {
                                return(
                                    <tr key={falta.falta.idFalta}>
                                        {falta.jugador.idClub === partido.local ?
                                            <>
                                                <td>
                                                    {falta.falta.minuto}´
                                                    {falta.falta.tipo === "roja" ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill me-1 text-danger" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                                        </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill me-1 text-warning" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                                        </svg>
                                                    }
                                                    <span className="ms-2">{falta.jugador.nombre} {falta.jugador.apellido}</span>
                                                </td>
                                                <td></td>
                                            </>                                                    
                                        : 
                                            <>
                                                <td></td>
                                                <td>
                                                    {falta.falta.minuto}´
                                                    {falta.falta.tipo === "roja" ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill me-1 text-danger" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                                        </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill me-1 text-warning" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                                        </svg>
                                                    }
                                                    <span className="ms-2">{falta.jugador.nombre} {falta.jugador.apellido}</span>
                                                </td>
                                            </>  
                                        }
                                    </tr>
                                )})
                            : null}
                        </tbody>
                    </table>
                    <div>
                        <h2>Ingresos y egresos</h2> 
                    </div>
                    {miembrosDetalle.length !== 0 ?
                        miembrosDetalle.map(miembroEsp => {
                            return (
                                <>
                                    <p>Jugador: {miembroEsp.jugador.nombre} {miembroEsp.jugador.apellido}  {miembroEsp.miembro.ingreso != null ? <> - Ingreso Minuto {miembroEsp.miembro.ingreso}</>:null}  {miembroEsp.miembro.egreso != null ? <>- Egreso Minuto {miembroEsp.miembro.egreso}</>:null}</p>
                                </>
                            )
                        
                        }) 
                        
                        
                    : null}
                </div>
            </div>    
        </>
    )
}

export default InfoPartido;