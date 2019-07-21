<template>
  <div class="ourerMostBox">
    <div class="commentBox" v-for="(item,index) in data" :key="index">
      <div class="userinfo">
        <nuxt-link to="/user">地球发动机</nuxt-link>
        <span>1</span>
      </div>
      <div class="commentinfo">
        <span>{{item.contentinfo}}</span>
        <i>
          <img src alt />
        </i>
      </div>
      <div class="replyBtn">
        <button class="reply">回复</button>
      </div>
      <Item :data="item.chilren" class="itemborder"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: ["data"],
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.ourerMostBox {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid rgb(78, 73, 73);
  .commentBox {
    border-bottom: 2px dotted #ccc;
    .userinfo {
      width: 100%;
      a {
        display: inline-block;
        width: 96%;
      }
      span {
        display: inline-block;
        width: 3%;
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
      background-color: red;
    }
  }
  .replyBtn{
      position: relative;
      width: 100%;
      .reply{
          position: absolute;
          right: 0;
          bottom: -17px;
      }
  }
  .itemborder{
      border: none
  }
}
</style>


