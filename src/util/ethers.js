import { ethers } from 'ethers'

// 智能合约ABI
const tokenABI = require('./abi/token-abi.json')
const mdexFactoryABI = require('./abi/heco/mdexFactory-abi.json')
const mdexRouterABI = require('./abi/heco/mdexRouter-abi.json')
const mdexPairABI = require('./abi/heco/mdexPair-abi.json')
const dogFactoryABI = require('./abi/heco/dogFactory-abi.json')
const dogPairABI = require('./abi/heco/dogPair-abi.json')
const dogRouterABI = require('./abi/heco/dogRouter-abi.json')
const pancakeFactoryABI = require('./abi/bsc/pancakeFactory-abi.json')
const pancakePairABI = require('./abi/bsc/pancakePair-abi.json')
const pancakeRouterABI = require('./abi/bsc/pancakeRouter-abi.json')
const pippiFactoryABI = require('./abi/heco/pippiFactory-abi.json')
const pippiRouterABI = require('./abi/heco/pippiRouter-abi.json')
const pippiPairABI = require('./abi/heco/pippiPair-abi.json')
const bakerySwapFactoryABI = require('./abi/bsc/bakerySwapFactory-abi.json')
const bakerySwapPairABI = require('./abi/bsc/bakerySwapPair-abi.json')
const bakerySwapRouterABI = require('./abi/bsc/bakerySwapRouter-abi.json')
const bscMdexFactoryABI = require('./abi/bsc/mdexFactory-abi.json')
const bscMdexRouterABI = require('./abi/bsc/mdexRouter-abi.json')
const bscMdexPairABI = require('./abi/bsc/mdexPair-abi.json')
const abiMap = {
  heco: {
    rpcProvider: 'https://http-mainnet.hecochain.com',
    mdex: {
      factory: mdexFactoryABI,
      router: mdexRouterABI,
      pair: mdexPairABI
    },
    dogSwap: {
      factory: dogFactoryABI,
      router: dogRouterABI,
      pair: dogPairABI
    },
    pippiSwap: {
      factory: pippiFactoryABI,
      router: pippiRouterABI,
      pair: pippiPairABI
    }
  },
  bsc: {
    rpcProvider: 'https://bsc-dataseed1.binance.org',
    pancakeSwap: {
      factory: pancakeFactoryABI,
      router: pancakeRouterABI,
      pair: pancakePairABI
    },
    bakerySwap: {
      factory: bakerySwapFactoryABI,
      router: bakerySwapRouterABI,
      pair: bakerySwapPairABI
    },
    mdex: {
      factory: bscMdexFactoryABI,
      router: bscMdexRouterABI,
      pair: bscMdexPairABI
    }
  }
}

// 钱包
let wallet

let nonce

/**
 * 连接钱包
 *
 * @param chain
 * @param privateKey
 * @returns {string}
 */
export const connectWalletEthers = (chain, privateKey) => {
  const rpcProvider = abiMap[chain].rpcProvider
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider)
  wallet = new ethers.Wallet(privateKey, provider)
  console.log('[Ethers] Wallet address: ', wallet.address)
  var transactionCountPromise = provider.getTransactionCount(wallet.address)
  transactionCountPromise.then(function (result) {
    nonce = result
  })
  return wallet
}

/**
 * 获取通证总供应量
 *
 * @param contractAddress
 * @param callback
 * @returns {Promise<void>}
 */
export const totalSupply = async (contractAddress) => {
  if (wallet === undefined) {
    console.warn('wallet not init.')
    return
  }
  const contractWithSigner = new ethers.Contract(contractAddress, tokenABI, wallet)
  const totalSupply = await contractWithSigner.totalSupply()
  console.log('totalSupply:', totalSupply.toString())
  return totalSupply
}

/**
 * 获取交易对的token0
 *
 * @param chain
 * @param swap
 * @param pairContractAddress
 * @returns {Promise<unknown>}
 */
export const getToken0 = (chain, swap, pairContractAddress) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  console.log('[Ether] GetToken0 params:', pairContractAddress, wallet)
  const contractWithSigner = new ethers.Contract(pairContractAddress, getPairABI(chain, swap), wallet)
  return contractWithSigner.token0().then(result => {
    console.log('[Ether] GetToken0 success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetToken0 error, reason:', reason)
    return null
  })
}

