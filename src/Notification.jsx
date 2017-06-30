import React, {Component} from 'react';

class Message extends Component {
  render() {
		return (
		<div className="message system">{this.props.notification}</div>  
		);
	}
}

export default Message;