<template>
  <el-row type="flex" class="container" justify="space-between">
     <!-- logo部分 -->
    <div class="logo">
      <nuxt-link to='/'>
        <img src="@/assets/logo.png" alt="">
      </nuxt-link>  
    </div>
     <!-- 导航部分 -->
     <el-row type="flex" class="navs">
       <nuxt-link to="/" class="link">首页</nuxt-link>
       <nuxt-link to="/post" class="link">旅游攻略</nuxt-link>
       <nuxt-link to="/hotel" class="link">酒店</nuxt-link>
       <nuxt-link to="/air" class="link">国内机票</nuxt-link>
     </el-row>
     <!-- 用户信息部分 -->
     <div class="userInfo">
       <div>登录/注册</div>
     </div>

  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .container{
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    box-shadow: 0 3px 0 #ccc;
    .logo{
      img{
        height: 100%;
      }
    }
    .navs{
      flex: 1;
      margin-left: 20px;
      a{
        display: block;
        box-sizing: border-box;
        height: 60px;
        width: 70px;
        line-height: 60px;
        text-align: center;
        margin-right: 15px;
        &:hover{
          border-bottom: 3px solid skyblue;
        }
      }
      .nuxt-link-exact-active{
        background-color: skyblue;
        color: #fff
      }
    }
    .userInfo{
      padding-top: 20px;
      
    }
  }
</style>

