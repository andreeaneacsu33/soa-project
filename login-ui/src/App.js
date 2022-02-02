import React, {Component} from "react";
import Login from "./Login";
import {Box, Grommet} from "grommet";
import {grommet} from "grommet/themes";
import "./index.css"

class App extends Component {

  state = {
    isLoggedIn: false
  };
  username = '';
  token = '';

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

  setToken = (token) => {
    this.token = token;
    console.log(`token set to: ${this.token}`);
    console.log(this.state);
  }

  logout() {
    console.log('logout');
    const url_api = 'http://localhost:8092/urest/v1/logout';
    console.log(`sending request: ${url_api}`);

    fetch(url_api,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token
      },
      body: JSON.stringify({
        "username": this.username
      })
    }).then(response => response.json())
        .then(data => {
          const api_error = data.error;
          if(typeof api_error == 'undefined'){
            console.log("Logout success.");
            this.username = '';
            this.setState({ isLoggedIn: false });
          } else {
            console.log(api_error);
            alert(api_error);
          }
        }).catch((err) => {
      console.log(`Error API call: ${err}`);
      alert(error);
    });
  }

  render() {
    const {isLoggedIn} = this.state;
    let component;
    if (isLoggedIn) {
      component = (<Box style={{alignItems:"center", marginTop: "23px"}} className='logout'>
        <Button onClick={this.logout}>Logout</Button>
      </Box>)
    } else {
      component = (<Login
          loginSuccess={this.loginSuccess}
          setUser={this.setCurrentUsername}
          setToken={this.setToken}
      />)
    }
    return (
        <Grommet full theme={grommet}>
          {component}
        </Grommet>
    )
  }
}

export default App;
