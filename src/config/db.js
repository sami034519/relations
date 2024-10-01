import mysql from "mysql2";
const connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    password:"root_123",
    user:"root",
    database:"studentdata"
});
connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{console.log("connected")}
});
export  default connection;
// connection.query(`create table user (id int primary key auto_increment,email varchar(100) not null,password varchar(100) not null)`,(err,results)=>{
//     if(err){console.log(err)}
//     else{console.log("user table created")}
// });
// connection.query(`CREATE TABLE profile (
//     firstname VARCHAR(100) NOT NULL,
//     lastname VARCHAR(100) NOT NULL,
//     image VARCHAR(100),
//     userid INT,
//     FOREIGN KEY (userid) REFERENCES user(id),
//     UNIQUE (userid),
//     CONSTRAINT unique_first_last_name UNIQUE (firstname, lastname)
// )`,(err,results)=>{
//         if(err){console.log(err)}
//         else{console.log("profile table created")}
//     });