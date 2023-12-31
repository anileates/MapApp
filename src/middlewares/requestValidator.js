
const requestValidator = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = requestValidator;