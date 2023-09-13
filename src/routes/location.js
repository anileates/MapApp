const express = require("express");
const router = express.Router();
const { createLocation } = require("../controllers/location");

// create
router.post("/", createLocation);

// get all
router.get("/", getAllLocations);

// get one detailed
router.get("/:id", (req, res) => {});

// update
router.put("/:id", (req, res) => {});

// get shortest path
router.get("/shortest-path", (req, res) => {});

module.exports = router;
