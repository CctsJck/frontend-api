import './App.css';
import Login from './componentes/Login';
import Home from './componentes/Home';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import TablaPosiciones from './componentes/TablaPosiciones';


function App() {
  return (
    <Router>
      

      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path="/home/:idRol/:idPersona">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/home/:idRol/:idPersona/:opcion">
          <Home/>
        </Route>
        <Route exact path="/tablaPosiciones">
          <TablaPosiciones/>
        </Route>
        
      </Switch>
    </Router>
    
    
  
  );
    
}

export default App;
