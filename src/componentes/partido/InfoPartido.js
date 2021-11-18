import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';

function InfoPartido(props){
    const [partido,setPartido] = useState([]);
    const [goles, setGoles] = useState([]);
    const [faltas, setFaltas] = useState([]);
    const [partidoDetalles, setPartidoDetalles] = useState([]);
    const [golesDetalles, setGolesDetalles] = useState([]);
    const [faltasDetalles, setFaltasDetalles] = useState([]);


    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:8080/getPartidoById?idPartido="+props.idPartido)
            .then(response => {
                setPartido(response.data); 

            })

            await axios.get("http://localhost:8080/getGolesPartido?idPartido="+props.idPartido)
                .then(response => {
                    setGoles(response.data);
                })

            await axios.get("http://localhost:8080/getFaltasPartido?idPartido="+props.idPartido)
            .then(response => {
                setFaltas(response.data);

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

            console.log(gol);
            
            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+gol.idJugador)
                .then(response => {
                    golDetalle.jugador = response.data;
                })

            setGolesDetalles(golesDetalles => [...golesDetalles,golDetalle]);



            
            
        })

        
    },[goles])

    useEffect(() => {
        faltas.map(async falta => {
            let faltaDetalle = {
                falta:falta,
                jugador:{}
            }
            console.log(falta);

            await axios.get("http://localhost:8080/getJugadorPorId?idJugador="+falta.idJugador)
                .then(response => {
                    faltaDetalle.jugador = response.data;
                    
                })

            setFaltasDetalles(faltasDetalles => [...faltasDetalles,faltaDetalle]);

            
            
        })
        
    },[faltas])

    

    return (
        <>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Info partido</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
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
                                    {golesDetalles.length !== 0  ?
                                        golesDetalles.map(gol => {
                                                console.log("hola");
                                                return(
                                                    <tr key={gol.gol.idGol}>
                                                        {gol.jugador.club === partido.local ?
                                                        <>
                                                            <td>
                                                                {gol.gol.minuto}´
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dribbble me-1 text-success" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z"/>
                                                                </svg>
                                                                {gol.jugador.nombre}
                                                            </td>
                                                            <td></td>
                                                        </>                                                    
                                                        : 
                                                        <>
                                                            <td></td>
                                                            <td>
                                                                {gol.gol.minuto}´
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dribbble me-1 text-success" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z"/>
                                                                </svg>
                                                                {gol.jugador.nombre}                                                            
                                                            </td>
                                                        </>  
                                                        }
                                                        
                                                    </tr>
                                                )
                                        })
                                    
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
                                    {golesDetalles.length !== 0  && faltasDetalles.length !== 0 ?
                                        faltasDetalles.map(falta => {
                                                console.log("falta");
                                                return(
                                                    <tr key={falta.falta.idFalta}>
                                                        {falta.jugador.club === partido.local ?
                                                        <>
                                                            <td>
                                                                {falta.falta.minuto}´
                                                                {falta.falta.tipo === "Roja" ? 
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
                                                                {falta.falta.tipo === "Roja" ? 
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
                                                )
                                            
                                            
                                            
                                        })
                                    
                                    : null}
                                    
                                    
                                </tbody>
                                    </table>

                                

                            </div>

                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoPartido;