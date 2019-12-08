<template>
  <div class="main">
    <!-- 添加乘机人 -->
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form :model="{users}" class="member-info">
        <!-- 将users进行遍历 失去焦点时对乘机人进行验证规则 pattern:正则判断-->
        <div v-for="(item,index) in users" :key="index" class="member-info-item">
          <el-form-item :prop="`users[${index}].username`" :rules="{ required: true, message: '请输入姓名', trigger: 'blur'}" label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item :prop="`users[${index}].id`" :rules="{ required: true, pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入身份证号码', trigger: 'blur'}" label="证件类型">
            <el-input v-model="item.id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option :checked="true" label="身份证" value="1" />
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 通过索引index将乘机人移除 -->
          <span @click="handleDeleteUser(index)" class="delete-user">-</span>
        </div>
      </el-form>

      <el-button @click="handleAddUsers" class="add-member" type="primary">
        添加乘机人
      </el-button>
    </div>

    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-checkbox-group v-model="insurances" @change="handeleInsurances">
          <!-- 绑定一个change事件； -->
          <div v-for="(item,index) in data.insurances" :key="index" class="insurance-item">
            <el-checkbox :label="item.id" border>
              {{ `${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}` }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <!-- 联系人 rules验证规则-->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form :rules="rules" :model="{contactName,contactPhone,captcha}" label-width="80px">
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="contactName" placeholder="请输入姓名" />
          </el-form-item>

          <el-form-item label="手机" prop="contactPhone">
            <el-input v-model="contactPhone" placeholder="请输入手机号">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="captcha" placeholder="验证码" />
          </el-form-item>
        </el-form>
        <el-button @click="handleSubmit" type="warning" class="submit">
          提交订单
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 接受父组件order传递过来的数据;;接受机票详情数据
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  // props: {
  //   // 接受机票数据
  //   data: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  data () {
    return {
      // 乘机人数据
      users: [{
        username: '',
        id: ''
      }],
      insurances: [], // 保险数据
      contactName: '', // 联系人名字
      contactPhone: '', // 联系电话
      captcha: '', // 验证码
      // 验证规则
      rules: {
        contactName: [{ required: true, message: '请输入联系人名字', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
  },
  methods: {
    // 保险事件;触发change事件
    handeleInsurances () {
      window.console.log(this.insurances)
      // // 获取保险数据
      // this.insurances.forEach((id) => {
      //   this.data.insurances.forEach((item) => {
      //     if (id === item.id) {

      //     }
      //   })
      // })
    },
    // 添加乘机人
    handleAddUsers () {
      //   this.users.push({
      //     username: '',
      //     id: ''
      //   })
      this.users = [...this.users, { username: '', id: '' }]// 第二种写法
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)// 通过索引移除
    },

    // 发送手机验证码
    handleSendCaptcha () {
      // 判断用户输入手机号长度
      // if(this.contactPhone)
      const tel = /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/// 手机号正则验证
      if (!tel.test(this.contactPhone)) {
        // 不符合正则;提示错误信息
        this.$message({
          message: '手机号不符合规则',
          type: 'warning'
        })
        return false
      }
    },

    // 提交订单
    handleSubmit () {
      // 测试添加乘机人
      // window.console.log(this.users)
      // 获取提交订单的数据,发送axios请求
      // const orderData = {
      //   insurances: this.data.insurances, // 保险数据
      //   users: this.users, // 用户列表
      //   contactName: this.contactName // 联系人名字

      // }
      window.console.log(this.contactPhone)
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
// .member-info /deep/ .el-form-item {
//   margin-bottom: 0;
// }

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
