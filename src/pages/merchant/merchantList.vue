<style lang='scss'>
  .hd {
    margin-bottom: 5px;
  }
  .merchant {
    .el-form {
      width: 500px;
    }
  }
</style>
<template>
  <div class="merchant">
    <header class="hd">
      <Button size="small" @click="addMerchant">增加</Button>
    </header>
    <Table :data="list" border="true" size="small">
      <table-column label="logo" prop="logo" header-align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logo" alt style="width: 50px;height: 50px">
        </template>
      </table-column>
      <table-column label="名字" prop="mname" header-align="center"></table-column>
      <table-column label="评分" prop="score" header-align="center"></table-column>
      <table-column label="类型" prop="merchantType" header-align="center"></table-column>
      <table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <Button size="small" type="text" @click="edit(scope.row)">编辑</Button>
          <Button size="small" type="text" @click="deleteEvent(scope.row)">删除</Button>
          <Button size="small" type="text" @click="goodsType(scope.row)">商品分类</Button>
          <Button size="small" type="text" @click="goodsList(scope.row)">商品列表</Button>
        </template>
      </table-column>
    </Table>

    <Dialog :title="dialogTitle" :visible.sync="editShow">
      <Form :model="formObj" label-width="100px">
        <form-item label="店铺logo">
          <Input v-model="formObj.logo"/>
        </form-item>
        <form-item label="店铺背景图">
          <Input v-model="formObj.headImg"/>
        </form-item>
        <form-item label="名字">
          <Input v-model="formObj.mname"/>
        </form-item>
        <form-item label="类型">
          <Input v-model="formObj.merchantType"/>
        </form-item>
        <form-item label="是否品牌店">
          <Input v-model="formObj.isBrand"/>
        </form-item>
        <form-item label="起送价格">
          <Input v-model="formObj.startPrice"/>
        </form-item>
        <form-item label="配送费">
          <Input v-model="formObj.distributionPrice"/>
        </form-item>
        <form-item label="满减">
          <Input v-model="formObj.meetAmount" style="width: 80px; margin-right: 20px" />
          <Input v-model="formObj.discounts"  style="width: 80px" />
        </form-item>
        <form-item>
          <Button @click="save">保存</Button>
        </form-item>
      </Form>
    </Dialog>
    <Dialog title="商品类型" :visible.sync="goodsTypeShow">
      <goods-type :merchantId="merchantId"></goods-type>
    </Dialog>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Form, FormItem, Input, Dialog } from "element-ui";
import goodsType from './goodsType'

export default {
  data() {
    return {
      list: [],
      isAlter: false,
      formObj: {
        logo: '',
        mname: '',
        headImg: '',
        merchantType: '',
        isBrand: '',
        startPrice: '',
        distributionPrice: '',
        meetAmount: '',
        discounts: '',
      },
      editShow: false,
      dialogTitle: '',
      goodsTypeShow: false,
      merchantId: '',
    };
  },
  components: {
    goodsType, Table, TableColumn, Button, Form, FormItem, Input, Dialog
  },
  mounted() {
    this.getMerchantList();
  },
  methods: {
    addMerchant() {
      for (let key in this.formObj) {
        this.formObj[key] = ""
      }
      this.editShow = true;
      this.dialogTitle = '新增'
    },
    getMerchantList() {
      this.$api.merchantList().then(res => {
        const data = JSON.parse(res);
        this.list = data.data;
      });
    },
    close(isShow) {
      this.isAlter = false;
    },
    edit(data){
      this.formObj = data;
      this.editShow = true;
      this.dialogTitle = '编辑'
    },
    save(){
      let interfaceName = this.dialogTitle === '新增' ? 'merchantAdd' : 'merchantUpdate';
      this.$api[interfaceName](this.formObj).then(res => {
        let result = JSON.parse(res)
        if (result.code === 0) {
          this.$message({
            message: result.msg,
            type: 'success'
          });
          this.editShow = false
          this.getMerchantList()
        }
      })
    },
    deleteEvent(data) {
      this.$api.merchantDelete({
        MID: data.MID
      }).then(res => {
        let result = JSON.parse(res)
        if (result.code === 0) {
          this.$message({
            message: result.msg,
            type: 'success'
          });
          this.editShow = false
          this.getMerchantList()
        }
      })
    },
    goodsList(data) {
        this.$router.push('/goodsList/'+data.MID)
    },
    goodsType(data){
      this.merchantId = data.MID;
      this.goodsTypeShow = true;
    }
  }
};
</script>

