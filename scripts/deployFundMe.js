// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat");

async function main(){
    //create factory 
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("Deploying contract...");
    //deploy contract
    const fundMe = await fundMeFactory.deploy(10);
    await fundMe.waitForDeployment();
    console.log("contract has been deployed to:", fundMe.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });