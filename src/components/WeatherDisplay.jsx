import React from 'react';
import PropTypes from 'prop-types';

import 'decorations/WeatherDisplay.css';

export default class WeatherDisplay extends React.Component {
	static propTypes = {
		location: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        masking: PropTypes.bool        
	};

	constructor(props) {
		super(props);
	}

	render() {
		const maskMode = this.props.masking ? 'masking' : '';
		const UnitString = this.props.unit === 'metric' ? 'C' : 'F';
		const {unit, location} = this.props;

		return (
			<div className = {`weather-display ${maskMode}`}>
				<img src = {`images/w-${this.props.group}.png`} />
				<p className='description'>
					{`${location}: ${this.props.description}`}
				</p>
                <h1 className='temp'>
                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                    &nbsp;{UnitString}
                </h1>
			</div>
		);
	}
}
