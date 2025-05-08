const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController')
const auth = require('../middleware/auth');
const { validateZod, activitySchema } = require('../middleware/zodSchemas')

router.get('/', activityController.getAllActivities)

router.get('/:id', activityController.getActivityById);


router.post('/', [auth, validateZod(activitySchema)], activityController.createActivity);


module.exports = router;