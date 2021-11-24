import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GestionarClub(){
    const params = useParams();
    const [club,setClub] = useState({});
    const [nombreClub,setNombreClub] = useState("");
    const [domicilioClub,setDomicilioClub] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/getClubPorIdRepresentante?idRepresentante="+params.idPersona)
        .then( response => {
            setClub(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[])

    useEffect(() => {
        setNombreClub(club.nombre);
        setDomicilioClub(club.direccion);
    },[club])

    function handleNombreChange(e){
        setNombreClub(e.target.value);
    }

    function handleDomicilioChange(e){
        setDomicilioClub(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:8080/modificarClub?idClub="+club.idClub+"&nombre="+nombreClub+"&direccion="+domicilioClub)
            .then(response => {
                return toast.success("Club modificado con exito");
            })
            .catch(error => {
                return toast.error("Error al modificar el club");
            })
    }

    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <h2>Gestionar datos de {club.nombre}</h2>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre club</label>
                        <input type="text" onChange={handleNombreChange} value={nombreClub} class="form-control" id="nombre" aria-describedby="nombre"/>
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Direccion</label>
                        <input type="text" onChange={handleDomicilioChange} value={domicilioClub} class="form-control" id="direccion" aria-describedby="direccion"/>
                    </div>
                    <button type="submit" class="btn btn-success">Actualizar</button>
                </form>
            </div>
        </div>
    )
}

export default GestionarClub;