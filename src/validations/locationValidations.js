const zod = require("zod");

const createLocationSchema = zod.object({
  name: zod
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters"),
  longitude: zod
    .number({ required_error: "Longitude is required"})
    .min(-180, "Longitude must be at least -180")
    .max(180, "Longitude must be at most 180"),
  latitude: zod
    .number({ required_error: "Latitude is required"})
    .min(-90, "Latitude must be at least -90")
    .max(90, "Latitude must be at most 90"),
  markerColor: zod.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});

module.exports = { createLocationSchema };
