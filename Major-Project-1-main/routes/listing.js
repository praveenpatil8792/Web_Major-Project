const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js"); 
const upload = multer({storage });

router.route("/")
.get(wrapAsync(controllerListing.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.createListing));

//New Route
router.get("/new",isLoggedIn,controllerListing.renderNewForm);

router.route("/:id")
.get(wrapAsync(controllerListing.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.updateLisiting))
.delete(isLoggedIn,
        isOwner,
        wrapAsync(controllerListing.destroyListing));

//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(controllerListing.renderEditForm));

module.exports = router;