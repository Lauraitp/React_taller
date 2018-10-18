import React, { Component } from 'react'
import firebase from '../Firebase'
import ProjectItem from './ProjectItem'

class ProjectBuscar extends Component {

constructor(){
    super();
  this.state={
        busqueda:"",
         proyectosConst:[],
         resul:[],
          db: firebase.firestore()
		
    }
	
  }


   componentWillMount() {
      this.refresh()

  }

  refresh() {
     var proy = [];
    this.state.db.collection("proyectos").get().then((querySnapShot) => {

      querySnapShot.forEach(doc => {

        proy.push(doc.data());
      });

      this.setState({ proyectosConst: proy,

      });
    });
  }


handleBuscarProyecto(e){
var item = null;

if (this.state.busqueda !== ""){
    this.state.proyectosConst.forEach(element => {

      if (this.state.busqueda === element.nombre) {

        item = element
      }
    });

    if (item != null) {

      this.setState({
        busqueda: "",
        resul: <ProjectItem proyectoParam={item} />

      });
    }
    else {

      this.mensaje("No se encontraron proyectos con el nombre " + this.state.busqueda);

      this.setState({
        busqueda: "",
        resul: null
      });
    }
}
}

mensaje(msm) {

    alert(msm);
  }

updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value,
      resul: null
    });

    localStorage.setItem("busquedaInput", JSON.stringify(e.target.name));

  }

render(){

    return(
        <div className="ProjectBuscar py-3 container ">
        <div className= "row float-right">
         <input className="form-control col-sm-9 row  mr-4 " type="text" placeholder="Búsqueda" name="busqueda" value={this.state.busqueda} onChange={this.updateInput.bind(this)}/>
         <div className="float-rigth">
         <button onClick={this.handleBuscarProyecto.bind(this)}><i className="fas fa-search"></i></button>
         </div>
         </div>
         
            {this.state.resul}
        </div>
    );

    
    }
}



export default ProjectBuscar;