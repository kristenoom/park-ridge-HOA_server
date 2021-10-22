const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

/* REGISTER A NEW USER */
router.post("/create", async function (req, res) {
  try{
      User.create({
          username: req.body.user.username,
          passwordHash: bcrypt.hashSync(req.body.user.password, 13)
      })
        .then(
            function createSuccess(user) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: user,
                    message: "User successfully created",
                    sessionToken: token
                })
        }
      )
  }catch(e){
    res.status(500).json({message: e.message})
  }
 
});

/* USER LOGIN */
router.post("/login", async function (req, res) {
    try {
        User.findOne({
            where: {
                username: req.body.user.username
            }
        })
        .then(function loginSuccess(user){
            if (user){
                bcrypt.compare(
                    req.body.user.passwordHash,
                    user.passwordHash,
                    (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({id: user.id},
                            process.env.JWT_SECRET, {
                                expiresIn: 60 * 60 * 24, 
                            });
                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in!',
                            sessionToken: token,
                        });
                        } else {
                            res.status(502).send({error: 'Login failed'}) //incorrect login password.
                        }
                    }
                );
            } else {
                res.status(500).json({error: 'User does not exist.'});
            }
        })
    } catch (e) {
    res.status(500).json({message: e.message})
  }
});

module.exports = router;
