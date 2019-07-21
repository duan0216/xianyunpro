<template>
  <div class="comments">
    <div class="comment_title">
      <span>评论</span>
    </div>
    <div class="inputbox">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <button class="submitBtn" @click="handleSubmit">提交</button>
    </div>
    <div class="uploadfile">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <div class="commemtlist">
      组件递归
      <commentinfo :data="commentlist" />
    </div>
  </div>
</template>
<script>
import commentinfo from "@/components/post/commentinfo";
export default {
  components: {
    commentinfo
  },
  data() {
    return {
      // 评论数据
      commentlist: [{ contentinfo: "世界你好" }, { contentinfo: "你好世界" }],
      // 输入框
      textarea: "",
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 评论提交
    handleSubmit() {
        this.commentlist.contentinfo=this.textarea
        this.commentlist.unshift({contentinfo: this.textarea})
        this.textarea=''
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.uploadfile {
  margin-top: 20px;
}
.inputbox {
  position: relative;
  .submitBtn {
    position: absolute;
    right: 0;
    width: 50px;
    height: 30px;
    background-color: rgb(28, 131, 216);
    border-radius: 5px;
    border: none;
    margin: 10px;
  }
}
</style>


