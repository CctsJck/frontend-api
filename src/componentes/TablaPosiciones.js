import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MenuBar from './MenuBar';

function TablaPosiciones(){

    const [campeonatos, setCampeonatos] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState({});
    const [tablasEquipos,setTablasEquipos] = useState([]);
    const [nombreCamp,setNombreCamp] = useState("");
    const [tablasConEquipos,setTablasConEquipos] = useState([[]]);




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
        tablasEquipos.map(tabla => {
            
        })
    },[tablasEquipos])

    

    function handleCampeonatoChange(e){
        setCampeonatoSelect(e.target.value);
    }

    function showCampName(){
        return(<h2>{nombreCamp}</h2>)
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
                            {tablasEquipos.map(tabla => {
                                return (
                                    <tr key={tabla.idTabla}>
                                        <th>1</th>
                                        <td>{tabla.idClub}</td>
                                        <td>{tabla.cantidadJugados}</td>
                                        <td>{tabla.cantidadganados}</td>
                                        <td>{tabla.cantidadempatados}</td>
                                        <td>{tabla.cantidadperdidos}</td>
                                        <td>{tabla.golesFavor}</td>
                                        <td>{tabla.golesContra}</td>
                                        <td>{tabla.diferenciaGoles}</td>
                                        <td>{tabla.puntos}</td>
                                        <td>{tabla.promedio}</td>



                                    </tr>
                                    
                                )
                            })}
                        </tbody>
                        
                        </table>



                </div>

            </div>
        </div>
        

    )

}

export default TablaPosiciones;