<template>
  <div class="hotelDetails">
    <!-- 酒店基本信息展示部分 -->
    <detailsInfo :hotelDetails="hotelDetails" />
    <!-- 酒店地图展示部分 -->
    <detailsMap :data="hotelDetails" />
    <!-- 酒店评论展示部分 -->
    <div class="Comments">
      <div class="Comments_header">
        <h3>{{hotelDetails.all_remarks}}条用户真实评论</h3>
        <el-row type="flex" class="Comments_header_content">
          <div class="left_item">
            <p>总评数：{{hotelDetails.all_remarks||9}}</p>
            <p>好评数：{{hotelDetails.bad_remarks}}</p>
            <p>差评数：{{hotelDetails.good_remarks}}</p>
          </div>
          <div class="middle_item">
            <el-rate
              v-model="hotelDetails.hotellevel.level"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
             style="margin-top:20px;margin-left:-1px"></el-rate>
    
          </div>
          <el-row type="flex" class="right_item">
            <div>
              <div class="box1">
                <div style="height:100%;line-height:15px;padding-top:18px">
                  环境
                  <br />
                  {{hotelDetails.scores.environment||8.5}}
                </div>
              </div>
              <div class="box2"></div>
            </div>
            <div>
              <div class="box1">
                <div style="height:100%;line-height:15px;padding-top:18px">
                  产品
                  <br />
                  {{hotelDetails.scores.product||9.5}}
                </div>
              </div>
              <div class="box2 box3"></div>
            </div>
            <div>
              <div class="box1">
                <div style="height:100%;line-height:15px;padding-top:18px">
                  服务
                  <br />
                  {{hotelDetails.scores.servies||7.6}}
                </div>
              </div>
              <div class="box2 box4"></div>
            </div>
          </el-row>
          <img src="@/assets/images/tuijian.png" alt class="tuijian" />
        </el-row>
      </div>
      <div class="Comments_body">
        <!-- 组件递归 -->
        <detailsComment v-for="(item,index) in commentList" :key="index" :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import detailsInfo from "@/components/hotel/detailsInfo.vue";
import detailsMap from "@/components/hotel/detailsMap.vue";
import detailsComment from "@/components/hotel/detailsComment.vue";
import axios from 'axios'
export default {
  data() {
    return {
      // 酒店详情数据源
      hotelDetails: {
        city: {},
        products: [],
        location: {},
        hotellevel: {},
        scores: {}
      },
      // 评论的数据列表
      commentList: []
    };
  },
  components: {
    detailsInfo,
    detailsMap,
    detailsComment
  },
  mounted() {
    axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { id: this.$route.query.id }
    }).then(res => {
      console.log(res);
      this.hotelDetails = res.data.data[0];
    });

    this.$axios({
      url: "/hotels/comments"
    }).then(res => {
      console.log(res);
      this.commentList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.hotelDetails {
  width: 1000px;
  margin: 10px auto;
  .Comments {
    margin-top: 40px;
    .Comments_header {
      /deep/.Comments_header_content {
        position: relative;
        margin-top: 20px;
        height: 85px;
        padding-bottom: 20px;
        border-bottom: 2px #eee solid;
        .left_item {
          width: 200px;
          height: 65px;
        }
        .middle_item {
          width: 280px;
          height: 65px;
          line-height: 65px;
        }
        .right_item {
          height: 65px;
          line-height: 65px;
          color: orange;
          font-size: 15px;
          .box1 {
            width: 60px;
            height: 60px;
            margin-right: 50px;
            position: relative;
            line-height: 60px;
            text-align: center;
            background-color: transparent;
            border: 2px solid #f00;
            border-radius: 50%;
          }
          .box2 {
            width: 30px;
            height: 30px;
            background-color: #fff;
            z-index: 1;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: -14px;
          }
          .box3 {
            left: 106px;
          }
          .box4 {
            left: 216px;
          }
        }
        .tuijian {
          position: absolute;
          left: 220px;
          top: -4px;
          z-index: -10;
          width: 80px;
        }
      }
    }
    .Comments_body {
      margin-top: 40px;
    }
  }
}
</style>

