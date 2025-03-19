const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "harkiratloveskiara";

const app = express();

app.use(express.json());

let users = [];

function auth(req,res,next){
    const token = req.headers.token;
    if (!token) {
        document.getElementById('information').innerHTML = "Please log in to view your information";
        return;
    }
    try{
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        if(decodedInfo.username){
            req.username = decodedInfo.username;
            next();
        }
        else{
            res.status(400).json({
                message: "Error"
            })
        }
    }
    catch(error){
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})

app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.status(200).json({
        message: "You are signed in"
    })
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({
            username: username
        },JWT_SECRET);
        user.token = token;
        res.json({
            message: "Verified",
            token: token
        })
    }
    else{
        res.status(400).json({
            message:"Not verified credentials" 
        })
    }
})

app.get('/me',auth, function(req,res){
        const user = users.find(u => u.username === req.username);
        res.json({
            username: user.username,
            password: user.password
        })
})

app.listen(3000,()=>{
    console.log("Running on 3000");
})

