import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GestionarPersonalesJugador(){

    const params = useParams();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [club, setClub]=useState("");
    const [fechaNac, setFechaNac] = useState(new Date());
    const [userId,setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userRole, setUserRole] = useState("");
    
    const [jugador, setJugador] = useState({});
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/getJugadorPorId?idJugador="+params.idPersona)
            .then( response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    setJugador(response.data);
                }
            })

        axios.get("http://localhost:8080/getUsuarioByIdJugador?idJugador="+params.idPersona)
            .then(userResponse => {
                if (typeof userResponse.data === "string"){
                    return toast.error(userResponse.data);
                } else {
                    setUsuario(userResponse.data);
                }
            })
    },[])

    useEffect(() => {
        setNombre(jugador.nombre);
        setApellido(jugador.apellido)
        setTipoDocumento(jugador.tipoDocumento);
        setDocumento(jugador.numeroDocumento);
        setClub(jugador.idClub);

        setUserId(usuario.idUsuario);
        setUserRole(usuario.rol);
        setUserPass(usuario.password);

    },[jugador,usuario])

    function handleNombreChange(e){
        setNombre(e.target.value);
    }

    function handleApellidoChange(e){
        setApellido(e.target.value);
    }

    function handleTipoDocumentoChange(e){
        setTipoDocumento(e.target.value);
    }

    function handleDocumentoChange(e){
        setDocumento(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:8080/modificarJugador?idJugador="+params.idPersona+"&tipoDocumento="+tipoDocumento+"&numeroDocumento="+documento+"&nombre="+nombre+"&apellido="+apellido+"&idClub="+jugador.idClub+"&fechaNac="+fechaNac)
            .then(response => {
                if (response.data !== ""){
                    return toast.error(response.data);
                } else {
                    return toast.success("Datos del jugador modificados con exito");
                }
            })
        
        setTimeout(() => {
            window.location.reload(true);
        },3000)
    }

    function handleUserPassChange(e){
        setUserPass(e.target.value);
    }

    function handleUserSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:8080/updateJugadorPassword?idJugador="+params.idPersona+"&password="+userPass)
            .then(response => {
                if (response.data !== ""){
                    return toast.error(response.data);
                } else {
                    return toast.success("Datos de la cuenta modificados con exito");
                }
            })
        
        setTimeout(() => {
            window.location.reload(true);
        },3000)
    }



    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <h2>Gestionar datos de la cuenta</h2>
                <form className="mt-3 mb-5" onSubmit={handleUserSubmit}>
                    <div class="mb-3">
                        <label for="userId" class="form-label">Id usuario</label>
                        <input type="text" value = {userId} class="form-control" id="userId" aria-describedby="userId" disabled/>
                    </div>
                    <div class="mb-3">
                        <label for="userRole" class="form-label">Rol usuario</label>
                        <input type="text" value = {userRole} class="form-control" id="userRole" aria-describedby="userRole" disabled/>
                    </div>
                    <div class="mb-3">
                        <label for="userPass" class="form-label">Contraseña usuario</label>
                        <input type="text" onChange={handleUserPassChange} value = {userPass} class="form-control" id="userPass" aria-describedby="userPass"/>
                    </div>
                    <button type="submit" class="btn btn-success">Actualizar</button>
                </form>
                <h2>Gestionar sus datos personales</h2>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su nombre </label>
                        <input type="text" onChange={handleNombreChange} value = {nombre} class="form-control" id="nombre" aria-describedby="nombre" placeholder="Juan Pablo"/>
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su Apellido</label>
                        <input type="text" onChange={handleApellidoChange} value = {apellido}  class="form-control" id="apellido" aria-describedby="apellido" placeholder="Perez"/>
                    </div>
                    <div class="mb-3">
                        <label class="control-label" for="fechaPartido">Fecha Inicio</label>
                        <DatePicker selected={fechaNac} onChange={(date) => setFechaNac(date)} className="form-control" id="fechaNac" name="fechaNac"/>
                    </div>
                    <div class="mb-3">
                        <p>Seleccione el tipo de documento</p> 
                        <select class="form-select" id="tipoDocumenento" onChange={handleTipoDocumentoChange} aria-label="tipoDocumento">
                            <option value = "DNI">DNI</option>
                            <option value = "Pasaporte">Pasaporte</option>
                            <option value = "Cedula de Identidad">Cedula de identidad</option>
                            <option value = "Otro">Otro</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="DNI" class="form-label">Ingrese su numero de Documento</label>
                        <input type="text" onChange={handleDocumentoChange} value = {documento}  class="form-control" id="documento" aria-describedby="documento" placeholder="25365874"/>
                    </div>
                    <button type="submit" class="btn btn-success">Actualizar</button>
                </form>
            </div>
        </div>
    )
}

export default GestionarPersonalesJugador;