<template>
  <div>
    <div v-if="isEmpty">
      <div class="navbar-div">
        <van-nav-bar title="购物车" />
      </div>
      <div class="cart-title">
        <van-button size="small" type="danger" @click="clearShopCart" plain>
          清空购物车
        </van-button>
      </div>
      <div class="cart-list">
        <div class="cart-row" v-for="(item, index) in cartInfo" :key="index" 
        @click="goGoodsInfo(item.goodsId)">
        <van-card
          :title="item.name" 
          :price="item.price | moneyFilter"
          :thumb="item.image"
        >
          <div slot="desc" @click.stop class="stepper">
            <van-stepper v-model="item.count" />
          </div>
          <div slot="footer">
            <van-button size="mini" @click.stop="delItem(index)">删除</van-button>
          </div>
        </van-card>
          <!-- <div class="cart-image">
            <img :src="item.image" width="100%" alt="">
          </div>
          <div class="cart-text">
            <div class="cart-goods-name">{{item.name}}</div>
            <div class="cart-control" @click.stop="">
              <van-stepper v-model="item.count" />
            </div>
          </div>
          <div class="cart-price">
            <div>￥{{item.price | moneyFilter}}</div>
            <div>x {{item.count}}</div>
            <div class="allPrice">
              ￥{{item.price * item.count | moneyFilter}}
            </div>
            <van-icon name="clear" @click.stop="delItem(index)" />
          </div> -->
        </div>
      </div>
      <van-submit-bar
        :price="totalMoney * 100"
        button-text="提交订单"
        @submit="submit"
      />
     <!--  <div class="totalMoney">
        商品总价: <span class="totalPrice">￥{{totalMoney | moneyFilter}}</span>
      </div> -->
    </div>
    <div v-else class="empty">购物车空空如也,快去添加商品吧~</div>
  </div>
</template>

<script>
import {Toast, Dialog} from 'vant'
import {toMoney} from '@/filter/moneyFilter'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Cart',
  data () { 
    return {
      // cartInfo: [],   // 购物车商品
      isEmpty: false
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach(item => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    },
    ...mapState(['cartInfo'])
  },
  created () {
    this.getCartInfo()
  },
  methods: {
    submit () {
      Toast(this.totalMoney+'元')
    },
    getCartInfo () { 
      // if (localStorage.cartInfo) {
      //   this.cartInfo = JSON.parse(localStorage.cartInfo)
      // }
      this.isEmpty = this.cartInfo.length > 0 ? true : false
    },
    clearShopCart () {
      Dialog.confirm({
        title: '确认清空购物车?'
      }).then(() => {
        // on confirm
        // localStorage.removeItem('cartInfo')
        // this.cartInfo = []
        this.clearCart()
        Toast.success('购物车已清空')
        this.isEmpty = false
      }).catch(() => {
        // on cancel
      });
    },
    delItem (index) {
      this.cartInfo.splice(index, 1)
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
    },
    goGoodsInfo (goodsId) {
      this.$router.push({
        path: '/goods',
        query: {  
          goodsId
        } 
      })
    },
    ...mapMutations(['clearCart'])
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  watch: {
    cartInfo (newVal) {
      if (!newVal.length) {
        this.isEmpty = false
      }
    }
  }
}
</script>

<style scoped>
  .empty {
    font-size: 0.8rem;
    color: #666;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .cart-title {
    height: 2rem;
    line-height: 2rem;
    background: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
  }
  .cart-list {
    background: #fff;
    margin-bottom: 100px;
  }
  .cart-row {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #e4e7ed;
  }
  .cart-image { 
    flex: 6;
  }
  .cart-text {
    flex: 14;
    padding-left: 10px;
  }
  .cart-price {
    flex:4;
    text-align: right;
    font-size: 17px;
  }
  .cart-goods-name {
    margin-bottom: 20px;
  }
  .stepper {
    margin-top: 18px;
  }
  .allPrice {
    color: #f00;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .van-submit-bar {
    bottom: 49px;
  }
</style>