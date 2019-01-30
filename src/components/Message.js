import React, { Component } from "react";

export class Message extends Component {
  renderDate = () => {
    const postedDate = new Date(this.props.message.date.toMillis());

    return `${postedDate.getDate()}-${postedDate.getMonth() +
      1}-${postedDate.getFullYear()} | ${postedDate.getHours()}:${
      postedDate.getMinutes() < 10 ? "0" : ""
    }${postedDate.getMinutes()}`;
  };

  render() {
    return (
        <div className="col s12 l4">
          <div className={`message ${this.props.message.author === this.props.uid ? 'right' : 'left'}`}>
            <p className="message-content">{this.props.message.message}</p>
          </div>
        </div>
    );
  }
}

export default Message;
