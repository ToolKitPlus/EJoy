<template>
  <main class="main-content">
    <div class="sys-info">
      <img src="https://cdn.jsdelivr.net/gh/ejoyfinance/ejoy/ejoy_.svg">
      <div class="sys-name">
        <div class="line-circle">
          <span class="left"></span>
          <i class="circle"></i>
        </div>
        <p>多玩法GameFi + NFT</p>
        <div class="line-circle">
          <i class="circle"></i>
          <span class="right"></span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>
<script>
  export default {
    name: 'EJoyContent',
    props: [
      'isActive'
    ]
  }
</script>
<style>
  .sys-info {
    display: block;
    position: fixed;
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 10px;
    z-index: -1;
  }

  .sys-name {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line-circle span.left {
    margin-right: 2px;
    background: linear-gradient(90deg,rgba(188,191,208,0) 0,#bcbfd0);
  }

  .line-circle span.right {
    margin-left: 2px;
    background: linear-gradient(270deg,rgba(188,191,208,0) 0,#bcbfd0);
  }

  .line-circle span {
    width: 16px;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
  }

  .line-circle .circle {
    margin-bottom: 0;
    width: 2px;
    height: 2px;
    background: #6e7a87;
    border-radius: 2px;
  }

  .line-circle .circle, .line-circle span {
    display: inline-block;
    vertical-align: middle;
  }

  .sys-info p {
    font-family: "Noto Sans", sans-serif;
    letter-spacing: -0.018em;
    color: #6e7a87;
    margin: 5px 5px;
  }
</style>
