# DeFi Staking Application

## Project Overview

The **DeFi Staking Application** is a decentralized finance (DeFi) project that enables users to stake Tether (USDT) tokens and earn rewards in Reward (RWD) tokens. The project leverages smart contracts deployed on the Ethereum blockchain to handle staking, reward distribution, and token management in a trustless and decentralized manner.

The app integrates with **MetaMask** to handle transactions securely, providing a user-friendly interface for staking, withdrawing, and viewing balances.

## Features

### 1. **Staking USDT**
Users can stake their USDT tokens through the Decentralized Bank smart contract. The amount staked is tracked, and users earn rewards based on their staked balance.

### 2. **Reward Token (RWD) Distribution**
Users receive RWD tokens as rewards for staking their USDT tokens. The more tokens staked, the more rewards users accumulate.

### 3. **Unstaking and Withdrawal**
Users can unstake their tokens and withdraw both their initial staked USDT and the earned RWD rewards.

### 4. **Airdrop Timer (Simulated)**
A simulated airdrop feature shows how additional tokens could be released based on a staking threshold and time.

### 5. **MetaMask Integration**
The application interacts with the blockchain using MetaMask for secure and easy transaction handling. Users sign transactions directly through their MetaMask wallet.

## Smart Contracts Overview

### 1. **Tether (USDT) Contract**
The Tether contract represents a mock implementation of USDT tokens. It tracks user balances and allows transfers for staking purposes.

### 2. **RWD Contract**
The RWD (Reward) contract mints the reward tokens distributed to users who stake USDT. The reward tokens are transferred to the users based on the staking balance.

### 3. **DecentralBank Contract**
This contract handles the core logic of the application:
- It manages the staking of USDT tokens.
- It tracks user staking balances.
- It issues RWD tokens as rewards to stakers.
- It allows users to unstake their USDT and withdraw rewards.

### 4. **Migrations Contract**
The Migrations contract is used by Truffle to manage the deployment of the smart contracts to the blockchain network.

### 5. **Script File for Reward Issuance**
The project includes a script that automatically issues RWD rewards to stakers. This can be triggered to simulate real-time reward distribution in a decentralized manner.

## Technology Stack

- **Frontend**: React.js
- **Blockchain**: Ethereum (via Ganache for local development)
- **Smart Contracts**: Solidity
- **Web3 Integration**: MetaMask
- **Development Framework**: Truffle Suite

## How the Application Works

1. **Stake USDT Tokens**: Users approve the DecentralBank contract to transfer USDT on their behalf and then stake their tokens.
2. **Earn Rewards**: As users stake, they automatically accumulate RWD tokens as rewards.
3. **Withdraw or Unstake**: Users can withdraw both their staked USDT and any accumulated RWD tokens.
4. **Simulated Airdrop**: A visual timer displays a countdown for when the airdrop feature could be triggered based on staking conditions.

## Running the Project Locally

1. Clone the repository.
   ```bash
   git clone https://github.com/Pavelsav960/defi-staking-app.git
   cd defi-staking-app

2. Install dependencies.
```bash
npm install.
```

3.Start the local Ethereum blockchain(Ganache).
```bash
ganache-cli
```
4.Compile and deploy the smart contracts using Truffle.
```bash
truffle migrate --reset
```
5.Start the React frontend.
```bash
npm start
```


![DeFi Staking Application](https://github.com/user-attachments/assets/5376aa3b-cfd9-4ed7-b87d-9ca98fcb6b7b)




