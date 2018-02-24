// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [
	{
		customerName: 'John Doe',
		phoneNumber: 8675309,
		customerEmail: 'john@aol.com',
		customerID: 12345
  	}
];

var waitList = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req,res) {
	res.json(reservations)
})

app.get("/api/waitlist", function(req,res) {
	res.json(waitList)
})

app.get("/view/tables", function(req, res) {

	for (var i = 0; i < reservations.length; i++) {
		return res.json(reservations[i])
    }

    return res.json(false);
});

app.get("/view/waitlist", function(req, res) {

	for (var i = 0; i < waitList.length; i++) {
		return res.json(waitList[i])
    }

    return res.json(false);
});

app.post("/api/new", function(req, res) {
	reservationTrue = 0;

	var newReservation = req.body;

	if (reservations.length < 5) {
		reservations.push(newReservation);
	}

	else {
		waitList.push(newReservation);
	}

	res.json(newReservation)
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

