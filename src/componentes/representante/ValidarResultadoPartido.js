import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function ValidarResultadoPartido(){
    const [partidosValidar,setPartidosValidar] = useState([]);
    const [club,setClub] = useState({});
    const [partidosCompleto, setPartidosCompleto] = useState([]);
    

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
        console.log(club);
        axios.get("http://localhost:8080/partidosPendientesValidar?idClub="+club.idClub)
            .then(partidoResponse => {
                if (typeof partidoResponse.data === 'string'){
                    toast.error(partidoResponse.data);
                } else {
                    setPartidosValidar(partidoResponse.data);
                   // console.log(partidoResponse.data);
                    
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
                                {partidosCompleto.length !== 0 ? partidosCompleto.map(partido => {                                    
                                    return (
                                        <tr key={partido.partidoEntero.idPartido}>
                                            <th scope="row">{partido.partidoEntero.idPartido}</th>
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