const mysql2 = require("mysql2")
const knex = require("knex")({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        database: 'mydb',
        user: 'kumar',
        password: 'Sampath@123'
    }
})
knex.schema.createTable("userss",(t)=>{
    t.increments().primary(),
    t.string("name"),
    t.string("email"),
    t.string("password")
}).then((data)=>{
    console.log("table created")
}).catch((err)=>{
    console.log("table already exists")
})

module.exports = knex