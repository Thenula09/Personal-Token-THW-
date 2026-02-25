const hre = require("hardhat");

async function main() {
  // Contract එක හඳුනා ගැනීම
  const ThenulaToken = await hre.ethers.getContractFactory("ThenulaToken");
  
  // Deploy කිරීම
  const token = await ThenulaToken.deploy();

  await token.waitForDeployment();

  console.log("Thenula Token (THW) deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
