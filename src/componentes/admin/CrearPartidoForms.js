import React, { useState , useEffect} from 'react';
import '../../css/crearPartidoForms.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { AriaOnFocus } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CrearPartidoForms () {

    const[nroFecha,setNroFecha] = useState("");
    const[nroZona,setNroZona]= useState("");
    const[categoria,setCategoria]= useState("");
    const [fase,setFase] = useState("");
    const[clubLocal,setClubLocal]= useState([]);
    const[clubVisitante,setClubVisitante] = useState([]);
    const[fechaPartido,setFechaPartido]= useState(new Date());
    const[campeonatos,setCampeonatos] = useState([]);
    const [campeonato, setCampeonato] = useState({});    
    const [clubesSelectLocal, setClubesLocalSelect] = useState([]);
    const [clubesSelectVisitante, setClubesVisitanteSelect] = useState([]);
    const [campeonatosAPI, setCampeonatosAPI]= useState([]);
    const [campeonatosSelect, setCampeonatosSelect] = useState([]);
    
    useEffect(()=>{
        
        axios.get('http://localhost:8080/obtenerCampeonatos')
            .then(res => {
                setCampeonatos(res.data);
            })
        
        
    },[])

    useEffect(()=>{
        const clubesAPI = axios.get('http://localhost:8080/obtenerClubesCampeonato?idCampeonato='+campeonatosSelect)
        .then(response => {
            if (typeof response.data === "string"){
                return toast.error(response.data);
            } else {
                setClubLocal(response.data); 
                setClubVisitante(response.data);
            }
            
        });

        campeonatos.forEach(camp => {
            if (camp.idCampeonato == campeonatosSelect){
                setCampeonato(camp);
            }
        });
    },[campeonatosSelect])

    function handleNroFechaChange(e){
        setNroFecha(e.target.value);
    }

    function handleNroZonaChange(e){
        setNroZona(e.target.value);
    }

    function handleCategoriaChange(e){
        setCategoria(e.target.value);
    }

    function handleClubLocalChange (e){
        setClubesLocalSelect(e.target.value);
    }

    function handleClubVisitanteChange(e){
        setClubesVisitanteSelect(e.target.value);
    } 

    function handleCampeonatoChange(e){      
        setCampeonatosSelect(e.target.value);
    }

    function handleFaseChange(e){
        setFase(e.target.value);
        
    }
    

    function handleSubmit(e){
        e.preventDefault();
        console.log(campeonato);
        axios.post('http://localhost:8080/crearPartido?nroFecha='+nroFecha+'&nroZona='+nroZona+'&clubLocal='+clubesSelectLocal+'&clubVisitante='+clubesSelectVisitante+'&fechaPartido='+fechaPartido+'&idCampeonato='+campeonatosSelect+'&fase='+fase)
            .then(res => {
                if (res.data !== ""){
                    return toast.error(res.data);
                } else {
                    return toast.success("Partido creado con exito");
                }
            });
        document.getElementById("formulario").reset();
    }

    return(
        <div>
            <h2 className="text-center mt-3">Crear Partido</h2>
            <div className="container">
                <ToastContainer/>
                <form onSubmit={handleSubmit} id="formulario" autoComplete="off">
                    <div class="mb-3">
                        <label for="nroFecha" class="form-label">Numero de Fecha</label>
                        <input type="text" class="form-control" onChange={handleNroFechaChange} id="nroFecha" placeholder="3" aria-describedby="nroFecha"/>
                    </div>
                    <div class="mb-3">
                        <label for="nroZona" class="form-label">Numero de Zona</label>
                        <input type="text" class="form-control" onChange={handleNroZonaChange} id="nroZona" placeholder="05" aria-describedby="nroZona"/>
                    </div>
                    <div class="mb-3">
                        <p>Seleccione el campeonato</p> 
                        <select class="form-select" id="campeonato" onChange={handleCampeonatoChange} aria-label="campeonato">
                            <option>Seleccione un campeonato</option>
                            {campeonatos.length !== 0 ? campeonatos.map(camp => {
                                if (camp.tipo === "Zona"){
                                    return (
                                        <option value={camp.idCampeonato}>{camp.descripcion}</option>
                                    );
                                }
                            }) : null}
                        </select>
                    </div>
                        <div class="mb-3">
                            <label for="fase" class="form-label">Fase</label>
                            <input type="text" class="form-control" onChange={handleFaseChange} id="fase" placeholder="Semifinal" aria-describedby="fase"/>
                        </div>
                    <div class="mb-3">
                        <p>Seleccione el Club Local</p> 
                        <select class="form-select" id="clubLocal" onChange={handleClubLocalChange} aria-label="clubLocal">
                            <option value="-1">Seleccione un Club Local</option>
                            {clubLocal.map(clubL => {
                                return (
                                    <option value={clubL.idClub}>{clubL.nombre}</option>
                                );
                            })}              
                        </select>
                    </div>
                    <div class="mb-3">
                        <p>Seleccione el Club Visitante</p> 
                        <select class="form-select" id="clubVisitante" onChange={handleClubVisitanteChange} aria-label="clubVisitante">
                            <option value="-1">Seleccione un Club Visitante</option>
                            {clubVisitante.map(clubV => {
                                return (
                                    <option value={clubV.idClub}>{clubV.nombre}</option>
                                );
                            })}              
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="control-label" for="fechaPartido">Fecha del Partido</label>
                        <DatePicker selected={fechaPartido} onChange={(date) => setFechaPartido(date)} className="form-control" id="fechaPartido" name="fechaPartido"/>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    );
}

export default CrearPartidoForms;