<template>
  <el-form :model="loginForm" ref="loginForm" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLogin">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLogin() {
      this.$store.dispatch("user/login", this.loginForm).then(res => {
        // console.log(123)
        this.$message({
          message: "登录成功，正在跳转",
          type: "success"
        });
        // 跳转到首页
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
