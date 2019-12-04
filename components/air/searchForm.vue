<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>
    <!-- //form表单中包括机票搜索部分 -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <!-- //出发城市 -->
      <el-form-item label="出发城市">
        <!-- //带输入建议的输入框 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="getDepartCityData"
          class="inline-input"
          placeholder="请搜索出发城市"
        />
      </el-form-item>
      <!-- //到达城市 -->
      <el-form-item label="到达城市">
        <!-- //带输入建议的输入框 -->
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="getDestCityData"
          class="inline-input"
          placeholder="请搜索到达城市"
        />
      </el-form-item>
      <!-- //出发时间 -->
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <!-- //搜索按钮 -->
      <el-form-item>
        <el-button @click="handleSubmit" type="primary" icon="el-icon-search" style="width:100%;">
          搜索
        </el-button>
      </el-form-item>
      <!-- //换的样式 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 头部teb切换
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      // teb切换的当前索引值
      currentTab: 0,
      form: {
        departCity: '', // 出发城市
        destCity: '', // 到达城市
        departDate: ''// 定义日期选择器的v-model绑定的值
      }
    }
  },
  methods: {
    // 实现teb切换的方法
    handleSearchTab (item, index) {
      // window.console.log(1234)
    },
    // 获取出发城市的数据；；element-ui；中input的带输入建议的输入框;;
    getDepartCityData (value, showList) {
      // 假造数据模拟出发城市；；value==用户要输入的值；cityList回调函数；返回城市列表数据；需要要xioas请求的数据
      const cityList = [
        { value: '广州' },
        { value: '深圳' },
        { value: '北京' }
      ]
      showList(cityList)
    },
    // 获取到达城市的数据
    getDestCityData (value, showList) {
      const cityList = [
        { value: '广州' },
        { value: '深圳' },
        { value: '北京' }
      ]
      showList(cityList)
    },
    // 搜索事件
    handleSubmit () {
      window.console.log(this.form)
    },
    // 出发和到达城市的切换
    handleReverse () {

    }
  }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
