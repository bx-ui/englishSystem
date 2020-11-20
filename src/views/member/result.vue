<template>
  <div class="result-page">
    <div class="main">
      <h2>评分结果</h2>
      <p>8分</p>
      <el-button type="primary" @click="back">返回系统</el-button>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push({ name: "indexPage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.result-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    padding: 30px 45px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 50px;
      font-weight: 800;
      color: rgb(70, 73, 67);
      margin-bottom: 30px;
    }
    p {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
}
</style>
