<template>
  <div>
<div class="headerBox"></div>

<div class="bottomBigBox">

<div class="leftEl-row"> 
<el-row class="tac">
  <el-col>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
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
  >
  </el-tab-pane>
</el-tabs>
</div>


123
</div>

</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      userName:'13420001323',
      passWord:'20191029',
      editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
    };
  },
  methods:{
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
  }
},
  }
}
</script>

<style scoped>
.headerBox{
height: 50px;
background-color: blue;
}
.bottomBigBox{
display: flex
}
.leftEl-row{
  height: 100%;
  width: 160px;
  border: 1px solid red;
}

.TagBox{
  border: 1px solid blue;
  height: 35px;
}
.mainContentBox{
  border: 1px solid red;
  width: 100%;
  height: 100%;
}
</style>
