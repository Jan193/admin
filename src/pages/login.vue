<style lang='scss'>
input,
button {
  border: none;
  box-sizing: border-box;
}
.login {
  width: 100vw;
  height: 100vh;
  background-color: #2d3a4b;
  position: relative;
}
.login_box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #45556e;
  padding: 10px 20px;
  width: 300px;
  .title {
    font-size: 20px;
    color: #fff;
    text-align: center;
    margin-bottom: 22px;
  }
  .el-form-item__label {
    display: none;
  }
  .el-button {
    width: 100%;
  }
  .el-input__suffix {
    cursor: pointer;
  }
}
</style>
<template>
  <div class="login">
    <!-- <form action class="login_box">
      <header class="title">AI社区管理后台</header>
      <div class="user_name">
        <input type="text" placeholder="用户名">
        <p class="tip">用户名错误</p>
      </div>
      <div class="user_password">
        <input type="password" placeholder="密码">
        <p class="tip">密码错误</p>
      </div>
      <div class="login_btn">
        <button>登录</button>
      </div>
    </form> -->
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="0"
      class="login_box"
    >
      <header class="title">AI社区后台管理系统</header>
      <el-form-item label="账号" prop="userName">
        <el-input type="text" v-model="ruleForm2.userName" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="密码" @keyup.native.enter="submitForm()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Form, FormItem, Input, Button, Notification} from 'element-ui'
import config from '../components/config.js'

export default {
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-button': Button
  },
  data() {
    let validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入用户名'))
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error('密码不符合规范'))
        }
        callback();
      }
    };
    
    return {
      ruleForm2: {
        pass: "",
        userName: "",
      },
      rules2: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        // pass: [{ validator: validatePass, trigger: "blur" }],
      }
    };
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    submitForm() {
      this.$api.login({
        userName: this.ruleForm2.userName,
        userPwd: this.ruleForm2.pass
      }).then( res => {
        const data = JSON.parse(res);
        if (data.code === 0) {
          window.sessionStorage.setItem('account', this.ruleForm2.userName)
          this.$router.push('/index')
        } else {
          Notification.error({
            title: '登录失败',
            message: data.msg
          })
        }
      }).catch(error => {
        Notification.error({
          title: '请求错误',
          message: error
        });
      })
    },
  }
};
</script>
