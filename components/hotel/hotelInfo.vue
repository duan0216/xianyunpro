<template>
  <div class="hotelInfo">
    <!-- 酒店列表 -->
    <ul>
      <li v-for="(item,index) in data.data" :key="index">
        <img
          :src="item.photos"
          alt
          width="320px"
          height="210px"
          style="display:block;float:left;margin-top:15px"
        />
        <!-- <nuxt-link to="/hotel" @click="goDetail(item.id)"> -->
          <span class="title" @click="goDetail(item.id)">{{item.name}}</span>
        <!-- </nuxt-link> -->
        <br />
        <span class="name">{{item.alias}}</span>
        <div v-if="item.hotellevel" style="display:inline-block">
          <span v-for="(value,index) in item.hotellevel.level" :key="index">
            <i class="iconfont iconhuangguan"></i>
          </span>
        </div>
        <div v-if="item.hoteltype" style="display:inline-block">
          <span style="color:rgb(179, 153, 153);font-size:14px">{{item.hoteltype.name}}</span>
        </div>
        <br />
        <div style="width:150px;float:left;margin-left:20px;margin-top:px;font-size:13px">
          <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>

        <span style="color:rgb(255, 153, 0);font-size:13px">分</span>
        <span style="color:rgb(255, 153, 0);font-size:13px;margin-left:10px;">{{item.good_remarks}}</span>
        <span style="color:rgb(179, 153, 153);font-size:13px">条评价</span>
        <span
          style="color:rgb(255, 153, 0);font-size:13px;margin-left:15px;"
        >{{item.common_remarks}}</span>
        <span style="color:rgb(179, 153, 153);font-size:13px">篇游记</span>
        <br />
        <span style="margin-left:20px;font-size:13px;color:rgb(179, 153, 153)">
          <i class="el-icon-location"></i>
          <span>{{item.address}}</span>
        </span>
        <ul class="hotelweb" style="position:absolute;top:20px;right:20px">
          <li v-for="(value,index) in item.products" :key="index">
            <nuxt-link to="/hotel">
              <span style="display:block;padding-top:10px">{{value.name}}</span>
              <div style="position:absolute;right:5px;top:10px; width:80px">
                <span style="color:rgb(255, 153, 0);">￥{{value.price}}</span>
                <span>起 ></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 20,
      dataList: [],
      stars: []
    };
  },
  mounted() {},
  methods: {
    goDetail(id){
      this.$router.push({path:'/hotel/details',query:{ id }})
    }
  }
};
</script>

<style lang="less" scoped>
.hotelInfo {
  width: 1000px;
  margin: 20px auto;
  li {
    position: relative;
    height: 240px;
    border-bottom: 1px solid rgb(179, 153, 153);
    .title {
      font-size: 22px;
      position: absolute;
      top: 0px;
      left: 340px;
      margin-bottom: 20px;
      margin-top: 15px;
      cursor: pointer;
      &:hover{
        color:aqua
      }
    }
    .name {
      display: inline-block;
      margin-top: 20px;
      margin-left: 20px;
      width: 250px;
      color: rgb(179, 153, 153);
      font-size: 14px;
    }
    .iconfont {
      color: rgb(255, 153, 0);
    }
    .el-icon-star-on {
      color: rgb(239, 242, 247);
    }
    .hotelweb {
      width: 150px;
      li {
        width: 100%;
        height: 40px;
        font-size: 13px;
        color: rgb(179, 153, 153);
        padding: 0 6px;
        border-bottom: 1px solid rgb(179, 153, 153);
      }
    }
  }
}
</style>

