<template>
  <div class="contentInfos">
    <!-- 标题 -->
    <el-row>
      <el-col :span="24">
        <!-- 动态从后台获取数据 -->
        <h2>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h2>
        <hr class="divider" />
      </el-col>
    </el-row>
    <!-- 时间和阅读量 -->
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-row>
            <el-col :span="18">
              <span>攻略:</span>
              <!-- 需要动态获取时间 -->
              <span>2019-07-21 09:16</span>
            </el-col>
            <el-col :span="6">
              <span>阅读:</span>
              <!-- 需要动态获取阅读量 -->
              <span>2049</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 文章内容 -->
    <el-row>
      <el-col>
        <!-- 动态从后台获取数据 -->
        <span>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</span>
        <img src="../../assets/images/1.jpg" alt class="contentImg" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.contentInfos {
  .contentImg {
    width: 100%;
  }
}
</style>


