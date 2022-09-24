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
          <el-button type="warning" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开区域 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expandBox">
              <el-row
                :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
                v-for="(item1, index1) in scope.row.children"
                :key="item1.id"
              >
                <!-- 渲染一级权限 -->
                <el-col :span="5">
                  <el-tag
                  closable
                        @close="removeRightById(scope.row,item3.id)"
                  >{{ item1.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 渲染二级和三级权限 -->
                <el-col :span="19">
                  <el-row
                    :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']"
                    v-for="(item2, index2) in item1.children"
                    :key="item2.id"
                  >
                    <!-- 渲染二级权限 -->
                    <el-col :span="6">
                      <el-tag 
                      closable
                        @close="removeRightById(scope.row,item3.id)"
                      type="success">{{ item2.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 渲染三级权限 -->
                    <el-col :span="18">
                      <el-tag
                        closable
                        @close="removeRightById(scope.row,item3.id)"
                        type="warning"
                        v-for="(item3, index3) in item2.children"
                        :key="item3.id"
                        >{{ item3.authName }}</el-tag
                      >
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
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
      roleList: [],
    }
  },
  created() {
    // 获取所有权限
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('/my/rolelist')
      if (res.status !== 200) return this.$message.error('获取角色列表信息失败')
      this.roleList = res.data
    },
    // 根据id删除对应的权限
    async removeRightById(role,rightId) {
      // 提示框
      const confirmResult = await this.$confirm(
        '此操作将永久删除该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      if (confirmResult === 'confirm') {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.status !== 200) return this.$message.error('删除权限失败')
        this.$message.info('删除成功')
        role.children = res.data
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.expandBox {
  margin: 12px 30px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>