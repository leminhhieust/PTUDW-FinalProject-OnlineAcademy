const { compareSync } = require('bcryptjs');
const express = require('express');
const coursesModel = require('../models/courses.model');
const feedbackModel = require('../models/feedback.model');
const router = express.Router();

router.post('/add', async function(req,res){
    const feedback = {
        StudentID: req.session.authUser.UserID,
        CourseID: +req.body.CourseID,
        Star: +req.body.Star,
        Comment: req.body.Review
    }
    const allFb = await feedbackModel.allByID(+req.body.CourseID);
    var sum = +req.body.Star;
    for(i = 0; i < allFb.length; ++i){
        sum += allFb[i].Star;
    }

    const course_count = await coursesModel.singleByCount(req.body.CourseID);
    course_count.AvgStar = (sum / (allFb.length + 1)).toFixed(1);
    course_count.Ratings += 1;
    await coursesModel.UpdateStarRating(course_count);
    
    await feedbackModel.add(feedback);  
    
    res.redirect(req.headers.referer);
});

router.post('/edit', async function(req,res){
    const feedback = await feedbackModel.singleByID(req.body.FeedbackID);

    const allFb = await feedbackModel.allByID(feedback.CourseID);
    var sum = 0 - feedback.Star + (+req.body.Star);
    for(i = 0; i < allFb.length; ++i){
        sum += allFb[i].Star;
    }

    const course_count = await coursesModel.singleByCount(feedback.CourseID);
    course_count.AvgStar = (sum / (allFb.length)).toFixed(1);
    await coursesModel.UpdateStarRating(course_count);

    feedback.Star = req.body.Star;
    feedback.Comment = req.body.Review;

    await feedbackModel.patch(feedback);      
    res.redirect(req.headers.referer);
});

router.get('/delete', async function(req,res){
    const feedback = await feedbackModel.singleByID(req.query.id);
    const allFb = await feedbackModel.allByID(feedback.CourseID);
    var sum = 0 - feedback.Star;
    for(i = 0; i < allFb.length; ++i){
        sum += allFb[i].Star;
    }

    const course_count = await coursesModel.singleByCount(feedback.CourseID);
    if(sum === 0) {
        course_count.AvgStar = 0;
    } else {
        course_count.AvgStar = (sum / (allFb.length - 1)).toFixed(1);
    }
    course_count.Ratings -= 1;

    await coursesModel.UpdateStarRating(course_count);

    await feedbackModel.del(req.query.id);
    res.redirect(req.headers.referer);
});

module.exports = router;