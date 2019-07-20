<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="searchForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="searchForm.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="searchForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      searchForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
      if (index == 1) {
        this.$confirm("目前暂时没有开通往返功能", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          // cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.currentTab = 0;
        });
      }
    },
    queryCity(value) {
      return new Promise(resolve => {
        if (value === "") {
          resolve([])
          return;
        }
        this.$axios({
          url: "/airs/city",
          params: {
            name: value
          }
        }).then(res => {
          var cityArr = res.data.data;
          var newData = cityArr.map(e => {
            e.value = e.name.replace("市", "");
            return e;
          });
          resolve(newData)
        });
      });
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      this.queryCity(value)
      .then(res=>{
        if(res.length>0){
          this.searchForm.departCity = res[0].value;
          this.searchForm.departCode = res[0].sort;
        }
        cb(res)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      this.queryCity(value)
      .then(res=>{
        if(res.length>0){
          this.searchForm.destCity = res[0].value;
          this.searchForm.destCode = res[0].sort;
        }
        cb(res)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item);
      this.searchForm.departCity = item.value;
      this.searchForm.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.searchForm.destCity = item.value;
      this.searchForm.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      var data = moment(value).format("YYYY-MM-DD");
      this.searchForm.departDate = data;
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      var { departCity, departCode, destCity, destCode } = this.searchForm;
      this.searchForm.departCity = destCity;
      this.searchForm.departCode = destCode;
      this.searchForm.destCity = departCity;
      this.searchForm.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      var rule = [
        {
          value: this.searchForm.departCity,
          message: "请输入出发城市"
        },
        {
          value: this.searchForm.destCity,
          message: "请输入到达城市"
        },
        {
          value: this.searchForm.departDate,
          message: "请选择出发时间"
        }
      ];
      var flag = true;
      rule.forEach(e => {
        if (!flag) {
          return;
        }
        if (e.value === "") {
          // console.log(123)
          flag = false;
          this.$message({
            method: "error",
            message: e.message
          });
        }
      });
      
      if (flag) {
        var search = JSON.parse(localStorage.getItem('history')) || []
        search.unshift(this.searchForm)
        localStorage.setItem('history',JSON.stringify(search))
        this.$router.push({ path: "/air/flights", query: this.searchForm });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>