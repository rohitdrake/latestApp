const _ = require("lodash");
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');



let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=>{
     Todo.find().then((todos) => {
       res.send({todos});
     }, (e)=>{
       res.status(400).send(e);
     });
});

app.get('/todos/:id', (req, res)=>{
  let id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send('ID passed is not valid');
    return console.log('Id passed is not valid');
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
    res.status(400).send('todo not found in our database')
    return console.log('todo not found in our database');
    }
    res.send(todo)
  }, (e)=>{
    res.status(404)
  }).catch((e)=>{
    res.status(400).send('Some problem occured');
    console.log('Errorrrrrrrr!');
  });

});

app.delete('/todos/:id', (req, res)=>{
  let id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send('ID passed is not valid');
    return console.log('Id passed is not valid');
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
    res.status(400).send('todo not found in our database')
    return console.log('todo not found in our database');
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res)=>{
  let id = req.params.id;
  let body = _.pick(req.body, ["text", "completed"]);

  if(_.isBoolean(body.completed)&&body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  if(!ObjectID.isValid(id)){
    res.status(404).send('ID passed is not valid');
    return console.log('Id passed is not valid');
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
    res.status(400).send('todo not found in our database')
    return console.log('todo not found in our database');
    }
    res.send(todo);

  }).catch((e)=>{
    res.status(400).send();
  });
});

 app.post('/users', (req, res)=>{
   let userBody = _.pick(req.body,["email", "password"]);
   console.log(userBody);
   let user = new User(userBody);
   user.save().then(()=>{
    return user.generateAuthToken();

  }).then((token)=>{
    res.header('x-auth', token).send(user);
   }).catch((e)=>{
     res.status(400).send(e);
   });
 });



  app.get('/users/me', authenticate,(req, res)=>{
    res.send(req.user);
  });

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};
