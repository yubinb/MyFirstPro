import { get, post } from './http'

export const loginApi = p => post('/auth/login', p)  //登录
export const userInfo = p => post('/user/list', p)   //用户信息

export const allRoleList = p => post('/role/allRoleList', p)    //用户角色信息
export const addOrEdit = p => post('/user/addOrEdit', p)    //添加用户
export const companyInfo = p => post('/customs/sys/query', p)    //感觉是系统客户信息  里面有公司信息


