const paths = require('../config/paths');
const Todo = require('./models/todo');

const getTodos = (res) => {
    Todo.find((err, todos) => {
        // if there is an error retrieving, send the error
        if (err) {
            res.send(err);
            return;
        }

        res.json(todos);
    });
};

module.exports = (app) => {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', (req, res) => {
        getTodos(res);
    });

    // get a todo
    app.get('/api/todos/:todo_id', (req, res) => {
        Todo.findOne({
            _id: req.params.todo_id
        }, (err, todo) => {
            if (err) {
                res.send(err);
                return;
            }

            if (todo === null) {
                res.status(404).send(`Cannot find todo item with ID ${req.params.todo_id}`);
            } else {
                res.json(todo);
            }
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', (req, res) => {
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            complete: false
        }, (err, todo) => {
            if (err) {
                res.send(err);
                return;
            }

            // get and return all the todos after you create another
            getTodos(res);
        });
    });

    // update a todo with complete status
    app.put('/api/todos/:todo_id', (req, res) => {
        Todo.findByIdAndUpdate(
            req.params.todo_id,
            { complete: req.body.complete },
            (err) => {
                if (err) {
                    res.send(err);
                    return;
                }

                res.send();
            }
        );
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', (req, res) => {
        Todo.remove({
            _id: req.params.todo_id
        }, (err, todo) => {
            if (err) {
                res.send(err);
                return;
            }

            getTodos(res);
        });
    });

    app.get('/', (req, res) => {
        res.sendFile(paths.staticFiles);
    });
};
