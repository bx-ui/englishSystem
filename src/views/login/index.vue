<template>
  <div class="login-page">
    <!-- 头部区域 -->
    <Header />
    <!-- 登陆主部分 -->
    <div class="mainer">
      <div class="padd-content">
        <div class="img-content">
          <img src="../../assets/image/loginbg.png" alt="" />
        </div>
        <div class="login-content">
          <div class="header">账号登陆</div>
          <!-- 主体部分 -->
          <div class="input-class">
            <router-view></router-view>
          </div>
          <div class="foot">
            <div class="foot-1">
              扫码登陆即表示您同意遵守<span>用户协议</span>
            </div>
            <div class="foot-2" @click="loginTypeChange">
              {{ typeLogin == 1 ? "扫码登录" : "账号登录" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../../components/Header.vue";
import { getStorage, setStorage } from "@/utils/localStorage.js";
export default {
  components: { Header },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapState("user", ["typeLogin"])
  },
  methods: {
    submit() {
      this.$message.error("账号或密码错误");
      this.$store
        .dispatch("user/login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message.error("账号或密码错误");
        });
    },
    loginTypeChange() {
      if (this.typeLogin == 1) {
        // 账号登录转扫码登陆
        // this.typeLogin = 2;
        this.$store.dispatch("user/loginChangeType", 2);
        // 跳转页面
        this.$router.push({
          name: "code"
        });
      } else if (this.typeLogin == 2) {
        this.$store.dispatch("user/loginChangeType", 1);
        this.$router.push({
          name: "pass"
        });
      }
    },
    jumpLogin(code) {
      code == 1
        ? this.$router.push({ name: "pass" })
        : this.$router.push({ name: "code" });
    },
    ifStore() {
      if (!getStorage("user") || !getStorage("user").length) {
        setStorage("user", [
          {
            name: "学生周星星",
            url: "xxxxxx",
            pass: "123456"
          }
        ]);
      }
    }
  },
  created() {
    this.ifStore();
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(235, 233, 233);
  .mainer {
    box-sizing: border-box;
    height: calc(100% - 55px);
    display: flex;
    align-items: center;
    justify-content: center;
    .padd-content {
      width: 60%;
      min-width: 800px;
      height: calc(100% - 300px);
      display: flex;
      .img-content {
        width: 50%;
        height: 100%;
        background: yellow;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .login-content {
        width: 50%;
        height: 100%;
        background: #fff;
        .header {
          background: #fff;
          height: 70px;
          width: 100%;
          border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.03);
          color: rgba(38, 38, 38, 1);
          font-size: $title-font;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .input-class {
          height: calc(100% - 160px);
          width: 100%;
        }
        .foot {
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .foot-1 {
            font-size: 12px;
            margin-bottom: 20px;
            span {
              margin-left: 4px;
              color: #577cff;
              cursor: pointer;
            }
          }
          .foot-2 {
            font-size: 12px;
            color: #577cff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
<style scoped></style>
