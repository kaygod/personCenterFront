<template>
  <div class="user-config">
    <Form :label-width="80" v-if="type == 1">
      <FormItem label="原邀请码">{{old_code}}</FormItem>
      <FormItem label="新邀请码">
        <Input type="password" v-model="new_code" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">提交</Button>
      </FormItem>
    </Form>
    <Card :bordered="false" v-else-if="type == 2">
      <p slot="title">提示</p>
      <p>您没有权限访问此模块!</p>
    </Card>
  </div>
</template>
<script>
import _axios from "../util/ajax";

export default {
  data() {
    return {
      old_code: "",
      new_code: "",
      type: -1 // 1 正常显示 2 没有权限
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleSubmit() {
      if (this.new_code.trim() === "") {
        this.$Message.error({
          title: "提示",
          content: "邀请码不能为空!"
        });
        return false;
      }
      _axios
        .post("/api/user/update_code", {
          code: this.new_code
        })
        .then(response => {
          this.$Message.success({
            title: "提示",
            content: "邀请码修改成功!"
          });
          this.old_code = this.new_code;
          this.new_code = "";
        });
    },
    init() {
      _axios
        .post("/api/user/get_code", {})
        .then(response => {
          this.old_code = response.code;
          this.type = 1;
        })
        .catch(error => {
          const { error_no } = error;
          if (error_no == "148") {
            this.type = 2;
          }
        });
    }
  }
};
</script>
<style lang="scss">
.user-config {
  min-height: 600px;
  width: 400px;
  margin: 30px auto;
}
</style>