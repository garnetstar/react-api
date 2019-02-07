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
			loading: null,
			loaderActive: false,
			userImage: null,
			accessToken: null,
		};
		this.addAccessToken = this.addAccessToken.bind(this);
		this.loader = this.loader.bind(this);
		this.state.accessToken = localStorage.getItem('token');
		this.state.userImage = localStorage.getItem('image');
	}

	addAccessToken(accessToken, imageUrl) {
		if (accessToken === null) {
			localStorage.removeItem('token')
			localStorage.removeItem('image')
		} else {
			localStorage.setItem('token', accessToken)
			localStorage.setItem('image', imageUrl)
		}
		this.setState({accessToken: accessToken, userImage: imageUrl});
	}

	loader(active) {
		console.log(active)
		this.setState({loaderActive: active})
	}

	render() {
		if (this.state.accessToken === null) {
			return (
				<Login addAccessToken={this.addAccessToken} accessToken={this.state.accessToken}/>
			);
		} else {
			const client = new HttpClient(this.state.accessToken, this.loader)
			return (
				<BrowserRouter>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-sm-9'>
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
							<div className='col-sm-1'>
								<div>
									<div className={this.state.loaderActive ? 'loader' : 'loader hide'}></div>
								</div>
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
							<Route path='/gym'
								   render={(props) => (
									   <Gym client={client}/>
								   )}
							/>
							<Route path='/personal'
								   render={(props) => (<Personal accessToken={this.state.accessToken}/>)}
							/>
							<Route path='/login' render={(props) => (
								<Login addAccessToken={this.addAccessToken}/>)}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
		}
		;
	}
}

export default App;
