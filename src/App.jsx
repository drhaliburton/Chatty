import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Rebecca'},
      messages: [],
      userCount: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

  addNewMessage(username, content){
    event.preventDefault();
      const newMessage = {
      type: 'postMessage',
      username,
      content,
    };
    this.socket.send(JSON.stringify(newMessage));
    this.setState({
      currentUser: {name: username}
    });
  };

  addNewNotification(username, content){
    event.preventDefault();
      const newNotification = {
      type: 'postNotification',
      content
    };
    this.socket.send(JSON.stringify(newNotification));
    this.setState({
    currentUser: {name: username}
    });
  };

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('open', (event) => {
  });
  
    this.socket.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);

      switch(newMessage.type) {
      case "incomingMessage":
      case "incomingNotification":
        const newMessages = this.state.messages.concat(newMessage);
        this.setState({
          messages: newMessages
        });
      break;
      case "userCountChanged":
        this.setState({
           userCount: newMessage.userCount
          });
      default:
        throw new Error("Unknown event type " + message.type);
      }
    });
  }

  render() {
      console.log("Rendering <App />");
    return (
      <div>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar addNewMsgFn={this.addNewMessage} addNewNotifFun={this.addNewNotification} currentuser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
