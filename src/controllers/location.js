const expressAsyncHandler = require("express-async-handler");
const Location = require("../models/Location");

const createLocation = expressAsyncHandler(async (req, res) => {
  const { name, longitude, latitude, markerColor } = req.body;

  const location = await Location.create({
    name,
    location: {
      locationType: "Point",
      coordinates: [longitude, latitude],
    },
    markerColor,
  });

  return res.status(200).json({
    message: "Location created successfully",
    location
  });
});

const getAllLocations = expressAsyncHandler(async (req, res, next) => {
  const locations = await Location.find({});

  return res.status(200).json(locations);
});

const getOneLocation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const location = await Location.findById(id);

  if (!location) {
    return res.status(404).json({
      message: "Location not found",
    });
  }

  return res.status(200).json(location);
});

module.exports = {
    createLocation,
    getAllLocations,
    getOneLocation
}