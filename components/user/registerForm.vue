<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="rules" class="form">
      <!-- //用户名 -->
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名手机" />
      </el-form-item>
      <!-- //验证码 -->
      <el-form-item class="form-item" prop="captcha">
        <el-input
          v-model="registerForm.captcha"
          placeholder="验证码"
        >
          <template slot="append">
            <!-- 单击验证码事件 -->
            <el-button @click="handleSendCaptcha">
              发送验证码
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <!-- //昵称 -->
      <el-form-item prop="nickname">
        <el-input v-model="registerForm.nickname" placeholder="你的名字" />
      </el-form-item>
      <!-- //密码 -->
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="密码" />
      </el-form-item>
      <!-- //确认密码 -->
      <el-form-item class="form-item" prop="checkpassword">
        <el-input
          v-model="registerForm.checkpassword"
          placeholder="确认密码"
          type="password"
        />
      </el-form-item>
      <!-- //注册 -->
      <el-form-item>
        <el-button @click="submitForm('registerForm')" type="primary">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 确认密码
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 需要发送注册请求的数据
      registerForm: {
        username: '',
        nickname: '',
        captcha: '', // 手机验证码
        password: '',
        checkpassword: ''// 确认密码
      },
      // 属性传入约定的验证规则；由porp中属性名绑定
      rules: {
        // 用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // 验证码
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        // 昵称
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 确认密码
        checkpassword: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 验证码单击事件(发送验证码)；；对注册的手机号/用户名；要求；不能为空；长度为11；
    handleSendCaptcha () {
      // 判断用户输入的手机号；手机号不能为空
      if (!this.registerForm.username) {
        // 在elment-ui中提示
        this.$confirm('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }
      // 手机号长度为11位
      if (this.registerForm.username.length !== 11) {
        this.$confirm('手机号码格式错误', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }
      // 验证码发送axios请求
      this.$axios({
        url: `captchas`,
        method: 'POST',
        data: {
          tel: this.registerForm.username// 模拟将验证码返回到手机上
        }
      }).then((res) => {
        const { code } = res.data// code是提示的手机验证码
        this.$confirm(`模拟手机验证码为：${code}`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
      })
    },
    // 提交注册；提交注册前进行验证规则
    submitForm (registerForm) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 注册提交;;;;{ checkpassword, ...props }该方法是将checkpassword从this.registerForm中提取出来；形成一个新的数组props
          const { checkpassword, ...props } = this.registerForm// 与展开运算符是相反的
          window.console.log(props)
          // 发送axios请求
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: props// 要发送的请求数据
          }).then((res) => {
            window.console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
