<template>
  <el-dialog
    title="查看成员"
    :visible.sync="value"
    width="30%"
    @open="open"
    @close="edit"
  >
    <el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item label="ID">
            <span>{{ info.id || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间">
            <span>{{ info.createTime || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成员编号">
            <span>{{ info.number || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成员姓名">
            <span>{{ info.username || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号">
            <span>{{ info.phone || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号">
            <span>{{ info.zh || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="部门">
            <span>{{ info.departmentName || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职业">
            <span>{{ info.positionName || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位级别">
            <span>{{ info.jobLevel || "暂无信息" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="edit" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { loadMemberInfo } from "@/api/member";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("user", ["teamId", "id"])
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    open() {
      loadMemberInfo({ id: this.$attrs.id }).then(res => {
        if (res.code == 0) {
          // kais
          this.info = res.data;
        }
      });
    },
    submit() {},
    edit() {
      this.$emit("input", false);
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped></style>
