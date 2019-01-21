/**
 * @description: 菜单管理
 * @param {type} 
 * @return: 
 */
<style lang='scss'>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<template>
  <div class>
    <!-- <Tree
      :data="data4"
      show-checkbox
      node-key="id"
      default-expand-all
       :props="defaultProps"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.iname }}</span>
        <span>
          <Button type="text" size="mini" @click="() => append(data)">编辑</Button>
          <Button type="text" size="mini" @click="() => remove(node, data)">删除</Button>
        </span>
      </span>
    </Tree>-->
    <Tree
      :data="menu"
      node-key="iid"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
      icon-class="el-icon-caret-right"
      :render-content="renderContent"
    ></Tree>
    <Alter v-show="isAlter">
      <i class="el-icon-close" @click="close"></i>
      <Form label-width="100px">
        <form-item label="名称">
          <Input v-model="formVal.iname"/>
        </form-item>
        <form-item label="icon">
          <Input v-model="formVal.icon"/>
        </form-item>
        <form-item label="路由名称">
          <Input v-model="formVal.path"/>
        </form-item>
        <form-item>
          <Button type="primary" size="size" @click="submit">提交</Button>
        </form-item>
      </Form>
    </Alter>
  </div>
</template>

<script>
import { Tree, Button, Form, FormItem, Input, Message } from "element-ui";
import Alter from "../components/alter.vue";

export default {
  components: {
    Tree, Button, Form, FormItem, Input, Message,
    Alter
  },
  data() {
    return {
      formVal: {
        iname: "",
        icon: "",
        path: ""
      },
      isAlter: false,
      menu: [],
      defaultProps: {
        children: "children",
        label: "iname"
      }
    };
  },
  computed: {
    menuList() {
      return [
        {
          id: 0,
          iname: "菜单管理",
          children: this.$store.state.menuList
        }
      ];
    }
  },
  created() {
    
  },
  mounted() {
    this.$nextTick(function(){
      setTimeout(() => {
        if (this.menuList) {
          this.menu = JSON.parse(JSON.stringify(this.menuList))
        }
      })
    })
  },
  methods: {
    append(data) {
      const newChild = { iid: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      /* const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1); */
      this.$api.menuDelete({
        id: data.iid
      }).then(val => {
        val = JSON.parse(val)
        if (val.code === 0) {
          Message({
            message: '删除成功',
            type: 'success'
          });
          this.getMenuList()
        } else {
          Message({
            message: '删除失败',
            type: 'error'
          });
        }
      })
    },
    addMenu(data) {
      if (data.id === 0) {
        //增加一级菜单
        this.isAlter = true;
      } else {
        // 增加二级菜单
      }
    },
    submit() {
      this.request();
    },
    request() {
      this.$api
        .menuAdd({
          iname: this.formVal.iname,
          icon: this.formVal.icon,
          path: this.formVal.path
        })
        .then(val => {
          const data = JSON.parse(val);
          if (data.code === 0) {
            this.isAlter = false;
            Message({
              title: '增加成功',
              type: 'success'
            })
            this.getMenuList()
          }
        });
    },
    close() {
      this.isAlter = false;
    },
    renderContent(h, { node, data, store }) {
      console.log("h:", store);
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <Button size="mini" type="text" on-click={() => this.addMenu(data)}>
              增加
            </Button>
            <Button size="mini" type="text" on-click={() => this.append(data)}>
              编辑
            </Button>
            <Button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </Button>
          </span>
        </span>
      );
    }
  }
};
</script>

