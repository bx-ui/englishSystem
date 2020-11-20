<template>
  <div class="other-page">
    <div class="title">
      <div class="left">{{ name }} 欢迎进入随机答题</div>
    </div>
    <div class="content">
      <div class="main">
        <div class="time">
          <p>剩余时间:</p>
          <div>
            <FlipCountdown
              :deadline="callTime"
              style="heihgt: 100%"
              :showDays="false"
              @timeElapsed="timeElapsedHandler"
            />
          </div>
        </div>
        <div style="line-height: 30px; margin-bottom: 20px; margin-top: 40px">
          题目：你的朋友魏东获得了一笔到美国留学一年的奖学金。他去的那所学校碰巧有你一位好朋友Dick。你写信把魏东介绍给Dick，希望他能帮助、照顾魏东，愿他们也成为好朋友。
        </div>
        <div>
          字数限制： 80个单词
        </div>
        <div class="content11">
          <p>答题区域</p>
          <el-input type="textarea" :rows="12" v-model="content"></el-input>
        </div>
        <div style="margin-top: 40px; text-align: right">
          <el-button type="primary" @click="submit">提 交</el-button>
          <el-button @click="back">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
import Moment from "moment";
export default {
  computed: {
    ...mapState("user", ["name", "callTime"])
  },
  components: { FlipCountdown },
  data() {
    return {
      limitTime: null,
      content: ""
    };
  },
  created() {
    console.log(this.callTime);
    // 获取当前时间时间戳
    if (!this.callTime) {
      var timestamp = new Date().valueOf();
      var wantTime = timestamp + 1800000;
      const limitTime = Moment(wantTime).format("YYYY-MM-DD HH:mm:ss");
      this.$store.dispatch("user/setCallTime", limitTime);
      localStorage.setItem("flag", true);
    }
  },
  mounted() {
    window.addEventListener("beforeunload", e => {
      alert(e);
    });
  },
  methods: {
    timeElapsedHandler() {
      this.$confirm("答题时间结束，是否交卷？, 取消则放弃答题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("flag");
          this.$store.dispatch("user/setCallTime", "");
          // 交卷接口
        })
        .catch(() => {
          this.$router.push({ name: "member" });
          this.$message.warning("很遗憾您退出来答题");
          localStorage.removeItem("flag");
          this.$store.dispatch("user/setCallTime", "");
        });
    },
    submit() {
      if (!this.content) {
        this.$message.error("请认真答题");
        return false;
      }
      this.$router.push({ name: "codeRusult" });
    },
    back() {
      this.$router.push({ name: "indexPage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.other-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #eee;
  .title {
    height: 80px;
    background: burlywood;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 60px;
    font-size: 20px;
    color: #fff;
    .right {
      display: flex;
      .time {
        height: 40px;
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 80px);
    padding: 50px;
    box-sizing: border-box;
    .main {
      height: 100%;
      border: 1px dashed rgba($color: #000000, $alpha: 0.3);
      padding: 40px;
      box-sizing: border-box;
      .time {
        width: 700px;
        display: flex;
        align-items: center;
      }
      span {
        font-size: 16px;
      }
      .content11 {
        margin-top: 40px;
        p {
          margin-bottom: 30px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
