

INSERT INTO
    department (name)
VALUES
    ('Human Resources'),
    ('R&D'),
    ('DevOps'),
    ('IT'),
    ('Engineering');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Software Engineer', 100000, 5), 
    ('Recruiter', 75000, 1),
    ('IT Specialist', 65000, 4),
    ('Systems Engineer', 110000, 3),
    ('R&D Engineer', 120000, 2),
    ('Manager', 150000, 1),
    ('Manager', 150000, 2), 
    ('Manager', 150000, 3),
    ('Manager', 150000, 4),
    ('Manager', 150000, 5);


INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Anthony', 'To', 10, null),
    ('Taylor','Swift',1,1),
    ('Justin','Bieber',1,1),
    ('Christopher','Wong',9,null),
    ('Nick','Miller',3, 4),
    ('Porter','Robinson',3,4),
    ('Super','Man',6,null),
    ('Bat','Man',7,null),
    ('Aqua','Man',8,null);