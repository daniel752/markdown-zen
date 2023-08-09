import { StatusCodes } from "http-status-codes";

const ErrorHandlerMiddleware = (err, req, res, next) =>
{
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'somthing went wrong, try again later';
    res.status(statusCode).json({ msg: msg });
};

export default ErrorHandlerMiddleware;