<template>
  <div class="header-nav">
    <div class="left">
      <p>区块链通信平台-团队操作管理中心</p>
      <p>铭数科技团队出品</p>
    </div>
    <div class="right">
      <p class="r-one">客服热线：400-922-677</p>
      <div class="r-two">
        <p>您好：管理员</p>
        <p @click="logout">安全退出</p>
      </div>
      <!-- <el-dropdown>
        <div class="img-content">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
// import breadcrumb from "./breadcrumb.vue";
export default {
  components: {
    // breadcrumb
  },
  methods: {
    logout() {
      alert(111);
      this.$confirm("此操作将退出心痛, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("user/logout").then(() => {
            this.$message.success("退出成功");
            this.$router.push({ name: "login" });
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100%;
  height: $top-navHeight;
  background: $top-background;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  box-sizing: border-box;
  color: $jg-fontColor;
  .left {
    p {
      &:nth-child(1) {
        font-size: $title-font;
        line-height: 40px;
        font-weight: 800;
      }
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
  .right {
    .r-one {
      font-size: 16px;
      font-weight: 600;
      line-height: 40px;
    }
    .r-two {
      display: flex;
      font-size: 14px;
      p {
        &:nth-child(1) {
          margin-right: 20px;
        }
        &:nth-child(2) {
          cursor: pointer;
          // &:hover {
          //   color: olive;
          //   cursor: pointer;
          // }
        }
      }
    }
  }
}
</style>
