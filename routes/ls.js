const knex = require("../db/db")
const express = require("express")
const router = express.Router()
const {generateToken,authenticateToken} = require("../auth/jwt")
const { JsonWebTokenError } = require("jsonwebtoken")

router.post("/signup",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined){
        res.send("name and password required")
    }else{
        knex.select("*").from("users")
        .then((data)=>{
            if(data.length<1){
            knex("users").insert(req.body)
            .then((data)=>{
                res.send("signup succesfull")
            }).catch((err)=>{
                res.send(err)
            })}else{
                res.send("user alrewady exisst")
            }
        })
    }
})

router.post("/login",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined){
        res.send('name and password are required')
    }else{
        knex.select("*").from("users")
        .then((data)=>{
            const password = req.body.password
            if(password){
                const token = generateToken(req.body)
                res.send("login successfull")
                console.log(token)
            }
        }).catch((err)=>{
            res.send(err)
            console.log(err)
        })
    }
})

router.get("/user",authenticateToken,(req,res)=>{
    knex.select("*").from("userss")
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

router.get("/user/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("userss")
    .where({id:req.params.id})
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

module.exports = router
