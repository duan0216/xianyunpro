<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderForm :data="orderInfo" />

      <!-- 侧边栏 -->
      <orderSide :data="orderInfo"/>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm.vue";
import orderSide from "@/components/air/orderSide.vue";
export default {
  data() {
    return {
      orderInfo: {
        insurances: [],
        seat_infos:{}
      }
    };
  },
  components: {
    orderForm,
    orderSide
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${id}`,
      params: { seat_xid }
    }).then(res => {
      console.log(res);
      this.orderInfo = res.data;
    });
    // console.log(this)
    // console.log( this.$store)
    // console.log(this.$store.state)
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>