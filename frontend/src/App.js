import React, { Component } from 'react';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			menu: getJson(),
			isLoades: false

		}
	}

	componentDidMount() {
		fetch('/tag')
		.then(res=>res.json())
		.then((result)=>{
			this.setState({
				tags:result,
				isLoades:true,
			})
		});
	}

	renderLi(cont) {
		return (
			<MenuElement value={cont} />
			);
		}

	handleClick(i, e) {

		e.preventDefault();
		const menu = this.state.menu.slice();

		var color = this.state.menu[i].color;
		if (color === 'red') {
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
						onClick={(e) => this.handleClick(i,e)}
						>

					</MenuElement>
				);
			}
			const isLoades = this.state.isLoades;

			console.log(this.state.isLoades);
			const tags = this.state.tags;

			if(isLoades) {
				return (
					<ul>
						{indents}
						{tags.map(one=>(
							<div key={one.tag_id}>
							<div  key={one.tag_id}>{one.name}</div>
							</div>
													)
												)
											}
	  			</ul>
				);
			} else {
				return (
					<div>Loading...</div>
				);
			}
			// console.log(tags);

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
