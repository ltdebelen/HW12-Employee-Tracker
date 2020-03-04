const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "L@wr3nc314",
  database: "seinfeld"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  console.log("Working");
}
