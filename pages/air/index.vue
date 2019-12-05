<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji" />
      <i>国内机票</i>
    </h2>

    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单  使用搜索子组件-->
      <SearchForm />
      <!-- banner广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg">
      </div>
    </el-row>

    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;" />
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;" />
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;" />
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao" />
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(value, index) in sales" :key="index">
          <!-- //跳转到机票列表要拼接参数 -->
          <nuxt-link :to="`/air/flights?departCity=${value.departCity}&departCode=${value.departCode}&destCity=${value.destCity}&destCode=${value.destCode}&departDate=${value.departDate}`">
            <img :src="value.cover">
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{ value.departCity }}-{{ value.destCity }}</span>
              <span>￥{{ value.price }}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
// 引入搜索子组件
import SearchForm from '@/components/air/searchForm.vue'
export default {
  // 注册
  components: {
    SearchForm
  },
  data () {
    return {
      // 假造数据，实现页面
      sales: [{
        cover: 'https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg',
        departCity: '广州',
        departCode: 'CAN',
        departDate: '2019-06-17',
        destCity: '上海',
        destCode: 'SHA',
        price: 760
      }]
    }
  }
}
</script>

<style scoped lang="less">
.air-sale{
  border: 1px #ddd solid;
  padding:20px;
  margin-bottom:50px;

  .air-sale-pic{
    > div{
      width:225px;
      height:140px;
      position: relative;
      overflow: hidden;

      img{
        width:100%;
      }

      .layer-bar{
        position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child{
          font-size:18px;
        }
      }
    }
  }
}

.air-sale-group{
  margin-top:20px;
  padding-top:8px;
  border-right:1px #eee solid;

  &:last-child{
    border-right:none;
  }

  .air-sale-row{
    font-size:12px;
    color:#666;
    margin-bottom:8px;

    .air-sale-price{
      color:orange;
      font-size: 20px;
    }
  }
}

.container{
  width:1000px;
  margin:0 auto;
}

.air-title{
  margin:15px 0;
  font-size:20px;
  font-weight: normal;
  color:orange;

  span{
    font-size:20px;
  }
}

.statement{
  margin:15px 0;
  border:1px #ddd solid;
  background:#f5f5f5;
  height: 58px;
  padding:10px 0;
  box-sizing:border-box;

  > div{
    text-align: center;
    line-height: 38px;
    border-right:1px #ddd solid;

    &:last-child{
      border-right: none;
    }

    *{
      vertical-align: middle;
    }

    i{
      font-size:30px;
    }
  }
}

.air-sale-title{
  margin:15px 0;
  font-size:20px;
  font-weight: normal;
  color:#409EFF;

  span{
    font-size:20px;
  }
}
</style>
