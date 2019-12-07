<template>
  <div class="main">
    <!-- 添加乘机人 -->
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <!-- 将users进行遍历 -->
        <div v-for="(item,index) in users" :key="index" class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
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
        <div class="insurance-item">
          <el-checkbox label="航空意外险：￥30/份×1  最高赔付260万" border />
        </div>
      </div>
    </div>

    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input />
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input />
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
  data () {
    return {
      users: [{
        username: '',
        id: ''
      }]
    }
  },
  methods: {
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
    handleSendCaptcha () {},

    // 提交订单
    handleSubmit () {
      // 测试添加乘机人
      window.console.log(this.users)
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
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

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
