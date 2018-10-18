import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
import ProjectBuscar from './ProjectBuscar'
import ProjectForm from './ProjectForm'
import firebase from '../Firebase'  
import { Redirect } from 'react-router-dom'
import ProjectList from './ProjectList'

class Project extends Component {

constructor(){
  super();
  this.state={
    proyectosg:[],
    nombreBuscar:null,
     resul: null,
    db:firebase.firestore()
    }
    const settings={timestampsInSnapshots: true}
    this.state.db.settings(settings);
}

componentWillMount(){
   

  }

refresh(){

     var proyectos=[];
    this.state.db.collection("proyectos").get().then( (querySnapShot) =>
  
  {
    querySnapShot.forEach( doc => {
      proyectos.push(doc.data());
       console.log(doc.id, "=>" , doc.data());

    });
    this.setState({proyectosg:proyectos});
  });
  }

handleUpdate(e){




}


 handleSeleccionarProyecto(e) {

    var item = null;

    this.state.proyectosConst.forEach(element => {

      if (this.state.nombreProyConst === element.nombre) {

        item = element
      }
    });

    if (item != null) {

      this.setState({
        nombreProyConst: "",
        //resul: <ProyectoBuscado proyectoParam={item} />

      });
    }
    else {

      this.mensaje("No se encontraron proyectos con el nombre " + this.state.nombreProyConst);

      this.setState({
        nombreProyConst: "",
        resul: null
      });
    }
  }

  render() {

      if (localStorage.getItem("session") !== "") {
    return (
       
      <div className="Project">
 
  <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Managment Tools</a>
   <ul className="navbar-nav ml-auto  my-lg-0">
		      <li className="nav-item">
		       <a className="nav-link" href="/login">LogOut <i className="fas fa-user-times"></i> </a>

		      </li>
		    </ul>
</nav>
     
    <div>
      <ProjectBuscar className="py-5" onUpdate={this.handleUpdate.bind(this)}></ProjectBuscar>
    </div>
    <div>
    <ProjectList></ProjectList>
    </div>

    <div className="col-sm-12 row divItemForm">
      <div className="container col-6">
        <div className="ProjectItem col-8 ">
         <label><h3>Detalles</h3></label>
        <div>
         <button><i className="fas fa-plus"></i>Nueva Tarea</button>
        </div>
      </div>

    </div>
      
      <div className="container col-6">
      <ProjectForm></ProjectForm>
      </div>
    </div>

    

      </div>

    );
    } else {
      return (
        <Redirect to="/login" />
      );
    }
  }
}

export default Project; 
