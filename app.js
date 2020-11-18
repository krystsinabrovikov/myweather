const express = require('express');
const app = express();


// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// Import route
const weatherRoute = require('./routes/weather');

// Use View Engine
app.set('view engine','ejs')

// Middleware Route
app.use('/', weatherRoute);



// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

