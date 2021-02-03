// School.js

import React, {Component} from 'react'
import './component.css';
//import Editablefield from './Editablefield'


class School extends Component{

    constructor(props) {
        super(props)
        
        this.state = {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            text: props.value,
            isEditing: false,
            tag: props.tag,
            default: props.value
        }
    }

    handleClick = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
        console.log(this)
    }

    handleSchoolChange = (e) => {
        this.setState({school: e.target.value});
    }
     
    handleDegreeChange = (e) => {
        this.setState({degree: e.target.value});
    }
    handleStartDateChange = (e) => {
        this.setState({startDate: e.target.value});
    }
    handleEndDateChange = (e) => {
        this.setState({endDate: e.target.value});
    }
    handleDescChange = (e) => {
        this.setState({desc: e.target.value});
    }

    removeEducation = (e) =>  {
        //console.log(e.target.parentNode.id.slice(-1));
        e.currentTarget.parentNode.parentNode.remove();
    }


    render() {
        console.log(this.props)
        console.log(this.state)
    return (
        !this.state.isEditing ?
		<div className="school">
            <form class="school-entry">
            <label for="school">School: </label>
            <input type="text" onChange={this.handleSchoolChange} placeholder="School" value={this.state.school}></input><br></br>
            <label for="degree">Degree: </label>
            <input type="text" onChange={this.handleDegreeChange}placeholder="Degree" value={this.state.degree}></input><br></br>
            <label for="start-date">Start Date: </label>
            <input type="text" onChange={this.handleStartDateChange} placeholder="MM/YYYY" value={this.state.startDate}></input> <br></br>
            <label for="end-date">End Date: </label>
            <input type="text" onChange={this.handleEndDateChange} placeholder="MM/YYYY" value={this.state.endDate}></input><br></br>
            <input type="textarea" onChange={this.handleDescChange} placeholder="Enter a few sentences describing your education here" value={this.state.desc}></input>
            <button type="button" onClick={this.handleClick}>Save</button><button  type="button" className="delete-btn" onClick={this.removeEducation}>X</button>
            <br></br>
            </form>
        </div>
         : <div className="school-saved" onClick={this.handleClick}>
         <p  class="school-name">{this.state.school}</p>
         <p>{this.state.degree}</p>
         <p>{this.state.startDate} - {this.state.endDate}</p><br></br>
         <div class="break"></div>
         <p class="desc">{this.state.desc}</p>
         <br></br>
         </div>
        )
    }
}

export default School;