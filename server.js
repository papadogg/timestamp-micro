var express = require('express');
var moment = require('moment')

var app = express();
var PORT = process.env.PORT || 8080;


app.use(express.static(__dirname+'/public'));

app.get('/*', function (req, res) {
    var dateObj = {
        unix: null,
        natural: null
    };
    var date = req.params[0];

    if (moment.unix(date).isValid()) {
        dateObj.unix = date;
        dateObj.natural = moment.unix(date).format("MMMM Do YYYY");

    } else if (moment(date, "MMMM Do YYYY").isValid()) {
        dateObj.unix = moment(date, "MMMM Do YYYY").format("X");
        dateObj.natural = moment(date, "MMMM Do YYYY").format("MMMM Do YYYY");
    }

    res.json(dateObj);

});



app.listen(PORT, function(){
    console.log("App is running on port "+ PORT);
});