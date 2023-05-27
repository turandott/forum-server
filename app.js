const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig');
const bodyparser = require('body-parser');
const User = require('./models/User');


const app = express();

const corsOption = {
  origin: 'http://localhost:8080'
}


//middleware
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//testing api

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`)
})


//CRUD routes
app.use('/users', require('./routes/users'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));