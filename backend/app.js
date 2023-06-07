const express = require('express')

const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order')
const pastaRoutes = require('./routes/pasta')
const pizzaRoutes = require('./routes/pizza')
const dessertRoutes = require('./routes/dessert')

require('dotenv').config();

const MONGODB_URL=process.env.MONGODB_URL
mongoose.connect(
    MONGODB_URL,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !')
);



app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/order', orderRoutes)
app.use('/api/pizza', pizzaRoutes)
app.use('/api/pasta', pastaRoutes)
app.use('/api/dessert', dessertRoutes)

module.exports = app