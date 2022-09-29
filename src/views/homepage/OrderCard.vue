<template>
  <el-row :gutter="15">
    <el-col
      :span="6"
      v-for="(item, index) in countData"
      :key="index"
      class="box-card"
    >
      <div>
        <el-card :style="{ background: item.color }">
          <i :class="`${item.icon}`" class="icon-style"></i>
          <span class="order-title">{{ item.cardTitle }}</span>
          <span class="order-num">{{item.value}}</span>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      name: 'OrderCard',
      countData: [
        {
          cardTitle: '今日已支付订单',
          icon: 'el-icon-goods',
          color: '#f6aea1',
          value: 3240,
        },
        {
          cardTitle: '今日未支付订单',
          icon: 'el-icon-goods',
          color: '#889fed',
          value: 1210,
        },
        {
          cardTitle: '今日已支付订单',
          icon: 'el-icon-goods',
          color: '#94dfe8',
          value: 3450,
        },
        {
          cardTitle: '今日已支付订单',
          icon: 'el-icon-goods',
          color: '#fbd97f',
          value: 5670,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>

 
  .el-card {
     position: relative;
    color: white;
    height: 145px;
    .icon-style {
      position: absolute;
      top: 10px;
      right: 20px;
      display: block;
      text-align: center;
      line-height: 30px;
      
      height: 30px;
      width: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }

    .order-title{
        position:absolute;
        font-size: 12px;
        top: 90px;
    }
    .order-num{
        position:absolute;
        font-size: 22px;
        top: 110px;
    }

  }

</style>