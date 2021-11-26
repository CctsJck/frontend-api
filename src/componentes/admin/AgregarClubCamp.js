import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AgregarClubCamp(){
    const [campeonato, setCampeonato] = useState('-1');
    const [club, setClub] = useState('0');
    const [campeonatos, setCampeonatos] = useState([]);
    const [clubes,setClubes] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const campeonatosAPI = await axios('http://localhost:8080/obtenerCampeonatos');
            setCampeonatos(campeonatosAPI.data);
        };
        fetchData();
    },[])
    
    function handleCampChange(e){
        setCampeonato(e.target.value);
        const clubesAPI = axios.get('http://localhost:8080/obtenerClubesDisponiblesCampeonato?idCampeonato='+e.target.value)
                            .then(response => {
                                setClubes(response.data);
        });
    }

    function handleClubChange(e){
        setClub(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:8080/agregarClubCampeonato?idClub='+club+'&idCampeonato='+campeonato)
            .then(response => {
                return toast.success("Club agregado al campeonato");
            })

        setTimeout(() => {
            window.location.reload(true);
        },3000 )
    }

    return(
        <div className="container">
            <ToastContainer />
            <div className="row">
                <h2>Agregar club a un campeonato</h2>
                <div className="col-6 mt-5">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="camp-label" class="form-label">Seleccione el campeonato</label>
                            <select class="form-select" id="campeonatos" onChange={handleCampChange} aria-label="campeonatos">
                                <option value="-1">Seleccione un campeonato</option>
                                {campeonatos.map(campeonato => {
                                        return (
                                            <option value={campeonato.idCampeonato}>{campeonato.descripcion}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="camp-label" class="form-label">Seleccione el club</label>
                            <select class="form-select" onChange={handleClubChange} aria-label="campeonatos">
                                <option value="-1">Seleccione un club</option>
                                {clubes.map(club => {
                                    return (
                                        <option value={club.idClub}>{club.nombre}</option>
                                    );
                                })
                                }
                            </select>
                        </div>
                        <div className="mb-2">
                            <button type="submit" className="btn btn-success">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AgregarClubCamp;