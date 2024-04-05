const mongoose = require('mongoose');
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;


mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.v3gxgby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
.then(db => console.log('Data is conected'))
.catch(err => console.log(err));