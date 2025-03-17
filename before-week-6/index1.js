const express = require('express');
const app = express();

app.get('/multiply/:id1/:id2',function(req,res){
   
    const a = parseInt(req.params.id1);
    const b = parseInt((req.params.id2));
    res.json({
        ans:a*b
    })
   
    
})

app.get('/add',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans:a+b
    })
})

app.get('/divide',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans:a/b
    })
})

app.get('/subtract',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans:a-b
    })
})

app.listen(3000,() =>{
    console.log("Running bitch")
});