<template>
  <div>
    <div id="horoscope" class="horoscope">
      <div class="container">
        <div class="partition">
          <div class="image"></div>
          <span class="title">占星系统</span>
        </div>
        <div class="nes-container with-title is-centered monitor-tokens">
          <p class="title">监听通证列表</p>
          <label v-bind:for="['private-key']"><p>钱包私钥 : </p></label>
          <input type="text" v-bind:id="['private-key']" class="nes-input is-dark"
                 v-bind:placeholder="['请输入钱包私钥']" v-model="privateKey">
          <label v-bind:for="['chain']"><p>钱包私钥 : </p></label>
          <input type="text" v-bind:id="['chain']" class="nes-input is-dark"
                 v-bind:placeholder="['请输入生态链']" v-model="chain">
          <button type="button" class="nes-btn is-primary" v-on:click="initWallet()">初始化钱包</button>
          <button type="button" class="nes-btn is-error" v-on:click="subscribeAllTokenTransfer()">一键开启监听</button>
          <button type="button" class="nes-btn is-error" v-on:click="tryPushWechat()">监听测试</button>
          <div class="token-manager" v-for="(token) in tokens" v-bind:key="token.tokenName">
            <div class="token-info">
              <p>通证名称</p>：{{token.tokenName}}<br>
              <p>通证合约</p>：{{token.tokenContract}}<br>
              <p>监听key</p>：{{token.key}}<br>
              <div v-if="swapConfig[token.chain][token.swap].factoryContract">
                <p>LP流动性</p>：{{(token.lpTokenName || 'loading...') + ' : ' + (token.lpReserveAReadable || 'loading...')}} / {{token.tokenName + ':' +
                (token.lpReserveBReadable || 'loading...')}}
              </div>
            </div>
            <div class="purchase">
              <div class="purchase-info" v-if="swapConfig[token.chain][token.swap].factoryContract">
                <div style="background-color:#212529; padding: 1rem;">
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_' + token.tokenName]" style="color:#fff;"><p>{{(token.lpTokenName || 'loading...')}} : </p></label>
                    <input type="text" v-bind:id="['inline_field_' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入购买' + (token.lpTokenName || 'loading...') + '花费']" v-model="token.purchaseAmountIn">
                  </div>
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_slippage' + token.tokenName]" style="color:#fff;"><p>滑点 : </p></label>
                    <input type="text" v-bind:id="['inline_field_slippage' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入购买滑点']" v-model="token.slippage">
                  </div>
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_minLPReserve' + token.tokenName]" style="color:#fff;"><p>触发交易LP流动性最小值 : </p></label>
                    <input type="text" v-bind:id="['inline_field_minLPReserve' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入触发交易LP流动性最小值']" v-model="token.minLPReserve">
                  </div>
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_purchaseNum' + token.tokenName]" style="color:#fff;"><p>当前购买次数 : </p></label>
                    <input type="text" v-bind:id="['inline_field_purchaseNum' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入自动购买次数']" v-model="token.purchaseNum">
                  </div>
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_purchaseLimit' + token.tokenName]" style="color:#fff;"><p>自动购买次数 : </p></label>
                    <input type="text" v-bind:id="['inline_field_purchaseLimit' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入自动购买次数']" v-model="token.purchaseLimit">
                  </div>
                  <div class="nes-field is-inline">
                    <label v-bind:for="['inline_field_tokenPriceLimit' + token.tokenName]" style="color:#fff;"><p>限价交易 : </p></label>
                    <input type="text" v-bind:id="['inline_field_tokenPriceLimit' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入限价' + (token.lpTokenName || 'loading...')]" v-model="token.tokenPriceLimit">
                  </div>
                  <div class="nes-field is-inline">
                    <label style="color:#fff;"><p>{{token.tokenName}} 购买数量 : </p>{{token.purchaseAmountOut}}</label>
                  </div>
                </div>
                <div style="background-color:#212529; padding: 1rem;" class="nes-field is-inline lazyPurchase">
                  <div class="nes-field is-inline">
                    <label v-bind:for="['one-click-token-contract' + token.tokenName]" style="color:#fff;"><p>购买通证合约 : </p></label>
                    <input type="text" v-bind:id="['one-click-token-contract' + token.tokenName]" class="nes-input is-dark"
                           v-bind:placeholder="['请输入购买的通证合约']" v-model="token.tokenContract">
                  </div>
                  <div>
                    <button type="button" class="nes-btn is-primary" v-on:click="lazyPurchase(token)">一键开启自动购买</button>
                  </div>
                </div>
                <div class="purchase-status">
                  自动购买: {{token.autoPurchase ? '开启' : '关闭'}}<br>
                  是否已初始化: {{hasInit ? '已初始化' : '未初始化'}}
                </div>
                <div class="purchase-manager">
                  <button type="button" class="nes-btn is-primary" v-on:click="manulPurchase(token)">手动购买</button>
                  <button type="button" class="nes-btn is-success" v-on:click="autoPurchaseOpen(token)">开启自动购买</button>
                  <button type="button" class="nes-btn is-warning" v-on:click="autoPurchaseClose(token)">关闭自动购买</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nes-container with-title is-centered">
          <p class="title">状态监测</p>
          <p>{{heartbeat}}</p><br>
          <p>是否已执行测试：{{alreadyTest ? '是' : '否'}}</p>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#242431" fill-opacity="1"
              d="M0,64L48,96C96,128,192,192,288,186.7C384,181,480,107,576,74.7C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  import { getTokenBalance, monitorLPReserveByPair, subscribeTransfer, connectWalletWeb3 } from '../util/infura'
  import {
    getPurchaseAmountOut,
    swap,
    getToken0,
    getToken1,
    connectWalletEthers,
    getPair
  } from '../util/ethers'
  import { createDialog } from 'src/util/dialog'
  import BigNumber from 'bignumber.js'
  import { ethers } from 'ethers'

  export default {
    name: 'HomePage',
    components: {},
    data () {
      return {
        tokens: [
          {
            tokenName: 'Rabbit', // 通证简称
            tokenDecimals: '18',
            tokenContract: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41', // 通证合约，必传
            key: 'e286926df948477882476b7e9867bbb5', // 微信推送key
            // lpTokenContract: '', // 流动性交易对合约
            // lpTokenDecimals: '',
            // lpTokenName: '',
            chain: 'bsc',
            swap: 'mdex', // 交易所
            slippage: 0.05, // 滑点
            minLPReserve: 10000, // 池子最小通证量
            purchaseAmountInDetail: {
              HUSD: 0.1,
              BUSD: 300,
              USDT: 0.1,
              HT: 0.01,
              BNB: 0.56
            },
            tokenPriceLimit: 1, // 单价上限
            purchaseNum: 1, // 当前购买次数
            purchaseLimit: 2, // 购买总次数
            autoPurchase: false, // 是否自动购买
            mode: 'prune' // 购买模式，可选：standard、prune
          }
        ],
        heartbeat: 0,
        alreadyTest: false,
        hasInit: false,
        swapConfig: {
          heco: {
            gas: ['10', '200'], // 矿工费
            sTokens: [
              {
                contract: '0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047',
                decimal: '8',
                tokenName: 'HUSD'
              },
              {
                contract: '0xa71EdC38d189767582C38A3145b5873052c3e47a',
                decimal: '18',
                tokenName: 'USDT'
              }
            ],
            mdex: {
              factoryContract: '0xb0b670fc1F7724119963018DB0BfA86aDb22d941',
              routerContract: '0xed7d5f38c79115ca12fe6c0041abb22f0a06c300'
            },
            dogSwap: {
              factoryContract: '0x0419082bb45f47Fe5c530Ea489e16478819910F3',
              routerContract: '0x539A9Fbb81D1D2DC805c698B55C8DF81cbA6b350'
            },
            pippiSwap: {
              factoryContract: '0x979efE7cA072b72d6388f415d042951dDF13036e',
              routerContract: '0xBe4AB2603140F134869cb32aB4BC56d762Ae900B'
            }
          },
          bsc: {
            gas: ['10', '200'], // 矿工费
            sTokens: [
              {
                contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                decimal: '18',
                tokenName: 'BUSD'
              },
              {
                contract: '0x55d398326f99059ff775485246999027b3197955',
                decimal: '18',
                tokenName: 'USDT'
              },
              {
                contract: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                decimal: '18',
                tokenName: 'BNB'
              }
            ],
            pancakeSwap: {
              factoryContract: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
              routerContract: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
            },
            bakerySwap: {
              img: '',
              factoryContract: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
              routerContract: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F'
            },
            mdex: {
              img: '',
              factoryContract: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
              routerContract: '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8'
            }
          }
        },
        privateKey: null,
        chain: null,
        destoryAddress: '0x0000000000000000000000000000000000000000'
      }
    },
    methods: {
      lazyPurchase: async function (token) {
        const _this = this
        // 1、初始化钱包
        const initWalletResut = await _this.initWallet()
        if (!initWalletResut) {
          return
        }
        // 2、开启自动购买
        _this.autoPurchaseOpen(token)
        // 3、初始化lpPair合约
        token.pairContract = await _this.initLPPairContract(token)
        // 4、初始化通证基础信息
        await _this.initTokenInfo(token)
        // 6、开启订阅购买
        _this.subscribeTokenTransfer(token)
      },
      // 初始化lpPair合约
      initLPPairContract: async function (token) {
        const _this = this
        // 指定了LP Token合约，则通过该合约获取LP Pair合约
        if (token.lpTokenContract !== null && token.lpTokenContract !== undefined) {
          const sToken = {
            contract: token.lpTokenContract,
            decimal: token.lpTokenDecimals,
            tokenName: token.lpTokenName
          }
          const pairContract = await _this.getPairCore(token, sToken)
          if (pairContract !== null) {
            return pairContract
          } else {
            console.log('[BigBang] Attempt to obtain the LP Pair contract failed, try again...')
            return _this.initLPPairContract(token)
          }
        }
        // 通过其它token（ht、usdt、bnb）尝试获取LP Pair合约
        const pairContractPromises = _this.swapConfig[token.chain].sTokens.map(async sToken => {
          return await _this.getPairCore(token, sToken)
        })
        for (const pairContractPromise of pairContractPromises) {
          const pairContract = await pairContractPromise
          if (pairContract !== null) {
            return pairContract
          }
        }

        console.log('[BigBang] Attempt to obtain the LP Pair contract failed, try again...')
        return _this.initLPPairContract(token)
      },
      getPairCore: async function (token, sToken) {
        const _this = this
        if (sToken !== null && sToken !== undefined) {
          const [pairContract] = await Promise.all([
            getPair(token.chain, token.swap, _this.swapConfig[token.chain][token.swap].factoryContract, sToken.contract, token.tokenContract)
          ])
          if (pairContract !== null && pairContract !== undefined && pairContract !== _this.destoryAddress) {
            console.log('[BigBang] Try to obtain the LP Pair contract through', sToken.contract, 'success. pairContract', pairContract)
            if (token.pairContract !== null && token.pairContract !== undefined && token.pairContract !== _this.destoryAddress) {
              console.log('[BigBang] LP Pair contract already exists, skip.')
              return null
            }
            // 设置lp Pair contract
            token.pairContract = pairContract
            // 初始化lp token信息
            token.lpTokenContract = sToken.contract
            token.lpTokenDecimals = sToken.decimal
            token.lpTokenName = sToken.tokenName
            // 设置购买金额
            token.purchaseAmountIn = token.purchaseAmountInDetail[sToken.tokenName]
            return pairContract
          }
        }
        return null
      },
      initWallet: async function () {
        const _this = this
        if (this.privateKey === null) {
          const dialog = document.getElementById('private-key-unvalid-dialog')
          dialog.showModal()
          return false
        }
        // 1、通过私钥连接钱包
        const walletEthers = connectWalletEthers(this.chain, this.privateKey)
        // 钱包地址拦截
        // TODO 通过合约配置白名单
        if (walletEthers.address !== '0x3525Ac21Dd94C224e89899a6fe681003abeB2666' && walletEthers.address !== '0x1572a1600db74139Aae572fb901E9f3a8A6ef1a0') {
          const dialog = document.getElementById('wallet-deny-dialog')
          dialog.showModal()
          return false
        }
        this.$store.dispatch('walletEthers', walletEthers)
        const [walletWeb3] = await Promise.all([
          connectWalletWeb3()
        ])
        this.$store.dispatch('walletWeb3', walletWeb3)
        _this.account = _this.$store.state.account
        const dialog = document.getElementById('wallet-init-success-dialog')
        dialog.showModal()
        return true
      },
      autoPurchaseOpen: function (token) {
        token.autoPurchase = true
      },
      autoPurchaseClose: function (token) {
        token.autoPurchase = false
      },
      pushWechat: async function (key, tips, body) {
        this.$axios({
          method: 'post',
          url: 'http://push.ijingniu.cn/send',
          data: this.qs.stringify({
            key: key,
            head: tips,
            body: body
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept-Language': 'zh-CN,zh;q=0.9'
          }
        }).then((response) => {
          // 请求成功返回的数据
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          // 请求失败返回的数据
        })
      },
      manulPurchase: async function (token) {
        const _this = this
        if (!token.hasInit) {
          createDialog('通知', token.tokenName + '未初始化', '确认', token.tokenName + '.token-not-init-dialog')
          const subscribeTransferDialog = document.getElementById(token.tokenName + '.token-not-init-dialog')
          // Now dialog always acts like a native <dialog>.
          subscribeTransferDialog.showModal()
          return
        }
        if (_this.swapConfig[token.chain][token.swap].factoryContract === null || _this.swapConfig[token.chain][token.swap].factoryContract === undefined) {
          createDialog('通知', '未指定工厂合约', '确认', token.tokenName + '.factory-contract-not-set-dialog')
          const subscribeTransferDialog = document.getElementById(token.tokenName + '.factory-contract-not-set-dialog')
          // Now dialog always acts like a native <dialog>.
          subscribeTransferDialog.showModal()
          return
        }
        if (token.purchaseAmountIn === 0 || token.purchaseAmountIn === undefined) {
          createDialog('通知', '未设置购买金额', '确认', token.tokenName + '.purchase-not-set-dialog')
          const subscribeTransferDialog = document.getElementById(token.tokenName + '.purchase-not-set-dialog')
          // Now dialog always acts like a native <dialog>.
          subscribeTransferDialog.showModal()
          return
        }
        if (new BigNumber(token.lpReserveBReadable).lt(new BigNumber(token.minLPReserve))) {
          console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'less than minLPReserve', token.minLPReserve)
          return new Promise(function (resolve, reject) {
            reject(new Error('[BigBang] LP not enough.'))
          })
        }
        console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'more than minLPReserve', token.minLPReserve, ', purchase!!!')

        token.purchaseNum += 1
        _this.purchase(token)
      },
      purchase: async function (token) {
        const _this = this
        // A/B交易对中卖出A资产，计算买进的B资产的数量。
        const purchaseAmountInInWei = new BigNumber(token.purchaseAmountIn).multipliedBy(new BigNumber(10 ** token.lpTokenDecimals)).toFixed()
        if (token.mode === 'standard') {
          return getPurchaseAmountOut(token.chain, token.swap, _this.swapConfig[token.chain][token.swap].routerContract, purchaseAmountInInWei, token.lpReserveA, token.lpReserveB)
            .then(result => {
              if (result !== null) {
                token.purchaseAmountOut = new BigNumber(result.toString()).dividedBy(new BigNumber(10 ** token.tokenDecimals)).toFixed(5)
                const purchaseAmountOutMinInWei = new BigNumber(result.toString()).multipliedBy(token.slippage).toFixed(0)
                console.log('[BigBang] Purchase info, ' + token.tokenName, 'purchaseAmountIn:', token.purchaseAmountIn, ', purchaseAmountOut:', token.purchaseAmountOut, ', purchaseAmountOutMin:', new BigNumber(purchaseAmountOutMinInWei).dividedBy(new BigNumber(10 ** token.tokenDecimals)).toFixed(3))

                // 限价交易
                const tokenPrice = token.purchaseAmountIn / token.purchaseAmountOut
                console.log('[BigBang] Token price:', tokenPrice)
                if (tokenPrice > token.tokenPriceLimit) {
                  return new Promise(function (resolve, reject) {
                    reject(new Error('token price high, purchase cancel.'))
                  })
                }

                const now = new Date()
                var expireTime = new Date(now.getTime() + 1000 * 60 * 30).getTime()
                return swap(token.chain, token.swap, _this.swapConfig[token.chain][token.swap].routerContract, ethers.BigNumber.from(purchaseAmountInInWei),
                  ethers.BigNumber.from(purchaseAmountOutMinInWei), [token.lpTokenContract, token.tokenContract], expireTime, _this.swapConfig[token.chain].gas[0])
                  .then(result => {
                    if (result != null) {
                      return result
                    }
                  })
              }
            })
        } else {
          const now = new Date()
          var expireTime = new Date(now.getTime() + 1000 * 60 * 30).getTime()
          return swap(token.chain, token.swap, _this.swapConfig[token.chain][token.swap].routerContract, ethers.BigNumber.from(purchaseAmountInInWei),
            ethers.BigNumber.from(0), [token.lpTokenContract, token.tokenContract], expireTime, _this.swapConfig[token.chain].gas[1])
            .then(result => {
              if (result != null) {
                _this.swapConfig[token.chain].nonce = result.nonce
                return result
              }
            })
        }
      },
      initLPReserve: async function (token) {
        const _this = this
        if (_this.swapConfig[token.chain][token.swap].factoryContract !== null) {
          const [result] = await Promise.all([
            monitorLPReserveByPair(token.chain, token.swap, token.pairContract, token.lpTokenContract, token.tokenContract)
          ])
          token.lpReserveA = result._reserve0
          token.lpReserveB = result._reserve1
          token.lpReserveAReadable = new BigNumber(result._reserve0).div(new BigNumber(10 ** token.lpTokenDecimals)).toFixed(2)
          token.lpReserveBReadable = new BigNumber(result._reserve1).div(new BigNumber(10 ** token.tokenDecimals)).toFixed(2)
        }
      },
      initTokenInfo: async function (token) {
        // 1、根据交易对，获取交易对的通证合约地址
        const [token0Contract, token1Contract] = await Promise.all([
          getToken0(token.chain, token.swap, token.pairContract),
          getToken1(token.chain, token.swap, token.pairContract)
        ])

        // 2、本币合约决策
        if (token1Contract.toLowerCase() === token.tokenContract.toLowerCase()) {
          token.lpTokenContract = token0Contract
          token.tokenContract = token1Contract
        } else {
          token.lpTokenContract = token1Contract
          token.tokenContract = token0Contract
        }

        console.log('[BigBang] Token info,', 'tokenName:', token.tokenName, 'tokenContract:', token.tokenContract, 'lpTokenContract:', token.lpTokenContract, 'lpTokenName:', token.lpTokenName)
        token.hasInit = true
      },
      subscribeAllTokenTransfer: async function () {
        const _this = this
        _this.tokens.forEach(async function (token) {
          // 初始化lpPair合约
          token.pairContract = await _this.initLPPairContract(token)
          if (token.pairContract === null || token.pairContract === _this.destoryAddress) {
            const subscribeTransferDialog = document.getElementById('lp-token-pair-init-fail-dialog')
            // Now dialog always acts like a native <dialog>.
            subscribeTransferDialog.showModal()
            return
          }
          // 初始化通证基础信息
          if (token.hasInit === undefined || token.hasInit === null || !token.hasInit) {
            await _this.initTokenInfo(token)
          }
          _this.subscribeTokenTransfer(token)
        })
      },
      subscribeTokenTransfer: async function (token) {
        const _this = this
        console.log('[BigBang] Register token', token.tokenName, 'transaction event.')
        if (_this.$store.state.ethers === null) {
          createDialog('通知', '开启监听失败, 请设置私钥并初始化钱包', '确认', token.tokenName + '.subscribe-transfer-fail-dialog')
          const subscribeTransferFailDialog = document.getElementById(token.tokenName + '.subscribe-transfer-fail-dialog')
          subscribeTransferFailDialog.showModal()
          console.log('[BigBang] Failed to start monitoring, please set up the private key and initialize the wallet')
          return
        }
        subscribeTransfer(token.tokenContract, async function (event, subscriptionId, error) {
            if (error === undefined) {
              if (event !== undefined) {
                if (token.purchaseLimit <= 0 || !token.autoPurchase) {
                  console.log('[BigBang] ' + token.tokenName, '未开启自动购买')
                  return
                }
                // 1、lp流动性监控
                await _this.initLPReserve(token)
                while ((token.purchaseNum <= token.purchaseLimit) && token.autoPurchase) {
                  if (new BigNumber(token.lpReserveBReadable).lt(new BigNumber(token.minLPReserve))) {
                    console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'less than minLPReserve', token.minLPReserve)
                    return new Promise(function (resolve, reject) {
                      reject(new Error('[BigBang] LP not enough.'))
                    })
                  }
                  console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'more than minLPReserve', token.minLPReserve, ', purchase!!!')

                  token.purchaseNum += 1

                  // 2、自动买币
                  _this.purchase(token)

                  // 3、微信推送
                  _this.pushWechat(token.key, token.tokenName + '交易提醒', '')
                }
              } else if (subscriptionId !== undefined) {
                // lp流动性监控
                await _this.initLPReserve(token)

                // 订阅交易事件监听成功
                createDialog('通知', '开启' + token.tokenName + '监听成功, 注册ID:' + subscriptionId, '确认', token.tokenName + '.subscribe-transfer-dialog')
                const subscribeTransferDialog = document.getElementById(token.tokenName + '.subscribe-transfer-dialog')
                subscribeTransferDialog.showModal()

                // 针对不知道交易对合约的，监听后直接购买
                if (token.purchaseLimit <= 0 || !token.autoPurchase) {
                  console.log('[BigBang] ' + token.tokenName, 'Automatic purchase is not turned on')
                  return
                }
                while ((token.purchaseNum <= token.purchaseLimit) && token.autoPurchase) {
                  if (new BigNumber(token.lpReserveBReadable).lt(new BigNumber(token.minLPReserve))) {
                    console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'less than minLPReserve', token.minLPReserve)
                    return new Promise(function (resolve, reject) {
                      reject(new Error('[BigBang] LP not enough.'))
                    })
                  }
                  console.log('[BigBang] LPReserveBReadable', token.lpReserveBReadable, 'more than minLPReserve', token.minLPReserve, ', purchase!!!')

                  token.purchaseNum += 1

                  // 2、自动买币
                  _this.purchase(token)

                  // 3、微信推送
                  _this.pushWechat(token.key, token.tokenName + '交易提醒', '')
                }
              }
            } else {
              // 订阅交易事件监听失败
              createDialog('通知', '开启监听失败, 检查是否解锁钱包', '确认', token.tokenName + '.subscribe-transfer-fail-dialog')
              const subscribeTransferFailDialog = document.getElementById(token.tokenName + '.subscribe-transfer-fail-dialog')
              subscribeTransferFailDialog.showModal()
            }
          }
        )
      },
      tryPushWechat: function () {
        const _this = this
        if (_this.alreadyTest) {
          const alreadySubscribeTransferTestDialog = document.getElementById('already-push-wechat-test-dialog')
          // Now dialog always acts like a native <dialog>.
          alreadySubscribeTransferTestDialog.showModal()
          return
        }

        _this.tokens.forEach(function (token) {
          _this.pushWechat(token.key, token.tokenName + '交易提醒(测试)', token.tokenContract)
        })
        _this.alreadyTest = true

        const subscribeTransferTestDialog = document.getElementById('push-wechat-test-dialog')
        // Now dialog always acts like a native <dialog>.
        subscribeTransferTestDialog.showModal()
      },
      getTokenBalance: async function (token) {
        const _this = this
        let [tokenBalance] = await Promise.all([
          getTokenBalance(token.tokenContract, _this.$store.state.account)
        ])
        tokenBalance = tokenBalance / token.tokenDecimals
        console.info(token.tokenName + '持币:', tokenBalance)
        token.tokenBalance = tokenBalance
      }
    },
    async mounted () {
      const _this = this

      window.setInterval(function () {
        _this.heartbeat += 1
      }, 3000)

      createDialog('通知', '监听测试成功', '确认', 'subscribe-transfer-test-dialog')

      createDialog('通知', '已测试监听，请勿重复操作', '确认', 'already-subscribe-transfer-test-dialog')

      // 钱包拒绝弹窗
      createDialog('钱包', '不支持该钱包', '确认', 'wallet-deny-dialog')

      // 私钥未设置
      createDialog('钱包', '私钥未设置', '确认', 'private-key-unvalid-dialog')

      // 钱包初始化成功
      createDialog('钱包', '钱包初始化成功', '确认', 'wallet-init-success-dialog')

      // 未设置交易对合约
      createDialog('钱包', '未设置交易对合约', '确认', 'lp-token-pair-unvalid-dialog')

      // 交易对合约初始化失败
      createDialog('钱包', '交易对合约初始化失败', '确认', 'lp-token-pair-init-fail-dialog')
    }
  }
