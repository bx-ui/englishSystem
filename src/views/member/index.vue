<template>
  <div class="container">
    <div class="content-body">
      <!-- <div class="render-btn">选择进行答题</div> -->
      <div class="render-btn" @click="renderToAsk">开始随机答题</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getStorage } from "@/utils/localStorage.js";
export default {
  computed: {
    ...mapState("user", ["callTime"])
  },
  methods: {
    renderToAsk() {
      var list = getStorage("compositionList").map(v => v.id);
      var ranIndex = Math.round(Math.random() * list.length);
      console.log(list[ranIndex]);
      let routeData = this.$router.resolve({
        name: "titleDetail",
        query: { id: list[ranIndex] }
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
