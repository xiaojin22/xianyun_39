<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 父传子，将机票数据传递过去;;;接受表单传递过来的订单价格-->
      <div class="main">
        <OrderForm :data="flightsData" @changePrice="setPrice" />
      </div>
      <!-- 侧边栏 父传子，将机票数据和乘机人数传递过去 -->
      <div class="aside">
        <OrderAside :data="flightsData" :asideData="asideData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'// 引入订单组件
import OrderAside from '@/components/air/orderAside'// 引入侧边栏总价格组件
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data () {
    return {
      // 机票详情数据
      flightsData: {
        insurances: []// 默认给一个空数组，防止异步请求还没数据，报错
      },
      asideData: {
        allPrice: 0, // 订单总价格
        numUsers: 1// 乘机人数
      }
    }
  },
  // 使用watch监听父组件传递过来的价格变化
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
      this.flightsData = res.data// 获取机票详情数据；传递过去给子组件orderForm;;data就是机票数据
    })
  },
  methods: {
    // 接受表单组件传递过来订单价格存到本身的data 当中；
    setPrice (asideData) {
      window.console.log('价格改变了')
      this.asideData = asideData// 包订单价格和乘机人数
    }
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
