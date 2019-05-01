import React, {Component} from 'react';
import Article from './Article/Article';
import ArticleEdit from './Article/ArticleEdit';
import Personal from './Personal/Personal';
import Login from './Login';
import Gym from './Gym';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {HttpClient} from "./HttpClient";
import MainMenu from './MainMenu'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'article',
			loading: null,
			loaderActive: false,
			userImage: null,
			accessToken: null,
			openMenu: false
		};
		this.addAccessToken = this.addAccessToken.bind(this);
		this.loader = this.loader.bind(this);
		this.state.accessToken = localStorage.getItem('token');
		this.state.userImage = localStorage.getItem('image')
		this.toggleMenu = this.toggleMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
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
		this.setState({loaderActive: active})
	}

	toggleMenu() {
		this.state.openMenu === true ? (
			this.setState({openMenu: false})
		) : (
			this.setState({openMenu: true})
		)
	}

	closeMenu() {
		this.setState({openMenu: false})
	}

	render() {
		if (this.state.accessToken === null) {
			return (
				<Login addAccessToken={this.addAccessToken} accessToken={this.state.accessToken}/>
			);
		} else {
			const mobSize = 500
			const client = new HttpClient(this.state.accessToken, this.loader)
			return (
				<BrowserRouter>
					<div className='container-fluid'>
						<MainMenu
							toggleMenu={this.toggleMenu}
							addAccessToken={this.addAccessToken}
							userImage={this.state.userImage}
							loaderActive={this.state.loaderActive}
						/>
						<Switch>
							<Route path='/article/edit/:id'
								   render={(props) => (
									   <ArticleEdit articleId={props.match.params.id}
													client={client}
													mobSize={mobSize}

									   />)}/>
							<Route path='/article/:number'
								   render={(props) => (
									   <Article articleId={props.match.params.number}
												client={client}
												mobSize={mobSize}
												openMenu={this.state.openMenu}
												closeMenu={this.closeMenu}
									   />)}/>
							<Route path='/article'
								   render={(props) => (
									   <Article
										   client={client}
										   mobSize={mobSize}
										   openMenu={this.state.openMenu}
										   closeMenu={this.closeMenu}
									   />)}
							/>
							<Route path='/gym'
								   render={(props) => (
									   <Gym client={client}/>
								   )}
							/>
							<Route path='/personal'
								   render={(props) => (
									   <Personal accessToken={this.state.accessToken} client={client}/>)}
							/>
							<Route path='/login' render={(props) => (
								<Login addAccessToken={this.addAccessToken}/>)}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
		}
	}
}

export default App;
