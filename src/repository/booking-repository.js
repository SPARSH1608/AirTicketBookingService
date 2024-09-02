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
        'RepositoryError',
        'Cant create Booking',
        'There was some issue while creating booking please try again later',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
      // await Booking.update(data, {
      //   where: {
      //     id: bookingId,
      //   },
      // });
      // return true;
    } catch (error) {
      throw new AppError(
        'RepositoryError',
        'Cant update Booking',
        'There was some issue while updating booking please try again later',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
