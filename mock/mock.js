// mock数据模拟
import Mock from 'mockjs'
import homeApi from './mockServeData/homepage'

Mock.mock('/home/getDate',homeApi.getStatisticalData)