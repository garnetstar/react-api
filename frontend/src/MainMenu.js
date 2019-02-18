import React, {Component} from 'react'
import LoginInfo from './LoginInfo.js'
import RouteNavItem from "./RouteNavItem"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faChartLine} from '@fortawesome/free-solid-svg-icons'
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import Media from "react-media";

class MainMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loaderActive: props.loaderActive,
			userImage: props.userImage
		}

		this.toggleMenu = props.toggleMenu
		this.addAccessToken = props.addAccessToken
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loaderActive !== this.state.loaderActive) {
			this.setState({loaderActive: nextProps.loaderActive})
		}
		if (nextProps.userImage !== this.state.userImage) {
			this.setState({userImage: nextProps.userImage})
		}

		console.log(['loader', this.state.loaderActive])
	}

	render() {
		const mobSize = 500
		return (
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
		)
	}
}

export default MainMenu