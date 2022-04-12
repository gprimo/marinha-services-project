import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './componentes/Header/index';
import Home from "./pages/home";
import CadastroAeronaves from './pages/home/cadastro';
import AircraftMap from './pages/mapa/aeronaves';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route 
        {...rest}
        render = {
            props =>  ( <Component {...props} /> )  
        }
    />
);


const Routes = () => (
    <BrowserRouter>
        <Header />        
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/aeronaves" component={Home} />
            <Route exact path="/aeronaves/mapa" component={AircraftMap} />
            <Route path='/aeronaves/cadastro/:id?' component={CadastroAeronaves} exact={true} />
            <PrivateRoute path="/app" component={() => <h1>App</h1>} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;