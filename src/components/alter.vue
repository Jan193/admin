<style lang='scss'>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(55, 55, 55, 0.2);
  .mask_wrap {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    // width: 50%;
    padding: 35px 15px 10px 15px;
    border: 1px solid #ebeef5;
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
  }
}
.alter-enter {
    transform: scale(0);
    opacity: 0;
}
.alter-enter-active {
    transition: all .3s ease;
    transform: scale(1) .3s;
    animation: alter-in .3s ease;
}
.alter-leave-active {
    opacity: 0;
    transform: all .2s;
}
@keyframes alter-in {
    0% { transform: scale(0) }
    50% { transform: scale(0.5) }
    100% { transform: scale(1) }
}
</style>
<template>
  <div class="mask" ref="mask" v-show="isShow">
    <transition name="alter">
      <div class="mask_wrap">
        <i class="el-icon-close" @click="close"></i>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isAlter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: this.isAlter
    };
  },
  watch: {
    isAlter(newVal) {
      this.isShow = newVal;
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("alterClose", this.isShow);
    }
  }
};
</script>
