<template>
  <div class="login">
    <div class="container">
      <Form ref="formCustom" :label-width="80">
        <FormItem label="用户名" prop="passwd">
          <Input v-model="formCustom.user_name" />
        </FormItem>
        <FormItem label="密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.password" />
        </FormItem>
        <FormItem label="昵称" v-if="type == 2">
          <Input v-model="formCustom.nick" />
        </FormItem>
        <FormItem :label="type == 1 ? '验证码' : '邀请码'" prop="age" class="captcha">
          <div class="lt">
            <Input type="text" v-model="formCustom.code" number />
          </div>
          <p class="lt">
            <img :src="captcha" @click="updateCaptcha()" v-if="type == 1" style="height:30px" />
          </p>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit()">
            {{
            type == 1 ? '登录' : '注册'
            }}
          </Button>
          <i-switch style="margin-left: 8px" v-model="toggle" @on-change="change" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import _axios from "../util/ajax";
import { service_ip, storeToken } from "../util/tool";

export default {
  data() {
    return {
      type: 1, // 1 登录  2 注册
      formCustom: {
        user_name: "",
        password: "",
        code: "",
        nick: ""
      },
      captcha: this.getCaptcha()
    };
  },
  computed: {
    // 计算属性的 getter
    toggle: {
      get() {
        if (this.type == 1) {
          return true;
        } else {
          return false;
        }
      },
      set(v) {
        return v;
      }
    }
  },
  methods: {
    updateCaptcha() {
      this.captcha = this.getCaptcha();
    },
    //获取验证码
    getCaptcha() {
      return `${service_ip}/api/user/getCaptcha?time=${new Date().getTime()}`;
    },
    change() {
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    handleSubmit() {
      const { user_name, password, code, nick } = this.formCustom;
      let params = {
        user_name,
        password
      };
      let url = "/api/user/login";
      if (this.type == 1) {
        //登录
        params.captcha = code;
      } else {
        //注册
        params.nick = nick;
        params.invite_code = code;
        url = "/api/user/register";
      }
      _axios.post(url, params).then(response => {
        if (this.type == 1) {
          const { token } = response;
          storeToken(token);
          this.$store.commit("setToken", token);
          this.$router.push({ path: "/" });
        } else {
          this.$Modal.success({
            title: "提示",
            content: "恭喜您注册成功!",
            onOk: () => {
              location.reload();
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  .container {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    .captcha {
      .ivu-input {
        width: 60px;
      }
    }
  }
}
</style>
