<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.lt {
  float: left;
}
.gt {
  float: right;
}
.box::after {
  content: '';
  display: block;
  clear: both;
  width: 0;
  height: 0;
}
</style>
