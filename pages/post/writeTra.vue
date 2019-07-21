<template>
  <section class="contianer">
    <!-- 中间内容的所有部分，左边加右边，设置为flex布局 -->
    <el-row type="flex" justify="space-between">
      <!-- 中间部分 -->
      <div class="main">
        <!-- 上面发表新攻略部分 -->
        <!-- 文字部分 -->
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦</p>
        <!-- 这里的内容需要后期提交的，所以要用form表单的元素 -->
        <el-form>
          <!-- 输入框部分 -->
          <el-form-item class="title">
            <el-input placeholder="请输入标题"></el-input>
          </el-form-item>
          <!-- 富文本框部分 -->
           <writeTraRichText   />

          <!-- 选择城市 -->
          <el-form-item label="选择城市" :label-width="'70px'" class="city">
            <el-input placeholder="请搜索游玩城市"></el-input>
          </el-form-item>
          <!-- 发布按钮和保存到草稿箱 -->
          <el-button type="primary" size="small">发布</el-button>
          <span class="submitSide">
            &nbsp;&nbsp;或者
            <a href="javascript:void(0)">保存到草稿</a>
          </span>
        </el-form>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
      <writeTraSidebar/>
      </div>
    </el-row>
  </section>
</template>

<script>
import writeTraRichText from "@/components/post/writeTraRichText"
import writeTraSidebar from "@/components/post/writeTraSidebar"
export default {
  data() {
    return {};
  },
  components:{
      writeTraRichText,
      writeTraSidebar
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.main {
  h2 {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .title {
    width: 750px;
  }
  .city {
    width: 276px;
    padding: 0, 15px;
  }
  span a {
    // text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    color: rgb(255, 165, 0);

    &:hover {
      text-decoration: underline;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
  }
}
</style>