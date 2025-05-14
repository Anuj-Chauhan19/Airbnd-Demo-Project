const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/things");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

const listingController = require("../controllers/listings.js");


// New route

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
  );


router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
     upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  )
  .get( wrapAsync(listingController.showListing));

router.get(
  "/:id/edit",isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
