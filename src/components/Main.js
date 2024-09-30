import React, { Component } from 'react';
import tether from '../tether.png';
import Airdrop from './Airdrop';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '' // Keep track of the amount the user wants to stake
    };
  }

  handleInputChange = (event) => {
    this.setState({ amount: event.target.value }); // Update state with input value
  };

  handleStakeSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    let amount = window.web3.utils.toWei(this.state.amount, 'Ether');
    this.props.stakeTokens(amount); // Call the stakeTokens function from props
  };

  render() {
    return (
      <div id='content' className='mt-3'>
        <table className='table text-muted text-center'>
          <thead>
            <tr style={{ color: 'white' }}>
              <th scope='col'>Staking balance</th>
              <th scope='col'>Reward balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: 'white' }}>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
              <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
            </tr>
          </tbody>
        </table>

        <div className='card mb-2' style={{ opacity: '0.9' }}>
          <form className='mb-3' onSubmit={this.handleStakeSubmit}> {/* Add onSubmit handler */}
            <div style={{ borderSpacing: '0 1em' }}>
              
              {/* Stake Tokens label and Balance above input */}
              <div className='d-flex justify-content-between mb-2'>
                <label className='float-left' style={{ marginLeft: '15px' }}>
                  <b>Stake Tokens</b>
                </label>
                <span className='float-right' style={{ marginRight: '15px' }}>
                  Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} 
                </span>
              </div>

              {/* Input group for staking token and USDT image */}
              <div className='input-group mb-4' style={{ maxWidth: '300px' }}> {/* Restrict width of input field */}
                <input
                  type='text'
                  className='form-control'
                  placeholder='0'
                  required
                  value={this.state.amount}
                  onChange={this.handleInputChange}  // Handle input change
                  style={{ width: '50%' }}  
                />
                <div className='input-group-append'>
                  <span className='input-group-text' style={{ display: 'flex', alignItems: 'center' }}> {/* Ensure image aligns vertically */}
                    <img src={tether} alt='tether' height='24' style={{ marginRight: '5px' }} /> {/* Reduce image size */}
                    USDT
                  </span>
                </div>
              </div>

              {/* Deposit Button */}
              <div className='d-grid gap-2'>
                <button
                  type='submit'
                  className='btn btn-primary btn-lg btn-block'>
                  DEPOSIT
                </button>
              </div>
            </div>
          </form>

          {/* Withdraw Button */}
          <div className='d-grid gap-2'>
            <button
              className='btn btn-primary btn-lg btn-block'
              onClick={this.props.unstakeTokens}  // Call unstakeTokens on click
            >
              WITHDRAW
            </button>
          </div>

          {/* Airdrop */}
          <div className='card-body text-center' style={{ color: 'blue' }}>
            AIRDROP <Airdrop stakingBalance={this.props.stakingBalance}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
