
// Skills.js

import React, {Component} from 'react'
// import Editablefield from './Editablefield'
import './component.css';


class Skills extends Component{
    constructor(props) {
        super(props)
        this.state = {
            skills: ['skill1', 'skill2', 'skill3'],
        }
        this.addSkill = this.addSkill.bind(this);
    }

    addSkill = () => {
        let newSkill = document.getElementById('skill-entry').value;
        console.log(newSkill)
        this.setState({ skills: [...this.state.skills, newSkill] });
        console.log(this.state);
        document.getElementById('skill-entry').value = '';
    }

    enter = (e) => {
        if(e.keyCode === 13) {
            this.addSkill();
        }
    }


    removeSkill = (e) => {
        //console.log(e.target.parentNode.id.slice(-1));
        e.currentTarget.parentNode.remove();
        //console.log(e.currentTarget.parentNode)
    }

    render() {
        let skills = [];
            for (let i = 0; i < this.state.skills.length; i += 1) {
                skills.push(<div id={"skill-"+String(i)}>{this.state.skills[i]}<button class="delete-btn" onClick={this.removeSkill}>X</button></div>);
                // skills.push(<div id={"skill-"+String(i)}><Editablefield value={this.state.skills[i]} tag='p'></Editablefield><button class="delete-btn" onClick={this.removeSkill}>X</button></div>);
            }
        
        return (
            <div className="skills">
                <h2 id="skills-title">Skills</h2>
                <hr></hr>
                <div className="skills-list">
                    {skills}
                </div>
                <div class="break"></div>
                    <input type="text" placeholder="Your skill here" id="skill-entry" onKeyDown={this.enter}/>
                <button type="button" onClick={this.addSkill}>Add Skill</button>
            </div>)
    }
}

export default Skills;