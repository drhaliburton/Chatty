import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageArray = this.props.messages;
      return (
        <main className="messages">
          {messageArray.map((message) => {
            if (message.type === 'postNotification') {
              return <Notification notification={message.content} key={message.id}/>;
            } else {
              return <Message content={message.content} username={message.username} key={message.id}/>;
            }
          })
        }
      </main>
    );
  }
}

export default MessageList;