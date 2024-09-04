
# Booking Service
## Introduction
The Booking Service manages flight bookings, including booking creation, cancellation, and payment processing. It ensures that bookings are handled accurately and efficiently.

# Installation
```bash

npm install express body-parser nodemon dotenv sequelize sequelize-cli mysql2
```
## Setup
Database Configuration: Configure the database in config/config.json.
## Sequelize Setup:
```Initialize Sequelize:
 npx sequelize init
```
```Create Models:
 npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum
```
```Run Migrations:
 npx sequelize db:migrate
```
# Routes
## Booking Routes:
POST /bookings: Create a new booking.
## Validation
The service ensures that all bookings are validated against flight availability and user authentication.
## Notes
Payment Handling is currently implemented as a dummy service but can be extended with 3rd party payment gateways.
