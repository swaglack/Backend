const { StatusCodes } = require("http-status-codes");

class ErrorUtils {
  static handleErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({
      message: message,
    });
  }

  static handleInternalServerError(res) {
    return this.handleErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "서버에서 예상치 못한 오류가 발생했습니다."
    );
  }
}

module.exports = ErrorUtils;