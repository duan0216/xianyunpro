<template>
  <div class="hotelHead">
    <!-- 面包屑 -->
    <div class="Breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 搜索框 -->
    <div class="search">
      <el-form class="search-form-content" ref="form">
        <el-form-item>
          <!-- fetch-suggestions 返回输入建议的方法 -->
          <!-- select 点击选中建议项时触发 -->
          <el-autocomplete placeholder="目的地" class="el-autocomplete1" style="margin-top: 20px"></el-autocomplete>
        </el-form-item>
        <!-- v-model="form.date1" -->
        <el-date-picker
          class="el-date-picker1"
          type="date"
          placeholder="入住日期"
          style="width: 180px;"
        ></el-date-picker>
        <span>-</span>
        <!-- v-model="form.date1" -->
        <el-date-picker
          class="el-date-picker2"
          type="date"
          placeholder="离店日期"
          style="width: 180px;"
        ></el-date-picker>
        <el-form-item>
          <el-button class="fangjia" style="width: 120px;" type="primary" icon="el-icon-search">查看房价</el-button>
        </el-form-item>
        <!-- 人数隐藏框 -->
        <div class="block">
          <el-cascader class="person" :props="props" :options="persons" placeholder="人数未定"></el-cascader>
        </div>
      </el-form>
    </div>

    <!-- 路线、地图 -->
    <div class="map">
      <div class="map_left">
        <div class="quyu">
          <span style="display:block;margin-left:10px;">区域:</span>
          <div class="luxian">
            <nuxt-link to="/hotel" class="all">全部</nuxt-link>
            <div v-if="data.data[0]" style="display:inline-block">
              <nuxt-link
                to="/hotel"
                v-for="(item,index) in data.data[0].scenic"
                :key="index"
              >&nbsp;{{item.name}}</nuxt-link>
            </div>
          </div>
          <nuxt-link
            to="/hotel"
            style="position:absolute;top:140px;left:65px;color:rgb(255, 153, 0)"
          >
            <i class="el-icon-caret-bottom"></i> 等43个区域
          </nuxt-link>
        </div>
        <div class="gonglue">
          <span style="position:absolute;top:170px;margin-left:10px;">攻略:</span>
          <div
            style="position:absolute;left:65px;top:170px;width:430px"
          >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
        </div>
        <div class="junjia">
          <span style="margin-left:10px;position:absolute;top:240px;">
            均价
            <el-tooltip
              class="item"
              effect="dark"
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>:
          </span>
          <div class="xingji">
            <ul>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <li>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  ￥332
                </li>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <li>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  ￥521
                </li>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <li>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-star-on"></i>
                  ￥768
                </li>
              </el-tooltip>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
      hotelInfo: {},
      persons: [
        {
          value: 1,
          label: "成人",
          children: [
            { value: 2, label: "1人" },
            { value: 3, label: "2人" },
            { value: 4, label: "3人" },
            { value: 5, label: "4人" },
            { value: 6, label: "5人" },
            { value: 7, label: "6人" }
          ]
        },
        {
          value: 8,
          label: "儿童",
          children: [
            { value: 9, label: "1人" },
            { value: 10, label: "2人" },
            { value: 11, label: "3人" },
            { value: 12, label: "4人" }
          ]
        }
      ],
      props: { multiple: true },
      a: ""
    };
  },
  mounted() {
    // this.hotelInfo = this.$store.state.hotel.hotelInfo
    // console.log(this.hotelInfo)
    // console.log(123)
    // console.log(this.data)
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.hotelHead {
  width: 1000px;
  margin: 20px auto;
  position: relative;
}
.search-form-content {
  .el-autocomplete1 {
    display: block;
    float: left;
  }
  .el-date-picker1 {
    position: absolute;
    top: 34px;
    left: 240px;
  }
  .el-date-picker2 {
    position: absolute;
    top: 34px;
    left: 435px;
  }
  span {
    position: absolute;
    top: 42px;
    left: 424px;
  }
  .person {
    position: absolute;
    top: 34px;
    left: 644px;
  }
  .fangjia {
    position: absolute;
    top: -63px;
    right: 0;
  }
}
.map {
  height: 300px;
  position: relative;
  font-size: 13px;
  color: #666;
  .map_left {
    width: 500px;
    .quyu {
      width: 100%;
      .luxian {
        width: 430px;
        position: absolute;
        top: 2px;
        left: 65px;
        .all {
          background-color: #ccc;
        }
      }
    }
    .junjia {
      .el-icon-star-on {
        color: rgb(255, 153, 0);
      }
    }
    .xingji {
      width: 430px;
      height: 20px;
      position: absolute;
      top: 240px;
      left: 65px;
      li {
        display: block;
        float: left;
        width: 100px;
        i {
          padding: 0;
          margin: -3px;
        }
      }
    }
  }
}
</style>

