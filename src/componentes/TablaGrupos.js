import axios from 'axios';
import React, {useEffect, useState} from 'react';

function TablaGrupos(props){

    const [tablaGrupos,setTablaGrupos] = useState([[]]);
    const [tabla,setTabla] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/getTablasGruposCamp?idCampeonato=1")
        .then(res => {
            setTablaGrupos(res.data);
        })
    },[])

    useEffect(() => {
        tablaGrupos.map(t => {
            setTabla(t.data);
        })
    },[tablaGrupos])

    return (
        <h2>{tabla && tabla.length ? tabla.length : null}</h2>
    )
    
        
            
        
        
    

}

export default TablaGrupos;