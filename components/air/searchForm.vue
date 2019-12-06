<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>
    <!-- //form表单中包括机票搜索部分 -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <!-- //出发城市 -->
      <el-form-item label="出发城市">
        <!-- //带输入建议的输入框；；select=选中建议项；一对象 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="getDepartCityData"
          @select="departSelect"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          class="inline-input"
          placeholder="请搜索出发城市"
        />
      </el-form-item>
      <!-- //到达城市 -->
      <el-form-item label="到达城市">
        <!-- //带输入建议的输入框 -->
        <el-autocomplete
          v-model="form.destCity"
          @select="destSelect"
          :fetch-suggestions="getDestCityData"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          class="inline-input"
          placeholder="请搜索到达城市"
        />
        <!-- trigger-on-focus="false"输入后再激活输入建议 highlight-first-item="true"自动高亮第一个选项 -->
      </el-form-item>
      <!-- //出发时间 -->
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          @change="changeDate"
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
import moment from 'moment'// 引入处理日期格式的组件
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
        departDate: '', // 定义日期选择器的v-model绑定的值
        departCode: '', // 出发城市代码
        destCode: ''// 到达城市代码
      }
    }
  },
  methods: {
    // 实现teb切换的方法
    handleSearchTab (index) {
      // 不支持城市往返的提示
      if (index === 1) {
        this.$confirm('当前不支持往返机票搜索', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
      // window.console.log(1234)
    },
    // 获取出发城市的数据；；element-ui；中input的带输入建议的输入框;;
    async getDepartCityData (value, showList) {
      // 发送axios请求；获取真正的搜索建议列表
      let cityList = await this.getCityData(value)
      // 如果列表数据长度为0；证明没结果，提示用户不支持
      if (!cityList || cityList.length === 0) {
        cityList = [{ value: '暂时不支持该城市' }]
      }
      // 为了避免用户直接输入后啥不干，直接将输入框失去焦点；可将默认城市第一个sort放在form中
      this.form.departCode = cityList[0].sort
      showList(cityList)
    },
    // 获取到达城市的数据
    async getDestCityData (value, showList) {
      // 发送axioe请求。获取真正的搜索列表数据；；调用封装好的h函数 getCityData
      const cityList = await this.getCityData(value)
      // 为了避免用户直接输入后啥不干，直接将输入框失去焦点；可将默认城市第一个sort放在form中
      this.form.destCode = cityList[0].sort
      showList(cityList)
    },
    // 封装获取搜索建议列表数据
    getCityData (value) {
      return this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        const { data } = res.data
        const citys = data.map((element) => {
          return {
            ...element,
            value: element.name.replace(/市$/, '')// 将数据中最后的字为市的替换掉;;用正则/市$/:/市$/g;在全局中将市给去掉
          }
        })
        // 用过滤函数将所有不带 sort 的数据去掉; // 过滤器里面,所有合法的数据应该return true
        const cityList = citys.filter((item) => {
          if (item.sort) {
            return true
          }
        })
        return cityList// 将建议搜索列表数据返回
      })
    },
    // select事件；实现出发城市代码的选中；；item就是一个城市对象；包含城市对象所有的属性属性值
    departSelect (item) {
      window.console.log(item)
      this.form.departCode = item.sort// 获取城市代码
    },
    // select事件；实现到达城市代码的选中
    destSelect (item) {
      this.form.destCode = item.sort
    },
    // 改变日期格式
    changeDate () {
      this.form.departDate = moment(this.form.departDate).format('YYYY-MM-DD')
    },
    // 点击搜索事件，实现页面的跳转
    handleSubmit () {
      // 在实现搜索跳转之前，如果用户输入市，要将市替换掉
      this.form.departCity = this.form.departCity.replace(/市$/, '')
      this.form.destCity = this.form.destCity.replace('市', '')
      // 跳转到机票页面
      this.$router.push({
        path: '/air/flights',
        // 将this.from;5个参数带过去;;;;qurey:get请求；将参数在？后面拼接，以&形式
        query: this.form
      })
      window.console.log(this.form)
    },
    // 出发和到达城市的切换
    handleReverse () {
      // 将要替换的数据进行解构出来。进行两两替换
      const { departCity, destCity, destCode, departCode } = this.form
      this.form.destCity = departCity
      this.form.departCity = destCity
      this.form.destCode = departCode
      this.form.departCode = destCode
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
    cursor: pointer;//鼠标为小手状态
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
