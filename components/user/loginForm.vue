<template>
  <!-- //用户登录验证 -->
  <div class="loginForm">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
      <!-- 用户登录 prop="username";验证用户登录是否符合规则 -->
      <el-form-item class="form-item" prop="username">
        <el-input v-model="loginForm.username" placeholder="手机号/用户名"></el-input>
      </el-form-item>
      <!-- //密码登录 -->
      <el-form-item class="form-text" prop="password">
        <el-input v-model="loginForm.password" placeholder="输入密码" type="password"></el-input>
      </el-form-item>
      <!-- //提交登录 -->
      <el-form-item>
        <el-button type="primary" class="submit" @click="submitLogin(loginForm)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户登录的数据
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      //rules 属性传入约定的验证规则；prop 属性设置为需校验的字段名即可；三者必须一致
      rules: {
        //用户验证
        username: [
          { required: true, message: "请输入手机号/用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods:{
      //提交登录事件
      submitLogin(loginForm){
        //   表单验证；在手机号和密码提交前进行验证
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
              //验证成功；；发送axios实现登录
            this.$axios({
                url:"/accounts/login",
                method:"POST",
                data:this.loginForm//将请求的数据传递过去
            }).then((res)=>{
                console.log(res)
            })
          } else {
              //验证失败；终止请求的发送；提示错误
            this.$message.error('请求失败，重新输入')
            return false;
          }
        });
  }
}
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
