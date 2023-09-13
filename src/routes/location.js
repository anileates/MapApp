const express = require("express");
const router = express.Router();
const { createLocation, getAllLocations, getOneLocation } = require("../controllers/location");
const requestValidator = require('../middlewares/requestValidator');
const {createLocationSchema} = require('../validations/locationValidations');

// create
router.post("/", requestValidator(createLocationSchema), createLocation);

// get all
router.get("/", getAllLocations);

// get one detailed
router.get("/:id", getOneLocation);

// update
router.put("/:id", (req, res) => {});

// get shortest path
router.get("/shortest-path", (req, res) => {});

module.exports = router;
