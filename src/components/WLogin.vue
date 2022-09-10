<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题 -->
      <h1>用户登录</h1>
      <!-- 登录表单区域 -->
      <el-form label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登录</el-button>
          <el-button class="btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
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
    h1{
      font-size: 20px;
      margin-top: 30px;
      color: #66B1FF;
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