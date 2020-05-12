var mysql = require('mysql');

var con = mysql.createConnection({
  host: "restaurants.cswyphfglawf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "Restaurant"
});


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM RESTAURANTS", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});