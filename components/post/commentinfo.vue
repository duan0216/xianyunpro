<template>
  <div class="ourerMostBox">
    <div class="commentBox" >
      <div>
        <div class="userinfo">
          <nuxt-link to="/user" style="color:#00a4ff">{{data.account.nickname}}</nuxt-link>
          <span style="color:#666">{{gettimes}}</span>
          <span class="level">{{data.level}}</span>
        </div>
        <div class="commentinfo">
          <span>{{data.content}}</span>
           <i>
            <img :src="`http://157.122.54.189:9095${value.url}`" alt v-for="(value,index) in data.pics" :key="index" style="width:60px;height:60px"/>
           </i>
          
        </div>
        <div style="background:#fbfdff">
           <children  v-if="data.parent"   :data="data.parent"  />
         </div>
        <div class="replyBtn">
            <el-button type="primary" style="margin-left:600px" size="mini" plain>回复</el-button>
          </div>
        <!-- <Item :data="item.children" class="itemborder" /> -->
        <!-- <children :data="v"  v-if v-for="(v,i) in data.parent" :key="i"  />
         -->
         
         
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components: {
  },
  // 递归组建传值
  name: "children",
  props: ["data"],
  data() {
    return {
       
    };
  },
  computed: {
    gettimes(){
      return moment(this.data.created_at).format('YYYY-MM-DD')
    }
  },
  mounted(){
      // console.log('进入评论获取')
      // this.$axios({
      //     url:'/posts/comments',
      //     params:this.commentlist
      // }).then(res=>{
      //     // console.log(res)
      // })
  },
  methods: {
    handlereply() {
      this.$emit("handlereply");
      // console.log("触发提交事件");
    }
  }
};
</script>
<style lang="less" scoped>
.ourerMostBox {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  // border: 1px solid #666;
  .commentBox {
    border-bottom: 1px dotted #ccc;
    .userinfo {
      width: 100%;
      a {
        display: inline-block;
        // width: 50px;
      }
      .level {
        display: inline-block;

        float:right;
        // width: 3%;
      }
    }
  }
  .commentinfo {
    width: 100%;
    margin: 10px 0;
    span {
      display: block;
    }
    i {
      display: block;
      height: 50px;
      width: 50px;
      // background-color: red;
    }
  }
  .replyBtn {
    position: relative;
    width: 100%;
    .reply {
      position: absolute;
      right: 0;
      bottom: -17px;
    }
  }
  .itemborder {
    border: none;
  }
}
</style>


