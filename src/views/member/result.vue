<template>
  <div class="result-page">
    <div class="main">
      <h2>评分结果</h2>
      <div id="study"></div>
      <p>{{ code }}分</p>
      <div>
        <el-button type="primary" @click="back">返回系统</el-button>
        <!-- <el-button type="primary">查看学习报告</el-button> -->
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      code: null
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "indexPage" });
    },
    getChart() {
      var myChart = echarts.init(document.getElementById("study"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "语法不足" },
              { value: 310, name: "词汇量不足" },
              { value: 234, name: "语句不通" },
              { value: 135, name: "单词错误严重" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getChart();
    this.code = Math.round(5 + Math.random() * 5);
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
    width: 100%;
    height: 100%;
    padding: 30px 45px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    #study {
      width: 35%;
      height: 40%;
      margin-bottom: 20px;
    }
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
