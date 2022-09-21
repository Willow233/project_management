<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题 -->
      <h1>登录后台管理系统</h1>
      <!-- 登录&注册选项 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="/loginapp/login">
          登录
        </el-menu-item>
        <el-menu-item index="/loginapp/reguser">
          注册
        </el-menu-item>
      </el-menu>
      <div class="login_form">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    }
  },
}
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
      top: 100px;
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