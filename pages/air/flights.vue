<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 父传子，将航空总数据flightsData传递过去渲染页面  @setFlightsData接受子组件发射的事件-->
        <FlightsFilters :flightsData="cathFlightsData" @setFlightsData="setFlightsData" />
        <!-- 航班头部布局 -->
        <FlightsHeaderList />

        <!-- 航班信息 ；将获取的航班列表数据遍历后传递过去给子组件，进行遍历显示-->
        <FlightsItemList :flights="value" v-for="(value,index) in dataList" :key="index" />
        <!-- 分页 -->
        <!--current-page;默认当前页；page-size：显示几条页 ；total：总条数 -->
        <!-- total 是总数据量
          每页数据的长度应该是 page-size 属性-->
        <!-- 选择页数的时候触发的函数 current-change 函数可以接受到一个 val 值代表我们点击的页码 -->
        <!-- 这里 page-sizes 是我们可以选择的条目数量选项
          选择了一个以后,就会触发 size-change事件并且将选择的数量默认人传进去-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="flightsData.flights.length"
          v-if="dataList.length>0"
          layout="total, sizes, prev, pager, next, jumper"
        />
        <!-- 进行空数据动态渲染优化 -->
        <div v-else-if="!loading">
          本页暂无数据
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// 引入子组件
import FlightsHeaderList from '@/components/air/flightsHeaderList.vue'// 航班头部组件
import FlightsItemList from '@/components/air/fligthsItemList.vue'// 航班列表组件
import FlightsFilters from '@/components/air/flightsFilters.vue'// 条件过滤属性组件
import FlightsAside from '@/components/air/flightsAside.vue'// 侧边栏历史记录组件
export default {
  // 注册子组件
  components: {
    FlightsHeaderList,
    FlightsItemList,
    FlightsFilters,
    FlightsAside
  },
  data () {
    return {
      loading: true,
      // 航班总数据
      flightsData: {
        options: [],
        flights: [], // 给其设置默认的空对象，由于请求是异步，防止数据未请求回来，报错
        info: {},
        company: {},
        fligtTimes: {},
        airport: {}
      },
      cathFlightsData: {
        options: [],
        flights: [], // 给其设置默认的空对象，由于请求是异步，防止数据未请求回来，报错
        info: {},
        company: {},
        fligtTimes: {},
        airport: {}
      }, // 暂存数据；为了实现过滤筛选功能
      // dataList 可以放在计算属性里面,无需每次都调用函数进行计算
      // dataList: [], // 航班列表数据，用来循环FlightsItemList组件信息，单独出来要实现分页
      pageIndex: 1, // 当前默认第一页
      pageSize: 10// 显示10条页
    }
  },
  // 计算属性监听分页器事件；；只有数据一改变，就监听数据的变化；；监听数据中数据有缓存{计算属性的好处}
  // 取代封装数据方法中loadPage（在方法中每拿一次数据，就要刷新页面）
  computed: {
    dataList () {
      // 在这里其实 return 的就是刚刚我们一直在写 loadPage()
      // 获取页数
      const start = (this.pageIndex - 1) * this.pageSize// 0
      const end = start + this.pageSize
      // 根据接口获取数据;;;;;;;
      // 数组 slice 方法接受两个参数, 第一个是切割的开始(包括当前index), 第二个是切割的结束(不包过当前 index),
      return this.flightsData.flights.slice(start, end)
    }
  },
  // 监听历史记录路由参数的变化，实现页面的刷新
  watch: {
    $route () {
      // location.reload();
      // 这种强制刷新,迫不得已的方法
      // 只需要刷新数据即可
      this.loadPageData()
    }
  },
  mounted () {
    // 对于get请求的路由,两种参数分别是 params 和 query；；；分别对应
    // 对于 axios请求的两种参数分别是 data 和 params
    // window.console.log(this.$route.query)
    // 发送axios请求，获取航班数据
    this.loadPageData()// 引入封装好页面数据
  },
  methods: {
    // 将请求的所有数据进行封装；为了实现页面的刷新
    loadPageData () {
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then((res) => {
        this.flightsData = res.data// 航班总数据
        // this.dataList = res.data.flights// 航班列表数据
        // 这里是分页, 我们需要拿到数据的开始index 和结尾的 index
        // this.loadPage()// 获取分页器的数据
        window.console.log(res.data)
        // 为了实现过滤筛选功能， 除了将原始数据放在flightsData中，还应该放在暂存数据中cathFlightsData中；
        // this.cathFlightsData=res.data;避免数据污染，实现数据的深拷贝
        this.cathFlightsData = { ...this.flightsData }
        this.loading = false
      })
    },
    // 接受子组件过滤后的新机票列表数据newFlightsList；；进行赋值；实现筛选数据
    setFlightsData (newFlightsList) {
      this.flightsData.flights = newFlightsList
    },
    // 封装获取分页器的函数loadPage
    // loadPage () {
    //   // 获取页数
    //   const start = (this.pageIndex - 1) * this.pageSize// 0
    //   const end = start + this.pageSize
    //   // 根据接口获取数据;;;;;;;
    //   // 数组 slice 方法接受两个参数, 第一个是切割的开始(包括当前index), 第二个是切割的结束(不包过当前 index),
    //   this.dataList = this.flightsData.flights.slice(start, end)
    // },
    // 触发val每页多少条数的事件
    handleSizeChange (val) {
      // window.console.log(`每页 ${val} 条`)
      this.pageSize = val
      // this.loadPage()// 获取分页器的数据
    },
    // 触发val显示当前页的事件
    handleCurrentChange (val) {
      this.pageIndex = val
      // this.loadPage()// 获取分页器的数据
      // window.console.log(`当前页: ${val}`)
    }
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
