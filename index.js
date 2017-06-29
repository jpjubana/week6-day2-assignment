/* module imports *************************************************************/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const Busboy = require('busboy');

const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

const models = require("./models");

/* middleware *****************************************************************/

app.use(bodyParser.urlencoded({ extended: true }));

/* routes *********************************************************************/

app.get("/", function(req, res) {
    models.todolist.findAll().then(function(todos) {
        console.log(models.todolist);
        res.render('index', { todos: todos });
    })
});

app.post("/todos", function(req, res) {
    models.todolist.create({
        title: req.body.todo
    }).then(function(newTodo) {
        res.redirect('/');
    });
});

app.post("/completed", function(req, res) {
    models.todolist.update({
        title: req.body.completed,
        completed_at: "t"
    }, {
        where: {
            id: req.body.completed
        }
    }).then(function(completed) {
        res.redirect('/');
    })
});

/* Error Handlers go under here! ******************************************************/

// Start 

app.listen(3000, () => console.log("Ninja We init!"));