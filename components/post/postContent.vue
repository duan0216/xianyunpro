<template>
  <div class="content">
    <div class="sousuo">
      <el-input placeholder="请输入想去的地方" class="input-with-select" v-model="city" @click="kongde">
        <el-button slot="append" icon="el-icon-search" @click="press(city)"></el-button>
      </el-input>
      <div class="tuizhi">
        <span>推荐</span>
        <nuxt-link to="/post?city=广州">
          <span @click="press('广州')">广州</span>
        </nuxt-link>
        <nuxt-link to="/post?city=上海">
          <span @click="press('上海')">上海</span>
        </nuxt-link>
        <nuxt-link to="/post?city=北京">
          <span @click="press('北京')">北京</span>
        </nuxt-link>
      </div>
      <div class="strategy">
        <h3>推荐攻略</h3>
        <el-button type="primary" class="el-icon-edit" @click="writeTra">写游记</el-button>
      </div>
    </div>
    <hr />
    <div v-for="(item,index) in form" :key="index">
      <div class="frist" v-if="item.images.length>1">
        <h4 @click="checkById(item.id)">
          <nuxt-link to>{{item.title}}</nuxt-link>
        </h4>
        <nuxt-link :to="`/posts/coment?=${item.id}`" class="article">{{item.summary}}</nuxt-link>
        <nuxt-link :to="`/posts/coment?=${item.id}`" class="imga">
          <img :src="`${v}`" v-for="(v,i) in form[index].images" :key="i" alt />
        </nuxt-link>
        <div>
          <span class="el-icon-location-outline">{{item.cityName}}</span>
          <nuxt-link to class="user">
            <span>
              <img :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`" alt />
            </span>
            <span>{{item.account.nickname}}</span>
          </nuxt-link>
          <span class="el-icon-view">2848</span>
          <span class="zan">{{item.watch}}赞</span>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="second" v-else>
        <div class="picture">
          <nuxt-link to>
            <img :src="`${form[index].images}`" @click="checkById(item.id)"  alt />
          </nuxt-link>
        </div>
        <div class="matter">
          <h4 @click="checkById(item.id)">
            <nuxt-link to>{{item.title}}</nuxt-link>
          </h4>
          <nuxt-link to class="miaoshu">{{item.summary}}</nuxt-link>
          <div class="text">
            <span class="el-icon-location-outline">{{item.cityName}}</span>
            <nuxt-link to class="user">
              <span>
                <img :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`" alt />
              </span>
              <span>{{item.account.nickname}}</span>
            </nuxt-link>
            <span class="el-icon-view">2848</span>
            <span class="zan">{{item.watch}}赞</span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[1, 3, 6, 9]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  
  watch: {
      $route(){
        console.log(this.$route.query);
        this.$axios({
          url:'/posts',
          params:{
            city:this.$route.query.city
          }
        }).then(res => {
        console.log(res.data);

        this.form = res.data.data;
        this.total = res.data.total;
        res.data.data.forEach(e => {
          if (e.images.length > 3) {
            return (e.images.length = 3);
          }
        });
      });
      }

  },
  data() {
    return {
      // 分页器
      total: 0,
      pageIndex: 1,
      pageSize: 3,
      // 数据
      form: [],
      // 搜索框
      city: ""
    };
  },
  computed: {},
  mounted() {
    this.getbyPost();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;

      this.getbyPost();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;

      this.getbyPost();
      this.pageIndex = 1;
    },
    // 获取数据
    getbyPost() {
      this.$axios({
        url: "/posts",
        params: {
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        console.log(res.data);

        this.form = res.data.data;
        this.total = res.data.total;
        res.data.data.forEach(e => {
          if (e.images.length > 3) {
            return (e.images.length = 3);
          }
        });
      });
    },
    press(value) {
      // if(value=''){
      //  return this.getbyPost()
      // }
      console.log(value);
      this.city = value;
      this.$axios({
        url: `/posts?city=${value}`,
        params: {
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        console.log(res);

        this.form = res.data.data;
        this.total = res.data.total;
        res.data.data.forEach(e => {
          if (e.images.length > 3) {
            return (e.images.length = 3);
          }
        });
      });
      
    },
    // 跳李能茂页面
    checkById(id) {
      // console.log(id,123)
      this.$router.push({
        path: `/post/content?id=${id}`,
        params: id
      });
    },

    // 跳熊甜页面

    writeTra() {
      this.$router.push({
        path: "/post/writeTra"
      });
    },
    kongde(){
      if(this.city){
        this.getbyPost()
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 700px;
  margin-top: 20px;
  .sousuo {
    margin-bottom: 15px;
    .tuizhi {
      margin-top: 10px;
    }
    .strategy {
      display: flex;
      margin-top: 15px;
      margin-bottom: 15px;
      h3 {
        flex: 1;
        color: orange;
        // border-bottom: 1px solid orange;
      }
    }
  }
  .frist {
    margin-top: 20px;
    margin-bottom: 40px;
    .pas {
      margin-bottom: 15px;
    }
    img {
      width: 220px;
      height: 150px;
      margin-bottom: 15px;
      text-decoration: none;
    }
    h4 {
      margin-bottom: 15px;
    }
    .article {
      line-height: 1.5;
      font-size: 14px;
      height: 63px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      margin-bottom: 15px;
    }
    .el-icon-location-outline {
      margin-right: 5px;
      font-size: 14px;
      color: #666;
    }
    .el-icon-view {
      margin-left: 5px;
      font-size: 14px;
      color: #666;
    }
    .user {
      font-size: 14px;
      color: #666;
      img {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        vertical-align: middle;
        margin: 0px;
      }
    }
    .zan {
      float: right;
      color: orange;
    }
  }
  .second {
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
    .miaoshu {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 14px;
      height: 63px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
    }
    .picture {
      flex: 1;
      img {
        width: 220px;
      }
    }
    .matter {
      margin-left: 15px;
      //   white-space: nowrap;
      overflow: hidden;
      //   text-overflow: ellipsis;
      h4 {
        font-size: 18px;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 15px;
      }
      p {
        margin-top: 15px;
        font-size: 14px;
      }
      .text {
        margin-top: 8px;
        font-size: 14px;
        color: #666;
        img {
          border-radius: 50%;
          width: 15px;
          vertical-align: middle;
          margin: 0px;
        }
        .zan {
          float: right;
          color: orange;
        }
      }
    }
  }
}
</style>
