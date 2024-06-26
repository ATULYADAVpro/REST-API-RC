import { DEBUG_MODE } from "../configs/index.js";
import CustomErrorHandler from "../utils/services/CustomErrorHandler.js";
import Joi from 'joi'
const { ValidationError } = Joi;
const errorHandler = async (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: "Internal Server Error",
        ...(DEBUG_MODE === "true" && { originalError: err.message })
    }
    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data)
}

export default errorHandler