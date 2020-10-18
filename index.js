const { join } = require('path');
const express = require('express');

const PORT = 8000;
const app = express();

app.use('/assets', express.static('assets'));
app.get('/', (_, res) => res.sendFile(join(__dirname + '/index.html')));

app.listen(PORT, () =>
	console.log(`The application is running at http://localhost:${PORT}`)
);
