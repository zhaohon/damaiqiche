<template>
  <div class="login">
    <h4>登录</h4>
    <form>
      <div class="user">
        <input type="text" autocomplete="off" v-on:keyup.enter="handleSubmit()" v-model="formInline.user" placeholder="账号" />
      </div>
      <div class="password">
        <input type="password" autocomplete="off" v-on:keyup.enter="handleSubmit()" v-model="formInline.password" placeholder="密码" />
      </div>
    </form>
    <i-button class="ivu-btn-primary" type="primary"  @click="handleSubmit()">确认</i-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("this.formInline", this.formInline);
      if (!this.formInline.user) {
        this.$Message.error("请输入账号!");
        return;
      }
      if (!this.formInline.password) {
        this.$Message.error("请输入密码!");
        return;
      }
      this.$http
        .gologin({ user: this.formInline.user, pass: this.formInline.password })
        .then((res) => {
          console.log("red", res);
          if (res.res == 1) {
            this.$Message.success("登录成功");
            localStorage.setItem("shop_id", res.shop_id);
            localStorage.setItem("session_id", res.session_id);
            this.$router.push({ path:'/home',name:'Home', query: {}})
          }
          if(res.res == 0){
            this.$Message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
<style scoped>
.login {
  max-width: 320px;
  margin: auto;
  text-align: center;
}
.imgs {
  margin: 50px auto 40px auto;
}
h4 {
  margin: 50px auto 40px auto;
  font-size: 20px;
}
.user,
.password {
  margin-top: 20px;
  font-size: 14px;
}
.user input,
.password input {
  width: 100%;
  border: 1px solid #d7dde4;
  padding: 5px 10px;
  border-radius: 4px;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.user input:focus,
.password input:focus {
  border-color: #91c41e;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(145, 196, 30, 0.1);
}
button {
  width: 100px;
  margin-top: 20px;
  background-color: #91c41e;
  border-color: #91c41e;
  font-size: 16px;
  margin-bottom: 20px;
}
.ivu-btn-primary:hover {
  background-color: rgba(145, 196, 30, 0.7);
  border-color: #91c41e;
}
@media only screen and (max-width: 400px) {
  .login {
    width: 80%;
  }
}
@media only screen and (max-width: 700px) {
  button {
    font-size: 14px;
  }
}
</style>
