import { StatusCodes } from "http-status-codes";
export class SuccessResponse {
  constructor(message = "Success", data = null, statusCode = StatusCodes.OK) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
