let router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');
const Arc = require("../db").import('../models/arc');

/* ***************************
***** CREATE ARC ENTRY *****
*************************** */
router.post('/create', validateSession, (req, res) => {
    const arcEntryByUser = {
        address: req.body.address, 
        name: req.body.name,
        document1: req.body.document1,
        document2: req.body.document2
    };

    Arc.create(arcEntryByUser)
        .then(arc => res.status(200).json(arc))
        .catch((err) => res.status(500).json({error:err}));
});

/* **************************
***** RETURN arc ENTRY *****
************************** */
router.get('/arc', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.user.id,
            address: req.body.address
        }
    };

    Arc.findAll(query)
    .then((arc) => res.status(200).json(arc))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
*****  RETURN arc ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/arc/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id,
            address: req.body.address
        }
    };

    Arc.findUserEntry(query)
    .then((arc) => res.status(200).json(arc))
    .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;