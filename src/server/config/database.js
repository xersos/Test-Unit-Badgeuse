let mysql = require('mysql');

db = mysql.createPool(
    {
            host     : process.env.MYSQL_HOST,
            port     : process.env.MYSQL_PORT,
            user     : process.env.MYSQL_USER || "uhaSQL",
            password : process.env.MYSQL_PASSWORD || "uha",
            database : process.env.MYSQL_DATABASE,
            multipleStatements: true // ATTENTION CETTE INFORMATIONS PEUT-ETRE A LORIGINE DE GROS PROBLEMES
    });
