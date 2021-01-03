const { compareSync } = require('bcryptjs');
const express = require('express');
const feedbackModel = require('../models/feedback.model');
const router = express.Router();

router.post('/add', async function(req,res){
    const feedback = {
        StudentID: req.session.authUser.UserID,
        CourseID: req.body.CourseID,
        Star: req.body.Star,
        Comment: req.body.Review
    }
    
    await feedbackModel.add(feedback);  
    
    res.redirect(req.headers.referer);
});

router.post('/edit', async function(req,res){
    const feedback = await feedbackModel.singleByID(req.body.FeedbackID);
    feedback.Star = req.body.Star;
    feedback.Comment = req.body.Review;
    await feedbackModel.patch(feedback);      
    res.redirect(req.headers.referer);
});

router.get('/delete', async function(req,res){
    await feedbackModel.del(req.query.id);
    res.redirect(req.headers.referer);
});

module.exports = router;