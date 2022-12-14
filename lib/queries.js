// This module is used to generate a DbPing class that contains
// all the functions required for the Employee Tracker

const cTable = require('console.table');

// DbPing is used to view all information within a table
class DbPing {
    constructor(db) {
        this.db = db;
    };


    /// View all departments
    async viewDepartment() {
        try {
            let sql = `SELECT * FROM department
                   ORDER BY id;`

            const [res, fields] = await this.db.promise().query(sql);
            return res
        } catch (err) {
            console.log(err)
        }

    };


    // View all roles including their department
    async viewRoles() {
        try {
            let sql = `SELECT role.id, title, department.name, salary 
                   FROM role JOIN department 
                   ON department.id = role.department_id
                   ORDER BY role.id;`

            const [res, fields] = await this.db.promise().query(sql);
            return res
        } catch (err) {
            console.log(err)
        };
    };

    // View all employees including their respective titles, departments, and salaries
    async viewEmployees(role) {
        let filter;
        !role ? filter = '' : filter = `WHERE role.title LIKE '%${role}%'`

        try {
            // let sql = `SELECT t1.id, t1.first_name, t1.last_name, role.title, department.name, role.salary, t2.first_name AS manager_first_name, t2.last_name AS manager_last_name
            let sql = `SELECT t1.id, t1.first_name, t1.last_name, role.title, department.name, role.salary, CONCAT(t2.first_name," ",t2.last_name) AS manager_name
                   FROM employee t1
                   LEFT OUTER JOIN employee t2 ON t2.id = t1.manager_id
                   JOIN role ON t1.role_id = role.id
                   JOIN department ON department.id = role.department_id
                   ${filter}
                   ORDER BY t1.id; `

            const [res, fields] = await this.db.promise().query(sql)
            return res

        } catch (err) {
            console.log(err)
        }
    };

    // Add a department, user specifies the name
    async addDepartment(name) {
        try {
            let sql = `INSERT INTO department(name)
            VALUES(?)`;
            let capsName = name[0].toUpperCase() + name.slice(1);
            await this.db.promise().query(sql, capsName)
            console.log(`${capsName} has been added to the database`)
        } catch (err) {
            console.log(err)
        }

    };

    // Inserts new orles into the role table
    async addRole(name, salary, department) {
        try {
            let sql = `INSERT INTO role(title, salary, department_id)
            VALUES(?, ?, ?); `;
            await this.db.promise().query(sql, [name, salary, department]);
            console.log(`\nA ${name} role has been added\n`);
        } catch (err) {
            console.err(err);
        };
    };

    // Adds a new employee
    async addEmployee(first, last, role, manager) {
        try {
            let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
            VALUES(?, ?, ?, ?); `;
            await this.db.promise().query(sql, [first, last, role, manager]);
            console.log(`\n${first} ${last} has been added\n`);

        } catch (err) {
            console.log(err);
        };

    };

    // Updates an employee's role
    async updateEmployee(roleId, employeeId) {
        try {
            let sql = `UPDATE employee
                SET role_id = ?
                WHERE id = ?; `;
            await this.db.promise().query(sql, [roleId, employeeId]);
        } catch (err) {
            console.log(err)
        };
    };

    async updateManager(empId, managerId) {
        try {
            let sql = `UPDATE employee
                       SET manager_id = ?
                       WHERE id = ?; `;
            await this.db.promise().query(sql, [managerId, empId]);
            console.log(`Updated manager!`);
        } catch (err) {
            console.log(err);
        };
    };

    // Ends connection
    end() {
        this.db.end();
    };

};


module.exports = DbPing;