<template>
  <div>
    <div class="header">
      <div class="left">
        <img src="../assets/image/logo.png" alt="" />
        <span>智适应高中英语作文练习系统</span>
      </div>
      <div class="right">
        <div class="item">个人注册</div>
        <div class="item">个人登陆</div>
        <div class="item">APP下载</div>
        <div class="other bg" @click="logout" v-if="isLogin">
          退出系统(你好: {{ name }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["name", "isLogin"])
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$message.success("退出成功");
        this.$router.push({ name: "pass" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 55px;
  // border: 1px solid red;
  background: #577cff;
  box-sizing: border-box;
  padding: 0px 180px 0px 100px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  .left {
    display: flex;
    align-items: center;

    img {
      width: 26px;
      height: 32px;
      display: block;
      margin-right: 10px;
      font-weight: 600;
    }
    span {
      font-size: $primary-font;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .item {
      font-size: 14px;
      width: 140px;
      height: 100%;
      line-height: 55px;
      text-align: center;
      cursor: pointer;
      &:nth-child(2) {
        background: linear-gradient(
          90deg,
          #6989fb 0%,
          #7d65ff 50%,
          #6486ff 100%
        );
      }
    }
    .other {
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #b766b9;
      &:nth-child(2) {
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.3);
      }
    }
    .bg {
      font-size: 14px;
      color: rgba($color: #f1eeee, $alpha: 0.5);
      cursor: pointer;
    }
  }
}
</style>
