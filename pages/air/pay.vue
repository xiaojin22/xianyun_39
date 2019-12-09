<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ allData.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码  Canvas画布-->
            <canvas id="qrcode-stage" ref="qrCanvas" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Qrcode from 'qrcode'// 引入下载好的二维码包
export default {
  data () {
    return {
      // 订单详情
      allData: {}
    }
  },
  // 页面一刷新，就没有token值，所以要监听token的变化
  watch: {
    'this.$store.state.user.userInfo.token' () {
      // 封装页面一刷新就报没有token的错误
      this.loadData()
    }
  },
  // 获取订单详情。渲染页面价格
  mounted () {
    window.console.log(Qrcode)// 打印引入二维码数据；；使用到其中的toCanvas()
    // 判断有无token值
    if (this.$store.state.user.userInfo.token) {
      this.loadData()
    }
  },
  methods: {
    // 封装获取订单详情的方法
    loadData () {
      // 获取token值this.$store.state.user.userInfo.token
      const token = this.$store.state.user.userInfo.token// 获取vuex中的token值
      // 判断有无token值，再发送axios请求，获取订单详情
      if (token) {
        this.$axios({
          url: '/airorders/' + this.$route.query.id,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((res) => {
          window.console.log(res.data)
          this.allData = res.data// 订单详情

          // 这里是读取数据完毕的回调,之前已经赋值到 this.orderData 里面了
          // 要生成 二维码, 有两个 东西需要准备 1.dom 2.支付链接
          // dom 就是 this.$refs.qrCanvas
          // 链接就是 this.orderData.payInfo.code_url
          // Qrcode 插件 使用 toCanvas 方法可以直接生成 canvas 图像
          // 用到三个参数, canvas dom, text(链接)--订单数据中code_url连接, options(选项,现在只用到宽度设置)
          Qrcode.toCanvas(this.$refs.qrCanvas, this.allData.payInfo.code_url, { width: 200 })// 实现订单二维码生成
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>
