const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  console.log(err);

    let customError = {
        msg: err.message || "Something went wrong, try again",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    };

    // if (err instanceof CustomAPIError) {
    //   return res.status(err.statusCode).json({ msg: err.message })
    // }

    if (err.name === "ValidationError") {
        // console.log(Object.values(err.errors));
        customError.msg = Object.values(err.errors).map((error) => error.message).join(", ");
        customError.statusCode = 400;
    }

    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} property, please enter another value.`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware
