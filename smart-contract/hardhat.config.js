require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    polygon_amoy:{
      // url:"https://eth-goerli.g.alchemy.com/v2/IMsKGIGsekapyhhiAkuml6OX-eriF-l-",
      url:"https://polygon-amoy.g.alchemy.com/v2/Y3Gbnp-Hr5KRa_xvWCboAxb41hWABRXm",
      chainId: 80002,
      accounts: ["6a69b0f0f97b30b6f0baff3e755bc9b1ed9790a9710579da228f202eb16f42dc"],
      //allowUnlimitedContractSize: true,
      //gas: 5000000, 
      gasPrice: 50000000000
    }
  }
};
