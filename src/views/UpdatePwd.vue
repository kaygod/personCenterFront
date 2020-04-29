<template>
  <div class="user-config">
    <Form :label-width="80">
      <FormItem label="旧密码">
        <Input type="password" v-model="old_password" />
      </FormItem>
      <FormItem label="新密码">
        <Input type="password" v-model="new_password" />
      </FormItem>
      <FormItem label="确认密码">
        <Input type="password" v-model="password_twice" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import _axios from "../util/ajax";

export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      password_twice: ""
    };
  },
  methods: {
    handleSubmit() {
      const old_password = this.old_password;
      const new_password = this.new_password;
      const password_twice = this.password_twice;
      if (new_password !== password_twice) {
        this.$Modal.error({
          title: "提示",
          content: "两次输入密码不相等!"
        });
        return false;
      }
      _axios
        .post("/api/user/update_user", {
          new_password,
          old_password
        })
        .then(response => {
          this.$Modal.success({
            title: "提示",
            content: "密码修改成功!"
          });
          this.old_password = "";
          this.new_password = "";
          this.password_twice = "";
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