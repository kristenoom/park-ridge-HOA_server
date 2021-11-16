let router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const validateSession = require("../middleware/validate-session");

/* REGISTER A NEW USER */
router.post("/create", (req, res) => {
    User.create({
        username: req.body.user.username,
        name: req.body.user.name,
        address: req.body.user.address,
        passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
        IsAdmin: req.body.user.IsAdmin
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })
            res.status(200).json({
                user: user,
                message: "User successfully created",
                sessionToken: token
            });
    })
    .catch(err => res.status(500).json({error: err}))
});

/* USER LOGIN */
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        //  address: req.body.address,
        },
      })
        .then(function loginSuccess(user) {
          if (user) {
            bcrypt.compare(req.body.passwordhash, user.passwordhash, function (
              err,
              matches
            ) {
              if (matches) {
                  let token = jwt.sign({
                      id: user.id,
                      username: user.username
                  }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24,
                  }
                );
                res.status(200).json({
                  user: user,
                  message: "User Successfully Logged in!",
                  sessionToken: token,
                });
              } else {
                res.status(502).send({ error: "Login Failed" });
              }
            });
          } else {
            res.status(500).json({ error: "User does not exist" });
          }
        })
        .catch((err) => res.status(500).json({ error: err }));
    });

router.get("/get", (req, res) => {
    User.findAll({
        where: { id: 1 },
        include: ["home"]
    }).then(
        findOneSuccess = (data) => {
        res.json(data);
    },
    findOneError = (err) => {
    res.send(500, err.message);
    }
    );
});

module.exports = router;