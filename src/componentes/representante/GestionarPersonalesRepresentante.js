import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/////////////////////////////////////////////////////

// NO SE COMO HACER PARA ENVIAR EL FORMULARIO, NO SE ENVIA//


// TAL VEZ HAY UN ERROR EN EL REST, ME DICE QUE NO ES VALIDO EL REQUEST


////////////////////////////////////////////////////

function GestionarPersonalesRepresentante(props){

    const params = useParams();
    const [idRepre,setIdRepre] = useState(-1);
    const [nombre, setNombre] = useState("");
    const [tipodocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");

    const [representante, setRepresentante] = useState({});

    const [userId,setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userRole, setUserRole] = useState("");
    
    const [usuario, setUsuario] = useState({});



    useEffect(() => {
        if (props.id === undefined) {
            setIdRepre(params.idPersona);
            axios.get("http://localhost:8080/getRepresentantePorId?idRepresentante="+params.idPersona)
            .then( response => {
                setRepresentante(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

            axios.get("http://localhost:8080/getUsuarioByIdRepresentante?idRepresentante="+params.idPersona)
            .then(userResponse => {
                if (typeof userResponse.data === "string"){
                    return toast.error(userResponse.data);
                } else {
                    setUsuario(userResponse.data);
                    
                }
            })
        } else {
            setIdRepre(props.id);
            axios.get("http://localhost:8080/getRepresentantePorId?idRepresentante="+props.id)
            .then( response => {
                setRepresentante(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
        })

        axios.get("http://localhost:8080/getUsuarioByIdRepresentante?idRepresentante="+props.id)
            .then(userResponse => {
                if (typeof userResponse.data === "string"){
                    return toast.error(userResponse.data);
                } else {
                    setUsuario(userResponse.data);
                    
                }
            })
        }

        


        

    },[])

    useEffect(() => {
        setNombre(representante.nombre);
        setTipoDocumento(representante.tipodocumento);
        setDocumento(representante.dni);
        console.log(usuario);
        setUserId(usuario.idUsuario);
        setUserRole(usuario.rol);
        setUserPass(usuario.password);

    },[representante,usuario])


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
        e.preventDefault();
        axios.put("http://localhost:8080/modificarRepresentante?idRepresentante="+idRepre+"&nombre="+nombre+"&DNI="+documento+"&tipoDocumento="+tipodocumento+"&idClub="+representante.idClub)
        .then(response => {
            return toast.success("Representante modificado con exito");
        })
        .catch(error => {
            return toast.error("Error al modificar los datos del representante");
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
        axios.put("http://localhost:8080/updateReprePassword?idRepre="+idRepre+"&password="+userPass)
            .then(response => {
                if (typeof response.data === "string" && response.data !== ""){
                    return toast.error(response.data);
                } else {
                    return toast.success("Datos de la cuenta modificados con exito");
                }
            })
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