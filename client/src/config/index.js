import Web3 from 'web3';
import verifier_abi from '../contracts/verifierABI.sol.json';

const verifierContractAddress = `0x600c3dC2568d97D85082bE1110f7a9dC52C2123C`;
const infuraId = `fcba35ab93d548cba21391640fcb4c2b`;

export const serverUri = `http://localhost:5000`;

export const web3 = new Web3(
	new Web3.providers.WebsocketProvider(
		`wss://rinkeby.infura.io/ws/v3/${infuraId}`
	)
);

export const VerifierContract = new web3.eth.Contract(
	verifier_abi,
	verifierContractAddress
);

export const testWeb3Connection = () => {
	web3.eth.net
		.isListening()
		.then(() => console.log(`Web3 is connected`))
		.catch((err) => alert(`Web3 Error: ${err}`));
};
