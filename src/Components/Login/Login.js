import React, { Component } from 'react'
import firebase from '../Firebase'

 
class Login extends Component {

constructor(){
    super();
    localStorage.setItem("session","")
    this.state={
        user:[],
        password:"",
        nickname:"",
		
		database: firebase.firestore()
    }
	const settings = { timestampsInSnapshots: true }
    this.state.database.settings(settings);
  }

 componentWillMount() {
    this.refresh();
  }

  refresh() {

    this.state.database.collection("users").get().then((querySnapShot) => {

      var usersObject = [];
      querySnapShot.forEach(item => {usersObject.push(item.data());
      });

      this.setState({

        user: usersObject
      });

    });


  }


handleOpenApp(e){
	 this.state.user.forEach(item => {

      if (this.state.nickname === item.name && this.state.password === item.password) {
         localStorage.setItem("session", this.state.nickname)
       this.props.history.push('/projects');

      }
      else {
		
        this.props.history.push('/login');
      }
    });

}

updateInput(e) {

    this.setState({
      [e.target.name]: e.target.value
    });

  }



  render() {
    return (
		<div className="Login container">


        <form className="FormLogin container">
		<div className="formimg">
		<img className="imagenLogin" src="https://spotlightmedia.com/wp-content/uploads/2015/07/ClientLogincol2.png"/>
		</div>

        <div className="form-group row">
    		
    		<div className="col-sm-4">
      			<input type="user" className="form-control"  placeholder="Nickname" name="nickname" value={this.state.nickname}
              onChange={this.updateInput.bind(this)} />
    		</div>
  		</div>
  		<div className="form-group row">
    		
    		<div className="col-sm-4">
      			<input type="password" className="form-control"  placeholder="Password" name="password" value={this.state.password}
              onChange={this.updateInput.bind(this)}/>
    		</div>
  		</div>
		  <div className="form-group1 row">
		  <div className="col-sm-8">
		  <button type="button" className="btn btn-primary" onClick={this.handleOpenApp.bind(this)}>Login</button>
		  </div>
		  </div>
  		</form>
        </div>
    );
  }
}

export default Login;