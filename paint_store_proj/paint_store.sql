-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Drop tables if they exist (for repeated runs)
DROP TABLE IF EXISTS Department2;
DROP TABLE IF EXISTS Customer_Transaction;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Customer;

-- Create tables

CREATE TABLE Employee (
    EmployeeID      TEXT PRIMARY KEY,
    first_name      TEXT,
    last_name       TEXT,
    position_name   TEXT,
    date_hired      TEXT,
    date_of_birth   TEXT,
    address_number  TEXT,
    street          TEXT,
    city            TEXT,
    state           TEXT,
    zip_code        TEXT,
    phone_number    TEXT
);

CREATE TABLE Product (
    ProductID         TEXT PRIMARY KEY,
    name_of_product   TEXT,
    price             REAL,
    color             TEXT,
    quantity_in_stock INTEGER
);

CREATE TABLE Customer (
    CustomerID           TEXT PRIMARY KEY,
    first_name           TEXT,
    last_name            TEXT,
    date_first_purchase  TEXT,
    date_of_birth        TEXT,
    address_number       TEXT,
    street               TEXT,
    city                 TEXT,
    state                TEXT,
    zip_code             TEXT,
    phone_number         TEXT
);

CREATE TABLE Department2 (
    DepartmentID       TEXT,
    department_name    TEXT,
    EmployeeID         TEXT,
    ProductID          TEXT,
    PRIMARY KEY (DepartmentID, EmployeeID, ProductID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE
);

CREATE TABLE Customer_Transaction (
    OrderID                TEXT,
    CustomerID             TEXT,
    ProductID              TEXT,
    payment_type           TEXT,
    date_placed            TEXT,
    status                 TEXT,
    PRIMARY KEY (OrderID, CustomerID, ProductID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE
);

-- Insert data

INSERT INTO Employee VALUES ('1201','Will','Smith','General Manager and Salesperson','2021-01-15','1968-09-25','1285','Positas Rd','Chula Vista','California','91910','3104248675');
INSERT INTO Employee VALUES ('1202','Chris','Rock','Salesperson','2021-02-21','1967-02-07','20896','Cabrillo Ln','Huntington Beach','California','92646','3235534467');
INSERT INTO Employee VALUES ('1203','Vivek','Ramaswamy','General Manager and Salesperson','2021-03-15','1985-08-09','2456','Sherwin Rd','Upper Arlington','Ohio','43221','6149932234');
INSERT INTO Employee VALUES ('1204','Mitt','Romney','Salesperson','2021-04-17','1947-03-12','11','Clinton St','Cambridge','Massachusetts','02139','9172444776');
INSERT INTO Employee VALUES ('1205','Barack','Obama','Salesperson','2021-05-23','1961-08-04','1515','Ward Ave','Honolulu','Hawaii','96822','8089762378');

INSERT INTO Product VALUES ('1401','1 gallon white paint',24.99,'White',25);
INSERT INTO Product VALUES ('1402','1 gallon eggshell paint',24.99,'White',25);
INSERT INTO Product VALUES ('1403','1 gallon light grey paint',29.99,'Grey',15);
INSERT INTO Product VALUES ('1404','1 gallon dark grey paint',21.99,'Grey',30);
INSERT INTO Product VALUES ('1405','1 gallon dark beige paint',19.99,'Brown',40);

INSERT INTO Customer VALUES ('1001','Donald','Trump','2022-01-01','1946-06-14','691','N County Rd','Palm Beach','Florida','33480','3055542314');
INSERT INTO Customer VALUES ('1002','Pablo','Escobar','2022-02-01','1949-01-14','1100','Brickell Bay Dr','Miami','Florida','33131','3055390183');
INSERT INTO Customer VALUES ('1003','Lionel','Messi','2022-03-01','1987-06-24','2236','Ina Ave','Park City','Utah','84060','4692123395');
INSERT INTO Customer VALUES ('1004','George','Lopez','2022-07-03','1961-04-03','1164','Laurel Way','Beverly Hills','California','90210','2134100932');
INSERT INTO Customer VALUES ('1005','Mehmet','Oz','2022-05-06','1960-06-11','123','Orthodox Dr','Richboro','Pennsylvania','18954','2154325468');

INSERT INTO Department2 VALUES ('1101','White Paints','1202','1401');
INSERT INTO Department2 VALUES ('1101','White Paints','1205','1402');
INSERT INTO Department2 VALUES ('1102','Grey Paints','1203','1403');
INSERT INTO Department2 VALUES ('1102','Grey Paints','1203','1404');
INSERT INTO Department2 VALUES ('1103','Brown Paints','1204','1405');

INSERT INTO Customer_Transaction VALUES ('1301','1001','1403','Credit','2024-01-23','Filled');
INSERT INTO Customer_Transaction VALUES ('1301','1001','1404','Credit','2024-01-23','Filled');
INSERT INTO Customer_Transaction VALUES ('1302','1002','1401','Cash','2024-03-05','Incomplete');
INSERT INTO Customer_Transaction VALUES ('1302','1002','1402','Cash','2024-03-05','Incomplete');
INSERT INTO Customer_Transaction VALUES ('1303','1004','1405','Check','2024-12-11','Filled');
INSERT INTO Customer_Transaction VALUES ('1303','1004','1402','Check','2024-12-11','Incomplete');
INSERT INTO Customer_Transaction VALUES ('1303','1004','1404','Debit','2024-12-11','Incomplete');

SELECT Customer_Transaction.*, Product.*
FROM Customer_Transaction, Product
WHERE Customer_Transaction.ProductID = Product.ProductID;