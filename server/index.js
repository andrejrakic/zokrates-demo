require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('ZoKrates app server');
});

app.listen(port, () => {
	console.log(`ZoKrates App is listening at http://localhost:${port}`);
});
