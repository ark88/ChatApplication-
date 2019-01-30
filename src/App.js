import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import fire from "./config";
import "./css/styles.css";
import ChatRoom from "./components/chatRoom";
import Home from "./components/Home";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleLogin(loginData) {
    if (!loginData.register)
      fire
        .auth()
        .signInWithEmailAndPassword(loginData.email, loginData.password)
        .catch(e => console.log(e))
        .then(user => {
          this.setState(user);
        });
    else {
      fire
        .auth()
        .createUserWithEmailAndPassword(loginData.email, loginData.password)
        .catch(e => console.log(e))
        .then(user => {
          this.setState(user);
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {this.state.user ? (
            <div className="App">
              <header className="App-header">
                <Switch>
                  <Route path="/" exact component={() => <Home />} />
                  <Route path="/Room" component={() => <ChatRoom />} />
                </Switch>
              </header>
            </div>
          ) : (
            <Login handleLogin={loginData => this.handleLogin(loginData)} />
          )}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
