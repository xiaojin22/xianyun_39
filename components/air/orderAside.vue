<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{ data.dep_date }}</div>
        <div>{{ data.org_city_name }} - {{ data.dst_city_name }}</div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        class="info-step"
      >
        <el-col :span="5" class="flight-airport">
          <strong>{{ data.dep_time }}</strong>
          <span>{{ data.org_airport_name }}{{ data.org_airport_quay }}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{ rankTime }} ---</span>
          <span>{{ data.airline_name }}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{ data.arr_time }}</strong>
          <span>{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥{{ data.airorders.price }}</span>
      <span>x{{ asideData.numUsers }}</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{ data.airport_tax_audlet }}/人/单程</span>
      <span>x{{ asideData.numUsers }}</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <!-- 将订单总价格渲染 -->
      <span class="price">￥{{ asideData.allPrice }} </span>
    </el-row>
  </div>
</template>

<script>
export default {
  // 接受父组件传递过来的机票数据
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    // 接受父组件传递过来的订单总价格和乘机人数
    asideData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  computed: {
    // 使用时间戳计算出发时间和到达时间的时间差
    // eslint-disable-next-line vue/return-in-computed-property
    rankTime () {
      // 将时间格式转换成时间戳格式；分钟
      const depMinutes = new Date(this.data.dep_datetime).getTime()// 出发时间戳分钟
      const arrMinutes = new Date(this.data.arr_datetime).getTime()// 到达时间戳
      // 相差的时间戳
      let durations = (arrMinutes - depMinutes)
      // 判断；如果过了凌晨就是相差一天，24小时
      if (durations < 0) {
        const dayTime = 24 * 60 * 60 * 1000
        durations = arrMinutes + dayTime - depMinutes
      }
      // 相差的分钟
      const durationsMinutes = durations / 1000 / 60// 相差的所有分钟
      const durationsHours = Math.floor(durationsMinutes / 60)// 相差小时；向下取整
      const durMinutes = durationsMinutes % 60// 相差分钟
      return `${durationsHours}时${durMinutes}分`
    }
  }
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>
