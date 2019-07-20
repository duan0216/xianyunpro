<template>
  <el-row type="flex" class="container" justify="space-between">
    <!-- logo部分 -->
    <div class="logo"  >
      <nuxt-link to="/">
        <img src="@/assets/xianyunlogo.png" alt />
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
    <div class="userInfo" v-if="!$store.state.user.userInfo.token" >
      <div @click="$router.push('/user/login')" style="cursor:pointer">登录/注册</div>
    </div>
    <el-row type="flex" class="userInfo" v-if="$store.state.user.userInfo.token">
      <el-dropdown class="user">
        <nuxt-link to='/'>
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt />
          <span class="el-dropdown-link">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </nuxt-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="handleClearInfo">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
    <div></div>
  </el-row>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    // console.log(222)
  },
  methods:{
    handleClearInfo(){
      // console.log(123)
      this.$store.commit('user/removeUserInfo')
      console.log(this.$store.state)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  box-shadow: 0 3px 0 #ccc;
  .logo {
    img {
      height: 100%;
    }
  }
  .navs {
    flex: 1;
    margin-left: 20px;
    a {
      display: block;
      box-sizing: border-box;
      height: 60px;
      padding: 0 20px;
      line-height: 60px;
      text-align: center;
      margin-right: 15px;
      &:hover {
        border-bottom: 3px solid skyblue;
      }
    }
    .nuxt-link-exact-active {
      background-color: skyblue;
      color: #fff;
    }
  }
  .userInfo {
    padding-top: 15px;

    .user {
      height: 36px;
      line-height: 36px;
      img {
        vertical-align: middle;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        &:hover{
          box-shadow: 0px 0px 0 3px skyblue
        }
      }
    }
  }
}
</style>

