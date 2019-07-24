<template>
  <div class="travelStrategy">
    <!-- 左侧导航 -->

    <PostLeft />

    <!-- 搜索栏 -->
   
      <!-- 内容 -->
      <PostContent/>
    
  </div>
</template>

<script>
import PostLeft from "@/components/post/postleft";
import PostContent from "@/components/post/postcontent";
export default {
  data () {
    return {
      form:''
    }
  },
  components: {
    PostLeft,
    PostContent
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.travelStrategy {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  .nav {
    flex: 1;
  }
  
}
</style>

