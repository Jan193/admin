<style lang='scss'>
.add_user {
    .el-button {
        margin: 0 auto;
    }
}
</style>
<template>
    <div class='add_user'>
        <Form ref="form">
            <form-item label="账号" prop="userName">
                <Input placeholder="请输入账号" v-model="userName"/>
            </form-item>
            <form-item label="密码" prop="userPwd">
                <Input placeholder="请输入密码" v-model="userPwd"/>
            </form-item>
            <form-item label="角色" prop="role">
                <Select v-model="role" placeholder="请选择角色">
                    <Option v-for="(v, k) in roles" :key="k" :label="v.label" :value="v.value"></Option>
                </Select>
            </form-item>
            <form-item>
                <Button size="medium" @click="addUser">保存</Button>
            </form-item>
        </Form>
    </div>
</template>

<script>
import { Form, FormItem, Input, Button, Select, Option } from 'element-ui'

export default {
    data () {
        return {
            ruleForm: {
                userName: '',
                userPwd: '',
                role: '',
            },
            userName: '',
            userPwd: '',
            role: '',
            roles: [
                {
                    label: '超级管理员',
                    value: 1,
                },
                {
                    label: '管理员',
                    value: 2,
                },
                {
                    label: '用户',
                    value: 3,
                }
            ],
            rules: {
                userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在3到5之间', trigger: 'blur' }
                ],
                userPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        Form, FormItem, Input, Button, Select, Option
    },
    mounted() {
        this.$nextTick(function(){

        })
    },
    methods: {
        addUser() {
            console.log(this.role);
            if (!this.userName) {
                // this.$message.error('账号不能为空');
                alert('账号不能为空')
                return false
            }
            if(!this.userPwd) {
                // this.$message.error('密码不能为空')
                alert('密码不能为空')
                return false
            }
            if (!this.role) {
                // this.$message.error('请选择角色')
                alert('请选择角色')
                return false
            }
            this.$http.post('/admin/user/add', {
                userName: this.userName,
                userPwd: this.userPwd,
                role: this.role
            }).then(res => {
                const result = res.data
                if (result.code === 0) {
                    this.$parent.$emit('test')
                }
            })
        }
    }
}

</script>

