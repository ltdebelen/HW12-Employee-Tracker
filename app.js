const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "L@wr3nc314",
  database: "employees_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View ALL Employees", "Add Employee", "Remove Employee"]
    })
    .then(response => {
      switch (response.action) {
        case "View ALL Employees":
          viewAllEmployees();
      }
    });
}

function viewAllEmployees() {
  const query = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary
  FROM employee 
  INNER JOIN role ON employee.id = role.id
  INNER JOIN department ON role.department_id = department.id;
  `;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("ALL EMPLOYEES", res);
    start();
  });
}
