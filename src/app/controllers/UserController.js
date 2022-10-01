const User = require('../models/User');
const bcrypt = require('bcrypt');
const salt = "$2b$05$762uRTd20ZyeQnOM7S9oHO";

const createUser = async (req, res) => {
    const d = new Date();
    var { email, password } = req.body;
    let userID =  Math.floor(Math.random() * 100).toString() + d.getTime().toString();

    const hash = bcrypt.hashSync(password, salt);
    password = hash

    const newUser = {
        userID, name: "Harry", username: "tquean15012003", email, password
    }
    

    const user = new User(newUser);
    await user.save().then(() => {
         res.status().send("Account Created!")
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Sign up unsuccessfully")
    })
   
    
}

const signIn = async (req, res) => {
    const d = new Date();
    var { email, password } = req.body;

    const hash = bcrypt.hashSync(password, salt);
    password = hash

    const user = User.findOne({ 'email': email }).then(
        user => {
            if(user.password==hash){
                res.status(200).send('Sign in successfully!');
            }
            else{
                res.status(500).send('Email or password is invalid!');
            }
        }
    ).catch((err) => {
        console.log(err)
        res.status(404).send('Account do not exists');
    })

    console.log(user);
}

module.exports = { createUser, signIn };
