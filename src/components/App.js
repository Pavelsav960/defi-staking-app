import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Web3 from 'web3';  // Corrected import
import Tether from '../truffle_abis/Tether.json';  // Corrected import for Tether
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main.js'
import ParticleSettings from './ParticleSettings.js'

class App extends Component {
  // Method to load Web3 and check for MetaMask or Ethereum provider
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });  // Corrected MetaMask account request
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No Ethereum browser detected! Check out MetaMask!');
    }
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    console.log(networkId, 'Network ID');

    // Load Tether Contract:
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);  // Use `window.web3` instead of `Web3`
      this.setState({ tether });
      let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      console.log({ balance: tetherBalance });
    } else {
      window.alert('Error! Tether Contract not deployed - no detected network!');
    }

     // Load RWD Contract:
     const rwdData = RWD.networks[networkId];
     if (rwdData) {
       const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);  // Use `window.web3` instead of `Web3`
       this.setState({ rwd });
       let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
       this.setState({ rwdBalance: rwdBalance.toString() });
       console.log({ balance: rwdBalance });
     } else {
       window.alert('Error! RWD Contract not deployed - no detected network!');
     }

     // Load decentral Bank Contract:
     const decentralBankData = DecentralBank.networks[networkId];
     if (decentralBankData) {
       const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);  
       this.setState({ decentralBank });
       let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
       this.setState({ stakingBalance: stakingBalance.toString() });
       console.log({ balance: stakingBalance });
     } else {
       window.alert('Error! Decentral Bank Contract not deployed - no detected network!');
     }

     this.setState({loading:false})

  }


  //two function , one that stakes and one that unstakes
  //leverage our decentralBank contract - deposit tokens and unstakign

  stakeTokens = (amount) => {
    this.setState({ loading: true });

  
    // Approve tokens first
    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        // Once approval succeeds, deposit tokens
        this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on('transactionHash', (hash) => {
            this.setState({ loading: false });
          })
          .on('error', (error) => {
            console.error("Transaction failed:", error);
            this.setState({ loading: false });  // Stop loading on failure
          });
      })
      .on('error', (error) => {
        console.error("Approval failed:", error);
        this.setState({ loading: false });  // Stop loading on approval failure
      });
  }

  unstakeTokens = () => {
    this.setState({ loading: true });
  
    this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
      })
      .on('error', (error) => {
        console.error("Transaction failed:", error);
        this.setState({ loading: false });  // Stop loading on failure
      });
  }
  
  


  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',  // Initial state for account
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true,
    };
  }


  
  render() {
    let content;
    if (this.state.loading) {
      content = <p id='loader' className='text-center' style={{ margin: '30px', color:'white' }}>LOADING PLEASE WAIT...</p>;
    } else {
      content = <Main 
      tetherBalance = {this.state.tetherBalance}
      rwdBalance = {this.state.rwdBalance}
      stakingBalance = {this.state.stakingBalance}
      stakeTokens = {this.stakeTokens}
      unstakeTokens={this.unstakeTokens}  // Pass the unstakeTokens function
      />;
    }

    return (
      <div className='App' style={{position:'relative'}}>
        <div style={{position:'absolute'}}>
          <ParticleSettings/>
        </div>
        
        <Navbar account={this.state.account} />
        <div className='container-fluid mt-5'>
          <div className='row'>
            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vh' }}>
              <div>
                {content} {/* Display content based on loading state */}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
}

}

export default App;
