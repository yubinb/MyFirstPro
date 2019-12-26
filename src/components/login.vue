<template>
  <div>
    <div class="titlebox">
      <span>欢迎来到我的XXXX网站</span>
    </div>

    <div class="hello">
      <el-form>
        <el-form-item label="登录账号">
          <el-input placeholder="请输入登录账号" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input placeholder="请输入登录密码" v-model="ruleForm.passWord"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="clickBox">
      <el-button type="primary" @click="clearMsg">清空</el-button>
      <el-button type="primary" @click="resistMsg">登录</el-button>
    </div>
  </div>
</template>
<script>
import { loginApi } from "../httpRequestApi/api";

export default {
  name: "HelloWorld",
  data() {
    return {
       ruleForm:{
        userName:"13420001323",
      passWord:"20191029"
      }
      
    };
  },
  methods: {
    clearMsg() {
      this.ruleForm={};
    },

    resistMsg() {

      loginApi({
        //使用封装好的方法请求
        password: this.ruleForm.passWord,
        rememberMe: false,
        userName: this.ruleForm.userName
      })
        .then(res => {
          if (res.data.responseCode=="0000"){
            this.$message({
          message: '登录成功！',
          type: 'success'
        });
        this.$router.push({ name: "index" });
          }else{
            this.$message({
          message: res.data.responseMsg,
          type: 'error'
          })
          }
        }).catch(err => {
          console.log("error submit!!");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 26%;
  text-align: center;
  margin: 0 auto;
}
.titlebox {
  font-size: 24px;
  color: black;
  text-align: center;
  margin-bottom: 70px;
  margin-top: 100px;
}
.clickBox {
  padding-top: 40px;
  text-align: center;
}
</style>
