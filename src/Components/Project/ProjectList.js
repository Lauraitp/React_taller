import React, { Component } from 'react'
import firebase from '../Firebase'
import ProjectItem from './ProjectItem'
 
class ProjectList extends Component {

constructor(){
    super();
    this.state={
        projects:[],
		database: firebase.firestore()
    }
	const settings = { timestampsInSnapshots: true }
    this.state.database.settings(settings);
  }

componentWillMount(){
  
this.refresh();

}

  refresh(){

     var proyectos=[];
    this.state.database.collection("proyectos").get().then( (querySnapShot) =>
  
  {
    querySnapShot.forEach( doc => {
      proyectos.push(doc.data());
       console.log(doc.id, "=>" , doc.data());

    });
    this.setState({projects:proyectos});
  });
  }

render(){

    return(
        <div className="ProjectList py-5 container">
        <div id="list-example" className="list-group">
 
 {this.state.projects.map(item =>{
   return(
    <ul className="list-group-item list-group-item-action" >

    <li key={item.nombre} >
   {item.nombre}
  
   </li> 
    </ul> 
   );
 }
 
 )}
 

</div>
 {this.state.estadoProyConst}
        </div>
       
    );
    }
}



export default ProjectList;