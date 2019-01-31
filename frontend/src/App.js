import React, {Component} from 'react';
import Article from './Article/Article';
import ArticleEdit from './Article/ArticleEdit';
import Personal from './Personal/Personal';
import Login from './Login';
import Gym from './Gym';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RouteNavItem from "./RouteNavItem";
import {HttpClient} from "./HttpClient";
import LoginInfo from './LoginInfo.js';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'article',
			accessToken: null,
			userImage: null,
			loading: null
		};
		this.addAccessToken = this.addAccessToken.bind(this);
	}

	addAccessToken(accessToken, imageUrl) {
		this.setState({accessToken: accessToken, userImage: imageUrl});
	}

	render() {
		const accessToken = this.state.accessToken === null ? null : this.state.accessToken;
		if (accessToken === null) {
			return (
				<Login addAccessToken={this.addAccessToken} accessToken={this.state.accessToken}/>
			);
		} else {
			const client = new HttpClient(this.state.accessToken)
			console.log(client)
			return (
				<BrowserRouter>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-sm-10'>
								<ul className='nav nav-tabs'>
									<li className='nav-item'>
										<RouteNavItem href="/article" title='Article'>Article</RouteNavItem>
									</li>
									<li className='nav-item'>
										<RouteNavItem href="/personal" title="Personal">Personal</RouteNavItem>
									</li>
									<li className='nav-item'>
										<RouteNavItem href="/gym" title="Gym">Gym</RouteNavItem>
									</li>
								</ul>
							</div>
							<div className='col-sm-2'>
								<LoginInfo addAccessToken={this.addAccessToken} image={this.state.userImage}/>
							</div>
						</div>

						<Switch>
							<Route path='/article/edit/:id'
								   render={(props) => (
									   <ArticleEdit articleId={props.match.params.id} client={client}/>)}/>
							<Route path='/article/:number'
								   render={(props) => (
									   <Article articleId={props.match.params.number} client={client}/>)}/>
							<Route path='/article'
								   render={(props) => (<Article client={client}/>)}
							/>
							<Route path='/gym' component={Gym}/>
							<Route path='/personal'
								   render={(props) => (<Personal accessToken={this.state.accessToken}/>)}
							/>
							<Route path='/login' render={(props) => (
								<Login addAccessToken={this.addAccessToken} accessToken={this.state.accessToken}/>)}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
		}
		;
	}
}

export default App;
