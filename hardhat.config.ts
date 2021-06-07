import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from 'hardhat/types'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000
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
