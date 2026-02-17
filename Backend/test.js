const mysql = require("mysql2/promise");

async function test() {
  const conn = await mysql.createConnection({
    host: "paulwebsite-server.mysql.database.azure.com",
    user: "svhcmafxwf",
    password: "P$KzFJI3pDqJQGLz",
    database: "paulwebsite-database",
    port: 3306,
    ssl: { rejectUnauthorized: true }
  });
  
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS dummy_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.execute(
    "INSERT INTO dummy_table (name) VALUES (?)",
    ["Azure Test"]
  );

  const [rows] = await conn.execute("SELECT * FROM dummy_table");
  console.log(rows);

  await conn.end();
}

test();
