// This code requires the inquirer, and mysql2 in order to properly funcion.

const inquirer = require('inquirer');
const mysql = require('mysql2');
const DbPing = require('./lib/queries')
const cTable = require('console.table');
// const { userAction, addDepartment, newEmployee, newRole, updateRole } = require('./lib/questions')


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


// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'employee_db'
//     },
//     console.log(`Connected to the employee_db database.`)
// );

// db.getDepartments().then((res) => console.log(res))

// This function initializes the app to begin asking questions.
function init() {
    inquirer
        .prompt(userAction)
        .then((response) => {
            switch (response.userAction) {
                case 'View all departments':
                    db.viewDepartment()
                        .then((res) => console.log(res))
                        .then(() => init());
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
                    let departments = [];
                    


                    

                    inquirer.prompt(newRole)
                        .then(({ roleName, salary, department }) => {

                        })


                // // db.addRole()
                // //     .then(() => init());
                // return;

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






// Inquirer Questions 
const userAction = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'userAction',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    },

];

const addDepartment = [
    {
        type: 'input',
        message: 'What is the department name?',
        name: 'departmentName',
    }
];

const newEmployee = [
    {
        type: 'input',
        message: 'What is the first name?',
        name: 'employeeFirstName',
    },
    {
        type: 'input',
        message: 'What is the first name?',
        name: 'employeeLastName',
    },
    {
        type: 'input',
        message: 'What department?',
        name: 'employeeDepartment',
    },
    {
        type: 'input',
        message: 'What is their role?',
        name: 'employeeRole',
    },
    {
        type: 'input',
        message: 'Who is their manager?',
        name: 'employeeManager'
    }
];

const newRole = [
    {
        type: 'input',
        message: 'What is the role name?',
        name: 'roleName',
    },
    {
        type: 'number',
        message: 'What is the salary?',
        name: 'roleSalary',
    },
    {
        type: 'list',
        message: 'What department is this role?',
        name: 'roleDepartment',
        choices: deptNames
    }

]

const updateRole = [
    {
        type: 'input',
        message: 'What is their new role?',
        name: 'newRole',
    },

]

console.log(newRole)

function deptChoices() {
    db.db.promise().query(`SELECT * FROM department
    ORDER BY id;`).then(([rows, fields]) => {
        departments = rows.map(({name}) => name)
        return departments
    });
}

// async function getD() {
//     // db.getDepartments();
//     return ['1', '2']
// }

// console.log(getD())
// console.log(db.getDepartments())

// let test = db.getDepartments();
// console.log(test)
// test.then((res) => console.log(res))





// Function call to initialize app
init();
