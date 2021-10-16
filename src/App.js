import './App.css';
import Login from './componentes/Login';
import Home from './componentes/Home';
import CrearCampeonatoForms from './componentes/CrearCampeonatoForms';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <Router>
      

      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path="/home/:id">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/home/:id/:opcion">
          <Home/>
        </Route>
        
      </Switch>
    </Router>
    
    
  
  );
    
}

export default App;
