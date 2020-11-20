<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside width="220px"><leftNav /></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftNav from "./components/leftNav/index.vue";
// import headerNav from "./components/headerNav/index.vue";
import Header from "@/components/Header.vue";
export default {
  components: { Header, leftNav }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  height: 55px !important;
}
.el-main {
  padding: 0px !important;
  background: #f3f7fa;
}
.el-aside {
  padding: 13px !important;
  border-radius: 10px !important;
  background: #f3f7fa;
}
</style>
