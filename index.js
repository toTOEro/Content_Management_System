// This code requires the inquirer, and mysql2 in order to properly funcion.

const inquirer = require('inquirer');
const mysql2 = require('mysql2');

// Questions to ask the user within the terminal
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
        choices: ['yes'] //ARRAY GOES HERE
    },

]

const updateRole = [
    {
        type: 'input',
        message: 'What is their new role?',
        name: 'newRole',
    },

]


// This function initializes the app to begin asking questions.
function init() {
    inquirer
        .prompt(userAction)
        .then((response) => {
            switch (response.userAction) {
                case 'View all departments':
                    
                case 'View all roles':

                case 'View all employees':

                case 'Add a department':

                case 'Add a role':

                case 'Add an employee':

                case 'Update an employee role','value':


                default:
                    break;
            }
        }
        )

}

// Function call to initialize app
init();
