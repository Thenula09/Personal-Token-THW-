# THW (Thenula Hansaja Wanniarachchi) Token Dashboard
<img width="1536" height="1024" alt="ChatGPT Image Feb 25, 2026 at 07_14_47 PM" src="https://github.com/user-attachments/assets/15f5ee24-0a39-4c3a-9f86-68f58e5a000e" />
A professional blockchain-based token management system for Thenula Hansaja Company Private Limited. Built with Next.js, React, and Ethereum smart contracts.


## 🚀 Features

### Frontend (Next.js)
- ** Welcome Page** - Professional company branding with animated backgrounds
- **Token Dashboard** - Real-time balance display and management
- **Transfer Functionality** - Send THW tokens to any wallet address
- **Transaction History** - Complete record of all transactions
- **MetaMask Integration** - Seamless wallet connectivity
- **Responsive Design** - Works on all devices
##
# Backend (Hardhat)
- **THW Token Smart Contract** - ERC20 compliant token
- **Local Blockchain** - Hardhat network for testing
- **Test Accounts** - 20 pre-funded accounts with 10,000 ETH each
- **Contract Deployment** - Automated deployment scripts

## 🛠️ Technology Stack

### Frontend
- **Next.js 16.1.6** - React framework
- **TypeScript** - Type-safe development
- **TailwindCSS** - Modern styling
- **Ethers.js** - Ethereum interaction
- **Lucide React** - Beautiful icons

### Backend
- **Hardhat** - Ethereum development environment
- **Solidity** - Smart contract programming
- **OpenZeppelin** - Secure contract standards

## 📁 Project Structure

```
thenula-token-project/
├── blockchain-backend/           # Smart contract and blockchain
│   ├── contracts/
│   │   └── ThenulaToken.sol     # THW Token smart contract
│   ├── scripts/
│   │   └── deploy.js           # Contract deployment script
│   ├── hardhat.config.js       # Hardhat configuration
│   └── package.json            # Backend dependencies
├── web-frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Main dashboard page
│   │   │   ├── layout.tsx      # App layout
│   │   │   └── globals.css     # Global styles
│   │   ├── components/
│   │   │   ├── WelcomePage.tsx # Beautiful landing page
│   │   │   ├── TransferForm.tsx # Token transfer form
│   │   │   ├── HeroSection.tsx # Hero section component
│   │   │   └── AboutSection.tsx # About section
│   │   ├── context/
│   │   │   └── WalletContext.tsx # Wallet state management
│   │   └── utils/
│   │       └── constants.ts    # Contract constants and ABI
│   ├── public/                 # Static assets
│   ├── package.json           # Frontend dependencies
│   └── next.config.ts         # Next.js configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension

### 1. Clone the Repository
```bash
git clone https://github.com/Thenula09/laughing-rotary-phone.git
cd laughing-rotary-phone
```

### 2. Setup Backend (Hardhat)
```bash
cd blockchain-backend
npm install
```

### 3. Deploy Smart Contract
```bash
npx hardhat node
# Keep this running in a separate terminal

# In another terminal:
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Setup Frontend
```bash
cd ../web-frontend
npm install
```

### 5. Run the Application
```bash
npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend**: http://127.0.0.1:8545

## 📋 Setup Instructions

### MetaMask Configuration
1. Install MetaMask browser extension
2. Add Hardhat Network:
   - **Network Name**: Hardhat
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

### Import Test Account
Use any of the pre-funded accounts from Hardhat output:
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

## 🎯 How to Use

### 1. Welcome Page
- View the beautiful company landing page
- See THW token growth chart
- Click "Connect Wallet" to get started

### 2. Dashboard Features
- **Token Balance**: View your THW token holdings
- **Send Tokens**: Transfer THW to any wallet address
- **Transaction History**: Track all your transactions
- **Wallet Details**: View your connected wallet information

### 3. Making Transactions
1. Connect your MetaMask wallet
2. Enter recipient wallet address
3. Enter amount to send
4. Confirm transaction in MetaMask
5. View transaction in history

## 🔧 Configuration

### Contract Address
The deployed THW Token contract address:
```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Environment Variables
Create `.env.local` in web-frontend directory:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
```

## 🌟 Key Features Explained

### Welcome Page
- **Company Branding**: "Thenula Hansaja Company Private Limited"
- **Token Growth Chart**: Visual representation of THW performance
- **Call-to-Action**: Clear navigation to dashboard
- **Professional Design**: Gradient backgrounds and animations

### Token Management
- **ERC20 Standard**: Compatible with all major exchanges
- **Total Supply**: 1,000,000 THW tokens
- **Decimals**: 18 decimal places
- **Transfer Function**: Secure token transfers

### Security Features
- **MetaMask Integration**: Secure wallet connection
- **Hardhat Network**: Safe testing environment
- **Input Validation**: Prevents invalid transactions
- **Error Handling**: Clear error messages

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Push to GitHub repository
2. Connect Vercel to your GitHub account
3. Import the repository
4. Deploy automatically

### Backend Deployment
For production, consider:
- **Ethereum Mainnet**: Real blockchain deployment
- **Polygon**: Low-cost alternative
- **Testnets**: Sepolia, Goerli for testing

## 📊 Token Information

- **Name**: Thenula Token
- **Symbol**: THW
- **Type**: ERC20
- **Total Supply**: 1,000,000 THW
- **Decimals**: 18

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section
- Review the setup instructions
- Ensure MetaMask is properly configured

## 🔍 Troubleshooting

### Common Issues

**"Contract not connected"**
- Ensure Hardhat node is running
- Check contract address is correct
- Verify MetaMask network settings

**"Transaction failed"**
- Check wallet has enough ETH for gas
- Verify recipient address is valid
- Ensure contract is deployed

**"MetaMask not installed"**
- Install MetaMask browser extension
- Refresh the page after installation

### Development Tips
- Keep Hardhat node running during development
- Use test accounts for testing
- Clear browser cache if issues persist
- Check browser console for errors

---

**Built with ❤️ by Thenula Hansaja Company Private Limited**
