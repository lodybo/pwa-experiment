// Get ExpressJS
var express = require("express");
var app = express();

// Set up the basic server - static
app.use(express.static("public"));

// Set up basic server - routing
app.get("/", function (request, response) {
	response.sendFile(__dirname + "/views/index.html");
});

// Set up basic server - API
app.get("/tasks", function (request, response) {
	response.send(tasks);
});

app.post("/tasks", function (request, response) {
	tasks.push(request.query.task);
	response.sendStatus(201);
});

app.delete("/tasks", function (request, response) {
	var pos = tasks.indexOf(request.query.task);
	
	if (pos > -1) {
		tasks.splice(pos, 1);
	}
	
	response.sendStatus(204);
});

// Simple tasks store
var tasks = ["Get milk", "Take out trash"];

// Listen to requests
var listener = app.listen("8080", function() {
	console.log("App is listening on ", listener.address().address, ":", listener.port);
});