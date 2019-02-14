import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'

class TextAreaMD extends Component {
	constructor(props) {
		super(props)

		this.state =
			{
				content: props.content
			}

		this.handleParentChange = props.onChange
		this.height = props.height
		this.handleChange = this.handleChange.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
		this.scrollBy = React.createRef()
		this.markDownScroll = React.createRef()
	}

	handleChange(e) {
		const content = e.target.value
		this.setState({content: content})
		this.handleParentChange(content)
	}

	handleScroll(e) {
		this.markDownScroll.current.scrollTop = this.scrollBy.current.scrollTop;
	}

	render() {
		let heightTextarea = {'height': this.height + 'px'};
		// let heightTextarea = {'height': (this.state.height - 180) + 'px'};
		return (
			<div className='row'>
				<div className='col-sm-6'>
					<div className='form-group'>
				<textarea
					ref={this.scrollBy}
					onChange={this.handleChange}
					onScroll={this.handleScroll}
					style={heightTextarea}
					className='form-control'
					value={this.state.content}
				/>
					</div>
				</div>
				<div className='col-sm-6'>
					<div
						className='border markdownScroll'
						ref={this.markDownScroll}
						style={heightTextarea}
					>
						<ReactMarkdown source={this.state.content}/>
					</div>
				</div>
			</div>
		)
	}
}

export default TextAreaMD
