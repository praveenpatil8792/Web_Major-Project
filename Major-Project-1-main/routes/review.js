const express = require("express");
const router = express.Router({ mergeParams:true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const controllerReview = require("../controllers/review.js");


//Post Review Route
router.post("/", 
    isLoggedIn,
    validateReview,
    wrapAsync(controllerReview.createReview));

 // Delete Review Route
 router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,controllerReview.destroyReview);
 
 module.exports = router;