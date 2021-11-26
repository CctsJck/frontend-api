import React, { useState } from 'react';
import "../../css/crearCampeonatoForms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CrearCampeonatoForms(){

    const [descripcion,setDescripcion] = useState("");
    const [fechaInicio,setFechaInicio] = useState(new Date());
    const [fechaFin,setFechaFin] = useState(new Date());
    const [tipoTorneo, setTipoTorneo] = useState("Puntos");
    const [categoria, setCategoria] = useState("");
    const [visible,setVisible] = useState(false);
    const notify = () => toast("Wow so easy!");

    /* Funciones */
    function handleDescripcionChange(e){
        setDescripcion(e.target.value);
    }

    function handleTipoTorneoChange(e){
        console.log(e.target.value);
        setTipoTorneo(e.target.value);
    }

    function handleCategoriaChange(e){
        setCategoria(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8080/crearCampeonato?descripcion='+descripcion+'&fechaInicio='+fechaInicio+'&fechaFin='+fechaFin+'&tipo='+tipoTorneo+'&categoria='+categoria)
            .then(res => {
                if (res.data !== ""){
                    return toast.error(res.data);
                } else {
                    return toast.success("Campeonato creado con exito");
                }
            });
            
        document.getElementById("formulario").reset();
         setTimeout(() => {
             window.location.reload(true);
         },3000)
    }

    return(
        <div>
            <ToastContainer />
            <h2 className="text-center mt-3">Crear campeonato</h2>
            <div className="container">
                <form onSubmit={handleSubmit} id="formulario" autoComplete="off">
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Nombre</label>
                        <input type="text" class="form-control" onChange={handleDescripcionChange} id="descripcion" placeholder="Copa Libertadores" aria-describedby="descripcion"/>
                    </div>
                    <div class="mb-3">
                        <label class="control-label" for="fechaInicio">Fecha Inicio</label>
                        <DatePicker selected={fechaInicio} onChange={(date) => setFechaInicio(date)} className="form-control" id="fechaInicio" name="fechaInicio"/>
                    </div>
                    <div class="mb-3">
                        <label class="control-label" for="fechaFin">Fecha Fin</label>
                        <DatePicker selected={fechaFin} onChange={(date) => setFechaFin(date)} className="form-control" id="fechaFin" name="fechaFin"/>
                    </div>
                    <div className="mb-3">
                        <label class="control-label" for="tipo">Tipo campeonato</label>
                        <div class="form-check">
                            <input class="form-check-input" onChange={handleTipoTorneoChange} value="Puntos" type="radio" name="tipoTorneo" id="puntos" checked={tipoTorneo === "Puntos"}/>
                            <label class="form-check-label" for="puntos">Puntos</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" onChange={handleTipoTorneoChange} value="Zona" type="radio" name="tipoTorneo" id="grupos" checked={tipoTorneo === "Zona"}/>
                            <label class="form-check-label" for="grupos">Grupos</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoria</label>
                        <input type="text" onChange={handleCategoriaChange} class="form-control" id="categoria" placeholder="02" aria-describedby="categoria"/>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    );
}

export default CrearCampeonatoForms;