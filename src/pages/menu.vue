<style lang=''>
</style>
<template>
  <div class="menu">test
    <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import Tree from "element-ui";

export default {
  components: {
    'el-tree': Tree,
  },
  data() {
    return {
      list: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

