<template>
  <el-container class="global-main"
    v-loading="loading"
    element-loading-text="正在导入数据，请勿操作！"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">

    <el-header>
      <div class="mb15">
        <el-tabs v-model="activeTab" @tab-click="handleTabChange">
          <el-tab-pane name="0">
            <span slot="label">全部</span>
          </el-tab-pane>
          <el-tab-pane name="1">
            <span slot="label">自营</span>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">寄售</span>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">联营</span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex">
        <div class="flex-1">
          <jxzj-item :label-cellspacing="false">
            <jxzj-item-col>
              <jxzj-epc-selector
                width="200"
                :spu-type-id.sync="product.spuTypeId"
                :spu-type-name.sync="product.spuTypeName"
                @change="handleSearchClick">
              </jxzj-epc-selector>
            </jxzj-item-col>
            <jxzj-item-col>
              <jxzj-search-input
                v-model="product.keyword"
                placeholder="请输入SKU编码/商品名称/EPC编码/SPU码/存货编码"
                @click="handleSearchClick"
                width="480"></jxzj-search-input>
            </jxzj-item-col>
            <jxzj-item-col>
              <jxzj-button type="primary" @click="()=>{this.dialogVisible=true}">高级检索</jxzj-button>
            </jxzj-item-col>
          </jxzj-item>
        </div>
        <div>
          <jxzj-item :label-cellspacing="false">
            <jxzj-item-col>
              <el-upload
                class="upload-demo"
                :headers="{method:'POST',Accept:'application/json'}"
                ref="upload"
                :show-file-list="false"
                action="product/batchUpdateSkuByImport"
                :auto-upload="true"
                :on-progress="handleBeforeUpload"
                :on-success="handleFileUploadSuccess"
                :on-error="()=>{this.loading=false}">
                <jxzj-button type="refresh" display-key="importProduct">更新导入</jxzj-button>
              </el-upload>
            </jxzj-item-col>

            <jxzj-item-col>
              <el-upload
                class="upload-demo"
                :headers="{method:'POST',Accept:'application/json'}"
                ref="upload"
                :show-file-list="false"
                action="product/importSpuSku"
                :auto-upload="true"
                :on-progress="handleBeforeUpload"
                :on-success="handleFileUploadSuccess"
                :on-error="()=>{this.loading=false}">
                <jxzj-button type="refresh" display-key="importProduct">新增导入</jxzj-button>
              </el-upload>
            </jxzj-item-col>

            <jxzj-item-col>
              <jxzj-button @click="toAddProductPage" display-key="addProduct_v2">新建商品</jxzj-button>
            </jxzj-item-col>
          </jxzj-item>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-table
        :data="tableList"
        height="100%"
        v-loading="tableLoading"
        ref="tableRef">
        <el-table-column
          align="center"
          label="主图"
          width="100">



          <template slot-scope="{row,column,$index}">
            <jxzj-popover-img
              :src="row.skuImgUrl||defaultImg"
              trigger="hover"
              placement="right-start"
              width="200"
              height="200">
            </jxzj-popover-img>
          </template>





        </el-table-column>
        <el-table-column
          label="商品"
          width="150">
          <template slot-scope="{row}">
            <p class="mt10">{{row.skuName}}</p>
            <p>{{row.skuCode}}</p>
            <div :class="['spu-quality',row.skuQuality==1?'main':row.skuQuality==2?'orangeRed':'#FF9900']">
              {{row.skuQualityName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品规格"
          min-width="100">
          <template slot-scope="{row}">
            <p v-for="(item,index) in row.skuSpecData" :key="index">
              {{item.spuSpecName}}：{{item.spuSpecValueName}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          prop="spuUnitName"
          min-width="100" />
        <el-table-column
          label="B类指导价"
          min-width="100">
          <template slot-scope="{row}">
            {{row.limitPriceVip | fenToYuan}}
          </template>
        </el-table-column>
        <el-table-column
          label="C类指导价"
          min-width="100">

          <template slot-scope="{row}">
            {{row.limitPrice | fenToYuan}}
          </template>

        </el-table-column>
        <el-table-column label="创建人" min-width="100">
          <template slot-scope="{row}">
            <div>{{row.createName}}</div>
            <div>{{row.createTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="修改人" prop="updateName" min-width="100">
          <template slot-scope="{row}">
            <p>{{row.updateName}}</p>
            <p>{{row.updateTime}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="EPC"
          min-width="120">
          <template slot-scope="{row}">
            <el-button @click="handleEpcDetailClick(row)" type="text">{{row.epcId}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          :width="activeTab === '0'?'120':'90'">
          <template slot-scope="{row}">
            <span class="btn-group">
              <jxzj-button type="text" @click="toDetailPage(row)" display-key="detailProduct_v2">详情</jxzj-button>
              <jxzj-button type="text" @click="toEditPage(row)" display-key="editProduct_v2">编辑</jxzj-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <div class="pagination">
        <jxzj-pagination
          :page-index.sync="page.page"
          :page-size.sync="page.pageSize"
          :total="page.total"
          @change="queryTableData"></jxzj-pagination>
      </div>
    </el-footer>

    <!--高级检索弹窗-->
    <el-dialog
      title="高级检索"
      :visible.sync="dialogVisible"
      width="1000px">
      <el-form ref="ruleForm" :model="productExact" class="search-dialog-block" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称：">
              <el-input v-model="productExact.skuName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SPU编码：">
              <el-input v-model="productExact.spuCode" placeholder="请输入SPU编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类：">
              <jxzj-epc-selector
                width="300"
                :spu-type-id.sync="productExact.spuTypeId"
                :spu-type-name.sync="productExact.spuTypeName">
              </jxzj-epc-selector>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SKU编码：">
              <el-input v-model="productExact.skuCode" placeholder="请输入SKU编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人：">
              <el-select v-model="productExact.createUserId" placeholder="请选择创建人" filterable clearable>
                <el-option
                  v-for="(item,key) in userOptions"
                  :key="key"
                  :label="item.realName"
                  :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：">
              <jxzj-date-picker v-model="exactDate"></jxzj-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="品质：">
              <el-select v-model="productExact.skuQuality" placeholder="请选择品质" clearable>
                <el-option label="原厂" value="1"></el-option>
                <el-option label="副厂" value="3"></el-option>
                <el-option label="配套厂" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌：">
              <el-select filterable v-model="productExact.manufactureId" placeholder="请选择品牌" clearable>
                <el-option v-for="(item,index) in brandOptions"
                  :key="index"
                  :label="item.fullName"
                  :value="item.manufacturerId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否关联EPC：">
              <el-radio-group v-model="productExact.epcSign">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售类型：">
              <el-radio-group v-model="productExact.taxAbility">
                <el-radio label="1">自营</el-radio>
                <el-radio label="0">寄售</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-row>
          <el-col>
            <el-button @click="resetForm" class="c-black" type="text">清空</el-button>
            <jxzj-button @click="handleCloseDialog" class="ml10 mr10" width="100" type="refresh">取消</jxzj-button>
            <jxzj-button @click="handleExactSearchClick" width="100">开始检索</jxzj-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--epc配件图-->
    <epc-detail-dialog ref="epcDetail"></epc-detail-dialog>

  </el-container>

</template>

<script>
  import JxzjPagination from "../../../jxzj-ui/packages/pagination/pagination";
  import JxzjButton from "../../../jxzj-ui/packages/button/button";
  import JxzjSearchInput from "../../../jxzj-ui/packages/search-input/search-input";
  import JxzjTree from "../../common/jxzjModule/tree";
  import {
    getSkuProductList
  } from "../../../../static/api/product-controller";
  import { showErrorMessage, showInfoMessage, showSuccessMessage } from "../../../tool/Tools";
  import EpcDetailDialog from "./EpcDetailDialog";
  import { queryAllManufacturList } from "../../../../static/api/manufacturer-ctrl";
  import { queryAllJpcSystemUser } from "../../../../static/api/user-controller";

  export default {
    name: "ProductList_v2",
    components: { EpcDetailDialog, JxzjTree, JxzjSearchInput, JxzjButton, JxzjPagination },
    data() {
      return {
        tableLoading: true, // 表格数据加载loading
        tableList: [],
        classify: null,
        //当前选中tab
        activeTab: '0',
        // 自营 1 | 寄售 0
        taxAbility: null,
        // 联营 1 | 不是联营 0
        salesJoin: null,
        //搜索对象
        product: {
          brandId: null,
          spuTypeName: ''
        },
        page: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        //高级搜索
        productExact: {
          taxAbility: null
        },
        exactDate: [],
        brandOptions: [],
        userOptions: [],
        //默认图片
        defaultImg: require("@/assets/img/default-part-cover.jpg"),
        /*高级检索弹窗*/
        dialogVisible: false,
        treeDialogVisible: false,
        //  大图
        bigPhotoUrl: null,
        // showBigPhoto: false,
        clientY: 0,
        clientX: 0,
        auditDialogVisible: false,
        // 最后的搜索类型
        lastSearchType: 1,
        loading: false
      }
    },
    methods: {
      /**
       * 初始化数据
       */
      init() {
        this.queryTableData();
        //查询所有品牌
        queryAllManufacturList(null, res => {
          if (res.rspData) {
            this.brandOptions = res.rspData.data || [];
          }
        });
        queryAllJpcSystemUser({}, res => {
          this.userOptions = res.rspData;
        });
      },
      /**
       * 查询接口，1：普通搜索，2：高级搜索
       */
      queryTableData() {
        this.tableLoading = true
        let product = {};
        if (this.lastSearchType === 1) {
          // 标准搜索
          this.product.page = this.page.page;
          this.product.pageSize = this.page.pageSize;
          this.product.taxAbility = this.taxAbility;
          this.product.salesJoin = this.salesJoin;
          product = this.product;
        } else {
          // 精确查找
          this.productExact.startTime = this.exactDate[0];
          this.productExact.endTime = this.exactDate[1];
          this.productExact.page = this.page.page;
          this.productExact.pageSize = this.page.pageSize;
          this.productExact.taxAbility = this.taxAbility;
          this.productExact.salesJoin = this.salesJoin;
          this.product = {};
          product = this.productExact;
        }
        getSkuProductList(product, res => {
          this.dialogVisible = false;
          this.tableList = res.rspData.rspData;
          this.page.total = res.rspData.count;

          this.tableLoading = false
        })
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.productExact = {};
        this.exactDate = [];
      },
      /**
       * 关闭高级弹窗
       */
      handleCloseDialog() {
        this.dialogVisible = false;
      },
      /**
       * 高级检索
       */
      handleExactSearchClick() {
        this.page.page = 1;
        this.lastSearchType = 2;
        this.queryTableData();
      },
      handleSpuTypeChange() {
        this.lastSearchType = 1;
        this.queryTableData();
      },
      /**
       * 用户点击搜索
       */
      handleSearchClick() {
        this.page.page = 1;
        this.lastSearchType = 1;
        this.queryTableData();
      },
      handleTabChange({ name }) {
        this.page.page = 1;

        // 自营 1 | 寄售 0 (this.taxAbility)
        // 联营 1 | 不是联营 0 (this.salesJoin)
        switch (name) {
          case '0': // 全部
            this.taxAbility = null
            this.salesJoin = null
            break;
          case "1": // 自营
            this.taxAbility = 1
            this.salesJoin = 0 // 自营不包含联营供应商默认传0
            break;
          case "2": // 寄售
            this.taxAbility = 0
            this.salesJoin = 0 // 寄售不包含联营供应商默认传0
            break;
          case "3": // 联营
            this.taxAbility = null
            this.salesJoin = 1
            break;
        }

        this.queryTableData()
      },
      toAddProductPage() {
        this.$parent.routerClick('新建商品', 'AddProduct_v2', { clear: true });
      },
      handleFileUploadSuccess(res) {
        console.log(res, 'res');
        this.loading = false;
        if (res.rspCode === '0000') {
          showSuccessMessage('操作成功！');
          this.init();
        } else {
          showErrorMessage('操作失败：' + res.rspMsg);
        }
        this.queryTableData();
      },
      handleBeforeUpload() {
        this.loading = true;
      },
      /**
       * epc详情弹窗
       */
      handleEpcDetailClick(row) {
        this.$refs.epcDetail.refresh(row.epcId);
      },
      /**
       * 进入详情页面
       */
      toDetailPage(row) {
        this.$parent.routerClick('商品详情', 'ProductDetail_v2', { spuId: row.spuId });
      },
      /**
       * 进入商品编辑页面
       */
      toEditPage(row) {
        let routerCacheArr = this.$parent.routerCacheArr;
        if (routerCacheArr.indexOf('EditProduct_v2') > -1) {
          //已经存在编辑页面，提示是否需要先保存
          showInfoMessage('请先保存当前正在编辑的商品');
          return;
        }
        this.$parent.routerClick('编辑商品', 'EditProduct_v2', { spuId: row.spuId });
      }
    },
    activated() {
      this.init();
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    position: relative;

    .el-main {
      padding: 0px;

      header {
        padding: px(10) px(20);
        display: flex;
        justify-content: space-between;
      }

      section {

        /deep/ .el-table {
          color: $subGray;

          /deep/ thead {
            color: $black;
          }

          /deep/ .el-button--medium {
            padding: 0;
          }

          .spu-quality {
            position: absolute;
            right: 0;
            top: 0;
            color: #ffffff;
            font-size: 12px;
            background: $main;
            padding: 2px 5px;
            height: 22px;
          }

          .main {
            background: $main;
          }

          .orangeRed {
            background: $orangeRed;
          }

          .red {
            background: $red;
          }
        }

        .pagination {
          padding-top: 5px;
          position: relative;

          .left-btn {
            position: absolute;
            left: 0px;
            top: 10px;
          }
        }
      }
    }

    /*高级搜索*/
    .search-dialog-block {

      .el-input,
      .el-range-editor--medium.el-input__inner,
      .el-select {
        width: 300px;
      }
    }

    .upload-demo {
      display: inline-block;
    }

  }
</style>
