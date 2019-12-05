<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 其他代码.. -->

        <!-- 航班头部布局；使用子组件 -->
        <FlightsHeaderList />

        <!--  其他代码... -->
      </div>

      <!--  其他代码... -->
    </el-row>
  </section>
</template>

<script>
// 引入子组件
import FlightsHeaderList from '@/components/air/flightsHeaderList.vue'

export default {
  // 注册子组件
  components: {
    FlightsHeaderList
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
