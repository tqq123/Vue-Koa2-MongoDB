<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar 
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" alt="">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格: ￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">
          <div class="rating-wrapper">
            <ul>
              <li v-for="rating in ratings" class="rating-item van-hairline--bottom">
                <div class="avatar">
                  <img width="28" height="28" :src="rating.avatar">
                </div>
                <div class="content">
                  <h1 class="name">{{rating.username}}</h1>
                  <p class="text">{{rating.text}}</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger" @click="buy">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/config'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter'
import {mapMutations, mapActions} from 'vuex'

export default {
  name: 'Goods',
  data () {
    return {
      goodsId: '',
      goodsInfo: {},   // 商品详情
      ratings: []     // 商品评论
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    this.getInfo()
    this.getComments()
  },
  methods: {
    getInfo () {
      axios.post(url.getDetailGoodsInfo, {
        goodsId: this.goodsId
      }).then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.goodsInfo = res.data.message
        } else {
          Toast('加载失败')
        }
      })
    },
    getComments () {
      axios.post(url.getDetailGoodsComments, {
        goodsId: this.goodsId
      }).then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.ratings = res.data.message
        }
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    addToCart () {
      // 判断是否登录
      if (localStorage.name) {
        // 获取购物车列表
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
        let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)
        if (!isHaveGoods) {
          let newGoodsInfo = {
            goodsId: this.goodsInfo.ID,
            name: this.goodsInfo.NAME,
            price: this.goodsInfo.PRESENT_PRICE,
            image: this.goodsInfo.IMAGE1,
            count: 1
          }
          // 存Vuex
          this.addGoods(newGoodsInfo)
          // cartInfo.push(newGoodsInfo)
          // localStorage.cartInfo = JSON.stringify(cartInfo)
          Toast.success('添加购物车成功')
        } else {  
          Toast.success('购物车已存在')
        }
        this.$router.push('/cart')
      } else {
        Toast('请先登录')
        this.$router.push('/member')
      }
    },
    buy () {
      // 判断是否登录
      if (localStorage.name) {
        Toast('下单')
      } else {
        Toast('请先登录')
        this.$router.push('/member')
      }
    },  
    ...mapActions(['addGoods'])
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>
<style>
  .van-tabs__wrap {
    top: 45px;
  }
</style>
<style scoped>
  .topimage-div {
    margin-top: 46px;
  }
  .goods-name, .goods-price {
    background: #fff;
    padding: 6px 15px;
    color: #666;
  }
  .detail {
    font-size: 0;
    margin-top: 46px;
    margin-bottom: 110px;
  }
  .goods-bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom div {
    flex: 1;
    padding: 5px;
  }
  .rating-wrapper {
    padding: 0 18px;
    margin-top: 44px;
    margin-bottom: 110px;
  }
  .rating-item {
    display: flex;
    padding: 18px 0;
  }
  .avatar {
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }
  .avatar img {
    border-radius: 50%  
  }
  .content {
    position: relative;
    flex: 1;
  }
  .content .name {
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }
  .content .text {
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
  }     
</style>