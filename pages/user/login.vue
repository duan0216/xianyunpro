<template>
  <div
    class="loginbase"
    style="background-image: url(http://127.0.0.1:1337/assets/images/th02.jfif)"
  >
    <div class="container">
      <div class="tabs clearfix">
        <div :class="{active:currentTab==0}" @click="currentTab=0">登录</div>
        <div :class="{active:currentTab==1}" @click="currentTab=1">注册</div>
      </div>
      <div class="writearea">
        <loginForm v-if='currentTab==0'/>
        <registerForm v-if='currentTab==1'/>
      </div>
      
    </div>
  </div>
</template>

<script>
import loginForm from "@/components/user/loginForm.vue";
import registerForm from "@/components/user/registerForm.vue";
export default {
  data(){
    return{
      currentTab:0
    }
  },
  components: {
    loginForm,
    registerForm
  }
};
</script>

<style lang="less" scoped>
.loginbase {
  position: relative;
  height: 1000px;
  .clearfix::before,
  .clearfix::after {
    content: "";
    display: table;
  }
  .clearfix::after {
    clear: both;
  }
  .container {
    position: absolute;
    left: 50%;
    margin-left: -200px;
   
    top: 150px;
    width: 400px;
    background-color: #fff;
    .tabs{
      .active{
        background-color: #fff;
        border-top: 5px solid orange;
        color: orange;
      }
      div{
      float: left;
      width: 200px;
      height: 45px;
      background-color: #ccc;
      text-align: center;
      line-height: 45px;
      }
    }
    .writearea{
      padding: 50px 30px
    }
  }
}
</style>

