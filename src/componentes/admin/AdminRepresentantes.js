import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CrearRepresentante from './CrearRepresentante';
import GestionarDatosRepresentante from '../representante/GestionarPersonalesRepresentante';
import {Button, Modal} from 'react-bootstrap';




function AdminRepresentantes(){
    const [representantes, setRepresentantes] = useState([]);
    const [representantesConClub, setRepresentanteConClub] = useState([]);
    const [showEditRepresentanteModal, setEditRepresentanteModal] = useState(false);
    const handleClose = () => setEditRepresentanteModal(false);
    const handleShow = () => setEditRepresentanteModal(true);
    const [idRepre, setIdRepre] = useState(-1);
    
    useEffect(() => {
        axios.get("http://localhost:8080/obtenerRepresentantes")
            .then(response => {
                setRepresentantes(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    useEffect(() => {
        representantes.map(representante => {
            axios.get("http://localhost:8080/getClubPorId?idClub="+representante.idClub)
                .then(response => {
                    if (typeof response.data === "string"){
                        return toast.error(response.data);
                    } else {
                        let nuevo = {
                            representante: representante,
                            club: response.data
                        }
    
                        setRepresentanteConClub(representantesConClub => ([...representantesConClub,nuevo]));
                    }
                    
                })
        })
    },[representantes])


    function modalModificarRepresentante(idRepresentante){
       handleShow();
       setIdRepre(idRepresentante);
    }

    function renderEditarRepresentanteModal(){
        return(
            <Modal
                show={showEditRepresentanteModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
              <Modal.Title>Editar representante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GestionarDatosRepresentante id={idRepre}/>
            </Modal.Body>
            
          </Modal>
        )
    }

    function eliminarRepresentante(idRepresentante){
        if (window.confirm("¿Seguro desea eliminar al representante?")){
            axios.put("http://localhost:8080/eliminarRepresentante?idRepresentante="+idRepresentante)
                .then(response => {
                    if (response.data !== ""){
                        return toast.error(response.data);
                    } else {
                        return toast.success("Representante eliminado con exito");
                    }
                })
                
        }
        setTimeout(() => {
            window.location.reload(true);

        },4000)
    }


    return (
        <>
            <div className="container">
                {renderEditarRepresentanteModal()}
                <ToastContainer/>
                <div className="row table-responsive">
                    <h2 className="text-center">Representantes</h2>
                    <div class="d-grid gap-2 mt-4 d-md-flex justify-content-md-end">
                        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#crearRepre">Crear representante</button>
                    </div>

                    <div class="modal fade" id="crearRepre" tabindex="-1" aria-labelledby="crearRepre" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Crear representante</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <CrearRepresentante/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Tipo Documento</th>
                                <th scope="col">DNI</th>
                                <th scope="col">Club</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {representantesConClub != [] ? representantesConClub.map(representante => {
                                return(
                                    <>
                                        <tr key={representante.representante.legajo}>
                                            <td>{representante.representante.legajo}</td>
                                            <td >{representante.representante.nombre}</td>
                                            <td >{representante.representante.tipodocumento}</td>
                                            <td >{representante.representante.dni}</td>
                                            <td >{representante.club.nombre}</td>
                                            <td >{representante.representante.eliminado === "noEliminado" ? <span className="badge bg-success">Activo</span> : <span className="badge bg-danger">Inactivo</span>}</td>
                                            <td>
                                                <div class="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" class="btn btn-warning" onClick={() => modalModificarRepresentante(representante.representante.legajo)}>Modificar</button>
                                                    <button type="button" class="btn btn-danger" onClick={() => eliminarRepresentante(representante.representante.legajo)}>Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>)
                            })
                            : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminRepresentantes;