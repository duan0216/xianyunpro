<template>
  <div class="nav">
    <div class="daohang">
      <div class="tab1"  @mouseleave="hidden()">
        <el-row class="topbox">
          <el-row v-for="(item,index) in tabs" :key="index">
            <span
              @mouseenter="handleswitch(index)"
              :class="{active:current===index} "
              
            >
              <i class="remen">
                {{item.type}}
                <span class="el-icon-arrow-right"></span>
              </i>
            </span>
          </el-row>
        </el-row>
        <el-row class="bottombox" v-for="(item,index) in tabs" :key="index" v-show="pordshow">
          <!-- 模块一 -->
          <div class="first" v-show="current===index" v-for="(item,index) in tabs" :key="index">
            <div v-for="(data,i) in item.children" :key="i" class="liebiao">
              <nuxt-link to>
                <span class="number">{{i+1}}</span>
              </nuxt-link>
              <nuxt-link to>
                <span class="city"  @click="catchCity(data.city)">{{data.city}}</span>
              </nuxt-link>
              <nuxt-link :to="`/post?city=${data.city}`">
                <span class="introduce" >{{data.desc}}</span>
              </nuxt-link>
            </div>
          </div>
        </el-row>
      </div>
    </div>
    <div class="Recommend">
      <h4>推荐城市</h4>
      <br />
      <img src="@/assets/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          children: {}
        }
      ],
      current: 0,
      pordshow: false
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
      // params:id
    }).then(res => {
      // console.log(res.data);
      this.tabs = res.data.data;
      // console.log(this.tabs);
    });
    
    // this.$refs.abc.style.display=block
  },
  methods: {
    handleswitch(index) {
      // this.$refs.abc.style.display=block
      this.pordshow = true;
      this.current = index;
      console.log(this.current);
    },
    hidden() {
      this.pordshow = false;
    },
    postCity(city){
      console.log(city)
      this.$store.commit('post/queryCity',city)
    },
    catchCity(city){
      this.$emit(`/post?city=${city}`)
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  font-size: 16px;
  .daohang {
    width: 260px;
    border: 1px solid #ddd;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
    position: relative;
    .tab1 {
      .topbox {
        .remen {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          border-bottom: 1px solid #ddd;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &:hover {
            color: orange;
            //   display: block
            .bottombox {
              display: block;
            }
          }
          .el-icon-arrow-right {
            margin-top: 12px;
          }
        }
      }
      .bottombox {
        //  display:none;
        position: absolute;
        left: 260px;
        top: -1px;
        width: 350px;
        padding: 10px 20px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ddd;
        .first {
          .liebiao {
            line-height: 40px;
            .number {
              color: orange;
              font-size: 24px;
              font-style: italic;
            }
            .city {
              margin: 0 10px;
              color: orange;
              font-weight: 400;
            }
            .introduce {
              font-size: 14px;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
  .Recommend {
    margin-top: 30px;
    img {
      width: 260px;
    }
  }
}
</style>
