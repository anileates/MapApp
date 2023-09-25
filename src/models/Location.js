const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  markerColor: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false
  },
});

LocationSchema.pre("save", function (next) {
  // Coordinates array must have 2 elements
  if (this.location.coordinates.length !== 2)
    return next(new Error("Coordinates array must have 2 elements"));

  // Longitude must be between -180 and 180, latitude must be between -90 and 90
  const longitude = this.location.coordinates[0];
  const latitude = this.location.coordinates[1];

  if (
    !(
      longitude >= -180 &&
      longitude <= 180 &&
      latitude >= -90 &&
      latitude <= 90
    )
  ) {
    return next(
      new Error(
        "Longitude must be between -180 and 180, latitude must be between -90 and 90"
      )
    );
  }

  next();
});

module.exports = mongoose.model("Location", LocationSchema);
