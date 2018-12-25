<style lang='scss'>
$userHeight: 40px;
$menuColor: #BFCBD1;
.index {
  display: flex;
  height: 100%;
  &-container {
    background-color: #F0F0F0;
  }
}
.index-menu {
  background-color: #304156;
  a {
    color: #BFB19E;
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
  a { color: $menuColor; }
  &:hover {
    background-color: #001528;
  }
}
.el-submenu {
  .el-menu {
    background-color: #1F2D3D;
  }
}
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
    color: #2C8CEF;
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
</style>
<template>
  <div class="index">
    <el-container>
      <el-aside style="width: 200px">
        <el-menu class="index-menu">
          <el-sub-menu v-if="v.children" :index="v.id.toString()" v-for="(v, k) in menu" :key="k">
             <template slot="title"><i :class="v.icon"></i>{{v.menuName}}</template>
             <el-menu-item :index="vv.id.toString()" v-for="(vv, kk) in v.children" :key="kk">
               <router-link :to="'/'+vv.path">{{vv.submenuName}}</router-link>
             </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="v.id.toString()">
            <template slot="title">
              <i :class="v.icon"></i>
              <router-link :to="'/'+v.path">{{v.menuName}}</router-link>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container class="index-container">
        <el-header class="index-header">
          <div class="index-header_left">
            <i class="el-icon-menu hamburger"></i>
            <span style="margin-left: 10px;" @click="toIndex">首页</span>
          </div>
          <ul class="index-user">
            <li class="index-user_info">
              <span class="index-user_name">{{userName}} <i class="el-icon-caret-bottom"></i></span>
              <img class="index-user_avator" src="../assets/2020052110940.jpg" alt="">
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
import {Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, Main} from 'element-ui'
import {routes} from '../routes/index.js'
// const ts = [...routes.options]
// console.log(ts);
console.log(routes[2 ]);

export default {
  components: {
    'el-container': Container,
    'el-aside': Aside,
    'el-menu': Menu,
    'el-sub-menu': Submenu,
    'el-menu-item': MenuItem,
    'el-header': Header,
    'el-dropdown': Dropdown,
    'el-main': Main
  },
  data() {
    return {
      menu: [],
      userName: ''
    };
  },
  created() {
    this.userName = window.sessionStorage.getItem('account');
    this.getMenuList();
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    getMenuList () {
      this.$http.get('/api/menu/list').then(res => {
        const data = res.data;
        console.log(data);
        this.menu = data.data
      })
    },
    toIndex () {
      this.$router.push('/index')
    },
    signOut() {
      window.sessionStorage.removeItem('account');
      this.$router.push('/login')
    }
  }
};
</script>

