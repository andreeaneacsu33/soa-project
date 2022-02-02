const fetch = require('node-fetch');
const router = require('express').Router();

//test send mail
let client = require('@sendgrid/mail');
client.setApiKey('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');

let error = 'Internal server error';
let loggedInUsers = [];
let token = '';

router.route('/login').post((req,res)=>{
    console.log('-----------Request received for path /login POST');
    const { username, password } = req.body;
    console.log(`Username:  ${username}`);
    console.log(`Password:  ${password}`);

    if(loggedInUsers.findIndex((elem) => elem === username) > -1){
        error = 'User already logged in';
        console.log(error);
        res.json({error});
    } else {
        const url_user = 'http://authentication-manager:8090/user/authenticate';
        console.log(`sending request: ${url_user}`);

        fetch(url_user,{
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
                    loggedInUsers.push(username);
                    token = data.accessToken;
                    console.log(token);
                    console.log(`Logged in users: ${loggedInUsers}`);
                    // socketIO.emit('numberOfUsers',loggedInUsers.length);
                    res.json({username, token});
                } else {
                    console.log(api_error);
                    error = data.error;
                    res.json({error});
                }
            }).catch((err) => {
            console.log(`Error API call: ${err}`);
            res.json({error});
        });
    }
});

router.route('/logout').post((req,res) => {
    console.log('-------------Request received for path /logout POST');
    const { username } = req.body;
    console.log(`body username:  ${username}`);
    if(loggedInUsers.find(element => element === username)){
        token = '';
        loggedInUsers.pop(username);
        console.log(`User ${loggedInUsers} successfully logged out`)
    }
    console.log(`Logged in users: ${loggedInUsers}`);
    // socketIO.emit('numberOfUsers', loggedInUsers.length);
    res.json({username});

});

module.exports = router;

