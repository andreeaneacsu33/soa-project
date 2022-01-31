import React, {Component} from "react";
import {Box, Button, Form, grommet, Grommet, Image, TextInput} from 'grommet';
import {CircleInformation, Hide, View} from 'grommet-icons';
import {deepMerge} from "grommet/utils";
import './index.css';
import background from './utils/images/background.jpg';
import logo from './utils/images/logo.png';

const error = 'Internal server error';

class Login extends Component {
    state = {
        username: '',
        password: '',
        message: null,
        reveal: false,
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        console.log(`Submit ${username} ${password}`);
        const user = {
            username,
            password
        };
        // localStorage.setItem('USERNAME', username);
        this.login(user);
    };

    login(user) {
        const  { username, password } = user;

        if (username === '' || password === ''){
            this.setState({message: 'Invalid data.'});
        } else {
            // perform fetch for login
            const url_api = 'http://localhost:8092/urest/v1/access/login';
            console.log(`Sending request: ${url_api}`);

            fetch(url_api,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).then(response => response.json())
                .then(data => {
                    const api_error = data.error;
                    if(typeof api_error == 'undefined'){
                        console.log("Password is correct.");
                        this.setUser(username);
                        this.loginSuccess();
                    } else {
                        console.log(api_error);
                        alert(api_error);
                    }
                }).catch((err) => {
                console.log(`Error API call: ${err}`);
                alert(error);
            });
        }
    }

    setReveal = (value) => {
        this.setState({reveal: value});
    };

    render() {
        const {reveal} = this.state;
        return (
            <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
                    (<Box><Image className='alignMiddle' src={background}
                            style={{opacity: "0.5", width: '100%', height: "100%"}}/><Box width='100%' height='100%' alignContent='end'>
                        <Box className='loginForm'>
                            <Image className='logo' src={logo}/>
                            <Form onSubmit={this.onSubmit}>
                                <Box align='center'>
                                    <h1>Connect</h1>
                                    <span>Access my account</span>
                                </Box>
                                <Box align='center' margin='medium'>
                                    <Box
                                        className='neutral'
                                        width="medium"
                                        direction="row"
                                        margin="small"
                                        align="center"
                                        round="xsmall"
                                        border
                                    >
                                        <TextInput
                                            name='email'
                                            id='email'
                                            plain
                                            placeholder='Username'
                                            type='text'
                                            onChange={this.onChange}
                                        />
                                    </Box>
                                    <Box
                                        className='neutral'
                                        style={{overflow: 'hidden'}}
                                        width="medium"
                                        direction="row"
                                        margin="small"
                                        align="center"
                                        round="xsmall"
                                        border
                                    >
                                        <TextInput
                                            name='password'
                                            id='password'
                                            plain
                                            type={reveal ? 'text' : 'password'}
                                            placeholder='Password'
                                            onChange={this.onChange}
                                        />
                                        <Button
                                            icon={reveal ? <View size="medium"/> : <Hide size="medium"/>}
                                            onClick={() => this.setReveal(!reveal)}
                                        />
                                    </Box>
                                    {this.state.message && (
                                        <Box style={{alignSelf: 'start', flexDirection: 'row', display: 'flex'}}>
                                            <CircleInformation className='infoIcon'/>
                                            <span
                                                style={{color: '#d50000', fontSize: '13px'}}>{this.state.message}</span>
                                        </Box>
                                    )}
                                    <Box align="center">
                                        <Button
                                            className='submitButton' type='submit'>Login</Button>
                                    </Box>
                                </Box>
                            </Form>
                        </Box>
                    </Box></Box>)}
            </Grommet>
        )
    }
}

const customFormFieldTheme = {
    global: {
        font: {
            size: "16px"
        }
    },
    box: {
        alignItems: 'center'
    },
    formField: {
        label: {
            size: "xsmall",
            margin: {vertical: "0", bottom: "small", horizontal: "0"},
            weight: 600
        },
        border: false,
        margin: 0,
        width: 400
    }
};

export default Login;
