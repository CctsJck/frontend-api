import React from 'react';


function GestionarClub(){

    return (
        <div className="container">
            <div className="row">
                <h2>Gestionar datos del club</h2>
                <form className="mt-3">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre club</label>
                        <input type="text" class="form-control" id="nombre" aria-describedby="nombre"/>
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Direccion</label>
                        <input type="text" class="form-control" id="direccion" aria-describedby="direccion"/>
                    </div>
                    <a type="submit" class="btn btn-success">Actualizar</a>
                </form>
            </div>

        </div>
    )
}

export default GestionarClub;