const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('palabraSecreta');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => res.send('Hello World'));

router.post('/register', async (req, res) =>{
    const { name, email, phoneNumber, role, password } = req.body;

    const checkUser = await User.findOne({email});

    const encryptedString = cryptr.encrypt(password);

    if(checkUser) return res.status(401).send("Correo ya esta registrado");

    const newUser = new User({name, email, phoneNumber, role, password: encryptedString, resetCode: null});
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

router.post('/request-password-reset', async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('El usuario no esta registrado');

    const resetCode = Math.floor(1000000 + Math.random() * 9000000);
    
    user.resetCode = resetCode;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        to: email,
        subject: 'Restablecer contraseña',
        text: `
            Hola ${user.name},
            Recibimos una solicitud para restablecer la contraseña de tu cuenta.
            Tu código de verificación es: ${resetCode}
            Si no solicitaste un cambio de contraseña, ignora este correo.
        `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo');
        } else {
            return res.status(200).send('Correo enviado correctamente');
        }
    });
});

router.post('/recover-password' , async (req, res) =>{
    const {email, resetCode, newPassword} = req.body;
    const user = await User.findOne({email});

    if (!user) return res.status(401).send('El usuario no esta registrado');

    if (resetCode != user.resetCode) return res.status(401).send('Código de verificación incorrecto');

    const encryptedString = cryptr.encrypt(newPassword);
    user.password = encryptedString;
    user.resetCode = null;

    await user.save();

    return res.status(200).send('Contraseña actualizada correctamente');
});

module.exports = router;