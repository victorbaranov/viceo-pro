const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth')

require('../models/idea');
const Idea = mongoose.model('ideas');

router.get('/edit/:_id', ensureAuthenticated, (req, res) => {

    Idea.findOne({
        _id: req.params._id
    })
        .then(idea => {
            if (idea.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', {
                    idea: idea
                });
            }
        });
});

router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .lean()
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        })
});


router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});




router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add a title' })
    };

    if (!req.body.details) {
        errors.push({ text: 'Please add a details' })
    };

    if (errors.length > 0) {
        res.render('/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });

    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };

        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash("success_msg", "Video Idea Added");
                res.redirect('/ideas');
            })
    }
});

router.put('/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            // new values
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(idea => {
                    req.flash("success_msg", "Video Idea updated");
                    res.redirect('/ideas');
                })
        });
});

router.delete('/:_id', ensureAuthenticated, (req, res) => {
    Idea.deleteOne({
        _id: req.params._id
    })
        .then(() => {

            req.flash("success_msg", "Video Idea Remove");
            res.redirect('/ideas');

        })
});

module.exports = router;