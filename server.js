// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server started on port :http://localhost:${port}`);
});

// Func To get Data
app.get('/getData', (req, res) => {
    res.send(projectData).status(200);

});

// Func to Post data
app.post('/postData', (req, res) => {

    let data = req.body;
    console.log('server side data', data);
    projectData = {
        temp: data.temp,
        date: data.date,
        feeling: data.feeling
    }
    res.send(projectData).status(200).end();
    console.log(res);


});