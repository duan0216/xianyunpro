<template>
  <div class="hotelIndex">
    <hotelHead :data="info" />
    <hotelMap :data="info" />
    <hotelFilter
      :data="info"
      @setHotelPrice="setHotelPrice"
      @setHotelType="setHotelType"
      @setHotelStar="setHotelStar"
      @setHotelAsset="setHotelAsset"
      @setHotelBrand="setHotelBrand"
    />
    <hotelInfo :data="info" />
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      style="float:right;margin-right:200px;"
    ></el-pagination>
  </div>
</template>

<script>
import hotelHead from "@/components/hotel/hotelHead";
import hotelMap from "@/components/hotel/hotelMap";
import hotelFilter from "@/components/hotel/hotelFilter";
import hotelInfo from "@/components/hotel/hotelInfo";
export default {
  components: {
    hotelHead,
    hotelMap,
    hotelFilter,
    hotelInfo
  },
  data() {
    return {
      info: {
        data: [
          {
            hoteltype: {},
            hotellevel: {},
            stars: 0
          }
        ]
      },
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74"
        }
      }).then(res => {
        this.info = res.data;
        this.total = res.data.total;
        const arr = res.data;
      });
    },
    handleCurrentChange(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          _start: (val - 1) * 5
        }
      }).then(res => {
        this.info = res.data;
        this.pageIndex = val;
        console.log(this.pageIndex);
      });
      // this.setHotelPrice(val);
      // this.setHotelType(val);
    },
    setHotelPrice(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          price_lt: val
        }
      }).then(res => {
        this.info = res.data;
        this.total = this.info.total;
      });
    },
    setHotelType(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          hoteltype_in: val
        }
      }).then(res => {
        this.info = res.data;
        this.total = this.info.total;
      });
    },
    setHotelStar(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          hotellevel_in: val
        }
      }).then(res => {
        this.info = res.data;
        this.total = this.info.total;
      });
    },
    setHotelAsset(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          hotelasset_in: val
        }
      }).then(res => {
        this.info = res.data;
        this.total = this.info.total;
      });
    },
    setHotelBrand(val) {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: "74",
          hotelbrand_in: val
        }
      }).then(res => {
        this.info = res.data;
        this.total = this.info.total;
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .hotelIndex{
    margin-bottom: 50px
  }
</style>

