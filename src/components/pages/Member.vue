<template>
  <div>
    <div>
      <van-nav-bar  title="会员中心" />
    </div>
    <div class="top">
      <img :src="imgUrl" class="top-img" />
      <div v-if="isLogin">{{userName}}</div>
    </div>
    <div class="login" v-if="!isLogin">
      <div><van-button type="warning" @click="login">我要登录</van-button></div>
      <div><van-button type="primary" @click="register">我要注册</van-button></div>
    </div>
    <div v-else class="login">
      <div><van-button type="danger" @click="logout">点击注销</van-button></div>
    </div>
    <div>
      <van-cell-group>
        <van-cell icon="contact" title="会员卡" is-link />
        <van-cell icon="location" title="地址管理" is-link  />
        <van-cell icon="records" title="我的订单" is-link  />
        <van-cell icon="receive-gift" title="会员权益" is-link />
        <van-cell icon="phone" title="联系我们" is-link  />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {Dialog, Toast} from 'vant'

export default {
  data () {
    return {
      userName: '',
      isLogin: false
    }
  },
  computed: {
    imgUrl () {
      return this.isLogin ? 
      'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg' : 
      'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
    }
  },
  activated () {
    if (localStorage.name) {
      this.isLogin = true
      this.userName = localStorage.name
    }
  },
  created() {
    if (localStorage.name) {
      this.isLogin = true
      this.userName = localStorage.name
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    register () {
      this.$router.push('/register')
    },
    logout () {
      Dialog.confirm({
        title: '确认注销?'
      }).then(() => {
        // on confirm
        localStorage.removeItem('name')
        this.isLogin = false
        Toast.success('已注销')
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>

<style scoped>
  .top-img{
    width:70px;
    height: 70px;
    border-radius: 50px;
  }
  .top{
    height: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EEA2AD;
  }
  .login{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding:10px;
  }
  .login div{
    flex:1;
    text-align: center;
  }
</style>