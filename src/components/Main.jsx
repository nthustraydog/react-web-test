import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect 
} from 'react-router-dom';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import WeatherView from 'components/WeatherView.jsx';

import {getWeatherInfo} from 'api/weatherFetch.js';

import 'decorations/Main.css';

export default class Main extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);

		this.state = {
            unit: 'metric',
            location: 'Hsinchu'
        };

		this.handleUnitChange = this.handleUnitChange.bind(this);
	}

	componentDidMount() {

	}

	render() {
		const {unit, location} = this.state;

		return (
			<Router>
				<div className = "main">
					<Navbar color="dark" light expand="md" sticky={'top'}>
						<Link className = "main-nav-brand" to='/'>Weather Today</Link>
					</Navbar>
					
					<WeatherView unit = {unit} location = {location}/>
				</div>
			</Router>			
		);
	}

	handleUnitChange(unit) {
		this.setState({unit: unit});
	}
}
