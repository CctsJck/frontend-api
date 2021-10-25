import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GestionarPersonales(){

    const params = useParams();
    const [nombre, setNombre] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [club, setClub]=useState("");




    function handleNombreChange(e){
        setNombre(e.target.value);
    }

    function handleTipoDocumentoChange(e){
        setTipoDocumento(e.target.value);
    }

    function handleDocumentoChange(e){
        setDocumento(e.target.value);
    }

    function handleClubChange(e){
        setClub(e.target.value);
    }



    function handleSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:8080/modificarRepresentante?idRepresentante="+params.idPersona+"&nombre="+nombre+"&DNI="+documento+"&tipoDocumento="+tipoDocumento+"&idClub="+club)
        .then(response => {
            return toast.success("Representante modificado con exito");
        })
        .catch(error => {
            return toast.error("Error al modificar los datos del representante");
        })
    }



    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <h2>Gestionar sus datos</h2>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su nombre y apellido</label>
                        <input type="text" onChange={handleNombreChange}  class="form-control" id="nombre" aria-describedby="nombre" placeholder="Juan Pablo"/>
                    </div>

                    <div class="mb-3">
                        <p>Seleccione el tipo de documento</p> 
                            <select class="form-select" id="tipoDocumenento" onChange={handleTipoDocumentoChange} aria-label="tipoDocumento">
                                            <option selected >DNI</option>
                                            <option >Pasaporte</option>
                                            <option >Cedula de identidad</option>
                                            <option >Otro</option>
                            </select>
                    </div>

                    <div class="mb-3">
                        <label for="DNI" class="form-label">Ingrese su numero de Documento</label>
                        <input type="text" onChange={handleDocumentoChange}  class="form-control" id="documento" aria-describedby="documento" placeholder="25365874"/>
                    </div>

                    <div class="mb-3">
                        <label for="DNI" class="form-label">Cambair por un Select de todos los clubes</label>
                        <input type="text" onChange={handleClubChange} class="form-control" id="club" aria-describedby="club" placehoder="25365874"/>
                    </div>


                    <button type="submit" class="btn btn-success">Actualizar</button>
                </form>
            </div>

        </div>
    )
 
}

export default GestionarPersonales;