import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from "./models/index.js";
import routes from './routes/routes.js';

const app = express();

// Enable All CORS Requests
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

app.use('/api/v1', routes);

db
  .authenticate()
  .then(() => {
    console.log('>>> Database connection has been established successfully.');
    return db.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('>>> Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(5000, () => {
  console.log('>>> Backend server is running on port 5000');
});

export default app;
