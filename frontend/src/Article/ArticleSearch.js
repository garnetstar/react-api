import React, {Component} from 'react';

class ArticleSearch extends Component {

	constructor(props) {
		super(props);
		this.handleArticleSearch = props.handleArticleSearch
		this.refSearchInput = props.refSearchInput
	}

	render() {
		return (
			<div className='form-group'>
				<input
					ref={this.refSearchInput}
					type='text'
					className='form-control'
					onChange={this.handleArticleSearch}
				/>
			</div>
		)
	}
}

export default ArticleSearch