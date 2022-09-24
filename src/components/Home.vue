<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/image/icon1.png" alt="" width="30px;" />
        <span>电商管理后台系统</span>
      </div>
      <div>
        <span>晚上好，{{ username }}</span>
        <button @click="logout">退出登录</button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="iconfont icon-category"></i>
        </div>
        
        <!-- 侧边菜单栏 -->
        <el-menu
          background-color="#f3e48f"
          text-color="#909490"
          active-text-color="#F76E1E"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
        <!-- 首页 -->
         <el-menu-item index="/home">
        <template slot="title">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </template>
       
         </el-menu-item>
          <!-- 一级菜单 -->
          <!-- index只接收字符串 -->
          
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="iconfont icon-all"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 展示页 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- / -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 用户名
      username: '',
      // 左侧菜单数据
      menulist: [],
      // 图标列表
      iconObj: {
        101: 'iconfont icon-Customermanagement',
        102: 'iconfont icon-product',
        103: 'iconfont icon-packaging',
        104: 'iconfont icon-manage-order',
        105: 'iconfont icon-topsales',
      },
      isCollapse: false,
      // 被激活的地址
      activePath: '',
    }
  },
  created() {
    this.getUsername()
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('./login')
    },
    async getUsername(){
      const { data: res } = await this.$http.get('/my/userinfo')
      if (res.status !== 200) return this.$message.error('获取用户信息失败')
      console.log(res);
      this.username = res.data.username
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/my/menu')
      if (res.meta.status !== 200) return this.$message.error('获取列表信息失败')
      this.menulist = res.data
      console.log(res.data)
    },
    // 切换菜单展示
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #fad961;
  background-image: linear-gradient(247deg, #fad961 0%, #f76b1c 100%);

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5f5f7;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.el-aside {
  background-color: #f3e48f;
  .el-menu {
    border-right: none;
    .el-submenu__title {
      .iconfont {
        font-size: 20px;
        color: rgb(30, 19, 7);
        margin-right: 5px;
      }
      > span {
        color: rgb(30, 19, 7);
        font-weight: bold;
      }
    }

    .el-menu-item {
      color: rgb(30, 19, 7);
      .iconfont {
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
.el-main {
  background-color: #f5f5f7;
}

.toggle-button {
  background-color: rgb(23, 17, 11);
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  .iconfont {
    font-size: 20px;
    color: #f3e48f;
  }
}
</style>