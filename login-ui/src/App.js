import React, {lazy, Component} from "react";
import Login from "./Login";
import {Box, Button, Grommet} from "grommet";
import {grommet} from "grommet/themes";
import "./index.css"

const BooksComponent = lazy(
    () => import('Books/BooksComponent')
);

class App extends Component {

    state = {
        isLoggedIn: false,
        username: '',
        token: ''
    };


    loginSuccess = () => {
        console.log('login success');
        this.setState({ isLoggedIn: true });
        console.log(this.state);
    }

    setCurrentUsername = (username) => {
        this.setState({username});
        console.log(`username set to: ${username}`);
        console.log(this.state);
    }

    setToken = (token) => {
        this.setState({token})
        console.log(`token set to: ${token}`);
        console.log(this.state);
    }

    logout = () => {
        const {token, username} = this.state;
        console.log('logout');
        const url_api = 'http://localhost:8092/urest/v1/logout';
        console.log(`sending request: ${url_api}`);

        console.log(token);

        fetch(url_api,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "username": username
            })
        }).then(response => response.json())
            .then(data => {
                const api_error = data.error;
                if(typeof api_error == 'undefined'){
                    console.log("Logout success.");
                    this.setState({username: ''});
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
        const {isLoggedIn, token, username} = this.state;
        let component;
        if (isLoggedIn) {
            component = (<Box className="app" style={{width: "750px", height: "auto"}}>
                <React.Suspense fallback="Loading Books">
                    <BooksComponent
                        token={token}
                        username={username}
                    />
                </React.Suspense>
                <Box style={{alignItems:"center", marginTop: "23px"}} className='logout'>
                    <Button onClick={this.logout}>Logout</Button>
                </Box>
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
