import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.message || 'something went wrong, please try again!'
  res.status(statusCode).json({msg});
}

export default errorHandlerMiddleware