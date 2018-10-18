import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Components/Login/Login'
import Routes from './Components/Routes/Routes'
import { BrowserRouter } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
      <div className="App ">
        <Routes/>
      </div>
       </BrowserRouter>
    );
  }
}

export default App;
