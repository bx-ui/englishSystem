<template>
  <div class="pass-page">
    <el-form label-width="0px">
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="pass">
        <el-input v-model="loginForm.password" placeholder="请输入密码">
          <!-- <el-button type="text" slot="append" @click="getCode">{{
            onShowTime ? `剩余${onShowTime}s` : "获取验证码"
          }}</el-button> -->
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="btnLoading"
          @click="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { verifycode } from "@/api/user";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRule: {
        username: [
          { required: true, message: "请填写团队管理手机号", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入手机短信收到的6位验证码",
            trigger: "blur"
          }
        ]
      },
      onShowTime: 0,
      btnLoading: false
    };
  },
  methods: {
    submit() {
      if (!this.loginForm.username) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!this.loginForm.password) {
        this.$message.error("密码不能为空");
        return;
      }
      this.btnLoading = true;
      this.$store
        .dispatch("user/login", {
          phone: this.loginForm.username,
          code: this.loginForm.password
        })
        .then(() => {
          this.$router.push({ path: "/" });
          this.$message.success("登录成功");
        })
        .catch(() => {
          this.$message.error("账号或密码错误");
        });
    },
    getCode() {
      console.log(validatePhone(this.loginForm.username));
      if (!this.loginForm.username || !validatePhone(this.loginForm.username)) {
        this.$message.error("手机号格式不正确");
        return false;
      }
      if (this.onShowTime) {
        this.$message.error(`请勿重复发送验证码${this.onShowTime}s后重试`);
        return false;
      }
      this.onShowTime = 60;
      // 请求接口
      verifycode({ phone: this.loginForm.username, verifyType: 1 }).then(
        res => {
          if (res.code == 0) {
            this.$message.success("验证码发送成功");
          }
        }
      );
      const show = setInterval(() => {
        this.onShowTime--;
        if (this.onShowTime <= 0) {
          clearInterval(show);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.pass-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
::v-deep {
  .el-form {
    width: 60%;
    margin-left: 20%;
  }
  .el-input-group__append {
    background: none;
    padding: 0 30px;
    color: #577cff;
    font-size: 12px;
  }
  .el-input__inner {
    border: 1px solid #dadde1;
  }
  .pass {
    .el-input__inner {
      border-right: 0px;
    }
  }
}
</style>
