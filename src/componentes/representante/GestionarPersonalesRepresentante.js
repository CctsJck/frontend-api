import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/////////////////////////////////////////////////////

// NO SE COMO HACER PARA ENVIAR EL FORMULARIO, NO SE ENVIA

////////////////////////////////////////////////////

function GestionarPersonalesRepresentante(){

    const params = useParams();
    const [nombre, setNombre] = useState("");
    const [tipodocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");

    const [representante, setRepresentante] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/getRepresentantePorId?idRepresentante="+params.idPersona)
        .then( response => {
            setRepresentante(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    },[])

    useEffect(() => {
        setNombre(representante.nombre);
        setTipoDocumento(representante.tipodocumento);
        setDocumento(representante.dni);

    },[representante])


    function handleNombreChange(e){
        setNombre(e.target.value);
    }

    function handleTipoDocumentoChange(e){
        setTipoDocumento(e.target.value);
    }

    function handleDocumentoChange(e){
        setDocumento(e.target.value);
    }






    function handleSubmit(e){
        console.log(tipodocumento);
        e.preventDefault();
        console.log("hola");
        axios.put("http://localhost:8080/modificarRepresentante?idRepresentante="+params.idPersona+"&nombre="+nombre+"&DNI="+documento+"&tipoDocumento="+tipodocumento+"&idClub="+representante.idClub)
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
                        <input value={nombre} type="text" onChange={handleNombreChange}  class="form-control" id="nombre" aria-describedby="nombre" placeholder="Juan Pablo"/>
                    </div>

                    <div class="mb-3">
                        <p>Seleccione el tipo de documento</p> 
                            <select class="form-select" id="tipodocumenento" onChange={handleTipoDocumentoChange} aria-label="tipodocumento">
                                            <option value="DNI" >DNI</option>
                                            <option value="Pasaporte" >Pasaporte</option>
                                            <option value="Cedula de identidad">Cedula de identidad</option>
                                            <option value="Otro">Otro</option>
                            </select>
                    </div>

                    <div class="mb-3">
                        <label for="documento" class="form-label">Ingrese su numero de Documento</label>
                        <input value={documento} type="text" onChange={handleDocumentoChange}  class="form-control" id="documento" aria-describedby="documento" placeholder="25365874"/>
                    </div>

                    <button type="submit" class="btn btn-success">Actualizar</button>
                </form>
            </div>

        </div>
    )
 
}

export default GestionarPersonalesRepresentante;