const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Cryptr = require('cryptr');
const Cryptr = new Cryptr('palabraSecreta');

router.get('/', (req, res) => res.send('Hello World'));

router.post('/register', async (req, res) =>{
    const {name, email, phoneNumber, password } = req.body;

    const checkUser = await User.findOne({email});

    const encryptedString = cryptr.encrypt(password);

    if(checkUser) return res.status(401).send("Correo ya esta registrado");

    const newUser = new User({name, email, phoneNumber, password: encryptedString});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'palabraSecreta');
    return res.status(200).json({token});
})

router.post('/signin', async (req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (!user) return res.status(401).send('El usuario no esta registrado');

    if (password != cryptr.decrypt(user.password)) return res.status(401).send('Contraseña incorrecta');

    const token = jwt.sign({_id: user._id}, 'palabraSecreta');
    return res.status(200).json({token});
})

module.exports = router;