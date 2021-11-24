import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CrearRepresentante(){
    
    const [nombre, setNombre] = useState("");
    const [tipodocumento, setTipoDocumento] = useState("DNI");
    const [documento, setDocumento] = useState("");
    const [club,setClub] = useState(-1);
    const [clubesAPI,setClubesAPI] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerClubes")
            .then(response => {
                setClubesAPI(response.data);
            })
    },[])

    function handleNombreChange(e){
        setNombre(e.target.value);
    }

    function handleTipoChange(e){
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
        axios.post("http://localhost:8080/crearRepresentante?tipoDocumento="+tipodocumento+"&DNI="+documento+"&nombre="+nombre+"&idClub="+club)
            .then(response =>{
                return toast.success("Representante creado con exito");
            })
            .catch(error => {
                return toast.error("Hubo un error al crear el representante");
            })
        
        setTimeout(() => {
            window.location.reload(true);
        },3000)
    }
    
    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su nombre y apellido</label>
                        <input type="text" onChange={handleNombreChange}  class="form-control" id="nombre" aria-describedby="nombre" placeholder="Juan Pablo"/>
                    </div>
                    <div class="mb-3">
                        <p>Seleccione el tipo de documento</p> 
                        <select class="form-select" id="tipodocumenento" onChange={handleTipoChange} aria-label="tipodocumento">
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte" >Pasaporte</option>
                            <option value="Cedula de identidad">Cedula de identidad</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="documento" class="form-label">Ingrese su numero de Documento</label>
                        <input  type="text" onChange={handleDocumentoChange} class="form-control" id="documento" aria-describedby="documento" placeholder="25365874"/>
                    </div>
                    <div class="mb-3">
                        <p>Seleccione el club</p> 
                        <select class="form-select" id="club" onChange={handleClubChange} aria-label="club">
                            <option value="-1">Seleccione el club</option>
                            {clubesAPI != [] ? clubesAPI.map(club => {
                                return (
                                    <option value={club.idClub}>{club.nombre}</option>
                                )
                            }):null}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    )
}

export default CrearRepresentante;