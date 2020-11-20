<template>
  <div class="container">
    <div class="content-body">
      <div class="render-btn">选择进行答题</div>
      <div class="render-btn" @click="renderToAsk">开始随机答题</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["callTime"])
  },
  methods: {
    renderToAsk() {
      console.log(this.callTime);
      // if (JSON.parse(localStorage.getItem("flag"))) {
      //   this.$message.warning("您此时正在进行测试，不能再开始");
      //   return false;
      // }
      let routeData = this.$router.resolve({
        name: "titleDetail",
        query: { id: "1111" }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.content-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.render-btn {
  padding: 30px 44px;
  background: cadetblue;
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
