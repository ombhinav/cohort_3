const express = require('express');
const app = express();

let todos = [];
let currentId = 0;

app.use(express.json());


//get all the todos
app.get('/todos',function(req,res){
  res.json(todos);
})


//post a new todo
app.post('/todo/add',function(req,res){
  const {title, description} = req.body;
  if(!title || !description){
    res.status(400).json({error: "enter title and description bitch"});
  }
  const newTodo = {
    id: currentId++,
    title,
    description,
    completed: false
  }
  todos.push(newTodo);

  res.status(200).send(req.body.title);
})

//delete an existing todo
app.delete('/todo/delete/:id',function(req,res){
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if(index === -1){
    res.status(400).send("No such id found");
  }
  todos.splice(index,1);
  res.status(200).send("Deleted successfully");
})

//update a new todo
app.put('/todo/update/:id',function(req,res){
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if(!todo){
    res.status(400).json({error: 'No such id found !'});
  }
  const {title, description,completed} = req.body;
  if(title){
    todo.title = title;
  }
  if(description){
    todo.description = description;
  }
  if(completed !== undefined){
    todo.completed = completed;
  }

  res.json(todos);
})

app.use((req,res) => {
  res.status(400).json({error: 'Wrong request !!'})
})

app.listen(3000,() => {
  console.log("Yo bitchh")
})

