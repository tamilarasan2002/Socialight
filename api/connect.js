import mysql from 'mysql';
export const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'tamil12345',
    database:'social'
})