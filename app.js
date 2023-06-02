const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig');
const bodyparser = require('body-parser');
const User = require('./models/User');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const PORT = process.env.PORT || 8080
const db = require('./models');
const app = express();

const corsOption = {
  origin: 'http://localhost:8080'
}


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Forum API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);


//middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//CRUD routes
app.use('/users', userRoutes);


//testing api
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

//port


//server

// app.listen(PORT, () => {
//   console.log(`server running in port ${PORT}`)
// })



//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

db.sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(PORT);
  })
  .catch(err => console.log(err));

