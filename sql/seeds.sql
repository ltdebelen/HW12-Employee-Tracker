USE employees_DB;


INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal")


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 10000, 1)

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 40000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 350000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 42000, 4)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Smith", 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Smith", 1, null);


