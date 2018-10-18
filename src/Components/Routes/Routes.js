import React, {Components} from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Login from '../Login/Login'
import Project from '../Project/Project';
import Tareas from'../Project/Tareas'
const Routes=() =>
<Switch>
     
     <Redirect from="/login" to="/"/>
      <Route exact path="/"  component={Login}/>
      <Redirect from="/projects#" to="/projects"/>
      <Route exact path="/projects"  component={Project}/>
      <Route exact path="/tareas"  component={Tareas}/>
    </Switch>
export default Routes;