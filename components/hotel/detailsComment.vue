<template>
  <el-row type="flex" class="Comments_item">
    <div class="user_info">
      <div class="touxiang">
        <img src="@/assets/images/kedaya.jpg" alt style="height:44px;width:44px" />
        <span>LV{{data.level}}</span><br>
        <span>地球发动机</span>
      </div>
      <div class="create_date">{{gettimes}}</div>
    </div>
    <div class="Comments_content">
      <div>{{data.content}}</div>
      <div style="overflow:hidden">
        <el-input placeholder="请输入内容" style="width:100%;" type="text"></el-input>
        <el-button type="primary" style="float:right;margin-top:5px" size="small">回复</el-button>
      </div>
      <children v-for="(item,index) in data.followed" :key="index" :data="item"/> 
    </div>
  </el-row>
</template>

<script>
import moment from 'moment'
export default {
  name:'children',
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  methods: {
    
    
  },
  computed:{
    gettimes(){
     var date = new Date(this.data.created_at)
     return moment(date).format('YYYY-MM-DD')
    }
  }
};
</script>

<style lang="less" scoped>
.Comments_item {
  margin-bottom: 15px;
  .user_info {
    width: 120px;
    font-size: 12px;
    .touxiang {
      color: orange;
      margin-bottom: 5px;
      img {
        margin-right: 10px;
        border-radius: 50%;
        border: 2px solid #fa3;
        vertical-align: text-top;
      }
    }
  }
  /deep/.Comments_content {
    flex: 1;
    input:focus {
      height: 50px !important;
    }
  }
}
</style>

