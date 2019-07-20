<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <!-- <el-select v-model="companyValue" placeholder="航空公司"  @change="filterCompany">
            <el-option
              v-for="item in Companies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             
            ></el-option>
          </el-select> -->
          <flightsFilter :dataInfo='flightsData'
          @filtercompany = 'filtercompany'/>
        </div>

        <!-- 航班头部布局 -->

        <flightsHeader />

        <!-- 航班信息 -->
        <flightsInfo v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 6, 7, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <flightsSidebar/>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsHeader from "@/components/air/flightsHeader.vue";
import flightsInfo from "@/components/air/flightsInfo.vue";
import flightsFilter from "@/components/air/flightsFilter.vue";
import flightsSidebar from "@/components/air/flightsSidebar.vue"
import { inherits } from 'util';
export default {
  data() {
    return {
      list: [],
      dataList: [],
      pageSize: 5,
      pageIndex: 1,
      total: 0,
      flightsData:{
        flights:[],
        info:{},
        options:{}
      }
      // Companies:[
      //   {value:'东航',label:'东航'},
      //   {value:'国航',label:'国航'},
      //   {value:'南航',label:'南航'},
      //   {value:'中航',label:'中航'}
      // ],
      // companyValue:''
    };
  },
  components: {
    flightsHeader,
    flightsInfo,
    flightsFilter,
    flightsSidebar
  },
  watch:{
    '$route'(){
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getdataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getdataList();
    },
    getdataList() {
      this.dataList = this.list.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      this.total = this.list.length
    },
    filtercompany(arr){
      this.list = arr
      this.getdataList() 
    },
    init(){
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res)
      this.list = res.data.flights;
      this.flightsData = res.data
      // console.log(this.flightsData)
      this.total = res.data.total;
      this.getdataList();
    });
    }

  //   filterCompany(val){
  //     this.list = this.list.filter(e=>{
  //       return e.airline_name == val
  //     })
  //     this.total= this.list.length
  //     this.getdataList()
  //   }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>