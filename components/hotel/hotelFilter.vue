<template>
  <div class="filter">
    <div>
      <ul>
        <li style="padding-top:0">
          <span style="margin-left:10px">价格</span>
          <span style="margin-left:100px">0-{{max}}</span>
          <el-slider
            style="width:160px;margin-left:15px"
            v-model="price"
            :max="4000"
            @change="changePrice"
          ></el-slider>
        </li>
        <li>
          <span>住宿等级</span>
          <el-select
            size="mini"
            v-model="Star"
            placeholder="酒店星级"
            @change="changeStar"
            style="width:120px"
          >
            <el-option
              v-for="(item1,index) in Stars "
              :key="index"
              :label="item1.name"
              :value="item1.name"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>住宿类型</span>
          <el-select
            size="mini"
            v-model="type"
            placeholder="住宿类型"
            @change="changeType"
            style="width:120px"
          >
            <el-option
              v-for="(item1,index) in types "
              :key="index"
              :label="item1.name"
              :value="item1.name"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>酒店设施</span>
          <el-select
            size="mini"
            v-model="asset"
            placeholder="酒店设施"
            @change="changeAsset"
            style="width:120px"
          >
            <el-option
              v-for="(item1,index) in assets "
              :key="index"
              :label="item1.name"
              :value="item1.name"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>酒店品牌</span>
          <el-select
            size="mini"
            v-model="brand"
            placeholder="酒店设施"
            @change="changeBrand"
            style="width:120px"
          >
            <el-option
              v-for="(item1,index) in brands "
              :key="index"
              :label="item1.name"
              :value="item1.name"
            ></el-option>
          </el-select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      price: 4000,
      // 滑块最小值
      min: 0,
      // 滑块最大值
      max: 4000,
      // 滑块步长
      // step: 10,
      // 单选框 只能选一个
      radio: "1",
      // 住宿等级
      Star: "不限",
      Stars: [],
      // 住宿类型
      type: "不限",
      types: [],
      // 酒店设施
      asset: "不限",
      assets: [],
      // 酒店品牌
      brand: "不限",
      brands: []
    };
  },
  methods: {
    changePrice(val) {
      this.max = val;
      this.$emit("setHotelPrice", val);
    },
    changeStar(val) {
      var id = this.Stars.filter(v => {
        if (v.name === val) {
          return v.id;
        }
      });
      console.log(val);
      // var id = parseInt(val.replace('星',''))
      console.log(id);
      this.$emit("setHotelStar", id[0].id);
    },
    changeType(val) {
      var id = this.types.filter(v => {
        if (v.name === val) {
          return v.id;
        }
      });
      this.$emit("setHotelType", id[0].id);
    },
    changeAsset(val) {
      var id = this.assets.filter(v => {
        if (v.name === val) {
          return v.id;
        }
      });
      this.$emit("setHotelAsset", id[0].id);
    },
    changeBrand(val) {
      var id = this.brands.filter(v => {
        if (v.name === val) {
          return v.id;
        }
      });
      this.$emit("setHotelBrand", id[0].id);
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res);
      const { levels } = res.data.data;
      const { types } = res.data.data;
      const { assets } = res.data.data;
      const { brands } = res.data.data;
      this.Stars = levels;
      this.types = types;
      this.assets = assets;
      this.brands = brands;
    });
  }
};
</script>

<style lang="less" scoped>
.filter {
  margin: 0 auto;
  width: 1000px;
  ul {
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
    height: 80px;
    li {
      margin: 10px 0;
      display: block;
      float: left;
      width: 20%;
      height: 55px;
      box-sizing: border-box;
      font-size: 13px;
      color: rgb(102, 102, 102);
      border-right: 1px solid rgb(221, 221, 221);
      padding-top: 15px;
      span {
        margin-left: 15px;
      }
      // el-dropdown-link{
      //   position: absolute;
      //   top: 50px;
      // }
    }
    li:last-child {
      border: none;
    }
  }
}
</style>

