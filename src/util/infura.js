import Web3 from 'web3'

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
// web3实例
// eslint-disable-next-line no-unused-vars
let web3
// 链接钱包的账户
// eslint-disable-next-line no-unused-vars
let account

export const connectWalletWeb3 = () => {
  /*
  * 1. Check for injected web3 (mist/metamask)
  * 2. If metamask/mist create a new web3 instance and pass on result
  * 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
  * 4. Get user account from metamask
  * 5. Get user balance
  */
  const infura = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    if (window.ethereum !== undefined) {
      // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
      window.ethereum.enable()
        .then(function (accounts) {
          var web3 = new Web3(window.ethereum)
          console.log('[Infura] Wallet address:', accounts)
          resolve({
            account: accounts[0],
            web3 () {
              return web3
            }
          })
        })
        .catch(function (reason) {
          // 如果用户拒绝了登录请求
          if (reason === 'User rejected provider access') {
            // 用户拒绝登录后执行语句；
            reject(new Error('User rejected provider access.'))
          } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            reject(new Error('There was an issue signing you in.'))
          }
        })
    } else {
      // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
      reject(new Error('Unable to connect to Metamask'))
    }
  })

  return infura.then(result => {
    account = result.account
    web3 = result.web3()
    return result
  }).catch(() => {
    return null
  })
}

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getTokenBalance = (token, account) => {
  if (web3 === undefined) {
    console.error('web3 not init.')
    return new Promise()
  }
  const tokenContract = new web3.eth.Contract(tokenABI, token)
  return tokenContract.methods.balanceOf(account).call()
}

export const monitorLPReserveByFactory = (chain, swap, factoryContract, reserveA, reserveB) => {
  if (web3 === undefined) {
    console.error('[Infura] Web3 not init.')
    return new Promise()
  }
  const tokenContract = new web3.eth.Contract(getFactoryABI(chain, swap), factoryContract)
  console.log('[Infura] reserveA:', reserveA, ', reserveB:', reserveB)
  return tokenContract.methods.getReserves(reserveA, reserveB).call()
}

export const monitorLPReserveByPair = (chain, swap, pairContract) => {
  if (web3 === undefined) {
    console.error('[Infura] Web3 not init.')
    return new Promise()
  }
  const tokenContract = new web3.eth.Contract(getPairABI(chain, swap), pairContract)
  return tokenContract.methods.getReserves().call()
}

export const subscribeTransfer = (token, callback) => {
  if (web3 === undefined) {
    console.warn('[Infura] Web3 not init.')
    callback(undefined, undefined, '[Infura] Web3 not init.')
    return
  }
  const tokenContract = new web3.eth.Contract(tokenABI, token)
  // eslint-disable-next-line handle-callback-err
  tokenContract.events.Transfer({}, function (error, event) {
  }).on('data', function (event) {
    // 与上述可选的回调结果相同
    callback(event, undefined, undefined)
  }).on('changed', function (event) {
    // remove event from local database
    // 当事件从区块链上移除时触发。 该事件带有额外属性 "removed: true"。
    // ignore
  }).on('error', function (error) {
    // 当订阅中出现错误时触发。
    console.error('[Infura] SubscribeTransfer error: ', error)
    callback(undefined, undefined, error)
  }).on('connected', function (subscriptionId) {
    // 当订阅成功连接时触发一次。返回订阅 id。
    console.log('[Infura] SubscribeTransfer connected, subscriptionId: ', subscriptionId)
    callback(undefined, subscriptionId, undefined)
  })
}

function getFactoryABI (chain, swap) {
  return abiMap[chain][swap].factory
}

function getPairABI (chain, swap) {
  return abiMap[chain][swap].pair
}
