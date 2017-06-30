import React, {Component} from 'react';

class Navbar extends Component {

  render() {
    return (
      <div className="navbar">
        <h1 className="navbar-brand">Chatty</h1>
        <span className="user-count">{this.props.userCount} users online.</span>
      </div>
    );
  }
}
export default Navbar;
