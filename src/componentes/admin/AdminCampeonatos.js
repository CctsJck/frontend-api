import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminCampeonatos(){
    const [campeonatos,setCampeonatos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/obtenerCampeonatos")
            .then(response => {
                setCampeonatos(response.data);
            })
    },[])


    function activarCampeonato(id){
        axios.put("http://localhost:8080/activarCampeonato?idCampeonato="+id)
            .then(response => {
                if (response.data !== ""){
                    return toast.error(response.data);
                } else {
                    return toast.success("Campeonato activado con exito");
                }
            })

            setTimeout(() => {
                window.location.reload(true);
            },3000)
    }

    return (
        <div className="container">
            <ToastContainer/>
            <div className="row table-responsive">
                <h2 className="text-center">Campeonatos</h2>
                <table class="table  mt-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha inicio</th>
                            <th scope="col">Fecha fin</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campeonatos != [] ? campeonatos.map(campeonato => {
                            return(
                                <tr key={campeonato.idCampeonato}>
                                    <th>{campeonato.idCampeonato}</th>
                                    <td>{campeonato.descripcion}</td>
                                    <td>{campeonato.fechaInicio}</td>
                                    <td>{campeonato.fechaFin}</td>
                                    <td>{campeonato.tipo}</td>
                                    <td>{campeonato.categoria}</td>
                                    <td>{campeonato.estado === "activo" ? <span class="badge bg-success">Activo</span> : <span class="badge bg-danger">Inactivo</span>}</td>
                                    <td>{campeonato.estado === "activo" ? 
                                        <button className="btn btn-danger disabled">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </button> : 
                                        <button onClick={() => activarCampeonato(campeonato.idCampeonato)} className="btn btn-success me-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </button>}
                                    </td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminCampeonatos;