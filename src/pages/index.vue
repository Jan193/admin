<style lang='scss'>
$userHeight: 40px;
$menuColor: #bfcbd1;
i {
  font-style: normal;
}
i.icon {
  margin-right: 5px;
  color: #fff;
}
.index {
  display: flex;
  height: 100%;
  &-container {
    background-color: #f0f0f0;
  }
}
.index-menu {
  background-color: #304156;
  a {
    color: #bfb19e;
  }
}
.el-aside {
  background-color: #304156;
}
.el-submenu__title {
  color: $menuColor;
  &:hover {
    background-color: #263445;
  }
}
.el-menu-item {
  color: #fff;
  a {
    color: $menuColor;
  }
  &:hover {
    background-color: #001528;
  }
}
.el-menu {
  border-right: none;
}
// .el-submenu {
//   .el-menu {
//     background-color: #1f2d3d;
//     border-right: 0;
//   }
// }
.index-header {
  background-color: #fff;
  &_left {
    line-height: 60px;
    float: left;
    .hamburger {
      cursor: pointer;
    }
  }
}
.index-user {
  float: right;
  margin-top: 10px;
  &:hover &_submenu {
    display: block;
  }
  &_info {
    height: $userHeight;
    line-height: $userHeight;
  }
  &_name {
    display: inline-block;
    height: $userHeight;
    line-height: $userHeight;
    color: #2c8cef;
    cursor: pointer;
  }
  &_avator {
    width: $userHeight;
    height: $userHeight;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 5px;
  }
  &_submenu {
    background-color: #fff;
    margin-top: 12px;
    display: none;
    li:not(:first-child):not(:last-child) {
      border-bottom: 1px solid #bbb;
    }
    li {
      padding: 5px;
      cursor: pointer;
    }
  }
}
.index-container {
  overflow: hidden;
}
</style>
<template>
  <div class="index iconfont">
    <el-container>
      <el-aside style="width: auto;">
        <el-menu class="index-menu el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <template v-for="(v, k) in menu">
            <el-menu-item @click="jump(v.path)" v-if="v.isChildren === 0 ? true : false" :index="v.iid.toString()" :key="v.iid">
                <i class="iconfont icon icon-shangjia"></i>
                <span slot="title">{{v.iname}}</span>
            </el-menu-item>
            <el-sub-menu v-else :key="k">
              <template slot="title">
                <i :class="v.icon"></i>
                {{v.iname}}
              </template>
              <el-menu-item :index="vv.iid.toString()" v-for="(vv, kk) in v.children" :key="kk">
                <router-link :to="'/'+vv.path">{{vv.iame}}</router-link>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>

      <el-container class="index-container">
        <el-header class="index-header">
          <div class="index-header_left">
            <i class="el-icon-menu hamburger" @click="isCollapse = !isCollapse "></i>
            <span style="margin-left: 10px;" @click="toIndex">首页</span>
          </div>
          <ul class="index-user">
            <li class="index-user_info">
              <span class="index-user_name">
                {{userName}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <img class="index-user_avator" src="../assets/2020052110940.jpg" alt>
            </li>
            <ul class="index-user_submenu">
              <li @click="signOut">退出</li>
            </ul>
          </ul>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Dropdown,
  Main,
} from "element-ui";
import { routes } from "../routes/index.js";
// import Vue from 'vue'

export default {
  components: {
    "el-container": Container,
    "el-aside": Aside,
    "el-menu": Menu,
    "el-sub-menu": Submenu,
    "el-menu-item": MenuItem,
    "el-header": Header,
    "el-dropdown": Dropdown,
    "el-main": Main,
  },
  data() {
    return {
      // menu: [],
      userName: "",
      isCollapse: false
    };
  },
  computed: {
    menu() {
      return this.$store.state.menuList;
    }
  },
  created() {
    this.userName = window.sessionStorage.getItem("account");
    this.getMenuList();
    Vue.prototype.getMenuList = this.getMenuList
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    getMenuList() {
      this.$api.menuList().then(res => {
        const data = JSON.parse(res)
        if (data.code === 0) {
          this.$store.state.menuList = data.data
        }
      })
    },
    toIndex() {
      this.$router.push("/index");
    },
    signOut() {
      window.sessionStorage.removeItem("account");
      this.$router.push("/login");
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    jump(path) {
      this.$router.push('/' + path)
    }
  }
};
</script>

