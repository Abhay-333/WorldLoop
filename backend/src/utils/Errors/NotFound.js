import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
