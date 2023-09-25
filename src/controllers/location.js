const expressAsyncHandler = require("express-async-handler");
const Location = require("../models/Location");

const createLocation = expressAsyncHandler(async (req, res) => {
  const { name, longitude, latitude, markerColor } = req.body;

  const location = await Location.create({
    name,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    markerColor,
  });

  return res.status(200).json({
    message: "Location created successfully",
    location,
  });
});

const getAllLocations = expressAsyncHandler(async (req, res, next) => {
  const locations = await Location.find({ isDeleted: false });

  return res.status(200).json(locations);
});

const getOneLocation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const location = await Location.findOne({ _id: id, isDeleted: false });

  if (!location) {
    return res.status(404).json({
      message: "Location not found",
    });
  }

  return res.status(200).json(location);
});

const softDeleteLocation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const location = await Location.findOne({ _id: id, isDeleted: false });

  if (!location) {
    return res.status(404).json({
      message: "Location not found",
    });
  }

  location.isDeleted = true;
  await location.save();

  return res.status(200).json({
    message: "Location deleted successfully"
  });
});

const findShortestPath = expressAsyncHandler(async (req, res, next) => {
  const { longitude, latitude } = req.query;

  const locations = await Location.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    },
    isDeleted: false,
  });

  return res.status(200).json(locations);
});

module.exports = {
  createLocation,
  getAllLocations,
  getOneLocation,
  softDeleteLocation,
  findShortestPath,
};
