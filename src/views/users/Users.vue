<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索添加区域 -->
          <el-input
          clearable
          @clear="getUserList"
          v-model="queryInfo.query"
          placeholder="请输入内容"
          class="input-with-select">
            <el-button 
            slot="append" 
            icon="el-icon-search"
            @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="用户名" prop="username"> </el-table-column>
        <el-table-column label="权限" prop="role_name"> </el-table-column>
        <el-table-column label="邮箱地址" prop="email"> </el-table-column>
        <el-table-column label="电话号码" prop="mobile"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- 通过 :active-value="1" :inactive-value="0" 这两个属性 解决了switch是布尔值 而sql没有布尔值的问题 -->
            <el-switch
              v-model="scope.row.mg_state"
              :active-value="1"
              :inactive-value="0"
              active-color="#F9AB44"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px;">
          <template slot-scope="scope">
            <div>
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
              <!-- 分配角色按钮 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="修改用户权限"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      userList: [],
      total: 0,
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/my/customs', {
        params: this.queryInfo,
      })
      // console.log({ params: this.queryInfo })
      if (res.status !== 200) return this.$message.error('获取用户列表信息失败')
      this.userList = res.data
      this.total = res.total
      console.log(res.data)
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize
      // 根据新值重新获取列表
      this.getUserList()
    },
    // 监听 页码值的变化
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      // 根据新值重新获取列表
      this.getUserList()
    },
    // 监听switch 开关状态改变
    async userStateChange(userinfo) {
      const { data: res } = await this.$http.put(
        `/my/customs/${userinfo.id}/state/${userinfo.type}`
      )
      if (res.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('修改用户状态失败')
      }
      this.$message.success('更新用户状态成功!')
    },
  },
}
</script>

<style>
</style>