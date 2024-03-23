const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://a1119150044:Vicky190501d@cluster0.v3gxgby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(db => console.log('Data is conected'))
.catch(err => console.log(err));