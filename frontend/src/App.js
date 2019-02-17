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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faChartLine} from '@fortawesome/free-solid-svg-icons'
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import Media from "react-media";

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
		const mobSize = 599
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
							<div className='col-sm-12'>
								<div className="fixed-top clearfix menu">
									<div className='float-left'>
										<ul className="nav nav-pills">
											<li>
												<Media query={{maxWidth: mobSize}}>
													{matches =>
														matches ? (
															<a href='#' className='menu-button'
															   onClick={this.toggleMenu}>
																<FontAwesomeIcon icon={faBars}/>
															</a>
														) : (
															<span></span>
														)
													}
												</Media>
											</li>
											<li className="nav-item">
												<RouteNavItem href="/article" className='active' title='Article'>
													<FontAwesomeIcon icon={faNewspaper}/>
													<Media query={{maxWidth: mobSize}}>
														{matches =>
															matches ? (
																<span></span>
															) : (
																<span className='menuTitle'>Article</span>
															)
														}
													</Media>
												</RouteNavItem>
											</li>
											<li className="nav-item">
												<RouteNavItem href="/personal" title='Link'>
													<FontAwesomeIcon icon={faExternalLinkAlt}/>
													<Media query={{maxWidth: mobSize}}>
														{matches =>
															matches ? (
																<span></span>
															) : (
																<span className='menuTitle'>Link</span>
															)
														}
													</Media>
												</RouteNavItem>
											</li>
											<li className="nav-item">
												<RouteNavItem href="/gym" title='Chart'>
													<FontAwesomeIcon icon={faChartLine}/>
													<Media query={{maxWidth: mobSize}}>
														{matches =>
															matches ? (
																<span></span>
															) : (
																<span className='menuTitle'>Chart</span>
															)
														}
													</Media>
												</RouteNavItem>
											</li>
										</ul>
									</div>
									<div className='float-right'>
										<ul className="nav">
											<li className='nav-item'>
												<div
													className={this.state.loaderActive ? 'loader' : 'loader hide'}></div>
											</li>
											<li className="nav-item">
												<LoginInfo
													addAccessToken={this.addAccessToken}
													image={this.state.userImage}
												/>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
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
									   <Personal accessToken={this.state.accessToken}/>)}
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
