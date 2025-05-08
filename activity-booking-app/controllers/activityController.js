const { Activity } = require('../DB/schema');
// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

//
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
        console.error(err.message);
    if (err.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new activit
exports.createActivity = async (req, res) => {
  const { title, description, location, dateTime } = req.body;

  try {
      const newActivity = new Activity({
      title,
        description,
      location,
       dateTime
    });

    const activity = await newActivity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};