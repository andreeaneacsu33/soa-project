const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./src/routes');

// express
const { json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 8090;
app.use(json());
app.use(urlencoded({extended: false}));

const corsOptions = {
  origin: '*',
  optionsSuccessCors: 200
};
app.use(cors(corsOptions));
app.use(router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening to port ${port}`);
});
