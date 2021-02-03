import './App.css';
import React from "react";
import Personal from './components/Personal';
import Workexp from './components/Workexp';
import Education from './components/Education';
import Skills from './components/Skills';


const App = () => {
    return (
    <div className="App">
      <Personal ></Personal>
      <Workexp ></Workexp>
      <Education></Education>
      <Skills></Skills>
    </div>
  )
  
}



export default App;
// <Contactinfo firstName={this.state.firstName} lastName={this.state.lastName} disabled={!this.state.editModeEnabled}
// phoneNumber={this.state.phoneNumber} emailAddress={this.state.emailAddress} onClick={this.handleClick}
// ></Contactinfo>