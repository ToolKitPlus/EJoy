<template>
  <footer>
    <div class="footer">
      <span class="pr">Made with</span>
      <i class="nes-icon heart"></i>
      <span class="pl">by</span>
<!--      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve">-->
<!--        <image width="36" height="36" x="0" y="0" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSLlm77lsYJfMSIgZGF0YS1uYW1lPSLlm77lsYIgMSIgdmlld0JveD0iMCAwIDQwIDUwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4uY2Qtc3ZnLWxvZ28tYmx1ZS0xe2ZpbGw6IzIzNzVmOTt9LmNkLXN2Zy1sb2dvLWJsdWUtMntmaWxsOiNlNzAwOGE7fS5jZC1zdmctbG9nby1ibHVlLTN7ZmlsbDojMTg2ZGVhO30KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDx0aXRsZT5sb2dvPC90aXRsZT4KICA8cGF0aCBjbGFzcz0iY2Qtc3ZnLWxvZ28tYmx1ZS0xIgogICAgICAgIGQ9Ik0zOS44LDIyLjNsLTYuNi04LjYtLjMtLjNhMi41LDIuNSwwLDAsMC0xLjctLjlMMjcuNywxMmEyLjYsMi42LDAsMCwwLTEuOS41TDEwLDI0LjlhMi4zLDIuMywwLDAsMC0uNCwzLjJsLjUuNmEyLjMsMi4zLDAsMCwwLDMuMi40TDI4LjIsMTcuNmEyLjMsMi4zLDAsMCwxLDMuMi40bDMuNSw0LjVhMi4zLDIuMywwLDAsMS0uNCwzLjJMMTYsNDBhMS40LDEuNCwwLDAsMC0uMywxLjloMGw0LjYsNS45YS42LjYsMCwwLDAsMS0uMmwxLjctNS40LjMtLjJMMzksMjkuOGEyLjksMi45LDAsMCwwLDEuMS0ybC40LTMuMkEzLjIsMy4yLDAsMCwwLDM5LjgsMjIuM1oiLz4KICA8cGF0aCBjbGFzcz0iY2Qtc3ZnLWxvZ28tYmx1ZS0yIgogICAgICAgIGQ9Ik0zMi4yLDIyLjEsMzEsMjAuNWExLjcsMS43LDAsMCwwLTIuNC0uM0wxMi44LDMyLjZhMS43LDEuNywwLDAsMS0yLjQtLjNMNi4yLDI2LjlhMS43LDEuNywwLDAsMSwuMy0yLjRMMjUuNCw5LjhhMS4zLDEuMywwLDAsMCwuNS0uNywxLDEsMCwwLDAtLjEtLjkuOS45LDAsMCwwLS42LS40aDBsLTUuNS0uNGEyLjQsMi40LDAsMCwwLTEuNy41TDIuNCwyMGEyLjgsMi44LDAsMCwwLTEuMSwxLjlMMSwyNS4zYTIuOSwyLjksMCwwLDAsLjYsMi4xbDYuNyw4LjcuNC41YTEuOSwxLjksMCwwLDAsMS4zLjdsNCwuNGEyLDIsMCwwLDAsMS40LS40TDMxLjksMjQuNUExLjcsMS43LDAsMCwwLDMyLjIsMjIuMVoiLz4KICA8cmVjdCBjbGFzcz0iY2Qtc3ZnLWxvZ28tYmx1ZS0yIiB4PSIyMy4zIiB5PSI1LjgiIHdpZHRoPSIxLjIiIGhlaWdodD0iMS4yMyIgcng9IjAuMiIgcnk9IjAuMiIKICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNCAtMTYuMykgcm90YXRlKDUxLjUpIi8+CiAgPHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjAuMSIgeT0iNS43IiB3aWR0aD0iMS40IiBoZWlnaHQ9IjEuMzciIHJ4PSIwLjIiIHJ5PSIwLjIiCiAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuOCAtMTMuOCkgcm90YXRlKDUxLjUpIi8+CiAgPHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjYuMiIgeT0iNi4zIiB3aWR0aD0iMSIgaGVpZ2h0PSIwLjk4IiByeD0iMC4yIiByeT0iMC4yIgogICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjMgLTE4LjMpIHJvdGF0ZSg1MS41KSIvPgogIDxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjI1LjIiIHk9IjQuNSIgd2lkdGg9IjAuOSIgaGVpZ2h0PSIwLjg2IiByeD0iMC4yIiByeT0iMC4yIgogICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNjIsIDAuNzgsIC0wLjc4LCAwLjYyLCAxMy41MywgLTE4LjE2KSIvPgogIDxyZWN0IGNsYXNzPSJjZC1zdmctbG9nby1ibHVlLTIiIHg9IjIyLjIiIHk9IjQuMyIgd2lkdGg9IjEiIGhlaWdodD0iMS4wMyIgcng9IjAuMiIgcnk9IjAuMiIKICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4zIC0xNikgcm90YXRlKDUxLjUpIi8+CiAgPHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjUuNyIgeT0iMi4xIiB3aWR0aD0iMC43IiBoZWlnaHQ9IjAuNjkiIHJ4PSIwLjEiIHJ5PSIwLjEiCiAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuNyAtMTkuNCkgcm90YXRlKDUxLjUpIi8+CiAgPHJlY3QgY2xhc3M9ImNkLXN2Zy1sb2dvLWJsdWUtMiIgeD0iMjQuMSIgeT0iMy4yIiB3aWR0aD0iMC44IiBoZWlnaHQ9IjAuNzgiIHJ4PSIwLjEiIHJ5PSIwLjEiCiAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIgLTE3LjgpIHJvdGF0ZSg1MS41KSIvPgo8L3N2Zz4K" />-->
<!--      </svg>-->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40">
        <defs>
          <path d="m29.861,0c16.492,0 29.861,13.37 29.861,29.861c0,16.492 -13.37,29.861 -29.86,29.861c-16.494,0 -29.862,-13.37 -29.862,-29.86c0,-16.494 13.37,-29.862 29.861,-29.862zm0,10.694c-10.585,0 -19.167,8.582 -19.167,19.167c0,10.586 8.582,19.167 19.167,19.167c10.586,0 19.167,-8.581 19.167,-19.167c0,-10.585 -8.581,-19.167 -19.167,-19.167z" id="a"/>
          <path d="m29.886,18.608l17.664,35.33a29.727,29.727 0 0 1 -17.664,5.782a29.727,29.727 0 0 1 -17.664,-5.783l17.664,-35.329z" id="e"/>
          <filter filterUnits="objectBoundingBox" y="-100.8%" x="-81.4%" height="281.6%" width="262.8%" id="d">
            <feGaussianBlur stdDeviation="9"/>
          </filter>
          <circle r="5.278" cy="24.444" cx="30" id="i"/>
          <linearGradient y2="0%" y1="95.423%" x2="50%" x1="50%" id="b">
            <stop stop-color="#3967FF" offset="0%"/>
            <stop stop-color="#B500FE" offset="100%"/>
          </linearGradient>
          <linearGradient y2="100%" y1="0%" x2="50%" x1="50%" id="f">
            <stop stop-color="#3967FF" offset="0%"/>
            <stop stop-color="#B500FE" offset="100%"/>
          </linearGradient>
          <linearGradient y2="100%" y1="0%" x2="50%" x1="50%" id="g">
            <stop stop-color="#1C98FF" offset="0%"/>
            <stop stop-color="#574AE4" offset="100%"/>
          </linearGradient>
          <linearGradient y2="100%" y1="0%" x2="50%" x1="50%" id="h">
            <stop stop-color="#F900B8" offset="0%"/>
            <stop stop-color="#AE48C0" offset="100%"/>
          </linearGradient>
          <linearGradient y2="100%" y1="15.127%" x2="26.765%" x1="100%" id="j">
            <stop stop-color="#FF4695" offset="0%"/>
            <stop stop-color="#CC34E7" offset="100%"/>
          </linearGradient>
        </defs>
        <g>
          <title>background</title>
          <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1"/>
        </g>
        <g>
          <title>Layer 1</title>
          <g stroke="null" id="svg_1" fill-rule="evenodd" fill="none">
            <g stroke="null" id="svg_4" transform="matrix(-0.3178255471604531,-0.3290008519219225,0.3178255471604532,-0.32900085192192247,19.814595533766877,51.1049637497338) ">
              <mask transform="translate(-0.476724237203598,0.476724237203598) translate(0.476724237203598,-0.476724237203598) translate(-0.476724237203598,0.476724237203598) translate(0.476724237203598,-0.476724237203598) translate(-0.476724237203598,0.476724237203598) translate(-0.4605311453342438,-0.4605311453342438) " stroke="null" id="c">
                <use stroke="null" id="svg_5" xlink:href="#a"/>
              </mask>
              <use stroke="null" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) " x="22.053468" y="8.214145" id="svg_6" xlink:href="#a" fill="url(#b)"/>
              <g stroke="null" id="svg_7" mask="url(#c)">
                <use stroke="null" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) " x="22.053468" y="8.214145" id="svg_8" xlink:href="#e" filter="url(#d)" fill="#000"/>
                <use stroke="null" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) " x="22.053468" y="8.214145" id="svg_9" xlink:href="#e" fill="url(#f)"/>
              </g>
              <path stroke="null" id="svg_10" d="m47.153885,52.150153c3.12992,0 5.95813,-1.2309 7.97697,-3.21247l15.04487,30.26184a38.99546,39.2185 0 0 1 -23.17139,7.62813a38.99546,39.2185 0 0 1 -23.17139,-7.62813l15.14457,-30.46237c2.03065,2.09898 4.9415,3.41432 8.17637,3.41432l0,-0.00132z" fill="url(#g)"/>
              <use stroke="null" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) " x="22.053468" y="8.214145" id="svg_11" xlink:href="#i" fill="url(#h)"/>
              <use stroke="null" transform="matrix(1.3117859333415538,0,0,1.3192887988090831,-21.1291286781464,-2.8960452106767747) " x="22.053468" y="8.214145" id="svg_12" xlink:href="#i" fill="url(#j)"/>
            </g>
          </g>
        </g>
      </svg>
      <a href="https://github.com/ejoyfinance" target="_blank" class="pl">EJoy</a>
      <span class="pr pl">/</span>
<!--      <i class="snes-jp-logo"></i>-->
      <span>EJoy Swap</span>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'EJoyFooter'
  }
</script>
<style>
  .pr {
    padding-right: 10px;
  }

  .pl {
    padding: 0 0.5rem;
  }

  .footer {
    padding: 0 5% 1rem 5%;
  }
</style>