/**
 * 获取交易对的token1
 *
 * @param chain
 * @param swap
 * @param pairContractAddress
 * @returns {Promise<unknown>}
 */
export const getToken1 = (chain, swap, pairContractAddress) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  console.log('[Ether] GetToken0 params:', pairContractAddress, wallet)
  const contractWithSigner = new ethers.Contract(pairContractAddress, getPairABI(chain, swap), wallet)
  return contractWithSigner.token1().then(result => {
    console.log('[Ether] GetToken1 success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetToken1 error, reason:', reason)
    return null
  })
}

/**
 * 获取通证的精度
 *
 * @param tokenContractAddress
 * @returns {Promise<unknown>}
 */
export const getDecimals = (tokenContractAddress) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  const contractWithSigner = new ethers.Contract(tokenContractAddress, tokenABI, wallet)
  return contractWithSigner.decimals().then(result => {
    console.log('[Ether] GetDecimals success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetDecimals error, reason:', reason)
    return null
  })
}

/**
 * 获取通证的简称
 *
 * @param tokenContractAddress
 * @returns {Promise<unknown>}
 */
export const getSymbol = (tokenContractAddress) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  const contractWithSigner = new ethers.Contract(tokenContractAddress, tokenABI, wallet)
  return contractWithSigner.symbol().then(result => {
    console.log('[Ether] GetSymbol success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetSymbol error, reason:', reason)
    return null
  })
}

export const getPair = (chain, swap, factoryContract, tokenAContract, tokenBContract) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  const contractWithSigner = new ethers.Contract(factoryContract, getFactoryABI(chain, swap), wallet)
  return contractWithSigner.getPair(tokenAContract, tokenBContract).then(result => {
    console.log('[Ether] GetPair contract success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetPair contract error, reason:', reason)
    return null
  })
}

/**
 * A/B交易对中卖出A资产，计算买进的B资产的数量。
 *
 * @param chain
 * @param swap
 * @param routerContract
 * @param purchaseAmountIn
 * @param reserveIn
 * @param reserveOut
 * @returns {Promise<void>}
 */
export const getPurchaseAmountOut = (chain, swap, routerContract, purchaseAmountIn, reserveIn, reserveOut) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  const contractWithSigner = new ethers.Contract(routerContract, getRouterABI(chain, swap), wallet)
  return contractWithSigner.getAmountOut(purchaseAmountIn, reserveIn, reserveOut).then(result => {
    console.log('[Ether] GetPurchaseAmountOut success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] GetPurchaseAmountOut error, reason:', reason)
    return null
  })
}

export const swap = (chain, swap, contractAddress, purchaseAmountIn, purchaseAmountOutMin, path, deadline, gas) => {
  if (wallet === undefined) {
    console.warn('[Ether] Wallet not init.')
    return new Promise(function (resolve, reject) {
      reject(new Error('[Ether] Wallet not init.'))
    })
  }
  const contractWithSigner = new ethers.Contract(contractAddress, getRouterABI(chain, swap), wallet)
  // let txFeeInWei = 0
  // provider.getGasPrice().then((gasPrice) => {
  //   // gasPrice is a BigNumber; convert it to a decimal string
  //   // Sending a transaction to an externally owned account (EOA) is 21000 gas)
  //   // txFeeInWei = gasPrice
  //   console.log('current gas price: ' + gasPrice.toString())
  // })
  const config = {
    nonce: nonce++,
    gasLimit: 400000,
    gasPrice: ethers.utils.parseUnits(gas, 'gwei')
  }
  return contractWithSigner.swapExactTokensForTokens(purchaseAmountIn, purchaseAmountOutMin, path, wallet.address, deadline, config).then(result => {
    console.log('[Ether] Swap success, result:', result)
    return result
  }).catch(reason => {
    console.warn('[Ether] Swap error, reason:', reason)
    return null
  })
}

function getFactoryABI (chain, swap) {
  return abiMap[chain][swap].factory
}

function getRouterABI (chain, swap) {
  return abiMap[chain][swap].router
}

function getPairABI (chain, swap) {
  return abiMap[chain][swap].pair
}
