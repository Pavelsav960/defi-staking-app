const assert = require('assert');  // Node.js assert

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai').use(require('chai-as-promised')).should();

contract('DecentralBank', ([owner,customer]) => {

  let tether,rwd , decentralBank;


  function tokens(number){
    return web3.utils.toWei(number,'ether');
  }

  before(async()=>{
    //load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);


    //transfer all token to DecemtralBank(1 million);
    await rwd.transfer(decentralBank.address, tokens('1000000'));

    //transfer 100 mock tethers to customer
    await tether.transfer(customer,tokens('100'), {from:owner});


  })

  describe('Mock Tether Deployment', async () => {
    it('matches name successfully', async () => {
      
      const name = await tether.name(); // Make sure to await the call
      assert.equal(name, 'Mock Tether Token'); // Correct the typo: "equall" -> "equal"
    });
  });
  
  describe('Reward Token Deployment',async()=>{
    it('matches name successfully',async()=>{
      
      const name = await rwd.name();
      assert.equal(name,'Reward Token');
    });
  });


  describe('Decentral Bank Deployment',async()=>{
    it('matches name successfully',async()=>{
      
      const name = await decentralBank.name();
      assert.equal(name,'Decentral Bank');
    });

    it('contract has tokens' , async()=>{
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance , tokens('1000000'));
    })

  });
})
