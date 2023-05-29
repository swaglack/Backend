const { StatusCodes } = require("http-status-codes");

class ErrorUtils {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static handleUnexpectedError(res) {
    return this.handleErrorResponse(
      res,
      StatusCodes.NOT_ACCEPTABLE,
      "기타 오류"
    );
  }

  static handleInternalServerError(res) {
    return this.handleErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "서버에서 예상치 못한 오류가 발생했습니다."
    );
  }

  handleErrorResponse(statusCode, message) {
    return res.status(statusCode).json({
      message: message,
    });
  }
}

module.exports = ErrorUtils;
