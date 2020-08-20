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
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()"> 获取验证码</el-button>
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
import { GetSms } from '@/api/login.js'

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
      loginButtonStatus: true,
      model: 'login',
      menuTab: [
        { text: '登录', current: true, type: 'login' },
        { text: '注册', current: false, type: 'register' },
      ],

      //表单
      ruleForm: {
        username: '',
        password: '',
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
    getSms() {
      //进行提示
      if (this.ruleForm.username === '') {
        this.$message.error('邮箱不能为空！')
        return
      }

      let data = {
        username: this.ruleForm.username,
        module: this.model,
      }
      GetSms(data)
        .then((response) => {
          console.log('getSms -> response', response.data)
        })
        .catch((error) => {
          console.log('getSms -> error', error)
        })
    },
    toggleMenu(data) {
      this.menuTab.forEach((element) => {
        element.current = false
      })
      data.current = true
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
