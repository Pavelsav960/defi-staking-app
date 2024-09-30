// const solc = require('solc');

require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: 127.0.0.1)
      port: 7545,        // Ganache standard port (default: 7545)
      network_id: '*',   // Match any network id
    },
  },
  
  // Specify the directory for smart contracts and where to output ABI files
  contracts_directory: './src/contracts/', // Make sure the path is correct
  contracts_build_directory: './src/truffle_abis',

  // Configure compilers
  compilers: {
    solc: {
      version: '^0.5.1',  // Use a modern Solidity version (can be changed to the one you're using)
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,  // Optimization settings
        },
      },
    },
  },

  // Optional (depending on your needs): enabling babel transpilation if using modern JS features
  // but not necessary for newer versions of Node.js
  // plugins: ["truffle-plugin-verify"]
};
