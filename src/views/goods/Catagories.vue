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
          <el-button type="warning" @click="addDialogVisible = true"
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
    >

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
                    cat_pid:0,
                    cat_level:0,
                    children:[
                        {
                          cat_id:2,
                    cat_name:'电脑',
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
                }
            ]
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
        }
    }
}
</script>

<style>
</style>