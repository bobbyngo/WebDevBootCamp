const express = require('express');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
//const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//************** CAMPGROUND ROUTES **************

router
    .route('/')
    //Home route
    .get(catchAsync(campgrounds.index))
    //Specific camp route
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.createCampground)
    );

//Create new Route
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
    .route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    //Edit route
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.updateCampground)
    )
    //Delete route
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//Edit route
router.get(
    '/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
