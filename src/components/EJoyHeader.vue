<template>
  <header v-bind:class="{sticky: !isActive}">
    <div class="container">
      <div class="nav-btn" v-on:click="navbarTraggle()">
        <q-btn flat round dense icon="menu" class="q-mr-xs">
        </q-btn>
      </div>
      <div class="nav-brand">
        <a href="#">
          <div class="logo">
            <!--            <i class="snes-jp-logo brand-logo"></i>-->
            <!--            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">-->
            <!--              <image width="50" height="50" x="0" y="0" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSLlm77lsYJfMSIgZGF0YS1uYW1lPSLlm77lsYIgMSIgdmlld0JveD0iLTMgMCA0NyA1MCI+PGRlZnM+PHN0eWxlPi5jZC1zdmctbG9nby1ibHVlLTF7ZmlsbDojMjM3NWY5O30uY2Qtc3ZnLWxvZ28tYmx1ZS0ye2ZpbGw6I0ZGMDA2Njt9LmNkLXN2Zy1sb2dvLWJsdWUtM3tmaWxsOiMxODZkZWE7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2dvPC90aXRsZT48cGF0aCBjbGFzcz0iY2Qtc3ZnLWxvZ28tYmx1ZS0xIiBkPSJNMzkuOCwyMi4zbC02LjYtOC42LS4zLS4zYTIuNSwyLjUsMCwwLDAtMS43LS45TDI3LjcsMTJhMi42LDIuNiwwLDAsMC0xLjkuNUwxMCwyNC45YTIuMywyLjMsMCwwLDAtLjQsMy4ybC41LjZhMi4zLDIuMywwLDAsMCwzLjIuNEwyOC4yLDE3LjZhMi4zLDIuMywwLDAsMSwzLjIuNGwzLjUsNC41YTIuMywyLjMsMCwwLDEtLjQsMy4yTDE2LDQwYTEuNCwxLjQsMCwwLDAtLjMsMS45aDBsNC42LDUuOWEuNi42LDAsMCwwLDEtLjJsMS43LTUuNC4zLS4yTDM5LDI5LjhhMi45LDIuOSwwLDAsMCwxLjEtMmwuNC0zLjJBMy4yLDMuMiwwLDAsMCwzOS44LDIyLjNaIi8+PHBhdGggY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgZD0iTTMyLjIsMjIuMSwzMSwyMC41YTEuNywxLjcsMCwwLDAtMi40LS4zTDEyLjgsMzIuNmExLjcsMS43LDAsMCwxLTIuNC0uM0w2LjIsMjYuOWExLjcsMS43LDAsMCwxLC4zLTIuNEwyNS40LDkuOGExLjMsMS4zLDAsMCwwLC41LS43LDEsMSwwLDAsMC0uMS0uOS45LjksMCwwLDAtLjYtLjRoMGwtNS41LS40YTIuNCwyLjQsMCwwLDAtMS43LjVMMi40LDIwYTIuOCwyLjgsMCwwLDAtMS4xLDEuOUwxLDI1LjNhMi45LDIuOSwwLDAsMCwuNiwyLjFsNi43LDguNy40LjVhMS45LDEuOSwwLDAsMCwxLjMuN2w0LC40YTIsMiwwLDAsMCwxLjQtLjRMMzEuOSwyNC41QTEuNywxLjcsMCwwLDAsMzIuMiwyMi4xWiIvPjxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjIzLjMiIHk9IjUuOCIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIxLjIzIiByeD0iMC4yIiByeT0iMC4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNCAtMTYuMykgcm90YXRlKDUxLjUpIi8+PHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjAuMSIgeT0iNS43IiB3aWR0aD0iMS40IiBoZWlnaHQ9IjEuMzciIHJ4PSIwLjIiIHJ5PSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjggLTEzLjgpIHJvdGF0ZSg1MS41KSIvPjxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjI2LjIiIHk9IjYuMyIgd2lkdGg9IjEiIGhlaWdodD0iMC45OCIgcng9IjAuMiIgcnk9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuMyAtMTguMykgcm90YXRlKDUxLjUpIi8+PHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjUuMiIgeT0iNC41IiB3aWR0aD0iMC45IiBoZWlnaHQ9IjAuODYiIHJ4PSIwLjIiIHJ5PSIwLjIiIHRyYW5zZm9ybT0ibWF0cml4KDAuNjIsIDAuNzgsIC0wLjc4LCAwLjYyLCAxMy41MywgLTE4LjE2KSIvPjxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjIyLjIiIHk9IjQuMyIgd2lkdGg9IjEiIGhlaWdodD0iMS4wMyIgcng9IjAuMiIgcnk9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMyAtMTYpIHJvdGF0ZSg1MS41KSIvPjxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjI1LjciIHk9IjIuMSIgd2lkdGg9IjAuNyIgaGVpZ2h0PSIwLjY5IiByeD0iMC4xIiByeT0iMC4xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS43IC0xOS40KSByb3RhdGUoNTEuNSkiLz48cmVjdCBjbGFzcz0iY2Qtc3ZnLWxvZ28tYmx1ZS0yIiB4PSIyNC4xIiB5PSIzLjIiIHdpZHRoPSIwLjgiIGhlaWdodD0iMC43OCIgcng9IjAuMSIgcnk9IjAuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIgLTE3LjgpIHJvdGF0ZSg1MS41KSIvPjwvc3ZnPg==" />-->
            <!--            </svg>-->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50">
              <defs>
                <path id="a" d="m29.861,0c16.492,0 29.861,13.37 29.861,29.861c0,16.492 -13.37,29.861 -29.86,29.861c-16.494,0 -29.862,-13.37 -29.862,-29.86c0,-16.494 13.37,-29.862 29.861,-29.862zm0,10.694c-10.585,0 -19.167,8.582 -19.167,19.167c0,10.586 8.582,19.167 19.167,19.167c10.586,0 19.167,-8.581 19.167,-19.167c0,-10.585 -8.581,-19.167 -19.167,-19.167z"/>
                <path id="e" d="m29.886,18.608l17.664,35.33a29.727,29.727 0 0 1 -17.664,5.782a29.727,29.727 0 0 1 -17.664,-5.783l17.664,-35.329z"/>
                <filter id="d" width="262.8%" height="281.6%" x="-81.4%" y="-100.8%" filterUnits="objectBoundingBox">
                  <feGaussianBlur stdDeviation="9"/>
                </filter>
                <circle id="i" cx="30" cy="24.444" r="5.278"/>
                <linearGradient id="b" x1="50%" x2="50%" y1="95.423%" y2="0%">
                  <stop offset="0%" stop-color="#3967FF"/>
                  <stop offset="100%" stop-color="#B500FE"/>
                </linearGradient>
                <linearGradient id="f" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#3967FF"/>
                  <stop offset="100%" stop-color="#B500FE"/>
                </linearGradient>
                <linearGradient id="g" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#1C98FF"/>
                  <stop offset="100%" stop-color="#574AE4"/>
                </linearGradient>
                <linearGradient id="h" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#F900B8"/>
                  <stop offset="100%" stop-color="#AE48C0"/>
                </linearGradient>
                <linearGradient id="j" x1="100%" x2="26.765%" y1="15.127%" y2="100%">
                  <stop offset="0%" stop-color="#FF4695"/>
                  <stop offset="100%" stop-color="#CC34E7"/>
                </linearGradient>
              </defs>
              <g>
                <title>background</title>
                <rect x="-1" y="-1" width="52" height="52" id="canvas_background" fill="none"/>
              </g>
              <g>
                <title>Layer 1</title>
                <g stroke="null" fill="none" fill-rule="evenodd" id="svg_1">
                  <g stroke="null" transform="matrix(-0.38812173014166407,-0.39594959884587067,0.3881217301416642,-0.39594959884587055,25.378920764389587,62.74678525462363) " id="svg_4">
                    <mask stroke="null" transform="translate(-0.4954819679260254,0.4954819679260254) translate(0.48568636178970337,0.48568636178970337) translate(-1.9427456855773926,-1.9427456855773926) translate(0,-1) " id="c">
                      <use stroke="null" xlink:href="#a" id="svg_5"/>
                    </mask>
                    <use stroke="null" fill="url(#b)" xlink:href="#a" id="svg_6" y="8.201871" x="22.767956" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) "/>
                    <g stroke="null" mask="url(#c)" id="svg_7">
                      <use stroke="null" fill="#000" filter="url(#d)" xlink:href="#e" id="svg_8" y="8.201871" x="22.767956" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) "/>
                      <use stroke="null" fill="url(#f)" xlink:href="#e" id="svg_9" y="8.201871" x="22.767956" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) "/>
                    </g>
                    <path stroke="null" fill="url(#g)" d="m48.091139,52.133963c3.12992,0 5.95813,-1.2309 7.97697,-3.21247l15.04487,30.26184a38.99546,39.2185 0 0 1 -23.17139,7.62813a38.99546,39.2185 0 0 1 -23.17139,-7.62813l15.14457,-30.46237c2.03065,2.09898 4.9415,3.41432 8.17637,3.41432l0,-0.00132z" id="svg_10"/>
                    <use stroke="null" fill="url(#h)" xlink:href="#i" id="svg_11" y="8.201871" x="22.767956" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) "/>
                    <use stroke="null" fill="url(#j)" xlink:href="#i" id="svg_12" y="8.201871" x="22.767956" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) "/>
                  </g>
                </g>
              </g>
            </svg>
            <!--            <img width="50" height="50" src="public/art/favicon.png"/>-->
            <div>
              <h2>EJoy</h2>
              <p>Heco NFT Platform</p>
            </div>
          </div>
        </a>
      </div>
      <!--      <div class="nav-menu">-->
      <!--        <span @click="routerToHome()">首页</span>-->
      <!--      </div>-->
      <div class="navbar-container">
        <ul>
          <!--          <li>-->
          <!--            <span @click="routerToHome()"><b>Home</b></span>-->
          <!--          </li>-->
          <div class="h-sep"></div>
          <li>
            <span @click="routerToHome()">无限玩法</span>
          </li>
          <li>
            <span @click="routerToHome()">创世兑换</span>
          </li>
          <div class="h-sep"></div>
          <li>
            <span @click="routerToHome()">EJoy NFT</span>
          </li>
          <li>
            <span @click="routerToHome()">EJoy Swap</span>
          </li>
          <div class="h-sep"></div>
          <li>
            <span @click="routerToHome()">关于</span>
          </li>
        </ul>
      </div>
      <div class="wallet">
        <section>
          <button type="button" class="nes-btn" v-on:click="unlockWallet()">
            <span v-if="account">
              {{account}}
            </span>
            <span v-else>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAASCAYAAACEnoQPAAAA0klEQVQ4T7WTsQ6DIBCGDxNTbFf7SK4uHUrSZ+wio8/EViuJiTSHQhAEbNIykeO+///hlMDOqqpK+eVxHIlfCwrXulavYYCu62xv27YwTROUZQmuyAamlCrO+V4YXUMRXEbAwi7YNA0URQHzPFuhvu/1njEGQgjNBTCCbt2JoYyA6dGw75qDMT5G38AJV/SIO0spTcJgAuvBPhx93u1BFA4+igOC+s5KPQ+0ei2XxzKq38LkFibx02WdUSR2pf/CqWfMOqfg0339Mc4Uvp7zWwL5AIJya4I635S+AAAAAElFTkSuQmCC"
                alt="">
              连接钱包
            </span>
          </button>
        </section>
      </div>
    </div>
    <div class="navbar">
      <q-slide-transition>
        <div v-show="isTraggle">
          <q-list>
            <q-item clickable>
              <q-item-section>无限玩法</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>创世兑换</q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item clickable>
              <q-item-section>EJoy NFT</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>EJoy Swap</q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item clickable>
              <q-item-section>关于</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-slide-transition>
    </div>
  </header>
