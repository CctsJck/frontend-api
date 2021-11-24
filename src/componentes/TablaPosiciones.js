import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MenuBar from './MenuBar';

function TablaPosiciones(){

    const [campeonatos, setCampeonatos] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState({});
    const [tablasEquipos,setTablasEquipos] = useState([]);
    const [nombreCamp,setNombreCamp] = useState("");
    const [tablasConEquipos,setTablasConEquipos] = useState([]);
    var promesas = [];

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerCampeonatos")
            .then( response => {
                setCampeonatos(response.data);
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerTablaCampeonato?idCampeonato="+campeonatoSelect)
            .then(response => {
                setTablasEquipos(response.data);
            })

        campeonatos.map(camp => {
            if (camp.idCampeonato == campeonatoSelect){
                setNombreCamp(camp.descripcion);
            }
        })
    },[campeonatoSelect])

    useEffect(() => {
        tablasEquipos.map( async tabla => {
            promesas.push(axios.get("http://localhost:8080/getClubPorId?idClub="+tabla.idClub)
                .then(response =>{
                    let nuevo = {
                        tablasEquipo: tabla,
                        club : response.data
                    }

                    setTablasConEquipos(tablasConEquipos => [...tablasConEquipos, nuevo]);

                }));
            
        })  
    },[tablasEquipos])

    function handleCampeonatoChange(e){
        setCampeonatoSelect(e.target.value);
        setTablasConEquipos([]);
    }

    return (
        <div>
            <div className="col-12">
                <MenuBar/>
            </div>
            <div className="container mt-4">
                <div className="row shadow-lg p-3 mb-5 bg-body rounded">
                    <h2 className="text-center">Tabla posiciones</h2>
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
                    <hr/>
                    {nombreCamp != "" ? <h2 className="mt-2">Tabla de {nombreCamp}</h2> : null}
                    <table class="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">Posicion</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">PJ</th>
                                <th scope="col">PG</th>
                                <th scope="col">PE</th>
                                <th scope="col">PP</th>
                                <th scope="col">Goles a favor</th>
                                <th scope="col">Goles en contra</th>
                                <th scope="col">Diferencia de goles</th>
                                <th scope="col">Puntos</th>
                                <th scope="col">Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablasConEquipos != [] ? tablasConEquipos.map((tabla,index) => {
                                return (
                                    <tr key={tabla.tablasEquipo.idTabla}>
                                        <th>{index+1}</th>
                                        <td>{tabla.club.nombre}</td>
                                        <td>{tabla.tablasEquipo.cantidadJugados}</td>
                                        <td>{tabla.tablasEquipo.cantidadganados}</td>
                                        <td>{tabla.tablasEquipo.cantidadempatados}</td>
                                        <td>{tabla.tablasEquipo.cantidadperdidos}</td>
                                        <td>{tabla.tablasEquipo.golesFavor}</td>
                                        <td>{tabla.tablasEquipo.golesContra}</td>
                                        <td>{tabla.tablasEquipo.diferenciaGoles}</td>
                                        <td>{tabla.tablasEquipo.puntos}</td>
                                        <td>{tabla.tablasEquipo.promedio}</td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default TablaPosiciones;