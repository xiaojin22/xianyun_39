<template>
  <div class="flight-item">
    <!-- //给机票列表添加一个开关控制展开收起， -->
    <div @click="handleShowRecommend">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ flights.airline_name }} </span> {{ flights.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ flights.dep_time }}</strong>
              <span>{{ flights.org_airport_name + flights.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <!-- //相差时间；到达时间-出发时间 -->
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ flights.arr_time }}</strong>
              <span>{{ flights.dst_airport_name+flights.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ flights.base_price }}</span>起
        </el-col>
      </el-row>
    </div>
    <!-- //默认机票列表是收起的 showRecommend：false-->
    <div v-if=" showRecommend" class="flight-recommend">
      <!-- 隐藏的座位信息列表 ；；对座位信息列表遍历-->
      <el-row :key="index" v-for="(item,index) in flights.seat_infos" type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span> | 上海一诺千金航空服务有限公司
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.par_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                type="warning"
                size="mini"
              >
                选定
              </el-button>
              <p>剩余：83</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 接受父组件传递过来的航班列表数据
  // eslint-disable-next-line vue/require-prop-types
  props: ['flights'],
  data () {
    return {
      showRecommend: false// 默认座位是收起的
    }
  },
  // 计算属性；可以监听触发的事件
  computed: {
    // 计算出相差的时间;;
    rankTime () {
    // 使用时间戳的方式
      // 格式是:2019-12-06 00:20:00;;;先将该格式转换成时间戳，将拿来计算；最后转换成时间格式；再除以1000；
      // var date = new Date('2019-12-06 00:20:00')；；；时间戳=date.getTime()
      const arrTimestamp = new Date(this.flights.arr_datetime).getTime()// 到达时间戳
      const aepTimestamp = new Date(this.flights.dep_datetime).getTime()// 出发时间戳
      let duration = (arrTimestamp - aepTimestamp) // 相差的时间
      if (duration < 0) {
        // 跨过了凌晨,那么到达时间应该加上一天的毫秒数
        const day = (24 * 60 * 60 * 1000)
        duration = arrTimestamp + day - aepTimestamp
      }
      // 相差小时;;向下取整
      const durationMinutes = duration / 1000 / 60// 转换成分钟
      const hours = Math.floor(durationMinutes / 60)
      const minutes = durationMinutes % 60
      // window.console.log(hours)
      // window.console.log(minutes)
      return hours + ' 时 ' + minutes + ' 钟'
    }
  },
  methods: {
    // 控制推荐列表的展开收起
    handleShowRecommend () {
      this.showRecommend = !this.showRecommend
    }
  }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{

            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            }

            .price{
                font-size: 20px;
                color:orange;
            }
            //修改选定图片按钮的颜色
            .el-button--warning{
                background-color: rgb(12, 144, 196);
                border-color: rgb(12, 144, 196);
            }
            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>
