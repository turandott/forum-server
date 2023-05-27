const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig');
const bodyparser = require('body-parser');
const User = require('./models/User');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');



const app = express();

const corsOption = {
  origin: 'http://localhost:8080'
}


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Forum API',
      version: '1.0.0',
    }
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);


//middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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


//swagger

/**
 * @swagger
 * /users:
 *  get:
 *    description: Get all users
 *    responses:
 *      200:
 *        description: Success
 */
app.get('/users', (req, res) => {
  res.send([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      password: '1234567',

    }
  ])
});


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