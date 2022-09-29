// mock数据模拟
import Mock from 'mockjs'
import homeApi from './mockServeData/homepage'

Mock.mock('/homepage',homeApi.getStatisticalData)