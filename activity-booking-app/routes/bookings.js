const express = require('express');
const router = express.Router()
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth')
const { validateZod, bookingSchema } = require('../middleware/zodSchemas');

router.post('/', [auth, validateZod(bookingSchema)], bookingController.bookActivity);

router.get('/', auth, bookingController.getUserBookings);

router.delete('/:id', auth, bookingController.cancelBooking);

module.exports = router;