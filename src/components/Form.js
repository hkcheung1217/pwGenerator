import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const Form = ({ label, eg, name, checked, setChange }) => {
	return (
		<div className='generator__form'>
			<label>
				{label}

				<span> {eg ? eg : ''}</span>
			</label>
			<Checkbox
				type='checkbox'
				name={name}
				checked={checked}
				onChange={event => {
					setChange(event.target.checked);
				}}
				color=''
			/>
		</div>
	);
};

export default Form;
