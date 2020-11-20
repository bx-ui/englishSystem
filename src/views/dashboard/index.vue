<template>
  <div class="container">
    <div class="content-body">
      <!-- <div class="one">
        <div class="item1">
          <p>10</p>
          <p>今日答题数</p>
        </div>
        <div class="item1">
          <p>10</p>
          <p>本月答题数</p>
        </div>
      </div>
      <div class="two"></div> -->
      <div id="box"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
import config from "@/config/index.js";
// import bmap from "vue-baidu-map";
export default {
  mounted() {
    this.$nextTick(() => {
      console.log(this.dataList);
      this.getMap();
    });
  },
  computed: {
    dataList() {
      return config.map.MapOption.data;
    },
    geoCoordMapList() {
      return config.map.MapOption.geoCoordMap;
    }
  },
  methods: {
    getMap() {
      var myChart = echarts.init(document.getElementById("box"));
      myChart.setOption({
        title: {
          text: "智适应系统用户分布图"
        },
        backgroundColor: "#708090",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"]
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo" // 对应上方配置
          },
          {
            name: "使用人数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: [
              {
                name: "北京",
                value: 599
              },
              {
                name: "上海",
                value: 142
              },
              {
                name: "山西",
                value: 100
              },
              {
                name: "黑龙江",
                value: 44
              },
              {
                name: "深圳",
                value: 92
              },
              {
                name: "湖北",
                value: 810
              },
              {
                name: "四川",
                value: 453
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-body {
  height: 100%;
}
#box {
  width: 100%;
  height: 100%;
}
.one {
  box-sizing: border-box;
  width: 100%;
  height: 40%;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  .item1 {
    width: 44%;
    height: 100%;
    border: 1px dashed #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: 26px;
      &:nth-child(1) {
        font-size: 60px;
        font-weight: 800;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
