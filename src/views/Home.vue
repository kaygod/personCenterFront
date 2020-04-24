<template>
  <div class="home">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="text">作战指挥部</div>
        </Menu>
      </Header>
      <Layout>
        <Sider style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon>
              <span>作战项目</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Content>
          <div class="content">
            <ProjectItem />
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectItem from "@/components/ProjectItem.vue";

export default {
  name: "Home",
  components: {
    ProjectItem
  }
};
</script>
<style lang="scss">
.home {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .ivu-layout {
    height: 100%;
    .ivu-layout-sider-children {
      background: #fff;
    }
    .text {
      color: #fff;
      text-align: center;
      font-size: 40px;
      letter-spacing: 8px;
    }
    .content {
      box-sizing: border-box;
      padding: 15px;
    }
  }
}
</style>
