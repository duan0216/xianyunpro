<template>
  <div class="likeOperations">
    <!-- 评论 -->
    <div class="bigbox">
      <div class="iconbox">
        <i class="el-icon-edit-outline" style="color:skyblue;font-size:30px;"></i>
      </div>
      <div class="contentbox">
        <span>评论（100）</span>
      </div>
    </div>
    <!-- 收藏 -->
    <div class="bigbox">
      <div class="iconbox">
        <i class="el-icon-star-off" style="color:skyblue;font-size:30px;"></i>
      </div>
      <div class="contentbox">
        <span class="secondspan">收藏</span>
      </div>
    </div>
    <!-- 分享 -->
    <div class="bigbox">
      <div class="iconbox">
        <i class="el-icon-s-promotion" style="color:skyblue;font-size:30px;"></i>
      </div>
      <div class="contentbox">
        <span class="thirdspan">分享</span>
      </div>
    </div>
    <!-- 点赞 -->
    <div class="bigbox">
      <div class="iconbox">
        <i class="el-icon-thumb" style="color:skyblue;font-size:30px;"></i>
      </div>
      <div class="contentbox">
        <span>点赞（100）</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.likeOperations {
  width: 400px;
  height: 60px;
  margin: 0 auto;
  .bigbox {
    display: inline-block;
    height: 50%;
    width: 23%;
    .iconbox {
      height: 100%;
      width: 100%;
      position: relative;
      i {
        display: block;
        position: absolute;
        left: 33%;
        top: 0%;
      }
    }
    .contentbox {
      height: 100%;
      width: 100%;
      position: relative;
      span {
        display: block;
        position: absolute;
        left: 22%;
        top: 0%;
        font-size: 8px;
      }
      .secondspan,
      .thirdspan {
        display: block;
        position: absolute;
        left: 38%;
        top: 0%;
      }
    }
  }
}
</style>
