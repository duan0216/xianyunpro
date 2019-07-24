<template>
  <div class="relatedStrategys">
    <div class="title">
      <span>相关攻略</span>
    </div>
    <div class="strategylist" v-for="(item,index) in strategylist"
    :key="index">
      <el-row>
        <el-col :span="24" >
          <hr class="divider" />
          <el-row style="margin:10px 0">
            <el-col :span="6">
              <div class="strategyImg">
                <img :src="item.images[0]" alt />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="asidestrategybox">
                <el-row :span="24" class="title">
                  <span>{{item.title}}</span>
                </el-row>
                <el-row :span="24" class="dateread">
                  <span>{{'2019-07-22 21:06'}}</span>
                  <span>阅读：{{item.watch}}</span>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 相关攻略侧栏数据
      strategylist: []
    };
  },
  mounted(){
    console.log('相关攻略')
    this.$axios({
      url:'http://157.122.54.189:9095/posts/recommend'
    }).then(res=>{
      console.log(res.data.data)
      this.strategylist=res.data.data
    })
  }
};
</script>
<style lang="less">
.relatedStrategys {
  margin-top: 20px;
  .divider {
    margin: 10px 0;
  }
  .strategyImg {
    width: 65px;
    height: 65px;
    background-color: white;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .asidestrategybox {
    // height: 100%;
    position: relative;
    .title {
      position: absolute;
      top: 0%;
      left: 0%;
    }
    .dateread {
      position: absolute;
      bottom: -60px;
      left: 0%;
    }
  }
}
</style>


