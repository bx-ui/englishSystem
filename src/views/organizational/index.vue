<template>
  <div class="container">
    <div class="pro-title">
      <div class="left">作文管理</div>
    </div>
    <div class="content-body">
      <div class="search-body">
        <el-form label-width="100px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="按条件搜索">
                <el-input
                  placeholder="请输入作文名称"
                  size="small"
                  clearable
                  v-model="content"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label-width="0px">
                <el-button size="small" type="primary" @click="getList"
                  >搜索</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button size="small" type="primary" @click="addTitle"
                >新增作文题目</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="tableData" height="calc(100% - 80px)" border>
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
        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <chartOrg v-model="chartDialog" @refresh="refresh" :currObj="currObj" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import chartOrg from "./components/chartOrg.vue";
import { setStorage, getStorage } from "@/utils/localStorage.js";
export default {
  components: {
    chartOrg
  },
  data() {
    return {
      tableData: [],
      content: "",
      chartDialog: false,
      currObj: null,
      isSee: false
    };
  },
  computed: {
    ...mapState("user", ["name"])
  },
  methods: {
    edit({ id }) {
      var list = getStorage("compositionList");
      this.currObj = list.filter(item => item.id == id)[0];
      this.chartDialog = true;
    },
    addTitle() {
      this.currObj = null;
      this.chartDialog = true;
    },
    del({ id }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(
        () => {
          var list = getStorage("compositionList");
          list.forEach((item, index) => {
            if (item.id == id) {
              list.splice(index, 1);
            }
          });
          setStorage("compositionList", list);
          this.getList();
          this.$message.success("删除成功");
        },
        () => {}
      );
    },
    refresh() {
      this.getList();
    },
    getList() {
      this.tableData = getStorage("compositionList");
    },
    setList() {
      return new Promise(resolve => {
        var compositionList = [
          {
            id: 1,
            title: "围绕感恩写一篇英语文章",
            desc: "语法流程，字迹工整，不得使用真是姓名",
            fontLimit: "100",
            timeLimit: 30,
            state: 1 // 1 没有答题过  2  答题过
          },
          {
            id: 2,
            title: "用英语给终南山爷爷写一篇作文",
            desc: "语法流程，字迹工整，不得使用真是姓名",
            fontLimit: "100",
            timeLimit: 10,
            state: 1 // 1 没有答题过  2  答题过
          },
          {
            id: 3,
            title: "用英语给正在法国读高中的李华写一篇文章",
            desc: "语法流程，字迹工整，不得使用真是姓名",
            fontLimit: "300",
            timeLimit: 20,
            state: 1 // 1 没有答题过  2  答题过
          },
          {
            id: 4,
            title: "用英语给正在法国读高中的李华写一篇文章",
            desc: "语法流程，字迹工整，不得使用真是姓名",
            fontLimit: "300",
            timeLimit: 20,
            state: 2 // 1 没有答题过  2  答题过
          }
        ];
        if (!getStorage("compositionList"))
          setStorage("compositionList", compositionList);
        resolve();
      });
    }
  },
  created() {
    this.setList().then(() => {
      this.getList();
    });
    // this.getList();
    // 向localstorage里注入数据
  }
};
</script>

<style lang="scss" scoped>
.content-body {
  height: calc(100% - 30px);
}
</style>
