import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CrearRepresentante from './CrearRepresentante';

function AdminRepresentantes(){
    const [representantes, setRepresentantes] = useState([]);
    const [representantesConClub, setRepresentanteConClub] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerRepresentantes")
            .then(response => {
                setRepresentantes(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    useEffect(() => {
        representantes.map(representante => {
            axios.get("http://localhost:8080/getClubPorId?idClub="+representante.idClub)
                .then(response => {
                    console.log(response.data);
                })
        })
    },[representantes])

    function crearRepresentante(){

    }

    return (
        <>
            <div className="container">
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
                            <th scope="col">Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {representantes != [] ? representantes.map(representante => {
                                
                                return(
                                    <tr key={representante.legajo}>
                                        <td>{representante.legajo}</td>
                                        <td >{representante.nombre}</td>
                                        <td >{representante.tipodocumento}</td>
                                        <td >{representante.dni}</td>
                                        <td>
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" class="btn btn-primary">Left</button>
                                                <button type="button" class="btn btn-primary">Middle</button>
                                            </div>
                                        </td>

                                    </tr>)
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