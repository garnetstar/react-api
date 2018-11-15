import React, { Component } from 'react';
import {Label} from 'react-bootstrap';

class One extends Component {

  constructor(props) {
		super(props);
		this.state = {
      // tags: props.tags,
      onClick: props.onClick,
			}
    }

  handleClick(i,e) {
    e.preventDefault;
    this.state.onClick(i,e);
  //  console.log(i);
  }

  render() {
      const tags = this.props.tags;
  //    console.log(tags);
      return (
        <div>{tags.map(item=>(
          <div key={item.tag_id} style={{margin:4+'px'}}>
          <a href='#' onClick={(e)=>this.handleClick(item.tag_id, e)}><Label key={item.tag_id}>{item.name}</Label></a>
          </div>
        ))}
        </div>
      );
  }
}

export default One;
