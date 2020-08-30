import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	serverUri,
	VerifierContract,
	testWeb3Connection,
} from '../../config/index';
import Checksign from '../Checksign/Checksign';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';

export default function Prove() {
	const [firstNumber, setFirstNumber] = useState('');
	const [secondNumber, setSecondNumber] = useState('');
	const [sum, setSum] = useState('7');
	const [isProved, setIsProved] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => testWeb3Connection(), []);

	let compute = () => {
		axios
			.post(`${serverUri}/verify`, {
				firstNumber: firstNumber,
				secondNumber: secondNumber,
				sum: sum,
			})
			.then((res) => verify(res.data.proof, res.data.output))
			.catch((err) => alert(err));
	};

	let verify = (proofObject, output) => {
		VerifierContract.methods
			.verifyTx(
				proofObject.proof.a,
				proofObject.proof.b,
				proofObject.proof.c,
				proofObject.inputs
			)
			.call()
			.then((res) => {
				if (res) {
					setIsLoading(false);
					output.includes('1') ? setIsProved(true) : setIsProved(false);
				} else {
					setIsLoading(false);
					setIsProved(false);
				}
			})
			.catch((err) => alert(err));
	};

	let isValidInput = () => {
		if (!firstNumber || !secondNumber || !sum) return false;
		if (isNaN(firstNumber) || isNaN(secondNumber) || isNaN(sum)) return false;
		return true;
	};

	let onCompute = () => {
		if (!isValidInput()) {
			alert('Error: Invalid data entered');
			return;
		}
		setIsLoading(true);
		setIsProved(null);
		compute();
	};

	let onPressEnter = (event) => {
		if (event.key === 'Enter') onCompute();
	};

	return (
		<div className='container' style={{ paddingTop: 50 }}>
			<Form>
				<h1>ZkProve</h1>
				<Form.Group>
					<Row>
						<Col>
							<Form.Control
								placeholder='First number'
								type='password'
								value={firstNumber}
								onChange={(event) => setFirstNumber(event.target.value)}
								onKeyDown={(event) => onPressEnter(event)}
							/>
						</Col>
						<Col>
							<Form.Control
								placeholder='Second number'
								type='password'
								value={secondNumber}
								onChange={(event) => setSecondNumber(event.target.value)}
								onKeyDown={(event) => onPressEnter(event)}
							/>
						</Col>
					</Row>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='text'
						value={sum}
						onChange={(event) => setSum(event.target.value)}
						onKeyDown={(event) => onPressEnter(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Button
						onClick={() => onCompute()}
						variant='primary'
						size='lg'
						disabled={isLoading}>
						{!!isLoading && (
							<Spinner
								as='span'
								animation='border'
								size='sm'
								role='status'
								aria-hidden='true'
							/>
						)}
						Verify
					</Button>
				</Form.Group>
			</Form>
			<Checksign isProved={isProved} />
		</div>
	);
}
