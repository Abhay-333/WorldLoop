import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(
    message,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class UnauthorizeError extends AppError {
  constructor(message = "Unauthorize user", details = null) {
    super(message, StatusCodes.UNAUTHORIZED, details);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", details = null) {
    super(message, StatusCodes.BAD_REQUEST, details);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details = null) {
    super(message, StatusCodes.NOT_FOUND, details);
    Error.captureStackTrace?.(this, this.constructor);
  }
}
