import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoPartido from './partido/InfoPartido';


function Partidos(){
    const [campeonatos, setCampeonatos] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState({});
    const [partidos,setPartidos] = useState([]);
    const [partidosConDetalles, setPartidosConDetalles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerCampeonatos")
            .then( response => {
                setCampeonatos(response.data);
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8080/getPartidosTorneo?idCampeonato="+campeonatoSelect)
            .then(response => {
                setPartidos(response.data);
            })
    },[campeonatoSelect])

    useEffect(() => {
        partidos.map(async partido => {
            if (partido.convalidaLocal && partido.convalidaVisitante){
                let detalles = {
                    partido: partido,
                    clubLocal:{},
                    clubVisitante:{}
                }
    
                await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.local)
                    .then(localResponse => {
                        detalles.clubLocal = localResponse.data;
                        
                    })
    
                await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.visitante)
                .then(visResponse => {
                    detalles.clubVisitante = visResponse.data;
                    
                })
    
                setPartidosConDetalles(partidosConDetalles => [...partidosConDetalles, detalles]);
            }
        })
    },[partidos])

    function handleCampeonatoChange(e){
        setPartidosConDetalles([]);
        setCampeonatoSelect(e.target.value);
    }

    return (
        <>
            <div className="col-12">
                <MenuBar/>
            </div>
            <div className="container mt-4">
                <ToastContainer/>
                <div className="row shadow-lg p-3 mb-5 bg-body rounded">
                    <h2 className="text-center">Partidos</h2>
                    <div className="col-4 mt-3">
                        <p>Seleccione el campeonato</p>
                        <div className="mb-3">
                            <select onChange={handleCampeonatoChange} class="form-select" aria-label="campeonatos">
                                <option value="-1">Seleccione un campeonato</option>
                                {campeonatos.map(campeonato => {
                                    return (
                                        <option  value={campeonato.idCampeonato}>{campeonato.descripcion}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="container text-center col-12 table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Fase</th>
                                    <th scope="col">Local</th>
                                    <th scope="col">Resultado</th>
                                    <th scope="col">Visitante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partidosConDetalles.length !== 0 ? partidosConDetalles.map(partido => {
                                    return(
                                        <tr key={partido.partido.idPartido}>
                                            <th>
                                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={"#partido"+partido.partido.idPartido}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </button>

                                                <div class="modal fade" id={"partido"+partido.partido.idPartido} tabindex="-1" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Detalles partido</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <InfoPartido idPartido={partido.partido.idPartido}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <td>{partido.partido.fechaPartido.substring(0,10)}</td>
                                            <td>{partido.partido.fase}</td>
                                            <td>{partido.clubLocal.nombre}</td>
                                            <td className="text-center">{partido.partido.golesLocal} - {partido.partido.golesVisitante}</td>
                                            <td>{partido.clubVisitante.nombre}</td>
                                        </tr>
                                    )})
                                : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Partidos;