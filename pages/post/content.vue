<template>
  <div class="trave">
    <el-row type="flex">
      <el-col :span="17">
        <travalleft :data="leftinfo"/>
      </el-col>
      <el-col :span="7">
        <travalright/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import travalleft from "@/components/post/travalleft";
import travalright from "@/components/post/travalright";
import axios from 'axios'

export default {
  components: {
    travalleft,
    travalright
  },
  data(){
    return{
      // 左边数据
      leftinfo:{}
        
        // {
        //   comments:[]
        // }
      ,
    }
  },
  mounted(){
    console.log(this.$route.query.id)
    axios({
      url:`http://157.122.54.189:9095/posts/${this.$route.query.id}`,
    }).then(res=>{
      console.log(res)
      this.leftinfo=res.data
      console.log(this.leftinfo)
    })
  }
};
</script>

<style>
.trave{
  width: 1000px;
  margin: 0 auto
}
</style>
