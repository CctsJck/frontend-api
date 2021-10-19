import React, { useState , useEffect} from 'react';
import '../css/crearPartidoForms.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { AriaOnFocus } from 'react-select';



function CrearPartidoForms () {

    const[nroFecha,setNroFecha] = useState("");
    const[nroZona,setNroZona]= useState("");
    const[categoria,setCategoria]= useState("");
    const[clubLocal,setClubLocal]= useState("");
    const[clubVisitante,setClubVisitante] = useState("");
    const[fechaPartido,setFechaPartido]= useState(new Date());
    const[campeonato,setCampeonato] = useState("");

    const [clubesAPI, setClubesAPI] = useState([]);
    const [clubesSelect, setClubesSelect] = useState([]);

    const [campeonatosAPI, setCampeonatosAPI]= useState([]);
    const [campeonatosSelect, setCampeonatosSelect] = useState([]);
    
    
    useEffect(() => {
        const fetchData = async () => {
          const clubes = await axios('http://localhost:8080/getClubesCampeonato',);//cambiar el nombre del metodo
          setClubesAPI(clubes.data);

          const campeonatos = await axios('http://localhost:8080/getCampeonatos',);//cambiar el nombre del metodo
          setCampeonatosAPI(campeonatos.data);



        };
     
        fetchData();
        
      }, []);



    

    function cargarCampeonatosSelect(){
        campeonatosAPI.forEach(campeonatos => campeonatosSelect.push(
            {value: campeonatos.idGlobalCareer, label : campeonatos.name})//cambiar los nombres de las variables
        );

    }

    if (campeonatosSelect.length === 0){
        cargarCampeonatosSelect();  
    }


    function cargarClubesSelect(){
        clubesAPI.forEach(clubes => clubesSelect.push(
        {value: clubes.idGlobalCareer, label : clubes.name})    //cambiar los  nombres de las variables
    );
    }



    if (clubesSelect.length === 0 ){
        cargarClubesSelect();
    }
//#################################################

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
        setClubLocal(e);
    }

    function handleClubVisitanteChange(e){
        setClubVisitante(e);
    } 

    function handleCampeonatoChange(e){
        setCampeonato(e);
    }
    

//#####################################33333333



    function handleSubmit (e){
        e.preventDefault();
    }

   
    /* HTML */

    return(
        <div>
        <h2 className="text-center mt-3">Crear Partido</h2>
        <div className="container">
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
                <label for="categoria" class="form-label">Selecione una Categoria</label>
                <input type="text" class="form-control" onChange={handleCategoriaChange} id="categoria" placeholder="2002" aria-describedby="categoria"/>
            </div>

            <div class="mb-3">
                <p>Seleccione el Club Local</p> 
                <Select
                  options={clubesSelect}
                  isSearchable
                  value={clubLocal}
                  onChange={handleClubLocalChange}
                  />
            </div>

            <div class="mb-3">
                <p>Seleccione el Club Visitante</p> 
                <Select
                  options={clubesSelect}
                  isSearchable
                  value={clubVisitante}
                  onChange={handleClubVisitanteChange}
                  />
            </div>

            <div class="mb-3">
                <label class="control-label" for="fechaPartido">Fecha Inicio</label>
                <DatePicker selected={fechaPartido} onChange={(date) => setFechaPartido(date)} className="form-control" id="fechaPartido" name="fechaPartido"/>
            </div>

            <div class="mb-3">
                <p>Seleccione el campeonato</p> 
            <Select
                options={campeonatosSelect}
                isSearchable
                value={campeonato}
                onChange={handleCampeonatoChange}
            />
            </div>

            <button type="submit" class="btn btn-success">Crear</button>
            </form>

        </div>
        
    </div>
        
    );
}

export default CrearPartidoForms;