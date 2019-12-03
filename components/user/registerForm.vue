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
          placeholder="验证码"
        >
          <template slot="append">
            <!-- //验证码单击事件 -->
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
      <el-form-item prop=" checkpassword">
        <el-input v-model="registerForm. checkpassword" type="password" placeholder="确认密码" />
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
      } else if (value !== this.ruleForm.pass) {
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
    // 验证码单击事件
    handleSendCaptcha () {

    },
    // 注册
    submitForm (registerForm) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
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
