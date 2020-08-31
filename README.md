# Zokrates demo app

![CI/CD](https://github.com/andrejrakic/zokrates-demo/workflows/CI/CD/badge.svg?branch=master)

## Running

_make sure to install necessary dependencies_ 


``` cd ./server && npm start ```


``` cd ./client && yarn start ```

## About the app

Developed using Zokrates plugin for Remix IDE

#### 1) Zok file

main.zok

     def main(private field firstNumber, private field secondNumber, field sum) -> (field):

        field result = if firstNumber + secondNumber == sum then 1 else 0 fi

        return result


#### 2) Verifier smart contract

verifier.sol is available on **Rinkeby** test net at ``` 0x600c3dC2568d97D85082bE1110f7a9dC52C2123C ```

Navigate to smart contract [via Etherscan](https://rinkeby.etherscan.io/address/0x600c3dc2568d97d85082be1110f7a9dc52c2123c#code)

#### 3) Flow

Server on start compiles zok file, does a setup (creates a proving key and a verification key pair).

After User input data on client side and press **Compute** button, request to server is being send. 

Server then does a computation and generates proof which sends back to client as a response. 

Client then uses proof as an argument to call smart contract's ```verifyTx``` function and after a response from blockchain displays to User success or failed verification.
