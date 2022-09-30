import axios from 'axios'

/* export const getMenu = (param) =>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
} */

export const getData = () =>{
    return axios.request({
        url:'/home/getDate',//mock地址
        method:'get'
    })
}