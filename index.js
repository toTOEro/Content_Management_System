// This code requires the inquirer, and mysql2 in order to properly funcion.

const inquirer = require('inquirer');
const mysql = require('mysql2');
const DbPing = require('./lib/queries')
const cTable = require('console.table');
const { userAction, addDepartment, newEmployee, newRole, updateRole } = require('./lib/questions')

// DB Initialization

const db = new DbPing(mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
))



// This function initializes the app to begin asking questions.
function init() {
    inquirer
        .prompt(userAction)
        .then((response) => {
            switch (response.userAction) {
                case 'View all departments':
                    db.viewDepartment()
                        .then(() => init());
                    // init();
                    return;

                case 'View all roles':
                    db.viewRoles()
                        .then(() => init());
                    return;

                case 'View all employees':
                    db.viewEmployees()
                        .then(() => init());
                    return;

                case 'Add a department':
                    inquirer.prompt(addDepartment)
                        .then(({ departmentName }) => {
                            db.addDepartment(departmentName).then(() => init());
                        })
                    return;

                case 'Add a role':
                    inquirer.prompt(newRole)
                        .then(({ roleName, salary, department }) => {
                            
                        })


                    db.addRole()
                        .then(() => init());
                    return;

                case 'Add an employee':
                    db.addEmployee()
                        .then(() => init());
                    return;

                case 'Update an employee role':
                    db.updateEmployee()
                        .then(() => init());
                    return;

                case 'Quit':
                    db.end();
                    return;

                default:
                    return;
            }

        })

}

// Function call to initialize app
init();
