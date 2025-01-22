const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const userRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');

// Middleware
app.use(express.json());

// Routes-Endpoints
app.use('/users', userRoutes);
app.use('/movies', moviesRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
