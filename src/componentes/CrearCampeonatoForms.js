import React from 'react';
import '../css/crearCampeonatoForms.css';


function crearCampeonatoForms(){
    const today = new Date();
    const dateInicio = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const dateFin = today.getDate()+'-'+(today.getMonth()+1)+'-'+(today.getFullYear()+1);
   
    

    return(
        <div>
            <h2 className="text-center mt-3">Crear campeonato</h2>
            <div className="container">
                <form>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="descripcion" placeholder="Copa Libertadores" aria-describedby="descripcion"/>
                </div>
                <div class="mb-3">
                    <label class="control-label" for="fechaInicio">Fecha Inicio</label>
                    <input class="form-control" id="fechaInicio" name="fechaInicio" placeholder="MM/DD/YYYY" type="text"/>
                </div>
                <div class="mb-3">
                    <label class="control-label" for="fechaFin">Fecha Fin</label>
                    <input class="form-control" id="fechaFin" name="fechaFin" placeholder="MM/DD/YYYY" type="text"/>
                </div>
                
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
            
        </div>
        
    );
}

export default crearCampeonatoForms;