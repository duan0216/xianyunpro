<template>
  <div class="travalInfo">
    <el-row>
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <!-- 面包屑 写在本页-->
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
              <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 文章详情介绍 contentInfo-->
          <div class="contentInfo">
            <contentInfo />
          </div>
        </div>
        <!-- 点赞收藏 likeOperation(喜好操作)-->
        <div class="likeOperation">
          <likeOperation />
        </div>
        <!-- 评论 comments-->
        <div class="comments">
         <comments/>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light">
          <!-- 相关攻略 relatedStrategy-->
          <div class="relatedStrategy">
            <relatedStrategy />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 写在本页-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import contentInfo from "@/components/post/contentInfo";
import relatedStrategy from "@/components/post/relatedStrategy";
import likeOperation from "@/components/post/likeOperation";
import comments from "@/components/post/comment";
export default {
  components: {
    contentInfo,
    relatedStrategy,
    likeOperation,
    comments
  },
  data() {
    return {
      // 分页数据
      pageSize: 5,
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    // 分页方法
    // 改变页码数字大小时触发的函数
    handleSizeChange(value) {},
    // 改变当前页码时触发的函数
    handleCurrentChange(value) {}
  }
};
</script>
<style lang="less" scoped>
.travalInfo {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb,
  .grid-content {
    margin: 20px 0;
  }
  .contentInfo {
    width: 100%;
    .contentInfo {
      .divider {
        color: #fff;
      }
    }
  }
  .grid-content {
    box-sizing: border-box;
    padding: 0 5px;
  }
}
</style>

