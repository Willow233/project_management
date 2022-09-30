<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-button type="warning" @click="showAddCateDialogVisible"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
    <!-- 表格 -->
    <tree-table 
    :data="cateList"
    :columns="columns"
    :selection-type="false"
    :expand-type="false"
    show-index
    border
    :show-row-hover="false"
    >
    <!-- 菜单级别 -->
        <template slot="level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级菜单</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级菜单</el-tag>
          <el-tag type="warning" v-else>三级菜单</el-tag>
        </template>
    <!-- 是否有效 -->
        <template slot="isOK" slot-scope="scope">
          <i class="el-icon-circle-check" 
          v-if="scope.row.cat_delete === false"
          style="color:#00CC33; font-size:16px;"></i>
          <i class="el-icon-circle-close" v-else
          style="color:#F56C6C; font-size:16px;"></i>
        </template>
        
        <!-- 操作 -->
        <template slot="option" slot-scope="scope" >
          <div >
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
          </div>
        </template>
    </tree-table>
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

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
    >
      <!-- 添加区域 -->
      <el-form
        :model="addCate"
        ref="addFormRef"
        label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="addCate" prop="cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
           <el-cascader
    v-model="selectedKeys"
    :options="parentCateList"
    :props="cascaderProps"
    @change="parentCateChange"
    clearable
    change-on-select
    ></el-cascader>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
            type:3,
            // 当前的页数
            pagenum: 1,
            // 当前每页显示多少条数据
            pagesize: 10,
            },
            // 分类列表
            cateList:[
                {
                    cat_id:1,
                    cat_name:'家电',
                    cat_delete:false,
                    cat_pid:0,
                    cat_level:0,
                    children:[
                        {
                          cat_id:11,
                    cat_name:'电脑',
                    cat_delete:false,
                    cat_pid:1,
                    cat_level:1 
                        },
                        {
                          cat_id:12,
                    cat_name:'手机',
                    cat_delete:false,
                    cat_pid:1,
                    cat_level:1,
                    children:[
                      {
                        cat_id:1,
                    cat_name:'iphone',
                    cat_delete:false,
                    cat_pid:12,
                    cat_level:2,
                      }
                    ]
                        }
                    ]

                },
                {
                    cat_id:2,
                    cat_name:'服饰',
                    cat_delete:false,
                    cat_pid:0,
                    cat_level:0,
                    children:[
                        {
                          cat_id:21,
                    cat_name:'女装',
                    cat_pid:2,
                    cat_level:1 
                        }
                    ]

                }
            ],
            total:10,
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                  label:'是否有效',
                  prop:'cat_delete',
                  type:'template',
                  template:'isOK',
                  width:"120px;"
                  
                },
                {
                    label:'级别',
                    type:'template',
                  template:'level',
                  width:"120px;"
                },
                {
                    label:'操作',
                    type:'template',
                  template:'option',
                  width:"180px;"
                }

            ],
            addCate:{
              cat_id:'',
              cat_name:'',
              cat_pid:0,
              cat_level:0
            },
            addCateDialogVisible:false,
            parentCateList:[
               {
                    cat_id:1,
                    cat_name:'家电',
                    cat_delete:false,
                    cat_pid:0,
                    cat_level:0,
                    children:[
                        {
                          cat_id:11,
                    cat_name:'电脑',
                    cat_delete:false,
                    cat_pid:1,
                    cat_level:1 
                        },
                        {
                          cat_id:12,
                    cat_name:'手机',
                    cat_delete:false,
                    cat_pid:1,
                    cat_level:1,
                        }
                    ]

                },
                {
                    cat_id:2,
                    cat_name:'服饰',
                    cat_delete:false,
                    cat_pid:0,
                    cat_level:0,
                    children:[
                        {
                          cat_id:21,
                    cat_name:'女装',
                    cat_pid:2,
                    cat_level:1 
                        }
                    ]

                }
            ],
            cascaderProps:{ 
              value:'cat_id',
              label:'cat_name',
              children:'children',
              expandTrigger: 'hover' },
              selectedKeys:[]
        }
    },
    created() {
        this.getCateList()
    },
    methods:{
       async getCateList(){
            const {data:res} = await this.$http.get('/categories',{params:this.queryInfo})
             if (res.status !== 200) return this.$message.error('获取分类列表信息失败')
            this.cateList = res.data.result
            this.total = res.data.total
        },
        handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getCateList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getCateList()
        },
        //添加分类对话框
        showAddCateDialogVisible(){
          this.addCateDialogVisible=true
          this.getParentCateList()
        },
        // 获取父级分类的数据表
       async getParentCateList(){
          // const {data:res} = await this.$http.get('/categories',{params:{type:2}})
          //    if (res.status !== 200) return this.$message.error('获取父级菜单失败')
          //   this.parentCateList = res.data.result
        },
        // 选择项发生变化触发
        parentCateChange(){

        }
    }
}
</script>

<style lang="less" scoped>
.el-cascader{
  width: 100%;

  .el-cascader-menu__list{
    height: 200px;
  }
}


</style>