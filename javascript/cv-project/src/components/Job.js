// Job.js
// School.js

import React, {Component} from 'react'
import './component.css';
//import Editablefield from './Editablefield'


class Job extends Component{

    constructor(props) {
        super(props)
        
        this.state = {
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            desc: "",
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

    handleCompanyChange = (e) => {
        this.setState({company: e.target.value});
    }
     
    handlePositionChange = (e) => {
        this.setState({position: e.target.value});
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

    removeWorkExp = (e) => {
        //console.log(e.target.parentNode.id.slice(-1));
        e.currentTarget.parentNode.parentNode.remove();
    }




    render() {
        console.log(this.props)
        console.log(this.state)
    return (
        !this.state.isEditing ?
		<div className="job">
            <form class="job-entry">
            <label for="company">Company: </label>
            <input type="text" onChange={this.handleCompanyChange} placeholder="Company" value={this.state.company}></input> <br></br>
            <label for="position">Position: </label>
            <input type="text" onChange={this.handlePositionChange}placeholder="Position" value={this.state.position}></input><br></br>
            <label for="start-date">Start Date: </label>
            <input type="text" onChange={this.handleStartDateChange} placeholder="MM/YYYY" value={this.state.startDate}></input> <br></br>
            <label for="end-date">End Date: </label>
            <input type="text" onChange={this.handleEndDateChange} placeholder="MM/YYYY" value={this.state.endDate}></input><br></br>
            <input type="textarea" onChange={this.handleDescChange} placeholder="Enter a few sentences describing your role here" value={this.state.desc}></input>
            <button type="button" onClick={this.handleClick}>Save</button><button  type="button" className="delete-btn" onClick={this.removeWorkExp}>X</button>
            <br></br>
            </form>
        </div>
         : <div className="job-saved" onClick={this.handleClick}>
         <p class="company-name">{this.state.company}</p>
         <p>{this.state.position}</p>
         <p>{this.state.startDate} - {this.state.endDate}</p><br></br>
         <div class="break"></div>
         <p class="desc">{this.state.desc}</p>
         <br></br>
         </div>
        )
    }
}


export default Job;