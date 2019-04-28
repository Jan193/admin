<template>
    <div class="goods_list">
        商品列表
    </div>
</template>
<script>
import { Table, TableItem, Form, FormItem, Button } from 'element-ui'
export default {
    data(){
        return {
            goodsList: []
        }
    },
    mounted() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            const id = this.$route.params.merchantId
            this.$api.goodsList({
                merchantId: id
            }).then(res => {
                const result = JSON.parse(res)
                if (res.code === 0) {
                    alert(res.msg)
                } else {
                    alert(result.msg)
                }
            })
        }
    }
}
</script>
