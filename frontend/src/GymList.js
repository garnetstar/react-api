import React, {Component} from 'react';

class GymList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteHandler: null,
			onDeleteClick: props.onDeleteClick,
			ajaxHelper: null,
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	render() {
		if (this.props.error) {
			return (<b>{this.props.error}</b>);
		} else if (this.props.items === null) {
			return (<div>Loading....</div>);
		} else {
			return (

				this.listItems()
			);
		}
	}

	// handleClick(e) {
	// 	e.preventDefault;
	// 	onClick={props.onClick}
	// 	window.confirm('really delete ?');
	// }
	handleDelete(e, id) {
		e.preventDefault();
		if (window.confirm('really delete ?')) {
			this.state.onDeleteClick(e, id);
		}
	}

	listItems() {
		const items = this.props.items;
		return (
			<table className='table table-bordered'>
				<tbody>
				{items.map((item, i) => <tr key={item.gym_id}>
						<td>{item.value}</td>
						<td>{this.convertTimestamp(item.timestamp)}</td>
						<td><a onClick={(e) => this.handleDelete(e, item.gym_id)}>delete</a></td>
					</tr>
				)}
				</tbody>
			</table>
		);
	}

	convertTimestamp(stamp) {
		var date = new Date(stamp * 1000);
		var month = parseInt(date.getMonth(), 10);
		month++;
		return date.getDate() + '.' + month + '.' + date.getFullYear();
	}
}

export default GymList;
