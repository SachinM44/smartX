const { z } = require('zod');
//registerr
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please include a valid email" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

//login 
const loginSchema = z.object({
  email: z.string().email({ message: "Please include a valid email" }),
  password: z.string().min(1, { message: "Password is required" })
});

//activity
const activitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  dateTime: z.string().datetime({ message: "Valid date and time is required" })
});
///booking
const bookingSchema = z.object({
  activityId: z.string().min(1, { message: "Activity ID is required" })
});

// Validation middleware
const validateZod = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      errors: error.errors.map(err => ({
        msg: err.message,
        path: err.path.join('.')
      }))
    });
  }
};

module.exports = {
  registerSchema,
  loginSchema,
  activitySchema,
  bookingSchema,
  validateZod
};