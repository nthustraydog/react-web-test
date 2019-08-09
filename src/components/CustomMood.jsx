import React from 'react';
import PropTypes from 'prop-types';

import {
	FaBolt, // thunder
	FaTint, // drizzle
	FaCloudShowersHeavy, // rainy
	FaSnowflake, // snowy
	FaWind, // windy
	FaSun, // clear sun
	FaCloud, // clouds,
	FaQuestionCircle // default
} from 'react-icons/fa';

import 'decorations/Main.css';

export default class CustomMood extends React.Component {
	static propTypes = {
		display: PropTypes.bool
	};

	constructor(props) {
		super(props);
	}

	weatherIcon(group) 
	{
		switch(group) 
		{
			case 'Thunder':
				return <FaBolt {...this.props}/>;
			case 'Drizzle':
				return <FaTint {...this.props}/>;
			case 'Rain':
				return <FaCloudShowersHeavy {...this.props}/>;
			case 'Snow':
				return <FaSnowflake {...this.props}/>;
			case 'Windy':
				return <FaWind {...this.props}/>;
			case 'Clear':
				return <FaSun {...this.props}/>;
			case 'Clouds':
				return <FaCloud {...this.props}/>;
			default: // default return sun icon
				return <FaQuestionCircle {...this.props}/>;
		}
	}

	render() {
		const {group, display} = this.props;
		const Icon = this.weatherIcon(group);

		return (
			<React.Fragment>
				{Icon}
				{
					display? <span>&nbsp; {group} &nbsp;</span> : null
				}
			</React.Fragment>
		);
	}
}
