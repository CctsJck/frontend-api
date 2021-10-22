import React, { useState , useEffect} from 'react';
import '../css/crearPartidoForms.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { AriaOnFocus } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';



function CrearPartidoForms () {

    
    const[nroFecha,setNroFecha] = useState("");
    const[nroZona,setNroZona]= useState("");
    const[categoria,setCategoria]= useState("");
    const[clubLocal,setClubLocal]= useState([]);
    const[clubVisitante,setClubVisitante] = useState([]);
    const[fechaPartido,setFechaPartido]= useState(new Date());
    const[campeonato,setCampeonato] = useState([]);

    const [clubesAPI, setClubesAPI] = useState([]);
    const [clubesSelectLocal, setClubesLocalSelect] = useState([]);
    const [clubesSelectVisitante, setClubesVisitanteSelect] = useState([]);

    const [campeonatosAPI, setCampeonatosAPI]= useState([]);
    const [campeonatosSelect, setCampeonatosSelect] = useState([]);
    

    useEffect(()=>{
        const fetchData = async () => {
            const campeonatosAPI = await axios('http://localhost:8080/obtenerCampeonatos');
            setCampeonato(campeonatosAPI.data);
            
        };

        fetchData();
    },[])

    useEffect(()=>{
        console.log(campeonatosSelect);
        const clubesAPI = axios.get('http://localhost:8080/obtenerClubesCampeonato?idCampeonato='+campeonatosSelect)
        .then(response => {
        setClubLocal(response.data);
        setClubVisitante(response.data);
        });
        
    },[campeonatosSelect])



    

    function cargarCampeonatosSelect(){
        campeonatosAPI.forEach(campeonatos => campeonatosSelect.push(
            {value: campeonatos.idGlobalCareer, label : campeonatos.name})//cambiar los nombres de las variables
        );

    }

    if (campeonatosSelect.length === 0){
        cargarCampeonatosSelect();  
    }


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
        console.log(campeonato);
        
    }
    

function handleSubmit(e){
    console.log(nroFecha);
    e.preventDefault();
    axios.post('http://localhost:8080/crearPartido?nroFecha='+nroFecha+'&nroZona='+nroZona+'&categoria='+categoria+'&clubLocal='+clubesSelectLocal+'&clubVisitante='+clubesSelectVisitante+'&fechaPartido='+fechaPartido+'&idCampeonato='+campeonatosSelect).then(res => {
        console.log(res);
        console.log(res.data);
    });
    document.getElementById("formulario").reset();
    return toast.success("Partido creado con exito");
    }

   
    /* HTML */

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
                <label for="categoria" class="form-label">Categoria</label>
                <input type="text" class="form-control" onChange={handleCategoriaChange} id="categoria" placeholder="2002" aria-describedby="categoria"/>
            </div>

            <div class="mb-3">
                <p>Seleccione el campeonato</p> 
                    <select class="form-select" id="campeonato" onChange={handleCampeonatoChange} aria-label="campeonato">
                                    <option>Seleccione un campeonato</option>
                                    {campeonato.map(campeonatos => {
                                        return (
                                            <option value={campeonatos.idCampeonato}>{campeonatos.descripcion}</option>
                                        );
                                    })
                                    }
                    </select>
            </div>

            <div class="mb-3">
                <p>Seleccione el Club Local</p> 
                <select class="form-select" id="clubLocal" onChange={handleClubLocalChange} aria-label="clubLocal">
                                    <option value="-1">Seleccione un Club Local</option>
                                    {clubLocal.map(clubL => {
                                        return (
                                            <option value={clubL.idClub}>{clubL.nombre}</option>
                                        );
                                    })
                                    }              
                </select>
            </div>

            <div class="mb-3">
                <p>Seleccione el Club Visitante</p> 
                <select class="form-select" id="clubVisitante" onChange={handleClubVisitanteChange} aria-label="clubVisitante">
                                    <option value="-1">Seleccione un Club Local</option>
                                    {clubVisitante.map(clubV => {
                                        return (
                                            <option value={clubV.idClub}>{clubV.nombre}</option>
                                        );
                                    })
                                    }              
                </select>
            </div>

            <div class="mb-3">
                <label class="control-label" for="fechaPartido">Fecha Inicio</label>
                <DatePicker selected={fechaPartido} onChange={(date) => setFechaPartido(date)} className="form-control" id="fechaPartido" name="fechaPartido"/>
            </div>

            <button type="submit" class="btn btn-success">Crear</button>
            </form>

        </div>
        
    </div>
        
    );
}

export default CrearPartidoForms;