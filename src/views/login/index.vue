<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!--表单 start-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model == 'register'">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginButtonStatus">{{model==="login"?"登录":"注册"}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript } from '@/util/verificate'
import { GetSms, Login, Register } from '@/api/login.js'

export default {
  name: 'login',
  data() {
    //验证用户名为邮箱
    var validateUsername = (rule, value, callback) => {
      //也可以放到utiljs中
      let reg = /^\w+@[0-9a-z]+\.[a-z]+$/
      if (value === '') {
        callback(new Error('请输入用户名！'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名格式错误！'))
      } else {
        // if (this.ruleForm.checkPass !== '') {
        //   this.$refs.ruleForm.validateField('checkPass')
        // }
        callback() //true
      }
    }
    var validatePassword = (rule, value, callback) => {
      //密码其他验证
      if (value === '') {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    var validatePasswords = (rule, value, callback) => {
      //密码其他验证
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不密码！'))
      } else {
        callback()
      }
    }
    //验证验证码
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      timer: null,
      codeButtonStatus: {
        text: '获取验证码',
        status: false,
      },
      loginButtonStatus: true,
      model: 'login',
      menuTab: [
        { text: '登录', current: true, type: 'login' },
        { text: '注册', current: false, type: 'register' },
      ],

      //表单
      ruleForm: {
        username: '327344558@qq.com',
        password: '123456',
        passwords: '',
        code: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }], //blur  失去焦点-->  鼠标移开
        password: [{ validator: validatePassword, trigger: 'blur' }],
        passwords: [{ validator: validatePasswords, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      let data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        code: this.ruleForm.code,
      }

      Login(data)
        .then((ressponse) => {
          console.log('login -> ressponse', ressponse)

          this.$router.push({
            name: 'Console',
          })
        })
        .catch((error) => {
          console.log('login -> error', error)
        })
    },
    register() {
      let data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        code: this.ruleForm.code,
      }

      Register(data)
        .then((ressponse) => {
          console.log('register -> ressponse', ressponse)
          this.model = 'login'
        })
        .catch((error) => {
          console.log('register -> error', error)
        })
    },

    updateButtonStatus(params) {
      this.codeButtonStatus.text = params.text
      this.codeButtonStatus.status = params.status
    },

    countDown(number) {
      console.log('countDown -> this.timer', this.timer)
      if (this.timer) {
        clearInterval(this.timer)
      }

      let time = number
      this.timer = setInterval(() => {
        time--
        if (time == 0) {
          clearInterval(this.timer)

          this.codeButtonStatus({
            text: '再次获取',
            status: false,
          })
        } else {
          this.codeButtonStatus.text = `倒计时${time}秒`
        }
      }, 1000)
    },

    getSms() {
      //进行提示
      if (this.ruleForm.username === '') {
        this.$message.error('邮箱不能为空！')
        return
      }
      if (this.ruleForm.password === '') {
        this.$message.error('密码不能为空！')
        return
      }

      let data = {
        username: this.ruleForm.username,
        module: this.model,
      }

      this.updateButtonStatus({
        text: '发送中',
        status: true,
      })

      setTimeout(() => {
        GetSms(data)
          .then((response) => {
            console.log('getSms -> response', response.data)

            this.$message({
              type: 'success',
              message: response.data.message,
            })
            this.loginButtonStatus = false
            this.countDown(60)
          })
          .catch((error) => {
            console.log('getSms -> error', error)
          })
      }, 1000)
    },
    toggleMenu(data) {
      this.menuTab.forEach((element) => {
        element.current = false
      })
      data.current = true
      this.model = data.type
      this.updateButtonStatus({
        text: '请求验证码',
        status: false,
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.model == 'login') {
            this.login()
          } else {
            this.register()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #ffffff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
.login-form {
  margin-top: 9px;
  label {
    display: block;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 15px;
  }
}
</style>
