import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from 'hardhat/types'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000
      }
    },
    ropsten: {
      chainId: chainIds.ropsten,
      url: "https://eth-ropsten.alchemyapi.io/v2/" + ALCHEMY_KEY,
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
      },
    },
    mainnet: {
      chainId: chainIds.mainnet,
      url: "https://eth-mainnet.alchemyapi.io/v2/" + ALCHEMY_KEY,
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
      }
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.7.0"
      },
      {
        version: "0.8.0"
      }
    ]
  },
};

export default config;
