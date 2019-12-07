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
        <el-select v-model="airport" @change="handleAirport" size="mini" placeholder="起飞机场">
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
        <el-select v-model="flightTimes" @change="handleFlightTimes" size="mini" placeholder="起飞时间">
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
        <el-select v-model="company" @change="handleCompany" size="mini" placeholder="航空公司">
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
        <el-select v-model="airSize" @change="handleAirSize" size="mini" placeholder="机型">
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
    // 选择机场时候触发
    handleAirport (value) {
      // window.console.log(value)
      const newFlightsList = this.flightsData.flights.filter((element) => {
        if (element.org_airport_name === this.airport) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      this.$emit('setFlightsData', newFlightsList)
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {},

    // 选择航空公司时候触发
    handleCompany (value) {
      // 使用过滤器实现筛选数据；由于value值已经双向绑定，所以不用赋值
      // window.console.log(this.flightsData.flights)
      const newFlightsList = this.flightsData.flights.filter((element) => {
        if (element.airline_name === this.company) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      this.$emit('setFlightsData', newFlightsList)
    },

    // 选择机型时候触发
    handleAirSize (value) {
      const newFlightsList = this.flightsData.flights.filter((element) => {
        if (element.plane_size === this.airSize) {
          return true
        }
      })
      // window.console.log(newFlightsList)
      // 将过滤得到新的机票数据传递过去给父组件；子传父；发射事件给父子件
      this.$emit('setFlightsData', newFlightsList)
    },

    // 撤销条件时候触发
    handleFiltersCancel () {}
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
