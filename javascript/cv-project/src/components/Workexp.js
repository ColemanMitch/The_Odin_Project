// Workexp.js


import './component.css';
import React, {Component} from 'react'
import Job from './Job'

class Workexp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numWorkExp: 0,
        }
        this.addWorkExp = this.addWorkExp.bind(this);
    }

        addWorkExp = () => {
            this.setState({
                numWorkExp: this.state.numWorkExp + 1,
            });
            console.log(this.state);
                
            
        }
    
        removeWorkExp = (e) => {
            //console.log(e.target.parentNode.id.slice(-1));
            e.currentTarget.parentNode.remove();
        }
    
	render () {
        const workExps = [];
        for (let i = 0; i < this.state.numWorkExp; i += 1) {
            workExps.push(<div id={"jobs-"+String(i)}><Job></Job></div>) //<button className="delete-btn" onClick={this.removeWorkExp}>X</button></div>);
            
        }

		return ( <div className="workexp">
            <h2 id="workexp-section-title">Work Experience</h2>
            <hr></hr>
            {workExps}
            <button onClick={this.addWorkExp}>Add Job</button>
		</div>
    )
    }
}

export default Workexp;