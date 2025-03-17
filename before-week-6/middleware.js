// const express = require('express');
// const app = express();

// function middleware(req, res,next){
//     console.log("Middleware called");
//     next();
// }

// app.use(middleware);

// app.get('/', function(req,res){
//     res.send("Hello");
// })

// app.listen(3000,() => {
//     console.log("Listening on 3000")
// });


const express = require("express");
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.post('/sum',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        "sum": a + b
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})