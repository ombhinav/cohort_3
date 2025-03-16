const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = "randomharkiratilovekiara";

app.use(express.json());

let users = [];

function generateToken(){
    let token = 0;
    for(let i = 0;i<32;i++){
        token += Math.random();
        return token;
    }
}

app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "You're signed up"
    });
    console.log(users);
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({username: username},JWT_SECRET);
        // const token = generateToken();
        user.token = token;
        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Invalid username or password"
        })
    }
    console.log(users);
})

app.get('/me',function(req,res){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_SECRET);
    const user = users.find(u => u.username === decodedInfo.username);
    if(user){
        res.send({
            username : user.username,
            password : user.password
        })
    }
    else{
        res.status(401).send({
            message: "Some error in finding it"
        })
    }
})



app.listen(3000,()=>{
    console.log("Running on 3000");
});