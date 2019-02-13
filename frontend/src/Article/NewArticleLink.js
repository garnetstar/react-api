import React, {Component} from 'react';

class NewArticleLink extends Component {

	constructor(props) {
		super(props)
		this.handleNewArticle = props.handleNewArticle
	}

	render() {
		return (
			<ul className='nav'>
				<li className='nav-item'>
					<a className='nav-link' onClick={this.handleNewArticle} href='#'>New article</a>
				</li>
			</ul>
		);
	}
}

export default NewArticleLink