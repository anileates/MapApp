const Location = require("../models/Location");

const createLocation = async (req, res, next) => {
  const { name, longitude, latitude, markerColor } = req.body;

  try {
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
  } catch (error) {
    next(error);
  }
};

const getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({ isDeleted: false });

    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

const getOneLocation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const location = await Location.findOne({ _id: id, isDeleted: false });

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    return res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

const softDeleteLocation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const location = await Location.findOne({ _id: id, isDeleted: false });

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }
  
    location.isDeleted = true;
    await location.save();
  
    return res.status(200).json({
      message: "Location deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const findShortestPath = async (req, res, next) => {
  const { longitude, latitude } = req.query;

  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getOneLocation,
  softDeleteLocation,
  findShortestPath,
};
