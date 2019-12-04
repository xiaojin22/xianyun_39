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

    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          v-model="form.departCity"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          @change="handleDate"
          v-model="form. departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button
          @click="handleSubmit"
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
        >
          搜索
        </el-button>
      </el-form-item>
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
      // 单程和往返的tep切换
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      // 获取要提交的城市数据
      form: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 到达城市
        destCode: '', // 到达城市代码
        departDate: '' // 日期字符串
      }
    }
  },
  mounted () {

  },
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) {

    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch (value, cb) {
      const arr = await this.querySearchAsync(value)// value是用户输入（选中）的值
      if (arr.length > 0) {

      }
      cb(arr)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch (value, cb) {
      const arr = await this.querySearchAsync(value)
      if (arr.length > 0) {

      }
      cb(arr)
    },
    // 查询城市接口的方法，返回promise
    // queryString是查询关键字;；；获取城市数据；；querySearchAsync封装获取axios数据的方法
    querySearchAsync (queryString) {
      return new Promise((resolve, reject) => {
        // 如果关键字是空，则直接返回
        if (!queryString) {
          return resolve([])
        }

        this.$axios({
          url: `/airs/city`,
          params: {
            name: queryString
          }
        }).then((res) => {
          const { data } = res.data

          // 下拉提示列表必须要有value字段
          const arr = data.map((v) => {
            return {
              ...v,
              value: v.name.replace('市', '')
            }
          })
          resolve(arr)
        })
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {

    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {

    },

    // 确认选择日期时触发
    handleDate (value) {

    },

    // 触发和目标城市切换时触发
    handleReverse () {

    },

    // 提交表单是触发
    handleSubmit () {

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
