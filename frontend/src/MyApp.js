import React, { Component } from 'react';
import Article from './Article/Article';
import ArticleEdit from './Article/ArticleEdit';
import Personal from './Personal/Personal';
import Gym from './Gym';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouteNavItem from "./RouteNavItem";


// import { Button, Grid, Row, Col, Panel, FormGroup, FormControl, ControlLabel, Nav, NavItem } from 'react-bootstrap';
// import ReactDOM from 'react-dom';
// import MarkdownRenderer from 'react-markdown-renderer';

class MyApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'article'
		};
	}

	render() {
		return(
	<BrowserRouter>
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-sm-12'>
					<ul className='nav nav-tabs' >
						<li className='nav-item'>
							<RouteNavItem  href="/article" title='Article'>Article</RouteNavItem>
						</li>
						<li className='nav-item'>
							<RouteNavItem  href="/personal" title="Personal">Personal</RouteNavItem>
						</li>
						<li className='nav-item'>
							<RouteNavItem href="/gym" title="Gym">Gym</RouteNavItem>
						</li>
					</ul>
				</div>
			</div>

				<Switch>
				 {/* <Route path='/article/:number' render={(props) => (<ArticleDetail articleId={props.match.params.number} />)}/> */}
				 <Route path='/article/edit/:id' render={(props) => (<ArticleEdit articleId={props.match.params.id} />)} />
				 <Route path='/article/:number' render={(props) => (<Article articleId={props.match.params.number} />)}/>
					<Route path='/article' component={Article}/>
					<Route path='/gym' component={Gym}/>
				  <Route path='/personal' component={Personal}/>
				</Switch>
		</div>
 </BrowserRouter>
		);
	}
}

export default MyApp;
