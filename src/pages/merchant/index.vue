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
          <Button size="small" type="text" @click="delete(scope.row)">删除</Button>
        </template>
      </table-column>
    </Table>
    <Alter :isAlter="isAlter" v-on:alterClose="close">
      <Form :model="formObj" label-width="100px">
        <form-item label="店铺logo">
          <Input v-model="formObj.logo"/>
        </form-item>
        <form-item label="店铺背景图">
          <Input v-model="formObj.headImg"/>
        </form-item>
        <form-item label="名字">
          <Input v-model="formObj.name"/>
        </form-item>
        <form-item label="类型">
          <Input v-model="formObj.type"/>
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
        <form-item>
          <Button>保存</Button>
        </form-item>
      </Form>
    </Alter>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Form, FormItem, Input } from "element-ui";
import Alter from 'comp/alter.vue'

export default {
  data() {
    return {
      list: [],
      isAlter: false,
      formObj: {
        logo: '',
        name: '',
        headImg: '',
        type: '',
        isBrand: '',
        startPrice: '',
        distributionPrice: '',
      },
    };
  },
  components: {
    Table, TableColumn, Button, Form, FormItem, Input
    , Alter
  },
  mounted() {
    this.getMerchantList();
  },
  methods: {
    addMerchant() {
      this.isAlter = !this.isAlter;
    },
    getMerchantList() {
      this.$api.merchantList().then(res => {
        const data = JSON.parse(res);
        console.log(data);
        this.list = data.data;
      });
    },
    close(isShow) {
      this.isAlter = false;
    }
  }
};
</script>

