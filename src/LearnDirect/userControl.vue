<template>
  <div>
    <el-button type="primary" @click="AddUser">新建用户</el-button>

    <div class="tableBox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="240"></el-table-column>
        <el-table-column prop="userNameChn" label="姓名" width="220"></el-table-column>
        <el-table-column prop="roleName" label="角色" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="280"></el-table-column>
        <el-table-column prop="tel" label="手机号码" width="260"></el-table-column>
        <el-table-column prop="isValid" label="账号状态">
          <template slot-scope="{row}">{{row.isValid==true?"有效":"无效"}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="{row}">
            <el-button @click="CheckUserInfo(row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="editUserInfo(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="DialogBox">
      <el-dialog :title="dialogFormType==1?'新建用户信息':dialogFormType==2?'查看用户信息':'编辑用户信息'" :visible.sync="dialogFormVisible" width="800px">
        <el-form class="dialogContent">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="dialogContentData.userName"></el-input>
          </el-form-item>

          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="dialogContentData.userNameChn"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="dialogContentData.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="dialogContentData.email"></el-input>
          </el-form-item>

          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="dialogContentData.roleId" placeholder="请选择用户角色">
              <el-option
                v-for="item in roleData"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
                <!-- //value是传的值  label是界面上显示的值  -->
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="账号状态" :label-width="formLabelWidth">
            <el-select placeholder="请选择活动区域" v-model="dialogContentData.isValid">
              <el-option label="有效" value="true"></el-option>
              <el-option label="无效" value="false"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属公司" :label-width="formLabelWidth">
            <el-select v-model="dialogContentData.companyId" placeholder="请选择所属公司">
              <el-option
                v-for="item in companyInfo"
                :key="item.companyId"
                :label="item.companyName"
                :value="item.companyId"
              >
                <!-- //value是传的值  label是界面上显示的值  -->
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="DialogCommit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  userInfo,
  allRoleList,
  addOrEdit,
  companyInfo
} from "../httpRequestApi/api";

export default {
  name: "first",
  data() {
    return {
      tableData: [],
      dialogContentData: {
        userId: "",
        userName: "",
        userNameChn: "",
        roleId: "",
        email: "",
        tel: "",
        companyId: "",
        isValid: ""
      },
      roleData: [],
      pageNum: 1,
      pageSize: 10,
      total: null,
      dialogFormVisible: false,
      dialogFormType: 1,   //用来判断是 新建用户  还是查看用户 或编辑用户
      formLabelWidth: "100px",
      companyInfo: []
    };
  },
  methods: {
    queryUserInfo() {
      //用户列表信息
      userInfo({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    handleCurrentChange() {
      //分页
      this.queryUserInfo();
    },
    AddUser() {
      //添加用户按钮点击
      this.dialogFormType=1;
      this.dialogContentData={};
      this.dialogFormVisible = true;
    },
    roleInfo() {
      allRoleList().then(res => {
        this.roleData = res.data;
      });
    },
    DialogCommit() {
      //dialog点击确认按钮
      if (this.dialogFormType != 2) {
        addOrEdit(this.dialogContentData).then(res => {
          if (res.responseCode == "0000") {
            //新建用戶成功操作
            this.$message({ message: "用戶新增成功", type: "success" }),
              this.queryUserInfo(),
              (this.dialogFormVisible = false);
          } else {
            this.$message({ message: res.responseMsg, type: "error" });
          }
        });
      }else {
        console.log("不是新建用戶信息 不用管");
        this.dialogFormVisible = false;
      }
    },
    companyInfoQuery() {
      companyInfo({
        companyName: null,
        pageSize: 10,
        pageNum: 1
      }).then(res => {
        this.companyInfo = res.data.list;
        console.log(this.companyInfo);
      });
    },
    CheckUserInfo(row){//查看用户信息
      console.log(row);
        this.dialogFormType=2;
       Object.keys(this.dialogContentData).forEach(key => {
         this.dialogContentData[key] =row[key]
       });
       this.dialogFormVisible=true;
    },
    editUserInfo(row){
      //   this.dialogFormType=3;
      //   Object.keys(this.dialogContentData).forEach(key => {
      //    this.dialogContentData[key] =row[key]
      //  });
      //  this.dialogFormVisible=true;
    },
  },
  created: function() {
    this.queryUserInfo();
    this.roleInfo();
    this.companyInfoQuery();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tableBox {
  margin: 20px 0 0 0;
}
.block {
  text-align: center;
  margin-top: 20px;
}
.DialogBox .el-form-item {
  width: 500px;
}
.dialogContent {
  width: 80%;
}
</style>
