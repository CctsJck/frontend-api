import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';


function Partidos(){
    const [campeonatos, setCampeonatos] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState({});
    const [partidos,setPartidos] = useState([]);

    useEffect(() => {
        

        axios.get("http://localhost:8080/obtenerCampeonatos")
        .then( response => {
            setCampeonatos(response.data);
        })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8080/getPartidosTorneo?idCampeonato="+campeonatoSelect)
            .then(response => {
                console.log(response.data);
            })
    },[campeonatoSelect])

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
                </div>
            </div>
        </>
    )

}

export default Partidos;