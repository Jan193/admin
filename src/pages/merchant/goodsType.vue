<template>
    <Form label-width="80px">
        <form-item label="商品类型">
            <tag 
                closable
                :key="k"
                v-for="(v, k) in typeList"
                @close="closeEvent(v)"
                @click.native="selectGoodsType(v)"
            >{{v.iname}}</tag>
            <Input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            />
            <Button v-else class="button-new-tag" size="small" @click="showInput">添加类型</Button>
        </form-item>
        <form-item label="当前类型">
            <Input v-model="curGoodsType.iname" placeholder="请选择上方的商品类型"/>
        </form-item>
        <form-item label="上/下架">
            <Select v-model="curGoodsType.upperShelf">
                <Option v-for="(v, k) in upperShelf" :key="k" :label="v.iname" :value="v.iid"/>
            </Select>
        </form-item>
        <form-item>
            <Button @click="save">保存</Button>
        </form-item>
      </Form>
</template>
<script>
import { Form, FormItem, Input, Tag, Button, Select, Option } from 'element-ui'
export default {
    components: {
        Form, FormItem, Input, Tag, Button, Select, Option,
    },
    props: {
        merchantId: {
            type: [String, Number]
        }
    },
    data(){
        return {
            type: {
                typeName: ''
            },
            typeList: [],
            inputVisible: false,
            inputValue: '',
            upperShelf: [
                { iname: '上架', iid: 0 },
                { iname: '下架', iid: 1 },
            ],
            upperShelfValue: '',
            curGoodsType: {},
            curMerchantId: ''
        }
    },
    watch: {
        merchantId(newVal) {
            this.curMerchantId = newVal
            this.merchantTypeList(newVal)
        }
    },
    mounted() {
        this.merchantTypeList();
    },
    methods: {
        save() {
            this.$api.merchantTypeAdd({
                merchantId: this.curMerchantId ? this.curMerchantId : this.merchantId,
                iname: this.curGoodsType.iname,
                upperShelf: this.curGoodsType.upperShelf
            }).then(res => {
                let result = JSON.parse(res)
                if (result.code === 0) {
                    this.clearCurGoodsType()
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.merchantTypeList()
                } else {
                    alert(result.msg)
                }
            })
        },
        merchantTypeList(id) {
            let mid = id ? id : this.merchantId
            this.$api.merchantTypeList({
                merchantId: mid
            }).then(res => {
                let result = JSON.parse(res)
                if (result.code === 0) {
                    this.typeList = result.data
                } else {
                    alert(result.msg)
                }
            })
        },
        selectGoodsType(data) {
            this.curGoodsType = data;
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                // this.dynamicTags.push(inputValue);
                console.log(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        closeEvent(data) {
            console.log(data);
        },
        showInput(){
            // this.inputVisible = true;
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
            this.clearCurGoodsType()
        },
        clearCurGoodsType(){
            for (let key in this.curGoodsType) {
                if (key) {
                    this.curGoodsType[key] = ""
                }
            }
        }
    }
}
</script>
<style lang="scss">
.el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>

