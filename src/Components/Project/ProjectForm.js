import React, { Component } from 'react';
import firebase from '../Firebase'
import { Redirect } from 'react-router-dom'
class ProjectForm extends Component {


constructor() {
    super();
    this.state = {

      nombreProyecto: "",
      descripcionProyecto: "",
      responsableProyecto: "",
      fechaIniProyecto: "",
      fechaFinProyecto: "",
      estadoProyecto: "",
      proyectoNuevo:[],
      redir:null,
      proy:null,

      db: firebase.firestore()
    }

    const settings = { timestampsInSnapshots: true }
    this.state.db.settings(settings);
  }


  componentWillMount() {
    this.refresh();
  }

  refresh() {

      var proy = [];
      var tarNotDupli=[];

      Array.prototype.unique=function(a){
        return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
      });

    this.state.db.collection("proyectos").get().then((querySnapShot) => {

      querySnapShot.forEach(doc => {

        proy.push(doc.data());

      });
      this.setState({proyectoNuevo:proy});  

    });
  }

 
  Guardar(e){


this.refresh();
    var repetido=false;
      this.state.proyectoNuevo.forEach(item=>{
        if(this.state.nombreProyecto===item.name&&repetido===false){
           repetido=true;      
           console.log("entra")
    }
      });

    if(repetido===false){
      console.log("entra if")

    if(this.state.nombreProyecto !== "" && this.state.descripcionProyecto !== "" && this.state.responsableProyecto !== "" && this.state.fechaIniProyecto !== "" && this.state.fechaFinProyecto !== "" && this.state.estadoProyecto !== "" ){     
      
    this.state.db.collection("proyectos").add({

      nombre: this.state.nombreProyecto,
      descripcion: this.state.descripcionProyecto,
      responsable: this.state.responsableProyecto,
      fecha_inicio: this.state.fechaIniProyecto,
      fecha_fin: this.state.fechaFinProyecto,
      estado: this.state.estadoProyecto,
      tareas:null
      

      
    });
    localStorage.setItem("nomProyecto", this.state.nombreProyecto)

    this.msj("Se agregó nuevo proyecto correctamente")

		this.setState({

      nombreProyecto: "",
      descripcionProyecto: "",
      responsableProyecto: "",
      fechaIniProyecto:null,
      fechaFinProyecto: null,
      estadoProyecto: "Seleccione...",
 redir: <Redirect to='/tareas'>
        </Redirect>
      
    }); 

    
    
		}else{
      this.msj("Todos los campos son obligatorios")
    }
    }else{
       this.msj("Ya existe un proyecto con ese nombre")
       repetido=false;
    }
 
	}


  updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  msj(msm) {

    alert(msm);
  }

  render() {
    return (
      
      <div className="ProjectForm container col-10  ">
      
      <label  className="col-12"><h3>Crear un nuevo proyecto</h3></label>
     <form >
<div className="form-group row">
  <label  className="col-4 col-form-label">Nombre</label>
 
    <input  type="text"  id="example-text-input" name="nombreProyecto" value={this.state.nombreProyecto}
              onChange={this.updateInput.bind(this)}/>
  
</div>
<div className="form-group row">
  <label  className="col-4 col-form-label">Descripción</label>

    <input  type="search"  id="example-search-input" name="descripcionProyecto" value={this.state.descripcionProyecto}
              onChange={this.updateInput.bind(this)} />
 
</div>
<div className="form-group row">
  <label  className="col-4 col-form-label">Responsable</label>
    <input type="search"  id="example-search-input"  name="responsableProyecto" value={this.state.responsableProyecto}
              onChange={this.updateInput.bind(this)}/>
  
</div>

<div className="form-group row">
  <label className="col-4 col-form-label">Fecha de Inicio</label>
    <input  type="date" value="2011-08-19" id="example-date-input" name="fechaIniProyecto" value={this.state.fechaIniProyecto}
              onChange={this.updateInput.bind(this)} />
</div>

<div className="form-group row">
  <label  className="custom col-4 ">Fecha de Entrega</label>
    <input  type="date" value="2012-05-19" id="example-date-input" name="fechaFinProyecto" value={this.state.fechaFinProyecto}
              onChange={this.updateInput.bind(this)}/>
</div>

<div className="form-group row">
<label className="col-4" >Estado</label>
  <select className="custom-select col-4" id="inlineFormCustomSelect" name="estadoProyecto" value={this.state.estadoProyecto}
              onChange={this.updateInput.bind(this)}>
    <option selected>Seleccione...</option>
    <option>Terminado</option>
    <option>En proceso</option>
   
  </select>
  </div>

  <button onClick={this.Guardar.bind(this)}><i className="fas fa-plus"></i>Crear Proyecto</button>
      <br/>
<div className="py-3">


 <label  className="col-12"><h5>Una vez creado el proyecto, te redireccionará para crear tareas</h5></label>
      </div>
      </form>
{this.state.redir}
      </div>
      
    );
  }
}

export default ProjectForm;
