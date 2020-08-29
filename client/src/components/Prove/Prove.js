import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	serverUri,
	web3,
	VerifierContract,
	testWeb3Connection,
} from '../../config/index';
import './Prove.css';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';

export default function Prove() {
	const [firstNumber, setFirstNumber] = useState('');
	const [secondNumber, setSecondNumber] = useState('');
	const [sum, setSum] = useState('7');

	useEffect(() => testWeb3Connection());

	let compute = () => {
		axios
			.post(`${serverUri}/verify`, {
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
				if (res) {
					console.log('Uspesna verifikacija');
				}
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
