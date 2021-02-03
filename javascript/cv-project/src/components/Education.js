import React, {Component} from 'react'
import School from './School';



import './component.css';


class Education extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numEducations: 0,
        }
        this.addEducation = this.addEducation.bind(this);
    }

    addEducation = () => {
        this.setState({
            numEducations: this.state.numEducations + 1,
        });
        console.log(this.state);
            
        
    }

    removeEducation = (e) => {
        //console.log(e.target.parentNode.id.slice(-1));
        e.currentTarget.parentNode.remove();
    }


    render() {
        const educations = [];
        for (let i = 0; i < this.state.numEducations; i += 1) {
            educations.push(<div id={"school-"+String(i)}><School></School></div>);//<button className="delete-btn"  onClick={this.removeEducation}>X</button></div>);
            
        }

        return (
            <div className="education">
                <h2 id="education-section-title">Education</h2>
                <hr></hr>
                {educations}
                <button onClick={this.addEducation}>Add Education</button>
            </div>
        )
    }
}

export default Education;