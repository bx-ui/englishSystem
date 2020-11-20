<template>
  <el-dialog
    title="新增部门"
    :visible.sync="value"
    width="60%"
    @open="open"
    @close="edit"
  >
    <el-form
      :model="addForm"
      :rules="addRules"
      label-width="100px"
      ref="addForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="成员编号" prop="number">
            <el-input
              size="small"
              v-model="addForm.number"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成员名称" prop="userName">
            <el-input
              size="small"
              v-model="addForm.userName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input size="small" v-model="addForm.phone" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位级别" prop="jobLevel">
            <el-input
              size="small"
              v-model="addForm.jobLevel"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- :check-strictly="true" -->
        <el-form-item label="部门与岗位">
          <el-tree
            :data="data"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultChecked"
            :default-expand-all="true"
            @check-change="handleClick"
            :check-strictly="true"
            ref="tree"
          ></el-tree>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="edit" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { chartGraph } from "@/api/organizational";
import { addMember, loadMemberInfo, editMember } from "@/api/member";
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
        number: "",
        userName: "",
        phone: "",
        jobLevel: "",
        positionId: "" //职位id
      },
      addRules: {
        number: {
          required: true,
          message: "请输入成员编号",
          trigger: "change"
        },
        userName: {
          required: true,
          message: "请输入成员名称",
          trigger: "change"
        },
        phone: {
          required: true,
          message: "请输入手机号",
          trigger: "change"
        },
        jobLevel: {
          required: true,
          message: "请输入岗位级别",
          trigger: "change"
        }
      },
      data: [],
      defaultProps: {
        children: "childs",
        label: "departmentName",
        id: "id",
        disabled: "deepFlag"
      },
      defaultChecked: [],
      info: {}
    };
  },
  methods: {
    open() {
      chartGraph({ teamId: this.teamId }).then(res => {
        if (res.code == 0) {
          console.log(res);
          //   递归调用给每个选项添加是否可以选择标识
          this.data = res.data;
        }
      });
      if (this.$attrs.id) {
        // 调用详情接口
        loadMemberInfo({ id: this.$attrs.id }).then(res => {
          if (res.code == 0) {
            // kais
            this.info = res.data;
            Object.keys(this.addForm).forEach(item => {
              this.addForm[item] = res.data[item];
            });
            this.defaultChecked.push(res.data.positionId);
          }
        });
      }
    },
    handleClick(data, checked, node) {
      if (this.$refs.tree.getCheckedKeys().length == 0) {
        this.addForm.positionId = "";
      } else {
        this.addForm.positionId = this.$refs.tree.getCheckedKeys()[0];
      }
      console.log(node);
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    callBackToFather() {
      const currId = this.$refs.tree.getCheckedKeys();
      this.data.forEach(item => {
        if (item.id == currId) {
          // ss
        }
      });
    },
    submit() {
      this.callBackToFather();
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 电泳接口
          if (this.$attrs.id) {
            // 编辑
            editMember({
              ...this.addForm,
              currentUserId: this.id,
              teamId: this.teamId,
              id: this.$attrs.id
            }).then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$message.success("添加成功");
                this.edit();
              }
            });
          } else {
            addMember({
              ...this.addForm,
              currentUserId: this.id,
              teamId: this.teamId
            }).then(res => {
              console.log(res);
              if (res.code == 0) {
                this.$message.success("添加成功");
                this.edit();
              }
            });
          }
        }
      });
    },
    edit() {
      this.$refs["addForm"].resetFields();
      this.$emit("input", false);
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped></style>
