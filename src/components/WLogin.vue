<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题 -->
      <h1>登录后台管理系统</h1>
      <!-- 登录表单区域 -->
      <el-form
      ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        :rules="loginFormRules"
        class="login_form"
        enctype="application/x-www-form-urlencoded"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="login">登录</el-button>
          <el-button class="btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: "不允许输入空格等特殊符号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: "不允许输入空格等特殊符号",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods:{
    login(){
      // el ui中form Methods提供的校验方法
      this.$refs.loginFormRef.validate(async valid =>{
        if(!valid) return
        const {data:res} = await this.$http.post('api/login',this.loginForm)
        console.log(res);
      })
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #00dbde;
  background-image: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  height: 100%;

  .login_box {
    width: 450px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    h1 {
      font-size: 20px;
      margin-top: 30px;
      color: #66b1ff;
      font-weight: bold;
    }
    .login_form {
      position: absolute;
      top: 50px;
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      .btn {
        width: 100%;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>