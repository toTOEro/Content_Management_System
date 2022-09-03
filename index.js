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
    let departmentsArr = [];
    let managersArr = [];
    let rolesArr = [];

    inquirer
        .prompt(userAction)
        .then((response) => {
            // Switch statement to handle what the user wants to do, each case describes what 
            // each case does
            switch (response.userAction) {

                case 'View all departments':
                    const viewDepts = async () => {
                        console.table(`\n\nDepartments`, await db.viewDepartment());
                        init();
                    };
                    viewDepts();
                    return;

                case 'View all roles':
                    const viewRoles = async () => {
                        console.table(`\n\nRoles`, await db.viewRoles());
                        init();
                    };
                    viewRoles();
                    return;

                case 'View all employees':
                    const viewEmployees = async () => {
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

                    const addRole = async () => {
                        let deptId;
                        // Pulls all current departments from the DB and maps them to an array
                        let deptObj = await db.viewDepartment();
                        departmentsArr = deptObj.map(({ name }) => name);

                        // Generates the question object array for inquirer
                        let roleQuestions = initRoleQs(departmentsArr);
                        let { roleName, roleSalary, roleDepartment } = await inquirer.prompt(roleQuestions);

                        // Confirms the department ID
                        deptObj.forEach((department) => {
                            if (roleDepartment === department.name) { deptId = department.id };
                        });

                        // DB query to add role
                        await db.addRole(roleName, roleSalary, deptId);

                        // re-init
                        init();
                    };
                    addRole();
                    return;

                case 'Add an employee':
                    const newEmployee = async () => {
                        let managerId
                        let roleId

                        // DB queries to pull current managers and roles
                        let managerObj = await db.viewEmployees('Manager');
                        let rolesObj = await db.viewRoles();

                        // Creates a manager array with the concatenated first and last name
                        managersArr = managerObj.map(({ first_name, last_name }) =>
                            `${first_name} ${last_name}`)
                        managersArr.push('None')

                        // Creates a roles array by mapping role titles
                        rolesArr = rolesObj.map(({ title }) => title);

                        // Initializes questions for inquirer
                        let newEmpQs = initEmployeeQs(rolesArr, managersArr);


                        let { employeeFirstName,
                            employeeLastName,
                            employeeRole,
                            employeeManager } = await inquirer.prompt(newEmpQs);

                        // Pulls manager ID, populates null if employee has no manager
                        if (employeeManager = 'None') {
                            managerId = null;
                        } else {
                            managerObj.forEach((manager) => {
                                if (employeeManager == `${manager.first_name} ${manager.last_name}`) {
                                    managerId = manager.id
                                }
                            })
                        }
                        ;

                        // Pulls role ID
                        rolesObj.forEach((role) => {
                            if (employeeRole == role.title) {
                                roleId = role.id
                            }
                        });

                        // Adds new employee to DB
                        await db.addEmployee(employeeFirstName, employeeLastName, roleId, managerId)
                        init()

                    }
                    newEmployee();
                    return;

                case 'Update an employee role':
                    const updateEmp = async () => {
                        let roleId
                        let empId

                        // Pulling current employees/roles
                        let rolesObj = await db.viewRoles();
                        let employeeObj = await db.viewEmployees();

                        // Creates a roles and manager arrays for inquirer
                        employeesArr = employeeObj.map(({ first_name, last_name }) =>
                            `${first_name} ${last_name}`
                        );

                        rolesArr = rolesObj.map(({ title }) => title);

                        // Initialize inquirer quetsions
                        const inqQuestions = initUpdateRoleQs(employeesArr, rolesArr);

                        // Asks quetions
                        let { updateEmp, updatedRole } = await inquirer.prompt(inqQuestions);

                        // Pulls role ID
                        rolesObj.forEach((role) => {
                            if (updatedRole == role.title) {
                                roleId = role.id
                            }
                        });

                        // Pulls employee ID
                        employeeObj.forEach((employee) => {
                            if (updateEmp == `${employee.first_name} ${employee.last_name}`) {
                                empId = employee.id
                            };
                        });

                        // Pushes new employee role to DB
                        await db.updateEmployee(roleId, empId);

                        init();
                    };

                    updateEmp();
                    return;

                case 'Quit':
                    db.end();
                    return;

                default:
                    return;
            };
        });
};






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

function initUpdateRoleQs(employees, roles) {
    const updateRole = [
        {
            type: 'list',
            message: 'Who are you updating?',
            name: 'updateEmp',
            choices: employees
        },
        {
            type: 'list',
            message: 'What is their new role?',
            name: 'updatedRole',
            choices: roles
        },
    ]

    return updateRole
};


function initRoleQs(departments) {

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

function initEmployeeQs(role, manager) {
    const newEmployeeQs = [
        {
            type: 'input',
            message: 'What is the first name?',
            name: 'employeeFirstName',
        },
        {
            type: 'input',
            message: 'What is the last name?',
            name: 'employeeLastName',
        },
        {
            type: 'list',
            message: 'What is their role?',
            name: 'employeeRole',
            choices: role
        },
        {
            type: 'list',
            message: 'Who is their manager?',
            name: 'employeeManager',
            choices: manager
        }
    ];
    return newEmployeeQs
}


// Function call to initialize app
init();
