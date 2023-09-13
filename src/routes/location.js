const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const expressAsyncHandler = require("express-async-handler");

// create
router.post("/", (req, res) => {});

// get all
router.get("/", (req, res) => {});

// get one detailed
router.get("/:id", (req, res) => {});

// update
router.put("/:id", (req, res) => {});

// get shortest path
router.get("/shortest-path", (req, res) => {});

module.exports = router;
