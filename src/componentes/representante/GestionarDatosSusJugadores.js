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
    const [club, setClub]=useState({});
    const [fechaNac, setFechaNac] = useState();
    const [jugador, setJugador] = useState({});
    const [jugadoresAPI, setjugadoresAPI] = useState([]);
    const [jugadores,setJugadores] = useState([]);
    const [jugadorSelect, setJugadorSelect] = useState([]);
    //Variables de Cracion de jugador
    const [nombreCrear, setNombreCrear] = useState("");
    const [apellidoCrear, setApellidoCrear] = useState("");
    const [tipoDocumenentoCrear, setTipoDocumentoCrear] = useState("DNI");
    const [documentoCrear, setDocumentoCrear] = useState("");
    const [fechaNacCrear, setFechaNacCrear] = useState(""); 

    useEffect(() => {
        axios.get("http://localhost:8080/getClubPorIdRepresentante?idRepresentante="+params.idPersona)
            .then( response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    setClub(response.data);
                }
            })
    },[])

    useEffect(()=>{
        const jugadores = axios.get('http://localhost:8080/getJugadoresClub?idClub='+club.idClub)
            .then(response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    console.log(response.data);
                    setJugadores(response.data);
                }
            });
    },[club])

    useEffect(() => {
        axios.get("http://localhost:8080/getJugadorPorId?idJugador="+jugadorSelect)
            .then( response => {
                if (typeof response.data === "string"){
                    return toast.error(response.data);
                } else {
                    console.log(response.data);
                    setJugador(response.data);
                }
                
            })
    },[jugadorSelect])

    useEffect(() => {
        setNombre(jugador.nombre);
        setApellido(jugador.apellido)
        setTipoDocumento(jugador.tipoDocumento);
        setDocumento(jugador.numeroDocumento);
         var fecha = jugador.fechaNacimiento;
        fecha = Date.parse(fecha);
        var fechaBuena = new Date(fecha)
        console.log(fecha);
        console.log(fechaBuena);
        //setFechaNac(fechaBuena);
        //setFechaNac(new Date(jugador.fechaNacimiento));

    },[jugador])

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

    function handleJugadorChange(e){
        setJugadorSelect(e.target.value);
        
    }

    function handleNombreCrearChange(e){
        setNombreCrear(e.target.value);
    }

    function handleApellidoCrearChange(e){
        setApellidoCrear(e.target.value);
    }

    function handleTipoDocumentoCrearChange(e){
        setTipoDocumentoCrear(e.target.value);
    }

    function handleDocumentoCrearChange(e){
        setDocumentoCrear(e.target.value);
    }

    function handleFechaNacCrearChange(e) {
        setFechaNacCrear(e.target.value);
    }



    function handleSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:8080/modificarJugador?idJugador="+jugador.idJugador+"&tipoDocumento="+tipoDocumento+"&numeroDocumento="+documento+"&nombre="+nombre+"&apellido="+apellido+"&idClub="+club.idClub+"&fechaNac="+fechaNac)
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

    function handleSubmitCrear(e){
        e.preventDefault();
        axios.post("http://localhost:8080/agregarJugador?tipoDocumento="+tipoDocumenentoCrear+"&documento="+documentoCrear+"&nombre="+nombreCrear+"&apellido="+apellidoCrear+"&idClub="+club.idClub+"&fichaje="+new Date()+"&fechaNacimiento="+fechaNacCrear)
            .then(response => {
                if(response.data !== ""){
                    return toast.error(response.data);
                }else{
                    return toast.success("Jugador agregado con exito");
                }
            })

             setTimeout(() => {
                 window.location.reload(true);
             },3000)
    }


    function handleSubmitElim(e){
        e.preventDefault();
        axios.delete("http://localhost:8080/eliminarJugador?idJugador="+jugador.idJugador)
            .then(response => {
                if(response.data !== ""){
                    return toast.error(response.data);
                } else {
                    return toast.success("Jugador eliminado con exito");
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
                <div class="col-8">
                    <h2>Gestionar sus datos</h2>
                </div>
                <div class="col-2">
                    <a type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#agregarJugador">Agregar Jugadores</a>
                    <div class="modal fade" id="agregarJugador" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Agregar un jugador</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form className="mt-3" onSubmit={handleSubmitCrear}>
                                        <div class="mb-3">
                                            <label for="nombre" class="form-label">Ingrese el nombre del jugador</label>
                                            <input type="text" onChange={handleNombreCrearChange}  class="form-control" id="nombreCrear" aria-describedby="nombreCrear" placeholder="Juan Pablo"/>
                                        </div>
                                        <div class="mb-3">
                                            <label for="nombre" class="form-label">Ingrese el apellido del jugador</label>
                                            <input type="text" onChange={handleApellidoCrearChange}  class="form-control" id="apellidoCrear" aria-describedby="apellidoCrear" placeholder="Perez"/>
                                        </div>
                                        <div class="mb-3">
                                            <p>Seleccione el tipo de documento</p> 
                                            <select class="form-select" id="tipoDocumenentoCrear" onChange={handleTipoDocumentoCrearChange} aria-label="tipoDocumenentoCrear">
                                                <option value="DNI">DNI</option>
                                                <option value="Pasaporte" >Pasaporte</option>
                                                <option value="Cedula de identidad">Cedula de identidad</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="documento" class="form-label">Ingrese su numero de Documento</label>
                                            <input  type="text" onChange={handleDocumentoCrearChange} class="form-control" id="documentoCrear" aria-describedby="documentoCrear" placeholder="25365874"/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="control-label" for="fechaFin">Fecha de nacimiento</label>
                                            <DatePicker selected={fechaNacCrear} onChange={(date) => setFechaNacCrear(date)} className="form-control" id="fechaNacCrear" name="fechaNacCrear"/>
                                        </div>
                                        <button type="submit" class="btn btn-success">Agregar</button>
                                        <button type="button" class="btn btn-secondary sm-3" data-bs-dismiss="modal">Cerrar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2"> 
                    <a type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarJugador">Eliminar Jugadores</a>
                    <div class="modal fade" id="eliminarJugador" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Eliminar Jugador</h5>
                                </div>
                                <div class="modal-body">
                                    <form className="mt-3" onSubmit={handleSubmitElim}>
                                        <div class="mb-3">
                                            <p>Seleccione el jugador a modificar</p> 
                                            <select class="form-select" id="jugador" onChange={handleJugadorChange} aria-label="campeonato">
                                                <option>Seleccione jugador</option>
                                                {jugadores.map(jugadores => {
                                                    if (jugadores.eliminado === "noEliminado"){
                                                        return (
                                                            <option value={jugadores.idJugador}>{jugadores.nombre} {jugadores.apellido}</option>
                                                        );
                                                    }})
                                                }
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-danger">Eliminar</button>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <p>Seleccione el jugador a modificar</p> 
                        <select class="form-select" id="jugador" onChange={handleJugadorChange} aria-label="campeonato">
                            <option>Seleccione jugador</option>
                            {jugadores.map(jugadores => {
                                if (jugadores.eliminado === "noEliminado"){
                                    return (
                                        <option value={jugadores.idJugador}>{jugadores.nombre} {jugadores.apellido}</option>
                                    );
                                }})
                            }
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su nombre </label>
                        <input type="text" onChange={handleNombreChange} value = {nombre} class="form-control" id="nombre" aria-describedby="nombre" placeholder="Juan Pablo"/>
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Ingrese su Apellido</label>
                        <input type="text" onChange={handleApellidoChange} value = {apellido}  class="form-control" id="apellido" aria-describedby="apellido" placeholder="Perez"/>
                    </div>
                    <div class="mb-3">
                        <label class="control-label" for="fechaPartido">Fecha de Nacimiento</label>
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