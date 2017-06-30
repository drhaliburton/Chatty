import React, {Component} from 'react';

class ChatBar extends Component {

  messageEnterPress(event){
    if (event.key === 'Enter') {
      this.props.addNewMsgFn(document.querySelector('.chatbar-username').value, event.target.value);
    }
  }

  usernameEnterPress(event){
    var newUsername =  document.querySelector('.chatbar-username').value;
    if (event.key === 'Enter') {
      if (newUsername !== this.props.currentuser) {
        var content = '📌 ' + this.props.currentuser + ' has changed their name to ' + newUsername;
        this.props.addNewNotifFun(newUsername, content);
      }
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentuser} onKeyDown={this.usernameEnterPress.bind(this)}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.messageEnterPress.bind(this)}/> 
      </footer>
    );
  }
}

export default ChatBar;