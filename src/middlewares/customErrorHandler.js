const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    
    if (err.name === 'CastError') {
        customError.message = 'Please provide a valid id';
        customError.status = 400;
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || 'Internal Server Error'
    });
}

module.exports = customErrorHandler;