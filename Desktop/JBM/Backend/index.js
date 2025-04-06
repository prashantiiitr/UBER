import cookieParser from 'cookie-parser';
import companyRoute from './routes/company.route.js';
import cors from 'cors';
import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);




const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  

});
