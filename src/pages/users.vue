<template>
  <div>
    <header class="user_hd">
      <Button @click="isAlter = true">新增</Button>
    </header>
    <Table :data="list" :border="true">
      <table-column label="注册日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </table-column>
      <table-column label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </table-column>
      <table-column label="角色">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </table-column>
      <table-column label="操作">
        <template slot-scope="scope">
          <Button @click="handleEdit(scope.$index, scope.row)" size="mini">编辑</Button>
          <Button @click="handleDelete(scope.$index, scope.row)" size="mini">删除</Button>
        </template>
      </table-column>
    </Table>
    <div class="mask" v-show="isAlter">
      <div class="mask_wrap">
        <i class="el-icon-close" @click="isAlter = !isAlter"></i>
        <add-user></add-user>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Button } from "element-ui";
import addUser from "./addUser";

export default {
  data() {
    return {
      isAlter: false,
      list: [
        // {
        //     createTime: '2019-01-11',
        //     userName: 'jane',
        //     role: '管理员'
        // }
      ],
    };
  },
  components: {
    Table,
    TableColumn,
    Button,
    addUser
  },
  mounted() {
    this.getUserList();
    this.$on("test", this.test);
  },
  methods: {
    handleEdit(index, row) {},
    handleDelete(index, row) {
      const { uid } = row;
      this.$http
        .post("/admin/user/delete", {
          uid
        })
        .then(res => {
          const data = res.data;
          if (data.code === 0) {
            this.getUserList();
          }
        });
    },
    getUserList() {
      this.$api.userList().then(res => {
        const result = JSON.parse(res);
        if (result.code === 0) {
          this.list = result.data;
        } else {
          Notification({
            title: "获取用户列表失败",
            message: result.msg
          });
        }
      });
    },
    test() {
      this.isAlter = false;
      this.getUserList();
    }
  }
}
</script>

<style lang="scss">
.user_hd {
  margin-bottom: 10px;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(55, 55, 55, 0.2);
  &.mask_wrap {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 50%;
    padding: 15px 10px 10px 10px;
    border: 1px solid #ebeef5;
  }
  &.el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
