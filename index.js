const express = require("express");
var path = require('path'); 
const app = express();
const router = express.Router();
const port = 3000;

var bmiSum = 0.0;
var requests = 0;

// url: http://localhost:port/
app.get('/',function(request, response){
	response.sendFile(path.join(__dirname+"/views/index.html"));
});

app.use(express.static("static"));

// all routes prefixed with /api
app.use("/api", router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get("/addBMI", (request, response) => {
	requests++;
	bmiSum += parseFloat(request.query.bmi);
	averageBMI = (bmiSum/requests).toFixed(2);
	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify({ gender: request.query.gender, 
								   weight: request.query.weight,
								   height: request.query.height,
									  bmi: request.query.bmi,
							   averageBMI: averageBMI,
								 requests: requests
									}));
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));