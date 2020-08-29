const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const { initialize } = require('zokrates-js/node');
const { sourceCode } = require('./main.zok.js');
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

initialize().then((zokratesProvider) => {
	// Compile
	artifacts = zokratesProvider.compile(sourceCode);

	// Setup
	keypair = zokratesProvider.setup(artifacts.program);

	// Compute
	app.post('/verify', (req, res) => {
		const { witness, output } = zokratesProvider.computeWitness(artifacts, [
			req.body.firstNumber,
			req.body.secondNumber,
			req.body.sum,
		]);

		// Generate proof
		const proof = zokratesProvider.generateProof(
			artifacts.program,
			witness,
			keypair.pk
		);

		res.send({ proof: proof, output: output });
	});
});

app.get('/', (req, res) => {
	res.send('ZoKrates app server');
});

app.listen(port, () => {
	console.log(`ZoKrates App is listening at http://localhost:${port}`);
});
