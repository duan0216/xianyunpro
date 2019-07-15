 <template>
  <div class="container">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in carouseList" :key="index">
        <div
          class="banner-image"
          :style="`
          background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
          background-size:contain contain;
          `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索栏部分 -->
    <div class="search">
      <el-row type="flex" >
        <span v-for='(value,index) in tabsList' :key="index" :class="{active:index===current}" @click='changetabs(index)'>
          {{value.title}}
          <i></i>
        </span>
      </el-row>
      <el-row>
       <el-input :placeholder="tabsList[current].placeholder" class="input-with-select">
         <el-button slot="append" icon="el-icon-search"></el-button>
       </el-input>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current:0,
      carouseList: [

      ],
      tabsList:[
        {title:'攻略',placeholder:'请搜索相关攻略'},
        {title:'酒店',placeholder:'请输入城市搜索酒店'},
        {title:'机票',}
      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(res)
      const { data } = res.data;
      this.carouseList = data;
    });
  },
  methods:{
    changetabs(index){
      if(index == 2){
        this.$router.push('/air')
      }
      this.current = index
    }
  }
};
</script>
<style lang="less" scoped>
  .container{
    position: relative;
  }
  /deep/ .el-carousel__container {
    height: 700px;
    .banner-image{
      width: 100%;
      height: 100%;
    }
  }
  .search{
    position:absolute;
    // width: 200px;
    // height: 200px;
    left: 50%;
    top:50%;
    margin-left: -200px;
    margin-top: -50px;
    // background-color: #fff;
    z-index: 99;
    
    /deep/input{
      width: 400px;
    }
    .active{
      color: #000;
      i{
        border-bottom: 37px solid rgba(243, 239, 239,.5)
      }
    }
    span{
      display: block;
      position: relative;
      width:82px;
      height:36px;
      margin-right: 9px;
      line-height: 36px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      
      i{
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        height: 0;
        width: 70px;
        border-bottom: 37px solid rgba(0, 0, 0,.6);
        border-right: 21px solid transparent;
        z-index: -10;
      }
      
    }
  }
</style>
