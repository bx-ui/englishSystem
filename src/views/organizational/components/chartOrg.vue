<template>
  <div>
    <el-dialog
      title="组织架构图"
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
        <el-form-item label="作文题材" prop="tc">
          <el-input v-model="addForm.tc" clearable></el-input>
        </el-form-item>
        <el-form-item label="作文题目" prop="title">
          <el-input v-model="addForm.title" rows="4" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="字数限制" prop="title">
          <el-input v-model="addForm.fontLimit" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" type="primary">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
        tc: "",
        fontLimit: ""
      },
      addRules: {}
    };
  },
  methods: {
    open() {},
    close() {
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
