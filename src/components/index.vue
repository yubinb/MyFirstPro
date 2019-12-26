<template>
  <div>
    <div class="headerBox"></div>

    <div class="bottomBigBox">
      <div class="leftEl-row">
        <el-row class="tac">
          <el-col>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="addTab('first','第一项')" >选项1</el-menu-item>
                  <el-menu-item index="1-2"  @click="addTab('second','第二项')">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item index="1-3"  @click="addTab('third','第三项')">选项3</el-menu-item>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="mainContentBox">
        <div class="TagBox">
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
        </div>

        <div class="routeBox">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      editableTabsValue:'',
      userName: "13420001323",
      passWord: "20191029",
      editableTabs: [
        {
          title: "首页",
          name: "first",
        },
        
      ]
    };
  },
  methods: {
    addTab(targeLink,targetName) {
      this.$router.push({name: targeLink});
      for(var i=0;i<=this.editableTabs.length;i++){
        if(this.editableTabs[i].name==targeLink){
          var sameLink=1;
        }else{
          console.log("不同")
        }
      }
     if(sameLink=1){
       console.log("有相同的连接了")
     }else{
        this.editableTabs.push({
        title: targetName,
        name: targeLink, 
      });
     }
     
      console.log(this.editableTabs);
      
    },

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
};
</script>

<style scoped>
.headerBox {
  height: 50px;
  background-color: blue;
}
.bottomBigBox {
  display: flex;
}
.leftEl-row {
  height: 100%;
  width: 200px;
  overflow: hidden;
}
.TagBox {
  height: 38px;
  overflow: hidden;
  border-bottom: 1px solid black;
}
.mainContentBox {
  flex-grow:1;
  border: 1px solid red;
  height: 100%;
}
</style>
