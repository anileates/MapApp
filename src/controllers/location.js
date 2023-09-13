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

module.exports = {
    createLocation
}