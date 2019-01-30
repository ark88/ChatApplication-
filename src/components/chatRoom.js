import React, { Component } from "react";
import fire from "../config";
import ChatInput from "./ChatInput";
import { Link } from "react-router-dom";
import Message from "./Message";

export class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();
    this.unsubscribe = "";
    this.params = new URLSearchParams(document.location.search);
    this.state = {
      messages: [],
      limit: 10
    };
  }
  componentWillMount = () => {
    if (this.params.get("r") !== null)
      this.unsubscribe = this.db
        .collection("Rooms")
        .doc(this.params.get("r"))
        .collection("Messages")
        .orderBy("date", "desc")
        //.limit(this.state.limit)
        .onSnapshot(doc => {
          let oldMessages = [];

          doc.forEach(message => {
            oldMessages.push(message.data());
          });
          this.setState({
            messages: oldMessages
          });
        });
  };

  componentWillUnmount = () => {
    if (this.unsubscribe) this.unsubscribe();
  };

  sendMessage = message => {
    if (message !== "" && message !== null && this.params.get("r") !== null)
      this.db
        .collection("Rooms")
        .doc(this.params.get("r"))
        .collection("Messages")
        .add({
          message: message,
          date: new Date(),
          author: fire.auth().currentUser.uid
        })
        .catch(e => console.log(e));
    else alert("enter text");
  };

  render() {
    let renderMessages = this.state.messages
      .slice(0)
      .reverse()
      .map((m, i) => (
        <Message key={i} message={m} uid={fire.auth().currentUser.uid} />
      ));
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper teal">
              <ul className="left">
                <li>
                  <Link className="waves-effect waves-light btn" to="/">
                    Back<i className="material-icons left">arrow_back</i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="chat row">{renderMessages}</div>
        </div>
        <ChatInput sendMessage={message => this.sendMessage(message)} />
      </div>
    );
  }
}

export default ChatRoom;
