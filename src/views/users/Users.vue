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
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click="addDialogVisible = true"
            >添加用户</el-button
          >
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

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户信息对话框 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 编辑区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>
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
        pagesize: 10,
      },
      userList: [],
      total: 0,
      
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addFormRules: {
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '电话号码不正确',
            trigger: 'blur',
          },
        ],
      },
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制编辑用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm:{
        username: '',
        email: '',
        mobile: '',
      },
      // 编辑表单数据验证
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '电话号码不正确',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/my/userlist', {
        params: this.queryInfo,
      })
      // console.log({ params: this.queryInfo })
      if (res.status !== 200) return this.$message.error('获取用户列表信息失败')
      this.userList = res.data
      this.total = res.total
      // console.log(res.data)
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
    // 监听switch 开关状态改变 服务器部分待补充
    /* async userStateChange(userinfo) {
      const { data: res } = await this.$http.put(
        `/my/userlist/${userinfo.id}/state/${userinfo.type}`
      )
      if (res.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('修改用户状态失败')
      }
      this.$message.success('更新用户状态成功!')
    }, */
    // 监听对话框被关闭事件
     addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 新增用户
    addUser() {
      this.$refs.addFormRef.validate(async (value) => {
        if (!value) return this.$message.error('表单校验失败')
        const { data: res } = await this.$http.post('/api/reguser', this.addForm)
        if (res.status !== 200) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.addDialogVisible = false
        // 根据新值重新获取列表
        this.getUserList()
      })
    },
    // 编辑用户信息
    async showEditDialog(id){
      const {data:res} = await this.$http.get('/my/userlist/' + id)
      if (res.status !== 200) return this.$message.error('获取当前用户信息失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editUser(){
    this.$refs.editFormRef.validate(async (value) => {
        if (!value) return this.$message.error('表单校验失败')
        const { data: res } = await this.$http.post('/my/userlist/'+ this.editForm.id, {email:this.editForm.email,mobile:this.editForm.mobile})
        if (res.status !== 200) return res.message
       
        this.editDialogVisible = false
        // 根据新值重新获取列表
        this.getUserList()
        this.$message.success('修改用户信息成功')
        
    })
  },
  // 删除用户信息
  async removeUserById(id){
    // 弹框确认是否删除
    const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
  console.log(confirmResult);
        if(confirmResult === 'confirm'){
          // 完整路径是/my/userlist【/】id id前还有一个/
         const {data:res} = await this.$http.delete('/my/userlist/' + id)
        if (res.status !== 200) return this.$message,error(res.message)
        // 根据新值重新获取列表
        this.getUserList()
        this.$message.success('删除用户信息成功')
        }
  }

}}
</script>

<style>
</style>