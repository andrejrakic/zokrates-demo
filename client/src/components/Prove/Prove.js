import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import verifier_abi from '../../contracts/verifier.sol.json';
import './Prove.css';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';

export default function Prove() {
	const serverUri = `http://localhost:5000/verify`;

	const web3 = new Web3(
		new Web3.providers.WebsocketProvider(
			`wss://rinkeby.infura.io/ws/v3/fcba35ab93d548cba21391640fcb4c2b`
		)
	);

	const VerifierContract = new web3.eth.Contract(
		verifier_abi,
		`0x600c3dC2568d97D85082bE1110f7a9dC52C2123C`
	);

	const [firstNumber, setFirstNumber] = useState('');
	const [secondNumber, setSecondNumber] = useState('');
	const [sum, setSum] = useState('7');

	useEffect(() => testWeb3Connection());

	let testWeb3Connection = () => {
		web3.eth.net
			.isListening()
			.then(() => console.log(`Web3 is connected`))
			.catch((err) => console.log(`Error: ${err}`));
	};

	let compute = () => {
		axios
			.post(serverUri, {
				firstNumber: firstNumber,
				secondNumber: secondNumber,
				sum: sum,
			})
			.then((res) => verify(res.data.proof, res.data.output));
	};

	let verify = (proofObject, output) => {
		console.log(proofObject.proof);
		console.log(output);
		output.includes('1') ? console.log('jesu isti') : console.log('nisu isti');
		VerifierContract.methods
			.verifyTx(
				proofObject.proof.a,
				proofObject.proof.b,
				proofObject.proof.c,
				proofObject.inputs
			)
			.call()
			.then((res) => {
				console.log('blockchain:', res);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='container' style={{ paddingTop: 50 }}>
			<Form>
				<h1>ZkProve app</h1>
				<Form.Group>
					<Row>
						<Col>
							<Form.Control
								placeholder='First number'
								type='password'
								value={firstNumber}
								onChange={(e) => setFirstNumber(e.target.value)}
							/>
						</Col>
						<Col>
							<Form.Control
								placeholder='Second number'
								type='password'
								value={secondNumber}
								onChange={(e) => setSecondNumber(e.target.value)}
							/>
						</Col>
					</Row>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='text'
						value={sum}
						onChange={(e) => setSum(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Button variant='primary' size='lg' onClick={() => compute()}>
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
						/>
						Verify
					</Button>
				</Form.Group>
			</Form>
			<svg
				class='checkmark'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 52 52'>
				<circle class='checkmark__circle' cx='26' cy='26' r='25' fill='none' />
				<path
					class='checkmark__check'
					fill='none'
					d='M14.1 27.2l7.1 7.2 16.7-16.8'
				/>
			</svg>
		</div>
	);
}
