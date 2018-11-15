import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			menu: getJson(),
		}
	}

	renderLi(cont) {
		return (
				<MenuElement value={cont} />
				);
	}

	handleClick(i) {

		const menu = this.state.menu.slice();


		var color = this.state.menu[i].color;
		if (color == 'red') {
			menu[i].color = 'blue';
		} else {
			menu[i].color = 'red';

		}
		this.setState({
			menu: menu
		});
		console.log(this.state.menu);
	}

	render() {
		var indents = [];
		for (let i = 0; i < this.state.menu.length; i++) {
			indents.push(
					<MenuElement
					
						color={this.state.menu[i].color}
						key={i}
						value={this.state.menu[i].cont}
						onClick={() => this.handleClick(i)}
						>
					</MenuElement>
					);
		}

		return (
				<ul>
					{indents}
				
				</ul>
				);
	}
}


function MenuElement(props) {
	const color = props.color;
	return (
			<li>
				<a
			
					style={{color: props.color}}
					onClick={props.onClick}
					href="#"
					>
					{props.value}
			
				</a>
			</li>
						);
			}

	function getJson() {
		const json = '[{"cont":"one","color":"red"},{"cont":"two","color":"red"},{"cont":"three","color":"blue"}]';
		return JSON.parse(json);
	}

	export default App;
