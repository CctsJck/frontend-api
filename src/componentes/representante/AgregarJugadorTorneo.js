import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AgregarJugadorTorneo(props){

    const [jugadores, setJugadores] = useState([]);
    const [jugador,setJugador] = useState(-1);

    useEffect(() => {
        axios.get("http://localhost:8080/getJugadoresAgregarATorneo?idCampeonato="+props.idCampeonato+"&idClub="+props.idClub)
            .then(res => {
                if (typeof res.data === "string"){
                    return toast.error(res.data);
                } else {
                    setJugadores(res.data);
                }
            })
    },[props])

    function handleJugadorChange(e){
        setJugador(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8080/agregarJugadorTorneo?idJugador="+jugador+"&idCampeonato="+props.idCampeonato)
            .then(res => {
                if (res.data !== ""){
                    return toast.error(res.data);
                } else {
                    return toast.success("Jugador agregado con exito");
                }
            })

        setTimeout(() => {
            window.location.reload(true);
        },3000)
        

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Seleccione el jugador</label>
                    <select class="form-select" onChange={handleJugadorChange} id="jugadores" aria-label="campeonatos">
                        <option value="-1">Seleccione un jugador</option>
                        {jugadores.map(jugador => {
                                return (
                                    <option value={jugador.idJugador}>{jugador.nombre} {jugador.apellido}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="mb-2">
                    <button type="submit" class="btn btn-success">Agregar</button>

                </div>

            </form>
        </>
    )

}

export default AgregarJugadorTorneo;