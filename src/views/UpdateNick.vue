<template>
  <div class="user-config">
    <Form :label-width="80">
      <FormItem label="原昵称">{{old_nick}}</FormItem>
      <FormItem label="新昵称">
        <Input v-model="new_nick" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import _axios from "../util/ajax";
import { storeToken } from "../util/tool";

export default {
  data() {
    return {
      old_nick: "",
      new_nick: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleSubmit() {
      if (this.new_nick.trim() === "") {
        this.$Message.error({
          title: "提示",
          content: "昵称不能为空!"
        });
        return false;
      }
      _axios
        .post("/api/user/update_user", {
          nick: this.new_nick
        })
        .then(response => {
          this.$Message.success({
            title: "提示",
            content: "昵称修改成功!"
          });
          const { token } = response;
          storeToken(token);
          this.$store.commit("setToken", token);
          this.old_nick = this.new_nick;
          this.new_nick = "";
        });
    },
    init() {
      _axios.post("/api/user/get_user", {}).then(response => {
        const { nick } = response;
        this.old_nick = nick;
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