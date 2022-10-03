<template>
  <div>
    <el-row>
      <span style="font-size: 12px; font-weight: 700">首页</span>
    </el-row>
    <el-row :gutter="15">
      <!-- 左侧信息栏 -->
      <el-col :span="12">
        <!-- 个人信息 -->
        <el-row>
          <el-card shadow="never" style="height: 85px">
            <div class="welcome">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
              <div class="text">
              <span class="username">{{username}}</span>
              <span class="role-name">超级管理员</span>
              </div>
              
            </div>
          </el-card>
        </el-row>
        <!-- E-chart卡片 -->
        <el-row :gutter="15">
          <el-col :span="12">
            <el-card class="box-card" style="height: 300px">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</el-button
                >
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" style="height: 300px">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</el-button
                >
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 通知公告 -->
        <el-row>
          <el-card class="box-card" style="height: 160px">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
          </el-card>
        </el-row>
      </el-col>
      <!-- 右侧信息栏 -->
      <el-col :span="12">
        <!-- 订单信息 -->
        <el-row>
          <el-card class="box-card" style="height: 250px">
            <div slot="header" class="clearfix">
              <span>订单信息</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button>
            </div>
            <OrderCard/>
          </el-card>
        </el-row>
        <!-- 订单列表 -->
        <el-row>
          <el-card class="box-card" style="height: 310px">
            <div slot="header" class="clearfix">
              <span>订单列表</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
              <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
            
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OrderCard from './components/OrderCard.vue'
import * as echarts from 'echarts'

export default {
  components:{
    OrderCard
  },
  data() {
    return {
      username:'',
      circleUrl:'https://avatars.githubusercontent.com/u/106798976?v=4',
      tableData:[]
    }
  },
  created() {
    this.getUsername(),
    this.getHomeData()
  },
  methods: {
    async getUsername() {
      const { data: res } = await this.$http.get('/my/userinfo')
      if (res.status !== 200) return this.$message.error('获取用户信息失败')
      console.log(res)
      this.username = res.data.username
    },

    async getHomeData(){
      const { data: res } = await this.$http.get('/my/getdate')
      // if (res.meta.status !== 200) return this.$message.error('获取首页数据失败')
      console.log(res)
      this.tableData = res.data.tableData
    }


  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.welcome {
  display: flex;
  align-items: center;
  .el-avatar {
  margin-right: 15px;
}
.text{
  display: flex;
  flex-direction: column;
  .username{
    font-size: 20px;
  }
  .role-name{
    margin-top:5px;
    font-size: 12px;
    color: rgb(158, 158, 158);
  }
}
}




.el-card__body {
  display: flex;
}

.el-table{
    margin-top: 0px;
}


</style>