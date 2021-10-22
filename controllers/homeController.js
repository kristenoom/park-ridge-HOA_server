const router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');
const Home = require("../db").import('../models/home');

/* ***************************
***** CREATE HOME ENTRY *****
*************************** */
router.post('/create', validateSession, (req, res) => {
    const homeEntryByUser = {
        address: req.body.address, 
        squareFootage: req.body.squareFootage,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        garage: req.body.garage,
        acreage: req.body.acreage
    };

    Home.create(homeEntryByUser)
        .then(home => res.status(200).json(home))
        .catch((err) => res.status(500).json({error:err}));

});

/* **************************
***** RETURN HOME ENTRY *****
************************** */
router.get('/home', (req, res) => {
    const query = {
        where: {
            id: req.user.id
        }
    };

    Home.findAll(query)
    .then((home) => res.status(200).json(home))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
*****  RETURN HOME ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/home/:id', (req, res) => {
    const query = {
        where: {
            id: req.params.id
        }
    };

    Home.findUserEntry(query)
    .then((home) => res.status(200).json(home))
    .catch((err) => res.status(500).json({error: err}));

});

/* **************************
***** DELETE HOME ENTRY *****
************************** */
router.delete('/home/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id
        }
    };

    Home.destroy(query)
    .then(() => res.status(200).json({ message: "Home removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});


/* **************************
***** UPDATE HOME ENTRY *****
************************** */
router.put('/:id', validateSession, (req, res) => {
    const updateHome = { 
        squareFootage: req.body.squareFootage,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        garage: req.body.garage,
        acreage: req.body.acreage
    };

    const query = {
        where: {
            id: req.params.id
        }
    };

    Home.update(updateHome, query)
        .then((home) => res.status(200).json(home))
        .catch((err) => res.status(500).json({ error: err.message}));
});

module.exports = router;