let router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');
const Blog = require("../db").import('../models/blog');

/* ***************************
***** CREATE HOME ENTRY *****
*************************** */
router.post('/create', validateSession, (req, res) => {
    const blogEntryByUser = {
        title: req.body.title,
        content: req.body.content,
        keywords: req.body.keywords
    };

    Blog.create(blogEntryByUser)
        .then(blog => res.status(200).json(blog))
        .catch((err) => res.status(500).json({error:err}));

});

/* **************************
***** RETURN HOME ENTRY *****
************************** */
router.get('/blog', (req, res) => {
    const query = {
        where: {
            id: req.user.id
        }
    };

    Blog.findAll(query)
    .then((blog) => res.status(200).json(blog))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***************************
*****  RETURN HOME ENTRY *****
***** BY INDIVIDUAL USER *****
*************************** */
router.get('/blog/:id', (req, res) => {
    const query = {
        where: {
            id: req.params.id
        }
    };

    Blog.findUserEntry(query)
    .then((blog) => res.status(200).json(blog))
    .catch((err) => res.status(500).json({error: err}));

});

/* **************************
***** DELETE HOME ENTRY *****
************************** */
router.delete('/blog/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id
        }
    };

    Blog.destroy(query)
    .then(() => res.status(200).json({ message: "Blog removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});


/* **************************
***** UPDATE HOME ENTRY *****
************************** */
router.put('/:id', validateSession, (req, res) => {
    const updateBlog = { 
        title: req.body.title,
        content: req.body.content,
        keywords: req.body.keywords
    };

    const query = {
        where: {
            id: req.params.id
        }
    };

    Blog.update(updateBlog, query)
        .then((blog) => res.status(200).json(blog))
        .catch((err) => res.status(500).json({ error: err.message}));
});

module.exports = router;