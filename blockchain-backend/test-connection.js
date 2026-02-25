const { ethers } = require("hardhat");

async function testConnection() {
  try {
    console.log("🔍 Testing contract connection...");
    
    // Get the contract
    const ThenulaToken = await ethers.getContractFactory("ThenulaToken");
    const contract = ThenulaToken.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    
    // Test basic functions
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    
    console.log("✅ Contract connected successfully!");
    console.log(`📛 Token Name: ${name}`);
    console.log(`🔤 Symbol: ${symbol}`);
    console.log(`💰 Total Supply: ${ethers.formatEther(totalSupply)} ${symbol}`);
    
    // Get first account balance
    const [signer] = await ethers.getSigners();
    const balance = await contract.balanceOf(signer.address);
    console.log(`👛 First Account Balance: ${ethers.formatEther(balance)} ${symbol}`);
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testConnection();
