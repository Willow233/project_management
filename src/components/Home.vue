<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
        <div>
            <img src="../assets/image/icon1.png" alt="" width="30px;">
            <span>电商管理后台系统</span>
        </div>
        <div>
            <span>晚上好，用户名</span>
            <button @click="logout">退出登录</button>
        </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <el-submenu index="1" v-for="item in menulist" :key=item.id>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="1-4-1">
            <template slot="title">
          <i class="el-icon-location"></i>
          <span>选项1</span>
        </template>
        </el-menu-item>
      </el-submenu>
  
    </el-menu>
      </el-aside>
      <!-- 展示页 -->
      <el-main>Main</el-main>
    </el-container>
    <!-- / -->
  </el-container>
</template>

<script>
export default {
    data(){
        return{
            // 左侧菜单数据
        menulist:[],
        }
        
    
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            // window.sessionStorage.clear()
            this.$router.push('./login')
        },
        async getMenuList(){
          const {data:res} = await this.$http.get('/user/menu')
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
          this.menulist = res.data
          console.log(res.data);
        }
    }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5f5f7;
  > div{
    display: flex;
    align-items: center;
    span{
        margin-left: 10px;
        margin-right: 10px;
        font-size:16px;
        font-weight: bold;
    }
  }
}
.el-aside {
  background-color:#545C64;
}
.el-main {
  background-color: #f5f5f7;
}
</style>