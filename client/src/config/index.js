import Web3 from 'web3';
import verifier_abi from '../contracts/verifierABI.sol.json';

export const serverUri = `http://localhost:5000`;

export const web3 = new Web3(
	new Web3.providers.WebsocketProvider(
		`wss://rinkeby.infura.io/ws/v3/fcba35ab93d548cba21391640fcb4c2b`
	)
);

export const VerifierContract = new web3.eth.Contract(
	verifier_abi,
	`0x600c3dC2568d97D85082bE1110f7a9dC52C2123C`
);

export const testWeb3Connection = () => {
	web3.eth.net
		.isListening()
		.then(() => console.log(`Web3 is connected`))
		.catch((err) => console.log(`Error: ${err}`));
};
