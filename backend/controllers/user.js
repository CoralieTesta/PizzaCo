const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('dotenv').config();
const ADMINLOGIN=process.env.ADMINLOGIN
const ADMINPASSWORD=process.env.ADMINPASSWORD

exports.login = (req, res, next) => {
    bcrypt.hash(ADMINLOGIN, 10)
      .then(hash => {
        bcrypt.compare(req.body.login, hash)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                bcrypt.hash(ADMINPASSWORD, 10)
                    .then(hash2 => {
                        bcrypt.compare(req.body.password, hash2)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                            }
                            res.status(200).json({
                                login: ADMINLOGIN,
                                token: jwt.sign(
                                    { login: ADMINLOGIN },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '1h' }//à changer
                                )
                            });
                        })
                    .catch(error => res.status(500).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
            })
}