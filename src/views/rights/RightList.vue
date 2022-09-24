<template>
 <div>
  <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图区域 -->
    <el-card class="box-card">
     <!-- 表格区域 -->
     <el-table :data="rightList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="权限名称" prop="username"> </el-table-column>
        <el-table-column label="路径" prop="username"> </el-table-column>
        <el-table-column label="权限等级" prop="username"> </el-table-column>
        
     </el-table>
    </el-card>
 </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有的权限列表
      rightList:[]
    }
  },
  created() {
    // 获取所有权限
    this.getRightList()
  },
  methods: {
   async getRightList(){
    const {data:res} = await this.$http.get('/my/rightlist')
    if (res.status !== 200) return this.$message.error('获取权限列表信息失败')
      this.rightList = res.data
    }
  },
}
</script>

<style>

</style>