<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{dataInfo.info.departCity}} - {{dataInfo.info.destCity}}
        /
        {{dataInfo.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in dataInfo.options.airport "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in dataInfo.options.flightTimes "
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in dataInfo.options.company "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in sizeOption "
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataInfo"],
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeOption: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // console.log(value);
      var arr = this.dataInfo.flights.filter(e => {
        return e.org_airport_name === value;
      });
      this.$emit("filtercompany", arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      var times = value.split(',')
      var start = parseInt(times[0])
      var end = parseInt(times[1])
      // console.log(start,end)

      var arr = this.dataInfo.flights.filter(e => {
        var time = parseInt(e.dep_time.split(':')[0])
        // console.log(time)
        return time>=start&&time<end;
      });
      this.$emit("filtercompany", arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(value);
      var arr = this.dataInfo.flights.filter(e => {
        return e.airline_name === value;
      });
      this.$emit("filtercompany", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      var arr = this.dataInfo.flights.filter(e => {
        return e.plane_size === value;
      });
      this.$emit("filtercompany", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport= ""
      this.flightTimes= ""
      this.company= ""
      this.airSize= ""
      var arr = this.dataInfo.flights
      this.$emit("filtercompany", arr)
    }
  },
  mounted() { 
    // console.log(data)
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>