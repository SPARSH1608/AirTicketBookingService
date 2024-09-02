const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models/index');
const { validationError, AppError } = require('../utils/errors/index');

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == 'SequelizeValidationsError') {
        throw new validationError(error);
      }
      throw new AppError(
        'Repository Error',
        'Cant create Booking',
        'There was some issue while creating booking please try again later',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async update(data) {
    try {
    } catch (error) {}
  }
}

module.exports = BookingRepository;
