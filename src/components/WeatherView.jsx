import React from 'react';
import PropTypes from 'prop-types';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';

import {getWeatherInfo} from 'api/weatherFetch.js';
import 'decorations/WeatherView.css';

export default class WeatherView extends React.Component {
	static propTypes = {		
		unit: PropTypes.string,
		location: PropTypes.string
	};

	static getInitWeatherState() {
		return {
            code: -1,
            group: 'drizzle',
            description: 'N/A',
            temp: NaN
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			...WeatherView.getInitWeatherState(),
			masking: false
		};

		this.getWeather = this.getWeather.bind(this);
	}

	componentDidMount() {
		const {location, unit} = this.props;

		this.getWeather(location, unit);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    getWeather(location, unit) {
        this.setState({
            masking: true,
        }, () => { // called back after setState completes
            getWeatherInfo(location, unit).then(weather => {
                this.setState({
                    ...weather
                });
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...WeatherView.getInitWeatherState()
                });
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

	render() {
		const {unit, location} = this.props;
		const {group, city, masking} = this.state;

		document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

		return (
			<div className = "weather-container">
				<div className = "weather">
					<WeatherDisplay {...this.state} unit = {unit} location = {location}/>
					<WeatherForm />
				</div>
			</div>
		);
	}
}
