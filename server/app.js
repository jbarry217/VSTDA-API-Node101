const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var items = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('json spaces', 2);


app.get('/', (req, res) => {
    res.json({"status": "ok"});
    res.status(200);
});

app.get('/api/TodoItems', (req, res) => {   
    res.json(items);
    res.status(200);
});

app.get('/api/TodoItems/:number', function(req, res) {   
    for(let i = 0; i < items.length; i++) {
        if (items[i].todoItemId == req.params.number) {
            res.json(items[i]).status(200);
            return;
            }
        }
});

app.post('/api/TodoItems', function(req, res) {
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number', function(req, res) {
    let item = items[req.params.number]
    items.splice(req.params.number, 1);
    res.json(item).status(200);
});

module.exports = app;
