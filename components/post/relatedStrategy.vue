<template>
  <div class="relatedStrategys">
    <div class="title">
      <span>相关攻略</span>
    </div>
    <div class="strategylist">
      <el-row>
        <el-col :span="24" v-for="(item,index) in strategylist" :key="index">
          <hr class="divider" />
          <el-row style="margin:10px 0">
            <el-col :span="6">
              <div class="strategyImg">
                <img src alt />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="asidestrategybox">
                <el-row :span="24" class="title">
                  <span>{{item.name}}</span>
                </el-row>
                <el-row :span="24" class="dateread">
                  <span>{{item.date}}</span>
                  <span>阅读：{{item.number}}</span>
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
      strategylist: [
        { name: "世", img: "", number: 20, date: "2019-07-21 10:05" },
        { name: "界", img: "", number: 20, date: "2019-07-21 10:05" },
        { name: "你", img: "", number: 20, date: "2019-07-21 10:05" },
        { name: "好", img: "", number: 20, date: "2019-07-21 10:05" }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.relatedStrategys {
  .divider {
    margin: 10px 0;
  }
  .strategyImg {
    width: 60px;
    height: 60px;
    background-color: red;
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

