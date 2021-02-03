// Personal.js

import './Personal.css';

import React from "react";
import Editablefield from './Editablefield'


const Personal = () => {
	return (
		<div className="personal">
			<div className="personal-info">
				<Editablefield value='FirstName LastName' tag='h1' />
			</div>

			<div className="contact">
                <Editablefield value='+1 (234) 567-8910' tag='p' />
				<Editablefield value='youremail@domain.com' tag='p' />
			</div>
		</div>
	)
}

export default Personal;