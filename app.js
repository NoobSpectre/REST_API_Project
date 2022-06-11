import express from 'express';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json());  //inbuilt middleware to parse the req.body on post in json format
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API project!!!');
});

app.listen(PORT, () =>
  console.log(`Server listening on port: http://localhost:${PORT}`)
);
