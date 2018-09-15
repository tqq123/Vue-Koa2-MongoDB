<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="login-panel">
      <van-field 
        v-model="username" 
        label="用户名" 
        icon="clear" 
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      />
      <van-field 
        v-model="password"
        type="password"
        label="密码"  
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
    </div>
    <div class="login-button">
      <van-button type="primary" size="large" @click="login" 
      :loading="openLoading">登录</van-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/config'
  import {Toast} from 'vant'
  export default {
    data () {
      return {
        username: '',
        password: '',
        openLoading: false,  // 注册loading
        usernameErrorMsg: '', // 当用户名出现错误时的提示
        passwordErrorMsg: '', // 当密码出现错误时的提示
      }
    },
    created () {
      if (localStorage.name) {
        Toast.success('您已经登录')
        this.$router.push('/')
      }
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      login () {
        this.checkForm() && this.loginUser()
      }, 
      loginUser () {
        this.openLoading = true
        axios.post(url.loginUser, {
          userName: this.username,
          password: this.password
        }).then(res => {
          if (res.data.code === 200 && res.data.message) {
            // 存储登录状态
            localStorage.name = this.username
            Toast.success('登录成功')
            this.$router.push('/')
            this.openLoading = false
          } else {
            Toast.fail('用户名或密码错误')
            this.openLoading = false
          }
        }).catch((e) => {
          Toast.fail('登录失败')
          this.openLoading = false
        })
      },
      checkForm () {
        let isOK = true
        if (this.username.length < 5) {
          this.usernameErrorMsg = "用户名不能少于5位"
          isOK = false
        } else {
          this.usernameErrorMsg = ''
        }
        if (this.password.length < 6) {
          this.passwordErrorMsg = "密码不能少于6位"
          isOK = false
        } else {
          this.passwordErrorMsg = ''
        }
        return isOK
      }
    }
  }
</script>

<style scoped>
  .login-panel {
    padding: 12px 8px;
    border-radius: 25px;
  }
  .login-button {
    margin-top: 10px;
    padding: 0 8px;
  }
</style>