import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import MenuBar from './MenuBar';
import TablaGrupos from './TablaGrupos';

function TablaPosiciones(){

    const [campeonatos, setCampeonatos] = useState([]);
    const [campeonatoSelect, setCampeonatoSelect] = useState({});
    const [campeonato, setCampeonato] = useState({});
    const [tablasEquipos,setTablasEquipos] = useState([]);
    const [nombreCamp,setNombreCamp] = useState("");
    const [tablasConEquipos,setTablasConEquipos] = useState([]);
    const [tablaGrupos,setTablaGrupos] = useState([]);
   // const [fases,setFases] = useState([]);
   // const [faseSelect, setFaseSelect] = useState([]);
    var promesas = [];

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerCampeonatos")
            .then( response => {
                setCampeonatos(response.data);
            })
    },[])

    useEffect(() => {
        

        axios.get("http://localhost:8080/getCampeonatoById?idCampeonato="+campeonatoSelect)
            .then(res =>{
                setCampeonato(res.data);

            })

        /*axios.get("http://localhost:8080/getFasesByIdCampeonato?idCampeonato="+campeonatoSelect)
            .then(res =>{
                setFases(res.data);
            })*/
    },[campeonatoSelect])

    useEffect(() => {
        if (campeonato.tipo === "Puntos"){
            axios.get("http://localhost:8080/obtenerTablaCampeonato?idCampeonato="+campeonatoSelect)
            .then(response => {
                setTablasEquipos(response.data);

                
            })
        } else {
            axios.get("http://localhost:8080/getTablasGruposCamp?idCampeonato="+campeonatoSelect)
                .then(res => {
                    setTablaGrupos(res.data);
                })
        }

    },[campeonato])

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

    /*function handleFaseChange(e){
        setFaseSelect(e.target.value);
    }*/

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
                    {campeonatoSelect != {} ? <TablaGrupos idCampeonato={campeonatoSelect}/> : null}
                    
                    {campeonato !== {} ? <h2 className="mt-2">Tabla de {campeonato.descripcion}</h2> : null}
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
                            {campeonato.tipo === "Puntos" ? [tablasConEquipos != [] ? tablasConEquipos.map((tabla,index) => {
                                let verde;
                                if (index === 0){
                                    verde = "bg-success"
                                } else {
                                    verde = "";
                                }
                                return (
                                    <tr className={verde} key={tabla.tablasEquipo.idTabla}>
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
                            }) : null] : 
                           
                            
                            
                            [tablaGrupos.length !== 0 ? 
                                tablaGrupos.map((tablaZona,index1) => {
                                    
                                    return (
                                        
                                        tablaZona.map((tabla,index) => {
                                            
                                            let verde;
                                            if (index === 0){
                                                verde = "bg-success"
                                            } else {
                                                verde = "";
                                            }
                                            
                                                
                                            return (
                                                <>
                                                    {index === 0 ? <h2 className="mt-4">Zona {index1+1}</h2> : null}
                                                    <tr className={verde} key={index}>
                                                        <th>{index+1}</th>
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
                                                </>
                                            )    
                                                
                                              
                                        })
                                    )
                                   // console.log(tablaZona);
                                    
                                })
                        
                            : null]
                            
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default TablaPosiciones;