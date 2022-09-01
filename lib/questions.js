
const DbPing = require('./queries');
const mysql = require('mysql2');

const db = new DbPing(mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
));

// All question sets to ask user within terminal


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
        choices: db.viewDepartment()
    },

]

const updateRole = [
    {
        type: 'input',
        message: 'What is their new role?',
        name: 'newRole',
    },

]

module.exports = {userAction, addDepartment, newEmployee, newRole, updateRole};