<template>
 <div>
  <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图区域 -->
    <el-card class="box-card">
        <!-- 添加角色 -->
        <el-row>
            <el-col>
                <el-button type="warning" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>
        </el-row>
         
     <!-- 表格区域 -->
     <el-table :data="roleList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" width="200px;">
          <template slot-scope="scope">
            <div>
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
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
    </el-card>
 </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有的权限列表
      roleList:[]
    }
  },
  created() {
    // 获取所有权限
    this.getRoleList()
  },
  methods: {
   async getRoleList(){
    const {data:res} = await this.$http.get('/my/rolelist')
    if (res.status !== 200) return this.$message.error('获取角色列表信息失败')
      this.roleList = res.data
    }
  },
}
</script>

<style>

</style>