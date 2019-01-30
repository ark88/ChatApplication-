import React, { Component } from "react";
import { Link } from "react-router-dom";
import fire from "../config";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();
    this.state = { rooms: [] };
  }

  componentWillMount = () => {
    this.db
      .collection("Rooms")
      .get()
      .then(docs => {
        let rooms = [];
        docs.forEach(e => {
          rooms.push({ name: e.data().roomName, id: e.id });
        });
        this.setState({ rooms });
      });
  };
  render() {
    let renderRooms = this.state.rooms.map(e => (
      <Link key={e.id} className="collection-item" to={`/Room?r=${e.id}`}>
        {e.name}
      </Link>
    ));
    return (
      <div className="container">
        <h1>Chatrooms</h1>
        <div className="row">
          <div className="col s12">
            <div className="collection ">{renderRooms}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
