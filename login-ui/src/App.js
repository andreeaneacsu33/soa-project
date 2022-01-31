import React, {Component} from "react";
import Login from "./Login";

class App extends Component{

  state = {
    isLoggedIn: false
  };
  username = '';

  loginSuccess = () => {
    console.log('login success');
    this.setState({ isLoggedIn: true });
    console.log(this.state);
  }

  setCurrentUsername = (username) => {
    this.username = username;
    console.log(`username set to: ${this.username}`);
    console.log(this.state);
  }

  render() {
    return (
        <Login/>
    )
  }
}

export default App;
