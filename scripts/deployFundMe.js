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

    // Wait for 5 confirmations and 1 minute for Etherscan to index the contract
    console.log("Waiting for 5 confirmations and Etherscan indexing...");
    await fundMe.deploymentTransaction().wait(5);
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds

    console.log("Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
        address: fundMe.target,
        constructorArguments: [ 10 ],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });