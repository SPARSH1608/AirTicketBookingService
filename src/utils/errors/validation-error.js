const { StatusCodes } = require('http-status-codes');
class validationError extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    this.name = 'ValidationError';
    this.message = 'Not Able to validate the data sent in the request';
    this.explanation = explanation;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = validationError;
