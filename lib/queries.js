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
        let sql = `SELECT * FROM department
                   ORDER BY id;`

        await this.db.promise().query(sql)
            .then(([rows, fields]) => {
                console.table('\n\nDepartments', rows);
            })
            .catch((err) => console.log(err))
    };


    // View all roles including their department
    async viewRoles() {
        let sql = `SELECT role.id, title, department.name, salary 
                   FROM role JOIN department 
                   ON department.id = role.department_id
                   ORDER BY role.id;`

        await this.db.promise().query(sql)
            .then(([rows, fields]) => {
                console.table('\n\nRoles', rows);
            })
            .catch((err) => console.log(err));
    };

    // View all employees including their respective titles, departments, and salaries
    async viewEmployees() {
        let sql = `SELECT first_name, last_name, role.title, department.name, role.salary    
                   FROM employee 
                   JOIN role ON employee.role_id = role.id
                   JOIN department ON department.id = role.department_id
                   ORDER BY employee.id;`

        await this.db.promise().query(sql)
            .then(([rows, fields]) => {
                console.table('\n\nEmployees', rows);
            })
            .catch((err) => console.log(err));
    };

    async addDepartment(name) {
        let sql = `INSERT INTO department (name)
                   VALUES (?)`;
        let capsName = name[0].toUpperCase() + name.slice(1);
        await this.db.promise().query(sql, capsName)
            .then(console.log(`${name} has been added to the database`))
            .catch(console.log);
    };

    async addRole() {

    };

    async addEmployee() {

    };

    async updateEmployee() {

    };

    end() {
        this.db.end();
    };

};


// let result = rows.map(({name}) => name)

// return res

module.exports = DbPing ;