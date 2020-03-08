const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "p@$$w0rd",
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
          break;
        case "Add Employee":
          addEmployee();
          break;
      }
    });
}

function viewAllEmployees() {
  const query = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
  FROM employee 
  INNER JOIN role ON employee.role_id = role.id
  INNER JOIN department ON role.department_id = department.id;
  `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("ALL EMPLOYEES", res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message:
          "What is the role? (1 - Sales Person, 2 - Software Engineer, 3 - Accountant, 4 - Lawyer)",
        choices: [1, 2, 3, 4]
      }
    ])
    .then(response => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role,
          manager_id: null
        },
        (err, res) => {
          if (err) throw err;
          console.log("Employee Added!");
          start();
        }
      );
    });
}
