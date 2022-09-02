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


// This function initializes the app to begin asking questions.
async function init() {
    inquirer
        .prompt(userAction)
        .then((response) => {
            switch (response.userAction) {
                case 'View all departments':
                    const viewDepts = async () => {
                        console.table(`\n\nDepartments`, await db.viewDepartment());
                        init();
                    }
                    viewDepts();
                    return;

                case 'View all roles':
                    db.viewRoles()
                        .then(() => init());
                    return;

                case 'View all employees':
                    const viewEmployees = async() => {
                        console.table(`\n\nEmployees`, await db.viewEmployees());
                        init()

                    }
                    viewEmployees();
                    return;

                case 'Add a department':
                    inquirer.prompt(addDepartment)
                        .then(({ departmentName }) => {
                            db.addDepartment(departmentName)
                                .then(init());
                        })
                    return;

                case 'Add a role':
                    let departments = [];

                    const addRole = async () => {
                        let deptObj = await db.viewDepartment();

                        departments = deptObj.map(({ name }) => name);
                        let roleQuestions = newRoleQs(departments);
                        let { roleName, roleSalary, roleDepartment } = await inquirer.prompt(roleQuestions);
                        deptObj.forEach((department) => {
                            if (roleDepartment === department.name) { deptId = department.id };
                        });
                        db.addRole(roleName, roleSalary, deptId);
                        console.log(`\nA ${roleName} role has been added\n`);
                        init();
                    };
                    addRole();
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







const updateRole = [
    {
        type: 'input',
        message: 'What is their new role?',
        name: 'newRole',
    },

]



function newRoleQs(departments) {

    const newRoleQs = [
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
            choices: departments
        }
    ]

    return newRoleQs;
};

function newEmployee(department, role, manager) {
    const newEmployeeQs = [
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
            type: 'list',
            message: 'What department?',
            name: 'employeeDepartment',
            choices: department
        },
        {
            type: 'input',
            message: 'What is their role?',
            name: 'employeeRole',
            choices: role
        },
        {
            type: 'input',
            message: 'Who is their manager?',
            name: 'employeeManager',
            manager: manager
        }
    ];
    return newEmployeeQs
}


// Function call to initialize app
init();
