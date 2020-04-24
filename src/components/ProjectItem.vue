<template>
  <div class="block">
    <Row :gutter="16">
      <i-col span="6">
        <div class="squire">自律神器</div>
      </i-col>
      <i-col span="6">
        <div class="squire">在线云笔记</div>
      </i-col>
    </Row>
  </div>
</template>
<style lang="scss">
.block {
  margin: 20px;
  .squire {
    height: 200px;
    border: 1px solid #999;
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
    line-height: 200px;
    font-size: 50px;
    cursor: pointer;
  }
}
</style>