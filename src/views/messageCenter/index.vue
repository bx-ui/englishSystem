<template>
  <div class="container">
    <el-form label-width="60px">
      <el-form-item label="公司名">
        <el-input
          size="small"
          style="width: 260px"
          v-model="teamName"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          action="http://192.168.5.7:8080/file/upload"
          list-type="picture-card"
          :show-file-list="true"
          :limit="1"
          :on-success="onSuccess"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loadInfo, editInfo } from "@/api/message.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      teamName: "",
      avatarUrl: "",
      fileList: []
    };
  },
  computed: {
    ...mapState("user", ["teamId", "id"])
  },
  methods: {
    onSuccess(res, file) {
      this.avatarUrl = res.data.url;
      console.log(file);
    },
    submit() {
      editInfo({
        currentUserId: this.id,
        teamId: this.teamId,
        url: this.avatarUrl,
        teamName: this.teamName
      }).then(res => {
        if (res.code == 0) {
          this.$message.success("修改成功");
        }
      });
    },
    getInfo() {
      loadInfo({ teamId: this.teamId }).then(res => {
        if (res.code == 0) {
          console.log(res);
          const { avatarUrl, teamName } = res.data;
          this.teamName = teamName;
          this.avatarUrl = avatarUrl;
          this.fileList.push({ url: avatarUrl });
        }
      });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped></style>
