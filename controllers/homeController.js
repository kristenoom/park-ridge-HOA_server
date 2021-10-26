let router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const { Home } = require("../models")

/* ***************************
***** CREATE HOME ENTRY *****
*************************** */
router.post('/create', validateSession, (req, res) => {
    console.log(req.user.id);
    const homeEntry = {
        address: req.body.address, 
        squareFootage: req.body.squareFootage,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        garage: req.body.garage,
        acreage: req.body.acreage
    };

    Home.create(homeEntry)
        .then((home) => res.status(200).json(home))
        .catch((err) => res.status(500).json({error:err}));

});

/* **************************
***** RETURN HOME ENTRY *****
************************** */
router.get('/home', (req, res) => { //we do not need to validateSession as we want all users to be able to access details
    console.log(`GET` + req.user.id);
    const query = {
        where: {
            id: req.user.id,
        },
        include: "user"
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