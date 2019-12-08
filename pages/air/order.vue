<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 父传子，将机票数据传递过去-->
      <div class="main">
        <OrderForm :data="flightsData" />
      </div>
      <!-- 侧边栏 -->
      <div class="aside" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'// 引入订单组件
export default {
  components: {
    OrderForm
  },
  data () {
    return {
      // 机票详情数据
      flightsData: {
        insurances: []// 默认给一个空数组，防止异步请求还没数据，报错
      }
    }
  },
  mounted () {
    // 获取订单发送过来的机票id和座位id请求保险数据，传递给表单子组件渲染
    window.console.log(this.$route.query)
    const { id } = this.$route.query
    const seatId = this.$route.query.seat_xid
    this.$axios({
      url: '/airs/' + id,
      parmas: {
        seat_xid: seatId
      }
    }).then((res) => {
      window.console.log(res.data)
      this.flightsData = res.data// 获取机票详情数据；传递过去给子组件orderForm
    })
  }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
