const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "notSoSecretKey";

const app = express();

const users = [];

app.use(express.json());

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})

app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username, 
        password: password
    });
    res.status(200).json({
        message: "You are successfully signed up !!"
    })
    
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((u) => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({username: username},JWT_SECRET);
        user.token = token;
        res.json({
            message:"Welcome, You are verified !!",
            token: token
        })

    }
    else{
        res.status(400).json({
            message: "You are not authorized !!"
        })
    }
})


app.get('/me',function(req,res){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.username === decodedInfo.username);
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    }
})

app.listen(3000);