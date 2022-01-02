const express = require("express")
const app = express()
app.use(express.json())
const router = require("./routes/ls")

app.use("/",router)
app.get("/",(req,res)=>{
    res.send("welcome to my world")
})

app.listen(2000,console.log("running on port 2000"))