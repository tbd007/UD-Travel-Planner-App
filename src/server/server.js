var path = require("path");
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
// Spin up the server
const port = 5000;

app.get('/',function(req,res){
  res.sendFile('dist/index.html')
})

app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})



module.exports = app







