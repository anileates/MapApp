const express = require("express");
const router = express.Router();
const { createLocation, getAllLocations, getOneLocation, softDeleteLocation, findShortestPath } = require("../controllers/location");
const requestValidator = require('../middlewares/requestValidator');
const {createLocationSchema} = require('../validations/locationValidations');

// get shortest path
router.get("/get-path", findShortestPath);

// create
router.post("/", requestValidator(createLocationSchema), createLocation);

// get all
router.get("/", getAllLocations);

// get one detailed
router.get("/:id", getOneLocation);

// delete
router.delete("/:id", softDeleteLocation);

module.exports = router;