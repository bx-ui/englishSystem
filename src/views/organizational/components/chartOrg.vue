<template>
  <div>
    <el-dialog
      title="新增作文"
      :visible.sync="value"
      width="40%"
      @open="open"
      @close="close"
    >
      <el-form
        label-width="80px"
        :model="addForm"
        :rules="addRules"
        ref="addForm"
      >
        <el-form-item label="作文题目" prop="title">
          <el-input v-model="addForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="作文要求" prop="desc">
          <el-input v-model="addForm.desc" rows="4" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="字数限制" prop="fontLimit">
          <el-input v-model="addForm.fontLimit" type="number"></el-input>
        </el-form-item>
        <el-form-item label="时间限制" prop="timeLimit">
          <el-input v-model="addForm.timeLimit" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit" type="primary">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setStorage, getStorage } from "@/utils/localStorage.js";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        title: "",
        desc: "",
        fontLimit: "",
        timeLimit: ""
      },
      addRules: {
        title: { required: true, message: "请输入作文题目", trigger: "blur" },
        desc: { required: true, message: "请输入作文要求", trigger: "blur" },
        fontLimit: {
          required: true,
          message: "请输入字数限制",
          trigger: "blur"
        },
        timeLimit: {
          required: true,
          message: "请输入时间限制",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
        this.addForm = {
          title: "",
          desc: "",
          fontLimit: "",
          timeLimit: ""
        };
        var { currObj } = this.$attrs;
        if (currObj) {
          Object.keys(this.addForm).forEach(item => {
            this.addForm[item] = currObj[item];
          });
        }
      });
    },
    close() {
      this.$emit("input", false);
      this.$emit("refresh");
    },
    submit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          var list = getStorage("compositionList");
          if (this.$attrs.currObj) {
            // 编辑操作
            list.forEach((item, index) => {
              if (item.id == this.$attrs.currObj.id) {
                list.splice(index, 1, {
                  ...this.addForm,
                  id: item.id,
                  state: item.state
                });
              }
            });
          } else {
            //  新增操作
            list.push({ ...this.addForm, id: list.length + 1, state: 1 });
          }
          setStorage("compositionList", list);
          this.$message.success("新增成功");
          this.close();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
