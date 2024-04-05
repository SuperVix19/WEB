const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minLength: 10,
    },
    role:{
        type: String,
        required: true,
        enum: ['admin', 'cliente'],
    },
    password: {
        type: String,
        required: true,
        minLength: 10
    },
}, 
{
    timestamps: true 
}
);

module.exports = model('User', userSchema);

