<template>
  <div>
    扫码登陆
    <el-button @click="open">出现自己封装的</el-button>
  </div>
</template>

<script>
import Notice from "@/components/Notice.vue";
export default {
  methods: {
    open() {
      const notice = this.$create(Notice, {
        title: "画画的baby",
        message: "请求登陆",
        duration: 1000
      });
      notice.show();
    }
  }
};
</script>

<style lang="scss" scoped></style>
