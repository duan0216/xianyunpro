<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
       
        <flightsHeader/>

        <!-- 航班信息 -->
        <flightsInfo v-for="(item,index) in list"
        :key="index"
        :data='item'/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsHeader from '@/components/air/flightsHeader.vue'
import flightsInfo from '@/components/air/flightsInfo.vue'
export default {
  data() {
    return {
      list:[1,2]
    };
  },
  components:{
    flightsHeader,
    flightsInfo
  },
  mounted(){
    this.$axios({
      url:'/airs',
      params:this.$route.query
    }).then(res=>{
      // console.log(res)
      this.list = res.data.flights
    })
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
</style>