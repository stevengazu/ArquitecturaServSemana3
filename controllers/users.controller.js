const User = require('../models/user.model');
const tokens = require("../config/tokens.config");

module.exports.create = (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
 };

 module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
          if(user){
            user.checkPassword(req.body.password).then((match) => {
                if(match){
                   const token = tokens.createSession(user);
                   res.header("Set-Cookie", `session_token=${token};`).json({message: "success"});
                
                }else{
                    res.status(401).json({message: "Invalid email or password"});
                }
            });
          }else{
              res.status(401).json({message: "Invalid email or password"}); 
          }
        });
 };