</script>
<style>
  p {
    display: inline;
    font-family: "Noto Sans", sans-serif;
    font-weight: 600;
  }

  h1.title {
    line-height: 60px;
    font-weight: 600;
    font-family: "Noto Sans", sans-serif;
    letter-spacing: -0.018em;
  }

  h2.title {
    font-weight: 600;
    font-family: "Noto Sans", sans-serif;
    letter-spacing: -0.018em;
  }

  .partition {
    display: flex;
    width: 100%;
    min-height: 1.5rem;
    -webkit-box-align: center;
    align-items: center;
    padding: 1.5rem 0.5rem 1.5rem 0;
  }

  .partition .image {
    width: 1.2rem;
    height: 1.2rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0AgMAAAC4FvN4AAAADFBMVEUAAABHvAeJ52T9WUaVMXiOAAAAAXRSTlMAQObYZgAAAB5JREFUKM9jCAWDqFVgwDDKoyXvPxh8YICAUR4NeQBA9FhcpheNXQAAAABJRU5ErkJggg==) 0px 0px / contain no-repeat;
  }

  .partition .title {
    padding: 0 0 0 0.5rem;
    text-align: left;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.12rem;
    font-family: "Noto Sans", sans-serif;
  }

  .horoscope {
    background-color: #ffffff;
    margin-bottom: -1px; /*解决手机浏览器该区域底部黄线问题*/
  }

  .horoscope p {
    white-space: nowrap;
    overflow: hidden;
  }

  .horoscope .container {
    padding: 0 5%;
  }

  .nes-container {
    margin: 10px;
  }

  .monitor-tokens .token-manager {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px;
  }

  .token-manager .token-info {
    display: table;
    vertical-align: middle;
    text-align: left;
    width: 50%;
    word-wrap:break-word;
    background: linear-gradient(rgb(255, 255, 255), rgb(255, 49, 135));
    border-radius: 0 0 20px 20px;
    padding: 30px 20px 20px 20px;
    max-height: 300px;
    margin-top: 20px;
  }

  .token-manager .purchase {
    display: flex;
    justify-content: center;
    width: 45%;
    padding: 20px;
  }

  .purchase .purchase-info {
  }

  .purchase .purchase-manager {
  }

  .purchase-info .purchase-status {
    margin: 10px;
  }

  .purchase-info .nes-field {
    margin-top: 10px;
  }

  .nes-field.is-inline > label {
    text-align: left;
    margin-right: 10px;
  }

  .nes-field.is-inline > input {
    flex-grow: 5;
    height: 30px;
  }

  .purchase-info button {
    margin: 10px;
  }

  .purchase-info .lazyPurchase {
    display: flex;
    flex-direction: column;
  }

  .purchase-manager button {
    margin: 10px;
  }

  @media screen and (max-width: 768px) {
    .nes-field.is-inline {
      display: block;
      align-items: inherit;
    }

    .token-manager .token-info {
      width: 100%;
    }

    .token-manager .purchase {
      width: 100%;
    }
  }
</style>
