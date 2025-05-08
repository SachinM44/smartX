# Activity Booking App - Backend API

A RESTful API for a Basic Activity Booking App built with Node.js, Express, and MongoDB.

## Features
 User registration and authentication with JWT
 Public endpoints for listing activities
 Protected endpoints for booking activities
 User-specific booking management

## Tech Stack
 Backend: Node.js with Express.js
 Database: MongoDB with Mongoose ODM
 Authentication: JWT Token-based auth
 Validation: Zod schema validation
 Password Security: bcryptjs for hashing

## API Endpoints
### Authentication
POST /api/auth/register- Register a new user
POST /api/auth/login- Login and get JWT token
GET /api/auth/me- Get current user info (protected)

### Activities
GET /api/activities - List all activities (public)
GET /api/activities/:id- Get activity details (public)
POST /api/activities - Create a new activity (protected/admin)

### Bookings
POST /api/bookings - Book an activity (protected)
GET /api/bookings- Get all bookings for current user (protected)
DELETE /api/bookings/:id - Cancel a booking (protected)


### Prerequisites

 Node.js 
 MongoDB 

### Installation
1. Clone the repository
   git clone https://github.com/SachinM44/smartX.git
   cd activity-booking-app

   if you dont have mongoDB string , then use it in env : 
   MONGO_URI=mongodb+srv://admin:12345@cluster0.t3m6lc0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sachinSuperSecret
PORT=5000 (env file for ur local setup) 