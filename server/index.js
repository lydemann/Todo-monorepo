var path = require('path');
const express = require('express');
const faker = require('faker');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
var apiRoutes = express.Router();
app.use('/api', apiRoutes);
apiRoutes.get('/todo-list', (req, res) => {
	const todoList = [];

	for (let index = 0; index < 5; index++) {
		const newTodo = {
			id: faker.random.uuid(),
			title: faker.random.words(2),
			description: faker.random.words(5),
		};

		todoList.push(newTodo);
	}

	return res.json(todoList);
});

const port = 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
