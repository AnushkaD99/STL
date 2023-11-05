import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from "./models/index.js";
import routes from './routes/routes.js';

const app = express();

// Enable All CORS Requests
app.use(cors({
  origin: 'http://localhost:3000', // Replace this with your frontend origin
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Use Routes
app.use('/api/v1', routes); // Prefix all API endpoints with '/api'

db
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(5001, () => {
  console.log('Backend server is running on port 5001');
});

export default app;
