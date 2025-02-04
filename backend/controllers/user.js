const User = require('../models/user');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'cleSecurise';

exports.login = (req, res) => {
    console.log('save me')
    delete req.body._id;

    const user = new User({...req.body})
console.log(user)
    user.save()
        .then(user =>  {
            
            const token = jwt.sign(
                { id: user._id, username: user.username },
                 secretKey, 
                 {expiresIn: '1h'}
            );
            const data = {
                token: token,
                user : { username: user.username }
            }
            console.log(req.params)
            console.log(data)
            res.status(200).json({data})
        })
        .catch(error => {
            console.log('erreur')
            res.status(400).json({error})
        });
}

exports.logout = (req, res) => {
    // 
}

exports.findMe = (req, res) => {
    console.log('find me')
    User.findOne({_id: req.params.id})
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user)
    })
    .catch(error => res.status(400).json(error));
}
