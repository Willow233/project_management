<template>
   <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        :rules="loginFormRules"
        
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
        <!-- 确认密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="login">登录</el-button>
          <el-button class="btn">重置</el-button>
        </el-form-item>
      </el-form>
</template>

<script>
export default {
  data() {
    return {
      activeIndex:'1',
      // 登陆表单数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: '不允许输入空格等特殊符号',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: '不允许输入空格等特殊符号',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    login() {
      // el ui中form Methods提供的校验方法
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('api/login', this.loginForm)
        // console.log(result); 除了data之外还有config headers request status statusText 这些是axios封装的一些属性
        // {data:res} 解构赋值 把data改名为res
        // const {data:res} = await this.$http.post('api/login', 这里应该一个对象)
        if (res.status !== 0) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // 1.将登录成功的之后的token，保存到客户端的sessionStorage中
        //1.1项目中除了登录之外的API接口，必须在登陆后才能访问
        //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.token)
        // 2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style>

</style>