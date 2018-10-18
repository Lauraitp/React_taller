import React, { Component } from 'react';
import ProjectList from './ProjectList'
import firebase from '../Firebase'

class ProjectItem extends Component {

constructor() {
    super();
    this.state = {

      nombreProyConst: "",
      estadoProyConst:null,
      proyectosConst:[],
      proy:null,
      redir:null,
      db: firebase.firestore()
      
    }

    const settings = { timestampsInSnapshots: true }
    this.state.db.settings(settings);
  }

   componentWillMount() {
      this.refresh()
this.verificarProyectoEnRojo()
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

 verificarProyectoEnRojo(){
    
    var date = new Date()
    var dateFormat=this.convertDateFormat(date.toLocaleDateString()).toString()

    if(this.props.proyectoParam.estado !== "TERMINADO" && 
     this.props.proyectoParam.fecha_fin < dateFormat){

      this.setState({
        estadoProyConst:   <li className="list-group-item barra-busqueda rojo">
        {"Nombre: " + this.props.proyectoParam.nombre} <hr/>
        
        {"Fecha de Inicio: " +this.props.proyectoParam.fecha_inicio} <hr/> 
        
        {"Fecha de Entrega: " +this.props.proyectoParam.fecha_fin} <hr/> 
        
        {"Estado: " +this.props.proyectoParam.estado}
       
        
       
      </li>
      });
    }
    else{

      this.setState({
        estadoProyConst:<li className="list-group-item barra-busqueda">

        {"Nombre: " + this.props.proyectoParam.nombre} <hr/>
        
        {"Fecha de Inicio: " +this.props.proyectoParam.fecha_inicio} <hr/> 
        
        {"Fecha de Entrega: " +this.props.proyectoParam.fecha_fin} <hr/> 
        
        {"Estado: " +this.props.proyectoParam.estado}
        
       
        
        
      </li>
      });
    }
  }

  convertDateFormat(string) {
    var info = string.split('/');
    return info[2] + '-' + info[1] + '-' + info[0];
  }

  render() {
    return (
      
      <div className="col-8 ">
      {this.state.estadoProyConst}
  
      </div>
      
    );
  }
}

export default ProjectItem;
 