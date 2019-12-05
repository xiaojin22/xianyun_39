<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <!-- 航班头部布局 -->
        <FlightsHeaderList />

        <!-- 航班信息 ；将获取的航班列表数据遍历后传递过去给子组件，进行遍历显示-->
        <FlightsItemList :flights="value" v-for="(value,index) in dataList" :key="index" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// 引入子组件
import FlightsHeaderList from '@/components/air/flightsHeaderList.vue'// 航班头部组件
import FlightsItemList from '@/components/air/fligthsItemList.vue'// 航班列表组件
export default {
  // 注册子组件
  components: {
    FlightsHeaderList,
    FlightsItemList
  },
  data () {
    return {
      flightsData: {}, // 航班总数据
      dataList: []// 航班列表数据，用来循环FlightsItemList组件信息，单独出来要实现分页
    }
  },
  mounted () {
    // 对于get请求的路由,两种参数分别是 params 和 query；；；分别对应
    // 对于 axios请求的两种参数分别是 data 和 params
    window.console.log(this.$route.query)
    // 发送axios请求，获取航班数据
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then((res) => {
      window.console.log(res)
      this.flightsData = res.data// 航班总数据
      this.dataList = res.data.flights// 航班列表数据
    })
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
