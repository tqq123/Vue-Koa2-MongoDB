<template>
  <div id="app">
    <div>
      <keep-alive exclude="Goods,Cart">
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)" v-if="show">
      <van-tabbar-item icon="shop">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="records">
        商品列表
      </van-tabbar-item>
      <van-tabbar-item icon="cart" :info="cartInfo.length ? cartInfo.length : null">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="contact">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Toast} from 'vant'
// import VConsole from 'vconsole'

// let vconsole = new VConsole()

export default {
  data () {
    return {
      active: 0,
      path: '',  // 当前路径
      show: true
    }
  },
  computed: {
    ...mapState(['cartInfo'])
  },
  created () {
    this.changeTabBarActive()
  },
  updated () {
    this.changeTabBarActive()
  },
  methods: {
    changeTabBarActive () {
      this.path = this.$route.path
      // 如果是地址选择页隐藏tab栏
      if (this.path == '/city') {
        this.show = false
      } else {
        this.show = true
      }
      switch (this.path) {
        case '/home':
          this.active = 0
          break
        case '/categorylist':
          this.active = 1
          break
        case '/cart':
          this.active = 2
          break
        case '/member':
          this.active = 3
          break
        default:
          this.active = 0
      }
    },
    changeTabbar (active) {
      switch (active) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/categorylist')
          break
        case 2:
          if (localStorage.name) {
            this.$router.push('/cart')
          } else {
            Toast('请先登录')
            this.active = 3
            this.$router.push('/member')
          }
          break
        case 3:
          this.$router.push('/member')
          break
      }
    }
  }
}
</script>

<style scoped>
  
</style>