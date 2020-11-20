<template>
  <el-dialog
    title="新增职位"
    :visible.sync="value"
    width="30%"
    @open="open"
    @close="edit"
  >
    <el-form
      label-width="80px"
      :model="addForm"
      :rules="addRule"
      ref="loginForm"
    >
      <el-form-item label="上级部门" prop="parentId">
        <el-select
          size="small"
          v-model="addForm.parentId"
          clearable
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in deportmentOption"
            :key="item.id"
            :label="item.departmentName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称" prop="deportmentName">
        <el-input
          size="small"
          v-model="addForm.departmentName"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="edit" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addPosition, loadAllDeport, editPosition } from "@/api/organizational";
import { mapState } from "vuex";
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
      addForm: {
        departmentName: "",
        parentId: ""
      },
      addRule: {
        parentId: {
          required: true,
          message: "请选择上级部门",
          trigger: "change"
        },
        departmentName: {
          required: true,
          message: "请输入职位名称",
          trigger: "blur"
        }
      },
      deportmentOption: []
    };
  },
  methods: {
    open() {
      loadAllDeport({ teamId: this.teamId, currentUserId: this.id }).then(
        res => {
          if (res.code == 0) {
            console.log(res);
            this.deportmentOption = res.data;
          }
        }
      );
      if (this.$attrs.currentObj) {
        const { departmentName } = this.$attrs.currentObj;
        //   修改
        console.log(this.$attrs.currentObj, "this.$ssss");
        this.addForm.departmentName = departmentName;
      }
    },
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //   console.log(...this.loginForm);
          // 提交数据
          if (!this.$attrs.currentObj) {
            addPosition({
              ...this.addForm,
              teamId: this.teamId,
              currentUserId: this.id
            }).then(res => {
              if (res.code == 0) {
                this.$message.success("添加成功");
                this.$refs["loginForm"].resetFields();
                this.edit();
              }
            });
          } else {
            editPosition({
              ...this.addForm,
              teamId: this.teamId,
              currentUserId: this.id,
              id: this.$attrs.currentObj.id
            }).then(res => {
              if (res.code == 0) {
                this.$message.success("修改成功");
                this.$refs["loginForm"].resetFields();
                this.edit();
              }
            });
          }
        }
      });
    },
    edit() {
      this.$emit("input", false);
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped></style>
