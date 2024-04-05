require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/api', require('./routes/index'));

app.listen(3000);
console.log('listening on port', 3000);
