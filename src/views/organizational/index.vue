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
      <el-table :data="tableData" height="calc(100% - 120px)" border>
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          label="作文题目"
          prop="id"
          align="center"
          width="190"
        ></el-table-column>
        <el-table-column
          label="字数限制"
          prop="id"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          label="具体内容"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-list">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <chartOrg v-model="chartDialog" />
  </div>
</template>

<script>
import { loadList, delDeport, delPosition } from "@/api/organizational";
import { mapState } from "vuex";
import chartOrg from "./components/chartOrg.vue";
export default {
  components: {
    chartOrg
  },
  data() {
    return {
      tableData: [{}],
      listQuery: {
        pageIndex: 1,
        pageSize: 20,
        departmentType: 1,
        teamId: null
      },
      total: 0,
      chartDialog: false
    };
  },
  computed: {
    ...mapState("user", ["name"])
  },
  methods: {
    edit() {},
    addTitle() {
      this.chartDialog = true;
    },
    del({ id }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(
        () => {
          if (this.listQuery.departmentType == 1) {
            delDeport({ teamId: this.teamId, id, currentUserId: this.id }).then(
              res => {
                if (res.code == 0) {
                  this.$message.success("删除成功");
                  this.getList();
                }
              }
            );
          } else {
            delPosition({
              teamId: this.teamId,
              id,
              currentUserId: this.id
            }).then(res => {
              if (res.code == 0) {
                this.$message.success("删除成功");
                this.getList();
              }
            });
          }
        },
        () => {}
      );
    },
    getList() {
      if (this.content) {
        this.listQuery.content = this.content;
      } else {
        delete this.listQuery.content;
      }
      loadList(this.listQuery).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.content-body {
  height: calc(100% - 30px);
}
</style>
