const router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
var error = 'Internal server error';
const accessTokenSecret = "myunaccessibletokensecret"

router.route('/authenticate').post((req,res) => {
    console.log('Request received for path /authenticate');
    const username = req.body.username;
    const password = req.body.password;
    console.log('body username: ' + username);
    console.log('body password: ' + password);

    fs.readFile('./users.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log('Error encountered while reading file users.json: ' + err);
            res.json(error);
        } else {
            let users;
            try {
                users = JSON.parse(jsonString);
            } catch (err) {
                console.log('Error parsing JSON: ' + err);
                res.json({error});
            }
            let found_password = '';
            users.forEach( (entry) => {
                if(username === entry.username){
                    found_password = entry.password;
                    console.log(`Username ${entry.username} found`);
                }
            });
            if(found_password === ''){
                console.log('User not found.');
                error = "User not found";
                res.json({error});
            } else if(found_password === password){
                console.log('Password is correct.');
                const accessToken = jwt.sign({ username, password }, accessTokenSecret, {expiresIn: '1800s'});
                res.json({accessToken});
            } else{
                console.log('Wrong password.');
                error = 'Wrong password';
                res.json({error});
            }
        }
    });
});

module.exports = router;
