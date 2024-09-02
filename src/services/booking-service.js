const axios = require('axios');
const { BookingRepository } = require('../repository/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');
class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
  }
  //flightId,userId,seats
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOfFlight = flightData.price;

      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          'Something went wrong in booking process',
          'Insufficient number of seats'
        );
      }
      const totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.BookingRepository.create(bookingPayload);

      const updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      await axios.patch(updateFlightUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.BookingRepository.update(booking.id, {
        status: 'Booked',
      });
      return finalBooking;
    } catch (error) {
      if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
        throw error;
      }
      throw new ServiceError();
    }
  }
}
module.exports = BookingService;
