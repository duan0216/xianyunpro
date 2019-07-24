<template>
  <div class="Infos">
    <!-- 面包屑导航 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelDetails.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelDetails.city.name+hotelDetails.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotelDetails.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 酒店标题部分 -->
      <h2 class="title">
        {{hotelDetails.name}}
        <span
          class="iconfont iconhuangguan"
          v-for="(value,index) in hotelDetails.hotellevel.level"
          :key="index"
        ></span>
      </h2>
      <p>{{hotelDetails.alias}}</p>
      <p>
        <i class="el-icon-location"></i>
        {{hotelDetails.address}}
      </p>
    </div>

    <!-- 图片展示部分 -->
    <el-row type="flex" class="detailImages">
      <div class="mainImg">
        <img :src="`http://localhost:3000/_nuxt/assets/images/${currentimg}.jpg`" alt />
      </div>
      <el-row type="flex" class="detImg">
        <img src="@/assets/images/1.jpg" alt @click="currentimg=1" />
        <img src="@/assets/images/2.jpg" alt @click="currentimg=2" />
        <img src="@/assets/images/3.jpg" alt @click="currentimg=3" />
        <img src="@/assets/images/4.jpg" alt @click="currentimg=4" />
        <img src="@/assets/images/5.jpg" alt @click="currentimg=5" />
        <img src="@/assets/images/6.jpg" alt @click="currentimg=6" />
      </el-row>
    </el-row>
    <!-- 价格表格部分 -->
    <el-table :data="hotelDetails.products" style="width: 100%">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型"></el-table-column>
      <!-- <el-table-column prop="price" label="最低价格/每晚" width="170"></el-table-column>
      -->
      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <span style="color:orange;">￥{{ scope.row.price }}</span>
          <span>起</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    hotelDetails: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 房价数据表格
      priceData: [],
      // 控制放大显示的图片
      currentimg: 1
    };
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.Infos {
  margin-bottom: 50px;
  .title {
    margin-top: 20px;
    font-weight: normal;
    span {
      color: orange;
    }
  }
  .detailImages {
    margin-top: 40px;
    margin-bottom: 40px;
    .mainImg {
      width: 640px;
      height: 360px;
      margin-right: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detImg {
      width: 335px;
      height: 360px;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      img {
        width: 160px;
        height: 110px;
        cursor: pointer;
      }
    }
  }
}
</style>

