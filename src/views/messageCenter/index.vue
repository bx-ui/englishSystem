<template>
  <div class="container">
    <div class="content-body">
      <p class="tt">答题记录</p>
      <el-table :data="tableData" height="calc(100% - 30px)" border>
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          label="作文题目"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="字数限制"
          prop="fontLimit"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          label="时间限制"
          prop="timeLimit"
          align="center"
          width="190"
        ></el-table-column>
        <el-table-column
          label="作文要求"
          prop="desc"
          align="center"
          width="300"
        ></el-table-column>
        <el-table-column
          label="回答状态"
          prop="state"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.state | showState }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStorage } from "@/utils/localStorage.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getList() {
      this.tableData = getStorage("compositionList").filter(
        item => item.state == 2
      );
    }
  },
  filters: {
    showState(value) {
      return value == 1 ? "未答题" : "已答题";
    }
  },
  created() {
    this.getList();
    // this.getList();
    // 向localstorage里注入数据
  }
};
</script>

<style lang="scss" scoped>
.content-body {
  height: 100%;
}
.tt {
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 10px;
}
</style>
