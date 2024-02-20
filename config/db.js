import mysql from "mysql2";

// año actual
const date = new Date().getFullYear();

const pool = mysql.createPool({
  host: 'sistemasivhorsnet.com',
  user: 'uniminuto_user',
  password: 'uniminuto2022',
  port: 3306,
  database: `uniminuto_sygescol2023`
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port: 3306,
//   database: `uniminuto_sygescol2023`
// });

const connectionPool = pool.promise();

export default connectionPool;
