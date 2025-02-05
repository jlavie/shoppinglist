const User = require('../models/user');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'process.env.JWT_SECRET';

exports.register = (req, res) => {
    const user = new User({...req.body});
    user.save()
        .then(user => {res.status(200).json({user})})
        .catch(error => {res.status(400).json({error})});
}

exports.login = (req, res) => {
    const {email, password} = req.body;
    console.log(email)
    console.log(password)
    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        bcrypt.compare(password, user.password)
            .then(isValid => {
                console.log(isValid)
                if(!isValid) {
                    return res.status(401).json({ message: 'invalid password' });
                }

                const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'});
                res.status(200).json({token, user: {id: user._id, username: user.username, email: user.email}})        
            })
    })
    .catch(error => res.status(500).json(error));
}

exports.verifyToken = (req, res) => {
    console.log(req.header('Authorization'));
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error: 'Access refused'});

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        res.status(200).json({ message: 'Acces granted', user: req.user })
    } catch(err) {
        res.status(400).json({error: 'Invalid token'});
    }
}

exports.loginOld = (req, res) => {
    console.log('save me')
    delete req.body._id;

    const user = new User({...req.body})
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
            res.status(200).json({data})
        })
        .catch(error => {
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
