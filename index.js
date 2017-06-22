/* module imports *************************************************************/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// adds file system methods that aren't included in the native fs module and adds promise support to the fs methods.
const fs = require('fs-extra');
const Busboy = require('busboy');

const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')


/* middleware *****************************************************************/


// serve static content out of this directory
// parse all requests using the generic body parser (req.body is now available)
app.use(bodyParser.urlencoded({ extended: true }));
// gives us a way to validate input (e.g., ensure emails are valid)


/* routes *********************************************************************/

const todos = [
    " thing1",
    " thing2",
    " thing3"
];

const completed = [
    "done did this"
];

app.get("/", function(req, res) {
    res.render('index', { todos: todos, completed: completed });
});

app.post("/todos", function(req, res) {
    todos.push(req.body.todo);
    res.redirect('/');
});

app.post("/completed", function(req, res) {
    completed.push(req.body.completed);
    const i = todos.indexOf(completed)
    todos.splice(i, 1);
    res.redirect('/');
});

/* Error Handlers go under here! ******************************************************/


// Start 

app.listen(3000, () => console.log("Ninja We init!"));