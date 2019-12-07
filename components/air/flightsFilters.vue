<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ flightsData.info.departCity }} - 上海
        /
        {{ flightsData.info.departDate }}
      </el-col>
      <!-- 起飞机场 -->
      <el-col :span="4">
        <!-- <el-select v-model="airport" @change="handleAirport" size="mini" placeholder="起飞机场"> runFlights实现同一条件的筛选 -->
        <el-select v-model="airport" @change="runFlights" size="mini" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
          <!-- label，是给用户看的，value，g是要传递的值 -->
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
      <el-col :span="4">
        <el-select v-model="flightTimes" @change="runFlights" size="mini" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 -${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select v-model="company" @change="runFlights" size="mini" placeholder="航空公司">
          <el-option
            v-for="(item,index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- 起飞机型 -->
      <el-col :span="4">
        <el-select v-model="airSize" @change="runFlights" size="mini" placeholder="机型">
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button @click="handleFiltersCancel" type="primary" round plain size="mini">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 接受父组件传递过来的航空总数据
  //   props: {
  //     // eslint-disable-next-line vue/require-default-prop
  //     flightsData: Object
  //   },
  // eslint-disable-next-line vue/require-prop-types
  props: ['flightsData'],
  data () {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      sizeOptions: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]// 自定义飞机机型数据
    }
  },
  mounted () {
  },
  methods: {
    // 将多个过滤器协同工作；实现同一条件的筛选
    runFlights () {
      // 原始数据为this.flightsData.flights,作为最开始的源数据
      let newFlightsList = this.flightsData.flights
      // 判断筛选条件
      if (this.airport) {
        newFlightsList = this.handleAirport(newFlightsList)
      }
      if (this.flightTimes) {
        newFlightsList = this.handleFlightTimes(newFlightsList)
      }
      if (this.company) {
        newFlightsList = this.handleCompany(newFlightsList)
      }
      if (this.airSize) {
        newFlightsList = this.handleAirSize(newFlightsList)
      }
      // 实现同一条件筛选完成之后，再统一将筛选后的数据传递到父组件，进行统一渲染
      //   将所有过滤器都放在一起做一遍, 每一次前一个过滤器过滤完的结果应该是后一个过滤器的数据输入
      // 最后才一次执行更新数据操作
      this.$emit('setFlightsData', newFlightsList)
    },
    // 选择机场时候触发；oldFlightsList是条件筛选之后的旧数据列表
    handleAirport (oldFlightsList) {
      // window.console.log(value)
      const newFlightsList = oldFlightsList.filter((element) => {
        if (element.org_airport_name === this.airport) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      // this.$emit('setFlightsData', newFlightsList)
      return newFlightsList// 将筛选后的数据进行返出去
    },

    // 选择出发时间时候触发
    handleFlightTimes (oldFlightsList) {
      // 判断出发时间
      const newFlightsList = oldFlightsList.filter((element) => {
        // 获取飞机起飞的小时；然后和选择的时间进行判断
        const depTimesHours = +element.dep_time.split(':')[0]// [20,30]  +转换成数字类型
        // window.console.log(depTimesHours)
        // 由于this.flightsTimes是字符串；切割成数组，进判断，筛选
        const form = +this.flightTimes.split(',')[0] // form的数据
        const to = +this.flightTimes.split(',')[1]
        return depTimesHours >= form && depTimesHours < to
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      // this.$emit('setFlightsData', newFlightsList)
      return newFlightsList
    },

    // 选择航空公司时候触发
    handleCompany (oldFlightsList) {
      // 使用过滤器实现筛选数据；由于value值已经双向绑定，所以不用赋值
      // window.console.log(this.flightsData.flights)
      const newFlightsList = oldFlightsList.filter((element) => {
        if (element.airline_name === this.company) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      // this.$emit('setFlightsData', newFlightsList)
      return newFlightsList
    },

    // 选择机型时候触发
    handleAirSize (oldFlightsList) {
      const newFlightsList = oldFlightsList.filter((element) => {
        if (element.plane_size === this.airSize) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      // this.$emit('setFlightsData', newFlightsList)
      return newFlightsList
    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      // 将所有筛选的数据进行清空
      this.company = ''
      this.flightTimes = ''
      this.airSize = ''
      this.airport = ''
      // 先清空过滤器条件,然后子传父传回原始数据 比较笨不容易理解的方法
      // 直接执行runFilter 更加简单；就是将清空后的数据传递会父组件
      this.runFlights()
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
