const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./api');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

//auth0 - secure authentication
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-uk9ozp05.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api-gateway:8094',
  issuer: 'https://dev-uk9ozp05.us.auth0.com/',
  algorithms: ['RS256']
});

// express
const { json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 8090;
app.use(json());
app.use(urlencoded({extended: false}));
app.use(jwtCheck);

const corsOptions = {
  origin: '*',
  optionsSuccessCors: 200
};
app.use(cors(corsOptions));
app.use(router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening to port ${port}`);
});