</template>
<script>
  import { connectWalletWeb3 } from '../util/infura'

  export default {
    name: 'EJoyHeader',
    props: [
      'scrollPos',
      'isActive'
    ],
    data () {
      return {
        isTraggle: false,
        account: null
      }
    },
    async mounted () {
    },
    methods: {
      navbarTraggle: function () {
        this.isTraggle = !this.isTraggle
      },
      routerToHome: function () {
        this.$router.push({
          path: '/'
        })
      },
      unlockWallet: function () {
        const _this = this
        connectWalletWeb3().then(result => {
          this.$store.dispatch('connectWallet', result)
          _this.account = _this.$store.state.account
        })
      }
    }
  }
</script>
<style>
  header {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    /*padding-bottom: constant(safe-area-inset-bottom);*/
    /*padding-bottom: env(safe-area-inset-bottom);*/
    /*padding-left: constant(safe-area-inset-left);*/
    /*padding-left: env(safe-area-inset-left);*/
    /*padding-right: constant(safe-area-inset-right);*/
    /*padding-right: env(safe-area-inset-right);*/
  }

  header .q-btn .q-icon, header .q-btn .q-spinner {
    font-size: 2.3em;
  }

  .navbar-container {
    background-color: #ffd700;
    border-radius: 5px;
    display: table;
  }

  .navbar-container ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    /*-webkit-justify-content: space-around;*/
    -ms-flex-pack: distribute;
    /*justify-content: space-around;*/
    border: 2px solid #ffd700;
    border-radius: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .navbar-container ul li > span {
    display: block;
    padding: 10px 10px;
    margin: 0 5px;
    text-decoration: none;
    border-radius: 3px;
    font-weight: 300;
    color: #212529;
    text-shadow: 0 1px 0 black;
    -webkit-transition: all ease .25s;
    transition: all ease .25s;
  }

  .navbar-container ul li > span:hover {
    background-color: #212529;
    color: #ffd700;
    text-shadow: none;
  }

  .navbar-container ul li:first-child > span {
    margin: 0 5px 0 0;
  }

  .navbar-container ul li:last-child > span {
    margin: 0 0 0 5px;
  }

  .navbar-container ul .h-sep {
    display: block;
    width: 1px;
    background: rgba(250, 235, 215, 0.1);
  }

  @media screen and (max-width: 768px) {
    .navbar-container {
      display: none;
    }
  }
</style>
