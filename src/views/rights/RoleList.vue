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
                        @close="removeRightById(scope.row,item1.id)"
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
                        @close="removeRightById(scope.row,item2.id)"
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
        <el-table-column label="操作" width="260px;">
          <template slot-scope="scope">
            <div>
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              >编辑</el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              >删除</el-button>
              <!-- 分配角色按钮 -->
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="showSetRightDialog(scope.row)"
                >权限</el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
  title="分配权限"
  :visible.sync="setRightDialogVisible" @close="setRightDialogClosed"
  width="50%"
  >
  <el-tree :data="rightlist" :props="treeProps" 
  :default-checked-keys="defKeys" ref="treeRef"
  show-checkbox node-key="id" default-expand-all></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data() {
    return {
      // 所有的权限列表
      roleList: [],
      //   控制权限分配对话框
      setRightDialogVisible: false,
      rightlist: [],
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      // 默认选中的节点id值数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: '',
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
    async removeRightById(role, rightId) {
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
        const { data: res } = await this.$http.delete(
          `roles/${role.id}/rights/${rightId}`
        )
        if (res.status !== 200) return this.$message.error('删除权限失败')
        this.$message.info('删除成功')
        role.children = res.data
      }
    },
    // 根据分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      // const {data:res} = await this.$http.get('rights/tree')
      // if(res.status !== 200) return this.$message.error('获取消息失败')
      const { data: res } = await this.$http.get('/my/menu')
      if (res.meta.status !== 200)
        return this.$message.error('获取列表信息失败')
      // 存储获取的权限信息
      this.rightlist = res.data
      // 获取三级权限id
      this.getLeafKeys(role, this.defKeys)
      //  显示提示框
      this.setRightDialogVisible = true
    },
    // 通过递归的形式，获取角色下的所有三级权限id
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        // element ui 内置函数
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHaltCheckedKeys(),
      ]

      const idStr = keys.join(',')
  
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) return this.$message.error('修改权限失败')
      this.$message.success('分配权限成功')

    this.getRoleList()
      setRightDialogVisible = false
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