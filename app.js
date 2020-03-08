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
      choices: [
        "View ALL Employees",
        "View ALL Departments",
        "Add Employee",
        "Update Employee Role"
      ]
    })
    .then(response => {
      switch (response.action) {
        case "View ALL Employees":
          viewAllEmployees();
          break;
        case "View ALL Departments":
          viewAllDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
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

function viewAllDepartments() {
  const query = `
  SELECT name AS Departments 
  FROM department;
  `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("ALL DEPARTMENTS", res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
        validate: input => {
          if (input !== "" && input != null) {
            return true;
          } else {
            return "First Name cannot be blank";
          }
        }
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
        validate: input => {
          if (input !== "" && input != null) {
            return true;
          } else {
            return "Last name cannot be blank";
          }
        }
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

function updateEmployee() {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Select the employee you want to update",
          choices: function() {
            const employeesArray = [];
            result.forEach(employee => {
              employeesArray.push(
                `${employee.first_name} ${employee.last_name}`
              );
            });
            return employeesArray;
          }
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
        // need to parse first name and last name for query
        const employee_name = response.employee;
        const employeeArr = employee_name.split(" ");

        connection.query(
          `UPDATE employee SET ? WHERE first_name = '${employeeArr[0]}' AND last_name = '${employeeArr[1]}'`,
          [{ role_id: response.role }],
          (err, result) => {
            if (err) throw err;
            console.log(`Successfully updated ${response.employee}'s role!`);
            start();
          }
        );
      });
  });
}
