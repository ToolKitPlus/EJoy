<template>
  <div class="nescss">
    <e-joy-header v-bind:scroll-pos="scrollPos" v-bind:is-active="isActive"></e-joy-header>
    <div class="container">
      <button type="button" class="nes-btn is-error scroll-btn" v-bind:class="{active: !isActive}"
              v-on:click="scrollToTop()"><span>&lt;</span></button>
      <e-joy-content v-bind:is-active="isActive"></e-joy-content>
    </div>
    <e-joy-footer></e-joy-footer>
  </div>
</template>

<script>
  import EJoyHeader from 'components/EJoyHeader.vue'
  import EJoyFooter from 'components/EJoyFooter.vue'
  import EJoyContent from 'components/EJoyContent.vue'

  export default {
    name: 'Layout',
    components: {
      EJoyHeader,
      EJoyFooter,
      EJoyContent
    },
    data () {
      return {
        scrollPos: 0,
        isActive: true,
        acountInfo: {
          rtxBalance: 0,
          walletAddress: ''
        }
      }
    },
    async mounted () {
      document.addEventListener('scroll', () => {
        this.scrollPos = document.documentElement.scrollTop || document.body.scrollTop
        this.isActive = this.scrollPos <= window.outerHeight * 0.3
      })
      // this.waitTronInit().then()
    },
    methods: {
      scrollToTop: function () {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth'
        })
      },
      waitTronInit: async function () {
        // 1. check variable, 检查tronweb是否已经加载
        if (window.tronWeb) {
          const tronWeb = window.tronWeb
          // 2. check node connection，检查所需要的API是否都可以连通
          const nodes = await tronWeb.isConnected()
          const connected = !Object.entries(nodes).map(([name, connected]) => {
            if (!connected) {
              console.error(`Error: ${name} is not connected`)
            }
            return connected
          }).includes(false)
          if (connected) {
            // 3. 已加载tronLink，获取账户余额。
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
              // 已加载tronLink
              this.acountInfo.walletAddress = window.tronWeb.defaultAddress.base58
              this.acountInfo.rtxBalance = await tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
              console.log('当钱包TRX余额：' + this.acountInfo.rtxBalance / 1e6)
            }
          } else {
            console.error('Error: TRON node is not connected')
            console.error('wait for tronLink')
            setTimeout(async () => {
              await this.waitTronInit()
            }, 100)
          }
        } else {
          // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
          console.error('waiting for tronLink')
          setTimeout(async () => {
            await this.waitTronInit()
          }, 100)
        }
      }
    }
  }
</script>
<style>
  .container {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
</style>
