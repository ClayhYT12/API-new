async function Connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/smart_chain_city");
    console.log("Conectado");
    global.connection = connection;
    return connection;
}

Connect();

async function SelectUserDB(){
    const conn = await Connect();
    sql = 'SELECT * FROM tb_users;';
    //const value = [id.ID];
    const [rows] = await conn.query(sql);
    return rows;
}

async function InsertUserDB(user){
    const conn = await Connect();
    const sql = 'INSERT INTO tb_users(Username, Email, Password) VALUES (?,?,?);';
    const values = [user.Username, user.Email, user.Password];
    await conn.query(sql,values);
}
module.exports = {SelectUserDB,InsertUserDB}