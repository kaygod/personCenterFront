<template>
  <div class="block">
    <Row :gutter="16">
      <i-col span="6" v-for="item in project_items" :key="item.id">
        <div class="squire" @click="jump(item)">{{item.title}}</div>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "prject_item",
  data() {
    return {
      project_items: [
        {
          title: "自律神器",
          url: "/displine",
          id: 0
        },
        {
          title: "在线云笔记",
          url: "/",
          id: 1
        }
      ]
    };
  },
  methods: {
    jump(item) {
      this.$router.push({ path: item.url });
    }
  }
};
</script>
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