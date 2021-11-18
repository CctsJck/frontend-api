import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';
import { toast } from 'react-toastify';
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

            let detalles = {
                partido: partido,
                clubLocal:{},
                clubVisitante:{}
            }

            await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.local)
                .then(localResponse => {
                    if (typeof localResponse.data === "string"){
                        return toast.error(localResponse.data);
                    } else {
                        detalles.clubLocal = localResponse.data;
                    }
                })

            await axios.get("http://localhost:8080/getClubPorId?idClub="+partido.visitante)
            .then(visResponse => {
                if (typeof visResponse.data === "string"){
                    return toast.error(visResponse.data);
                } else {
                    detalles.clubVisitante = visResponse.data;
                }
            })

            setPartidosConDetalles([...partidosConDetalles, detalles]);
        })

    },[partidos])

    function handleCampeonatoChange(e){
        
        setCampeonatoSelect(e.target.value);
    }

    return (
        <>
            <div className="col-12">
                <MenuBar/>
            </div>
            <div className="container mt-4">
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
                        <table class="table  table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Local</th>
                                <th scope="col">Resultado</th>
                                <th scope="col">Visitante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partidosConDetalles.length !== 0 ?
                                    partidosConDetalles.map(partido => {
                                        return(
                                            <tr key={partido.partido.idPartido}>
                                                <th scope="row">{partido.partido.fechaPartido.substring(0,10)}</th>
                                                <td>{partido.clubLocal.nombre}</td>
                                                <td className="text-center">{partido.partido.golesLocal} - {partido.partido.golesVisitante}
                                                    <br></br>
                                                    <InfoPartido idPartido={partido.partido.idPartido}/>
                                                </td>
                                                <td>{partido.clubVisitante.nombre}</td>
                                            </tr>
                                        )
                                        
                                    })
                                    
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