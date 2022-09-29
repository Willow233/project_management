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
              <span>你好，用户名</span>
            </div>
          </el-card>
        </el-row>
        <!-- 图标卡片 -->
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
        <el-row>
          <el-card class="box-card" style="height: 310px">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OrderCard from './OrderCard.vue'
export default {
  components:{
    OrderCard
  },
  data() {
    return {
      
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
}
.el-avatar {
  margin-right: 15px;
}

.el-card__body {
  display: flex;
}


</style>