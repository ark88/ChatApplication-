import React, { Component } from "react";

export class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  sendMessage = e => {
    e.preventDefault();
    this.setState({ message: "" });
    this.props.sendMessage(this.state.message);
  };
  render() {
    return (
      <form className="input z-depth-2" onSubmit={this.sendMessage}>
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            value={this.state.message}
            onChange={e => {
              this.setState({ message: e.target.value });
            }}
            id="message"
            className="validate"
          />
          <label htmlFor="message">Message</label>
        </div>
        </div>
      </form>
    );
  }
}

export default ChatInput;
